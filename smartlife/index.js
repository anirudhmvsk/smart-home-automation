const config = require('../config');
const baseurl = config.baseurl;
var proxyurl = config.proxyurl;
const axios = require('axios').default;
const qs = require('querystring');
const { resolve } = require('path');


function login(username=null, password=null, region=null) {
    return new Promise((resolve, reject) => {
	let to_return = {};
	let url = baseurl + "auth.do";
	let data = {
		"userName": username || config.username,
		"password": password || config.password,
		"countryCode": region || config.region,
		"bizType": "smart_life",
		"from": "tuya",
    }
    axios.post(proxyurl+url, qs.stringify(data), {headers: {"Content-Type": "application/x-www-form-urlencoded","X-Requested-With": "XMLHttpRequest"}})
      .then(function (response) {
        json = response.data;
        console.log(json);
        if ("access_token" in json) {
            to_return["access_token"] = json["access_token"];
            to_return["logged_in"] = true;
            to_return["refresh_token"] = json["refresh_token"];
            to_return["expires_in"] = json["expires_in"]/3600;
            userInfo = to_return;
            resolve(to_return);
        }else{
            reject(json);
        }
      })
      .catch(function (error) {
        reject(error);
      });
    });
}

function getDeviceList() {
    return new Promise(async (resolve, reject) => {
        if(!userInfo["access_token"]){
            let loginResponse = await login();
            if(!loginResponse["access_token"]){
                reject({"error": "login Failed"})
            }
        }
	    to_return = {};
        if (userInfo["access_token"].substring(0,2) == "EU") {
            var url = baseurl + "skill";
        } else if (userInfo["access_token"].substring(0,2) == "AY") {
            var url = baseurl.replace("eu", "cn") + "skill";
        } else {
            var url = baseurl.replace("eu", "us") + "skill";
        }
	var headers = {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
	}
	data = {
		"header": {
			"name": "Discovery",
			"namespace": "discovery",
			"payloadVersion": 1,
		},
		"payload": {
			"accessToken": userInfo["access_token"],
		},
    }
    axios.post(proxyurl+url, JSON.stringify(data), {headers: headers})
    .then(response => {
        let json = response.data;
        if ("header" in json && "code" in json["header"] && json["header"]["code"] == "FrequentlyInvoke") {
            to_return["devices"] = userInfo["devices"];
            to_return["success"] = true;
        } else if ("payload" in json && "devices" in json["payload"]) {
            userInfo["devices"] = json["payload"]["devices"];
            to_return["devices"] = json["payload"]["devices"];
            to_return["success"] = true;
        }else{
            to_return["response"] = json
        }
        resolve(to_return);
    }).catch(err => {
        reject(err);
    })
})
}

function changeDeviceState(deviceId, newState) {
    return new Promise((resolve, reject) => {
        to_return = {};
        if (userInfo["access_token"].substring(0,2) == "EU") {
            var url = baseurl + "skill";
        } else if (userInfo["access_token"].substring(0,2) == "AY") {
            var url = baseurl.replace("eu", "cn") + "skill";
        } else {
            var url = baseurl.replace("eu", "us") + "skill";
        }
        var headers = {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        }
        var data = {
            "header": {
                "name": "turnOnOff",
                "namespace": "control",
                "payloadVersion": 1
            },
            "payload": {
                "accessToken": userInfo["access_token"],
                "devId": deviceId,
                "value": newState
            }
        }
        axios.post(proxyurl+url, JSON.stringify(data), {headers: headers})
        .then(response => {
            let json = response.data;
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    })
}


module.exports = {
    login: login,
    getDeviceList: getDeviceList,
    changeDeviceState: changeDeviceState
}