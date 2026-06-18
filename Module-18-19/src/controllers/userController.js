const userModel = require("../models/userModel");
const { EncodedToken } = require("../utility/tokenHelper");
const bycrypt = require("bcrypt");

const options = {
    maxAge: process.env.Cookie_Expire_Time,
    httpOnly: false,
    samesite: "none",
    secure: true,
}

exports.register = async(req, res) => {
    try {
        const { email, password } = req.body;
        let ifUser = await userModel.find({ email })
        if(ifUser.length > 0){
            res.status(200).json({
                success: false,
                messsage: "Email is already Register"
            })
        }
        await userModel.create({ email, password })
        res.status(200).json({
            success: true,
            message: "User created successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong",
        })
    }
}

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({email});

        if(!user)
            res.status(200).json({
                success: false,
                message: "Invaild email or password"
            })
            const isMatch = await bycrypt.compare(password, user.password);
            if(!isMatch)
                return res.status(200).json({
                success: false,
                message: "Invaild email or password"
                })
            if(isMatch){
                let token = EncodedToken(user.email, user._id.toString());
                res.cookie('u_token', token, options);

                res.status(200).json({
                    success: true,
                    messgae: "User login successfully",
                    user: {
                    id: user._id,
                    email: user.email,
                    },
                    token: token,
                })
            }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            messgae: "Something went wrong"
        })
    }
}

exports.user = async(req, res) => {
    try {
        let email = req.header.email;
        let MatchStage = {
            $match: {
                email
            }
        }
        let project = {
            $project: {
                password: 0,
            }
        }
                let data = await userModel.aggregate([MatchStage, project])
                res.status(200).json({
                    success: true,
                    data: data,
                })
    } catch (error) {
        res.status(500).json({
        success: false,
        error: error.toString(),
        messgae: "Something went wrong"
        })
    }
}

exports.userVerify = async(req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User verify successfully"
        })
    } catch (error) {
        res.status(500).json({
        success: false,
        error: error.toString(),
        messgae: "Something went wrong"  
        })
    }
}

exports.logout = async(req, res) => {
    try {
        res.clearCookie('u_token');

        res.status(200).json({
            success: true,
            message: "User logout successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.userUpdate = async(req, res) => {
    try {
       let email = req.header.email;
       let _id = req.header._id;
       const { password, cus_name, cus_add, cus_city, cus_country, cus_fax, cus_phone, cus_postcode, cus_state, ship_name, ship_add, ship_city, ship_country, ship_phone, ship_postcode, ship_state} = req.body;
       const updateData = { password, cus_name, cus_add, cus_city, cus_country, cus_fax, cus_phone, cus_postcode, cus_state, ship_name, ship_add, ship_city, ship_country, ship_phone, ship_postcode, ship_state
       }
       const user = await userModel.findOne({email, _id});
       if(!user)
        res.status(200).json({
        success: false,
        message: "Invaild email"
        })
        
        if(password){
            const hashPassword = await bycrypt.hash(password, 10);
            updateData.password = hashPassword;
        }
        const isMatch = await bycrypt.compare(password, updateData.password)

        if(!isMatch)
            return res.status(200).json({
            success: false,
            message: "Invaild email or password"
            })
        if(isMatch){
            const user = await userModel.findByIdAndUpdate(_id, updateData, {
                new: true
            });

            let token = EncodedToken(user?.email, user?._id.toString());

            res.cookie("u_token", token ,options)
                        res.status(200).json({
                success: true,
                message: "User update successfully",
                user: {
                    email: user.email
                },
                token: token,
            })
        }

    } catch (error) {
        res.status(500).json({
        success: false,
        error: error.toString(),
        messgae: "Something went wrong"
        })
    }
}