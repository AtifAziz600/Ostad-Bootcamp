// Path Module

const path = require("path");

const filePath = "/user/local/ExploringBuiltinModulesPathOSURLetc.js";

console.log(path.basename(filePath));
console.log(path.dirname(filePath));
console.log(path.extname(filePath));
console.log(path.parse(filePath));

//OS Module

const os = require("os");

console.log("Operating system is - ", os.platform());
console.log("Operating system is - ", os.release());
console.log("Operating system is - ", os.type());
console.log("Operating system is - ", os.arch());
console.log("Operating system is - ", os.release());
console.log("Operating system is - ", os.totalmem());
console.log("Operating system is - ", os.freemem());
console.log("Operating system is - ", os.cpus());
console.log("Operating system is - ", os.uptime());
console.log("Operating system is - ", os.hostname());
console.log("Operating system is - ", os.networkInterfaces());
console.log("Operating system is - ", os.userInfo());
console.log("Operating system is - ", os.tmpdir());
console.log("Operating system is - ", os.homedir());


//URL Module

const url = require("url");

const add = "https://www.google.com";

const urlParse = url.parse(add, true);

console.log(urlParse.host);
console.log(urlParse.hostname);
console.log(urlParse.href);
console.log(urlParse.pathname);


const myURL = new URL("https://www.google.com");

console.log(myURL.hostname);

