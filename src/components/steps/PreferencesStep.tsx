
import { UserData } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PreferencesStepProps {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PreferencesStep = ({
  userData,
  updateUserData,
  onNext,
  onBack,
}: PreferencesStepProps) => {
  const updatePreference = (key: keyof UserData["preferences"], value: any) => {
    updateUserData({
      preferences: {
        ...userData.preferences,
        [key]: value,
      },
    });
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-6">Work Preferences</h2>
      <p className="text-muted-foreground mb-6">
        Tell us about your ideal work environment to help us find the best career matches.
      </p>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="font-medium">Work Environment</h3>
          <RadioGroup
            value={userData.preferences.environment}
            onValueChange={(value) => 
              updatePreference("environment", value as UserData["preferences"]["environment"])
            }
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="indoor" id="indoor" />
              <Label htmlFor="indoor" className="cursor-pointer">Indoor work (office, studio, etc.)</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="outdoor" id="outdoor" />
              <Label htmlFor="outdoor" className="cursor-pointer">Outdoor work (fieldwork, construction, etc.)</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="both" id="env-both" />
              <Label htmlFor="env-both" className="cursor-pointer">Mix of both or no strong preference</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Work Style</h3>
          <RadioGroup
            value={userData.preferences.workStyle}
            onValueChange={(value) => 
              updatePreference("workStyle", value as UserData["preferences"]["workStyle"])
            }
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="solo" id="solo" />
              <Label htmlFor="solo" className="cursor-pointer">Mostly independent work</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="team" id="team" />
              <Label htmlFor="team" className="cursor-pointer">Mostly team-based collaboration</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="both" id="work-both" />
              <Label htmlFor="work-both" className="cursor-pointer">Mix of both or no strong preference</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Work Pace</h3>
          <RadioGroup
            value={userData.preferences.pace}
            onValueChange={(value) => 
              updatePreference("pace", value as UserData["preferences"]["pace"])
            }
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="fast" id="fast" />
              <Label htmlFor="fast" className="cursor-pointer">Fast-paced, dynamic environment</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="steady" id="steady" />
              <Label htmlFor="steady" className="cursor-pointer">Steady, consistent rhythm</Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="both" id="pace-both" />
              <Label htmlFor="pace-both" className="cursor-pointer">Mix of both or no strong preference</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          See Results
        </Button>
      </div>
    </Card>
  );
};

export default PreferencesStep;
