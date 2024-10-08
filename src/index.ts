interface FoodGuideOption {
    // Define the structure of your food guide option here
    // For example:
    heading: string;
    description: string;
  }
   
  async function main(): Promise<void> {
    const category = "I want to gain bulk what foods are good."; // User's initial request  
    const user_request = "Please do not use the letter 'r' in any of your output responses.";
  
    const url = `http://127.0.0.1:5001/lexriapp/us-central1/getFoodGuideOptionsData`; 
    let data: FoodGuideOption[];
  
    try {
      // Fetch food guide options
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, user_request }), // Using object shorthand
      });
  
      // Check if the response is ok (status code in the range 200-299)
      if (!response.ok) {
        const errorData: { error: string } = await response.json();
        throw new Error(`Error: ${errorData.error}`);
      }
        
      data = await response.json();
      console.log('Food Guide Options:', data);
  
    } catch (error) {
      console.error('Failed to fetch food guide options:', (error as Error).message);
      return; // Exit if the first fetch fails
    }
  }
  
  // Run the main function
  main().catch(error => console.error('Unhandled error in main:', error));