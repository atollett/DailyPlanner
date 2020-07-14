$(document).ready(function() {

    var now = moment().format('MMMM Do YYYY');

    var nowHour24 = moment().format('H');
    var nowHour12 = moment().format('h');

    $("#currentDay").append(now);
    
    //add save icon to assets
    var saveIcon = ".assets/save-image.jpg";

    //var storedPlans = JSON.parse(localStorage.getItem("plans"));

    // if (storedPlans !== null) {
    //     planTextArr = storedPlans;
    // } else {
    //     planTextArr = new Array(9);
    //     planTextArr[4] = "Go outside!";
    // }

    planTextArr = new Array(9);

    var $plannerDiv = $("#plannerContainer");
    $plannerDiv.empty();

    for(var hour = 9; hour <= 17; ++hour) {
        //var index = hour - 9;
        var index = hour;
        var $rowDiv = $("<div>");
        $rowDiv.addClass("row plannerRow");
        $rowDiv.attr("hour-index", hour);
        $rowDiv.attr("id", "hour-" + hour);

        var $col2TimeDiv = $("<div>");
        $col2TimeDiv.addClass("col-md-2");

        var $timeBoxSpn = $("<span>");
        $timeBoxSpn.attr("class","timeBox");
    
        var displayHour = 0;
        var ampm = "";
        if (hour > 12) { 
            displayHour = hour - 12;
            ampm = "pm";
        } else {
            displayHour = hour;
            ampm = "am";
        }
    
        $timeBoxSpn.text(`${displayHour} ${ampm}`);

        $rowDiv.append($col2TimeDiv);
        $col2TimeDiv.append($timeBoxSpn);

        //input portion of row

        var $dailyPlanSpn = $('<input>');

        $dailyPlanSpn.attr('id',`input-${index}`);
        $dailyPlanSpn.attr('hour-index',index);
        $dailyPlanSpn.attr('type','text');
        $dailyPlanSpn.attr('class','dailyPlan');

        $dailyPlanSpn.val( planTextArr[index] );
    
        var $col9IptDiv = $('<div>');
        $col9IptDiv.addClass('col-md-9 description');

        $rowDiv.append($col9IptDiv);
        $col9IptDiv.append($dailyPlanSpn);

        // START building save portion of row
        var $col1SaveDiv = $('<div>');
        $col1SaveDiv.addClass('col-md-1');

        var $saveBtn = $('<i>');
        $saveBtn.attr('id',`saveid-${index}`);
        $saveBtn.attr('save-id',index);
        $saveBtn.attr('class',"far fa-save saveIcon");
    
        // add col width and row component to row
        $rowDiv.append($col1SaveDiv);
        $col1SaveDiv.append($saveBtn);
        // STOP building save portion of row

        // set row color based on time
        updateRowColor($rowDiv, hour);
    
        // add row to planner container
        $plannerDiv.append($rowDiv);
  };

function updateRowColor($hourRow, hour) {
    if ( hour < nowHour24) {
        $hourRow.css("background-color","lightgrey")
    } else if ( hour > nowHour24) {
        $hourRow.css("background-color","lightgreen")
    } else {
        $hourRow.css("background-color","tomato")
    }
}

$(".saveIcon").on("click", function(){
    // console.log($(this).parent().parent().attr("hour-index"));
    // console.log($(this).parent().siblings(".col-md-9").children().val());

    var time = $(this).parent().parent().attr("hour-index");
    var content = $(this).parent().siblings(".col-md-9").children().val();

    localStorage.setItem(time, content);


});  

for(var i = 9; i <= 17; ++i) {
    $("#input-" + i).val(localStorage.getItem(i));
    //$("#input-10").val(localStorage.getItem("10")); 

}

});