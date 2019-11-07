const mysql = require("mysql")


module.exports.estudios = function LeerEstudios(inicio,final){
    return new Promise((Pres,Prej)=>{
        
        const con = mysql.createConnection({
            host: "localhost",
            user: "orthanc",
            password: "Camachomm310188",
            database: "orthanc"
        });
        con.connect()
        con.query(`SELECT fecha.id As ID, CAST(fecha.value as UNSIGNED) As FECHA, nombre.value As NOMBRE, sexo.value As SEXO, pas_id.value As PAS_ID,
            res.publicId As EST_UID
            FROM MainDicomTags fecha 
            JOIN MainDicomTags nombre ON fecha.id = nombre.id 
            JOIN MainDicomTags sexo ON sexo.id = fecha.id
            JOIN MainDicomTags pas_id ON pas_id.id = fecha.id
            JOIN Resources res ON res.internalId = fecha.id
            WHERE fecha.tagGroup=8 and fecha.tagElement=32 AND CAST(fecha.value as UNSIGNED) > ${inicio} AND CAST(fecha.value as UNSIGNED) <= ${final}
            AND nombre.tagGroup=16 AND nombre.tagElement=16 
            AND sexo.tagGroup=16 AND sexo.tagElement=64
            AND pas_id.tagGroup=16 AND pas_id.tagElement=32
            AND res.resourceType=1`, async (err, res, field) => {
            for(let i = 0; i<=res.length-1 ; i++){
                let res2 = await LeerSeries(con,res[i].ID)
                res[i].SERIES = res2
            }
            Pres(res)
            con.end()
        })

    })

}

function LeerSeries(con,ID){
    return new Promise((res,rej)=>{
        con.query(`SELECT serie.internalId As SER_UID, serie.publicId As SER_ID, modalidad.value As MODALIDAD 
        FROM Resources serie
        JOIN MainDicomTags modalidad ON modalidad.id = serie.internalId
        WHERE serie.parentId=${ID}
        AND modalidad.tagGroup=8 AND modalidad.tagElement=96`,(err,resp,field)=>{
            res(resp)
        })
    })
}