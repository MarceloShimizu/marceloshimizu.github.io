/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e)
{
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) 
	{
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) 
{
	// Confirm that the user wants to reset the form.
	if (confirm('Clear message?')) 
	{
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("name").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() 
{
	let errorFlag = false;

	// Check if any input field is empty or has null value.
	let requiredFields = ["name", 
						  "email", 
						  "phone", 
						  "message"];

	for(let i = 0; i<requiredFields.length; i++)
	{
		let textField = document.getElementById(requiredFields[i]);

		if(!formFieldHasInput(textField))
		{
			document.getElementById(requiredFields[i] + "_error").style.display = "block";
			
			if (!errorFlag)
			{
				textField.focus();
				textField.select();
			}

			errorFlag = true;
		}
	}

	// Validate email
	let emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
	let emailValue = document.getElementById("email").value;

	if(formFieldHasInput(document.getElementById("email")) && !emailRegex.test(emailValue))
	{
		document.getElementById("emailFormat_error").style.display = "block";
		document.getElementById("email").focus();
		document.getElementById("email").select();
		errorFlag = true;
	}

	// Validate phone
	let phoneRegex = new RegExp(/^\d{10}$/);
	let phoneValue = document.getElementById("phone").value;

	if(formFieldHasInput(document.getElementById("phone")) && !phoneRegex.test(phoneValue))
	{
		document.getElementById("phoneFormat_error").style.display = "block";
		document.getElementById("phone").focus();
		document.getElementById("phone").select();
		errorFlag = true;
	}

	// Check if a subject is selected.
	if (document.getElementById("subject").selectedIndex<=0)
	{
		document.getElementById("subject_error").style.display = "block";
		
		if(!errorFlag)
		{
			document.getElementById("subject").focus();
		}
		
		errorFlag = true;
	}

 	return errorFlag;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() 
{
	// Get an array of error elements
	let error = document.getElementsByClassName("messageError");

	// Loop through each element in the error array
	for (let i = 0; i<error.length; i++) 
	{
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) 
{
	// Check if the text field has a value
	if (fieldElement.value == null || trim(fieldElement.value) == "") 
	{
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}

/*
 * Handles the load event of the document.
 */
function load() 
{
	// Hide Errors
	hideErrors();

	// Add event listener for the form submit
	document.getElementById("contactForm").addEventListener("submit", validate);

	// Reset the form using the default browser reset
	document.getElementById("contactForm").reset();

	// Add event listener for reset form.
	document.getElementById("contactForm").addEventListener("reset", resetForm);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);