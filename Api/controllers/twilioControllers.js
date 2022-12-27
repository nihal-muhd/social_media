const client = require('twilio')(process.env.TWILIO_FIRST_ID, process.env.TWILIO_SECOND_ID)
const serviceSid = process.env.TWILIO_SERVICE_ID

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
