const axios = require('axios');

exports.generateBusinessPlan = async (req, res) => {
    try {
        // Extract user responses from request body
        const { formResponses } = req.body;

        // Validate input data
        if (!Array.isArray(formResponses) || formResponses.length === 0) {
            return res.status(400).json({ message: 'Invalid form responses' });
        }

        // Generate prompt string from form responses
        const prompt = formResponses.map((response, index) => `Question ${index + 1}: ${response}`).join('\n');

        // Make request to OpenAI API to generate business plan
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            stream: true, // Enable streaming response
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            responseType: 'stream', // Set response type to stream
        });

        // Pipe streaming response to the client
        response.data.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
