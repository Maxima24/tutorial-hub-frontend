
import { FormErrors, FormData, NameObject } from "@/interfaces/authInterface";

export default function validateSignup(payload: FormData,nameObject:NameObject): FormErrors {
  const newErrors: FormErrors = {};

  if (!nameObject.firstName.trim()) {
    newErrors.firstName = "First name is required";
  }else{
    
  }
  if (!nameObject.lastName.trim()) {
    newErrors.lastName = "Last name is required";
  }
  if(!payload.name.trim()){
    newErrors.name ="name is required"
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

 