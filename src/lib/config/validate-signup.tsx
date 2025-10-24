
import { FormErrors, FormData } from "@/interfaces/authInterface";

export default function validateSignup(payload: FormData): FormErrors {
  const newErrors: FormErrors = {};

  if (!payload.firstName.trim()) {
    newErrors.firstName = "First name is required";
  }else{
    
  }
  if (!payload.lastName.trim()) {
    newErrors.lastName = "Last name is required";
  }

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

 