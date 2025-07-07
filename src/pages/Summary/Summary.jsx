import "./Summary.css";
import { useLocation } from "react-router-dom";
import useques from "../../hooks/useques";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

const Summary = () => {
  const location = useLocation();
  const summary = location.state?.summary;
  const filename = location.state?.filename;

  const [question, setQuestion] = useState("");
  const { handleques, answer, display, loading } = useques();

  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(question)
    console.log(filename)
    if (question && filename) {
      handleques(question, filename);
    } else {
      console.warn("Missing question or filename.");
    }
  };

  return (
    <>
      <div className="summary-container">
        <div className="summary-box">
          <h2 className="summary-title">Summary</h2>
          <p className="summary-text">{summary || "No summary available."}</p>
        </div>
      </div>
      {/* Q&A Input Box */}
      <div className="qa-box">
        <h3 className="qa-title"> Ask a Question </h3>
      </div>
      <div className="qa-input-1">
        <form onSubmit={handleSubmit} className="qa-input">
          <input
            type="text"
            className="qa-input-input"
            placeholder="Type your question here..."
            value={question}
            onChange={handleChange}
          />
        </form>
        <button className="submitbutton" onClick={handleSubmit}>
          Ask
        </button>
      </div>
      {loading && (<div className="Bar"><ScaleLoader color="#3d99bb" /></div>)}
      {display && (<div className="ansbox">
        <div className="anscontent">
          <h2 className="summary-title">Answer</h2>
          <p className="summary-text">{answer || "No answer available."}</p>
        </div>
      </div>)}
    </>
  );
};

export default Summary;