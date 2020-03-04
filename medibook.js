const mysql = require("mysql")

module.exports.medibook = async function medibook(id){
    return new Promise((Pres,Prej)=>{
        const con = mysql.createConnection({
            host: "localhost",
            user: "medicaltecmysql",
            password: "Medicaltec310188$",
            database: "medicaltec"
        });
        con.connect()
        con.query(`SELECT * FROM medicaltec.MainDicomTags where tagElement = 32 and tagGroup = 16 and value = ${id}`,(err,res)=>{
            Pres(res[0])
            con.end()
        })
    })
}