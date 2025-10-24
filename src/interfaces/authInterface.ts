export interface FormData{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword:string;
  }
  
  export interface FormErrors{
  
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?:string;
    
  }  
  
  export interface LoginData{
    email: string,
    password: string,
  }
  
  export interface LoginErrors{
  
    email?: string;
    password?: string;
    
  }   
  