const router = require('express').Router();
const jsonfile = require('jsonfile');
const fs=require('fs');
const path = require('path');
//const at=require('../data1627317806.json');


exports.GetByDateRange =  (req, res) => {

    //const file = '../data1627317806.json';
    var path = require('path');
    var jsonPath = path.join(__dirname, '..','data1627317806.json');
    const file = fs.readFileSync(jsonPath);

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    ////const limit = req.query.limit;
    const limit = 5;
    const page = parseInt(req.query.page);

    const mainurl = req.protocol + "://" + req.headers.host + req.originalUrl;
    const nexturl = mainurl.replace(`page=${page}`, `page=${page + 1}`);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
   
    let responseData = JSON.parse(file);
    //console.log(responseData);

    var result = responseData.alarms.filter(item => new Date(item.timestamp).getTime() > new Date(startDate).getTime() && new Date(item.timestamp) < new Date(endDate).getTime())
    console.log(result);
    const response = result.slice(startIndex, endIndex);
    const { length } = JSON.stringify(response);
    console.log("response"+ response);
    console.log("Length"+ length);
   
    const resultData = {
        total_page: length / limit,
        current_page: page,
        limit: limit,
        next_page: (endIndex <= length) ? nexturl : null,
        data: result,
    }
    console.log("Responses"+ resultData);
    res.status(200).send(resultData);
};


exports.GetLocationById =  (req, res) => {

    var path = require('path');

    var jsonPath = path.join(__dirname, '..','data1627317806.json');

    const file = fs.readFileSync(jsonPath)


    //let rawdata = fs.readFileSync('student.json');
    let response = JSON.parse(file);
    //console.log(data);
    //const file = '../data1627317806.json';
    console.log(req);
    const locationId = req.query.id;
    //const JsonData = jsonfile.readFileSync(response);
    var result = response.locations.filter(item => item.id == locationId);
    const resultData = {
        id: result[0].id,
        name: result[0].name
    };
    res.status(200).send(resultData);
};


