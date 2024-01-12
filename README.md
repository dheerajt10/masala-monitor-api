# Masala Monitor

## About The Project
Masala Monitor is a dynamic web application designed to provide Michigan State University students with daily updates on the availability of Indian cuisine across various dining halls on campus. This project aims to simplify meal planning for Indian food enthusiasts by automating the process of scraping dining hall menus and sending out personalized notifications.

### Built With
- [Cheerio](https://cheerio.js.org/)
- [Axios](https://axios-http.com/)
- [Node.js](https://nodejs.org/)
- [AWS Simple Email Service (SES)](https://aws.amazon.com/ses/)
- [Node-Schedule](https://www.npmjs.com/package/node-schedule)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g


### Installation
1. Clone the repo
   - git clone https://github.com/your_username_/MasalaMonitor.git
2. Install NPM packges
   - npm install
3. Enter your AWS credentials in '.env'
   - AWS_ACCESS_KEY_ID=ENTER_YOUR_ACCESS_KEY
   - AWS_SECRET_ACCESS_KEY=ENTER_YOUR_SECRET_KEY
   - AWS_REGION=ENTER_YOUR_REGION

  
## Usage
Masala Monitor can be used to track the daily Indian menu offerings at MSU dining halls. It scrapes the MSU dining website, identifies dishes, and dispatches notifications with the menu details.

## Roadmap
 ✅ Scrape MSU dining hall menus for Indian food

 ✅ Send email notifications to subscribers
 
 ✅ Add a subscription management interface
 
 ⬜️ Include options for other cuisines
 
 ⬜️ Expand to other universities

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request


## License
Distributed under the MIT License. See LICENSE for more information.


## Contact

Dheeraj Thota - 10102005dt@gmail.com





