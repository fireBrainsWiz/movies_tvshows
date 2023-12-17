import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import User from '../models/userModel'

export async function sendEmail({email, emailType, userID}: any) {

  try {
    const hashedToken = await bcryptjs.hash(userID.toString(), 10)//toString() to garantee that it is a string

    //? save to db
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userID, {
        //find the user and update the verifyToken and verifyTokenExpiry
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3_600_000
      })
      
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3_600_000
      })
    } 

    //? send to user
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    })

    const mailOptions = {
      from: 'elaiswild@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',

      // text: `verify your email by clicking on the link: http://localhost:3000/verifyemail?token=${hashedToken}`,
      
      html:  ` <p>
      Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "login/resetpassword"}?token=${hashedToken}">here 😊</a> to 
      ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
      </p>`
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    return mailResponse

  } catch(error:any) {
    console.log(error)
  }
}


/* 
  const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "52e2f580725c62",
    pass: "844bc29bad6a27"
  }
});
 */

