const adminModel = require("../models/adminModels");
const bycrypt = require("bcrypt");
const { EncodedToken } = require("../utility/tokenHelper");
// create admin 

const options = {
    maxAge: process.env.Cookie_Expire_Time,
    httpOnly: false,
    samesite: "none",
    secure: true,
}

exports.register = async(req, res) => {
    try {
        const {email, password} = req.body;
        await adminModel.create({email, password})
        res.status(200).json({
            success: true,
            message: "Admin created successfully",
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
        const {email, password} = req.body;

        const user = await adminModel.findOne({ email });
        if(!user)
            return res.status(200).json({
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
            res.cookie('a_token', token, options);

            res.status(200).json({
                success: true,
                message: "Admin login successfully",
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
            message: "Something went wrong",
        })
    }
}

exports.admin = async(req, res) => {
    try {
        let email = req.header.email;
        let MatchStage = {
            $match: {
                email
            }
        }
        // security perpose if we do not want password to pass
        let project = {
            $project: {
                password: 0,
            }
        }
        let data = await adminModel.aggregate([MatchStage, project])
        res.status(200).json({
            success: true,
            data: data,
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong",
        })
    }
}

exports.adminVerify = async(req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Admin verify successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong",
        })
    }
}

exports.adminLogout = async(req, res) => {
    try {
        res.clearCookie("a_token");

        res.status(200).json({
            success: true,
            message: "Admin logout successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong",
        })
    }
}

exports.adminUpdate = async(req, res) => {
    try {
        const {email, password} = req.body;
        const _id = req.header._id;

        let updateData = { email };
        const user = await adminModel.findOne({ email, _id });
        if(!user)
            return res.status(200).json({
                success: false,
                message: "Invaild Email"
            })
            if(password) {
                const hashPassword = await bycrypt.hash(password, 10);
                updateData.password = hashPassword;
            }

            const updateUser = await adminModel.findByIdAndUpdate( _id, updateData, {
                new: true
            })

            let token = EncodedToken(updateData?.email, updateUser?._id.toString());
            // set cookies
            res.cookie("a_token", token, options);

            res.status(200).json({
                success: true,
                message: "Admin update successfully",
                user: {
                    email: updateUser.email
                }
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong",
        })
    }
}