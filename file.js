const mysql = require("mysql")

module.exports.file = function file(ID){
return new Promise((Pres,Prej)=>{
    const con = mysql.createConnection({
        host: "localhost",
        user: "orthanc",
        password: "Camachomm310188",
        database: "orthanc"
    });
    con.connect()
    con.query(`SELECT * FROM storagearea WHERE uuid=${ID} and type=1`,(err,res)=>{
        Pres(res)
        con.end()
    })
})
}
