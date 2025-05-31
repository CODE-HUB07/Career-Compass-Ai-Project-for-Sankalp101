
import { UserData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { predefinedOptions } from "@/utils/careerData";

interface SkillsStepProps {
  userData: UserData;
  updateUserData: (updates: Partial<UserData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const SkillsStep = ({
  userData,
  updateUserData,
  onNext,
  onBack,
}: SkillsStepProps) => {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const { technicalSkills, softSkills } = predefinedOptions;

  const addTechnicalSkill = (skill: string) => {
    if (!skill.trim()) return;
    
    if (!userData.skills.technical.includes(skill)) {
      updateUserData({
        skills: {
          ...userData.skills,
          technical: [...userData.skills.technical, skill],
        },
      });
    }
    
    setNewTechnicalSkill("");
  };

  const removeTechnicalSkill = (skill: string) => {
    updateUserData({
      skills: {
        ...userData.skills,
        technical: userData.skills.technical.filter((s) => s !== skill),
      },
    });
  };

  const addSoftSkill = (skill: string) => {
    if (!skill.trim()) return;
    
    if (!userData.skills.soft.includes(skill)) {
      updateUserData({
        skills: {
          ...userData.skills,
          soft: [...userData.skills.soft, skill],
        },
      });
    }
    
    setNewSoftSkill("");
  };

  const removeSoftSkill = (skill: string) => {
    updateUserData({
      skills: {
        ...userData.skills,
        soft: userData.skills.soft.filter((s) => s !== skill),
      },
    });
  };

  const handleTechnicalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnicalSkill(newTechnicalSkill);
    }
  };

  const handleSoftKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSoftSkill(newSoftSkill);
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-6">Your Skills</h2>
      
      <Tabs defaultValue="technical" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="technical">Technical Skills</TabsTrigger>
          <TabsTrigger value="soft">Soft Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="technical" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="technicalSkills">Add Your Technical Skills</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {userData.skills.technical.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
                  {skill}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => removeTechnicalSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                id="technicalSkills"
                placeholder="Add a technical skill"
                value={newTechnicalSkill}
                onChange={(e) => setNewTechnicalSkill(e.target.value)}
                onKeyDown={handleTechnicalKeyDown}
                className="w-full"
              />
              <Button
                type="button"
                size="icon"
                onClick={() => addTechnicalSkill(newTechnicalSkill)}
                disabled={!newTechnicalSkill.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-1">Popular technical skills:</p>
              <div className="flex flex-wrap gap-1">
                {technicalSkills.slice(0, 8).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => addTechnicalSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="soft" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="softSkills">Add Your Soft Skills</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {userData.skills.soft.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1">
                  {skill}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={() => removeSoftSkill(skill)}
                  />
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                id="softSkills"
                placeholder="Add a soft skill"
                value={newSoftSkill}
                onChange={(e) => setNewSoftSkill(e.target.value)}
                onKeyDown={handleSoftKeyDown}
                className="w-full"
              />
              <Button
                type="button"
                size="icon"
                onClick={() => addSoftSkill(newSoftSkill)}
                disabled={!newSoftSkill.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-1">Popular soft skills:</p>
              <div className="flex flex-wrap gap-1">
                {softSkills.slice(0, 8).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => addSoftSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={onNext} 
          disabled={userData.skills.technical.length === 0 && userData.skills.soft.length === 0}
        >
          Continue
        </Button>
      </div>
    </Card>
  );
};

export default SkillsStep;
