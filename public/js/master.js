"use strict";
define(function (require, exports, module) {
    let service = require('./service');
    let masterPage = {
        html:{
            topNav : $('#top-nav'),
            content : $('.content'),
            formSearch : $('.dark-form'),
            inputSearch : $('.inputSearch')
        },
        ajax:{
            //获取所有类别
            getAllGenreData : function () {
                let allGenreData = [];
                $.ajaxSetup({async: false});
                $.get(service.Genre.getAllGenre(),function (data,status) {
                    if(data.data&&status==="success"){
                        allGenreData = data.data;
                    }
                });
                $.ajaxSetup({async: true});
                return allGenreData;
            },
            //根据类别查询电影
            getMoviesByGenreId : function (genreId) {
                let movies = [];
                $.ajaxSetup({async: false});
                $.get(service.Movies.getMoviesByGenreId(genreId),function (data,status) {
                    if(data.data&&status==="success"){
                        movies = data.data;
                    }
                });
                $.ajaxSetup({async: true});
                return movies;
            },
            //获取所有的电影
            getAllMovies : function(){
                let movies = [];
                $.ajaxSetup({async: false});
                $.get(service.Movies.getAllMovies(),function (data,status) {
                    if(data.data&&status==="success"){
                        movies = data.data;
                    }
                });
                $.ajaxSetup({async: true});
                return movies
            },
            //根据电影id获取电影信息
            getMovieById : function (movieId) {
                let movie = {};
                $.ajaxSetup({async: false});
                $.get(service.Movies.getMovieById(movieId),function (data,status) {
                    if(data.data&&status==="success"){
                        movie = data.data;
                    }
                });
                $.ajaxSetup({async: true});
                return movie
            },
            getGenreByMovieId : function (movieId) {
                let genre = {};
                $.ajaxSetup({async: false});
                $.get(service.Genre.getGenreByMovieId(movieId),function (data,status) {
                    if(data.data&&status==="success"){
                        genre = data.data;
                    }
                });
                $.ajaxSetup({async: true});
                return genre
            },
            getMovieByName : function (movieName) {
                let movie = {};
                $.ajaxSetup({async: false});
                $.get(service.Movies.getMovieByName(movieName),function (data,status) {
                    if(data.data&&status==="success"){
                        movie = data.data;
                    }
                });
                $.ajaxSetup({async: true});
                return movie
            }
        },
        render:{
            init:function () {
                masterPage.render.navContent();
                let movies = masterPage.ajax.getAllMovies();
                let tplData = {
                    moviesRows:masterPage.fun.chunk(movies,4)
                };
                masterPage.render.listContent(tplData);
            },
            navContent : function () {
                let allGenreData = masterPage.ajax.getAllGenreData();
                let tplData = {};
                tplData.navData = allGenreData;
                let html = template('nav1',tplData);
                masterPage.html.topNav.html(html);
            },
            listContent : function(data){
                let tplData = data || {};
                let html = template('tplMain',tplData);
                masterPage.html.content.html(html);
            },
            detailContent:function (data) {
                let tplData = data || {};
                let html = template('tplDetail',tplData);
                masterPage.html.content.html(html);
            },

        },
        control:{
            init:function () {
                //监听genreItem
                $(document).on('click','.genreItem',function (e) {
                    let elem = $(e.target);
                    let genreId = elem.attr("data-navId");
                    let movies = masterPage.ajax.getMoviesByGenreId(genreId);
                    let tplData = {
                        moviesRows:masterPage.fun.chunk(movies,4)
                    };
                    // console.log(tplData)
                    masterPage.render.listContent(tplData);
                });
                //监听movieItem
                $(document).on('click','.movieItem',function (e) {
                    window.scrollTo(0,0);
                    let elem = $(e.target).parent();
                    let movieId = elem.attr("data-movieId");
                    let genreData = masterPage.ajax.getGenreByMovieId(movieId);
                    let sameGenreMovies = masterPage.ajax.getMoviesByGenreId(genreData.id);
                    let likeMovies = [];
                    sameGenreMovies.forEach(function (item) {
                        if(item.id == movieId){
                             //console.log(item)
                        }else {
                            likeMovies.push(item)
                        }
                    });
                    let tplData = {
                        movie : masterPage.ajax.getMovieById(movieId)[0],
                        genre : genreData,
                        likeMovies : likeMovies.slice(0,4)
                    };
                    masterPage.render.detailContent(tplData);
                });
                //监听搜索表单
                masterPage.html.formSearch.on('submit',function (e) {
                    e.preventDefault();
                    let movieName = masterPage.html.inputSearch.val();
                    let movies = masterPage.ajax.getMovieByName(movieName);
                    if(movies.length > 0){
                        if(movies.length === 1){
                            let movieId = movies[0].id;
                            let genreData = masterPage.ajax.getGenreByMovieId(movieId);
                            let sameGenreMovies = masterPage.ajax.getMoviesByGenreId(genreData.id);
                            let likeMovies = [];
                            sameGenreMovies.forEach(function (item) {
                                if(item.id == movieId){
                                    //console.log(item)
                                }else {
                                    likeMovies.push(item)
                                }
                            });
                            let tplData = {
                                movie : masterPage.ajax.getMovieById(movieId)[0],
                                genre : genreData,
                                likeMovies : likeMovies.slice(0,4)
                            };
                            masterPage.render.detailContent(tplData);
                        }else {
                            layer.msg("不止一条数据!", {icon: 6});
                        }
                    }else {
                        layer.msg("没找到!", {icon: 5});
                    }
                })
            }
        },
        fun:{
            //切割数组的方法
            chunk : function (array, size) {
                const result = [];
                for (let x = 0; x < Math.ceil(array.length / size); x++) {
                    let start = x * size;
                    let end = start + size;
                    result.push(array.slice(start, end));
                }
                return result;
            },
            //构造模板数据
            createTplData : function () {},
            removeTheMovie : function(arr,movie) {
                let  index = arr.indexOf(movie);
                if (index > -1) {
                    this.splice(index, 1);
                }
            }
        },
        init:function(){
            masterPage.render.init();
            masterPage.control.init();
        }
    };
    masterPage.init()
});