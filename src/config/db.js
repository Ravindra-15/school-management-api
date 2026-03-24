const mysql = require('mysql2/promise');

const pool = mysql.createPool(process.env.DATABASE_URL);

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("MySQL Connected ✅");
    conn.release();
  } catch (err) {
    console.error("MySQL Connection Failed ❌", err.message);
  }
})();

module.exports = pool;



// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_NAME || 'school_db',
//   port: process.env.DB_PORT || 3306,
//    ssl: {
//     rejectUnauthorized: false
//   },
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // Test DB connection
// (async () => {
//   try {
//     const connection = await pool.getConnection();
//     console.log("MySQL Connected ✅");
//     connection.release();
//   } catch (error) {
//     console.error("MySQL Connection Failed ❌", error.message);
//   }
// })();

// module.exports = pool;