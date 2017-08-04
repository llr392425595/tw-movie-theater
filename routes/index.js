"use strict";
const express = require('express');
const router = express.Router();
const orm = require('orm');

//获取电影(分页)
router.get('/movies/page', function(req, res) {
    let currentPage = req.query.page;
    req.models.movie.find(function (err, movies) {
        if (err) throw err;
        let len = movies.length;
        let pageCount = Math.ceil(len/8);
        let currentPageMovies = movies.slice(8*(currentPage-1),8*(currentPage-1)+8);
        let curPageData = {
            pageCount,
            currentPageMovies,
        };
        res.status(200).json({data:curPageData});
        res.end()
    })
});
//获取所有电影-----"movies"
router.get('/movies', function(req, res) {
    req.models.movie.find(function (err, movies) {
        if (err) throw err;
        res.status(200).json({data:movies});
        res.end()
    })
});
//根据电影名字查询电影信息(模糊)(分页)
router.get('/movies/title/:title', function(req, res) {
    let title=req.params.title;
    let currentPage = req.query.page;
    req.models.movie.find({title:orm.like("%"+title+"%")}, function(err, movies) {
        if (err) throw err;
        if(currentPage){
            let len = movies.length;
            let pageCount = Math.ceil(len/8);
            let currentPageMovies = movies.slice(8*(currentPage-1),8*(currentPage-1)+8);
            let curPageData = {
                pageCount,
                currentPageMovies,
            };
            res.status(200).json({data:curPageData});
            res.end()
        }else {
            res.status(200).json({data:movies})
        }
    });
});
//根据电影id查询电影信息
router.get('/movies/id/:id', function(req, res) {
    req.models.movie.find({id: (req.params.id)}, function(err, movies) {
        if (err) throw err;
        res.status(200).json({data:movies})
    })
});
//根据分类id查询电影并分页
router.get('/movies/genre/:genre_id', function(req, res) {
    let genre_id = req.params.genre_id;
    let currentPage = req.query.page;
    req.models.genre.find({id: genre_id}, function(err, genre) {
        if (err) {
            throw err;
        }
        else {
            let genreId = genre[0].id;
            req.models.movieGenre.find({genre_id: genreId}, function(err, movies) {
                if (err) throw err;
                let movieIdList = movies.map(function(element) {
                    return element.movie_id
                });
                if(movieIdList.length > 0){
                    req.models.movie.find({id: movieIdList}, ['rating', 'A'] ,function(err, movies) {
                        if (err) throw err;
                        if(currentPage){
                            let len = movies.length;
                            let pageCount = Math.ceil(len/8);
                            let currentPageMovies = movies.slice(8*(currentPage-1),8*(currentPage-1)+8);
                            let curPageData = {
                                pageCount,
                                currentPageMovies,
                            };
                            res.status(200).json({data:curPageData});
                            res.end()
                        }else {
                            res.status(200).json({data:movies})
                        }
                    })
                }else {
                    res.status(200).json({data:{}})
                }
            })
        }

    })
});
//查询所有的类别----"genres"
router.get('/genres', function(req, res) {
    req.models.genre.find(function (err, genres) {
        if (err) throw err;
        res.status(200).json({data:genres});
    })
});
//根据id查类别----"genres?genreId=" + genreId    //返回的数据:{"data":{"id":1,"name":"剧情"}}
router.get('/genres/:genreId', function(req, res) {
    let genreId = req.params.genreId;
    req.models.genre.find({id:genreId}, function(err, genres) {
        if (err) throw err;
        if(genres.length===1){
            res.status(200).json({data:genres[0]})
        }else {
            res.status(200).json({data:genres[0]})
        }
    });
});
//查询某电影的类别----"genres/movie/?movieId=" + movieId
// router.get('/genres/movie/:movieId', function(req, res) {
//     let movieId = req.params.movieId;
//     req.models.movieGenre.find({movie_id: movieId}, function(err, movieGenre) {
//         if (err) throw err;
//         let genreId = movieGenre[0].genre_id;
//         req.models.genre.find({id:genreId}, function(err, genres) {
//             if (err) throw err;
//             if(genres.length===1){
//                 res.status(200).json({data:genres[0]})
//             }else {
//                 res.status(200).json({data:genres[0]})
//             }
//         });
//     })
// });

router.get('/genres/movie/:movieId', function(req, res) {
    let movieId = req.params.movieId;
    req.models.movieGenre.find({movie_id: movieId}, function(err, movieGenre) {
        if (err) throw err;
        let genreIds = [];
        movieGenre.forEach(function (item) {
            genreIds.push(item.genre_id)
        });
        req.models.genre.find({id:genreIds}, function(err, genres) {
            if (err) throw err;
            res.status(200).json({data:genres})
        });
    })
});

module.exports = router;
