export const validateSignInForm = (email, password) => {

    if(email === null || email === undefined || email === "") return "Email/Phone ID is required";
    if(password === null || password === undefined || password === "") return "Password is required";

    const checkEmailOrPhone = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) || /^\d{10}$/.test(email);
    const checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    
    if (checkEmailOrPhone && checkPassword) {
        return null;
    } else {
        return "Email/Phone or Password is not valid";
    }
};

export const validateSignUpForm = (email, password, name) => {

    if(name === null || name === undefined || name === "") return "Name is required";
    if(email === null || email === undefined || email === "") return "Email/Phone ID is required";
    if(password === null || password === undefined || password === "") return "Password is required";

    const checkName = /^[A-Za-z\s]{1,50}$/.test(name);
    const checkEmailOrPhone = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) || /^\d{10}$/.test(email);
    const checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    
    if (!checkName) return "Name is not valid";
    if (!checkEmailOrPhone) return "Email/Phone ID is not valid";
    if (!checkPassword) return "Password should have at least one lowercase letter, one uppercase letter, one number, and one special character.";
    
    return null;
    };
