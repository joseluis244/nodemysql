const mysql = require("mysql")
module.exports.datosEnlase = function datosEnlase(ID){
    return new Promise((Pres,Prej)=>{
        const con = mysql.createConnection({
            host: "localhost",
            user: "medicaltecmysql",
            password: "Medicaltec310188$",
            database: "medicaltec"
        });
        con.connect()
        con.query(`select * from medicaltec.MainDicomTags where id=${ID}  
        and ( (tagGroup=8 and tagElement=32) or (tagGroup=8 and tagElement=4144) or (tagGroup=16 and tagElement=16) )`,(err, res, field) => {
            Pres(res)
            con.end()
        })
    })
}