const schedule = require('node-schedule');
const moment = require('moment');

const firestore_menu = require('../modules/firestore/menu');
const firestore_user = require('../modules/firestore/user');
const getMenu = require('../modules/menu');
const sesService = require('../modules/ses');

// Define the time you want the function to run
const runTimeAdmin = '0 0 21 * * *'; // Runs at 6:00am every day

const runTimeUser = '0 0 7 * * *';

var adminList = JSON.parse(process.env.ADMIN_EMAIL);

// Define your async function
async function admin() {
    try{
        const date = moment().add(1, 'day').format('YYYY-MM-DD');
        const menu = await getMenu.findItemHallMeal(["Naan", "Basmati Rice"], 1);
        await firestore_menu.createMenu(date, menu);
        await sesService.Adminemail(adminList, menu);
    }catch(err){
        console.log(err);
    }
}

async function user(){
    try{
        const date = moment().add(0, 'day').format('YYYY-MM-DD');
        const emails = await firestore_user.getEmails();
        const menu = await firestore_menu.getMenu(date);
        if (menu){
            await sesService.email(emails, menu);
        }
    }catch(err){
        console.log(err);
    }
}





const jobAdmin = schedule.scheduleJob(runTimeAdmin, async function() {
  console.log('Running function at', new Date());
  try {
    await admin();
  } catch (error) {
    console.error('Error running function:', error);
  }
});


const jobUser = schedule.scheduleJob(runTimeUser, async function() {
    console.log('Running function at', new Date());
    try {
      await user();
    } catch (error) {
      console.error('Error running function:', error);
    }
  });


module.exports= {jobAdmin, jobUser};






