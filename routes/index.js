'use strict'

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/a', function(req, res) {
    res.json({name:1})
});


// 查询所有电影

router.get("/movies", function (req, res) {

    req.models.movie.find({id:1291545}, function(err, results)
    {
       if(err)
       {
           throw err;

       }else{
         // results = req.models.movie.title;

           console.log(results);
           res.json(results);
       }

    });

});



// 通过电影名查询电影类别

router.get("/123", function (req, res) {

    req.models.movie.find({title:'龙猫'}, function(err, movie)
    {
        if(err)
        {
            throw err;

        }else{
            let movie_id = movie[0].id;
               // console.log(movie_id);

            req.models.movie_genre.find({movie_id:movie_id}, function(err, results)
            {
                if(err)
                {
                    throw err;

                }else{
                    // results = req.models.movie.title;

                    console.log(results);
                    res.json(results);
                }

            });

            //
            // console.log(results);
            // res.json(results);
        }

    });


});

// 按电影名查询详细信息
router.post('/movies/detail', function(req, res) {
    req.models.movie.find({id:1291545}, function(err, results)
    {
        if(err)
        {
            throw err;

        }else{
            // results = req.models.movie.title;

            console.log(results);
            res.json(results);
        }

    });
});

module.exports = router;
