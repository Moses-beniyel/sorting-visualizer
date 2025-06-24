import React, { useContext, useRef, useEffect, useState } from 'react';
import { Mycontext } from '../contextProvider';
import './mergeSort.css';
import CodeSnippet from '../codeSnippet/CodeSnippet';
import Complexity from '../complexity/complexity';

const MergeSort = () => {
  const { mergeArr, setMergeArr, generateArray, setTriggerStop } = useContext(Mycontext);
  const [arraySize, setArraySize] = useState(20);
  const [colorArr, setColorArr] = useState("skyblue");
  const isCancelled = useRef(false);
  const [speed, setSpeed] = useState(10);
  //const [newspeed,setNewspeed]=useState(0);
  useEffect(() => {
    setTriggerStop(() => stop);
  }, [setTriggerStop]
  )
  useEffect(() => {
    isCancelled.current = false;
    return () => {
      isCancelled.current = true;
    };
  }, []);

  useEffect(() => {
    generateArray(arraySize);
  }, [arraySize]);

  const currentSpeed = useRef(speed);

  useEffect(() => {
    currentSpeed.current = speed;
  }, [speed])

  useEffect(() => {
    setColorArr(new Array(mergeArr.length).fill("skyblue"));
  }, [mergeArr]);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));


  const setSpeedfunc = (e) => {
    setSpeed(500 - e.target.value);
  }
  const stop = () => {
    isCancelled.current = true;
  }
  const start = () => {
    isCancelled.current = false;
  }
  const mergeSort = async (arr, left, right) => {
    if (left >= right || isCancelled.current) return;

    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
  };

  const merge = async (arr, left, mid, right) => {
    if (isCancelled.current) return;

    const setColors = [...colorArr];
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (isCancelled.current) return;

      setColors[k] = "orange";
      setColorArr([...setColors]);
      await sleep(currentSpeed.current);

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i++];
      } else {
        arr[k] = rightArr[j++];
      }

      setMergeArr([...arr]);
      k++;
    }

    while (i < leftArr.length) {
      if (isCancelled.current) return;

      arr[k] = leftArr[i++];
      setMergeArr([...arr]);

      setColors[k] = "skyblue";
      setColorArr([...setColors]);
      k++;
      await sleep(currentSpeed.current);
    }

    while (j < rightArr.length) {
      if (isCancelled.current) return;

      arr[k] = rightArr[j++];
      setMergeArr([...arr]);

      setColors[k] = "skyblue";
      setColorArr([...setColors]);
      k++;
      await sleep(currentSpeed.current);
    }
  };

  const handleMergeSort = async () => {
    start();
    const tempArr = [...mergeArr];
    const setColors = [...colorArr];
    await mergeSort(tempArr, 0, tempArr.length - 1);

    for (let i = 0; i < tempArr.length && !isCancelled.current; i++) {
      await sleep(currentSpeed.current);
      setColors[i] = "white";
      setColorArr([...setColors]);
    }

  };

  return (

    <div className='mainContainer'>
      <div className='container'>
        <div className="sortingContainer">
          <div className="title">Merge Sort</div>
          <div>
            <label className="arraySize">Change the Array Size </label>
            <input type="number" id="arraySize" min="5" max="50"
              onChange={(e) => {
                const size = Math.min(50, (Number(e.target.value)))
                setArraySize(size)
              }}
            />
          </div>

          <div>

          </div>
          <div className="array">
            {mergeArr.map((val, ind) => (
              <div
                key={ind}
                className="bar"
                style={{
                  height: `${val * 10}px`,
                  backgroundColor: colorArr[ind] || 'skyblue',
                }}
              >{val}
              </div>

            ))}
          </div>
          <div>
            <button onClick={handleMergeSort}>Sort</button>
            <button onClick={() => generateArray(arraySize)}>Generate Array</button>
            <label>Speed {500 - speed}</label>
            <input type="range" min="0" max="500" onChange={(event) => setSpeedfunc(event)} />
            <button onClick={stop}>Stop</button>
            <label>Speed: {500 - speed} ms</label>

          </div>
        </div>
        <Complexity name="Merge" bestCase="O(n log n)" averageCase="O(n log n)" worstCase="O(n log n)" space="O(n)" />
      </div>
      <div className='aboutSort'>
        <div >
          <CodeSnippet/>
        </div>
      </div>
    </div>
    

  );
};

export default MergeSort;
