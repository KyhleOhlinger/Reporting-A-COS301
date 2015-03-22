//Michelle Swanepoel
var mongo = require('mongoose');
var http = require('http');
var url = require('url');

http.createServer
(
    function(request, response)
    {
        response.writeHead(200, {'Content-type': "text/html"});
        response.write('<form name = "form" method = GET>');
        response.write('<input name = "button" id = "button" type = "submit" value = "View all threads"/>');
        response.write('</br></br>')
        response.write('<input name = "button" id = "button" type = "submit" value = "View threads for this buzz"/>');
        response.write('<input name = "text" id = "text" type = "text" placeholder = "e.g. COS 301"/>');
        response.write('</form>');

        var req = url.parse(request.url, true);


        if (req.query.button) {
            var command = req.query.button;

            //find all the threads query
            if (command == "View all threads") {
                mongo.connect('mongodb://45.55.154.156:27017/Buzz');
                var ThreadSchema = new mongo.Schema
                (
                    {
                        thread_DateCreated: Date,
                        thread_Name: String,
                        thread_PostContent: Array,
                        thread_CreatorID: String,
                        thread_SpaceID: String,
                        thread_StatusID: Array,
                        thread_Parent: String,
                        thread_Archived: Date,
                        thread_Attachments: Array,
                        thread_PostType: String,
                        thread_Closed: Boolean,
                        thread_DateClosed: Date
                    },
                    {
                        collection: 'Threads'
                    }
                );

                var threadCollec = mongo.model('Threads', ThreadSchema);

                threadCollec.find({}, function (err, Threads) {
                    Threads.forEach(function (Thread) {

                        response.write("<table style='width:100%' style='table-layout:fixed'>");
                        response.write("<tr>");
                        response.write("<th align = 'left' style='width:30%'>Date Created</th>");
                        response.write("<th align = 'left' style='width:12%'>Name</th>");
                        response.write("<th align = 'left' style='width:10%'>Post Content</th>");
                        response.write("<th align = 'left' style='width:10%'>Creator ID</th>");
                        response.write("<th align = 'left' style='width:10%'>Space ID</th>");
                        response.write("<th align = 'left' style='width:10%'>Status ID</th>");
                        response.write("</tr>");

                        response.write("<tr>");
                        response.write("<td align = 'left'>" + Thread.thread_DateCreated + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_Name + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_PostContent + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_CreatorID + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_SpaceID + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_StatusID + "</td>");
                        response.write("</tr>");


                        response.write("<tr>");
                        response.write("<th align = 'left'>Parent</th>");
                        response.write("<th align = 'left'>Archived</th>");
                        response.write("<th align = 'left'>All Attchements</th>");
                        response.write("<th align = 'left'>Post Type</th>");
                        response.write("<th align = 'left'>Closed</th>");
                        response.write("<th align = 'left'>Closing Date</th>");
                        response.write("</tr>");

                        response.write("<tr>");
                        response.write("<td align = 'left'>" + Thread.thread_Parent + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_Archived + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_Attachments + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_PostType + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_Closed + "</td>");
                        response.write("</tr>");
                        response.write("</br></br></br>");
                        response.write("<td>" + Thread.thread_DateClosed + "</td>");
                        response.write("</tr>");
                        response.write("<h1>Thread</h1>");
                    });

                });
            }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //find only certain threads, if buz is given
            if (command == "View threads for this buzz") {
                mongo.connect('mongodb://45.55.154.156:27017/Buzz');
                var ThreadSchema = new mongo.Schema
                (
                    {
                        thread_DateCreated: Date,
                        thread_Name: String,
                        thread_PostContent: Array,
                        thread_CreatorID: String,
                        thread_SpaceID: String,
                        thread_StatusID: Array,
                        thread_Parent: String,
                        thread_Archived: Date,
                        thread_Attachments: Array,
                        thread_PostType: String,
                        thread_Closed: Boolean,
                        thread_DateClosed: Date
                    },
                    {
                        collection: 'Threads'
                    }
                );

                var threadCollec = mongo.model('Threads', ThreadSchema);

                var subject = command = req.query.text;
                threadCollec.find({'thread_SpaceID': subject}, function (err, Threads) {
                    Threads.forEach(function (Thread) {

                        response.write("<table style='width:100%' style='table-layout:fixed'>");
                        response.write("<tr>");
                        response.write("<th align = 'left' style='width:30%'>Date Created</th>");
                        response.write("<th align = 'left' style='width:12%'>Name</th>");
                        response.write("<th align = 'left' style='width:10%'>Post Content</th>");
                        response.write("<th align = 'left' style='width:10%'>Creator ID</th>");
                        response.write("<th align = 'left' style='width:10%'>Space ID</th>");
                        response.write("<th align = 'left' style='width:10%'>Status ID</th>");
                        response.write("</tr>");

                        response.write("<tr>");
                        response.write("<td align = 'left'>" + Thread.thread_DateCreated + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_Name + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_PostContent + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_CreatorID + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_SpaceID + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_StatusID + "</td>");
                        response.write("</tr>");


                        response.write("<tr>");
                        response.write("<th align = 'left'>Parent</th>");
                        response.write("<th align = 'left'>Archived</th>");
                        response.write("<th align = 'left'>All Attchements</th>");
                        response.write("<th align = 'left'>Post Type</th>");
                        response.write("<th align = 'left'>Closed</th>");
                        response.write("<th align = 'left'>Closing Date</th>");
                        response.write("</tr>");

                        response.write("<tr>");
                        response.write("<td align = 'left'>" + Thread.thread_Parent + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_Archived + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_Attachments + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_PostType + "</td>");
                        response.write("<td align = 'left'>" + Thread.thread_Closed + "</td>");
                        response.write("</tr>");
                        response.write("</br></br></br>");
                        response.write("<td>" + Thread.thread_DateClosed + "</td>");
                        response.write("</tr>");

                        response.write("<h1>Thread</h1>");
                    });
                });
            }

        }
    }
).listen(8080);




