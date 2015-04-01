//Connecting to the database
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/my_db');

//testing to see if connection was successful.
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

//creating schema
    var Profiles = new mongoose.Schema({
        profile_ID:String
    });

//compile the schema to allow objects to be made of it
    var Profile = mongoose.model('Profile', Profiles);

//creating new Profiles
    var pro1 = new Profile({profile_ID : 'u13243273'});
    pro1.save(function (err, fluffy) {
    if (err) console.log(err)});

    var pro2 = new Profile({profile_ID : 'u22222222'});
    pro2.save(function (err, fluffy) {
    if (err) console.log(err)});

    var pro3 = new Profile({profile_ID : 'u12858855'});
    pro3.save(function (err, fluffy) {
    if (err) console.log(err)});

    //creating schema
    var Threads = new mongoose.Schema({
        thread_postContent:String,
        profile_ID: String,
        thread_ID: Number
    });

    //compile the schema to allow objects to be made of it
    var Thread = mongoose.model('Thread', Threads);

    //creating new Profiles
    var thr1 = new Thread({thread_postContent: "first post", profile_ID : 'u13243273', thread_ID: 1});
    thr1.save(function (err, fluffy) {
        if (err) console.log(err)});

    var thr2 = new Thread({thread_postContent: "second post",  profile_ID : 'u13243273', thread_ID: 2});
    thr2.save(function (err, fluffy) {
    if (err) console.log(err)});

    var thr3 = new Thread({thread_postContent: "third post",  profile_ID : 'u13243273', thread_ID: 3});
    thr3.save(function (err, fluffy) {
    if (err) console.log(err)});

///////////////////////////////////////////////////////////////////////////////////////
    var thr4 = new Thread({thread_postContent: "first post", profile_ID : 'u22222222', thread_ID: 4});
    thr4.save(function (err, fluffy) {
        if (err) console.log(err)});

    var thr5 = new Thread({thread_postContent: "second post", profile_ID : 'u22222222', thread_ID: 5});
    thr5.save(function (err, fluffy) {
        if (err) console.log(err)});

    var thr6 = new Thread({thread_postContent: "third post", profile_ID : 'u22222222', thread_ID: 6});
    thr6.save(function (err, fluffy) {
        if (err) console.log(err)});

//////////////////////////////////////////////////////////////////////////////////////////
    var thr7 = new Thread({thread_postContent: "first post", profile_ID : 'u12858855', thread_ID: 7});
    thr3.save(function (err, fluffy) {
        if (err) console.log(err)});

    var thr8 = new Thread({thread_postContent: "second post", profile_ID : 'u12858855', thread_ID: 8});
    thr8.save(function (err, fluffy) {
        if (err) console.log(err)});

    var thr9 = new Thread({thread_postContent: "third post", profile_ID : 'u12858855', thread_ID: 9});
    thr9.save(function (err, fluffy) {
        if (err) console.log(err)});

    //creating schema
    var Appraisals = new mongoose.Schema({
        appraisal_ID:Number,
        profile_ID:String,
        thread_ID:Number,
        ordinal_value:Number
    });

    //compile the schema to allow objects to be made of it
    var Appraisal = mongoose.model('Appraisal', Appraisals);

    //creating new Profiles
    var app1 = new Appraisal({appraisal_ID: 1,profile_ID : 'u12858855', thread_ID : 1, ordinal_value: 1});
    app1.save(function (err, fluffy) {
        if (err) console.log(err)});

    //creating new Profiles
    var app1 = new Appraisal({appraisal_ID: 2, profile_ID : 'u22222222', thread_ID : 1, ordinal_value: 2});
    app1.save(function (err, fluffy) {
        if (err) console.log(err)});

    //creating new Profiles
    var app1 = new Appraisal({appraisal_ID: 3, profile_ID : 'u13243273', thread_ID : 1, ordinal_value: 3});
    app1.save(function (err, fluffy) {
        if (err) console.log(err)});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //creating new Profiles
    var app1 = new Appraisal({appraisal_ID: 4, profile_ID : 'u12858855', thread_ID : 2, ordinal_value: 4});
    app1.save(function (err, fluffy) {
        if (err) console.log(err)});

    //creating new Profiles
    var app1 = new Appraisal({appraisal_ID: 4, profile_ID : 'u22222222', thread_ID : 2, ordinal_value: 5});
    app1.save(function (err, fluffy) {
        if (err) console.log(err)});
    //creating new Profiles
    var app1 = new Appraisal({appraisal_ID: 5,profile_ID : 'u13243273', thread_ID : 2, ordinal_value: 6});
    app1.save(function (err, fluffy) {
        if (err) console.log(err)});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //creating new Profiles
    var app1 = new Appraisal({appraisal_ID: 6, profile_ID : 'u12858855', thread_ID : 4, ordinal_value: 7});
    app1.save(function (err, fluffy) {
        if (err) console.log(err)});

    //creating new Profiles
    var app1 = new Appraisal({appraisal_ID: 7, profile_ID : 'u22222222', thread_ID : 3, ordinal_value: 8});
    app1.save(function (err, fluffy) {
        if (err) console.log(err)});


