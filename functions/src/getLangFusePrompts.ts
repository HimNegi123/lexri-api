import { Langfuse } from 'langfuse';
import * as dotenv from 'dotenv';

dotenv.config();

const langfuse = new Langfuse({
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  baseUrl: "https://cloud.langfuse.com"
});

async function renderPrompt(promptName: string, variables: Record<string, string>): Promise<string> {
  try {
    const prompt = await langfuse.getPrompt(promptName, undefined, { label: "latest" });
    if (!prompt) {
      throw new Error(`Prompt not found: ${promptName}`);
    }
    let renderedPrompt = prompt.prompt;
    for (const [key, value] of Object.entries(variables)) {
      renderedPrompt = renderedPrompt.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return renderedPrompt;
  } catch (error) {
    console.error(`Error rendering prompt ${promptName}:`, error);
    throw error;
  }
}

const PROMPT_NAMES = {
  OPTIONS_PROMPT: 'FoodGuideOptions',
} as const;

export { renderPrompt, PROMPT_NAMES };