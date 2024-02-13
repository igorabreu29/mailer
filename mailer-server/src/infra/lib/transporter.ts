import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'tiana22@ethereal.email',
      pass: 'q7TtcfZcaDdJg5P7fy'
  }
})