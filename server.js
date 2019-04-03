var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// where we put the romanian number to display it
var nbRomain = '';

function romanize(num) {
    /* data dictionary 
       i added the 40 and 90 and 99 
    */
    var lookup = {C:100,IC:99,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
//   if (num==0 || !Number.isInteger(num) ){
//       return 'veuillez saisir un entier ou une valeur différente de 0 '}
  for ( i in lookup ) {
        while ( num >= lookup[i] ) {
            //concatenation of the value
            roman += i;
            //substract the numbers till we have 0
            num -= lookup[i];
        }
        }
        return roman;
    }

// number of port where we listen
var PORT = process.env.PORT || 3000;
//pars the post data
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/romain', (req, res) =>{
    res.send({ nbRomain });
});

app.post('/romain', (req, res) => {
    var nbSaisie = req.body.name;
    // retreive the romanian number
    nbRomain = romanize(nbSaisie)

    res.send();
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
