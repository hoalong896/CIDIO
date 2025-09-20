import { client } from "@/lib/openai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return Response.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return Response.json({ reply: "Lỗi khi gọi OpenAI!" }, { status: 500 });
  }
}
