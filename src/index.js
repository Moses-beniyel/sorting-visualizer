import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter,RouterProvider,Outlet} from "react-router-dom"
import Navbar from './navbar';
import Mergesort from './mergeSort/mergesort';
import InsertionSort from './insertionSort/insertionSort';
import SelectionSort from './selectionSort/selectionSort';
import {MyProvider} from "./contextProvider"
import BubbleSort from './bubbleSort/bubbleSort';
const root = ReactDOM.createRoot(document.getElementById('root'));
const Layout = () => (
  <div className="main">
    <Navbar className="navbar" />
    <Outlet className="sortingComponents"/>
  </div>
);
const router=createBrowserRouter([
  {path:"/",
    element:<Layout/>,
    children:[
      {path:"/home",element:<App/>},
      {path:"/", element:<App/>},
      {path:"/mergeSort",element:<Mergesort/>},
      {path:"/insertionSort",element:<InsertionSort/>},
      {path:"/selectionSort",element:<SelectionSort/>},
      {path:"/bubbleSort",element:<BubbleSort/>}
    ]
  }
  
]);

root.render(
  <React.StrictMode>
    <MyProvider>

        <RouterProvider router={router}/>

    </MyProvider>
   
  </React.StrictMode>
);

reportWebVitals();
