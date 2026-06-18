const { DecodedToken } = require("../utility/tokenHelper");

module.exports = (req, res, next) => {
    let token = req.cookies['a_token'];
    let decode = DecodedToken(token);
    if(decode === null){
        return res.status(401).json({
            status: 401,
            message: "Invaild Token"
        });
    } else {
        let email = decode["email"];
        let _id = decode["_id"];
        req.header.email = email;
        req.header._id = _id;
        next();
    }
}