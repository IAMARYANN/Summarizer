import { SendQues } from '../services/SendQues';
import { useState } from 'react';

const useques = () => {
    const [display, setDisplay] = useState(false)
    const [loading, setLoading] = useState(false)
    const [answer, setAnswer] = useState('');
    const handleques = async (ques, file) => {
        try {
            setDisplay(false)
            setLoading(true)
            const ans = await SendQues({ question: ques, filename: file });
            if (ans && ans.answer) {
                setAnswer(ans.answer); // Store the answer in the state
                setDisplay(true)
                console.log("Response received:", ans);
            }else {
                console.log("No data returned.");
            }
        } catch (err) {
            console.error("Failed to fetch the data:", err);
            alert("Failed to fetch the data:", err)
            throw new Error("Failed to Fetch the Data");
        } finally {
            setLoading(false);
        }
    };

    return { handleques, answer, display, loading };
};

export default useques;


