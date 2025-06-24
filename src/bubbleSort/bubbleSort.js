import React, { useState, useContext, useRef, useEffect } from 'react';
import { Mycontext } from '../contextProvider';
import "./bubbleSort.css";
import Complexity from '../complexity/complexity';
import CodeSnippet from '../codeSnippet/CodeSnippet';
const BubbleSort = () => {
    const { bubbleArr, setBubbleArr, generateArray, setTriggerStop } = useContext(Mycontext);
    const [colorsArr, setColorsArr] = useState([]);
    const [arraySize, setArraySize] = useState(20);
    const [speed, setSpeed] = useState(10);
    const currentSpeed = useRef(speed);
    const isCancelled = useRef(false);

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    useEffect(() => {
        setTriggerStop(() => stop);
    }, [setTriggerStop]);

    useEffect(() => {
        isCancelled.current = false;
        return () => {
            isCancelled.current = true;
        };
    }, []);

    useEffect(() => {
        generateArray(arraySize);
    }, [arraySize]);

    useEffect(() => {
        setColorsArr(new Array(bubbleArr.length).fill("skyblue"));
    }, [bubbleArr]);

    useEffect(() => {
        currentSpeed.current = speed;
    }, [speed]);

    const stop = () => {
        isCancelled.current = true;
    };

    const setSpeedFunc = (e) => {
        setSpeed(500 - Number(e.target.value));
    };

    const handleBubbleSort = async () => {
        isCancelled.current = false;

        const temp = [...bubbleArr];
        const n = temp.length;

        for (let i = 0; i < n; i++) {
            let swap = false;

            for (let j = 0; j < n - i - 1; j++) {
                if (isCancelled.current) return;

                const colors = new Array(n).fill("skyblue");
                colors[j] = "orange";
                colors[j + 1] = "orange";
                setColorsArr(colors);
                await sleep(currentSpeed.current);

                if (temp[j] > temp[j + 1]) {
                    [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                    setBubbleArr([...temp]);
                    swap = true;
                    await sleep(currentSpeed.current);
                    if (isCancelled.current) return;
                }
            }

            if (!swap) break;
        }

        for (let i = 0; i < n && !isCancelled.current; i++) {
            const colors = new Array(n).fill("skyblue");
            for (let k = 0; k <= i; k++) {
                colors[k] = "green";
            }
            setColorsArr(colors);
            await sleep(currentSpeed.current / 2);
        }

        setColorsArr(new Array(n).fill("green"));
    };

    return (
        <div>
            <div className='container'>
                <div className="sortingContainer">
                    <div className='title'>Bubble Sort</div>

                    <div>
                        <label>Array Size: </label>
                        <input
                            type="number"
                            min="5"
                            max="50"
                            value={arraySize}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                if (!isNaN(val) && val >= 5 && val <= 50) {
                                    setArraySize(val);
                                }
                            }}
                        />
                    </div>

                    <div className='array'>
                        {bubbleArr?.map((val, ind) => (
                            <div
                                key={ind}
                                className='bar'
                                style={{
                                    height: `${val * 10}px`,
                                    backgroundColor: colorsArr[ind] || 'skyblue',
                                }}
                            >
                                {val}
                            </div>
                        ))}
                    </div>

                    <div className='controls'>
                        <button onClick={handleBubbleSort}>Sort</button>
                        <button onClick={() => generateArray(arraySize)}>Generate Array</button>
                        <button onClick={stop}>Stop</button>

                        <label>Speed: {500 - speed} ms</label>
                        <input
                            type="range"
                            min="0"
                            max="500"
                            value={500 - speed}
                            onChange={setSpeedFunc}
                        />
                    </div>
                </div>
                <Complexity name="Bubble"
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

export default BubbleSort;
