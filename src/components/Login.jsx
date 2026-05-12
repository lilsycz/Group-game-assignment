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
    COMPONENT STATE

    - Store values for username and password inputs
    - Store error messages for username and password 
      validation
------------------------------------------------------- */

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");

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

	/* ----------------------------------------------------
	  VALIDATION: PASSWORD
    
    - Check for whitespace characters
    - Check length (minimum 8 characters)
    - Validate RegEx pattern for password
    - Display error message if validation fails
------------------------------------------------------- */

	function validatePassword(password) {
		const passwordHasSpaces = password.includes(" ");
		const passwordLength = password.length;
		const passwordHasUppercase = validationPattern.passwordUppercase.test(password);
		const passwordHasLowercase = validationPattern.passwordLowercase.test(password);
		const passwordHasNumber = validationPattern.passwordNumber.test(password);
		const passwordHasSpecialCharacters = validationPattern.passwordSpecialCharacter.test(password);

		if (passwordHasSpaces) {
			return "Password cannot contain whitespace characters.";
		}

		if (passwordLength < 8) {
			return "Password must be at least 8 characters.";
		}

		if (!(passwordHasUppercase && passwordHasLowercase && passwordHasNumber && passwordHasSpecialCharacters)) {
			return "Password must include at least one uppercase letter, a lowercase letter, a number and a special character.";
		}

		return "";
	}

	/* ----------------------------------------------------
    SIGN UP HANDLER
------------------------------------------------------- */

	function handleSignUp(event) {
		event.preventDefault();

		const isUsernameValid = validateUsername(username);
		const isPasswordValid = validatePassword(password);

		const userAccount = {
			username: username,
			password: password,
		};

		localStorage.setItem("userAccount", JSON.stringify(userAccount));

		setUsernameError(isUsernameValid);
		setPasswordError(isPasswordValid);

		if (isUsernameValid || isPasswordValid) {
			return;
		} else {
			setSignUpMessage("Registration successful!");
			setUsername("");
			setPassword("");
		}
	}

	/* ----------------------------------------------------
    SIGN UP MESSAGE
------------------------------------------------------- */

	return (
		<div>
			<form className="" onSubmit={handleSignUp}>
				<div className="">
					<input
						className=""
						type="text"
						id="signup-username"
						value={username}
						onChange={(event) => {
							setUsername(event.target.value);
							setUsernameError("");
							setSignUpMessage("");
						}}
					/>

					{usernameError && <p className="">{usernameError}</p>}
				</div>

				<div className="">
					<input
						className=""
						type="password"
						id="signup-password"
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
							setPasswordError("");
							setSignUpMessage("");
						}}
					/>

					{passwordError && <p className="">{passwordError}</p>}
				</div>
			</form>
			{signUpMessage && <p className="">{signUpMessage}</p>}
		</div>
	);
}

export default Login;
