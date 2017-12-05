const express = require('express');
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

var app = express();
var fs = require('fs');
app.set('view engine', 'hbs');

//check maintenance before everything else

// app.use((request, response, next) => {
// 	response.render('maintenance.hbs', {
// 		pageTitle: "Maintenance Page",
// 		maintenanceMsg: "We'll be right back!"
// 	});
// });

//add public file sharing

app.use(express.static(__dirname + '/public'));

//rest of website

app.use((request, response, next) => {
	var now = new Date().toString();
	var log = `${now}: ${request.method}, ${request.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err)
			console.log(err);
	});
	next();
});

hbs.registerHelper('getCurrentYear', () =>
{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>
{
	return text.toUpperCase();
});

//setting up url handlers to handle home page, etc
//homepage
app.get('/', (req, res) => {
	//res.send('<h1>Hello Express</h1>');
	res.render('home.hbs', {
		pageTitle: "Home Page",
		welcomeMessage: "Welcome to dope website!!!"
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: "About Page"
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: 'Unable to handle request'
	});
});

app.listen(3000, () =>
{
	console.log('server is up on port 3000');
});