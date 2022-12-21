const client = require('twilio')('ACb6aab4102c23e7c2b22fb0ca89af0ab4', 'c7e44300305e1ffc5edbcdda203b2b27')
const serviceSid = 'VA73318f9dd61f21c7f30b72272c466790'

module.exports = {

  doSms: (userData) => {
    let res = {}
    return new Promise(async (resolve, reject) => {
      try {
        res = await client.verify.services(serviceSid).verifications.create({
          to: `+91${userData.mobile}`,
          channel: 'sms'
        })
        res.valid = true
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  },

  otpVerify: (otpNumber, mobile) => {
    console.log(otpNumber, mobile, 'twilio')
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
