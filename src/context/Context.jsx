import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    const delayPara = (index,nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);

        },75*index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async (prompt) => {
        setResultData(""); // Clear previous result data
        setLoading(true); // Show loading state
        setShowResult(true); // Show the result container
        let response;
        if(prompt !== undefined){
            response = await runChat(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
        
    
        // Initialize newResponse to an empty string to avoid `undefined` concatenation
        let newResponse = "";
        
        // Split response by "**" and wrap every second part with <b> tags
        let responseArray = response.split("**");
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
    
        // Replace "*" with "</br>" for line breaks
        let newResponse2 = newResponse.split("*").join("</br>");
        
        // Split the newResponse2 string into an array of words
        let newResponseArray = newResponse2.split(" ");
    
        // Display each word with a delay
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
    
        setLoading(false); // Stop loading state
        setInput(""); // Clear input
    }
    

    

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider