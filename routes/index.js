const express = require('express');
const router = express.Router();


//获取所有电影(分页)-----"movies"
router.get('/movies', function(req, res) {
    req.models.movie.find(function (err, movies) {
        if (err) {
            res.send(err)
        }
        res.send(movies)
        res.end()
    })
});
//根据电影名字查询电影信息(模糊)----"movies/?movieName="
router.get('/movies/:title', function(req, res) {
    req.models.movie.find({title: decodeURIComponent(req.params.title)}, function(err, movies) {
        if (err) {
            res.send(err)
        }
        console.log('Movie found: %d', movies.title)
        //movies是一个Array
        res.send(JSON.stringify(movies))
    })
});
//根据分类id查询电影----"movies/genre/?genreId="
router.get('/movies/genre/:genre_id', function(req, res) {
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
                req.models.movie.find({id: movieIdList}, ['rating', 'A'] ,function(err, movies) {
                    if (err) {
                        res.send(err)
                    }
                    res.send(movies)
                })
            }
        )
    })
});
//查询所有的类别----"genres"根据id查类别
router.get('/genres', function(req, res) {
    req.models.genre.find(function (err, genre) {
        if (err) {
            res.send(err)
        }
        res.send(genre)
        res.end()
    })
});
//根据id查类别----"genres?genreId=" + genreId    //返回的数据:{"data":{"id":1,"name":"剧情"}}
router.get('/genres/:genreId', function(req, res) {
    let genreId = req.params.genreId;
    req.models.Genre.find({id:genreId}, function(error, genres) {
        if(genres.length===1){
            res.status(200).json({data:genres[0]})
        }else {
            res.status(200).json({data:genres[0]})
        }
    });
});
//查询某电影的类别----"genres/movie/?movieId=" + movieId
router.get('/genres/movie/:movieId', function(req, res) {

});

module.exports = router;
