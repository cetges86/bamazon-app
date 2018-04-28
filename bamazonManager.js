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


//menu options

//view products for sale
//already done in amazonCustomer
//list products
const displayItems = () => {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log("Available Products for Sale");
        console.log("-----------------------")
        res.forEach(item => {
            console.log(`ID#: ${item.item_id}`)
            console.log(`Product: ${item.product_name}`)
            console.log(`Price: $${item.price}`);
            console.log(`Department: ${item.department_name}`);
            console.log(`Remaining Stock: ${item.stock_quantity}`)
            console.log("--------------------------");
        });

    })
}

    //view low inventory
    //if stock<5 print stuff, easy
const lowInven = () => {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (err, res) {
        if (err) throw err;
        console.log("The following products are low on stock:")
        res.forEach(item => {
            console.log(`ID#: ${item.item_id}`)
            console.log(`Product: ${item.product_name}`)
            console.log(`Price: $${item.price}`);
            console.log(`Department: ${item.department_name}`);
            console.log(`Remaining Stock: ${item.stock_quantity}`)
            console.log("--------------------------");
        })

    })
}


    //add to inventory
    //mysql query, pretty easy
    const addStock = (id, quantity) => {
        connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?',
            [quantity, id], function (err, res) {
                console.log(`${quantity} added from stock!`)
            }
    
        );
        connection.end();
    }

    //add new product
    //inquirer prompt, not bad

