import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { configDotenv } from "dotenv";

configDotenv();

// Create and export an Arcjet instance with security rules
export const aj = arcjet({
    // Use your Arcjet API key from environment variables for authentication
    key: process.env.ARCJET_KEY,

    // Track requests based on the source IP address
    characteristics: "ip.src",

    // Security rules applied to incoming requests
    rules: [
        // 1. Shield Rule: Basic security protection in LIVE mode
        shield({ mode: "LIVE" }),

        // 2. Bot Detection: Allow search engine bots, block all others
        detectBot({
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE"]
        }),

        // 3. Rate Limiting:
        // - Allows 5 requests per 10 seconds per IP (refillRate: 5, interval: 10)
        // - Maximum burst of 10 requests (capacity: 10)
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10
        })
    ]
});