const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const cors = require("cors")
const estudios = require("./estudios")
const series = require("./series")
const instancia = require("./instancias")
const file = require("./file")
const datosenlase = require("./datosenlase")
const http = require('http');
const nodemailer = require('nodemailer');
const mensaje = require('./generarcorreo')
const medibook = require('./medibook')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jose.camacho@medicaltecsrl.com',
        pass: 'Camachomm310188'
    }
});

//const credentials = {key: privateKey, cert: certificate};

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
        console.log(lista_series[i])
        if(description.length == 0){
            lista_series[i].DESCRIPCION = `toma ${i}`
            console.log(`toma ${i}`)
        }else{
            lista_series[i].DESCRIPCION = description[0].DESCRIPCION
            console.log(description[0])
        }
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
    res.send(buffer)
    /*if (!fs.existsSync("./temp/")){
        fs.mkdirSync("./temp/");
    }
    fs.writeFileSync(`./temp/${time}`,buffer)
    res.download(`./temp/${time}`,`${time}`,()=>{
        fs.unlinkSync(`./temp/${time}`)
    })*/
})

app.post("/auth",(req,res)=>{
    res.json(auth.auth(req.body.username,req.body.password))
})

app.get("/isAuth/:token", (req,res)=>{
    let estado = auth.isAuth(req.params.token)
    res.json({auth:estado})
})

app.get("/getenlase/:id",async (req,res)=>{
    let dbid = req.params.id.split("@")[0]
    let pre_data = await datosenlase.datosEnlase(dbid)
    let data = { estudio: dbid,paciente:"",fecha:"",descripcion:"" }
    for(let i = 0; i<=pre_data.length-1 ;i++){
        if(pre_data[i].tagGroup==8 && pre_data[i].tagElement==32){
            data.fecha = `${pre_data[i].value[6]}${pre_data[i].value[7]}/${pre_data[i].value[4]}${pre_data[i].value[5]}/${pre_data[i].value[0]}${pre_data[i].value[1]}${pre_data[i].value[2]}${pre_data[i].value[3]}`
        }
        if(pre_data[i].tagGroup==8 && pre_data[i].tagElement==4144){
            data.descripcion = pre_data[i].value
        }
        if(pre_data[i].tagGroup==16 && pre_data[i].tagElement==16){
            data.paciente = pre_data[i].value
        }
    }
    let token = auth.enlase(data)
    res.json({token:token})
})
app.post('/sharecorreo',(req,res)=>{
    let destinatario = req.body.destino
    let fechasys = new Date()
    let fecha = `${fechasys.getDate()}/${fechasys.getMonth()+1}/${fechasys.getFullYear()} ${fechasys.getHours()}:${fechasys.getMinutes()}`
    let titulo = `Estudio Radiologico ${fecha}`
    let datos = req.body.data
    var mailOptions = {
        from: 'jose.camacho@medicaltecsrl.com',
        to: destinatario,
        subject: titulo,
        html: mensaje.mail(datos)
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.json({res:'listo'})
        } else {
            console.log('Email sent: ' + info.response);
            res.send({res:'error'})
        }
    });
})
app.get('/medibook/:patid',(req,res)=>{
    let id = req.params.patid
    medibook.medibook(id)
    .then((res)=>{
        console.log(res)
    })
})
// app.listen(4000,()=>{
//     console.log("servidor en linea")
// })
var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

httpServer.listen(4000);
//httpsServer.listen(4043);