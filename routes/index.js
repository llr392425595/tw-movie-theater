'use strict'
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/a', function(req, res) {
    res.json({name:1})
});

router.get('/movie', function (req, res) {
    // req.models is a reference to models used above in define()
    req.models.movie.find({id:1291560}, function(err, movie) {
      if (err) {
        res.send(err)
      }
      console.log(movie);
      res.json(movie);
    });
});

router.get('/genre', function (req, res) {
    // req.models is a reference to models used above in define()
    req.models.genre.find({}, function(error, genre) {
      console.log(genre);
      res.json(genre);
    });
});

router.get('/movie/horror', function (req, res) {
    // req.models is a reference to models used above in define()
    req.models.movie_genre.find({genre_id:9},function(err, movie_genreIds){
      if (err) {
        res.send(err)
      }
      let movieIds = [];
      for (let i = 0; i<movie_genreIds.length; i++) {
        movieIds.push(movie_genreIds[i].movie_id);
      }
      console.log(movie_genreIds)
      console.log(movieIds);
      req.models.movie.find({id:movieIds},function(err,movies){
          console.log(movies);
          res.json(movies);
      })
    })
});

module.exports = router;
