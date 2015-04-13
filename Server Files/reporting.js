/**
 * Created by Jaco-Louis on 2015/03/20.
 */
//var db = require('database');//this will have to be removed and will have to use the connection form connect.js
//var mongoose = db.mongoose;//this will have to be removed and will have to use the connection form connect.js
//var json2csv = require('json2csv');
var fs = require('fs');


//schemas
var ThreadSchema = new mongoose.Schema
(
    {
        thread_ID: String,
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

var LecturerSchema = mongoose.Schema({
    lecturer_Name: String,
    lecturer_Surname: String,
    lecturer_Phone: String,
    lecturer_Email: String,
    lecturer_Archived: Boolean
}, {
    collection: "Lecturers"
});

var StudentSchema = new mongoose.Schema
( //Defines a schema for retrieving collections
    {
        std_StudentNumber: String,
        std_Name: String,
        std_Surname: String,
        std_PhoneNumber: String,
        std_Email: String,
        std_Mark: String
    },
    {
        collection: 'Students'
    }
);

exports = module.exports = function (buzzDatabase) {
    var mongoose = buzzDatabase.mongoose;
    var db = buzzDatabase.db;

    var reporting = {};


    /* getResponse(response)
     *  takes response given by user and mediates the correct function calls.
     */
    reporting.getResponse = function (response) {
        if (response == "") {
            return;
        }

    };

//getting the required data

    /* getStudents
     * gets all relevant student data
     */
    reporting.getStudents = function (res) {
        var Students_Collec = mongoose.model('Students', StudentSchema);
        var json = "";
        Students_Collec.find({}, function (err, Students) {
            json = "[";
            Students.forEach(function (Student)  //Retrieve one student collection and display in table
            {
                json = json + '{"Student Number": "' + Student.std_StudentNumber + '","Name": "' + Student.std_Name + '","Surname": "' + Student.std_Surname + '","PhoneNumber": "' + Student.std_PhoneNumber + '","Email": "' + Student.std_Email + '","Mark": "' + Student.std_Mark + '"},';
            });
            json = json + '{"Student Number": "","Name": "","Surname": "","PhoneNumber": "","Email": "","Mark": ""}]';//Adding in a blank record to cap it off and prevent trailing commas.
            json = json.replace("[object Object]", "");//Some weird bug that keeps adding this to the beginning of the string,so I just remove it.

            reporting.downloadCSV("All_Students", json, ['Student Number', 'Name', 'Surname', 'PhoneNumber', 'Email', 'Mark'], res);

        })
    };

    reporting.getLecturers = function (res) {
        var Lecturer = mongoose.model("Lecturers", LecturerSchema);
        var json = "";
        Lecturer.find({}, function (err, Lec) {
            json = "[";
            Lec.forEach(function (Lecturer) {
                json = json + '{"Name": "' + Lecturer.lecturer_Name + '","Surname": "' + Lecturer.lecturer_Surname + '","PhoneNumber": "' + Lecturer.lecturer_Phone + '","Email": "' + Lecturer.lecturer_Email + '","Archived": "' + Lecturer.lecturer_Archived + '"},';
                //console.log(Lecturer.lecturer_Name, Lecturer.lecturer_Surname, Lecturer.lecturer_Phone, Lecturer.lecturer_Email, Lecturer.lecturer_Archived)
            });
            json = json + '{"Name": "","Surname": "","PhoneNumber": "","Email": "","Archived": ""}]';//Adding in a blank record to cap it off and prevent trailing commas.
            json = json.replace("[object Object]", "");//Some weird bug that keeps adding this to the beginning of the string,so I just remove it.
            reporting.downloadCSV("All_Lecturers", json, ['Name', 'Surname', 'PhoneNumber', 'Email', 'Archived'], res);
        });
    };

    /**
     * Function that gets all the posts/threads in the database and creates a CSV file containing the data
     * @param res
     */
    reporting.getThreads = function (res) {
        var threadCollec = mongoose.model('Threads', ThreadSchema);
        var json = "";
        threadCollec.find({}, function (err, Threads) {
            json = "[";
            Threads.forEach(function (Thread) {
                json = json + '{"DateCreated": "' + Thread.thread_DateCreated + '","Name": "'  /*+Thread.thread_Name*/ + '","PostContent": "' + /*Thread.thread_PostContent+*/'","CreatorID": "' + Thread.thread_CreatorID
                + '","SpaceID": "' + Thread.thread_SpaceID + '","StatusID": "' + Thread.thread_StatusID + '","Parent": "' + Thread.thread_Parent + '","Archived": "' + Thread.thread_Archived + '","AllAttchements": "' + Thread.thread_Attachments
                + '","PostType": "' + Thread.thread_PostType + '","Closed": "' + Thread.thread_Closed + '","ClosingDate": "' + Thread.thread_DateClosed + '"},';
                json = json.replace("[object Object]", "");
            });
            json = json + '{"DateCreated": "","Name": "","PostContent": "","CreatorID": "","SpaceID": "","StatusID": "","Parent": "","Archived": "","AllAttchements": "","PostType": "","Closed": "","ClosingDate": ""}]';//Adding in a blank record to cap it off and prevent trailing commas.
            json = json.replace("[object Object]", "");//Some weird bug that keeps adding this to the beginning of the string,so I just remove it.
            reporting.downloadCSV("All_Threads", json, ['DateCreated', 'Name', 'PostContent', 'CreatorID', 'SpaceID', 'StatusID', 'Parent', 'Archived', 'AllAttchements', 'PostType', 'Closed', 'ClosingDate'], res);
        });
    };

    /**
     * Function that gets all the posts/threads in the database in a certain BuzzSpace and creates a CSV file containing the data
     * @param course
     */
    reporting.getThreadsBy = function (course) {
        var threadCollec = mongoose.model('Threads', ThreadSchema);

        var subject = course; //= req.query.text;
        var json = "";
        threadCollec.find({'thread_SpaceID': subject}, function (err, Threads) {
            json = "[";
            Threads.forEach(function (Thread) {
                /*var temp = Thread.thread_PostContent.replace('"', "") ;
                 var temp = Thread.thread_PostContent.replace("'", "") ;*/
                json = json + '{"DateCreated": "' + Thread.thread_DateCreated.toString() + '","Name": ' + Thread.thread_Name + ',"PostContent": ' + Thread.thread_PostContent + ',"CreatorID": "' + Thread.thread_CreatorID
                + '","SpaceID": "' + Thread.thread_SpaceID + '","StatusID": "' + Thread.thread_StatusID + '","Parent": "' + Thread.thread_Parent + '","Archived": "' + Thread.thread_Archived + '","AllAttchements": "' + Thread.thread_Attachments
                + '","PostType": "' + Thread.thread_PostType + '","Closed": "' + Thread.thread_Closed + '","ClosingDate": "' + Thread.thread_DateClosed + '"},';
                json = json.replace("[object Object]", "");
            });
            json = json + '{"DateCreated": "","Name": "","PostContent": "","CreatorID": "","SpaceID": "","StatusID": "","Parent": "","Archived": "","AllAttchements": "","PostType": "","Closed": "","ClosingDate": ""}]';//Adding in a blank record to cap it off and prevent trailing commas.
            json = json.replace("[object Object]", "");//Some weird bug that keeps adding this to the beginning of the string,so I just remove it.
            downloadCSV(course + "_Threads", json, ['DateCreated', 'Name', 'PostContent', 'CreatorID', 'SpaceID', 'StatusID', 'Parent', 'Archived', 'AllAttchements', 'PostType', 'Closed', 'ClosingDate'], res);
        });
    };

    reporting.downloadCSV = function (fileName, inJson, fields, res)//Uses json2csv and save the file on the HDD
    {
        var json2csv = require('json2csv');
        var parsedJSON = JSON.parse(inJson);

        json2csv({data: parsedJSON, fields: fields}, function (err, csv) {
            if (err) console.log(err);
            fileName = fileName + ".csv"
            fs.writeFile(fileName, csv, function (err) {
                if (err) throw err;
                console.log('file saved');

                var file = fs.readFileSync(fileName);
                res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
                res.setHeader("Content-type", "text/csv");
                res.write(file);
                res.end();
            });
        });
    };

    /**
     * Function that performs a specific action on a set of threads
     * @param {array} set - An array with threads as elements, the action should be performed on this set
     * @param {string} action - A keyword to describe the action to perform on the set:
     * "Num" - calculates the number of threads in the set
     * "MemCount" - calculates the number of distinct creators of the threads in the set
     * "MaxDepth" - calulates the maximum depth tht a thread in the set has
     * "AvgDepth" - calculates the average depth between all the threads in the set
     * @returns {number} - The answer that was calculated according to the action keyword
     */
    reporting.getThreadStats = function (set, action) {
        var answer;
        if (action == "Num") {
            answer = set.length;
        }
        else if (action == "MemCount") {
            var nameArray = [];
            for (var i = 0; i < set.length; i++) {
                if (nameArray.indexOf(set[i].thread_CreaterID) == -1) {
                    nameArray.push(set[i].thread_CreaterID);
                }
            }

            answer = nameArray.length;
        }
        //implemented assuming all the necessary threads/posts are in the set parameter
        else if (action == "MaxDepth") {
            var currentMax = -1;
            var id = 0;
            var parentId = 0;
            var tempCount = -1;

            for (var i = 0; i < set.length; i++) {
                id = set[i].thread_ID;
                parentId = set[i].thread_Parent;
                tempCount = 0;

                while (parentId != id) {
                    tempCount++;

                    for (var j = 0; j < set.length; j++) {
                        if (set[j].thread_ID == parentId) {
                            id = set[j].thread_ID;
                            parentId = set[j].thread_Parent;
                            break;
                        }

                    }
                }

                if (tempCount > currentMax) {
                    currentMax = tempCount;
                }


            }
            answer = currentMax + 1;
        }
        //implemented assuming all the necessary threads/posts are in the set parameter
        else if (action == "AvgDepth") {
            var totDepth = 0;

            var tempDepth = 0;

            for (var i = 0; i < set.length; i++) {
                id = set[i].thread_ID;
                parentId = set[i].thread_Parent;
                tempDepth = 1;

                while (parentId != id) {
                    tempDepth++;

                    for (var j = 0; j < set.length; j++) {
                        if (set[j].thread_ID == parentId) {
                            id = set[j].thread_ID;
                            parentId = set[j].thread_Parent;
                            break;
                        }

                    }
                }

                totDepth += tempDepth;

            }
            answer = totDepth / set.length;
        }

        return answer;
    }

    /**Function exportThread exports a thread defined by its ID as a serialized text file
     * @param {ThreadID} - defines a thread to be exported
     * */
    reporting.exportThread = function(ThreadID)
    {
        var thread_Collec = mongoose.model('Threads', ThreadSchema); //Defines a model for retrieving Thread

        thread_Collec.find({}, function (err, Threads) {
            Threads.forEach(function (Thread) {

                if(Thread.thread_ID == ThreadID)
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

    return reporting;
};

exports['@require'] = ['buzz-database'];