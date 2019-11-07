const mysql = require("mysql")

module.exports.series = function Series(ID){

    return new Promise((Pres,Prej)=>{
        const con = mysql.createConnection({
            host: "localhost",
            user: "orthanc",
            password: "orthanc310188",
            database: "orthanc"
        });
        con.connect()
        con.query(`SELECT uid.internalId As SER_ID,  uid.publicId As SER_UID, descr.value As DESCRIPCION
        FROM Resources uid
        JOIN MainDicomTags descr ON descr.id = uid.internalId
        WHERE uid.parentId=${ID} and uid.resourceType=2
        AND descr.tagGroup=8 and descr.tagElement=4158`,(err,res)=>{
            Pres(res)
            con.end()
        })
    })

}
