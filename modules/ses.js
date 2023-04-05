const AWS = require('aws-sdk');
require('dotenv').config();
const path = require('path');
const rootDir = require('../utilities/path');
const ejs = require('ejs');
const fs = require('fs');

// Read the email template file
const reportEmailTemplate = fs.readFileSync(path.join(rootDir, 'views', 'report.ejs'), 'utf8');

// Compile the email template
const reportCompiledTemplate = ejs.compile(reportEmailTemplate);

var AccessKeyId = process.env.AWS_ACCESSID;
var SecretAccessKey = process.env.AWS_SECRET_ACCESSKEY;
var Region= process.env.AWS_REGION;

//authenticating s3 with the aws access point details
const ses = new AWS.SES({
    accessKeyId: AccessKeyId,
    secretAccessKey: SecretAccessKey,
    region: Region,
});