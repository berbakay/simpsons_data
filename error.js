exports.handle405 = (req, res, next) => {
    res.status(405).send({msg: 'Invalid Method'});
}

exports.handle404 = (req, res, next) => {
    res.status(404).send({msg: 'Path does not exist'})
}

exports.handle400 = (err, req, res , next) => {
    if(err === 400 || err.code === '22P02' || err.code === '42703') res.status(400).send({msg: 'no episode found'})
    else (next(err))
}

exports.handle500 = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: 'Internal Server Error'});
}