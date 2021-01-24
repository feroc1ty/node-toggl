const fs = require('fs');
const path = require('path');
const askFor = require('ask-for');

const HOME = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
const configPath = path.join(HOME, '.toggl', 'config.json');

let config = {};

if (!fs.existsSync(configPath)) {
    console.log("Please enter your Api token!");
    console.log("You can find yours on the My Profile page");
    console.log("https://www.toggl.com/app/profile");
    askFor(['API_TOKEN'], function (answers) {
        fs.mkdirSync(path.join(HOME, '.toggl'));
        fs.writeFileSync(configPath, JSON.stringify(answers), 'utf-8');
        console.log('config file successfully written');
        console.log(configPath)
    });
} else {
    config = fs.readFileSync(configPath);
    config = JSON.parse(config);
}



module.exports = config;