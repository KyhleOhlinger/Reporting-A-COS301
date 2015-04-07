var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({extended:false});
var resources = require('resources');
var reports = require('reporting');
var formidable = require('formidable');

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


router.get('/reports', function(req, res, next) {
    res.render('reports', {title: "Reports", getLecturers: "localhost:3000/reports/getLecturers",
        getStudents: "reports.getStudents()", getThreads: "reports.getThreads()"});
});


router.get('/reports/getLecturers', function(req, res, next)
{
    console.log('get lecturers');
    reports.getLecturers(res);
});

router.get('/reports/getStudents', function(req, res, next)
{
    console.log('get Students');
    reports.getStudents(res);
});


router.get('/reports/getThreads', function(req, res, next)
{
    console.log('get threads');
    reports.getThreads(res);
});


// loads test page for DEMO
router.get('/testPost', function(req, res, next){

    res.render('dynamic_views/postInput', {
        success : ""
    });
});

// loads manage constraints page for DEMO
router.get('/manageConstraints', function(req, res, next){

    resources.getConstraints(function(err, results){
        if (err){
            var html = "<p>Could not retrieve requested information from the database.</p>"
        } else {
            html = "<table><tr><td>Mime Type</td><td>File Size Limit</td></tr>\r\n";
            results.forEach(function(con){
                html += "<tr><td>"+con.mime_type+
                "</td><td>"+Math.round(con.size_limit/(1024*1024))+
                " MB</td><td><a href='/removeConstraint/"+con._id+"'>remove</a></td></tr>\r\n";
            });
            html += "</table>";
            res.render('dynamic_views/constraintsManagement', { results:  html});
        }
    });
});

// add constraint page for DEMO
router.get('/addConstraint', function(req, res, next){

    res.render('dynamic_views/addConstraint', {
        success : ""
    });
});

// remove constraint from database
router.get('/removeConstraint/*', function(req, res, next){

    var id = req.url.replace('/removeConstraint/', "");
    resources.removeConstraint(id, function(truth){
        if (!truth){
                res.render('dynamic_views/constraintsManagement', {
                    results: "An error occurred!"
                });
        } else {
            resources.getConstraints(function(err, results){
                if (err){
                    var html = "<p>Could not retrieve requested information from the database.</p>";
                } else {
                    html = "<table><tr><td>Mime Type</td><td>File Size Limit</td></tr>\r\n";
                    results.forEach(function(con){
                        html += "<tr><td>"+con.mime_type+
                        "</td><td>"+Math.round(con.size_limit/(1024*1024))+
                        " MB</td><td><a href='/removeConstraint/"+con._id+"'>remove</a></td></tr>\r\n";
                    });
                    html += "</table>";
                    res.render('dynamic_views/constraintsManagement', { results:  html});
                }
            });
        }
    });
});

// adds a new constraint (for DEMO)
router.post('/submitConstraint', urlencodedparser, function(req, res, next){

    resources.addConstraint(req.body.mime_type, req.body.size_limit, function(truth){
        if (!truth){
            res.render('dynamic_views/constraintsManagement', {
                results: "An error occurred!"
            });
        } else {
            resources.getConstraints(function(err, results){
                if (err){
                    var html = "<p>Could not retrieve requested information from the database.</p>"
                } else {
                    html = "<table><tr><td>Mime Type</td><td>File Size Limit</td></tr>\r\n";
                    results.forEach(function(con){
                        html += "<tr><td>"+con.mime_type+
                        "</td><td>"+Math.round(con.size_limit/(1024*1024))+
                        " MB</td><td><a href='/removeConstraint/"+con._id+"'>remove</a></td></tr>\r\n";
                    });
                    html += "</table>";
                    res.render('dynamic_views/constraintsManagement', { results:  html});
                }
            });
        }
    });
});

// upload a new file (for DEMO)
router.post('/submitPost', [ function(req, res, next){

    //var form = new formidable.IncomingForm();
    //
    //form.parse(req, function(err, fields, files){
    //
    //    // create post object
    //    var id = 0; // get postID
        resources.uploadFile(req, res, next, 0);
    //});
}, function(req, res, next){
    res.render('dynamic_views/postInput', {
        success : res.fileState
    });
}]);

module.exports = router;
