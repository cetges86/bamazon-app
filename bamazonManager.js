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
    managerCLI();
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
        managerCLI();
    })

}

//view low inventory
const lowInven = () => {
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (err, res) {
        if (err) throw err;
        console.log("The following products are low on stock:")
        console.log("-------------------------------")
        res.forEach(item => {
            console.log(`ID#: ${item.item_id}`)
            console.log(`Product: ${item.product_name}`)
            console.log(`Price: $${item.price}`);
            console.log(`Department: ${item.department_name}`);
            console.log(`Remaining Stock: ${item.stock_quantity}`)
            console.log("--------------------------");
        })
        managerCLI();

    })


}


//add to inventory
const addStock = (id, quantity) => {
    connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?',
        [quantity, id], function (err, res) {
            console.log(`${quantity} added to stock of item #${res[0].product_name}!`)
            managerCLI();
        }

    );


}

//add new product
const addNewItem = (item, department, price, quantity) => {
    console.log(item,department,price,quantity);

    connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity)
    VALUES ("${item}","${department}", ${parseFloat(price)}, ${parseInt(quantity)})`, function (err, res) {
            if (err) throw err;
            console.log("New Item Added!")
            managerCLI();
        });
}


//CLI
const managerCLI = () => {
    inquirer.prompt(
        {
            type: "list",
            name: "menuChoice",
            message: "Welcome to Bamazon Manager Portal. Please select an option below:",
            choices: ["View Items For Sale", "View Items Low on Stock", "Add stock of existing items", "Add Item", "Quit"]
        }).then(function (choices) {
            switch (choices.menuChoice) {
                case "View Items For Sale":
                    displayItems();
                    break;

                case "View Items Low on Stock":
                    lowInven();
                    break;

                case "Add stock of existing items":
                    inquirer.prompt([{
                        type: "input",
                        name: "item",
                        message: "Please type the ID# of the item you wish to increase stock."
                    }, {
                        type: "input",
                        name: "quantity",
                        message: "How many would you like to add to stock?"
                    }]).then(function (choices) {
                        addStock(choices.item, choices.quantity);
                    });
                    break;

                case "Add Item":
                    inquirer.prompt([{
                        type: "input",
                        name: "item",
                        message: "What is the new item called?"
                    }, {
                        type: "input",
                        name: "department",
                        message: "What department does this item belong in?"
                    }, {
                        type: "input",
                        name: "price",
                        message: "How much does each individual item cost?"
                    }, {
                        type: "input",
                        name: "stock",
                        message: "How much stock of this item are you adding to the store?"
                    }]).then(function (choices) {

                        addNewItem(choices.item, choices.department, choices.price, choices.stock);
                    })

                    break;

                case "Quit":
                    console.log("Have a great day!")
                    connection.end();
                    break;
            }

        })
}
