using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.GridFS;
using MongoDB.Driver.Linq;

namespace Homework6
{
    public partial class Form1 : Form
    {
        MongoCollection<Student> student;
        MongoCollection<Courses> course;
        MongoCollection<Lecturers> lecturers;
        MongoCollection<Threads> thread;
        MongoCollection<Thread_Rating> thread_rating;
        MongoDatabase db;
        MongoServer server;
        MongoClient client;
        public Form1()
        {
            InitializeComponent();
            string connectionString = "mongodb://45.55.154.156:27017";//just added this
            //client = new MongoClient();
            server = MongoServer.Create(connectionString);//then changed this and it worked, happy days!!!!!
            db = server.GetDatabase("Buzz");
            student = db.GetCollection<Student>("Students");
            course = db.GetCollection<Courses>("Courses");
            lecturers = db.GetCollection<Lecturers>("Lecturers");
            thread = db.GetCollection<Threads>("Threads");
            thread_rating = db.GetCollection<Thread_Rating>("Thread_Rating");
            
            addData();
        }

        #region classes
        public class Student
        {
            public string std_StudentNumber;
            public string std_Name;
            public string std_Surname;
            public string std_PhoneNumber;
            public string std_Email;
            public double std_Mark;           

            public Student(string stdNumber, string name, string surname, string phone, string email,  double mark)
            {
                std_StudentNumber = stdNumber;
                std_Name = name;
                std_Surname = surname;
                std_PhoneNumber = phone;
                std_Email = email;
                std_Mark = mark;
            }
        }

        public class Courses
        {
            public string course_Code;
            public string course_Name;
            public string course_Description;
            public int course_LecturerID;

            public Courses(string code, string name, string desc, int lecturerID)
            {
                course_Code = code;
                course_Name = name;
                course_Description = desc;
                course_LecturerID = lecturerID;
            }
        }

        public class Lecturers
        {
            public int lecturer_ID;
            public string lecturer_Name;
            public string lecturer_Surname;
            public string lecturer_Email;
            public string lecturer_Phone;

            public Lecturers(int lecturerID, string name, string surname, string email, string phone)
            {
                lecturer_ID = lecturerID;
                lecturer_Name = name;
                lecturer_Surname = surname;
                lecturer_Phone = phone;
                lecturer_Email = email;
            }
        }

        public class Threads
        {
            public int thread_ID;
            public DateTime thread_DateCreated;
            public string thread_Name;
            public string thread_PostContent;
            public string thread_creater;
            public string thread_courseCode;
            public int thread_RatingID;
            public int thread_Parent;

            public Threads(int threadID, DateTime dateCreated, string name, string post, string creater, string courseID, int ratingID, int par)
            {
                thread_ID = threadID;
                thread_DateCreated = dateCreated;
                thread_Name = name;
                thread_PostContent = post;
                thread_creater = creater;
                thread_courseCode = courseID;
                thread_RatingID = ratingID;
                thread_Parent = par;
            }
        }

        public class Student_Status
        {
            public int thread_ID;
            public string thread_Name;
            public string thread_Post;
            public string thread_creater;
            public string thread_courseCode;

            public Student_Status(int threadID, string name, string post, string creater, string courseID)
            {
                thread_ID = threadID;
                thread_Name = name;
                thread_Post = post;
                thread_creater = creater;
                thread_courseCode = courseID;
            }
        }

        public class Thread_Rating
        {
            public int rating_ID;
            public int thread_ID;
            public double T_R_rating;

            public Thread_Rating(int threadID, int ratingID, double rating)
            {
                rating_ID = ratingID;
                thread_ID = threadID;
                T_R_rating = rating;
            }
        }

       

        #endregion

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        public void addData()
        {
            Student s;
            Courses c;
            Lecturers l;
            Threads t;
            Thread_Rating tr;

            //Students
            s = new Student("u12345678", "David", "Tennant", "012 345 6789", "David@DoctorWho.co.za", 97.9);
            student.Insert(s);
            s = new Student("u23456789", "William", "Hartnell", "014 725 8369 ", "TheFirst@DoctorWho.co.za", 83.0);
            student.Insert(s);
            s = new Student("u34567890", "Christopher", "Eccleston", "098 765 4321", "BadWolf@DoctorWho.co.za", 63.4);
            student.Insert(s);
            s = new Student("u45678901", "Peter", "Capaldi", "014 725 8369", "Latest@DoctorWho.co.za", 75.9);
            student.Insert(s);

            c = new Courses("COS 332", "Networks", "Computer networks and stuff", 0);
            course.Insert(c);
            c = new Courses("COS 212", "Data Structures", "computer data structures in Java and stuff", 1);
            course.Insert(c);
            c = new Courses("COS 121", "Design Patterns", "Design Patterns :/",3);
            course.Insert(c);
            c = new Courses("TAR 101", "Tardis Flying", "Tardix flying for beginners", 2);
            course.Insert(c);

            l = new Lecturers(0, "Martin", "Martins","Martin@COS332.co.za", "025 836 9147");
            lecturers.Insert(l);
            l = new Lecturers(1, "Peter", "Davidson", "Dave@cs.co.za", "089 745 1236");
            lecturers.Insert(l);
            l = new Lecturers(2, "Sylvester", "McCoy", "TheRealMcCoy@hehe.co.za", "098 654 3215");
            lecturers.Insert(l);
            l = new Lecturers(3, "Matt", "Smith", "MattSmithy@TheDoctor.co.za", "075 555 5555");
            lecturers.Insert(l);

            DateTime temp = DateTime.Now;
            t = new Threads(0, temp,"Why wont my TARDIS work","Doctor Who is a British science-fiction television programme produced by the BBC from 1963 to the present day. The programme depicts the adventures of the Doctor, a Time Lord—a time-travelling humanoid alien. He explores the universe in his TARDIS, a sentient time-travelling space ship. Its exterior appears as a blue British police box, which was a common sight in Britain in 1963 when the series first aired. Along with a succession of companions, the Doctor combats a variety of foes while working to save civilisations and help people in need.","u12345678", "COS 332",0,0);
            thread.Insert(t);
            t = new Threads(1, temp.AddYears(-5), "Oh no Daleks","The character of the Doctor was initially shrouded in mystery. All that was known about him in the programme's early days was that he was an eccentric alien traveller of great intelligence who battled injustice while exploring time and space in an unreliable time machine, the TARDIS (an acronym for time and relative dimension(s) in space), which notably appears much larger on the inside than on the outside", "u12345678", "TAR 101",1,0);
            thread.Insert(t);
            t = new Threads(2, temp.AddYears(-1).AddMonths(-3), "Ummmmmmmm", "Um um um um um  um um um umm um um um um Doctor um um um um um um um um Rose um um um um um um um", "u23456789", "COS 332",0,1);
            thread.Insert(t);
            t = new Threads(3, temp.AddMonths(-16), "Write thread title here", "Doctor Who has been broadcast internationally outside of the United Kingdom since 1964, a year after the show first aired. As of 1 January 2013, the modern series has been or is currently broadcast weekly in more than 50 countries.", "u45678901", "COS 332",2,3);
            thread.Insert(t);

            tr = new Thread_Rating(0, 0, 19.0);
            thread_rating.Insert(tr);
            tr = new Thread_Rating(1, 0, 50.0);
            thread_rating.Insert(tr);
            tr = new Thread_Rating(2, 0, 60.0);
            thread_rating.Insert(tr);
            tr = new Thread_Rating(3, 0, 12.0);
            thread_rating.Insert(tr);

            

            MessageBox.Show("Database created and data inserted :P");
        }
       
    }
}
