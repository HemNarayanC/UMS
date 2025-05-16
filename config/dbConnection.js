const {DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME} = process.env;

const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
})


conn.connect((err)=>{
    if(err){
        console.log('Error connecting to database:', err);
    }
    else{
        console.log('Connected to database Successfully', DB_NAME);
    }
})
