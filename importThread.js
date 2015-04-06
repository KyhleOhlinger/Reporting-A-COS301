//*===========================*
//* Renaldo van Dyk u12204359 *
//*===========================*

//importThread as described by functional requirements

var http = require('http');
var url = require('url');
var mongoose = require('mongoose');
var serialize = require('node-serialize');
var fs = require('fs');

http.createServer(
    function (request, response) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<form name="form" method="GET">');
        response.write('<input name="btn" id="btn" type="submit" value="import Thread from text file threadX where X is thread_ID"/></BR>');
        response.write('<p>Insert Thread_ID</p><input name="ID" id="ID" type="text" value="0"/></BR>');
        response.write('</form>');


        var req = url.parse(request.url, true);
        if(req.query.btn)
        {
            var ID = req.query.ID;
            var command = req.query.btn;
            if(command == "import Thread from text file threadX where X is thread_ID")
            {
                mongoose.connect('mongodb://45.55.154.156:27017/Buzz');
                var nameOfFile = 'thread' + ID + '.txt';

                fs.readFile(nameOfFile, function (err, data)
                {
                    if (err) throw err;
                    var Thread =  data;
                    serialize.unserialize(Thread);
                    response.write("<p>"+Thread.thread_ID+"</p>");
                });
            }
        }
    }
).listen(5555);

console.log("Server running on port 5555..");