//Michelle Swanepoel 13066294
var mongo = require('mongoose');
var http = require('http');
var url = require('url');

//This function is to write HTML to display the value returned by getThreadStats
function HTMLWrite(set,action,response)
{
    response.write("The answer is: " + getThreadStats(set,action));
    response.write('</br></br>')
}

/**
 * Function to calculate different statistics of the set according to the action parameter.
 * @param set, a set of posts in the form of an array.
 * @param action, the keyword to which action should be performed. Please use the keywords as stated in the Spec PDF
 * returns the statistic as wanted (either num, MemCount, MaxDepth or AvgDepth)
 */
function getThreadStats(set,action)
{
    var answer;
    if(action == "Num")
    {
        answer = set.length;
    }
    else if(action == "MemCount")
    {
        var nameArray = [];
        for(var i = 0; i < set.length; i++)
        {
            if(nameArray.indexOf(set[i].thread_CreaterID) == -1)
            {
                nameArray.push(set[i].thread_CreaterID);
            }
        }

        answer = nameArray.length;
    }
	//TODO: Implement the rest
    else if(action == "MaxDepth")
    {
        var currentMax = -1;
		//implement the rest


    }
	//TODO: Implement the rest
    else if(action == "AvgDepth")
    {
        var totDepth = 0;
        var numOfPosts = 0;
    }

    return answer;
}

/**
 * This function generates HTML elements which will be used to receive the second parameter for the function getThreadStats from the user. The first parameter of the getThreadStats function will be
 * a JSON object of the set of posts. At this moment it will contain only 3 posts (just for testing purposes). This is done in order to call the getThreadStats function with
 * right parameters (as will be done in the actual system). Note this function is basically just for testing purposes.
 * @param request
 * @param response
 */
function callback(request, response)
{
    response.writeHead(200, {'Content-type': "text/html"});
    response.write('Please select the action to be performed on the post set');
    response.write('<form name = "form" method = GET>');
    response.write('<input name = "option" id = "option" type = "radio" value = "Num"/>Number of entries');
    response.write('</br></br>')
    response.write('<input name = "option" id = "option" type = "radio" value = "MemCount"/>Number of total creators of the posts');
    response.write('</br></br>')
    response.write('<input name = "option" id = "option" type = "radio" value = "MaxDepth"/>Maximum depth of posts');
    response.write('</br></br>')
    response.write('<input name = "option" id = "option" type = "radio" value = "AvgDepth"/>Average depth of all the posts');
    response.write('</br></br>')
    response.write('<input name = "button" id = "button" type = "submit" value = "Calculate"/>');
    response.write('</form>');

    var req = url.parse(request.url, true);

    //The creation of the second parameter
    var postsSet = [
        {
            "_id" : "550d46d84af522f6583d9ef0",
            "thread_ID" : "0",
            "thread_DateCreated" : "2015-03-21T10:24:24.451Z",
            "thread_Name" : "Why wont my TARDIS work",
            "thread_PostContent" : [],
            "thread_CreaterID" : "u12345678",
            "thread_SpaceID" : "COS 332",
            "thread_StatusID" : [
                "0",
                "1"
            ],
            "thread_Parent" : "0",
            "thread_Archived" : false,
            "thread_Attachments" : [],
            "thread_PostType" : "Question",
            "thread_Closed" : false,
            "thread_DateClosed" : Date(-62135596800000)
        },
        {
            "_id" : "550d46d84af522f6583d9ef1",
            "thread_ID" : "1",
            "thread_DateCreated" : "2010-03-21T10:24:24.451Z",
            "thread_Name" : "Oh no Daleks",
            "thread_PostContent" : [],
            "thread_CreaterID" : "u12345678",
            "thread_SpaceID" : "TAR 101",
            "thread_StatusID" : [
                "0",
                "1"
            ],
            "thread_Parent" : "0",
            "thread_Archived" : false,
            "thread_Attachments" : [],
            "thread_PostType" : "Question",
            "thread_Closed" : false,
            "thread_DateClosed" : Date(-62135596800000)
        },
        {
            "_id" : "550d46d84af522f6583d9ef2",
            "thread_ID" : "2",
            "thread_DateCreated" : "2013-12-21T10:24:24.451Z",
            "thread_Name" : "Ummmmmmmm",
            "thread_PostContent" : [],
            "thread_CreaterID" : "u23456789",
            "thread_SpaceID" : "COS 332",
            "thread_StatusID" : [
                "0",
                "1"
            ],
            "thread_Parent" : "1",
            "thread_Archived" : false,
            "thread_Attachments" : [],
            "thread_PostType" : "Question",
            "thread_Closed" : false,
            "thread_DateClosed" : Date(-62135596800000)
        }
    ];

    if (req.query.button)
    {
        var option = req.query.option;

        //call to the function
        HTMLWrite(postsSet,option, response);

    }

}

http.createServer(callback).listen(8080);




