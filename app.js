const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose  = require('mongoose');
const metaRouter = require('./routers/router');
const uploadRouter = require('./routers/uploadRoutes');

const app = express();

const port = '3000';

app.listen(process.env.PORT | port, () => {
    console.log(`Server is running on port - ${process.env.PORT | port}`);
});

mongoose.connect('mongodb+srv://dbkrs:bwc%40123@cluster0.fyth4.mongodb.net/hack?retryWrites=true&w=majority')
.then((data)=>{
    console.log("Connected");
})
.catch(err => console.log(err));


app.use(cors())
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'POST, GET')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
})

app.use('/v1/di', metaRouter);
app.use('/upload', uploadRouter)

app.all('*', (req, res) => {
    res.status(403).send('Not found');
});

app.use(clientErrorHandler);

function clientErrorHandler(err, req, res, next) {
    if (err) {
        res.status(500).send({ message: 'Something failed!', error: err })
    } else {
        next(err)
    }
}
