
// import { GoogleGenAI } from "@google/genai";
// import { PROPERTIES } from "../constants";

// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

// export async function getAdvisorResponse(userMessage: string, chatHistory: { role: 'user' | 'model', text: string }[]) {
//   try {
//     const propertyContext = PROPERTIES.map(p => 
//       `${p.title} in ${p.location} for ${p.status === 'For Sale' ? '$' + p.price.toLocaleString() : '$' + p.price.toLocaleString() + '/mo'}. It is a ${p.type} with ${p.beds} beds and ${p.baths} baths.`
//     ).join('\n');

//     const systemInstruction = `
//       You are "Stellar", the virtual partner advisor for Stunning Realty Partners (SRP). 
//       You are professional, ambitious, and knowledgeable about both property and networking.
      
//       Our current exclusive listings are:
//       ${propertyContext}
      
//       Your goal:
//       1. Help users find premium properties based on their needs.
//       2. Explain the benefits of joining SRP as a partner (commissions, mentorship, network access).
//       3. Encourage users to visit our "Contact" page or "Services" page to learn about joining the brokerage network.
//       4. Maintain a high-class, professional tone.
//       5. Keep responses concise and formatted for a chat bubble.
//     `;

//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview",
//       contents: [
//         ...chatHistory.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
//         { role: 'user', parts: [{ text: userMessage }] }
//       ],
//       config: {
//         systemInstruction,
//         temperature: 0.7,
//         maxOutputTokens: 500
//       }
//     });

//     return response.text || "I'm sorry, I'm having trouble connecting to the SRP network. Please try again or contact our main office.";
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return "The Stellar advisor is currently offline. Please reach out to our team directly!";
//   }
// }
