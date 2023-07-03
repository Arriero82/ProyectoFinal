import nodemailer from 'nodemailer'
import config from '../config/index.js'

const { serviceMail, serviceMailPort, emailUser, emailPassword } = config.email

const transport = nodemailer.createTransport({
    service: serviceMail,
    port: serviceMailPort,
    auth: {
        user: emailUser,
        pass: emailPassword
    }
})

export default transport

