const nodemailer = require('nodemailer')
const  {google}  = require('googleapis')

const CLIENT_ID = '661669644839-ttpqn3sadg8o3hlprra7a7dk816c8l0p.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04SNrzMdMY9cqCgYIARAAGAQSNwF-L9IrlvMfg4slnBEbundH3-rB6j4yGYaQ3RWWdNjuOHjZOwNfM-BxBFR_bsrQiUFiLVsfDjY' 

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token:REFRESH_TOKEN })

export async function sendMail(Username){ 
try{ 
    const  accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'roshanpalkandwar@gmail.com',
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:accessToken
        }
    })

    const mailoption = {
        from: 'Roshan  <roshanpalkandwar@gmail.com>',
        to: 'roshanpalkandwar4567@gmail.com',
        subject: "CREATING GMAIL API",
        text: 'Reset Password',
        html: '<h1></h1>Reset Password</h1>',
    };

    const Result = await transport.sendMail(mailoption)
    return Result
}catch (error){return error;}
}

 