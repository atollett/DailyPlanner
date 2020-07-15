$(document).ready(function() {

    var now = moment().format('MMMM Do YYYY');

    var nowHour24 = moment().format('H');
    var nowHour12 = moment().format('h');

    $("#currentDay").append(now);
    
    var saveIcon = ".assets/save.png";

    planTextArr = new Array(9);

    var $plannerDiv = $("#plannerContainer");
    $plannerDiv.empty();

    for(var hour = 9; hour <= 17; ++hour) {
        //index for array use
        var index = hour;
        var $rowDiv = $("<div>");
        $rowDiv.addClass("row plannerRow");
        $rowDiv.attr("hour-index", hour);
        $rowDiv.attr("id", "hour-" + hour);

        var $col2TimeDiv = $("<div>");
        $col2TimeDiv.addClass("col-md-2");

        var $timeBoxSpn = $("<span>");
        $timeBoxSpn.attr("class","timeBox");
    
        //format hours
        var displayHour = 0;
        var ampm = "";
        if (hour > 12) { 
            displayHour = hour - 12;
            ampm = "pm";
        } else {
            displayHour = hour;
            ampm = "am";
        }
    
        //populate timebox with time
        $timeBoxSpn.text(`${displayHour} ${ampm}`);

        // insert into col inset into timebox
        $rowDiv.append($col2TimeDiv);
        $col2TimeDiv.append($timeBoxSpn);

        //input portion of row
        //build row components
        var $dailyPlanSpn = $('<input>');

        $dailyPlanSpn.attr('id',`input-${index}`);
        $dailyPlanSpn.attr('hour-index',index);
        $dailyPlanSpn.attr('type','text');
        $dailyPlanSpn.attr('class','dailyPlan');

        // access index from data array for hour
        $dailyPlanSpn.val( planTextArr[index] );
    
        // create col to control width
        var $col9IptDiv = $('<div>');
        $col9IptDiv.addClass('col-md-9 description');

        // add col width and row component to row
        $rowDiv.append($col9IptDiv);
        $col9IptDiv.append($dailyPlanSpn);

        // save portion of row
        var $col1SaveDiv = $('<div>');
        $col1SaveDiv.addClass('col-md-1');

        var $saveBtn = $('<i>');
        $saveBtn.attr('id',`saveid-${index}`);
        $saveBtn.attr('save-id',index);
        $saveBtn.attr('class',"far fa-save saveIcon");
    
        // add col width and row component to row
        $rowDiv.append($col1SaveDiv);
        $col1SaveDiv.append($saveBtn);

        // set row color based on time
        updateRowColor($rowDiv, hour);
    
        // add row to planner container
        $plannerDiv.append($rowDiv);
  };

//updates color depending on time
function updateRowColor($hourRow, hour) {
    if ( hour < nowHour24) {
        $hourRow.css("background-color","lightgrey")
    } else if ( hour > nowHour24) {
        $hourRow.css("background-color","lightgreen")
    } else {
        $hourRow.css("background-color","tomato")
    }
}

//takes input and pushes it to local storage
$(".saveIcon").on("click", function(){
    var time = $(this).parent().parent().attr("hour-index");
    var content = $(this).parent().siblings(".col-md-9").children().val();

    localStorage.setItem(time, content);
});  

//takes output from local storage and appends to planner
for(var i = 9; i <= 17; ++i) {
    $("#input-" + i).val(localStorage.getItem(i));
}

});