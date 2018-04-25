CREATE DATABASE bamazon;

CREATE TABLE products (
    item_id INT(100) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DEC(10,4),
    stock_quantity INT(100) NOT NULL,
    PRIMARY KEY item_id
)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LG G6", "Smart Phones", 400, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple 15in Macbook Pro", "Computers", 1500, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("God of War", "Video Games", 60, 10);



