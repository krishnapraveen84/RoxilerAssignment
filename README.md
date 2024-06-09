# Amazon Analytics
This project is a web application that displays transaction data, statistics, and visualizations for a mock e-commerce platform. It   consists of a backend server built with Node.js and Express, and a frontend built with React.
  
# Features
> Transaction Table: Displays a list of transactions with pagination, search functionality, and month filter.
> Statistics: Shows total sales, total sold items, and total unsold items for a selected month.
> Bar Chart: Visualizes the number of items in different price ranges for a selected month.
> Statistics Bar Chart: A simple bar chart displaying total sales, total sold items, and total unsold items.


# Technologies Used

  # Backend
   > Node.js: JavaScript runtime for building server-side applications.
   > Express: Web framework for Node.js.
   > SQLite: Lightweight database used for storing transaction data.
   > Axios: Promise-based HTTP client for making API requests.
   > node-fetch: A light-weight module that brings window.fetch to Node.js.

  # Frontend
   > React: JavaScript library for building user interfaces.
   > React Router: Library for routing in React applications.
   > Recharts: Library for creating charts in React.
   > Axios: Promise-based HTTP client for making API requests

# third-party api url
    GET https://s3.amazonaws.com/roxiler.com/product_transaction.json

# API End Points
    GET http://localhost:3000/transactions?page=1&perPage=10&search=text


    GET http://localhost:3000/statistics?month=01


    GET http://localhost:3000/bar-chart?month=01


    GET http://localhost:3000/pie-chart?month=01


    GET http://localhost:3000/combined?month=01
