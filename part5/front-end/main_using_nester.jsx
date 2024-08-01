console.log("main.jsx");


import ReactDOM from "react-dom/client";
// import App from './App'
// ReactDOM.createRoot(document.getElementById('root')).render(<App />)

console.log("befor import Nester");
import Nester from "./Nester";
console.log("after import Nester");
ReactDOM.createRoot(document.getElementById("root")).render(<Nester />);
console.log("after render Nester");
