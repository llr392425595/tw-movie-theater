"use strict"

exports.testUrl = function(req, res, next) {
    req.models.movie.find({title: decodeURIComponent(req.params.title)}, function(err, movies) {
        if (err) {
            res.send(err)
        }
        console.log('Movie found: %d', movies.title)
        //movies是一个Array
        res.send(JSON.stringify(movies))
    })
}


exports.testUrl2 = function(req, res, next) {
    req.models.genre.find([{id: 1}, {id: 2}], function(err, genre) {
        console.log(genre)
    })
}