const express = require('express');
var cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 8877;
const DATABASE_URL = process.env.DATABASE_URL;

app.listen(PORT, () => {
  console.log('Escutando na porta: ' + PORT);
  console.log('Database: ' + DATABASE_URL);
});
