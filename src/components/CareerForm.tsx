
import { useState, useEffect } from "react";
import { UserData, FormStep } from "@/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import WelcomeStep from "./steps/WelcomeStep";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import EducationStep from "./steps/EducationStep";
import InterestsStep from "./steps/InterestsStep";
import SkillsStep from "./steps/SkillsStep";
import PreferencesStep from "./steps/PreferencesStep";
import ResultsStep from "./steps/ResultsStep";

const STEPS: FormStep[] = [
  "welcome",
  "personal",
  "education",
  "interests",
  "skills",
  "preferences",
  "results",
];

const STEP_TITLES: Record<FormStep, string> = {
  welcome: "Welcome",
  personal: "Personal Information",
  education: "Education Background",
  interests: "Interests & Hobbies",
  skills: "Your Skills",
  preferences: "Work Preferences",
  results: "Career Recommendations",
};

const initialUserData: UserData = {
  name: "",
  age: "",
  location: "",
  education: "",
  subjects: [],
  interests: [],
  skills: {
    technical: [],
    soft: [],
  },
  preferences: {
    environment: "both",
    workStyle: "both",
    pace: "both",
  },
};

const CareerForm = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>("welcome");
  const [userData, setUserData] = useState<UserData>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("careerCompassData");
    return saved ? JSON.parse(saved) : initialUserData;
  });
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Save to localStorage whenever userData changes
    localStorage.setItem("careerCompassData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    const currentIndex = STEPS.indexOf(currentStep);
    // Calculate progress (exclude results step from calculation)
    const maxSteps = STEPS.length - 1; // Exclude results step
    const progressValue = currentIndex === maxSteps ? 100 : (currentIndex / maxSteps) * 100;
    setProgress(progressValue);
  }, [currentStep]);

  const goToNextStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    
    // Validate current step
    if (currentStep === "personal" && !userData.name) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue.",
        variant: "destructive",
      });
      return;
    }

    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const updateUserData = (updates: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setUserData(initialUserData);
    setCurrentStep("welcome");
    localStorage.removeItem("careerCompassData");
    toast({
      title: "Form reset",
      description: "You can start again with a clean slate.",
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "welcome":
        return <WelcomeStep onNext={goToNextStep} />;
      case "personal":
        return (
          <PersonalInfoStep
            userData={userData}
            updateUserData={updateUserData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case "education":
        return (
          <EducationStep
            userData={userData}
            updateUserData={updateUserData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case "interests":
        return (
          <InterestsStep
            userData={userData}
            updateUserData={updateUserData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case "skills":
        return (
          <SkillsStep
            userData={userData}
            updateUserData={updateUserData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case "preferences":
        return (
          <PreferencesStep
            userData={userData}
            updateUserData={updateUserData}
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );
      case "results":
        return (
          <ResultsStep
            userData={userData}
            onReset={resetForm}
            onBack={goToPreviousStep}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-1">
          {STEP_TITLES[currentStep]}
        </h1>
        {currentStep !== "welcome" && currentStep !== "results" && (
          <p className="text-muted-foreground">
            Step {STEPS.indexOf(currentStep)} of {STEPS.length - 2}
          </p>
        )}
      </div>

      {currentStep !== "welcome" && currentStep !== "results" && (
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>
      )}

      <div className="glass p-6 sm:p-8 rounded-2xl animate-fade-in">
        {renderCurrentStep()}
      </div>

      {currentStep !== "welcome" && currentStep !== "results" && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            onClick={resetForm}
            className="text-muted-foreground"
          >
            Reset Form
          </Button>
        </div>
      )}
    </div>
  );
};

export default CareerForm;
