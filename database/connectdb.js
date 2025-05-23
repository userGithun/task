const mysql = require('mysql2/promise');

const dbsql = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'task'
};

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection(dbsql);
        console.log("MySQL Database connected!");
        return connection;
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

module.exports = connectDB;
