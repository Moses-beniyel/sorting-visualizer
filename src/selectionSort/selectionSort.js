import React, { useContext, useEffect, useState, useRef } from 'react';
import './selectionSort.css';
import { Mycontext } from '../contextProvider';
import Complexity from '../complexity/complexity';
import CodeSnippet from '../codeSnippet/CodeSnippet';
const SelectionSort = () => {
    const { selectArr, setSelectArr, generateArray, setTriggerStop } = useContext(Mycontext);
    const [colorArr, setColorArr] = useState([]);
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
        setColorArr(new Array(selectArr.length).fill("skyblue"));
    }, [selectArr]);

    useEffect(() => {
        currentSpeed.current = speed;
    }, [speed]);

    const stop = () => {
        isCancelled.current = true;
    };

    const start = () => {
        isCancelled.current = false;
    };

    const setSpeedFunc = (e) => {
        setSpeed(500 - Number(e.target.value));
    };

    const handleSelectionSort = async () => {
        start();
        const temp = [...selectArr];
        const n = temp.length;

        for (let i = 0; i < n; i++) {
            if (isCancelled.current) return;

            let min = i;

            for (let j = i + 1; j < n; j++) {
                if (isCancelled.current) return;

                const colors = new Array(n).fill('skyblue');
                colors[i] = '#66ccff';  // current index
                colors[j] = 'orange';   // current comparison
                colors[min] = '#003366'; // current min
                setColorArr(colors);
                await sleep(currentSpeed.current);

                if (temp[j] < temp[min]) {
                    min = j;
                }
            }

            if (min !== i) {
                [temp[i], temp[min]] = [temp[min], temp[i]];
                setSelectArr([...temp]);
                await sleep(currentSpeed.current);
                if (isCancelled.current) return;
            }

            const sortedColors = new Array(n).fill('skyblue');
            for (let k = 0; k <= i; k++) {
                sortedColors[k] = '#33cc99'; // sorted
            }
            setColorArr(sortedColors);
        }

        setColorArr(new Array(n).fill('#33cc99')); // Fully sorted
    };

    return (
        <div className='mainContainer'>


            <div className='container'>
                <div className="sortingContainer">
                    <div className='title'>Selection Sort</div>

                    <div>
                        <label>Change the Array Size</label>
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
                        {selectArr.map((val, ind) => (
                            <div
                                key={ind}
                                className='bar'
                                style={{
                                    height: `${val * 10}px`,
                                    backgroundColor: colorArr[ind] || 'skyblue',
                                }}
                            >
                                {val}
                            </div>
                        ))}
                    </div>

                    <div className='controls'>
                        <button onClick={handleSelectionSort}>Sort</button>
                        <button onClick={() => generateArray(arraySize)}>Generate Array</button>
                        <button onClick={stop}>Pause</button>
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
                <Complexity name="Selection"
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

export default SelectionSort;
