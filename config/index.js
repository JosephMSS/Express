require('dotenv').config();
const config={
    dev: process.env.NODE_ENV !== "production",
    db_connection:{
        port:process.env.PORT,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        name:process.env.DB_NAME,
    },
    host:process.env.HOST,
    publicRoute:process.env.PUBLIC_ROUTE,
    filesRoute:process.env.FILES_ROUTE,
}
module.exports={config}