const mysql = require("mysql")

module.exports.file = function file(ID){
return new Promise((Pres,Prej)=>{
    const con = mysql.createConnection({
        host: "localhost",
        user: "medicaltecmysql",
        password: "Medicaltec310188$",
        database: "medicaltec"
    });
    con.connect()
    con.query(`SELECT * FROM StorageArea WHERE uuid="${ID}" and type=1`,(err,res)=>{
        Pres(res)
        con.end()
    })
})
}
