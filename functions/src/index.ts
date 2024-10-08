import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { getFoodGuideOptions } from "./utils/food_guide_options";
import { Request,Response } from 'firebase-functions';

initializeApp();

export const getFoodGuideOptionsData = onRequest(async (req: Request, res: Response) => {
  // Ensure the request is a POST request
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed. Only POST is accepted." });
    return; // Return here to exit the function
  }

  const { category, user_request } = req.body;

  // Validate category
  if (!category || typeof category !== "string" || category.trim() === "") {
    res.status(400).json({ error: "category is required and must be a non-empty string" });
    return; // Return here to exit the function
  }

  // Validate user_request
  if (!user_request || typeof user_request !== "string" || user_request.trim() === "") {
    res.status(400).json({ error: "user_request is required and must be a non-empty string" });
    return; // Return here to exit the function
  }

  try {
    // Call the getFoodGuideOptions function with the validated inputs
    const data = await getFoodGuideOptions(category, user_request);

    console.log("Data received from getFoodGuideOptions:", data);

    // Check if data is valid
    if (!data) {
      res.status(500).json({ error: "No data returned from OpenAI" });
      return; // Return here to exit the function
    }

    // Simplify response handling
    const responseData = typeof data === 'object' && data !== null ? data : JSON.parse(data as string);
    res.status(200).json(responseData);
    return; // Return here to exit the function
  } catch (error) {
    console.error("Error getting food guide options:", error);

    // Handle potential JSON parsing errors
    if (error instanceof SyntaxError) {
      res.status(500).json({
        error: "Invalid JSON returned from OpenAI",
        details: error.message,
      });
      return; // Return here to exit the function
    }

    // Return a more generic error message for other cases
    res.status(500).json({
      error: "Internal Server Error",
      details: (error as Error).message,
    });
    return; // Return here to exit the function
  }
});
