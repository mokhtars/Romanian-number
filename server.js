var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var SSE = require('sse');
var http = require ('http')

var nbRomain = '';

function romanize(num) {
    var lookup = {M:1000,CM:900,D:500,CD:400,C:100,IC:99,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
//   if (num==0 || !Number.isInteger(num) ){
//       return 'veuillez saisir un entier ou une valeur différente de 0 '}
  for ( i in lookup ) {
        while ( num >= lookup[i] ) {
            roman += i;
            num -= lookup[i];
        }
        }
        return roman;
    }


var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());


app.post('/romain', function(req, res) {
    var nbSaisie = req.body.name;
 
    nbRomain = romanize(nbSaisie)

    var server = http.createServer((req, res) =>{
        res.writeHead(200,{
            'Content-type': 'text/event-stream',
            'Access-Control-Allow-Origin' : '*'
        });
        msg = 'data:' + nbRomain + '\n\n'
        res.write(msg)
        server.listen(3000,'127.0.0.1', () =>{
            var sse = new SSE(server);
            sse.on('connection')
        })
    });});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
