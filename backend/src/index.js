const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();
app.use(cors());
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
// });
app.use(express.json());
app.use(routes);
app.listen(3333);