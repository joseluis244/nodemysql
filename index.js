const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const cors = require("cors")
const estudios = require("./estudios")
const series = require("./series")
const instancia = require("./instancias")
const file = require("./file")
const fs = require("fs")
const http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync('/var/www/html/medicaltecsrl/ssl/private.key', 'utf8');
const certificate = fs.readFileSync('/var/www/html/medicaltecsrl/ssl/certificate.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const auth = require("./auth")
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    for(let i = 0; i<=lista_series.length-1; i++){
        let description = await series.descripcion(lista_series[i].SER_ID)
        console.log(description)
    }
    res.json(lista_series)
})

app.get("/getinstancias/:id", async (req,res)=>{
    //console.log(req.params.id)
    let inst = await instancia.instanacias(req.params.id)
    res.json(inst)
})
app.get("/getfile/:id",async (req,res)=>{
    let time = new Date().getTime()
    let files = await file.file(req.params.id)
    let buffer = files[0].content
    if (!fs.existsSync("./temp/")){
        fs.mkdirSync("./temp/");
    }
    fs.writeFileSync(`./temp/${time}`,buffer)
    res.download(`./temp/${time}`,`${time}`,()=>{
        fs.unlinkSync(`./temp/${time}`)
    })
})

app.post("/auth",(req,res)=>{
    res.json(auth.auth(req.body.username,req.body.password))
})

app.get("/isAuth/:token", (req,res)=>{
    let estado = auth.isAuth(req.params.token)
    res.json({auth:estado})
})

// app.listen(4000,()=>{
//     console.log("servidor en linea")
// })
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(4000);
httpsServer.listen(4043);