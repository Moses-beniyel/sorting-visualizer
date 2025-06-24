import React, { useContext, useRef, useEffect, useState } from 'react';
import { Mycontext } from '../contextProvider';
import './insertionSort.css';
import Complexity from '../complexity/complexity';
import CodeSnippet from '../codeSnippet/CodeSnippet';
const InsertionSort = () => {
    const { insertionArr, setInsertionArr, generateArray, setTriggerStop } = useContext(Mycontext);
    const [speed, setSpeed] = useState(10);
    const [arraySize, setArraySize] = useState(20);
    const isCancelled = useRef(false);

    useEffect(() => {
        isCancelled.current = false;
        return () => {
            isCancelled.current = true;
        };
    }, []);

    useEffect(() => {
        setTriggerStop(() => stop);
    }, []
    )

    const setSpeedfunc = (e) => {
        setSpeed(500 - e.target.value);
    }
    const currentSpeed = useRef(speed)

    useEffect(() => {
        currentSpeed.current = speed;
    })

    useEffect(() => {
        generateArray(arraySize);
    }, [arraySize])

    const start = () => {
        isCancelled.current = false;
    }
    const stop = () => {
        isCancelled.current = true;
    }
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const handleInsertionSort = async () => {
        start();
        const temp = [...insertionArr];
        const bars = document.getElementsByClassName('bar');

        for (let i = 1; i < temp.length; i++) {
            if (isCancelled.current) return;

            let key = temp[i];
            let j = i - 1;

            bars[i].style.backgroundColor = '#003366'; // navy blue
            await sleep(currentSpeed.current);
            if (isCancelled.current) return;

            while (j >= 0 && key < temp[j]) {
                temp[j + 1] = temp[j];
                j -= 1;
            }

            temp[j + 1] = key;
            setInsertionArr([...temp]);
            await sleep(currentSpeed.current);
        }

        for (let i = 0; i < temp.length; i++) {
            if (isCancelled.current) return;
            await sleep(50);
            bars[i].style.backgroundColor = 'skyblue'; // light blue
        }
    };

    return (
        <div className='mainContainer'>
            <div className='container'>
                <div className='sortingContainer'>


                    <div className='title'>Insertion Sort</div>
                    <div>
                        <label>Change the array size </label>
                        <input type="number" min="0" max="50" onChange={(e) => setArraySize(Number(e.target.value))} />
                    </div>

                    <div className='array'>
                        {insertionArr.map((val, ind) => (
                            <div key={ind}>
                                <div style={{ height: `${val * 10}px`, backgroundColor: 'skyblue' }} className='bar'>
                                    {val}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button onClick={handleInsertionSort}>Sort</button>
                        <button onClick={() => generateArray(arraySize)}>Generate</button>
                        <lable>Speed Bar</lable>
                        <input type="range" min="0" max="500" onChange={(event) => setSpeedfunc(event)} />

                        <button onClick={stop}>Stop</button>
                    </div>
                </div>
                <Complexity name="Insertion"
                    bestCase="O(n)"
                    averageCase="O(n²)"
                    worstCase="O(n²)"
                    space="O(1)"
                />
            </div>
            <div className='aboutSort'>
                <CodeSnippet />
            </div>
        </div>
    );
};

export default InsertionSort;
