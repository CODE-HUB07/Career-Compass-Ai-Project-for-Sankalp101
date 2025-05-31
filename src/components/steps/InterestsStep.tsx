
import { UserData } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";
import { predefinedOptions } from "@/utils/careerData";

interface InterestsStepProps {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const InterestsStep = ({
  userData,
  updateUserData,
  onNext,
  onBack,
}: InterestsStepProps) => {
  const { interests } = predefinedOptions;

  const toggleInterest = (interest: string) => {
    if (userData.interests.includes(interest)) {
      updateUserData({
        interests: userData.interests.filter((i) => i !== interest),
      });
    } else {
      updateUserData({
        interests: [...userData.interests, interest],
      });
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-6">Your Interests & Hobbies</h2>
      <p className="text-muted-foreground mb-6">
        Select all the areas that interest you. These will help us recommend careers that align with your passions.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {interests.map((interest) => {
          const isSelected = userData.interests.includes(interest);
          return (
            <div 
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                isSelected 
                  ? "bg-primary/10 border-primary" 
                  : "hover:bg-muted"
              }`}
            >
              {isSelected ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground" />
              )}
              <span>{interest}</span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={userData.interests.length === 0}
        >
          Continue
        </Button>
      </div>
    </Card>
  );
};

export default InterestsStep;
