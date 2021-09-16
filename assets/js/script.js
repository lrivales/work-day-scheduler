var events = [];

// get today's date
var date = moment().format("dddd, MMMM Do YYYY");

// append date to #currentDay
$("#currentDay").append(date);

var timeColor = function() {    
    var now = moment().format("ddd MMM D YYYY HH").toString();
    // console.log("Now: " + now);

    $(".time-label").each(function () {
        var timeLabel = $(this).attr("id");
        var strTime = moment(timeLabel, ["h", "hh"])
        var strTime = moment(strTime).format("ddd MMM D YYYY HH").toString();
        // console.log("Time: " + strTime);
        
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

$(".btn").on("click", function(event) {
    // Grab the element that was clicked
    var $this = $(event.target);
    // console.log("$this: ", $this);

    // Grab the parent of the element that was clicked
    var $parent = $this.parent();
    // console.log("$parent: ", $parent);

    // Grab the siblings of the parent of the element that was clicked
    var $tdEditable = $parent.siblings("td.text-data");
    // console.log("$tdEditable: ", $tdEditable);

    var $tdTime = $parent.siblings("th.time-label");
    // console.log("$tdTime: ", $tdTime);

    // Grab the text from the siblings
    // console.log("$tdEditable.text(): ", $tdEditable.text());
    // console.log("$tdTime.text(): ", $tdTime.text());

    events.push({
        time: $tdTime.text(),
        data: $tdEditable.text()
    });

    // console.log("events: ", events);

    localStorage.setItem("events", JSON.stringify(events));
});