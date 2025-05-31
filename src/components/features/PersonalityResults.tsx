
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, CheckCircle, AlertCircle, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PersonalityTestResult } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PersonalityResultsProps {
  result: PersonalityTestResult;
  onClose: () => void;
}

const PersonalityResults = ({ result, onClose }: PersonalityResultsProps) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Your Personality Profile</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="text-center p-4 bg-primary/5 rounded-lg">
            <h2 className="text-2xl font-bold text-primary">{result.type}</h2>
            <p className="mt-2 text-muted-foreground">{result.description}</p>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Your Strengths
            </h3>
            <div className="grid gap-2">
              {result.strengths.map((strength, index) => (
                <div key={index} className="bg-green-50 dark:bg-green-950/20 p-3 rounded-md">
                  {strength}
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
              Potential Challenges
            </h3>
            <div className="grid gap-2">
              {result.weaknesses.map((weakness, index) => (
                <div key={index} className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-md">
                  {weakness}
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-primary" />
              Recommended Career Paths
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.suitableCareers.map((career, index) => (
                <Badge key={index} variant="secondary" className="py-1.5 px-3 text-sm">
                  {career}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Back to Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalityResults;
