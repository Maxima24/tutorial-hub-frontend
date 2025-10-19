import { Tutorial } from "@/interfaces/tutorialInterface";
const tutorials:Tutorial[]=[
{
    id: "1",
    title: 'Complete React Hooks Masterclass 2024',
    instructor: {
        id:"Sarah",
      name: 'Sarah Johnson',
      avatar: 'SJ',
      title: 'Senior React Developer',
      students: '50k+',
      rating: "4.9",
      courses: "12"
    },
    thumbnail: 'bg-gradient-to-br from-blue-400 to-blue-600',
    category: 'React',
    duration: '12h 45m',
    difficulty: 'Intermediate',
    rating: "4.8",
    reviewCount: "2847",
    students:" 12453",
    price: "49.99",
    originalPrice: "99.99",
    language: 'English',
    lastUpdated: 'October 2024',
    description: 'Master React Hooks from basics to advanced concepts. Build real-world projects and become a proficient React developer with hands-on experience in modern React development patterns.',
    WhatYouLearn: [
      'Master all React Hooks including useState, useEffect, useContext, and custom hooks',
      'Build 5 real-world projects from scratch',
      'Understand advanced patterns and best practices',
      'Performance optimization techniques',
      'Testing React components with Jest and React Testing Library',
      'State management with Context API and useReducer'
    ],
    requirements: [
      'Basic JavaScript knowledge',
      'Understanding of ES6+ features',
      'Familiarity with HTML and CSS',
      'Node.js installed on your computer'
    ],
    curriculum: [
      {
        title: 'Getting Started with React Hooks',
        duration: '2h 15m',
        lessons: [
          { title: 'Introduction to React Hooks', duration: '12:30', type: 'video', preview: true },
          { title: 'Setting Up Your Development Environment', duration: '15:45', type: 'video', preview: true },
          { title: 'Your First Hook - useState', duration: '20:15', type: 'video', preview: false },
          { title: 'Practice Exercise: Counter App', duration: '18:30', type: 'exercise', preview: false },
          { title: 'Quiz: useState Basics', duration: '10:00', type: 'quiz', preview: false }
        ]
      },
      {
        title: 'Deep Dive into useEffect',
        duration: '3h 30m',
        lessons: [
          { title: 'Understanding Side Effects', duration: '25:40', type: 'video', preview: false },
          { title: 'Cleanup Functions', duration: '18:20', type: 'video', preview: false },
          { title: 'Dependencies Array Explained', duration: '22:15', type: 'video', preview: false },
          { title: 'Common Pitfalls and Solutions', duration: '28:30', type: 'video', preview: false },
          { title: 'Project: Data Fetching App', duration: '45:00', type: 'project', preview: false }
        ]
      },
      {
        title: 'Advanced Hooks & Custom Hooks',
        duration: '4h 20m',
        lessons: [
          { title: 'useContext for State Management', duration: '30:15', type: 'video', preview: false },
          { title: 'useReducer - Redux Alternative', duration: '35:40', type: 'video', preview: false },
          { title: 'Creating Custom Hooks', duration: '40:20', type: 'video', preview: false },
          { title: 'useMemo and useCallback', duration: '28:45', type: 'video', preview: false },
          { title: 'Project: E-commerce Cart System', duration: '65:00', type: 'project', preview: false }
        ]
      },
      {
        title: 'Real-World Projects',
        duration: '2h 40m',
        lessons: [
          { title: 'Project 1: Weather Dashboard', duration: '50:00', type: 'project', preview: false },
          { title: 'Project 2: Task Manager', duration: '55:00', type: 'project', preview: false },
          { title: 'Project 3: Social Media Feed', duration: '55:00', type: 'project', preview: false }
        ]
      }
    ],
    reviews: [
      {
        name: 'Mike Chen',
        avatar: 'MC',
        rating: "5",
        date: '2 weeks ago',
        comment: 'Absolutely fantastic course! Sarah explains everything so clearly and the projects are super practical. I feel confident using React Hooks in my work now.',
        helpful: "234"
      },
      {
        name: 'Emma Davis',
        avatar: 'ED',
        rating: "5",
        date: '1 month ago',
        comment: 'Best React course I have taken. The custom hooks section was particularly valuable. Highly recommend!',
        helpful: "189"
      },
      {
        name: 'Alex Rivera',
        avatar: 'AR',
        rating: "4",
        date: '1 month ago',
        comment: 'Great content and well-structured. Would love to see more advanced performance optimization topics.',
        helpful: "145"
      }
    ]
  },{
    id: "2",
    title: 'Complete React Hooks Masterclass 2024',
    instructor: {
        id:"Sarah",
      name: 'Sarah Johnson',
      avatar: 'SJ',
      title: 'Senior React Developer',
      students: '50k+',
      rating: "4.9",
      courses: "12"
    },
    thumbnail: 'bg-gradient-to-br from-blue-400 to-blue-600',
    category: 'React',
    duration: '12h 45m',
    difficulty: 'Intermediate',
    rating: "4.8",
    reviewCount: "2847",
    students:" 12453",
    price: "49.99",
    originalPrice: "99.99",
    language: 'English',
    lastUpdated: 'October 2024',
    description: 'Master React Hooks from basics to advanced concepts. Build real-world projects and become a proficient React developer with hands-on experience in modern React development patterns.',
    WhatYouLearn: [
      'Master all React Hooks including useState, useEffect, useContext, and custom hooks',
      'Build 5 real-world projects from scratch',
      'Understand advanced patterns and best practices',
      'Performance optimization techniques',
      'Testing React components with Jest and React Testing Library',
      'State management with Context API and useReducer'
    ],
    requirements: [
      'Basic JavaScript knowledge',
      'Understanding of ES6+ features',
      'Familiarity with HTML and CSS',
      'Node.js installed on your computer'
    ],
    curriculum: [
      {
        title: 'Getting Started with React Hooks',
        duration: '2h 15m',
        lessons: [
          { title: 'Introduction to React Hooks', duration: '12:30', type: 'video', preview: true },
          { title: 'Setting Up Your Development Environment', duration: '15:45', type: 'video', preview: true },
          { title: 'Your First Hook - useState', duration: '20:15', type: 'video', preview: false },
          { title: 'Practice Exercise: Counter App', duration: '18:30', type: 'exercise', preview: false },
          { title: 'Quiz: useState Basics', duration: '10:00', type: 'quiz', preview: false }
        ]
      },
      {
        title: 'Deep Dive into useEffect',
        duration: '3h 30m',
        lessons: [
          { title: 'Understanding Side Effects', duration: '25:40', type: 'video', preview: false },
          { title: 'Cleanup Functions', duration: '18:20', type: 'video', preview: false },
          { title: 'Dependencies Array Explained', duration: '22:15', type: 'video', preview: false },
          { title: 'Common Pitfalls and Solutions', duration: '28:30', type: 'video', preview: false },
          { title: 'Project: Data Fetching App', duration: '45:00', type: 'project', preview: false }
        ]
      },
      {
        title: 'Advanced Hooks & Custom Hooks',
        duration: '4h 20m',
        lessons: [
          { title: 'useContext for State Management', duration: '30:15', type: 'video', preview: false },
          { title: 'useReducer - Redux Alternative', duration: '35:40', type: 'video', preview: false },
          { title: 'Creating Custom Hooks', duration: '40:20', type: 'video', preview: false },
          { title: 'useMemo and useCallback', duration: '28:45', type: 'video', preview: false },
          { title: 'Project: E-commerce Cart System', duration: '65:00', type: 'project', preview: false }
        ]
      },
      {
        title: 'Real-World Projects',
        duration: '2h 40m',
        lessons: [
          { title: 'Project 1: Weather Dashboard', duration: '50:00', type: 'project', preview: false },
          { title: 'Project 2: Task Manager', duration: '55:00', type: 'project', preview: false },
          { title: 'Project 3: Social Media Feed', duration: '55:00', type: 'project', preview: false }
        ]
      }
    ],
    reviews: [
      {
        name: 'Mike Chen',
        avatar: 'MC',
        rating: "5",
        date: '2 weeks ago',
        comment: 'Absolutely fantastic course! Sarah explains everything so clearly and the projects are super practical. I feel confident using React Hooks in my work now.',
        helpful: "234"
      },
      {
        name: 'Emma Davis',
        avatar: 'ED',
        rating: "5",
        date: '1 month ago',
        comment: 'Best React course I have taken. The custom hooks section was particularly valuable. Highly recommend!',
        helpful: "189"
      },
      {
        name: 'Alex Rivera',
        avatar: 'AR',
        rating: "4",
        date: '1 month ago',
        comment: 'Great content and well-structured. Would love to see more advanced performance optimization topics.',
        helpful: "145"
      }
    ]
  },{
    id: "1",
    title: 'Complete React Hooks Masterclass 2024',
    instructor: {
        id:"Sarah",
      name: 'Sarah Johnson',
      avatar: 'SJ',
      title: 'Senior React Developer',
      students: '50k+',
      rating: "4.9",
      courses: "12"
    },
    thumbnail: 'bg-gradient-to-br from-blue-400 to-blue-600',
    category: 'React',
    duration: '12h 45m',
    difficulty: 'Intermediate',
    rating: "4.8",
    reviewCount: "2847",
    students:" 12453",
    price: "49.99",
    originalPrice: "99.99",
    language: 'English',
    lastUpdated: 'October 2024',
    description: 'Master React Hooks from basics to advanced concepts. Build real-world projects and become a proficient React developer with hands-on experience in modern React development patterns.',
    WhatYouLearn: [
      'Master all React Hooks including useState, useEffect, useContext, and custom hooks',
      'Build 5 real-world projects from scratch',
      'Understand advanced patterns and best practices',
      'Performance optimization techniques',
      'Testing React components with Jest and React Testing Library',
      'State management with Context API and useReducer'
    ],
    requirements: [
      'Basic JavaScript knowledge',
      'Understanding of ES6+ features',
      'Familiarity with HTML and CSS',
      'Node.js installed on your computer'
    ],
    curriculum: [
      {
        title: 'Getting Started with React Hooks',
        duration: '2h 15m',
        lessons: [
          { title: 'Introduction to React Hooks', duration: '12:30', type: 'video', preview: true },
          { title: 'Setting Up Your Development Environment', duration: '15:45', type: 'video', preview: true },
          { title: 'Your First Hook - useState', duration: '20:15', type: 'video', preview: false },
          { title: 'Practice Exercise: Counter App', duration: '18:30', type: 'exercise', preview: false },
          { title: 'Quiz: useState Basics', duration: '10:00', type: 'quiz', preview: false }
        ]
      },
      {
        title: 'Deep Dive into useEffect',
        duration: '3h 30m',
        lessons: [
          { title: 'Understanding Side Effects', duration: '25:40', type: 'video', preview: false },
          { title: 'Cleanup Functions', duration: '18:20', type: 'video', preview: false },
          { title: 'Dependencies Array Explained', duration: '22:15', type: 'video', preview: false },
          { title: 'Common Pitfalls and Solutions', duration: '28:30', type: 'video', preview: false },
          { title: 'Project: Data Fetching App', duration: '45:00', type: 'project', preview: false }
        ]
      },
      {
        title: 'Advanced Hooks & Custom Hooks',
        duration: '4h 20m',
        lessons: [
          { title: 'useContext for State Management', duration: '30:15', type: 'video', preview: false },
          { title: 'useReducer - Redux Alternative', duration: '35:40', type: 'video', preview: false },
          { title: 'Creating Custom Hooks', duration: '40:20', type: 'video', preview: false },
          { title: 'useMemo and useCallback', duration: '28:45', type: 'video', preview: false },
          { title: 'Project: E-commerce Cart System', duration: '65:00', type: 'project', preview: false }
        ]
      },
      {
        title: 'Real-World Projects',
        duration: '2h 40m',
        lessons: [
          { title: 'Project 1: Weather Dashboard', duration: '50:00', type: 'project', preview: false },
          { title: 'Project 2: Task Manager', duration: '55:00', type: 'project', preview: false },
          { title: 'Project 3: Social Media Feed', duration: '55:00', type: 'project', preview: false }
        ]
      }
    ],
    reviews: [
      {
        name: 'Mike Chen',
        avatar: 'MC',
        rating: "5",
        date: '2 weeks ago',
        comment: 'Absolutely fantastic course! Sarah explains everything so clearly and the projects are super practical. I feel confident using React Hooks in my work now.',
        helpful: "234"
      },
      {
        name: 'Emma Davis',
        avatar: 'ED',
        rating: "5",
        date: '1 month ago',
        comment: 'Best React course I have taken. The custom hooks section was particularly valuable. Highly recommend!',
        helpful: "189"
      },
      {
        name: 'Alex Rivera',
        avatar: 'AR',
        rating: "4",
        date: '1 month ago',
        comment: 'Great content and well-structured. Would love to see more advanced performance optimization topics.',
        helpful: "145"
      }
    ]
  },{
    id: "3",
    title: 'Complete React Hooks Masterclass 2024',
    instructor: {
        id:"Sarah",
      name: 'Sarah Johnson',
      avatar: 'SJ',
      title: 'Senior React Developer',
      students: '50k+',
      rating: "4.9",
      courses: "12"
    },
    thumbnail: 'bg-gradient-to-br from-blue-400 to-blue-600',
    category: 'React',
    duration: '12h 45m',
    difficulty: 'Intermediate',
    rating: "4.8",
    reviewCount: "2847",
    students:" 12453",
    price: "49.99",
    originalPrice: "99.99",
    language: 'English',
    lastUpdated: 'October 2024',
    description: 'Master React Hooks from basics to advanced concepts. Build real-world projects and become a proficient React developer with hands-on experience in modern React development patterns.',
    WhatYouLearn: [
      'Master all React Hooks including useState, useEffect, useContext, and custom hooks',
      'Build 5 real-world projects from scratch',
      'Understand advanced patterns and best practices',
      'Performance optimization techniques',
      'Testing React components with Jest and React Testing Library',
      'State management with Context API and useReducer'
    ],
    requirements: [
      'Basic JavaScript knowledge',
      'Understanding of ES6+ features',
      'Familiarity with HTML and CSS',
      'Node.js installed on your computer'
    ],
    curriculum: [
      {
        title: 'Getting Started with React Hooks',
        duration: '2h 15m',
        lessons: [
          { title: 'Introduction to React Hooks', duration: '12:30', type: 'video', preview: true },
          { title: 'Setting Up Your Development Environment', duration: '15:45', type: 'video', preview: true },
          { title: 'Your First Hook - useState', duration: '20:15', type: 'video', preview: false },
          { title: 'Practice Exercise: Counter App', duration: '18:30', type: 'exercise', preview: false },
          { title: 'Quiz: useState Basics', duration: '10:00', type: 'quiz', preview: false }
        ]
      },
      {
        title: 'Deep Dive into useEffect',
        duration: '3h 30m',
        lessons: [
          { title: 'Understanding Side Effects', duration: '25:40', type: 'video', preview: false },
          { title: 'Cleanup Functions', duration: '18:20', type: 'video', preview: false },
          { title: 'Dependencies Array Explained', duration: '22:15', type: 'video', preview: false },
          { title: 'Common Pitfalls and Solutions', duration: '28:30', type: 'video', preview: false },
          { title: 'Project: Data Fetching App', duration: '45:00', type: 'project', preview: false }
        ]
      },
      {
        title: 'Advanced Hooks & Custom Hooks',
        duration: '4h 20m',
        lessons: [
          { title: 'useContext for State Management', duration: '30:15', type: 'video', preview: false },
          { title: 'useReducer - Redux Alternative', duration: '35:40', type: 'video', preview: false },
          { title: 'Creating Custom Hooks', duration: '40:20', type: 'video', preview: false },
          { title: 'useMemo and useCallback', duration: '28:45', type: 'video', preview: false },
          { title: 'Project: E-commerce Cart System', duration: '65:00', type: 'project', preview: false }
        ]
      },
      {
        title: 'Real-World Projects',
        duration: '2h 40m',
        lessons: [
          { title: 'Project 1: Weather Dashboard', duration: '50:00', type: 'project', preview: false },
          { title: 'Project 2: Task Manager', duration: '55:00', type: 'project', preview: false },
          { title: 'Project 3: Social Media Feed', duration: '55:00', type: 'project', preview: false }
        ]
      }
    ],
    reviews: [
      {
        name: 'Mike Chen',
        avatar: 'MC',
        rating: "5",
        date: '2 weeks ago',
        comment: 'Absolutely fantastic course! Sarah explains everything so clearly and the projects are super practical. I feel confident using React Hooks in my work now.',
        helpful: "234"
      },
      {
        name: 'Emma Davis',
        avatar: 'ED',
        rating: "5",
        date: '1 month ago',
        comment: 'Best React course I have taken. The custom hooks section was particularly valuable. Highly recommend!',
        helpful: "189"
      },
      {
        name: 'Alex Rivera',
        avatar: 'AR',
        rating: "4",
        date: '1 month ago',
        comment: 'Great content and well-structured. Would love to see more advanced performance optimization topics.',
        helpful: "145"
      }
    ]
  },
  {
    id: "5",
    title: 'Complete server Hooks Masterclass 2024',
    instructor: {
        id:"Sarah",
      name: 'Sarah Johnson',
      avatar: 'SJ',
      title: 'Senior React Developer',
      students: '50k+',
      rating: "4.9",
      courses: "12"
    },
    thumbnail: 'bg-gradient-to-br from-blue-400 to-blue-600',
    category: 'React',
    duration: '12h 45m',
    difficulty: 'Intermediate',
    rating: "4.8",
    reviewCount: "2847",
    students:" 12453",
    price: "49.99",
    originalPrice: "99.99",
    language: 'English',
    lastUpdated: 'October 2024',
    description: 'Master React Hooks from basics to advanced concepts. Build real-world projects and become a proficient React developer with hands-on experience in modern React development patterns.',
    WhatYouLearn: [
      'Master all React Hooks including useState, useEffect, useContext, and custom hooks',
      'Build 5 real-world projects from scratch',
      'Understand advanced patterns and best practices',
      'Performance optimization techniques',
      'Testing React components with Jest and React Testing Library',
      'State management with Context API and useReducer'
    ],
    requirements: [
      'Basic JavaScript knowledge',
      'Understanding of ES6+ features',
      'Familiarity with HTML and CSS',
      'Node.js installed on your computer'
    ],
    curriculum: [
      {
        title: 'Getting Started with React Hooks',
        duration: '2h 15m',
        lessons: [
          { title: 'Introduction to React Hooks', duration: '12:30', type: 'video', preview: true },
          { title: 'Setting Up Your Development Environment', duration: '15:45', type: 'video', preview: true },
          { title: 'Your First Hook - useState', duration: '20:15', type: 'video', preview: false },
          { title: 'Practice Exercise: Counter App', duration: '18:30', type: 'exercise', preview: false },
          { title: 'Quiz: useState Basics', duration: '10:00', type: 'quiz', preview: false }
        ]
      },
      {
        title: 'Deep Dive into useEffect',
        duration: '3h 30m',
        lessons: [
          { title: 'Understanding Side Effects', duration: '25:40', type: 'video', preview: false },
          { title: 'Cleanup Functions', duration: '18:20', type: 'video', preview: false },
          { title: 'Dependencies Array Explained', duration: '22:15', type: 'video', preview: false },
          { title: 'Common Pitfalls and Solutions', duration: '28:30', type: 'video', preview: false },
          { title: 'Project: Data Fetching App', duration: '45:00', type: 'project', preview: false }
        ]
      },
      {
        title: 'Advanced Hooks & Custom Hooks',
        duration: '4h 20m',
        lessons: [
          { title: 'useContext for State Management', duration: '30:15', type: 'video', preview: false },
          { title: 'useReducer - Redux Alternative', duration: '35:40', type: 'video', preview: false },
          { title: 'Creating Custom Hooks', duration: '40:20', type: 'video', preview: false },
          { title: 'useMemo and useCallback', duration: '28:45', type: 'video', preview: false },
          { title: 'Project: E-commerce Cart System', duration: '65:00', type: 'project', preview: false }
        ]
      },
      {
        title: 'Real-World Projects',
        duration: '2h 40m',
        lessons: [
          { title: 'Project 1: Weather Dashboard', duration: '50:00', type: 'project', preview: false },
          { title: 'Project 2: Task Manager', duration: '55:00', type: 'project', preview: false },
          { title: 'Project 3: Social Media Feed', duration: '55:00', type: 'project', preview: false }
        ]
      }
    ],
    reviews: [
      {
        name: 'Mike Chen',
        avatar: 'MC',
        rating: "5",
        date: '2 weeks ago',
        comment: 'Absolutely fantastic course! Sarah explains everything so clearly and the projects are super practical. I feel confident using React Hooks in my work now.',
        helpful: "234"
      },
      {
        name: 'Emma Davis',
        avatar: 'ED',
        rating: "5",
        date: '1 month ago',
        comment: 'Best React course I have taken. The custom hooks section was particularly valuable. Highly recommend!',
        helpful: "189"
      },
      {
        name: 'Alex Rivera',
        avatar: 'AR',
        rating: "4",
        date: '1 month ago',
        comment: 'Great content and well-structured. Would love to see more advanced performance optimization topics.',
        helpful: "145"
      }
    ]
  }
]

 export  default tutorials