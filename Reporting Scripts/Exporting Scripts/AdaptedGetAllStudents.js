//*===========================*
//* Renaldo van Dyk u12204359 *
//*===========================*

var http = require('http');
var url = require('url');
var mongoose = require('mongoose');
//ADDED FOR CSV
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
		var num = Students_Collec.count({});
		    console.log("COunt: " + num);
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
		
		    //----------------ADDED FOR CSV-------------------
		var jsonStr = "";//'[{"Student Number":"u11673832","Name":"Testing1","Surname":"Test1","Phone Number":"565646748","Email Address":"Testing1@tuks.co.za","Mark":"56"},{"Student Number":"u16387622","Name":"testing2","Surname":"Test2","Phone Number":"456489498","Email Address":"Testing2@tuks.co.za","Mark":"73"}]';
			//--------------------------
		    
		Students_Collec.find({}, function (err, Students)
                {
			
                    Students.forEach(function(Student)  //retrieve one student collection and display in table
                    {
                        response.write("<tr>");
                        response.write("<td>"+Student.std_StudentNumber+"</td>");
                        response.write("<td>"+Student.std_Name+"</td>");
                        response.write("<td>"+Student.std_Surname+"</td>");
                        response.write("<td>"+Student.std_PhoneNumber+"</td>");
                        response.write("<td>"+Student.std_Email+"</td>");
                        response.write("<td>"+Student.std_Mark+"</td>");
                        response.write("</tr>");
			    
                    });
                });
		  //----------------ADDED FOR CSV-------------------
		var json2csv = require('json2csv');
		//var json = JSON.parse(jsonStr);
		//console.log(jsonStr + " ::: ");
			var json = [
			  {
			    "car": "Audi",
			    "price": 40000,
			    "color": "blue"
			  }, {
			    "car": "BMW",
			    "price": 35000,
			    "color": "black"
			  }, {
			    "car": "Porsche",
			    "price": 60000,
			    "color": "green"
			  }
			];

		//json2csv({data: json, fields: ['Student Number', 'Name', 'Surname','Phone Number','Email Address','Mark']}, function(err, csv) {
		json2csv({data: json, fields: ['car','price','color']}, function(err, csv) {
		 if (err) console.log(err);
		 fs.writeFile('file.csv', csv, function(err) {
		  if (err) throw err;
		 console.log('file saved');
		 });
		});
		//--------------------------
            }		
        }
}
	    
).listen(5555);
    
console.log("Server running on port 5555..");

