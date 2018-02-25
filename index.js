var { spawn } = require("child_process");
var parser = require("xml2json");
var fs = require("fs");

var scan = function(callback){
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
						callback(err);
						return;
					}
					let jsontext = JSON.parse(parser.toJson(text));
					callback(null,jsontext.nmaprun.host);
				});
			}
		});
	});
	
}
module.exports = scan;
