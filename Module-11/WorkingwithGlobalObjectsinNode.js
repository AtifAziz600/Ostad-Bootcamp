console.log(__dirname);// in this __dirname command we can check the directory name 
console.log(__filename);// in this we can check the __filename

console.error("Hello Error");
console.warn("Hello Warn");
console.log("Hello");
console.table("Hello Table");

setInterval(() =>{
    console.log(new Date().toLocaleTimeString())
}, 2000)

setTimeout(() => {
    console.log("After 2 sec it will show");
}, 2000)

console.log(process.platform);
console.log(process.argv);

global.myName = "Alex";

console.log(myName);