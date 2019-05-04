const express = require('express');
const bodyParser = require('body-parser');
const GlpkSolver = require('./GLPK');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send({ express: 'Teste' });
});


app.post('/api/otimizar', (req, res) => {
    GlpkSolver.solve(req.body, res);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Listening on port ${port}'));