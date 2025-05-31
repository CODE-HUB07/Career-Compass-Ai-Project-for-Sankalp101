import { UserData, Career } from '@/types';

// This is mock data - in a real application, this would be generated dynamically by AI
export const careerSuggestions: Record<string, Career[]> = {
  tech: [
    {
      id: 1,
      title: "Software Developer",
      description: "Design, develop, and maintain software systems and applications that solve real-world problems.",
      match: "Your technical skills, problem-solving abilities, and interest in logical thinking make you well-suited for software development.",
      resources: [
        { name: "freeCodeCamp", url: "https://www.freecodecamp.org/", type: "course" },
        { name: "The Odin Project", url: "https://www.theodinproject.com/", type: "course" },
        { name: "GitHub", url: "https://github.com/", type: "tool" },
      ],
      icon: "Code",
      color: "blue",
      opportunities: [
        {
          title: "Junior Software Developer",
          organization: "Tech Solutions Inc.",
          location: "Remote",
          url: "https://example.com/jobs/tech-solutions",
          type: "job",
          deadline: "2025-05-15"
        },
        {
          title: "Masters in Computer Science",
          organization: "Princeton University",
          location: "Princeton, NJ",
          url: "https://example.com/study/princeton-cs",
          type: "study",
          deadline: "2025-06-30"
        }
      ]
    },
    {
      id: 2,
      title: "Data Scientist",
      description: "Analyze complex data sets to identify trends and insights that drive business decisions.",
      match: "Your analytical mindset, mathematical background, and interest in finding patterns make data science an excellent fit.",
      resources: [
        { name: "Kaggle", url: "https://www.kaggle.com/", type: "tool" },
        { name: "DataCamp", url: "https://www.datacamp.com/", type: "course" },
        { name: "Python for Data Analysis", url: "https://wesmckinney.com/book/", type: "book" },
      ],
      icon: "BarChart",
      color: "purple",
      opportunities: [
        {
          title: "Data Analyst",
          organization: "Global Analytics",
          location: "New York, NY",
          url: "https://example.com/jobs/global-analytics",
          type: "job"
        },
        {
          title: "PhD in Data Science",
          organization: "MIT",
          location: "Cambridge, MA",
          url: "https://example.com/study/mit-data-science",
          type: "study"
        }
      ]
    },
    {
      id: 3,
      title: "UX/UI Designer",
      description: "Create intuitive and engaging user experiences for websites and applications.",
      match: "Your creativity, empathy, and interest in how people interact with technology suggest you'd excel in UX/UI design.",
      resources: [
        { name: "Figma", url: "https://www.figma.com/", type: "tool" },
        { name: "Interaction Design Foundation", url: "https://www.interaction-design.org/", type: "course" },
        { name: "Nielsen Norman Group", url: "https://www.nngroup.com/", type: "website" },
      ],
      icon: "Palette",
      color: "pink",
      opportunities: [
        {
          title: "UX Designer Internship",
          organization: "Creative Studios",
          location: "San Francisco, CA",
          url: "https://example.com/jobs/creative-studios",
          type: "job"
        },
        {
          title: "Master of Human-Computer Interaction",
          organization: "Carnegie Mellon University",
          location: "Pittsburgh, PA",
          url: "https://example.com/study/cmu-hci",
          type: "study"
        }
      ]
    }
  ],
  arts: [
    {
      id: 4,
      title: "Content Creator",
      description: "Develop engaging content for various platforms, including blogs, social media, and video.",
      match: "Your creativity, communication skills, and interest in storytelling make content creation a strong match.",
      resources: [
        { name: "Coursera - Content Strategy", url: "https://www.coursera.org/specializations/content-strategy", type: "course" },
        { name: "Canva", url: "https://www.canva.com/", type: "tool" },
        { name: "Digital Marketing Institute", url: "https://digitalmarketinginstitute.com/", type: "website" },
      ],
      icon: "Edit",
      color: "orange",
      opportunities: [
        {
          title: "Content Marketing Specialist",
          organization: "Media Matters",
          location: "Chicago, IL",
          url: "https://example.com/jobs/media-matters",
          type: "job"
        },
        {
          title: "MFA in Creative Writing",
          organization: "Columbia University",
          location: "New York, NY",
          url: "https://example.com/study/columbia-writing",
          type: "study"
        }
      ]
    },
    {
      id: 5,
      title: "Digital Marketing Specialist",
      description: "Plan and execute marketing campaigns across digital channels to build brand awareness and drive conversions.",
      match: "Your analytical abilities, creativity, and interest in psychology and consumer behavior align well with digital marketing.",
      resources: [
        { name: "Google Digital Garage", url: "https://learndigital.withgoogle.com/digitalgarage", type: "course" },
        { name: "HubSpot Academy", url: "https://academy.hubspot.com/", type: "course" },
        { name: "SEMrush", url: "https://www.semrush.com/", type: "tool" },
      ],
      icon: "TrendingUp",
      color: "teal",
      opportunities: [
        {
          title: "Digital Marketing Coordinator",
          organization: "Brand Elevate",
          location: "Austin, TX",
          url: "https://example.com/jobs/brand-elevate",
          type: "job"
        },
        {
          title: "MSc in Digital Marketing",
          organization: "University of Edinburgh",
          location: "Edinburgh, UK",
          url: "https://example.com/study/edinburgh-marketing",
          type: "study"
        }
      ]
    }
  ],
  science: [
    {
      id: 6,
      title: "Research Scientist",
      description: "Conduct experiments and research to advance knowledge in a specific scientific field.",
      match: "Your analytical thinking, attention to detail, and curiosity about how things work suggest research science would be fulfilling.",
      resources: [
        { name: "edX - Science Courses", url: "https://www.edx.org/learn/science", type: "course" },
        { name: "ResearchGate", url: "https://www.researchgate.net/", type: "website" },
        { name: "Coursera - Data Science", url: "https://www.coursera.org/specializations/jhu-data-science", type: "course" },
      ],
      icon: "Flask",
      color: "blue",
      opportunities: [
        {
          title: "Research Assistant",
          organization: "National Research Institute",
          location: "Boston, MA",
          url: "https://example.com/jobs/national-research",
          type: "job"
        },
        {
          title: "PhD in Biochemistry",
          organization: "Stanford University",
          location: "Stanford, CA",
          url: "https://example.com/study/stanford-biochem",
          type: "study"
        }
      ]
    },
    {
      id: 7,
      title: "Healthcare Professional",
      description: "Provide medical care and support to patients in various healthcare settings.",
      match: "Your empathy, communication skills, and interest in human biology and wellbeing point to healthcare as an excellent path.",
      resources: [
        { name: "Khan Academy - Health & Medicine", url: "https://www.khanacademy.org/science/health-and-medicine", type: "course" },
        { name: "Coursera - Healthcare", url: "https://www.coursera.org/browse/health", type: "course" },
        { name: "MedlinePlus", url: "https://medlineplus.gov/", type: "website" },
      ],
      icon: "Heartbeat",
      color: "pink",
      opportunities: [
        {
          title: "Registered Nurse",
          organization: "Memorial Hospital",
          location: "Denver, CO",
          url: "https://example.com/jobs/memorial-hospital",
          type: "job"
        },
        {
          title: "Doctor of Medicine (MD)",
          organization: "Johns Hopkins University",
          location: "Baltimore, MD",
          url: "https://example.com/study/johns-hopkins-medicine",
          type: "study"
        }
      ]
    }
  ],
  business: [
    {
      id: 8,
      title: "Business Analyst",
      description: "Analyze business processes and systems to identify improvements and solutions.",
      match: "Your problem-solving abilities, attention to detail, and interest in how businesses operate make you well-suited for business analysis.",
      resources: [
        { name: "LinkedIn Learning - Business Analysis", url: "https://www.linkedin.com/learning/topics/business-analysis", type: "course" },
        { name: "International Institute of Business Analysis", url: "https://www.iiba.org/", type: "website" },
        { name: "Tableau", url: "https://www.tableau.com/", type: "tool" },
      ],
      icon: "BarChart2",
      color: "purple",
      opportunities: [
        {
          title: "Junior Business Analyst",
          organization: "Consulting Partners",
          location: "Chicago, IL",
          url: "https://example.com/jobs/consulting-partners",
          type: "job"
        },
        {
          title: "MBA with Business Analytics",
          organization: "University of Michigan",
          location: "Ann Arbor, MI",
          url: "https://example.com/study/umich-mba",
          type: "study"
        }
      ]
    },
    {
      id: 9,
      title: "Project Manager",
      description: "Plan, execute, and close projects while ensuring they're completed on time and within budget.",
      match: "Your organizational skills, leadership abilities, and interest in coordinating people and resources align with project management.",
      resources: [
        { name: "PMI - Project Management Institute", url: "https://www.pmi.org/", type: "website" },
        { name: "Asana", url: "https://asana.com/", type: "tool" },
        { name: "Coursera - Project Management", url: "https://www.coursera.org/professional-certificates/google-project-management", type: "course" },
      ],
      icon: "Trello",
      color: "teal",
      opportunities: [
        {
          title: "Project Coordinator",
          organization: "Global Solutions Inc.",
          location: "Seattle, WA",
          url: "https://example.com/jobs/global-solutions",
          type: "job"
        },
        {
          title: "MSc in Project Management",
          organization: "Boston University",
          location: "Boston, MA",
          url: "https://example.com/study/bu-project-management",
          type: "study"
        }
      ]
    }
  ]
};

// Enhanced career matching algorithm
export const getCareerSuggestions = (userData: UserData): Career[] => {
  // Scoring mechanism for career matching
  const scoreCareers = (careers: Career[]): Career[] => {
    return careers.map(career => {
      let score = 0;

      // Match interests
      if (userData.interests.some(interest => 
        ['Technology', 'Science', 'Art', 'Business'].includes(interest))) {
        score += 20;
      }

      // Match technical skills
      if (userData.skills.technical.length > 0) {
        score += userData.skills.technical.length * 5;
      }

      // Match soft skills
      if (userData.skills.soft.length > 0) {
        score += userData.skills.soft.length * 3;
      }

      // Match educational background
      if (userData.subjects.length > 0) {
        score += userData.subjects.length * 4;
      }

      return { ...career, matchScore: score };
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);  // Top 5 careers
  };

  // Combine careers from different categories
  let allCareers: Career[] = [];
  
  const categoryMatchers = {
    tech: userData.skills.technical.length > 0 || 
          userData.subjects.includes('Computer Science') || 
          userData.interests.includes('Technology'),
    arts: userData.skills.soft.includes('Creativity') || 
          userData.interests.includes('Art') || 
          userData.subjects.includes('Literature'),
    science: userData.subjects.includes('Biology') || 
             userData.subjects.includes('Chemistry') || 
             userData.interests.includes('Science'),
    business: userData.skills.soft.includes('Leadership') || 
              userData.interests.includes('Business') || 
              userData.subjects.includes('Economics')
  };

  Object.entries(categoryMatchers).forEach(([category, matches]) => {
    if (matches) {
      allCareers.push(...careerSuggestions[category]);
    }
  });

  // If no specific matches, provide a diverse set of careers
  if (allCareers.length === 0) {
    Object.values(careerSuggestions).forEach(careers => {
      allCareers.push(...careers.slice(0, 2));
    });
  }

  return scoreCareers(allCareers);
};

// Enhanced opportunity matching
export const findRelevantOpportunities = (careers: Career[], userData: UserData) => {
  return careers.map(career => {
    // Filter opportunities based on user preferences
    const filteredOpportunities = career.opportunities?.filter(opportunity => {
      // Match location preferences
      const locationMatch = !userData.location || 
        opportunity.location.toLowerCase().includes(userData.location.toLowerCase());

      // Match study/job type based on user stage
      const stageMatch = opportunity.type === (
        parseInt(userData.age) < 25 ? 'study' : 'job'
      );

      return locationMatch && stageMatch;
    });

    return { 
      ...career, 
      opportunities: filteredOpportunities 
    };
  });
};

export const predefinedOptions = {
  subjects: [
    "Mathematics", "Computer Science", "Biology", "Chemistry", "Physics", 
    "Literature", "History", "Geography", "Art", "Music", "Economics", 
    "Psychology", "Sociology", "Political Science", "Philosophy", "Engineering"
  ],
  interests: [
    "Technology", "Science", "Art", "Writing", "Reading", "Music", "Sports",
    "Travel", "Cooking", "Gaming", "Photography", "Nature", "Volunteering",
    "Business", "Teaching", "Healthcare", "Design", "Fashion"
  ],
  technicalSkills: [
    "Programming", "Data Analysis", "Graphic Design", "Web Development",
    "Digital Marketing", "Project Management", "Research", "Financial Analysis",
    "Content Creation", "Video Editing", "SEO", "Database Management",
    "Mobile Development", "UI/UX Design", "Systems Administration"
  ],
  softSkills: [
    "Communication", "Leadership", "Teamwork", "Problem Solving", "Critical Thinking",
    "Time Management", "Adaptability", "Creativity", "Emotional Intelligence",
    "Attention to Detail", "Organization", "Decision Making", "Negotiation",
    "Conflict Resolution", "Customer Service"
  ]
};
