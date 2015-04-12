//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------IMPORT FILE TO DATABASE-------------------------------------------------------------------------
	    
		if(command == "upload csv")
		{
			console.log("uploading file");
			var selected = req.query.upload;

			var fs = require('fs'),
			readline = require('readline');

			var rd = readline.createInterface(
			{
			    input: fs.createReadStream(selected),
			    output: process.stdout,
			    terminal: false
			});
			
			rd.on('line', function(line) 
			{
				uploadToDatabase(line);
			});
			console.log("File upload complete");
		}
	}
	
	var data;
	function uploadToDatabase(a)//Gets all the pertinent data from the csv, but I cannot figure out how to upload it, maybe someone who understands monggose better can fix it?
	{
		data=a.split(",");
		
		var studentnumber = data[0];
		var name = data[1];
		var surname = data[2];
		var phoneNumber = data[3];
		var email = data[4];
		var mark = data[5];
		
		/*var stud = new Students_Collec({
		  std_StudentNumber: studentnumber
		, std_Name: name
		, std_Surname: surname  
		, std_PhoneNumber: phoneNumber
		, std_Email : email
		, std_Mark : mark
		});
		
		stud.save(function(err, stud){
			if(err){
				throw err;
				console.log(err);
			}else{
				console.log('saved!');
			}
		});*/
		/*var schemaKeyList = ['studentnumber', 'name', 'surname', 'phoneNumber', 'email', 'mark'];

		var studentSchema = new mongoose.Schema({
			studentnumber: String,
			name: String,
			surname: String,
			phoneNumber: String,
			email: String,
			mark: String
		});
		var studentUpload = mongoose.model('student', studentSchema);

		function queryAllEntries () {
			studentUpload.aggregate(
				{$group: {_id: '$studentnumber', oppArray: {$push: {0
					name: '$name', 
					surname: '$surname',
					phoneNumber: '$phoneNumber',
					email: '$email',
					mark: '$mark'
					}}
				}}, function(err, qDocList) {
				console.log(util.inspect(qDocList, false, 10));
				process.exit(0);
			});
		}*/
		
		console.log("CURRENT DATA: " + studentnumber + " | " + name + " | " + surname + " | " + phoneNumber + " | " + email + " | " + mark);
		
	}
	
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------