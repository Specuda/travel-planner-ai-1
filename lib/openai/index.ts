import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

const callOpenAIApi = (prompt: string, schema: any, description: string) => {
  return openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    messages: [
      { role: "system", content: "You are a helpful travel assistant." },
      { role: "user", content: prompt },
    ],
    functions: [{ name: "set_travel_details", parameters: schema, description }],
    function_call: { name: "set_travel_details" },
  });
};

export { callOpenAIApi };