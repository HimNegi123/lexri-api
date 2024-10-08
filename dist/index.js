"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const category = "I want to gain bulk what foods are good."; // User's initial request  
        const user_request = "Please do not use the letter 'r' in any of your output responses.";
        const url = `http://127.0.0.1:5001/lexriapp/us-central1/getFoodGuideOptionsData`;
        let data;
        try {
            // Fetch food guide options
            const response = yield fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, user_request }), // Using object shorthand
            });
            // Check if the response is ok (status code in the range 200-299)
            if (!response.ok) {
                const errorData = yield response.json();
                throw new Error(`Error: ${errorData.error}`);
            }
            data = yield response.json();
            console.log('Food Guide Options:', data);
        }
        catch (error) {
            console.error('Failed to fetch food guide options:', error.message);
            return; // Exit if the first fetch fails
        }
    });
}
// Run the main function
main().catch(error => console.error('Unhandled error in main:', error));
