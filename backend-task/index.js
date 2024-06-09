const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors())
const {intiliazeDatabase} = require('./database');

app.use(express.json());

let db = null;


const intiliazeServer = async () => {
    try{
        db = await intiliazeDatabase();   
        app.listen(9000, () => console.log("Server Started at Port 9000...."));
    }
    catch(err){
        console.log(`Error: ${err}`);
        process.exit(1);
    }
}

app.get('/', (req, res) => {
    res.send("Server Started...")
})
// 1. Create an API to list the all transactions
app.get('/transactions', async (req, res) => {
   try{
    const {page = 1, perPage=10, search=""} = req.query;
    const offset = (page - 1 ) * perPage;
    const searchQuery = search ? `WHERE title LIKE '%${search}%' OR description LIKE '%${search}%' OR price LIKE '%${search}%'` : "";
    const query = `
        SELECT *
         FROM
        ProductTransection 
        ${searchQuery} 
        LIMIT ${perPage} OFFSET ${offset}; 
    `;
    const transectionDetails = await db.all(query);
    res.send(transectionDetails);
   }
   catch(err){
    console.log(err)
    res.status(500).send("Internal Server Issue")
   }

})

//2. Create an API for statistics
app.get('/statistics', async (req, res) => {
   try{
    const {month} = req.query;
    const formatedMonth = month.padStart(2, '0')
    const query = `
        SELECT
            SUM(price) AS totalSales,
            COUNT(CASE WHEN sold THEN 1 ELSE null END) AS totalSold,
            COUNT(CASE WHEN NOT sold THEN 1 ELSE null END) AS totalUnsold
        FROM 
            ProductTransection
        WHERE strftime('%m', dateOfSale) = '${formatedMonth}';
    `;
    const stats = await db.get(query)
    res.send(stats)
   }
   catch(err){
    console.log(err)
    res.status(500).send('Internal Server Issue')
   }
})

// 3. Create an API for bar chart 
//( the response should contain price range and the number of items in that range for the selected month regardless of the year )
app.get('/bar-chart', async (req, res) => {
    try{
    const {month} = req.query;
    const formatedMonth = month.padStart(2, "0");
    const priceRanges = [
        [0, 100], [101, 200], [201, 300], [301, 400], [401, 500],
        [501, 600], [601, 700], [701, 800], [801, 900], [901, Infinity]
    ]
    const promises = priceRanges.map(([min, max]) => {
        return db.get(`
            SELECT COUNT(*) AS count
             FROM 
            ProductTransection
            WHERE price BETWEEN ${min} AND ${max === Infinity ? 99999 : max} AND strftime('%m', dateOfSale) = '${formatedMonth}'; 
        `)
        .then(row => ({
            range: `${min} - ${max === Infinity ? 'above': max}`,
            count: row.count
        }))
    })
    const result = await Promise.all(promises)
    res.send(result)
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal Server Issue')
       }
})

// 4. Create an API for pie chart Find unique categories and number of items from that category for the selected month regardless of the year.
app.get('/pie-chart', async (req, res) => {
    try{
    const {month} = req.query;
    const formatedMonth = month.padStart(2, "0");

    const query =`
        SELECT
        category, COUNT(*) as itemCount
        FROM ProductTransection
        WHERE strftime('%m', dateOfSale) = '${formatedMonth}'
        GROUP BY category;
    `;
    const categoriesData = await db.all(query);
    res.send(categoriesData);
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal Server Issue')
       }
})

// 5. Create an API which fetches the data from all the 3 APIs mentioned above, combines the response and sends a final response of the combined JSON
app.get('/combined', async (req, res) => {
    try{
        const {month} = req.query;
    const formatedMonth = month.padStart(2, "0")

    //stats data
    const statsData = await db.get(`
    SELECT 
        SUM(price) AS totalSales,
        COUNT(CASE WHEN sold THEN  1 ELSE null END) AS totalSold,
        COUNT(CASE WHEN NOT sold THEN 1 ELSE null END) as totalUnSold
    FROM
        ProductTransection
    WHERE strftime('%m', dateOfSale) = '${formatedMonth}';
    `)

    const priceRanges = [
        [0, 100], [101, 200], [201, 300], [301, 400], [401, 500],
        [501, 600], [601, 700], [701, 800], [801, 900], [901, Infinity]
    ]

    const barChatpromises = priceRanges.map(([min, max]) => {
        return db.get(`
            SELECT COUNT(*) as itemCount 
            FROM 
                ProductTransection 
            WHERE price BETWEEN ${min} AND ${max === Infinity ? 99999 : max} AND strftime('%m', '${formatedMonth}');
        `)
        .then(row => ({
            range: `${min} - ${max === Infinity ? 'above': max}`,
            count: row.count
        }))
    })
    const barChartData = await Promise.all(barChatpromises)

    const query =`
    SELECT
    category, COUNT(*) as itemCount
    FROM ProductTransection
    WHERE strftime('%m', dateOfSale) = '${formatedMonth}'
    GROUP BY category;
    `;
    const pieChartData = await db.all(query);
    res.send({statsData,barChartData, pieChartData})
    }
    
    catch(err){
        console.log(err)
        res.status(500).send('Internal Server Issue')
       }

})

intiliazeServer()