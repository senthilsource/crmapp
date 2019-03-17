var ZCRMRestClient = require('zcrmsdk');
const grant_token = '1000.6f4952e34d559ebd2daf7d950f3c0e2b.7f8f304cfd0ab4c40dcdb2a3529b7a32';
const refresh_token = "1000.7cc509d7ce4d0717fadb633a127ea158.1becae78efd27f48741a313099496365";
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('resources/configuration.properties');
const user_identifier = properties.get("user_identifier");
const crmModules = require('../fetchModules');

var zcrmsdk = ZCRMRestClient.initialize().then(() => {
    console.log("Zoho Rest Client Initialized Successfullly");
}).catch((err) => {
    console.log(err);
});

ZCRMRestClient.generateAuthTokenfromRefreshToken(user_identifier,refresh_token).then(function(auth_response){
    console.log("access token :"+auth_response.access_token);
    console.log("refresh token :"+auth_response.refresh_token);
    console.log("expires in :"+auth_response.expires_in);
    crmModules.fetchModules(auth_response.access_token);
});


module.exports={zcrmsdk:zcrmsdk}