export interface FormData{
    name:string
    email: string,
    password: string,
   
  }
  
  export interface FormErrors{
    name?:string
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?:string;
    
  }  
  export interface NameObject{
    firstName:string,
    lastName:string
  }
  
  export interface LoginData{
    email: string,
    password: string,
  }
  
  export interface LoginErrors{
  
    email?: string;
    password?: string;
    
  }   
  export interface User{
    id:string,
    name:string,
    email:string,
    password:string,
    avatarUrl:string,
    videos:Record<string,any>,
    comments:Record<string,any>
  }
  