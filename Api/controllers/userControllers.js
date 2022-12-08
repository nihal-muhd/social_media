const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const twilioController = require('../controllers/twilioControllers')
const jwt = require('jsonwebtoken')
const PostModel = require('../models/postModel')

const getUser = async (token) => {
    try {
        const jwtToken = jwt.verify(token, process.env.TOKEN_KEY)
        const userID = jwtToken.userId
        const user = await UserModel.findOne({ _id: userID })
        return user
    } catch (error) {
        console.log(error)
    }
}

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
                    res.status(201).json({ Id: user._id, name: user.name, email: user.email, mobile: user.mobile, profile: user.profilePicture, cover: user.coverPicture })
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

module.exports.getUserData = async (req, res, next) => {
    try {
        const user = await getUser(req.cookies.jwt)
        res.status(201).json({ Id: user._id, name: user.name, email: user.email, mobile: user.mobile, profile: user.profilePicture, cover: user.coverPicture, education: user.education, worksAt: user.worksAt, city: user.city, relation_status: user.relation_status })
    } catch (error) {
        console.log(error)
    }
}

module.exports.postUpload = async (req, res, next) => {
    try {
        const postData = req.body
        await PostModel.create(postData)
    } catch (error) {
        console.log(error)
    }
}

module.exports.getPost = async (req, res, next) => {
    try {
        const post = await PostModel.find().sort({ createdAt: -1 })
        res.status(201).json({ post })
    } catch (error) {
        console.log(error)
    }
}

module.exports.likePost = async (req, res, next) => {
    try {
        const postID = req.body.postId
        const userID = req.body.userId
        await PostModel.updateOne({ _id: postID }, {
            $push: {
                likes: userID
            }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.unlikePost = async (req, res, next) => {
    try {
        const postID = req.body.postId
        const userID = req.body.userId
        await PostModel.updateOne({ _id: postID }, {
            $pull: {
                likes: userID
            }
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.updateProfile = async (req, res, next) => {
    try {
        const profileURL = req.body.profileData.profileurl
        const userId = req.body.profileData.userId
        await UserModel.updateOne({ _id: userId }, {
            $set: {
                profilePicture: profileURL
            }
        })
        res.status(201).json({ status: 'success' })
    } catch (error) {

    }
}

module.exports.updateCover = async (req, res, next) => {
    try {
        console.log("hii")
        const coverURL = req.body.profileData.coverurl
        const userId = req.body.profileData.userId
        await UserModel.updateOne({ _id: userId }, {
            $set: {
                coverPicture: coverURL
            }
        })
        res.status(201).json({ status: 'success' })
    } catch (error) {

    }
}

module.exports.updateInfo = async (req, res, next) => {
    try {
        const info = req.body.formData
        const userId = req.body.userId
        await UserModel.updateOne({ _id: userId }, {
            $set: {
                name: info.name,
                education: info.education,
                worksAt: info.worksAt,
                city: info.city,
                relation_status: info.relation_status
            }
        })
        res.status(201).json({ status: 'success' })
    } catch (error) {

    }
}