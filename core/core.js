var apiai = require('apiai');
var app = apiai('ff85dbb70b1b4ab58bccc999d49f77ab');
const uuidv1 = require('uuid/v1');
var getResposta = function(query){
    var request = app.textRequest(query,{
        sessionId: uuidv1()
    });
    const respostaAPI = new Promise(function(resolve,reject){
        request.on('error',function(error){
            console.log('ocorreu um erro '+ error);
        });
        request.on('response',function(response){
            resolve(response.result.fulfillment.speech);
        });
        
    });
    request.end();
        return respostaAPI;
};
//getResposta('oi').then(function(res){console.log(res)});
module.exports = {getResposta}