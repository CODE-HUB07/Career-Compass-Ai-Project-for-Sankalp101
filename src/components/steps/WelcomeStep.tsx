
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase } from "lucide-react";

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  return (
    <div className="text-center py-8 animate-fade-in">
      <div className="mb-6 flex justify-center">
        <div className="rounded-full bg-primary/10 p-4 w-20 h-20 flex items-center justify-center">
          <GraduationCap className="w-10 h-10 text-primary" />
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4">Welcome to CareerCompass AI</h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto text-muted-foreground">
        Find your perfect career match with our AI-powered recommendation tool.
        Answer a few simple questions and discover career paths that align with
        your skills, interests, and goals.
      </p>

      <div className="flex items-center justify-center gap-6 mb-6">
        <div className="flex items-center p-3 bg-muted/50 rounded-lg">
          <Briefcase className="h-5 w-5 text-primary mr-2" />
          <span className="text-sm font-medium">Job Opportunities</span>
        </div>
        <div className="flex items-center p-3 bg-muted/50 rounded-lg">
          <GraduationCap className="h-5 w-5 text-primary mr-2" />
          <span className="text-sm font-medium">Study Programs</span>
        </div>
      </div>
      
      <p className="text-sm mb-8 text-muted-foreground">
        Your answers will be stored only in your browser and not sent to any
        server.
      </p>
      <Button onClick={onNext} size="lg" className="animate-bounce-in">
        Start Your Journey
      </Button>
    </div>
  );
};

export default WelcomeStep;
