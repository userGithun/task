const connectDB = require('../database/connectdb');

const schoolSchema = {

    addSchool: async (body) => {
        const db = await connectDB();
        const { name, address, latitude, longitude } = body;
        const sql = 'INSERT INTO school (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        return await db.query(sql, [name, address, latitude, longitude]);
    },

    getAllSchools: async () => {
        const db = await connectDB();
        const sql = 'SELECT * FROM school';
        const [rows] = await db.query(sql);
        return rows;  // Make sure to return only rows
    }
};

module.exports = schoolSchema;
