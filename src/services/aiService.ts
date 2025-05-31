import {
  UserData,
  Career,
  PersonalityTestResult,
  SkillGapResult,
} from "@/types";
 console.log('There is no Problem. WebSite Running successfully...')
// Interfaces for AI responses
interface AiCareerSuggestion {
  title: string;
  description: string;
  match: string;
  resources: {
    name: string;
    url: string;
    type: string;
  }[];
  opportunities?: {
    title: string;
    organization: string;
    location: string;
    url: string;
    type: string;
    deadline?: string;
  }[];
  requiredSkills?: string[];
  salaryRange?: string;
  growthProspects?: string;
  educationRequirements?: string;
}

interface AiResponse {
  careers: AiCareerSuggestion[];
}

interface AiSkillGapResponse {
  missingSkills: string[];
  learningResources: {
    name: string;
    url: string;
    type: string;
  }[];
}

// Format user data for prompt
const formatUserDataForPrompt = (userData: UserData): string => {
  return `Age: ${userData.age}
Location: ${userData.location}
Education: ${userData.education}
Subjects: ${userData.subjects.join(", ")}
Interests: ${userData.interests.join(", ")}
Technical Skills: ${userData.skills.technical.join(", ")}
Soft Skills: ${userData.skills.soft.join(", ")}
Preferences: ${userData.preferences.environment}, ${userData.preferences.workStyle}, ${userData.preferences.pace}`;
};

// Generate prompt for career suggestions
const generateAiPrompt = (userData: UserData): string => {
  const formattedUserData = formatUserDataForPrompt(userData);

  return `Suggest 3 personalized career paths for this person:
${formattedUserData}
For each career include: title, brief description, match reason, resources, opportunities, required skills, salary range, growth prospects, education requirements.
Return JSON only:
{"careers":[{"title":"","description":"","match":"","resources":[{"name":"","url":"","type":""}],"opportunities":[{"title":"","organization":"","location":"","url":"","type":"","deadline":""}],"requiredSkills":[],"salaryRange":"","growthProspects":"","educationRequirements":""}]}`;
};

// API call to OpenRouter
const callOpenRouterApi = async (prompt: string): Promise<string> => {
  const url = "https://openrouter.ai/api/v1/chat/completions";
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("API key is missing from environment variables.");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // Changed to a widely supported model
        messages: [
          { role: "system", content: "Return only valid JSON responses." },
          { role: "user", content: prompt },
        ],
        max_tokens: 1024,
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error:", errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? "";
  } catch (error) {
    console.error("Error during API request:", error);
    throw new Error("Failed to fetch AI response");
  }
};


// Extract JSON safely
const extractJsonFromResponse = (response: string): any => {
  try {
    const jsonStart = response.indexOf("{");
    const jsonEnd = response.lastIndexOf("}") + 1;
    const jsonStr = response.substring(jsonStart, jsonEnd);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Failed to parse AI response as JSON:", error);
    throw new Error("Invalid JSON format in AI response.");
  }
};

// Get AI Career Suggestions
export const getAiCareerSuggestions = async (
  userData: UserData
): Promise<
  {
    id: number;
    title: string;
    description: string;
    match: string;
    resources: {
      name: string;
      url: string;
      type: "course" | "tool" | "book" | "website";
    }[];
    opportunities?: {
      title: string;
      organization: string;
      location: string;
      url: string;
      type: "job" | "study";
      deadline?: string;
    }[];
    requiredSkills?: string[];
    salaryRange?: string;
    growthProspects?: string;
    educationRequirements?: string;
    icon: string;
    color: "blue" | "purple" | "teal" | "pink" | "orange";
  }[]
> => {
  try {
    const prompt = generateAiPrompt(userData);
    const responseText = await callOpenRouterApi(prompt);
    const parsed: AiResponse = extractJsonFromResponse(responseText);

    return parsed.careers.map((career, index) => ({
      id: 1000 + index,
      title: career.title,
      description: career.description,
      match: career.match,
      resources: career.resources.map((res) => ({
        name: res.name,
        url: res.url,
        type: res.type as "course" | "tool" | "book" | "website",
      })),
      opportunities: career.opportunities?.map((opp) => ({
        title: opp.title,
        organization: opp.organization,
        location: opp.location,
        url: opp.url,
        type: opp.type as "job" | "study",
        deadline: opp.deadline,
      })),
      requiredSkills: career.requiredSkills ?? [],
      salaryRange: career.salaryRange ?? "Not specified",
      growthProspects: career.growthProspects ?? "Not specified",
      educationRequirements: career.educationRequirements ?? "Not specified",
      icon: "Cpu",
      color: ["blue", "purple", "teal", "pink", "orange"][index % 5] as
        | "blue"
        | "purple"
        | "teal"
        | "pink"
        | "orange",
    }));
  } catch (error) {
    console.error("Error fetching AI career suggestions:", error);
    return [];
  }
};

// Skill Gap Analysis
export const getSkillGapAnalysis = async (
  userData: UserData,
  careerTitle: string
): Promise<AiSkillGapResponse> => {
  try {
    const userSkills = [
      ...userData.skills.technical,
      ...userData.skills.soft,
    ];
    const prompt = `Find skill gaps for the career: ${careerTitle}
User Skills: ${userSkills.join(", ")}
Education: ${userData.education}
Interests: ${userData.interests.join(", ")}
Return JSON only:
{"missingSkills":[],"learningResources":[{"name":"","url":"","type":""}]}`;

    const responseText = await callOpenRouterApi(prompt);
    const parsed: AiSkillGapResponse = extractJsonFromResponse(responseText);
    return parsed;
  } catch (error) {
    console.error("Error fetching skill gap analysis:", error);
    return {
      missingSkills: [],
      learningResources: [],
    };
  }
};

// --- ADD THIS FUNCTION TO FIX THE ERROR ---
/**
 * Dummy implementation for getPersonalityTest.
 * Replace this with your actual logic as needed.
 */
export const getPersonalityTest = async (
  userData: UserData
): Promise<PersonalityTestResult> => {
  // Example placeholder implementation
  return {
    personalityType: "INTJ",
    traits: ["Analytical", "Strategic", "Independent"],
    description: "You are a strategic thinker who values logic and independence."
  };
};
