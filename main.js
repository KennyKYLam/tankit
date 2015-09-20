var currentuser = "Kenny";
var newtask = "Do Laundry";
var assignee = currentuser;
var startdate;
var duedate = "09-30";
var status = "To be actioned";
var ref = new Firebase("https://kkyl.firebaseio.com/");
var usersRef = ref.child("users");
usersRef.set({

    Kenny: {
        tasks: {},
        password: "lol",
        group: "lester203"
    },
    Benny: {
        tasks: {},
        password: "lol",
        group: "lester203"
    }

});
var d = new Date();
var n = d.getMonth();
startdate = d.getMonth().toString() + "-" + d.getDate().toString();
console.log(startdate);

var messageListRef = new Firebase('https://kkyl.firebaseio.com/users/' + currentuser + '/tasks');
var newMessageRef = messageListRef.push();
newMessageRef.set({
    'assignee': currentuser,
    'todo': newtask,
    'status': "To be actioned",
    'startdate': startdate,
    'duedate': duedate
});
// We've appended a new message to the message_list location.
var path = newMessageRef.toString();
$("#createtask-btn").click(function() {
    newtask = document.getElementById('newtaskname').value;
    console.log("newtask" + newtask);
    duedate = document.getElementById('newtaskduedate').value;
    console.log("due date" + duedate);
    assignee = document.getElementById('newtaskassignee').value;
    console.log("assignee" + assignee);
    var messageListRef = new Firebase('https://kkyl.firebaseio.com/users/' + currentuser + '/tasks');
    messageListRef.push({
        'assignee': assignee,
        'todo': newtask,
        'status': "To be actioned",
        'startdate': startdate,
        'duedate': duedate
    });
    var key = "abc";
    var checkmark = "glyphicon glyphicon-unchecked";
    $(".tasklist").append("<div id=\"" + key + "\"class=\"todotask\"> <span class=\"" + checkmark + "\"></span> <h3>" + newtask + "</h3> <div id=\"div1\"></div> <div class=\"taskassignee\"> Assignee: " + assignee + "</div> <div class=\"taskstatus\"> Status: " + status + "</div> <div class=\"taskduedate\"> Due Date: " + duedate + "</div> <div class=\"taskstartdate\"> Date Requested: " + startdate + "</div></div>");
    start();
    // $(".todotask.sample").remove();
});

$("#sync-btn").click(function() {
    $(".todotask").remove();
    // Get a database reference to our posts
    var ref = new Firebase('https://kkyl.firebaseio.com/users/' + currentuser + '/tasks');
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function(snapshot) {
        //console.log(snapshot.val());
        var p = snapshot.val();
        console.log(p);
        for (var key in p) {
            if (p.hasOwnProperty(key)) {
                // alert(key + " -> " + p[key] + "..." + p[key].assignee);
                if (key !== "password" || key !== "group") {
                    var checkmark;
                    newtask = p[key].todo;
                    assignee = p[key].assignee;
                    duedate = p[key].duedate;
                    startdate = p[key].startdate;
                    status = p[key].status;
                    if (status === "To be actioned") {
                        checkmark = "glyphicon glyphicon-unchecked";
                    } else {
                        checkmark = "glyphicon glyphicon-check";
                    }
                    $(".tasklist").append("<div id=\"" + key + "\"class=\"todotask\"> <span class=\"" + checkmark + "\"></span> <h3>" + newtask + "</h3> <div id=\"div1\"></div><div class=\"taskassignee\"> Assignee: " + assignee + "</div> <div class=\"taskstatus\"> Status: " + status + "</div> <div class=\"taskduedate\"> Due Date: " + duedate + "</div> <div class=\"taskstartdate\"> Date Requested: " + startdate + "</div></div>");
                }
            }
        }
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});

$("#login-btn").click(function() {
    var username = document.getElementById('username').value;
    console.log("username" + username);
    var password = document.getElementById('password').value;
    console.log("password" + password);
    // Get a database reference to our posts
    var loginref = new Firebase('https://kkyl.firebaseio.com/users/' + currentuser);
    // Attach an asynchronous callback to read the data at our posts reference
    loginref.on("value", function(snapshot) {
        console.log(snapshot.val());
        var p = snapshot.val();
        var officialpassword = p.password;
        console.log("officialpassword" + officialpassword);
        if (username === currentuser && password === officialpassword) {
            window.location.href = "task.html";
        } else {
            $(".login-error").show();
        }

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});

$(".glyphicon.glyphicon-unchecked").click(function() {
    $(this).attr('class', 'glyphicon glyphicon-check');
    var ref = new Firebase('https://kkyl.firebaseio.com/users/' + currentuser);
    var id = $(this).parent().attr('id');
    console.log("id "+id);
    // var hopperRef = id.child("gracehop");
    // hopperRef.update({
    //     "status": "Completed."
    // });
});

$('.glyphicon.glyphicon-unchecked').on('click', 'span.glyphicon-unchecked', function(){
    alert("clicked");
});
