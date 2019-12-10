const jwt = require("jsonwebtoken")
module.exports.auth = function auth(username, password){
    if(username=="demo" && password=="demo"){
        let payload = {
            usuario:"demo"
        }
        let token = jwt.sign( payload,"MedicalTec310188",{expiresIn:172800} )
        return(  {mensaje:"",token:token,acceso:true} )
    }else{
        return( {mensaje:"ERROR DE AUTENTICACION",token:"",acceso:false} )
    }
}

module.exports.isAuth =function isAuth(token){
    try{
        jwt.verify(token,"MedicalTec310188")
        return true
    }catch(e){
        return false
    }

}

module.exports.enlase = function enlase(data){
    let token = jwt.sign( data,"MedicalTec310188",{expiresIn:"48h"} )
    return(token)
}