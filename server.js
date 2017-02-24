// jshint node: true
'use strict';

var express = require('express');
var app = express();
var https = require("https");

// ---------------------------------------
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

// ---------------------------------------
// ROTAS
app.get('/', (req, res, next) => {
	res.redirect('/pag-1');
});

app.get('/pag-:pagina', (req, res, next) => {
	let pagina = req.params.pagina;
	var options = {
	  host: 'reqres.in',
	  path: '/api/users?page=' + pagina
	};
	externalData(options, (jsonUsers) => {
		res.render('index', { users: trataNomes(jsonUsers.data), dados: jsonUsers});
	});
});

// pega os dados da API
// http://reqres.in/api/users?page=1
var externalData = (options, callback) => {
	https.get(options, function (res) {
		var output = '';
		// console.log(options.host + ':' + res.statusCode);
		res.setEncoding('utf8');

		res.on('data', function (chunk) {
		  output += chunk;
		});

		res.on('end', function() {
	    var obj = JSON.parse(output);
			callback(obj); // <--- callback async
		});
	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	});
};


// ---------------------------------------
// trata os nomes dos users
var trataNomes = (users) => {
  users.map((user) => {
    user.first_name = capitalizeFirstLetter(user.first_name);
    user.last_name = abreviaLastName(user.last_name);
  });
  return users;
};

// primeira letra maiuscula
var capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// abrevia sobrenome
var abreviaLastName = (nome) => {
  return nome.charAt(0).toUpperCase();
};

// ---------------------------------------
// Ouvindo porta 3000,
app.listen(process.env.PORT || 3000, () => {
	console.log('server rodando!: ');
});