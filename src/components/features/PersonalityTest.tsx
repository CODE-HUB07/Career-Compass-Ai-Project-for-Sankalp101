
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain, Check, User, Users, Briefcase, CheckCircle } from 'lucide-react';
import { PersonalityTestResult } from '@/types';
import { getPersonalityTest } from '@/services/aiService';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

interface PersonalityTestProps {
  onComplete: (result: PersonalityTestResult) => void;
  onClose: () => void;
}

interface Question {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
  }[];
}

const questions: Question[] = [
  {
    id: "work_preference",
    text: "How do you prefer to work on projects?",
    options: [
      { value: "independently", label: "I prefer working independently" },
      { value: "team", label: "I prefer collaborating with a team" },
      { value: "mix", label: "A mix of both, depending on the task" }
    ]
  },
  {
    id: "decision_making",
    text: "How do you typically make decisions?",
    options: [
      { value: "analytical", label: "I analyze all data and facts carefully" },
      { value: "intuitive", label: "I trust my gut feeling and instincts" },
      { value: "considerate", label: "I consider how it affects everyone involved" }
    ]
  },
  {
    id: "social_energy",
    text: "In social situations, how do you usually feel?",
    options: [
      { value: "energized", label: "Energized by meeting and talking to people" },
      { value: "drained", label: "Drained and need alone time afterward" },
      { value: "selective", label: "It depends on the specific people and situation" }
    ]
  },
  {
    id: "learning_style",
    text: "What's your preferred way to learn something new?",
    options: [
      { value: "hands_on", label: "Hands-on practice and experimentation" },
      { value: "theoretical", label: "Reading about it and understanding the theory first" },
      { value: "observation", label: "Watching someone else demonstrate" }
    ]
  },
  {
    id: "problem_approach",
    text: "When facing a complex problem, you typically:",
    options: [
      { value: "creative", label: "Look for creative, outside-the-box solutions" },
      { value: "methodical", label: "Follow a systematic, step-by-step approach" },
      { value: "collaborative", label: "Discuss with others to find the best solution" }
    ]
  },
  {
    id: "feedback_preference",
    text: "What kind of feedback do you prefer to receive?",
    options: [
      { value: "direct", label: "Direct and straightforward, even if critical" },
      { value: "constructive", label: "Constructive with suggestions for improvement" },
      { value: "positive", label: "Focused on my strengths and what I did well" }
    ]
  },
  {
    id: "stress_response",
    text: "When under stress, you tend to:",
    options: [
      { value: "organize", label: "Create lists and organize to regain control" },
      { value: "retreat", label: "Step back and need time alone to process" },
      { value: "talk", label: "Talk it through with someone you trust" }
    ]
  },
  {
    id: "ideal_environment",
    text: "What type of work environment helps you perform best?",
    options: [
      { value: "structured", label: "Structured with clear expectations and deadlines" },
      { value: "flexible", label: "Flexible with room for creativity and autonomy" },
      { value: "supportive", label: "Supportive with strong team relationships" }
    ]
  },
  {
    id: "time_management",
    text: "How do you approach deadlines and time management?",
    options: [
      { value: "early", label: "I plan ahead and finish tasks early" },
      { value: "pressure", label: "I work best under pressure, close to deadlines" },
      { value: "adaptable", label: "I adapt based on the importance of the task" }
    ]
  },
  {
    id: "communication_style",
    text: "What's your preferred communication style?",
    options: [
      { value: "precise", label: "Direct and to-the-point" },
      { value: "diplomatic", label: "Diplomatic and considerate of others' feelings" },
      { value: "expressive", label: "Expressive and enthusiastic" }
    ]
  }
];

const PersonalityTest = ({ onComplete, onClose }: PersonalityTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleNext = () => {
    if (selectedOption) {
      setAnswers(prev => ({
        ...prev,
        [questions[currentQuestion].text]: selectedOption
      }));
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        handleSubmit();
      }
    }
  };
  
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedOption(answers[questions[currentQuestion - 1].text] || null);
    }
  };
  
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      toast.info("Analyzing your personality traits...");
      
      const result = await getPersonalityTest(answers);
      onComplete(result);
    } catch (error) {
      console.error("Error getting personality test results:", error);
      toast.error("Failed to analyze personality. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  return (
    <Card className="animate-fade-in">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Personality Assessment</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </div>
        <CardDescription>
          Discover careers that match your personality traits
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">{questions[currentQuestion].text}</h3>
            
            <RadioGroup 
              value={selectedOption || ""}
              onValueChange={setSelectedOption}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map(option => (
                <div 
                  key={option.value} 
                  className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedOption === option.label ? "bg-primary/10 border-primary" : ""
                  }`}
                  onClick={() => setSelectedOption(option.label)}
                >
                  <RadioGroupItem value={option.label} id={option.value} className="sr-only" />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                  {selectedOption === option.label && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentQuestion === 0}
            >
              Back
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!selectedOption || isSubmitting}
            >
              {currentQuestion < questions.length - 1 ? "Next" : (isSubmitting ? "Analyzing..." : "Complete")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalityTest;
