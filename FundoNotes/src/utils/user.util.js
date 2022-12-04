import { Console } from 'winston/lib/winston/transports'

const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '661669644839-ttpqn3sadg8o3hlprra7a7dk816c8l0p.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//043PmFIH3_CyyCgYIARAAGAQSNwF-L9IrTbSgNMkkY8lN8xJeZRCufkTnbVHArYWWoBZPDtgPjfcCv8qeXL8FBDOounPpmkWOl-I'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

export async function sendMail(Username) {
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'roshanpalkandwar@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailoption = {
            from: 'Roshan  <roshanpalkandwar@gmail.com>',
            to: Username,
            subject: "Eamil login Succesfully..you can Reset Your password...",
            text: 'Reset Password',
            html: '<h3>To reset password, please <a href="http://localhost:5000/api/v1/users/resetPassaword">Click Here.....</a></h3>',
        };

        const Result = await transport.sendMail(mailoption)
        return Result
    } catch (error) { return error; }
}

export async function sendMailToCreateUser(Username,Firstname,Lastname){
    try{
        //console.log(`${mailID} ${FirstName} ${LastName}`);
        const accessToken=await oAuth2Client.getAccessToken();

        const transport=nodemailer.createTransport({
            service:'gmail',
            auth:{
                type:'OAuth2',
                user:'roshanpalkandwar@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        });

        const mailOptions={
            from:'Roshan # <roshanpalkandwar@gmail.com>',
            to:Username,
            subject:'Registration is Successfull',
            text:`Hi, ${Firstname} ${Lastname} the Registration for fundoo notes is successfull, would you like to login... you can login now`,
            
            html:`<h3>To login to fundoo notes, please <a href="http://localhost:5000/api/v1/users/login">Click Here.....</a></h3>`
        };
        const result= await transport.sendMail(mailOptions)
        
        return result;

    }catch(error){
        return error;

    }
}



export function sum(a,b){
    sum=a+b
    
}