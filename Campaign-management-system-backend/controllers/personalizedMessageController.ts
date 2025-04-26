import { Request, Response, NextFunction } from 'express';
import axios from 'axios';


export const generatePersonalizedMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: true, message: 'Request body is required.' });
        }
        const { name, job_title, company, summary } = req.body;

        if (!name || !job_title || !company || !summary) {
            return res.status(400).json({ error: 'All fields (name, job_title, company, summary) are required.' });
        }

        const prompt = `You are an expert LinkedIn outreach assistant.
        Create a short, friendly, and professional LinkedIn connection message based on:
        - Full Name: ${name}
        - Job Title: ${job_title}
        - Company: ${company}
        - Summary: ${summary}
        
        Keep it concise, natural, and personalized. Avoid sounding robotic or too generic.`;


        try {
            const response = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    "model": "deepseek/deepseek-r1-zero:free",
                    "messages": [{ role: "user", content: prompt }],
                },
                {
                    headers: {
                        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );

    
            const data = response.data;
            let message = data.choices?.[0]?.message?.content || "Failed to generate a message.";

            message = message
                .replace(/\\boxed\{/, '')
                .replace(/\}$/, '')
                .replace(/^```text\s*/, '')
                .replace(/```$/, '')
                .trim();

            return res.status(200).json({ message });
        } catch (error) {
            console.error("Error generating LinkedIn message:", error);
            return res.status(500).json({ error: "Error generating message. Please try again later." });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};
