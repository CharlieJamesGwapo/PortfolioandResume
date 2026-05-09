export const portfolioSchema = {
  type: "object",
  properties: {
    hero: {
      type: "object",
      properties: {
        name: { type: "string" },
        title: { type: "string" },
        tagline: { type: "string" },
        location: { type: "string" },
      },
      required: ["name", "title", "tagline", "location"],
      additionalProperties: false,
    },
    about: { type: "string" },
    skills: { type: "array", items: { type: "string" } },
    experience: {
      type: "array",
      items: {
        type: "object",
        properties: {
          company: { type: "string" },
          role: { type: "string" },
          period: { type: "string" },
          description: { type: "string" },
          achievements: { type: "array", items: { type: "string" } },
        },
        required: ["company", "role", "period", "description", "achievements"],
        additionalProperties: false,
      },
    },
    projects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          tech: { type: "array", items: { type: "string" } },
        },
        required: ["name", "description", "tech"],
        additionalProperties: false,
      },
    },
    education: {
      type: "array",
      items: {
        type: "object",
        properties: {
          school: { type: "string" },
          degree: { type: "string" },
          period: { type: "string" },
        },
        required: ["school", "degree", "period"],
        additionalProperties: false,
      },
    },
    contact: {
      type: "object",
      properties: {
        email: { type: "string" },
        linkedin: { type: "string" },
        github: { type: "string" },
        website: { type: "string" },
      },
      required: ["email"],
      additionalProperties: false,
    },
  },
  required: [
    "hero",
    "about",
    "skills",
    "experience",
    "projects",
    "education",
    "contact",
  ],
  additionalProperties: false,
};
