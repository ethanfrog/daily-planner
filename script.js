// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  $('.btn').on('click', function () {
    // The time block of the pressed button
    var timeBlock = $(this).parent();
    // The id of the time block
    var timeBlockID = timeBlock.attr('id');
    // The input field of the time block
    var timeBlockTextbox = timeBlock.children('.description');
    // Save the contents of the time block to local storage
    localStorage.setItem(timeBlockID, JSON.stringify(timeBlockTextbox.val()));
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Get the current hour
  var currentHour = dayjs().hour();
  
  // Iterate through time blocks
  $('.time-block').each(function (index) {
    // Get the numerical hour value of the time block
    var timeBlockHour = Number($(this).attr('id').split('-')[1]);
    // Convert hour value to 24-hour format for comparison
    if (timeBlockHour < 5) {
      timeBlockHour += 12;
    }
  
    // Remove all color classes from the time block
    $(this).removeClass('past');
    $(this).removeClass('present');
    $(this).removeClass('future');
  
    // Add a color class to the time block based on the current hour
    if (currentHour > timeBlockHour) {
      $(this).addClass('past');
    }
    else if (currentHour < timeBlockHour) {
      $(this).addClass('future');
    }
    else {
      $(this).addClass('present');
    }
  })

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  for (i = 0; i < localStorage.length; i++) {
    var timeBlockToFill = $('#' + localStorage.key(i));
  
    var textboxToFill = timeBlockToFill.children('.description');

    var savedText = JSON.parse(localStorage.getItem(localStorage.key(i)));
    textboxToFill.val(savedText);
  }

  // TODO: Add code to display the current date in the header of the page.

  var currentDateEl = $('#currentDay');
  var currentDateObject = dayjs();
  // Display the current date, formatted as month/day/year
  currentDateEl.text(currentDateObject.format('M/D/YYYY'));
});
