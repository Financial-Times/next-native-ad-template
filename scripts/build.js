'use strict';
const fetch = require('node-fetch');
const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const IN_FILE = path.resolve(__dirname, '../src/template.html');
const OUT_FILE = path.resolve(__dirname, '../dist/template.html');

const source = fs.readFileSync(IN_FILE, {encoding:'utf8'});
const template = Handlebars.compile(source);

fetch('http://ft-next-navigation.s3-website-eu-west-1.amazonaws.com/json/external.json')
	.then(response => {
		return response.json();
	}).then(json => {
		let data = {
			nav: json.native_ad_drawer
		};

		let output = template(data);
		fs.writeFileSync(OUT_FILE, output, {encoding:'utf8'})
});
