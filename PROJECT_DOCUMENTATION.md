
# CareerCompass AI - Project Documentation

## Project Overview

CareerCompass AI is an intelligent career recommendation system designed to provide personalized career path suggestions based on an individual's profile, education, skills, and preferences. The application uses Google's Gemini AI API to generate tailored career recommendations with educational resources and job opportunities.

## Architecture

### Frontend Architecture

The project follows a component-based architecture using React, a popular JavaScript library for building user interfaces. The application is structured according to the following principles:

1. **Single Page Application (SPA)**: The entire application runs in a single HTML page, with different "views" being rendered by React components.

2. **Component Hierarchy**:
   - `App`: The root component that handles routing
   - `Index`: Main page component
   - `CareerForm`: Multi-step form manager
   - Form Steps: Individual step components for the data collection process
   - `ResultsStep`: Component to display AI-generated career recommendations

3. **Data Flow**: The application follows a unidirectional data flow where:
   - User data is collected through form steps
   - Data is passed to parent components through props
   - Final data is sent to the AI service for processing
   - Results are displayed to the user

4. **State Management**: React's useState hook is used to manage application state. Local storage is utilized to persist user data between sessions.

### API Integration

The project integrates with Google's Gemini AI API to generate personalized career recommendations based on the user's profile data:

1. **Data Collection**: Form collects comprehensive user profile data
2. **Data Formatting**: User data is formatted into a prompt for the AI
3. **API Request**: Formatted data is sent to Gemini AI API
4. **Response Processing**: AI responses are parsed and transformed into UI components

## Technologies Used

### Core Technologies

1. **React**: JavaScript library for building the user interface
   - Version: 18.3.1
   - Used for creating reusable UI components and managing the view layer

2. **TypeScript**: Typed superset of JavaScript
   - Provides static type checking for improved code quality
   - Enhances developer experience with better tooling

3. **Vite**: Modern build tool and development server
   - Offers fast hot module replacement
   - Efficient bundling for production

### UI Framework and Components

1. **Tailwind CSS**: Utility-first CSS framework
   - Used for styling components using utility classes
   - Provides responsive design capabilities

2. **shadcn/ui**: High-quality React components
   - Pre-built components like buttons, cards, and form elements
   - Consistent design language throughout the application

3. **Lucide Icons**: SVG icon library
   - Provides modern, customizable icons for enhanced UI

### Routing and Navigation

**React Router DOM** (version 6.26.2):
   - Handles client-side routing
   - Enables navigation between different sections of the app

### Data Fetching and State Management

1. **TanStack React Query** (version 5.56.2):
   - Handles data fetching, caching, and state management
   - Manages loading and error states for API requests

2. **Local Storage**:
   - Persists form data between sessions
   - Improves user experience by saving progress

### External API Integration

**Google Gemini AI API**:
   - Processes user data to generate career recommendations
   - Provides detailed career information, resources, and opportunities

## Application Features

1. **Multi-step Form**:
   - Collects user information across 5 focused steps
   - Progress indicator shows completion status
   - Form data is saved to local storage

2. **Personal Information Collection**:
   - Basic information: name, age, location
   - Education background and subjects
   - Interests and hobbies
   - Technical and soft skills
   - Work environment preferences

3. **AI-Powered Career Recommendations**:
   - Personalized career path suggestions
   - Detailed information for each career option
   - Match explanation based on user profile
   - Learning resources with categorization
   - Job and educational opportunities

4. **User Experience Enhancements**:
   - Responsive design for all device sizes
   - Dark/light theme toggle
   - Loading indicators during API requests
   - Toast notifications for user feedback
   - Form validation

5. **Sharing and Exporting**:
   - Ability to share recommendations via URL
   - Option to export recommendations as PDF

## File Structure

```
src/
├── components/             # UI components
│   ├── ui/                 # Base UI components (shadcn)
│   ├── steps/              # Form step components
│   │   ├── WelcomeStep.tsx
│   │   ├── PersonalInfoStep.tsx
│   │   ├── EducationStep.tsx
│   │   ├── InterestsStep.tsx
│   │   ├── SkillsStep.tsx
│   │   ├── PreferencesStep.tsx
│   │   └── ResultsStep.tsx
│   ├── CareerForm.tsx      # Main form component
│   ├── Header.tsx          # App header
│   ├── ThemeToggle.tsx     # Theme switcher
│   └── FloatingChatbot.tsx # Help chatbot
├── pages/                  # Page components
│   ├── Index.tsx           # Main page
│   ├── Developers.tsx      # Developer info page
│   └── NotFound.tsx        # 404 page
├── services/               # API service modules
│   └── aiService.ts        # Gemini AI API service
├── types/                  # TypeScript type definitions
│   └── index.ts            # Common type definitions
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── App.tsx                 # Main App component with routing
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## Data Flow

1. **User Input Collection**:
   - User fills out multi-step form
   - Data is saved to local state and localStorage

2. **AI Processing**:
   - Complete user profile is sent to the Gemini AI API
   - API processes the data using prompt engineering
   - AI generates personalized career suggestions

3. **Results Presentation**:
   - AI response is parsed into structured data
   - Data is rendered as interactive UI components
   - User can explore career details, resources, and opportunities

## Future Enhancements

1. **User Authentication**: Add login/signup functionality to save profiles
2. **More Detailed Assessments**: Implement personality and aptitude tests
3. **Career Comparison**: Allow users to compare different career paths
4. **Integration with Job Boards**: Connect with job listing APIs
5. **Resume Builder**: Help users create resumes tailored to recommended careers
6. **Interview Preparation**: AI-powered interview preparation for specific careers
7. **Mobile App**: Develop a native mobile application

## Testing

The application incorporates:
- Component testing using React Testing Library
- Error handling for API failures
- Fallback content when API is unavailable

## Deployment

The application is deployed using Vite's build process, which:
1. Optimizes assets for production
2. Bundles JavaScript and CSS
3. Generates static files for deployment
4. Can be hosted on any static hosting service

## Conclusion

CareerCompass AI represents a modern approach to career guidance using artificial intelligence. By collecting comprehensive user information and leveraging Google's Gemini AI, the application provides personalized career recommendations that align with users' skills, interests, and preferences. The responsive and intuitive interface ensures a seamless user experience across all devices.
