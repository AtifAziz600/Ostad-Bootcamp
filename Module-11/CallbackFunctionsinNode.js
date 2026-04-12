function parseFun(){
    console.log("Hello Callback")
}

function mainFun(callback) {
    callback();
}

mainFun(parseFun);