//Variables
const nameInput = document.getElementById('name');
let otherJobInput = document.getElementById('other-job-role');
const jobSelect = document.getElementById('title');


// When the page first loads, 
// the first text field should have the focus state by default to prompt the user.
nameInput.focus();

// Hide the "text field" with the id of "other-job-role" 
// so it is not displayed when the form first loads.
otherJobInput.style.display = 'none';
//Adds an event listener that listens for changes in select choice
jobSelect.addEventListener('change', () => {
    //if the value chosen is "other" display "other" input
    let jobValue = jobSelect.value;
    if (jobValue == "other") {
        otherJobInput.style.display = 'inline-block';
    } else {
        otherJobInput.style.display = 'none';
    }
})    

