/**
 * This server is used in the local machine for DEV checking the build.
 * It serves files from the ../frontend-dist/ directory through port 3000
 */
var express = require('express');
var app = express();

var PORT = 3000;
var STATIC_DIR = './dist';

app.use(express.static(STATIC_DIR));
app.listen(PORT, err => {
    if (err)
        throw 'could not open server';
    else
        console.log(`server up and running on PORT ${PORT}`);
});
