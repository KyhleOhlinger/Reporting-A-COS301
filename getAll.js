var http = require('http');
var url = require('url');
var mongoose = require('mongoose');
var json2csv = require('json2csv');	
var fs = require('fs');
mongoose.connect('mongodb://45.55.154.156:27017/Buzz');
http.createServer(
function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write('<form name="form" method="GET">');
	response.write('<input name="btn" id="btn" type="submit" value="view all students"/><br><br>');
	response.write('<input name="btn" id="btn" type="submit" value="view all lectures"/><br><br>');
	response.write('<input name="btn" id="btn" type="submit" value="View all threads"/><br><br>');
	
	response.write('<input name = "btn" id = "btn" type = "submit" value = "View threads for specific buzz"/>');
        response.write('<input name = "text" id = "text" type = "text" placeholder = "e.g. COS 301"/>');
	
	response.write('</form>');
	

	
	var req = url.parse(request.url, true);
	if(req.query.btn)
	{
		var command = req.query.btn;
		
		if(command == "view all students")
		{

			
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
		if(command == "view all lectures")
		{

			//mongoose.connect('mongodb://45.55.154.156:27017/Buzz');

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

			
			var json = "";
			Lecturer.find({}, function (err, Lec) {
				json = "[";
			    Lec.forEach(function (Lecturer) {
				response.write("<tr>");
				response.write("<td>"+Lecturer.lecturer_Name+"</td>");
				response.write("<td>"+Lecturer.lecturer_Surname+"</td>");
				response.write("<td>"+Lecturer.lecturer_Phone+"</td>");
				response.write("<td>"+Lecturer.lecturer_Email+"</td>");
				response.write("<td>"+Lecturer.lecturer_Archived+"</td>");
				response.write("</tr>");
				
				json = json + '{"Name": "'+Lecturer.lecturer_Name+'","Surname": "'+Lecturer.lecturer_Surname+'","PhoneNumber": "'+Lecturer.lecturer_Phone+'","Email": "'+Lecturer.lecturer_Email+'","Archived": "'+Lecturer.lecturer_Archived+'"},';
				//console.log(Lecturer.lecturer_Name, Lecturer.lecturer_Surname, Lecturer.lecturer_Phone, Lecturer.lecturer_Email, Lecturer.lecturer_Archived)
			    });
				json = json + '{"Name": "","Surname": "","PhoneNumber": "","Email": "","Archived": ""}]';//Adding in a blank record to cap it off and prevent trailing commas.
				json = json.replace("[object Object]","");//Some weird bug that keeps adding this to the beginning of the string,so I just remove it.
				downloadCSVallLecturers(json);
			});

		}
		
		if (command == "View all threads") 
		{
			var ThreadSchema = mongoose.Schema
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

			    
			var threadCollec = mongoose.model('Threads', ThreadSchema);

			    var json = "";
			threadCollec.find({}, function (err, Threads) {
				json = "[";
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
				
				json = json + '{"DateCreated": "'+Thread.thread_DateCreated+'","Name": "'+Thread.thread_Name +'","PostContent": "'+Thread.thread_PostContent+'","CreatorID": "'+Thread.thread_CreatorID 
				+'","SpaceID": "'+Thread.thread_SpaceID +'","StatusID": "'+Thread.thread_StatusID+'","Parent": "'+Thread.thread_Parent+'","Archived": "'+Thread.thread_Archived+'","AllAttchements": "'+Thread.thread_Attachments
				+'","PostType": "'+Thread.thread_PostType +'","Closed": "'+Thread.thread_Closed  +'","ClosingDate": "'+Thread.thread_DateClosed +'"},';

				
			    });
				json = json + '{"DateCreated": "","Name": "","PostContent": "","CreatorID": "","SpaceID": "","StatusID": "","Parent": "","Archived": "","AllAttchements": "","PostType": "","Closed": "","ClosingDate": ""}]';//Adding in a blank record to cap it off and prevent trailing commas.
				json = json.replace("[object Object]","");//Some weird bug that keeps adding this to the beginning of the string,so I just remove it.
				downloadCSVallThreads(json);
			    
			    
			});
            }
	    
	    
		if (command == "View threads for specific buzz") {
                var ThreadSchema = new mongoose.Schema
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

                var threadCollec = mongoose.model('Threads', ThreadSchema);

                var subject = command = req.query.text;
		    var json = "";
                threadCollec.find({'thread_SpaceID': subject}, function (err, Threads) {
			json = "[";
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
			
			json = json + '{"DateCreated": "'+Thread.thread_DateCreated+'","Name": "'+Thread.thread_Name +'","PostContent": "'+Thread.thread_PostContent+'","CreatorID": "'+Thread.thread_CreatorID 
				+'","SpaceID": "'+Thread.thread_SpaceID +'","StatusID": "'+Thread.thread_StatusID+'","Parent": "'+Thread.thread_Parent+'","Archived": "'+Thread.thread_Archived+'","AllAttchements": "'+Thread.thread_Attachments
				+'","PostType": "'+Thread.thread_PostType +'","Closed": "'+Thread.thread_Closed  +'","ClosingDate": "'+Thread.thread_DateClosed +'"},';

			
                    });
				json = json + '{"DateCreated": "","Name": "","PostContent": "","CreatorID": "","SpaceID": "","StatusID": "","Parent": "","Archived": "","AllAttchements": "","PostType": "","Closed": "","ClosingDate": ""}]';//Adding in a blank record to cap it off and prevent trailing commas.
				json = json.replace("[object Object]","");//Some weird bug that keeps adding this to the beginning of the string,so I just remove it.
				downloadCSVSpecificThread(json,subject);
		    
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
	
	function downloadCSVallLecturers(inJson)//Uses json2csv and save the file on the HDD
	{
		var json2csv = require('json2csv');
		var parsedJSON = JSON.parse(inJson)
		
		json2csv({data: parsedJSON, fields: ['Name','Surname','PhoneNumber','Email','Archived']}, function(err, csv) {
			if (err) console.log(err);
			fs.writeFile('LecturerReport.csv', csv, function(err) {
				if (err) throw err;
				console.log('file saved');
			});
		});
	}
	
	function downloadCSVallThreads(inJson)//Uses json2csv and save the file on the HDD
	{
		var json2csv = require('json2csv');
		var parsedJSON = JSON.parse(inJson)
		
		json2csv({data: parsedJSON, fields: ['DateCreated','Name','PostContent','CreatorID','SpaceID','StatusID','Parent','Archived','AllAttchements','PostType','Closed','ClosingDate']}, function(err, csv) {
			if (err) console.log(err);
			fs.writeFile('ThreadsReport.csv', csv, function(err) {
				if (err) throw err;
				console.log('file saved');
			});
		});
	}
	
	function downloadCSVSpecificThread(inJson, sub)//Uses json2csv and save the file on the HDD
	{
		sub = sub.replace(/\s+/, "") ;
		var json2csv = require('json2csv');
		var parsedJSON = JSON.parse(inJson)
		json2csv({data: parsedJSON, fields: ['DateCreated','Name','PostContent','CreatorID','SpaceID','StatusID','Parent','Archived','AllAttchements','PostType','Closed','ClosingDate']}, function(err, csv) {
			if (err) console.log(err);
			fs.writeFile(sub+'ThreadsReport.csv', csv, function(err) {
				if (err) throw err;
				console.log('file saved');
			});
		});
	}
	
	
}

).listen(5555);

console.log("Server running on port 5555..");

