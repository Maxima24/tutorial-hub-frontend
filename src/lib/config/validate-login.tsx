import {  LoginData, LoginErrors } from "@/interfaces/authInterface";



function validateLogin(payload: LoginData,): LoginErrors {
    const newErrors: LoginErrors = {};
  
    if (!payload.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      newErrors.email = "Invalid email format";
    }
  
    if (!payload.password.trim()) {
      newErrors.password = "Password is required";
    } 
    
  
    return newErrors;
  }
  
  export default validateLogin