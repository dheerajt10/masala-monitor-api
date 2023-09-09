const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

const url = "https://eatatstate.msu.edu";

const diningHallsList = ['Akers Hall', 'Brody Hall', 'Case Hall', 'Holden Hall', 'Holmes Hall', 'Landon Hall', 'Owen Hall', 'Shaw Hall', 'Snyder Phillips Hall'];

const diningHallsUrls = ['https://eatatstate.msu.edu/menu/The%20Edge%20at%20Akers/all/', 'https://eatatstate.msu.edu/menu/Brody%20Square/all/', 'https://eatatstate.msu.edu/menu/South%20Pointe%20at%20Case/all/', 'https://eatatstate.msu.edu/menu/Holden%20Dining%20Hall/all/', 'https://eatatstate.msu.edu/menu/Holmes%20Dining%20Hall/all/', 'https://eatatstate.msu.edu/menu/Heritage%20Commons%20at%20Landon/all/', 'https://eatatstate.msu.edu/menu/Thrive%20at%20Owen/all/', 'https://eatatstate.msu.edu/menu/The%20Vista%20at%20Shaw/all/', 'https://eatatstate.msu.edu/menu/The%20Gallery%20at%20Snyder%20Phillips/all/'];

async function getMenus(nDays) {
  const masterDict = {};
  for (let i = 0; i < diningHallsList.length; i++) {
    const hall = diningHallsList[i];
    const date = moment().add(nDays, 'day').format('YYYY-MM-DD');
    const response = await axios.get(diningHallsUrls[i] + date);
    const $ = cheerio.load(response.data);
    const menuItems = $('.menu-item');
    const menuLunch = [];
    const menuDinner = [];
    menuItems.each((index, element) => {
      const itemHtmlLunch = $(element).find('.meal-title.lunch');
      if (itemHtmlLunch.length > 0) {
        const itemName = itemHtmlLunch.first().text().trim();
        const itemDesc = { name: itemName };
        menuLunch.push(itemDesc);
      }
      const itemHtmlDinner = $(element).find('.meal-title.dinner');
      if (itemHtmlDinner.length > 0) {
        const itemName = itemHtmlDinner.first().text().trim();
        const itemDesc = { name: itemName };
        menuDinner.push(itemDesc);
      }
    });
    masterDict[hall] = { Lunch: menuLunch, Dinner: menuDinner };
  }
  return masterDict;
}




async function findItemHallMeal(itemNames, nDays) {
  let masterDict = await getMenus(nDays);
  let result = { Lunch: [], Dinner: []};
  for (const hall in masterDict) {
    const meals = masterDict[hall];
    for (const meal in meals) {
      const menuItems = meals[meal];
      for (const item of itemNames) {
        if (menuItems.find(menuItem => menuItem.name.toLowerCase().includes(item.toLowerCase()))) {
          if (!result[meal].includes(hall)){
            result[meal].push(hall);
          }
        }
      }
    }
  }
  return result;
}



// (async () => {
//   const result = await findItemHallMeal(["Naan", "Basmati Rice"], 1);
//   console.log(result);
// })();



module.exports = {getMenus, findItemHallMeal};