const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const sites = require('./data');

//configuration for styles
server.use(express.static('public'));


// configuration to recognize pages
server.set('view engine', 'njk')
nunjucks.configure("views", { 
    express: server,
    autoescape: false,
    noCache: true
});

 
// home page
server.get('/', function (req,res){
    return res.render('courses', { items: sites});
});

// about page
server.get('/about', function(req,res){

    const about = {
        logo_url: "https://cdn-images-1.medium.com/max/1200/1*TkXVfLTwsHdwpUEjGzdi9w.jpeg",
        name: "Rocketseat",
        description: `As melhores tecnologias em programação, direto ao ponto e do jeito certo.
        No meio de tanta informação e da quantidade de ferramentas que surgem todos os dias,
        você precisa de alguém que te leve na direção certa`,
        title: "Principais Tecnologias",
        name_js: "Java Script",
        name_nodejs: "Node Js",
        name_reactjs: "React Js"

    };


    return res.render('about', {about: about});
});


// router site
server.get('/courses/:id', function(req, res) {
    const id = req.params.id;
    
    const site = sites.find(function(site){
        return site.id == id;
    });

    if(!site){
        return res.status(404).render('not-found');
    }

    return res.render('site', {item: site});
});

//error
server.use(function(req, res) {

    return res.status(404).render('not-found');
});

server.listen(5000, function(){
    console.log('server is rouning');
});

