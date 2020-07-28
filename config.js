require('dotenv').config();

module.exports = {
    baseurl: "https://px1.tuyaeu.com/homeassistant/",
    proxyurl: "https://cors-anywhere.herokuapp.com/",
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    region: process.env.REGION
}
