/**
 * Created by Khomcy on 4/1/2015.
 */
var http = require('http');
var url = require('url');
var mongoose = require('mongoose');

http.createServer(
    function (request, response) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<form name="form" method="GET">');
        response.write('<input name="btn" id="btn" type="submit" value="get thread appraisal"/><br><br>');
        response.write('</form>');


        var req = url.parse(request.url, true);
        if(req.query.btn)
        {
            var chat1 = req.query.btn;
            if (chat1 == "get thread appraisal") {
                mongoose.connect('mongodb://localhost/my_db');

                var apps = [], posts = [], owners = [];

                //creating schema
                var Profiles = new mongoose.Schema({
                    profile_ID: String
                });

                var Profile = mongoose.model('Profile', Profiles);
                var countP = 0;


                //creating schema
                var Threads = new mongoose.Schema({
                    thread_postContent:String,
                    profile_ID: String,
                    thread_ID: Number
                });

                var Thread = mongoose.model('Thread', Threads);
                var countT =0;

                //creating schema
                var Appraisals = new mongoose.Schema({
                    appraisal_ID:Number,
                    profile_ID:String,
                    thread_ID:Number,
                    ordinal_value:Number
                });

                //compile the schema to allow objects to be made of it
                var Appraisal = mongoose.model('Appraisal', Appraisals);
                var countA =0;
                Appraisal.find({}, function (err, app) {

                    app.forEach(function (Appraisal) {
                        apps[countA] = Appraisal;
                        countA++;
                    });
                    Profile.find({}, function (err, pro) {
                        pro.forEach(function (Profile) {
                            owners[countP] = Profile;
                            countP++;
                        });
                        Thread.find({}, function (err, thr) {
                            thr.forEach(function (Thread) {
                                if(Thread != null)
                                    posts[countT] = Thread;
                                countT++;
                                //console.log(posts[i].thread_ID);
                            });
                            getThreadAppraisal(apps, posts, owners);
                        });


                    });
                });

            }
        }

        ////This is the requested function////
        function  getThreadAppraisal(apps, posts, owners) {

            for (i = 0; i < posts.length; i++) {

                var table = '<table border="1" style="width:100%">' +
                    "<tr>" +
                    "<th>post_ID</th>" +
                    "<th>thread_postContent</th>" +
                    "</tr>";
                response.write(table);
                response.write("<tr>");
                response.write("<td>" + posts[i].thread_ID + "</td>");
                response.write("<td>" + posts[i].thread_postContent + "</td>");
                response.write("</tr>");

                var table = '<br><br><table border="1" style="width:100%">' +
                    "<tr>" +
                    "<th>user_ID</th>" +
                    "<th>post_ID</th>" +
                    "<th>ordinal_value</th>" +
                    "</tr>";

                response.write(table);



                var sum = 0, average, max =0, min=10;num=0;
                for (k = 0; k < apps.length; k++) {

                    if(posts[i].thread_ID == apps[k].thread_ID) {

                        response.write("<tr>");
                        response.write("<tr>");
                        for (j = 0; j < owners.length; j++) {
                            if (apps[k].profile_ID == owners[j].profile_ID) {
                                response.write("<td>" + owners[j].profile_ID + "</td>");
                                break;
                            }
                        }

                        response.write("<td>" + apps[k].appraisal_ID + "</td>");
                        response.write("<td>" + apps[k].ordinal_value + "</td>");
                        response.write("</tr>");

                        sum += apps[k].ordinal_value;
                        if (apps[k].ordinal_value > max) {
                            max = apps[k].ordinal_value;
                        }
                        if (apps[k].ordinal_value < min) {
                            min = apps[k].ordinal_value;
                        }
                        num++;
                    }

                }

                average = sum / num;
                if(num != 0) {
                    response.write("<ul>");
                    response.write("<li>sum =" + sum + "</li>");
                    response.write("<li>average =" + average + "</li>");
                    response.write("<li>max =" + max + "</li>");
                    response.write("<li>min =" + min + "</li>");
                    response.write("<li>num =" + num + "</li>");
                    response.write("<ul>");
                }
            }


        }
    }
).listen(8888);

console.log("Server running..");
/**
 * Created by Khomcy on 3/26/2015.
 */

