var express = require('express');
var router = express.Router();

function getProfile (id) {
 return {title: "user " + id};
}

//rewuire module
///Get obejcts from module

/* GET home page. */
router.get('/', function(req, res, next) {
//Pass to page
  res.render('index', { title: 'Test' });
});
 

//Eg use get arguments from URL
router.get('/testing', function(req, res, next) {
//Pass to page
  res.render('test', getProfile(req.query.id));
});

var reports = require('../modules/Reporting/reporting');
var temp = reports.getReportsPage();
//Eg use get arguments from URL
router.get('../modules/Reporting/reporting.js', function(req, res, next) {
//Pass to page
    res.render('reports', {title: "Reports", data: temp})
});

module.exports = router;
