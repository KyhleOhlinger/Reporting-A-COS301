var http = require('http');
var url = require('url');
var mongoose = require('mongoose');

http.createServer(
    function (request, response) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<form name="form" method="GET">');
        response.write('<input name="btn" id="btn" type="submit" value="view lectures"/><br><br>');
        response.write('<input name="btn" id="btn" type="submit" value="export list"/>');
        response.write('</form>');


        var req = url.parse(request.url, true);
        if(req.query.btn)
        {
            var chat1 = req.query.btn;
            if(chat1 == "view lectures")
            {

                mongoose.connect('mongodb://45.55.154.156:27017/Buzz');

                var LecturerSchema = mongoose.Schema({
                    lecturer_Name: String,
                    lecturer_Surname: String,
                    lecturer_Phone: String,
                    lecturer_Email: String,
                    lecturer_Archived: Boolean},{
                    collection:"Lecturers"
                });

                var Lecturer = mongoose.model("Lecturers", LecturerSchema);
                var table= '<table style="width:100%">'+
                    "<tr>"+
                    "<th>Name</th>" +
                    "<th>Surname</th>" +
                    "<th>Phone</th>" +
                    "<th>Email Address</th>" +
                    "<th>Archived</th>" +
                    "</tr>";
                response.write(table);

                Lecturer.find({}, function (err, Lec) {
                    Lec.forEach(function (Lecturer) {
                        response.write("<tr>");
                        response.write("<td>"+Lecturer.lecturer_Name+"</td>");
                        response.write("<td>"+Lecturer.lecturer_Surname+"</td>");
                        response.write("<td>"+Lecturer.lecturer_Phone+"</td>");
                        response.write("<td>"+Lecturer.lecturer_Email+"</td>");
                        response.write("<td>"+Lecturer.lecturer_Archived+"</td>");
                        response.write("</tr>");

                        console.log(Lecturer.lecturer_Name, Lecturer.lecturer_Surname, Lecturer.lecturer_Phone, Lecturer.lecturer_Email, Lecturer.lecturer_Archived)
                    });
                });

            }
            else if(chat1 == "export list")
            {
                response.write("<h2>export here</h2>");
            }
            //response.write(req);
        }
       // response.end();
    }
).listen(8888);

console.log("Server running..");

