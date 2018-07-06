var express = require('express');
var app = express();
var bot = require('./core/core.js');
var createPlayer = require('web-audio-player')
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

var server = app.listen(3000);
var io = require('socket.io').listen(server);


var textToSpeech = new TextToSpeechV1({
    username: '8c9f4599-81de-4020-8253-54e1dbc6651f',
    password: 'Ob1nL8jQ6kLj'
});



app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
io.on('connection', function (socket) {
    socket.on('isFinal', function (data) {
        //console.log(data);
        bot.getResposta(data).then(function(res){
            var synthesizeParams = {
                text: res,
                accept: 'audio/mp3',
                voice: 'pt-BR_IsabelaVoice'
            };
            console.log(res);
            // Pipe the synthesized text to a file.
            textToSpeech.synthesize(synthesizeParams).on('error', function(error) {
                console.log(error);
            }).pipe(fs.createWriteStream('./sounds/fala.mp3'));
            
        });
        
    });
    
});
