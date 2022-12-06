const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const twilioController = require('../controllers/twilioControllers')
const jwt = require('jsonwebtoken')
const PostModel = require('../models/postModel')

module.exports.signup = async (req, res, next) => {
    try {
        const userVerify = await UserModel.findOne({
            $or: [
                { email: req.body.email },
                { mobile: req.body.mobile }
            ]
        })
        if (userVerify) {
            res.status(401).json({
                status: 'Email or mobile number already exist'
            })
        } else {
            let data = await twilioController.doSms(req.body)
            if (data) {
                res.status(201).json({
                    status: 'otp generated'
                })
            }
        }

    } catch (err) {
        console.log(err)
    }
}

module.exports.verifyUser = async (req, res, next) => {
    try {
        let result = await twilioController.otpVerify(req.body.otp, req.body.userData.mobile)
        console.log(result, "verification")
        if (result) {
            const userData = req.body.userData
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(userData.password, salt);
            userData.confirmPassword = await bcrypt.hash(userData.confirmPassword, salt);
            userData.Active = true
            await UserModel.create(userData)
            res.status(201).json({
                status: 'signup completed'
            })
        } else {
            res.status(401).json({
                status: 'otp verification failed'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const maxAge = 60 * 60 * 24;
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email })

        if (user) {
            if (user.Active) {
                const passwordCheck = await bcrypt.compare(password, user.password)
                if (passwordCheck) {
                    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: maxAge })
                    res.cookie("jwt", token, {
                        withCrdentials: true,
                        httpOnly: false,
                        maxAge: maxAge * 1000
                    })
                    res.status(201).json({ Id: user._id, name: user.name, email: user.email, mobile: user.mobile })
                } else {
                    res.status(401).json({ status: 'inavalid password' })
                }
            } else {
                res.status(401).json({ status: 'user have been blocked' })
            }

        } else {
            res.status(401).json({ status: 'inavalid email' })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.postUpload = async (req, res, next) => {
    try {
        const postData = req.body
        await PostModel.create(postData)

    } catch (error) {

    }
}

module.exports.getPost = async (req, res, next) => {
    try {

    } catch (error) {

    }
}