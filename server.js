const express = require('express');
//const bodyParser = require('body-parser');
//constGlpkSolver = require('./Glpk');

const app = express();

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));*/


app.get('/', (req, res) => {
  res.send({ express: 'Teste' });
});

const rotas = require('./rotas')
app.use('/api', rotas)

app.use(express.static(__dirname + '/client'))

/*app.post('/api/optimize', (req, res) => {
    GlpkSolver.solve(req.body, res);
});*/

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Listening on port ${port}'));