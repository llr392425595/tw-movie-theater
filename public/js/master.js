"use strict";
define(function (require, exports, module) {
    let service = require('./service');
    let masterPage = {
        html:{
            topNav : $('#top-nav'),
            content : $('.content')
        },
        ajax:{
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

        },
        render:{
            init:function () {
                masterPage.render.navContent();
                masterPage.render.listContent();
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
            }

        },
        control:{
            init:function () {
                $(document).on('click','.movieItem',function (e) {
                    let elem = $(e.target);
                    let data = {};
                    data.title = 'detail';
                     masterPage.render.detailContent(data);
                })
            }
        },
        fun:{

        },
        init:function(){
            masterPage.render.init();
            masterPage.control.init();
        }
    };
    masterPage.init()
});