import { useState } from "react";
import { useNavigate } from 'react-router-dom'

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
	passwordSpecialCharacter: /[!@#$%^&*?_-]/, // At least one special character
};

function Login() {
	/* ----------------------------------------------------
		COMPONENT STATE STORAGE

		- Values for username and password inputs
		- Error messages for username and password 
		  validation
		- Messages for successful sign up and login
	------------------------------------------------------- */

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [signUpMessage, setSignUpMessage] = useState("");
	const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate()

	/* ----------------------------------------------------
		USERNAME VALIDATION

		- Check length (3-20 characters)
		- Check for valid characters
		- Display error message if validation fails
		- Return empty string if validation passes
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
		PASSWORD VALIDATION
		
		- Check for whitespace characters
		- Check length (minimum 8 characters)
		- Validate RegEx pattern for password
		- Display error message if validation fails
		- Return empty string if validation passes
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

		- Prevent default form submission behavior
		- Pass username and password values to validation
		  functions
		- Set error messages based on validation results
		- If validation fails, exit function
		- If validation passes, create user account object
		  and store in localStorage
		- Display success message and clear input fields
	------------------------------------------------------- */

	function handleSignUp(event) {
		event.preventDefault();

		const usernameErrorMessage = validateUsername(username);
		const passwordErrorMessage = validatePassword(password);

		setUsernameError(usernameErrorMessage);
		setPasswordError(passwordErrorMessage);

		if (usernameErrorMessage || passwordErrorMessage) {
			return;
		}

		const userAccount = {
			username: username,
			password: password,
		};

		localStorage.setItem("userAccount", JSON.stringify(userAccount));
		setSignUpMessage("Registration successful!");
		setUsername("");
		setPassword("");
	}

	/* ----------------------------------------------------
    	LOGIN HANDLER

		- Prevent default form submission behavior
		- Retrieve existing user account from localStorage
		- If account is not found, display error message 
		  and exit function
		- Compare username and password inputs with existing 
		  account values
		- If both username and password match, display
		  success message
		- If username or password do not match, display 
		  error message
	------------------------------------------------------- */

	function handleLogin(event) {
		event.preventDefault();

		const existingAccount = JSON.parse(localStorage.getItem("userAccount"));

		if (!existingAccount) {
			setLoginMessage("No account found. Please create an account first.");
			return;
		}

		const isUsernameMatch = existingAccount.username === username;
		const isPasswordMatch = existingAccount.password === password;

		if (isUsernameMatch && isPasswordMatch) {
			setLoginMessage("Login successful!");
			navigate("/game");
		} else {
			setLoginMessage("Invalid username or password.");
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
				<div className="">
					<button className="" type="button" onClick={handleLogin}>
						Log in
					</button>
					<button className="" type="submit" onSubmit={handleSignUp}>
						Create Account
					</button>
					{loginMessage && <p className="">{loginMessage}</p>}
					{signUpMessage && <p className="">{signUpMessage}</p>}
				</div>
			</form>
		</div>
	);
}

export default Login;
