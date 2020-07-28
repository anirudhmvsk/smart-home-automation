# Smart Home Automation

This project is to leverage the APIs provided by Tuyaeu, to control the smart home appliences. If you are able to control the appliences using `Smart Life` app then these APIs do work

Here is an example product which is on amazon which can be controlled by these APIs
[Amazon Product](https://www.amazon.com/gp/product/B07QYMPT6W/ref=ppx_yo_dt_b_asin_title_o07_s00?ie=UTF8&psc=1)

## Libraries Used
- [Axios](https://github.com/axios/axios): For making external API requests 
- [Dotenv](https://github.com/motdotla/dotenv): For maitaining Environment Configs 
- [Fastify](https://www.fastify.io/): For Web Framework

## How To Start
```
# Check for node, npm 
$ node -v
$ npm -v
# Clone Repo
$ git clone https://github.com/anirudhmvsk/smart-home-automation.git
$ cd smart-home-automation
$ npm install 
$ node app.js
```

Now the application starts running on port 3000
## APIs 
```
GET/POST /login
```
`Login` - This API supports both GET and POST. If you want to send the credentials throught the API, send the following params in request body  
```json
{
    "username": "<username for smartlife authentication>",
    "password": "<password for smartlife authentication>",
    "region": "<region code ex. US>"
}
```
But if you just want to feed as environment variable, create a .env file in the root folder of this repo and add these lines
```
USERNAME=<username>
PASSWORD=<password>
REGION=<region>
```
```
GET /userInfo
```
This Apis provides the user info collected in the program, like login status, auth tokens, device informations etc.
```
GET /deviceList
```
This API tries to fetch all the devices linked with your account. If you are not already logged in it tries to log you in if you have provided your credentials in env file
```
POST /deviceOnOff
```
This API takes device id and status flag as input and changes the status of a perticular device


## Developed by [`@anirudhmvsk`](https://github.com/anirudhmvsk)
