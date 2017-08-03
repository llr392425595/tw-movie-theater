"use strict";
define(function (require, exports, module) {
    let service = {
        root : 'http://localhost:3000/',
        Movies : {
            //获取所有电影(分页)
            getAllMovies : function () {
                return service.root + "movies"
            },
            //根据电影名字查询电影信息(模糊)
            getMovieByName : function (movieName) {
                return service.root + "movies/title/" + movieName
            },
            //根据电影名字查询电影信息
            getMovieById : function (movieId) {
                return service.root + "movies/id/" + movieId
            },
            //根据分类id查询电影
            getMoviesByGenreId : function (genreId) {
                return service.root + "movies/genre/" + genreId
            },
            getMoviesByPage : function () {
                return service.root + "movies/page"
            }
        },
        Genre : {
            //查询所有的类别
            getAllGenre : function () {
                return service.root + "genres"
            },
            //根据id查类别
            getGenreById : function (genreId) {
                return service.root + "genres/" + genreId
            },
            //查询某电影的类别
            getGenreByMovieId : function (movieId) {
                return service.root + "genres/movie/" + movieId
            }
        }
    };
    module.exports = service;
});