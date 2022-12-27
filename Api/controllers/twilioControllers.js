const client = require('twilio')('ACb6aab4102c23e7c2b22fb0ca89af0ab4', 'c070c5c874293219603bd31aef448d54')
const serviceSid = 'VA73318f9dd61f21c7f30b72272c466790'

module.exports = {

  doSms: (userData) => {
    console.log(userData, 'at otp')
    let res = {}
    return new Promise(async (resolve, reject) => {
      try {
        res = await client.verify.services(serviceSid).verifications.create({
          to: `+91${userData.mobile}`,
          channel: 'sms'
        })
        console.log(res, 'response from twilio')
        res.valid = true
        resolve(res)
      } catch (error) {
        console.log('catch error')
        reject(error)
      }
    })
  },

  otpVerify: (otpNumber, mobile) => {
    return new Promise(async (resolve, reject) => {
      await client.verify.services(serviceSid).verificationChecks.create({
        to: `+91${mobile}`,
        code: otpNumber
      }).then((verification) => {
        console.log('verification success')
        resolve(verification.valid)
      }).catch((err) => {
        reject(err)
      })
    })
  }

}
