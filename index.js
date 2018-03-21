var { spawn } = require("child_process");
var parser = require("xml2json");
var fs = require("fs");

var scan = () => new Promise((resolve,reject) => {
	let nmap = spawn("nmap",["-oX","out.xml","-sn","192.168.1.1/24"]);
	let dataString = '';
	nmap.stdout.on("data", (data) => {
		dataString += data;
	});
	nmap.stdout.on("end",() => {
		fs.exists("out.xml",(exists)=>{
			if(exists){
				fs.readFile("out.xml","utf8",function(err,text){
					if(err){
						return reject(err);
					}
					//delete temp file
					fs.unlink("out.xml",function(err){
						if(err){
							return reject(err);
						}
						let jsontext = JSON.parse(parser.toJson(text));
						resolve(jsontext.nmaprun.host);
					});
				});
			}
		});
	});
	
});
module.exports = scan;
