import { HfInference } from "@huggingface/inference";
import { NextResponse } from 'next/server';

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;

if (!HF_TOKEN) {
  throw new Error("Hugging Face API key is missing. Please set the HUGGINGFACE_API_KEY environment variable.");
}

const inference = new HfInference(HF_TOKEN);

export async function POST(req: Request) {
  try {
    // Use current timestamp to introduce variability
    const timestamp = new Date().toISOString();
    
    // Modify the prompt slightly to introduce variability
    const prompt = `As of ${timestamp}, generate a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. For example, your output could be structured like this: What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy? or What’s a new skill you’ve learned this year?||If you could visit any place in the world, where would you go?||What’s your favorite way to relax?  and give me just three small questions`;

    const out = await inference.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200, // Increase max_tokens for more varied responses
      temperature: 1.0, // Increase temperature for more randomness
      top_p: 0.98 // Increase top_p for broader sampling
    });

    const answer = out.choices[0].message.content?.trim();

    return NextResponse.json(answer);
  } catch (error) {
    console.error("Error while suggesting messages", error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error while suggesting messages',
      },
      { status: 500 }
    );
  }
}
