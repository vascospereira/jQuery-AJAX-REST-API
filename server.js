const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});
