const mysql = require('mysql');
const inquirer = require('inquirer');

//setup mysql connection

//Display list of all available items

inquirer.prompt([{
    type: "input",
    name: "id",
    message: "Please type the id of the product you wish to buy."
},
{
    type: "input",
    name: "quantity",
    message: "How many of that item would you like to buy?"
}]
).then(function (resp) {

    //if resp.quantity > stock {
        //console.log("Sorry, there isn't enough of those items to meet your order. There are only ${stock} available.")
    //} else {
        //console.log("Your order has been successfully placed")
        //deduct from stock, update db
        //show total cost of purchase
        
    //}

})