const express = require("express")
const app = express()
const cors = require("cors")
const estudios = require("./estudios")
const series = require("./series")
const instancia = require("./instancias")
const file = require("./file")
const fs = require("fs")

app.use(cors())

app.get("/getestudios", async (req,res)=>{
    let inicio,final
    req.param("inicio")?inicio= parseInt( req.param("inicio") ):inicio=19000101
    req.param("fin")?final=parseInt( req.param("fin") ):final=40001212
    let Lista_Estudios = await estudios.estudios(inicio,final)
    res.json(Lista_Estudios)
})

app.get("/getseries/:id",async (req,res)=>{
    let dbid = req.params.id.split("@")[0]
    let lista_series = await series.series(dbid)
    console.log(lista_series)
    res.json(lista_series)
})

app.get("/getinstancias/:id", async (req,res)=>{
    //console.log(req.params.id)
    let inst = await instancia.instanacias(req.params.id)
    res.json(inst)
})
app.get("/getfile/:id",async (req,res)=>{
    let time = new Date().getTime()
    console.log(time)
    let files = await file.file(req.params.id)
    let buffer = files[0].content
    fs.writeFileSync(`./temp/${time}`,buffer)
    res.download(`./temp/${time}`,`${time}`,()=>{
        fs.unlinkSync(`./temp/${time}`)
    })
})

app.listen(4000,()=>{
    console.log("servidor en linea")
})