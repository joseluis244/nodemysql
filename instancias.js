const mysql = require("mysql")

module.exports.instanacias = function LeerInstancias(ID){
    return new Promise((Pres,Prej)=>{
        const con = mysql.createConnection({
            host: "localhost",
            user: "orthanc",
            password: "orthanc310188",
            database: "orthanc"
        });
        con.connect()
        con.query(`SELECT uid.internalId As INST_ID, uid.publicId As INST_UID, CAST(pos.value As UNSIGNED ) As POS, file.uuid As FILE 
                    FROM Resources uid
                    JOIN MainDicomTags pos ON pos.id=uid.internalId
                    JOIN attachedfiles file ON file.id=uid.internalId
                    WHERE uid.resourceType=3 and uid.parentId=${ID}
                    AND pos.tagGroup=32 and pos.tagElement=19 
                    AND file.fileType=1
                    ORDER BY CAST(pos.value As UNSIGNED ) ASC`,(err,res)=>{
            Pres(res)
            con.end()
        })
    })
}