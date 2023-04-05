const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

const url = "https://eatatstate.msu.edu";

const diningHallsList = ['Akers Hall', 'Brody Hall', 'Case Hall', 'Holden Hall', 'Holmes Hall', 'Landon Hall', 'Owen Hall', 'Shaw Hall', 'Snyder Phillips Hall'];

const diningHallsUrls = ['https://eatatstate.msu.edu/menu/The%20Edge%20at%20Akers/all/', 'https://eatatstate.msu.edu/menu/Brody%20Square/all/', 'https://eatatstate.msu.edu/menu/South%20Pointe%20at%20Case/all/', 'https://eatatstate.msu.edu/menu/Holden%20Dining%20Hall/all/', 'https://eatatstate.msu.edu/menu/Holmes%20Dining%20Hall/all/', 'https://eatatstate.msu.edu/menu/Heritage%20Commons%20at%20Landon/all/', 'https://eatatstate.msu.edu/menu/Thrive%20at%20Owen/all/', 'https://eatatstate.msu.edu/menu/The%20Vista%20at%20Shaw/all/', 'https://eatatstate.msu.edu/menu/The%20Gallery%20at%20Snyder%20Phillips/all/'];



async function getMenus() {
  const masterDict = {};
  for (let i = 0; i < diningHallsList.length; i++) {
    const hall = diningHallsList[i];
    const date = moment().format('YYYY-MM-DD');
    const response = await axios.get(diningHallsUrls[i] + date);
    const $ = cheerio.load(response.data);
    const menuItems = $('.menu-item');
    const menu = [];
    menuItems.each((index, element) => {
      const itemHtml = $(element).find('.meal-title.dinner');
      if (itemHtml.length > 0) {
        const itemName = itemHtml.first().text().trim();
        const itemDesc = { name: itemName };
        menu.push(itemDesc);
      }
    });
    masterDict[hall] = menu;
  }
  return masterDict;
}

module.exports = {getMenus};
