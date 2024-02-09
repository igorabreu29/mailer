import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'dewitt.haag87@ethereal.email',
      pass: 'mGbzQw2SR2PFzHfx4R'
  }
})