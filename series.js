const mysql = require("mysql")

module.exports.series = function Series(ID){

    return new Promise((Pres,Prej)=>{
        const con = mysql.createConnection({
            host: "localhost",
            user: "medicaltecmysql",
            password: "Medicaltec310188$",
            database: "medicaltec"
        });
        con.connect()
        /*con.query(`SELECT uid.internalId As SER_ID,  uid.publicId As SER_UID, descr.value As DESCRIPCION
        FROM Resources uid
        JOIN MainDicomTags descr ON descr.id = uid.internalId
        WHERE uid.parentId=${ID} and uid.resourceType=2`
        /*AND ( (descr.tagGroup=8 and descr.tagElement=4158) or (descr.tagGroup=24 and descr.tagElement=5120) ) `,(err,res)=>{
            Pres(res)
            con.end()
        })*/
        con.query(`select internalId As SER_ID, publicId As SER_UID from medicaltec.Resources where parentId = ${ID}`,(err,res)=>{
            Pres(res)
            con.end()
        })
    })

}

module.exports.descripcion = function Descripcion(ID){

    return new Promise((Pres,Prej)=>{

        const con = mysql.createConnection({
            host: "localhost",
            user: "medicaltecmysql",
            password: "Medicaltec310188$",
            database: "medicaltec"
        });
        con.connect()
        con.query(`select value As DESCRIPCION from medicaltec.MainDicomTags where id = ${ID} and ( (tagGroup=8 and tagElement=4158) or (tagGroup=24 and tagElement=5120) )`,(err,res)=>{
            Pres(res)
            con.end()
        })

    })


}