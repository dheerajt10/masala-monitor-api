import requests
from bs4 import BeautifulSoup
import datetime

url = "https://eatatstate.msu.edu"

page = requests.get(url)

soup = BeautifulSoup(page.content, "html.parser")

dining_halls = soup.find_all(class_="dining-menu-name")

dining_halls_list = ['Akers Hall',
 'Brody Hall',
 'Case Hall',
 'Holden Hall',
 'Holmes Hall',
 'Landon Hall',
 'Owen Hall',
 'Shaw Hall',
 'Snyder Phillips Hall']
dining_halls_urls = ['https://eatatstate.msu.edu/menu/The%20Edge%20at%20Akers/all/',
 'https://eatatstate.msu.edu/menu/Brody%20Square/all/',
 'https://eatatstate.msu.edu/menu/South%20Pointe%20at%20Case/all/',
 'https://eatatstate.msu.edu/menu/Holden%20Dining%20Hall/all/',
 'https://eatatstate.msu.edu/menu/Holmes%20Dining%20Hall/all/',
 'https://eatatstate.msu.edu/menu/Heritage%20Commons%20at%20Landon/all/',
 'https://eatatstate.msu.edu/menu/Thrive%20at%20Owen/all/',
 'https://eatatstate.msu.edu/menu/The%20Vista%20at%20Shaw/all/',
 'https://eatatstate.msu.edu/menu/The%20Gallery%20at%20Snyder%20Phillips/all/']


count =0
master_dict = {}
for hall in dining_halls_urls:
    dt = datetime.datetime.now()
    date = dt.strftime("%Y-%m-%d")
    page = requests.get(hall+date)
    soup = BeautifulSoup(page.content, "html.parser")
    menu_items = soup.find_all(class_="menu-item")
    menu = []
    for item in menu_items:
        item_desc = {}
        item_html = item.select(".meal-title.dinner")
        if not len(list(item_html)) == 0:
            item_html_inner = list(item_html)
            item_name = item_html_inner[0].text
            item_desc["name"] = item_name
        if item_desc != {}:
            menu.append(item_desc)
    master_dict[dining_halls_list[count]]= menu
    count +=1

for hall in master_dict:
    print(hall +':')
    print(master_dict[hall])
    
