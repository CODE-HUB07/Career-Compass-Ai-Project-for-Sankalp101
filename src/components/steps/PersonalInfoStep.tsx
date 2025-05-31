
import { UserData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Mic } from "lucide-react";
import { useState } from "react";

interface PersonalInfoStepProps {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PersonalInfoStep = ({
  userData,
  updateUserData,
  onNext,
  onBack,
}: PersonalInfoStepProps) => {
  const [voiceActive, setVoiceActive] = useState<string | null>(null);

  const handleVoiceInput = (field: 'name' | 'age' | 'location') => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice input is not supported in your browser.");
      return;
    }
    
    // This is just a simulation for now - in a real app we would use the Web Speech API
    setVoiceActive(field);
    
    setTimeout(() => {
      setVoiceActive(null);
    }, 2000);
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-6">Tell us about yourself</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="name">Your Name <span className="text-red-500">*</span></Label>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => handleVoiceInput('name')}
              className="h-8 w-8 p-0 rounded-full"
            >
              <Mic className={`h-4 w-4 ${voiceActive === 'name' ? 'text-primary animate-pulse' : ''}`} />
              <span className="sr-only">Use voice input</span>
            </Button>
          </div>
          <Input
            id="name"
            placeholder="Enter your name"
            value={userData.name}
            onChange={(e) => updateUserData({ name: e.target.value })}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="age">Age (Optional)</Label>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => handleVoiceInput('age')}
              className="h-8 w-8 p-0 rounded-full"
            >
              <Mic className={`h-4 w-4 ${voiceActive === 'age' ? 'text-primary animate-pulse' : ''}`} />
              <span className="sr-only">Use voice input</span>
            </Button>
          </div>
          <Input
            id="age"
            placeholder="Enter your age"
            value={userData.age}
            onChange={(e) => updateUserData({ age: e.target.value })}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="location">Location (Optional)</Label>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => handleVoiceInput('location')}
              className="h-8 w-8 p-0 rounded-full"
            >
              <Mic className={`h-4 w-4 ${voiceActive === 'location' ? 'text-primary animate-pulse' : ''}`} />
              <span className="sr-only">Use voice input</span>
            </Button>
          </div>
          <Input
            id="location"
            placeholder="City, Country"
            value={userData.location}
            onChange={(e) => updateUserData({ location: e.target.value })}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!userData.name}>
          Continue
        </Button>
      </div>
    </Card>
  );
};

export default PersonalInfoStep;
