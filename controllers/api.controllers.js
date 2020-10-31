const fs = require('fs');

exports.getAPIs = (req, res, next) => {
    fs.readFile('./endPoints.json', (err, data) => {
        if(err) next(err);
        else {
            res.status(200).send(JSON.parse(data));
        }
    })
}