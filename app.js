const express = require('express');
const app = express();

var port = process.env.PORT || 8080;
app.set('view engine', 'jade');

app.use('/img', express.static(__dirname + '/src/img'));
app.use('/css', express.static(__dirname + '/src/css'));
app.use('/js', express.static(__dirname + '/src/js'));
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
app.listen(port, () => {
	console.log("IT'S.... ALIVE! IT'S ALIVEEEE!")
});
