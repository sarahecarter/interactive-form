//Variables
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
let emailHint = document.getElementById('email-hint');
let otherJobInput = document.getElementById('other-job-role');
const jobSelect = document.getElementById('title');
const colorSelect = document.getElementById('color');
const designSelect = document.getElementById('design');
const activitiesFieldset = document.getElementById('activities');
let activitiesHint = document.getElementById('activities-hint');
const activityTimes = document.querySelectorAll('input[data-day-and-time]');
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const totalCostP = document.getElementById('activities-cost');
let cost = 0;
const paymentSelect = document.getElementById('payment');
const creditCardOption = document.querySelector('option[value="credit-card"]');
const creditCard = document.getElementById('credit-card');
const cardNumberInput = document.getElementById('cc-num');
const zipCodeInput = document.getElementById('zip');
const cvvInput = document.getElementById('cvv');
const payPal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');




//* Name Section *//
// When the page first loads, 
// the first text field should have the focus state by default
nameInput.focus();
nameInput.addEventListener('keyup', () => {
    if (!validateName()) {
        validationFailed(nameInput);
    } 
    else {validationPassed(nameInput)}
});

//* Email Section *//
emailInput.addEventListener('keyup', () => {
    if (!validateEmail()) {
        validationFailed(emailInput);
    } 
    else {validationPassed(emailInput)}
});

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
        //if the the selected matches the option, display the option
        if (dataTheme == designValue) {
            colorSelect.children[i].hidden = false;
            colorSelect.children[i].selected = true;
        } else {
            colorSelect.children[i].hidden = true;
            colorSelect.children[i].selected = false; 
        } 
    }
})

//* Register for Activities Section *//
// Adds an event listener to listen for changes on activities <fieldset>
activitiesFieldset.addEventListener('change', (e) => {
    //variable for activity cost 
    let activityPrice = parseInt(e.target.getAttribute('data-cost'));
    //get day and time of checked event
    let scheduledTime = e.target.getAttribute('data-day-and-time');
    //if an activity is checked add price to cost and compare times
    if (e.target.checked) {
        cost = cost + activityPrice;
        for (let i = 0; i < activityTimes.length; i++) {
            if (scheduledTime == activityTimes[i].getAttribute('data-day-and-time') && activityTimes[i] != e.target) {
                activityTimes[i].parentElement.classList.add('disabled');
                activityTimes[i].disabled = true;
            }
        }
    } 
    // else if an activity is unchecked subtract price from cost or enable other activities
    else  {
        cost = cost - activityPrice;
        for (let i = 0; i < activityTimes.length; i++) {
            if (scheduledTime == activityTimes[i].getAttribute('data-day-and-time') && activityTimes[i] != e.target) {
                activityTimes[i].parentElement.classList.remove('disabled');
                activityTimes[i].disabled = false;
            }
        }
    }
    //update p element to reflect total cost
    totalCostP.innerHTML = `Total Price: $${cost}`
    


    return cost;
})

// Loops through checkboxes and listens for focus and blur events
for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener('focus', (e) => {
        e.target.parentElement.classList.add('focus');
    })
    checkBoxes[i].addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove('focus');
    })
}

//* Payment Info Section *//
// Credit card should be selected by default
creditCardOption.selected = true;
payPal.hidden = true;
bitcoin.hidden = true;

cardNumberInput.addEventListener('keyup', () => {
    if (!validateCardNumber()) {
        validationFailed(cardNumberInput);
    } 
    else {validationPassed(cardNumberInput)}
});

zipCodeInput.addEventListener('keyup', () => {
    if (!validateZip()) {
        validationFailed(zipCodeInput);
    } 
    else {validationPassed(zipCodeInput)}
});

cvvInput.addEventListener('keyup', () => {
    if (!validateCVV()) {
        validationFailed(cvvInput);
    } 
    else {validationPassed(cvvInput)}
});

// Adds an event listener for payment fieldset
paymentSelect.addEventListener('change', (e) => {
    if (e.target.value == "paypal") {
        payPal.hidden = false;
        creditCard.hidden = true;
        bitcoin.hidden = true;
    }
    else if (e.target.value == "bitcoin") {
        bitcoin.hidden = false;
        creditCard.hidden = true;
        payPal.hidden = true;
    }
    else if (e.target.value == "credit-card") {
        creditCard.hidden = false;
        bitcoin.hidden = true;
        payPal.hidden = true;
    }
})

//* Helper Functions *//
function validateName () {
    let nameValue = nameInput.value;
    let nameTest = /[a-zA-Z]+\s[a-zA-Z]+|[a-zA-Z]+/gm.test(nameValue);
    return nameTest;
}

function validateEmail () {
    if (emailInput.value == '') {
        emailHint.innerHTML = `Email field cannot be left blank`;
    }
    else {
        emailHint.innerHTML = `Email address must be formatted correctly`;
    }
    let emailValue = emailInput.value;
    let emailTest = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return emailTest;
}

function validateCardNumber () {
    let cardNumberValue = cardNumberInput.value;
    let cardNumberTest = /^[0-9]{13,16}$/.test(cardNumberValue);
    return cardNumberTest;
}

function validateZip () {
    let zipValue = zipCodeInput.value;
    let zipTest = /^[0-9]{5}$/.test(zipValue);
    return zipTest;
}

function validateCVV () {
    let cvvValue = cvvInput.value;
    let cvvTest = /^[0-9]{3}$/.test(cvvValue);
    return cvvTest;
}

function validationFailed (child) {
    child.parentElement.classList.add('not-valid');
    child.parentElement.classList.remove('valid');
    child.nextElementSibling.style.display = 'block';
}

function validationPassed (child) {
    child.parentElement.classList.add('valid');
    child.parentElement.classList.remove('not-valid');
    child.nextElementSibling.style.display = 'none';
}


//* Form Validation *//
// Adds an event listener to the form
form.addEventListener('submit', (e) => {
    //validate name
    if (!validateName()) {
        e.preventDefault();
        validationFailed(nameInput);
    } 
    else {validationPassed(nameInput)}
    
    //validate email
    if (!validateEmail()) {
        e.preventDefault();
        validationFailed(emailInput);
    }
    else {validationPassed(emailInput)}

    //make sure activity is checked
    if (cost == 0) {
        e.preventDefault();
        activitiesFieldset.classList.add('not-valid');
        activitiesFieldset.classList.remove('valid');
        activitiesHint.style.display = "block";
    }
    else {
        activitiesFieldset.classList.add('valid');
        activitiesFieldset.classList.remove('not-valid');
        activitiesHint.style.display = "none";
    }

    //if credit card is selected vaildate card 
    if (creditCardOption.selected = true) {
        //validate card number

        if(!validateCardNumber()) {
            e.preventDefault();
            validationFailed(cardNumberInput);
        }
        else {validationPassed(cardNumberInput)}

        //validate zip code
        if(!validateZip()) {
            e.preventDefault();
            validationFailed(zipCodeInput);
        }
        else {validationPassed(zipCodeInput)}
        
        //validate cvv
        if (!validateCVV()) {
            e.preventDefault();
            validationFailed(cvvInput);
        }
        else {validationPassed(cvvInput)}
    
    }

})