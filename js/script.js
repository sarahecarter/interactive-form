//Variables
const nameInput = document.getElementById('name');
let otherJobInput = document.getElementById('other-job-role');
const jobSelect = document.getElementById('title');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');
const jsPuns = document.querySelectorAll('option[data-theme="js puns"]');
const heartJS = document.querySelectorAll('option[data-theme="heart js"]');


//* Name Section *//
// When the page first loads, 
// the first text field should have the focus state by default
nameInput.focus();

//* Job Role Section *//
// Hide the "text field" with the id of "other-job-role" 
// so it is not displayed when the form first loads.
otherJobInput.style.display = 'none';
// Adds an event listener that listens for changes in select choice
jobSelect.addEventListener('change', () => {
    //if the value chosen is "other" display "other" input
    let jobValue = jobSelect.value;
    if (jobValue == "other") {
        otherJobInput.style.display = 'inline-block';
    } else {
        otherJobInput.style.display = 'none';
    }
})    

//* T-Shirt Info Section *//
// Disable the "Color" <select> element.
colorSelect.disabled = true;

// Adds an event listener to listen for changes on design <select>
designSelect.addEventListener('change', () => {
    colorSelect.disabled = false;
    let designValue = designSelect.value;
    // Disable color options for tshirts
    for (let i = 0; i < colorSelect.children.length; i++) {
        let dataTheme = colorSelect.children[i].getAttribute('data-theme');
        if (dataTheme == designValue) {
            colorSelect.children[i].hidden = false;
            colorSelect.children[i].selected = true;
        } else {
            colorSelect.children[i].hidden = true;
            colorSelect.children[i].selected = false; 
        } 
    }
})