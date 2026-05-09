import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { portfolioSchema } from "@/lib/schema";
import type { FormInput, GeneratedContent } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are an expert resume writer and personal branding coach. Given raw user input, you produce polished, professional, results-oriented portfolio and resume content.

Rules:
- Use action verbs and quantify achievements where possible (even reasonable estimates if specifics are missing).
- Keep tone confident but not arrogant; concise, not flowery.
- Tailor content to the user's stated career goal.
- If background is sparse, still produce a complete, useful starting draft the user can edit.
- The "about" section should be 2-3 short paragraphs (under 120 words total).
- Each experience "description" should be 1-2 sentences. Each "achievements" array should have 2-4 bullets, each starting with a strong action verb.
- Skills: 8-15 relevant skills.
- Projects: 2-4 projects. Make them plausible based on the user's role and background.
- Education: 1-2 entries.
- For taglines, write something memorable in under 12 words.`;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Server is missing ANTHROPIC_API_KEY." },
      { status: 500 }
    );
  }

  let input: FormInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!input?.name || !input?.role) {
    return NextResponse.json(
      { error: "name and role are required." },
      { status: 400 }
    );
  }

  const client = new Anthropic();

  const userPrompt = `Generate complete portfolio and resume content for this person.

Name: ${input.name}
Email: ${input.email || "not provided"}
Target role / current role: ${input.role}
Years of experience: ${input.yearsExperience || "not provided"}
Location: ${input.location || "not provided"}
Career goal: ${input.goal || "advance in current role"}

Background (raw, may be unstructured):
${input.rawBackground || "(no background provided — generate a realistic but generic profile for someone in this role)"}

Produce the JSON content. Use the user's actual name and email exactly as provided.`;

  try {
    const response = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      output_config: {
        format: {
          type: "json_schema",
          schema: portfolioSchema,
        },
      },
      messages: [{ role: "user", content: userPrompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "Model returned no text content." },
        { status: 502 }
      );
    }

    const data = JSON.parse(textBlock.text) as GeneratedContent;
    return NextResponse.json({ data });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `Claude API error: ${err.message}` },
        { status: err.status ?? 500 }
      );
    }
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error." },
      { status: 500 }
    );
  }
}
