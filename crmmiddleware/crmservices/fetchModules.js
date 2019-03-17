const axios = require('axios');
axios.defaults.baseURL = 'https://www.zohoapis.com/crm/v2/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


/**
 * 
 * Fetch data by moduleName, 
 * 
 */

var fetchModules = (token) => {
    axios.defaults.headers.common['Authorization'] = "Zoho-oauthtoken " + token;
    console.log("Entering");
    axios.get('Leads?page=1&per_page=2').then((res) => {
        console.log("Result>>>>", res.data);
    }).catch(error => {
        console.log("Error:::", error);
    });
    console.log("Exit");
};


module.exports = { fetchModules: fetchModules };