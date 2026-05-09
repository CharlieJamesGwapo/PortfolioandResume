export type GeneratedContent = {
  hero: {
    name: string;
    title: string;
    tagline: string;
    location: string;
  };
  about: string;
  skills: string[];
  experience: Array<{
    company: string;
    role: string;
    period: string;
    description: string;
    achievements: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    tech: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    period: string;
  }>;
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
};

export type FormInput = {
  name: string;
  email: string;
  role: string;
  yearsExperience: string;
  location: string;
  rawBackground: string;
  goal: string;
};
