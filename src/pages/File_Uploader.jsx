import Navbar from "../components/Navbar/Navbar.jsx"
import "./File_Uploader.css"
import { LuCopyPlus } from "react-icons/lu";
import { FaFile } from "react-icons/fa";
import { useRef, useState } from "react";
import useSend from "../hooks/useSend.jsx"
import { ScaleLoader } from "react-spinners";


export default function File_Uploader() {
    const inputRef = useRef();
    const [submitted, setSubmitted] = useState(false);
    const [data, setData] = useState("")
    const {handledata,loading} =useSend();
    const handleContainerClick = () => {
        inputRef.current.click();
    }

    const handleChange = (e) => {
        const file = e.target.files[0];
        console.log("File selected:", file);
        setData("File")
        handledata(file);
    }

    return (
        <>
            <Navbar></Navbar>
            <p className="top_content">Doc Summarizer</p>
            <p className="top_content-1">Summarize Any PDF or Document </p>
            <div className="container">
                <div className="file" onClick={handleContainerClick}>
                    <input type="file" ref={inputRef} style={{ display: "none" }} accept=".pdf,.docx" onChange={(e) => {
                        setSubmitted(true); handleChange(e)
                    }} />

                    {submitted ? (<>
                        <FaFile className="filelogo" />
                        <div className="add">{data}</div>
                    </>) : (
                        <>
                            <LuCopyPlus className="filelogo" />
                            <div className="add">Add a file</div>
                        </>
                    )}
                </div>
            </div>
            {loading && (
        <div className="barloader">
            <ScaleLoader color="#3d99bb"/>
        </div>
    )}
        </>

    );
}