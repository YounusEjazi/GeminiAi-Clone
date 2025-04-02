// chat.js

/**
 * Sends a prompt to the DeepSeek API via the local server and returns the generated response.
 * @param {string} prompt - The user input to send to the chat API.
 * @returns {Promise<string>} - The completion text from the API.
 * @throws {Error} - If the network request fails or the API response is invalid.
 */
async function runChat(prompt) {
  try {
      const response = await fetch('http://localhost:3000/api/chat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.completion) {
          throw new Error('No completion received from the API');
      }
      
      return data.completion;
  } catch (error) {
      console.error('Error in runChat:', error);
      throw error; // Re-throw the error to be handled by the caller
  }
}

export default runChat;