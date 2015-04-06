//*===========================*
//* Renaldo van Dyk u12204359 *
//*===========================*

//exportThread as described by functional requirements

var http = require('http');
var url = require('url');
var mongoose = require('mongoose');
var serialize = require('node-serialize');
var fs = require('fs');

http.createServer(
    function (request, response) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<form name="form" method="GET">');
        response.write('<input name="btn" id="btn" type="submit" value="export Thread to Text file threadX where X is thread_ID"/></BR>');
        response.write('<p>Insert Thread_ID</p><input name="ID" id="ID" type="text" value="0"/></BR>');
        response.write('</form>');


        var req = url.parse(request.url, true);
        if(req.query.btn)
        {
            var ID = req.query.ID;
            var command = req.query.btn;
            if(command == "export Thread to Text file threadX where X is thread_ID")
            {
                mongoose.connect('mongodb://45.55.154.156:27017/Buzz');
                var ThreadSchema = new mongoose.Schema //Defines a schema for retrieving Threads
                (
                    {
                        thread_ID : String,
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

                var thread_Collec = mongoose.model('Threads', ThreadSchema); //Defines a model for retrieving Thread

                thread_Collec.find({}, function (err, Threads) {
                    Threads.forEach(function (Thread) {

                        if(Thread.thread_ID == ID)
                        {
                            //convert Thread to serialized object
                            var objS = serialize.serialize(Thread,true);
                            typeof objS === 'string';
                            var nameOfFile = 'thread' + ID + '.txt';
                            fs.writeFile(nameOfFile, objS, function(err) {
                                if(err) {
                                    return console.log(err);
                                }

                                console.log("The file was saved!");
                            });
                        }
                    });

                });

            }
        }
    }
).listen(5555);

console.log("Server running on port 5555..");