import { SendApi } from '../services/SendApi';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const useSend = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handledata = async (fileData) => {
    setLoading(true);
    try {
      const data = await SendApi(fileData);

      if (data && data.filename && data.summary) {
        navigate("/Summary", {
          state: {
            summary: data.summary,
            filename: data.filename
          }
        });
        console.log("Upload successful:", data);
      } else {
        console.log("No data returned.");
      }
    } catch (err) {
      throw new Error("Failed to Fetch the Data");
    } finally {
      setLoading(false);
    }
  };

  return { handledata, loading };
};

export default useSend;
