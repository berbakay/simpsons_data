const { readFile } = require('fs');

exports.getAPIs = (req, res, next) => {
    readFile('./endpoints.json', (err, data) => {
        if(err) next(err);
        else {
            res.status(200).send(JSON.parse(data));
        }
    })
}