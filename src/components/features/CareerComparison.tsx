
import React from 'react';
import { Career } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, BookOpen, BarChart, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface CareerComparisonProps {
  careers: Career[];
  onClose: () => void;
}

const CareerComparison = ({ careers, onClose }: CareerComparisonProps) => {
  if (careers.length < 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Career Comparison</CardTitle>
          <CardDescription>
            Please select at least two careers to compare.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onClose}>Back</Button>
        </CardContent>
      </Card>
    );
  }

  // Define what aspects we want to compare
  const comparisonAspects = [
    {
      name: "Required Skills",
      icon: <Code className="h-5 w-5" />,
      getValue: (career: Career) => career.requiredSkills || []
    },
    {
      name: "Salary Range",
      icon: <BarChart className="h-5 w-5" />,
      getValue: (career: Career) => career.salaryRange || "Not specified"
    },
    {
      name: "Growth Prospects",
      icon: <ArrowRight className="h-5 w-5" />,
      getValue: (career: Career) => career.growthProspects || "Not specified"
    },
    {
      name: "Education Requirements",
      icon: <BookOpen className="h-5 w-5" />,
      getValue: (career: Career) => career.educationRequirements || "Not specified"
    }
  ];

  return (
    <Card className="animate-fade-in">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Career Comparison</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>Close</Button>
        </div>
        <CardDescription>
          Compare different aspects of your selected career paths
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-8">
          {/* Career titles */}
          <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: `0.8fr repeat(${careers.length}, 1fr)` }}>
            <div></div>
            {careers.map(career => (
              <div key={career.id} className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full bg-career-${career.color}/10 text-career-${career.color} mb-2`}>
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="font-bold">{career.title}</h3>
              </div>
            ))}
          </div>
          
          <Separator />
          
          {/* Comparison sections */}
          {comparisonAspects.map((aspect, aspectIndex) => (
            <div key={aspectIndex}>
              <div className="grid grid-cols-1 gap-4 items-start" style={{ gridTemplateColumns: `0.8fr repeat(${careers.length}, 1fr)` }}>
                <div className="flex items-center gap-2 font-medium">
                  {aspect.icon}
                  <span>{aspect.name}</span>
                </div>
                
                {careers.map(career => {
                  const value = aspect.getValue(career);
                  
                  if (Array.isArray(value)) {
                    // For skills arrays
                    return (
                      <div key={career.id} className="min-h-24 flex flex-wrap gap-1 justify-center">
                        {value.length > 0 ? 
                          value.map((item, i) => (
                            <Badge key={i} variant="outline" className="mb-1">
                              {item}
                            </Badge>
                          )) : 
                          <span className="text-sm text-muted-foreground">Not specified</span>
                        }
                      </div>
                    );
                  } else {
                    // For text fields
                    return (
                      <div key={career.id} className="text-sm text-center">
                        {value}
                      </div>
                    );
                  }
                })}
              </div>
              
              {aspectIndex < comparisonAspects.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerComparison;
