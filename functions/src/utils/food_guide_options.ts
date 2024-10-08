import * as dotenv from 'dotenv';
import { FoodGuideOptions } from "../models/food_guide_model";
import { OpenAI } from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { renderPrompt, PROMPT_NAMES } from "../getLangFusePrompts";
import { Langfuse } from 'langfuse';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const langfuse = new Langfuse({
    secretKey: process.env.LANGFUSE_SECRET_KEY,
    publicKey: process.env.LANGFUSE_PUBLIC_KEY,
    baseUrl: "https://cloud.langfuse.com"
});

async function getFoodGuideOptions(category: string, user_request?: string) {
    const traceId = uuidv4();
    let trace: any;

    try {
        let system_message = "You are a helpful food guide assistant.";

        if (user_request) {
            system_message += `\nHere are some specific user requests you must keep in mind while generating a response:\n${user_request}`;
        }

        const prompt:string = await renderPrompt(PROMPT_NAMES.OPTIONS_PROMPT, { category, user_request: user_request || '' });

        const completion = await openai.chat.completions.create({
            model: "gpt-4-0824",
            messages: [
                { role: "system", content: system_message },
                { role: "user", content: prompt },
            ],
            response_format: zodResponseFormat(FoodGuideOptions, 'food_guide_options'),
        });

        const responseContent:string | null = completion.choices[0].message.content;

        trace = langfuse.trace({
            id: traceId,
            input: prompt,
            output: { responseContent, usage: completion.usage },
            name: 'Get Food Guide Options',
            metadata: { category, user_request }
        });
        if (!responseContent) {
            throw new Error('Response content is null or undefined');
        }
        // Assuming responseContent is structured according to FoodGuideOptions
        const parsedOptions = FoodGuideOptions.parse(JSON.parse(responseContent));
        return {
            ...parsedOptions,
            usage: completion.usage || {}
        };
    } catch (error) {
        console.error('Error in getFoodGuideOptions:', error);
        if (trace) {
            trace.generation({
                name: "error",
                input: { category, user_request },
                output: error instanceof Error ? error.message : String(error),
            });
        }
        throw error;
    }
}

export { getFoodGuideOptions };