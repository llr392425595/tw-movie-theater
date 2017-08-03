"use strict"
exports.searchByName = function(req, res, next) {
    "use strict";
    req.models.movie.find({title: decodeURIComponent(req.params.title)}, function(err, movies) {
        if (err) {
            res.send(err)
        }
        console.log('Movie found: %d', movies.title)
        //movies是一个Array
        res.send(JSON.stringify(movies))
    })
}

exports.category = function(req, res, next) {
    "use strict";
    console.log(req.params.genre_id)
    req.models.genre.find({id: req.params.genre_id}, function(err, genre) {
        if (err) {
            res.send(err)
        }
        //let genre_name = genre[0].name
        req.models.movieGenre.find({genre_id: req.params.genre_id}, function(err, movies) {
            if (err) {
                res.send(err)
            }
            let movieIdList = movies.map(function(element) {
                return element.movie_id
            })
            req.models.movie.find({id: movieIdList}, function(err, movies) {
                if (err) {
                    res.send(err)
                }
                res.send(movies)
            })
        }
        )
    })
}