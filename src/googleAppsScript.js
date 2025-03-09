// Google Apps Script file for ChatBot webhook
// Deploy this script as a web app to get the URL needed for the ChatBot component

/**
 * doPost - Handles POST requests from the ChatBot
 * @param {Object} e - The event object containing the request data
 * @return {Object} JSON response with the bot's reply
 */
function doPost(e) {
  return processRequest(e);
}

/**
 * doGet - Handles GET requests (for testing the deployment and for CORS workaround)
 * @param {Object} e - The event object containing the request data
 * @return {Object} JSON response with the bot's reply or HTML for testing
 */
function doGet(e) {
  // Check if this is a payload request from the ChatBot
  if (e && e.parameter && e.parameter.payload) {
    return processRequest(e);
  }
  
  // If no payload, return HTML for testing
  return HtmlService.createHtmlOutput(
    '<h1>Austin McClain Real Estate ChatBot Webhook</h1>' +
    '<p>This webhook is active and ready to receive requests from the ChatBot.</p>'
  );
}

/**
 * processRequest - Processes both GET and POST requests
 * @param {Object} e - The event object containing the request data
 * @return {Object} JSON response with the bot's reply
 */
function processRequest(e) {
  try {
    // Parse the incoming data
    let userMessage, userId, timestamp;
    
    // Check for POST data
    if (e && e.postData && e.postData.contents) {
      const data = JSON.parse(e.postData.contents);
      userMessage = data.message || '';
      userId = data.userId || 'unknown-user';
      timestamp = data.timestamp || new Date().toISOString();
    } 
    // Check for GET data with payload parameter
    else if (e && e.parameter && e.parameter.payload) {
      const data = JSON.parse(e.parameter.payload);
      userMessage = data.message || '';
      userId = data.userId || 'unknown-user';
      timestamp = data.timestamp || new Date().toISOString();
    }
    // If no data found
    else {
      userMessage = 'No message received';
      userId = 'unknown-user';
      timestamp = new Date().toISOString();
      
      // Log the error for debugging
      console.log('Error: Request object missing data');
      console.log('Full request object:', JSON.stringify(e));
    }
    
    // Log the incoming message (optional)
    console.log(`Received message from ${userId} at ${timestamp}: ${userMessage}`);
    
    // Generate a response based on the user's message
    const botResponse = generateResponse(userMessage);
    
    // Return the response in JSON format
    return ContentService.createTextOutput(JSON.stringify({
      response: botResponse,
      userId: userId,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*'); // Allow cross-origin requests
    
  } catch (error) {
    // Handle any errors
    console.error('Error processing request:', error);
    return ContentService.createTextOutput(JSON.stringify({
      response: "I'm sorry, I encountered an error processing your request. Please try again.",
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*'); // Allow cross-origin requests
  }
}

/**
 * generateResponse - Creates an appropriate response based on user input
 * @param {string} userInput - The message from the user
 * @return {string} The bot's response
 */
function generateResponse(userInput) {
  // If userInput is undefined or null, provide a default response
  if (!userInput) {
    return "Hello! I'm Austin's virtual assistant. How can I help you with your real estate needs today?";
  }
  
  const input = userInput.toLowerCase();
  
  // Real estate specific responses
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return "Hello! How can I assist you with your real estate needs today?";
  } 
  else if (input.includes('property') || input.includes('house') || input.includes('home')) {
    return "I have several properties that might interest you. Would you like to see our listings page? I can help you filter based on your preferences.";
  } 
  else if (input.includes('price') || input.includes('cost') || input.includes('afford')) {
    return "Property prices in Austin vary by neighborhood. We have homes starting from $250,000 up to luxury properties over $1M. Would you like to use our mortgage calculator to see what you can afford based on your income and down payment?";
  } 
  else if (input.includes('location') || input.includes('area') || input.includes('neighborhood')) {
    return "Austin has many great neighborhoods like Downtown, South Congress, Westlake, and Round Rock. Each has its own character and price range. Which area are you interested in, or would you like me to recommend areas based on your lifestyle preferences?";
  } 
  else if (input.includes('contact') || input.includes('call') || input.includes('email')) {
    return "You can reach us at contact@austinmcclain.com or call (512) 555-1234. Our office hours are Monday-Friday 9am-6pm and Saturday 10am-4pm. Would you like me to schedule a consultation for you with one of our agents?";
  } 
  else if (input.includes('buy') || input.includes('purchase')) {
    return "Looking to buy a property? That's great! I can help you find the perfect home. What's your budget range and preferred location? Also, are you looking for a specific type of property like a single-family home, condo, or townhouse?";
  } 
  else if (input.includes('sell') || input.includes('selling')) {
    return "Interested in selling your property? We can help you get the best value. Our agents provide free property valuations and market analyses. Would you like to schedule a property valuation or learn more about our selling process?";
  } 
  else if (input.includes('mortgage') || input.includes('loan') || input.includes('finance')) {
    return "We work with several trusted mortgage providers who offer competitive rates. Our calculator can help you estimate monthly payments based on your down payment and interest rate. Would you like me to connect you with a mortgage specialist?";
  }
  else if (input.includes('investment') || input.includes('invest')) {
    return "Austin has a strong real estate investment market with good appreciation potential. We can help you find properties with strong rental yields or appreciation prospects. Are you looking for long-term investments or fix-and-flip opportunities?";
  }
  else if (input.includes('school') || input.includes('education')) {
    return "School districts are an important factor when buying a home. Austin has several highly-rated school districts including Eanes ISD, Lake Travis ISD, and Round Rock ISD. Would you like information about specific schools or districts?";
  }
  else if (input.includes('tax') || input.includes('property tax')) {
    return "Property taxes in Texas vary by county and city. In the Austin area, they typically range from 1.8% to 2.2% of the property's assessed value. Would you like more specific information about property taxes in certain areas?";
  }
  else if (input.includes('closing cost') || input.includes('fees')) {
    return "Closing costs in Texas typically range from 2-5% of the home's purchase price. These include lender fees, title insurance, appraisal fees, and more. As your agent, we can help negotiate some of these costs with the seller.";
  }
  else if (input.includes('down payment') || input.includes('deposit')) {
    return "Traditional mortgages typically require a 20% down payment, but there are many programs available for first-time homebuyers that allow for as little as 3.5% down. Would you like information about down payment assistance programs?";
  }
  else if (input.includes('listing') || input.includes('listings')) {
    return "You can browse all our current listings on our website. We update our inventory daily. Would you like me to show you properties that match specific criteria like price range, number of bedrooms, or location?";
  }
  else if (input.includes('agent') || input.includes('realtor')) {
    return "Our team of experienced agents specializes in different areas of Austin and different property types. We'd be happy to match you with an agent who best fits your needs. What type of property are you interested in?";
  }
  else if (input.includes('thank')) {
    return "You're welcome! I'm here to help with any real estate questions you have. Is there anything else you'd like to know about properties in Austin?";
  }
  else {
    return "Thank you for your message. I'd be happy to help with your real estate needs. Could you provide more details about what you're looking for, such as location preferences, budget, or property type?";
  }
}
