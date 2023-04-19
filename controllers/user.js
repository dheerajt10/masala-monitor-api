const firestore_user = require("../modules/firestore/user");

const path = require('path');
const rootDir = require('../utilities/path');
const ejs = require('ejs');
const fs = require('fs');
const sesService = require('../modules/ses');


const getMenu = require('../modules/menu');



const compileTemple = async(filename)=>{
    // Read the email template file
    const emailTemplate = await fs.readFileSync(path.join(rootDir, 'views', filename), 'utf8');
    // Compile the email template
    const compiledTemplate = await ejs.compile(emailTemplate);
    return compiledTemplate;
}

const getEmail = async(req,res) =>{
    const compiledTemplate = await compileTemple('landing.ejs');
    const html = compiledTemplate();
    res.send(html);
}


const getMenuForToday = async(req,res) =>{
    const menu = await getMenu.findItemHallMeal(["Naan", "Basmati Rice"], 0);
    const compiledTemplate = await compileTemple('menu.ejs');
    const html = compiledTemplate({obj: menu});
    res.send(html);
}



const postEmail = async(req,res)=>{
    const {email} = req.body;
    try{
        const user = await firestore_user.getUser(email);
        if (!user){
            await firestore_user.createUser({ email});
            await sesService.confirmationEmail([email]);
        }
        return res.sendFile(path.join(rootDir, 'views', 'confirmation.html'));
    }catch(err){
        console.log(err);
        res.redirect('/');
    }
};

const unsubscribe = async(req,res) =>{
    const compiledTemplate = await compileTemple('unsubscribe.ejs');
    const html = compiledTemplate();
    res.send(html);
}

const postUnsubscribe = async(req,res)=>{
    const {email} = req.body;
    try{
        const user = await firestore_user.getUser(email);
        if (user){
            const userId = user[1];
            await firestore_user.deleteUser(userId);
        }
        return res.sendFile(path.join(rootDir, 'views', 'unsubscribe.html'));
    }catch(err){
        console.log(err);
        res.redirect('/');
    }
};

module.exports = {getEmail, getMenuForToday,postEmail, unsubscribe, postUnsubscribe};