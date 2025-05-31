
import React, { useEffect, useState, useRef } from 'react';
import { UserData, Career, PersonalityTestResult } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, BookOpen, Briefcase, Share2, 
  RotateCcw, GraduationCap, MapPin, Cpu, Brain
} from "lucide-react";
import { icons } from "lucide-react";
import { toast } from "sonner";
import { getAiCareerSuggestions } from '@/services/aiService';
import SkillGapAnalyzer from '@/components/features/SkillGapAnalyzer';
import CareerComparison from '@/components/features/CareerComparison';
import PersonalityTest from '@/components/features/PersonalityTest';
import PersonalityResults from '@/components/features/PersonalityResults';

interface ResultsStepProps {
  userData: UserData;
  onReset: () => void;
  onBack: () => void;
}

type ActiveFeature = 'none' | 'skillGap' | 'comparison' | 'personality';

const ResultsStep = ({ userData, onReset, onBack }: ResultsStepProps) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [activeFeature, setActiveFeature] = useState<ActiveFeature>('none');
  const [selectedCareerForSkillGap, setSelectedCareerForSkillGap] = useState<Career | null>(null);
  const [selectedCareersForComparison, setSelectedCareersForComparison] = useState<Career[]>([]);
  const [personalityResult, setPersonalityResult] = useState<PersonalityTestResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setIsLoading(true);
        const suggestions = await getAiCareerSuggestions(userData);
        setCareers(suggestions);
        toast.success("AI career recommendations generated!");
      } catch (error) {
        console.error("Error fetching career suggestions:", error);
        toast.error("Error generating recommendations. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, [userData]);

  const handleShare = () => {
    const shareId = Math.random().toString(36).substring(2, 8);
    const url = `${window.location.origin}?share=${shareId}`;
    setShareUrl(url);
    
    navigator.clipboard.writeText(url);
  };

  const handleSkillGapAnalysis = (career: Career) => {
    setSelectedCareerForSkillGap(career);
    setActiveFeature('skillGap');
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleCareerForComparison = (career: Career) => {
    setSelectedCareersForComparison(prevSelected => {
      const isAlreadySelected = prevSelected.some(c => c.id === career.id);
      
      if (isAlreadySelected) {
        return prevSelected.filter(c => c.id !== career.id);
      } else {
        if (prevSelected.length >= 3) {
          toast.info("You can compare up to 3 careers at a time");
          return prevSelected;
        }
        return [...prevSelected, career];
      }
    });
  };

  const startComparison = () => {
    if (selectedCareersForComparison.length < 2) {
      toast.error("Please select at least 2 careers to compare");
      return;
    }
    
    setActiveFeature('comparison');
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startPersonalityTest = () => {
    setActiveFeature('personality');
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePersonalityTestComplete = (result: PersonalityTestResult) => {
    setPersonalityResult(result);
  };

  const DynamicIcon = ({ name }: { name: string }) => {
    const LucideIcon = icons[name as keyof typeof icons] || icons.Briefcase;
    return <LucideIcon className="h-6 w-6" />;
  };

  if (isLoading) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-primary/10 p-4 w-20 h-20 flex items-center justify-center">
            <BarChart className="w-10 h-10 text-primary animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">
          Generating AI recommendations...
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto text-muted-foreground">
          Our AI is creating personalized career suggestions based on your profile.
        </p>
        
        <div className="w-64 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
          <div className="bg-primary h-full animate-[pulse_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    );
  }

  return (
    <div ref={resultsRef} className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Your AI Career Recommendations</h2>
        <p className="text-muted-foreground mt-2">
          Based on your profile, here are AI-generated career suggestions that might be a great fit for you.
        </p>
        <Badge variant="secondary" className="mt-2">
          <Cpu className="h-3 w-3 mr-1" /> AI-Enhanced
        </Badge>
      </div>
      
      {/* Feature Tools */}
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={startPersonalityTest}
        >
          <Brain className="h-4 w-4" />
          Personality Test
        </Button>
        <Button 
          variant="outline" 
          className="gap-2" 
          onClick={startComparison}
          disabled={selectedCareersForComparison.length < 2}
        >
          <BarChart className="h-4 w-4" />
          Compare Careers ({selectedCareersForComparison.length})
        </Button>
      </div>

      {/* Active Feature Display */}
      {activeFeature !== 'none' && (
        <div className="mb-8">
          {activeFeature === 'skillGap' && selectedCareerForSkillGap && (
            <SkillGapAnalyzer 
              userData={userData} 
              selectedCareer={selectedCareerForSkillGap} 
              onClose={() => setActiveFeature('none')}
            />
          )}
          
          {activeFeature === 'comparison' && (
            <CareerComparison 
              careers={selectedCareersForComparison}
              onClose={() => setActiveFeature('none')}
            />
          )}
          
          {activeFeature === 'personality' && !personalityResult && (
            <PersonalityTest 
              onComplete={handlePersonalityTestComplete} 
              onClose={() => setActiveFeature('none')}
            />
          )}
          
          {activeFeature === 'personality' && personalityResult && (
            <PersonalityResults 
              result={personalityResult} 
              onClose={() => setActiveFeature('none')}
            />
          )}
        </div>
      )}

      <div className="space-y-6 mb-8">
        {careers.map((career, index) => (
          <div 
            key={career.id} 
            className={`animate-slide-up relative`} 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="absolute top-2 right-2 z-10">
              <Badge 
                variant={selectedCareersForComparison.some(c => c.id === career.id) ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => toggleCareerForComparison(career)}
              >
                {selectedCareersForComparison.some(c => c.id === career.id) ? "Selected" : "Compare"}
              </Badge>
            </div>
            
            <Card className="overflow-hidden">
              <div className={`h-2 w-full career-gradient-${career.color}`}></div>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={`p-2 rounded-full bg-career-${career.color}/10 text-career-${career.color}`}>
                  <DynamicIcon name={career.icon} />
                </div>
                <CardTitle>{career.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{career.description}</p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Why it's a match</h4>
                  <p className="text-sm">{career.match}</p>
                </div>
                
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full mb-4"
                  onClick={() => handleSkillGapAnalysis(career)}
                >
                  Analyze Skill Gap for This Career
                </Button>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="resources">
                    <AccordionTrigger className="text-sm font-medium">
                      Learning Resources
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {career.resources.map((resource, i) => (
                          <li key={`${resource.name}-${i}`} className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <a 
                              href={resource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              {resource.name}
                            </a>
                            <span className="text-xs text-muted-foreground">({resource.type})</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {career.opportunities && career.opportunities.length > 0 && (
                    <AccordionItem value="opportunities">
                      <AccordionTrigger className="text-sm font-medium">
                        Job & Study Opportunities
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          {/* Job opportunities */}
                          {career.opportunities.filter(o => o.type === 'job').length > 0 && (
                            <div>
                              <h5 className="font-medium text-sm mb-2 flex items-center">
                                <Briefcase className="h-4 w-4 mr-1 text-primary" /> 
                                Job Openings
                              </h5>
                              <ul className="space-y-3">
                                {career.opportunities
                                  .filter(o => o.type === 'job')
                                  .map((opportunity, i) => (
                                    <li key={i} className="bg-muted/30 p-3 rounded-md">
                                      <div className="font-medium text-sm">
                                        {opportunity.title}
                                      </div>
                                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                                        <span>{opportunity.organization}</span>
                                        <span className="mx-2">•</span>
                                        <span className="flex items-center">
                                          <MapPin className="h-3 w-3 mr-1" /> {opportunity.location}
                                        </span>
                                      </div>
                                      {opportunity.deadline && (
                                        <div className="mt-1 text-xs">
                                          <Badge variant="outline" className="text-xs">
                                            Deadline: {opportunity.deadline}
                                          </Badge>
                                        </div>
                                      )}
                                      <div className="mt-2">
                                        <a 
                                          href={opportunity.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-xs text-primary hover:underline"
                                        >
                                          View Details →
                                        </a>
                                      </div>
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                          )}
                          
                          {/* Study opportunities */}
                          {career.opportunities.filter(o => o.type === 'study').length > 0 && (
                            <div>
                              <h5 className="font-medium text-sm mb-2 flex items-center">
                                <GraduationCap className="h-4 w-4 mr-1 text-primary" /> 
                                Study Programs
                              </h5>
                              <ul className="space-y-3">
                                {career.opportunities
                                  .filter(o => o.type === 'study')
                                  .map((opportunity, i) => (
                                    <li key={i} className="bg-muted/30 p-3 rounded-md">
                                      <div className="font-medium text-sm">
                                        {opportunity.title}
                                      </div>
                                      <div className="text-xs text-muted-foreground flex items-center mt-1">
                                        <span>{opportunity.organization}</span>
                                        <span className="mx-2">•</span>
                                        <span className="flex items-center">
                                          <MapPin className="h-3 w-3 mr-1" /> {opportunity.location}
                                        </span>
                                      </div>
                                      {opportunity.deadline && (
                                        <div className="mt-1 text-xs">
                                          <Badge variant="outline" className="text-xs">
                                            Applications close: {opportunity.deadline}
                                          </Badge>
                                        </div>
                                      )}
                                      <div className="mt-2">
                                        <a 
                                          href={opportunity.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-xs text-primary hover:underline"
                                        >
                                          Learn More →
                                        </a>
                                      </div>
                                    </li>
                                  ))
                                }
                              </ul>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack} className="flex-1 sm:flex-initial">
            <RotateCcw className="h-4 w-4 mr-2" /> Back
          </Button>
          <Button variant="outline" onClick={onReset} className="flex-1 sm:flex-initial">
            Start Over
          </Button>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleShare} variant="secondary" className="flex-1 sm:flex-initial">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>
      </div>

      {shareUrl && (
        <div className="mt-4 p-3 bg-muted rounded-lg flex items-center">
          <input 
            type="text" 
            value={shareUrl} 
            readOnly 
            className="bg-transparent flex-1 text-sm border-none focus:outline-none focus:ring-0"
          />
          <span className="text-xs text-green-600 font-medium">Copied to clipboard!</span>
        </div>
      )}
    </div>
  );
};

export default ResultsStep;
