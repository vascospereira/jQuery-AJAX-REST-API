const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.use((req, res, next) => {
    const error = new Error('Opss, Page Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
