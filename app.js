const express = require('express');

const app = express();
app.set('view engine', 'jade');
app.use('/img', express.static('src/img'));
app.use('/css', express.static('src/css'));
app.use('/js', express.static('src/js'));
app.get('/', function (req, res) {
	res.render('index', {
		pageTitle: 'Kanban IT',
		header: 'Kanban IT'
	});
});
app.get('/contact', (req, res) => {
	res.render('contact', {
		pageTitle: 'Contact',
		header: 'Contact with author'
	});
});
app.get('/app', (req, res) => {
	res.render('app', {
		pageTitle: 'Kanban IT',
		header: "let's Kanban IT!"
	});
});
app.listen(3000, () => {
	console.log("IT'S.... ALIVE! IT'S ALIVEEEE!")
});
