//*===========================*
//* Renaldo van Dyk u12204359 *
//*===========================*

var http = require('http');
var url = require('url');
var mongoose = require('mongoose');
var json2csv = require('json2csv');	
var fs = require('fs');

http.createServer(
function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write('<form name="form" method="GET">');
	response.write('<input name="btn" id="btn" type="submit" value="view all students"/><br><br>');
	response.write('<input name="btn" id="btn" type="submit" value="export to csv"/>');
	response.write('</form>');


	var req = url.parse(request.url, true);
	if(req.query.btn)
	{
		var command = req.query.btn;
		
		if(command == "view all students")
		{

			mongoose.connect('mongodb://45.55.154.156:27017/Buzz');
			var StudentSchema = new mongoose.Schema( //Defines a schema for retrieving collections
			{
				std_StudentNumber : String,
				std_Name : String,
				std_Surname : String,
				std_PhoneNumber : String,
				std_Email : String,
				std_Mark : String

			},
			{
				collection: 'Students'
			}
			);

			
			var Students_Collec = mongoose.model('Students',StudentSchema); //Defines a model for retrieving Students
			var tableHeader =   '<table style="width:100%">'+
			"<tr>"+
			"<th>Student Number</th>" +
			"<th>Name</th>" +
			"<th>Surname</th>" +
			"<th>Phone Number</th>" +
			"<th>Email Address</th>" +
			"<th>Mark</th>" +
			"</tr>";
			response.write(tableHeader);
			
			var json = "";
			Students_Collec.find({}, function (err, Students)
			{
				json = "[";
				Students.forEach(function(Student)  //Retrieve one student collection and display in table
				{
					response.write("<tr>");
					response.write("<td>"+Student.std_StudentNumber+"</td>");
					response.write("<td>"+Student.std_Name+"</td>");
					response.write("<td>"+Student.std_Surname+"</td>");
					response.write("<td>"+Student.std_PhoneNumber+"</td>");
					response.write("<td>"+Student.std_Email+"</td>");
					response.write("<td>"+Student.std_Mark+"</td>");
					response.write("</tr>");
					json = json + '{"Student Number": "'+Student.std_StudentNumber+'","Name": "'+Student.std_Name+'","Surname": "'+Student.std_Surname+'","PhoneNumber": "'+Student.std_PhoneNumber+'","Email": "'+Student.std_Email+'","Mark": "'+Student.std_Mark+'"},';
				});
				json = json + '{"Student Number": "","Name": "","Surname": "","PhoneNumber": "","Email": "","Mark": ""}]';//Adding in a blank record to cap it off and prevent trailing commas.
				json = json.replace("[object Object]","");//Some weird bug that keeps adding this to the beginning of the string,so I just remove it.
				
				downloadCSVallStudents(json);
				
			});
		}		
	}
	function downloadCSVallStudents(inJson)//Uses json2csv and save the file on the HDD
	{
		var json2csv = require('json2csv');
		var parsedJSON = JSON.parse(inJson)
		
		json2csv({data: parsedJSON, fields: ['Student Number','Name','Surname','PhoneNumber','Email','Mark']}, function(err, csv) {
			if (err) console.log(err);
			fs.writeFile('StudentReport.csv', csv, function(err) {
				if (err) throw err;
				console.log('file saved');
			});
		});
	}
}

).listen(5555);

console.log("Server running on port 5555..");

