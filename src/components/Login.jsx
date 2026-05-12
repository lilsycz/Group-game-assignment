import { useState } from "react";

/* ----------------------------------------------------
	VALIDATION PATTERNS
    - Define RegEx patterns for valid username and
    password inputs
------------------------------------------------------- */

const validationPattern = {
	username: /^[A-Za-z0-9_-]+$/, // Allows only letters, numbers, underscore and hyphen
	passwordUppercase: /[A-Z]/, // At least one uppercase letter
	passwordLowercase: /[a-z]/, // At least one lowercase letter
	passwordNumber: /\d/, // At least one number
	passwordSpecialCharacter: /[!@#$%^&*?_\-]/, // At least one special character
};

function Login() {
	/* ----------------------------------------------------
	VALIDATION: USERNAME
    - Check length (3-20 characters)
    - Check for valid username characters
    - Display error message if validation fails
------------------------------------------------------- */

	function validateUsername(username) {
		const usernameLength = username.length;
		const isValidUsername = validationPattern.username.test(username);

		if (usernameLength < 3 || usernameLength > 20) {
			return "Username must be between 3-20 characters.";
		}

		if (!isValidUsername) {
			return "Please enter a valid username.";
		}

		return "";
	}

	return (
		<div>
			<h1>Game-Login</h1>
		</div>
	);
}

export default Login;
