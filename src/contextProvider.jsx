import React, { createContext, useEffect, useState } from "react";

export const Mycontext = createContext();


export const MyProvider = ({ children }) => {
    const [arraySize,setArraySize]=useState(20);
    const [triggerStop,setTriggerStop]=useState(null);
    const [insertionArr, setInsertionArr] = useState([]);
    const [mergeArr, setMergeArr] = useState([]);
    const [selectArr,setSelectArr]=useState([]);
    const [bubbleArr,setBubbleArr]=useState([]);
    const generateArray = (size = 20) => {
        const newArray = Array.from({ length: size}, () => Math.floor(Math.random() * 20))
        setInsertionArr([...newArray]);
        setMergeArr([...newArray]);
        setSelectArr([...newArray]);
        setBubbleArr([...newArray]);

        if(triggerStop){
            triggerStop();
        }
    }
    useEffect(() => {
        generateArray();

    }, [])
    return (
        <Mycontext.Provider value={{
            insertionArr, setInsertionArr,
            mergeArr, setMergeArr,
            selectArr,setSelectArr,
            bubbleArr,setBubbleArr,
            generateArray,setTriggerStop,setArraySize}}>
            {children}
        </Mycontext.Provider>
    )
}