const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const insuranceRouter = require('./routers/router')

const app = express();

const port = '3000';

app.listen(process.env.PORT | port, () => {
    console.log(`Server is running on port - ${process.env.PORT | port}`);
});
app.use(cors())
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'POST, GET')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
})
app.use('/insurence', insuranceRouter);
app.all('*', (req, res) => {
    res.status(403).send('Not found');
})

app.use(clientErrorHandler);

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}
