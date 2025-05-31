
import { UserData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Plus, X } from "lucide-react";
import { useState } from "react";
import { predefinedOptions } from "@/utils/careerData";

interface EducationStepProps {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const EducationStep = ({
  userData,
  updateUserData,
  onNext,
  onBack,
}: EducationStepProps) => {
  const [newSubject, setNewSubject] = useState("");
  const { subjects } = predefinedOptions;

  const addSubject = (subject: string) => {
    if (!subject.trim()) return;
    
    if (!userData.subjects.includes(subject)) {
      updateUserData({
        subjects: [...userData.subjects, subject],
      });
    }
    
    setNewSubject("");
  };

  const removeSubject = (subject: string) => {
    updateUserData({
      subjects: userData.subjects.filter((s) => s !== subject),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSubject(newSubject);
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-6">Education Background</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="education">Highest Level of Education</Label>
          <select
            id="education"
            value={userData.education}
            onChange={(e) => updateUserData({ education: e.target.value })}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select education level</option>
            <option value="high-school">High School</option>
            <option value="associate">Associate Degree</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">PhD or Doctorate</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subjects">Favorite Subjects</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {userData.subjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="px-3 py-1">
                {subject}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => removeSubject(subject)}
                />
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              id="subjects"
              placeholder="Add a subject"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full"
            />
            <Button
              type="button"
              size="icon"
              onClick={() => addSubject(newSubject)}
              disabled={!newSubject.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-1">Popular subjects:</p>
            <div className="flex flex-wrap gap-1">
              {subjects.slice(0, 8).map((subject) => (
                <Badge
                  key={subject}
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => addSubject(subject)}
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue
        </Button>
      </div>
    </Card>
  );
};

export default EducationStep;
