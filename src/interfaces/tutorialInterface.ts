




export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  students: string;
  rating: string;
  courses: string;
}
export interface Lesson {
  title: string;
  duration: string;
  type: string;
  preview: Boolean;
}
export interface Courses {
  title: string;
  duration: string;
  lessons: Lesson[];
}
export interface Review {
  name: string;
  avatar: string;
  rating: string;
  date: string;
  comment: string;
  helpful?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  instructor: Instructor;
  thumbnail: string;
  category: string;
  duration: string;
  difficulty: string;
  rating: string;
  reviewCount: string;
  students: string;
  price: string;
  originalPrice?: string;
  language: string;
  lastUpdated: string;
  description: string;
  WhatYouLearn: string[];
  requirements: string[];
  curriculum: Courses[];
  reviews: Review[];
}

export interface TutorialStore{
    tutorials:Tutorial[]
    addTutorialDetails:(tutorial:Tutorial)=> void
    editTutorialDetails:(id:string,updatedData:Tutorial)=> void
    searchedTutorial:Tutorial | null
    getTutorialById:(id:string)=>void
}
