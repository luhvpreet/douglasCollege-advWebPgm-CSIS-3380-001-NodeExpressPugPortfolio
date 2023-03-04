const express = require('express')
const myApp = express()
const path = require('path');
const port = 3000
myApp.use(require('body-parser').json());

myApp.set('view engine', 'pug')
myApp.use(express.static(path.join(__dirname, 'public')));

const jsondata = require('./data.json')
const portfolio = jsondata.portfolios
const project = jsondata.projects
const contact = jsondata.contact
const skills = jsondata.skills
myApp.get('/', (req, res) => {
    console.log(portfolio)
    res.render('index', {
        title:"Sample portfolio with express.js and Pug",
        description:"portfolio of sample project with express.js and Pug",
        contact:contact,
        portfolio:portfolio,
        project: project })


})

myApp.get('/about', (req, res) => {
    res.render('about',{portfolio:portfolio,contact:contact,skills:skills})


})
myApp.get('/projects/:id', (req, res) => {

    const a = jsondata.projects
    const project_name = a[req.params.id].project_name
    const description = a[req.params.id].description
    const links = a[req.params.id].links
    const technologies = a[req.params.id].technologies
    const image_url = a[req.params.id].image_url

    res.render("project", { id: req.params.id,
        portfolio:jsondata.portfolios,
        technologies:technologies,image_url:image_url, project_name:project_name, description:description, links:links , aa:a });

})



myApp.listen(port, () => {
    console.log(`App listening on port: http://localhost:${port}`)
})