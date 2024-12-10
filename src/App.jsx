import axios from "axios";
import "./App.scss";
import Devs from "./components/Devs/Devs";
import { useEffect, useReducer } from "react";
import { initialDevs } from "./reducer/initialDevs";
import { GET_DEVS_DATA } from "./reducer/devsTypes";
import { devsReducer } from "./reducer/devsReducer";

function App() {
  //state reducer
  const [devs, dispatch] = useReducer(devsReducer, initialDevs);

  //get developers data
  const getDevsData = async () => {
    const res = await axios.get("http://localhost:5050/devs");

    dispatch({ type: GET_DEVS_DATA, payload: res.data });
  };

  useEffect(() => {
    getDevsData();
  }, []);

  return (
    <>
      <Devs devs={devs} dispatch={dispatch} />
    </>
  );
}

export default App;
