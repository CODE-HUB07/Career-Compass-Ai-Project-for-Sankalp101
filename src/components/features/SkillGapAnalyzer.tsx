
import React, { useState } from 'react';
import { Career, SkillGapResult, UserData } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, BookOpen, CheckCircle, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { getSkillGapAnalysis } from '@/services/aiService';
import { toast } from 'sonner';

interface SkillGapAnalyzerProps {
  userData: UserData;
  selectedCareer: Career;
  onClose: () => void;
}

const SkillGapAnalyzer = ({ userData, selectedCareer, onClose }: SkillGapAnalyzerProps) => {
  const [results, setResults] = useState<SkillGapResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const userSkills = [...userData.skills.technical, ...userData.skills.soft];
  
  const analyzeSkillGap = async () => {
    try {
      setIsLoading(true);
      const analysis = await getSkillGapAnalysis(userData, selectedCareer.title);
      setResults(analysis);
      toast.success("Skill gap analysis complete");
    } catch (error) {
      console.error("Error analyzing skill gap:", error);
      toast.error("Failed to analyze skill gap. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const calculateSkillMatch = () => {
    if (!selectedCareer.requiredSkills || !results) return 0;
    
    const requiredSkillsCount = selectedCareer.requiredSkills.length;
    const missingSkillsCount = results.missingSkills.length;
    
    const existingSkillsCount = requiredSkillsCount - missingSkillsCount;
    return Math.round((existingSkillsCount / requiredSkillsCount) * 100);
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <BarChart className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Skill Gap Analyzer</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </div>
        <CardDescription>
          Analyze your current skills against requirements for {selectedCareer.title}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {!results ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Your Current Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Required Skills for {selectedCareer.title}</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCareer.requiredSkills ? (
                  selectedCareer.requiredSkills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant={userSkills.includes(skill) ? "default" : "outline"}
                      className="py-1"
                    >
                      {skill}
                      {userSkills.includes(skill) && (
                        <CheckCircle className="ml-1 h-3 w-3" />
                      )}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No specific skills listed for this career. Click analyze to generate them.
                  </p>
                )}
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={analyzeSkillGap}
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Analyze Skill Gap"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Skill Compatibility</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Your match</span>
                  <span className="font-medium">{calculateSkillMatch()}%</span>
                </div>
                <Progress value={calculateSkillMatch()} className="h-2" />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Skills to Develop</h3>
              <div className="space-y-3">
                {results.missingSkills.map((skill, index) => (
                  <div key={index} className="rounded-lg bg-red-50 dark:bg-red-950/20 p-3 border border-red-100 dark:border-red-900/50">
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Recommended Resources
              </h3>
              <div className="grid gap-3">
                {results.learningResources.map((resource, index) => (
                  <a 
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium">{resource.name}</div>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={() => setResults(null)}
              className="w-full"
            >
              Start New Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillGapAnalyzer;
