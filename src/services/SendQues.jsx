// SendQues.js
import axios from 'axios';

export const SendQues = async ({ question, filename }) => {
    if (!question || !filename) {
        throw new Error("Question and filename are required.");
    }

    try {
        const response = await axios.post(
            'http://localhost:5000/Summary',
            { question, filename },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (err) {
        console.error("Connection Failed:", err.response?.data || err.message);
        throw new Error("Connection Failed");
    }
};

