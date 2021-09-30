//GIVEN I am using a daily planner to create a schedule
//WHEN I open the planner
const STORAGE_KEY='descriptions'
var getDescriptions=function(){
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
}

var storedDescriptions=function(descriptions){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(descriptions))
}

var getDescription=function(hour){
  var descriptions=getDescriptions()
  var possibleDescriptions=descriptions[hour]
  var description=possibleDescriptions || ""
  return description
  }

  var setDescription = function (hour, text) {
    storedDescriptions({...getDescriptions(), [hour]: text})
  }
  
//TODO
//THEN the current day is displayed at the top of the calendar
var reformatDate = moment().format(
    'dddd, MMMM Do YYYY, h:mm:ss a'
  ); $("#currentDay").text(reformatDate);

//WHEN I scroll down


//THEN I am presented with timeblocks for standard business hours


//WHEN I view the timeblocks for that day
var createHourBlock = function (hour, initialDescriptionValue){
  var block = $(
    `
      <div class="row time-block">
        <div class="col-md-1 hour">
        ` + renderHourText(hour) + `
        </div>
        <textarea class="col-md-10 descr"></textarea>
        <button class="btn saveBtn col-md-1"><i class="fas fa-save"></i></button>
      </div>
    `
  )

var description= block.find(".descr")
var saveButton= block.find(".saveBtn")
description.val(initialDescriptionValue)

saveButton.on("click", function () {
  setDescription(hour, description.val());
});

var update= function() {
  updateTimeCategory(block, hour);
};

update();
// varify 60000 is correct
setInterval(update, 60000);
return block;
};
var renderHourText= function(hour){
  var number= (hour % 12) || 12
  var period= hour < 12 ?"am":"pm"
  return number + period
};


var updateTimeCategory= function(block, hour){
  block.removeClass= ("past present future");
  var currentHour= moment().hours();
  //found way to run through serval contional statements using a ternary operator
  var timeCategory= hour<currentHour? "past":hour===currentHour? "present":hour>currentHour?"future":undefined;
  block.addClass(timeCategory);
};

const morning = 9
const evening = 17 

for(var hour = morning; hour <= evening; hour++){
  var storedDescription = getDescription(hour)
    var hourBlock = createHourBlock(hour, storedDescription)
    $(".container").append(hourBlock)
};






//THEN each timeblock is color coded to indicate whether it is in the past, present, or future


//WHEN I click into a timeblock


//THEN I can enter an event


//WHEN I click the save button for that timeblock


//THEN the text for that event is saved in local storage


//WHEN I refresh the page


//THEN the saved events persist
