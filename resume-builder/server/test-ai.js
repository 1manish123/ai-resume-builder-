import "dotenv/config";

async function testFetch() {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: process.env.OPENAI_MODEL,
            messages: [{ role: "user", content: "Hi" }]
        })
    });
    
    console.log("Status:", response.status);
    console.log("Body:", await response.text());
}

testFetch();
