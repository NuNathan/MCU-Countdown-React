import React from "react";
import "./App.css";
import AppContents from "./Components/AppContents";
import { storageAvailable } from "./Helpers/cookieHelper";

function App() {
  if(storageAvailable()) {
    return (
      <>
      <AppContents />
      </>
    );
  } else {
    return null
  }
}

export default App;
