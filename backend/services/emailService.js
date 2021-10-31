import nodemailer from 'nodemailer'

export const sendVerificationToEmail = async (email, token) => {
  try {
    var transporter = await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'tzachtests@gmail.com',
        pass: 'tzachTests11!',
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    const output = `
    <p>
        Hi,
        To continue the process, go to the following link: 
        <a href='http://localhost:3000/lastregistration/${token}'>link</a>
      </p> 
    `

    var mailOptions = {
      from: 'tzachtests@gmail.com',
      to: email,
      subject: 'Verification for further process !',
      html: output,
    }
    await transporter.sendMail(mailOptions)
  } catch (e) {
    throw e
  }
}
