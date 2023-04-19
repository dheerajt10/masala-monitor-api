const AWS = require('aws-sdk');
require('dotenv').config();
const path = require('path');
const rootDir = require('../utilities/path');
const ejs = require('ejs');
const fs = require('fs');


const compileTemple = async(filename)=>{
    // Read the email template file
    const emailTemplate = await fs.readFileSync(path.join(rootDir, 'views', filename), 'utf8');
    // Compile the email template
    const compiledTemplate = await ejs.compile(emailTemplate);
    return compiledTemplate;
}




var AccessKeyId = process.env.AWS_ACCESSID;
var SecretAccessKey = process.env.AWS_SECRET_ACCESSKEY;
var Region= process.env.AWS_REGION;

//authenticating s3 with the aws access point details
const ses = new AWS.SES({
    accessKeyId: AccessKeyId,
    secretAccessKey: SecretAccessKey,
    region: Region,
});


async function email(email,menu) {
    const compiledTemplate = await compileTemple('menu.ejs');
    const html = compiledTemplate({obj: menu});
    const params = {
      Destination: {
        ToAddresses: email
      },
      Message: {
        Body: {
          Html: {
            Data: html
          }
        },
        Subject: {
          Data: "Indian Menu For Today"
        }
      },
      Source: 'Masala Monitor <menu@masalamonitor.com>'
    };
    try {
      const response= await ses.sendEmail(params).promise();
    } catch (err) {
      console.log(err);
      throw new Error(`Error sending email`);
    }
  };

  async function confirmationEmail(email) {
    const html = fs.readFileSync(path.join(rootDir, 'views', 'confirmEmail.html'), 'utf8');
    const params = {
      Destination: {
        ToAddresses: email
      },
      Message: {
        Body: {
          Html: {
            Data: html
          }
        },
        Subject: {
          Data: "Welcome to Masala Monitor Alerts"
        }
      },
      Source: 'Masala Monitor <menu@masalamonitor.com>'
    };
    try {
      const response= await ses.sendEmail(params).promise();
    } catch (err) {
      console.log(err);
      throw new Error(`Error sending email`);
    }
  };


  async function Adminemail(email,menu) {
    const compiledTemplate = await compileTemple('admin.ejs');
    const html = compiledTemplate({obj: menu});
    const params = {
      Destination: {
        ToAddresses: email
      },
      Message: {
        Body: {
          Html: {
            Data: html
          }
        },
        Subject: {
          Data: "Review the Indian Menu For Tomorrow"
        }
      },
      Source: 'Masala Monitor <menu@masalamonitor.com>'
    };
    try {
      const response= await ses.sendEmail(params).promise();
    } catch (err) {
      console.log(err);
      throw new Error(`Error sending email`);
    }
  };


  module.exports={email, confirmationEmail, Adminemail};