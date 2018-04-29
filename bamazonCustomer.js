const mysql = require('mysql');
const inquirer = require('inquirer');

//setup mysql connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'bamazon'
})

connection.connect(function (err) {
    if (err) throw err;
    displayItems();
})

//Display list of all available items
const displayItems = () => {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log("Welcome to Bamazon. It's definitely not amazon.")
        console.log("Available Products for Sale");
        console.log("-----------------------")
        res.forEach(item => {
            console.log(`ID#: ${item.item_id}`)
            console.log(`Product: ${item.product_name}`)
            console.log(`Price: $${item.price}`);
            console.log(`Department: ${item.department_name}`);
            console.log("--------------------------");
        });

        customer();
    })
}

//deduct from stock, update db
const deductStock = (id, quantity) => {
    connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?',
        [quantity, id], function (err, res) {
            console.log(`Thank you! Enjoy your purchase.`)
            customer();
        }

    );
    connection.end();
}

const customer = () => {
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "Please type the id # of the product you wish to buy."
    },
    {
        type: "input",
        name: "quantity",
        message: "How many of that item would you like to buy?"
    }]
    ).then(function (resp) {

        //grab item with id = id resp
        connection.query('SELECT * FROM products WHERE item_id=?', [resp.id], function (err, res) {
            if (err) throw err;

            console.log(`You want to buy ${resp.quantity} of item ${JSON.stringify(res[0].product_name)}. Checking...`);

            if (resp.quantity > parseInt(res[0].stock_quantity)) {
                console.log(`Sorry, there isn't enough of those items to meet your order. There are only ${res[0].stock_quantity} available.`)
                customer();
            } else {
                let total = parseFloat(res[0].price) * parseFloat(resp.quantity);
                console.log(`Your order of ${res[0].product_name} has been successfully placed. Enjoy!`)
                deductStock(res[0].item_id, resp.quantity);
                console.log(`Your total cost was $${total}`)
            }
        })
        
    })
}