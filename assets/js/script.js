var events = {};

// get today's date
var date = moment().format("dddd, MMMM Do YYYY");

// append date to #currentDay
$("#currentDay").append(date);

var timeColor = function() {    
    var now = moment().format("ddd MMM D YYYY hh:00 A ZZ").toString();
    // console.log(now);

    $(".time-label").each(function () {
        var timeLabel = $(this).text();
        var strTime = moment(timeLabel, ["h", "hh"])
        var strTime = moment(strTime).format("ddd MMM D YYYY hh:00 A ZZ").toString();
        // console.log(strTime);
        
        // if now < time label
        if (now < strTime) {
            // console.log("This is in the future");
            // change color to green
            $(this).siblings().addClass("table-success");
        } 
        
        // if time label is now
        else if (now === strTime) {
            // console.log("This is now!");
            // change color to red
            $(this).siblings().addClass("table-danger");
        }
        
        // otherwise
        else {
            // change color to gray
            // console.log("This is in the past.");
            $(this).siblings().addClass("table-secondary");
        }
    });
};

timeColor();

$("td").on("click", function() {
    $(this).attr("contentEditable", "true");
});

$("td").on("blur", function() {
    console.log($(".time-label").text());
});