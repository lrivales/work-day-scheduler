var events = [];

// get today's date
var date = moment().format("dddd, MMMM Do YYYY");

// append date to #currentDay
$("#currentDay").append(date);

var timeColor = function() {    
    var now = moment().format("ddd MMM D YYYY HH").toString();

    $(".time-label").each(function () {
        var timeLabel = $(this).attr("id");
        var strTime = moment(timeLabel, ["h", "hh"])
        var strTime = moment(strTime).format("ddd MMM D YYYY HH").toString();
        
        // if now < time label
        if (now < strTime) {
            // change color to green
            $(this).siblings().addClass("table-success");
        } 
        
        // if time label is now
        else if (now === strTime) {
            // change color to red
            $(this).siblings().addClass("table-danger");
        }
        
        // otherwise
        else {
            // change color to gray
            $(this).siblings().addClass("table-secondary");
        }
    });
};

var loadEvents = function() {
    // get events from local storage
    events = JSON.parse(localStorage.getItem("events"));

    if (!events) {
        var events = {};
    }

    else {
        // for each event
        for (var i = 0; i < events.length; i++) {
            var $storedId = events[i].time;
            // write saved data into the correct row
            $(".time-label[id|='"+$storedId+"'").next().text(events[i].data);
        };
    }
};

loadEvents();

timeColor();

$("td").on("click", function() {
    $(this).attr("contentEditable", "true");
});

$(".btn").on("click", function(event) {
    // Grab the element that was clicked
    var $this = $(event.target);

    // Grab the parent of the element that was clicked
    var $parent = $this.parent();

    // Grab the siblings of the parent of the element that was clicked
    var $tdEditable = $parent.siblings("td.text-data");

    var $tdTime = $parent.siblings("th.time-label");

    events.push({
        time: $tdTime.attr("id"),
        data: $tdEditable.text()
    });

    localStorage.setItem("events", JSON.stringify(events));
});