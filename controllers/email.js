const schedule = require('node-schedule');
const moment = require('moment');

const firestore_menu = require('../modules/firestore/menu');
const getMenu = require('../modules/menu');
const sesService = require('../modules/ses');

// Define the time you want the function to run
const runTime = '0 0 6 * * *'; // Runs at 6:00am every day

// Define your async function
async function admin(nDays) {
    try{
        const date = moment().add(nDays, 'day').format('YYYY-MM-DD');
        const menu = await getMenu.findItemHallMeal(["Naan", "Basmati Rice"], 0);
        await firestore_menu.createMenu(date, menu);
    }catch(err){
        console.log(err);
    }
}

async function email(nDays) {
    try{
        const date = moment().add(nDays, 'day').format('YYYY-MM-DD');
        const menu = await getMenu.findItemHallMeal(["Naan", "Basmati Rice"], 0);
        await sesService.email('dheerajthota10102005@gmail', menu);
        console.log('sent-email');
    }catch(err){
        console.log(err);
    }
}




// Schedule the function to run at the specified time
const job = schedule.scheduleJob(runTime, async function() {
  console.log('Running function at', new Date());
  try {
    await myAsyncFunction();
  } catch (error) {
    console.error('Error running function:', error);
  }
});

module.exports={email};






