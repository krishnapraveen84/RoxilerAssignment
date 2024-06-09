const express = require('express');
const {open} = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require('path');
const axios = require('axios');

const dbPath = path.join(__dirname, "database.sqlite")
const thirdPartyUrl = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";



const intiliazeDatabase = async () => {
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    })

    await db.run(`
        CREATE TABLE IF NOT EXISTS ProductTransection(
            id INTEGER PRIMARY KEY,
            title TEXT,
            description TEXT,
            price REAL,
            dateOfSale TEXT,
            sold BOOLEAN,
            category TEXT

        )
    
    `)

    const dataResponse = await axios.get(thirdPartyUrl);
    const transectionData =  dataResponse.data;

    const insertQuery = `
        INSERT INTO ProductTransection (title, description, price, dateOfSale, sold, category)
        VALUES (?, ?, ?, ?, ?, ?)
    
    `;
    const dbx = await db.prepare(insertQuery);
    for (let x of transectionData){
        await dbx.run(x.title, x.description, x.price, x.dateOfSale, x.sold, x.category)
    }

    return db

};

module.exports = {intiliazeDatabase};

