import express from "express";
import * as dotenv from 'dotenv'
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from Dall.E Routes" })
});

router.route("/").post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.images.generate({
            model: 'dall-e-2',
            prompt,
            n: 1,
            size: '1024x1024',
        });

        const imageUrl = response.data[0].url;

        // Fetch image and convert to base64 (avoids CORS on client)
        const imgResp = await fetch(imageUrl);
        const arrayBuffer = await imgResp.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');

        res.status(200).json({ photo: base64 });
    } catch (error) {
        console.error("OpenAI Error:", error?.message || error);
        const message = error?.message || "Something went wrong";
        res.status(500).json({ message })
    }
})

export default router