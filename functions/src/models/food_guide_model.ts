import { z } from "zod";

// Schema for FoodGuideOption
const FoodGuideOption = z.object({
  title: z.string().describe(
    "The name of the option (e.g., 'Caloric Breakdown', 'Meal Timing and Frequency')."
  ),
  description: z.string().describe("A description of what the option provides."),
});

// Schema for FoodGuideQuestion
const BaseQuestionSchema = z.object({
  question: z.string().describe("A question."),
  rationale: z.string().describe("The rationale for the question.")
});

// Main Question object with base fields and questionBank
const FoodGuideQuestion = BaseQuestionSchema.extend({
  questionBank: z.array(
    BaseQuestionSchema.describe("A question from the question bank.")
  ).describe("A list of questions from the question bank."),
});

// Schema for FoodGuideQuestions
const FoodGuideQuestions = z.object({
  questions: z.array(FoodGuideQuestion).describe("A list of questions with descriptions."),
});

const checkQuestionGeneration = z.object({
  shouldGenerateNew: z.boolean()
});

const FoodGuideFinalOutput = z.object({
  final_guide: z.string().nullable()
});

// Schema for FoodGuideReview
const FoodGuideReview = z.object({
  guidance: z.string().nullable()
}).describe("The final output of the food guide including various nutritional details.");

// Schema for FoodGuideOptions
const FoodGuideOptions = z.object({
  options: z.array(FoodGuideOption).describe("A list of food guide options."),
});

// Exporting the schemas for use in validation or type inference
export {
  FoodGuideOption,
  FoodGuideQuestion,
  FoodGuideQuestions,
  FoodGuideFinalOutput,
  checkQuestionGeneration,
  FoodGuideReview,
  FoodGuideOptions,
};