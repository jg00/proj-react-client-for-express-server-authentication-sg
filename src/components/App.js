import React from "react";
import Header from "./Header";
import "./AppStyle.css";

const App = ({ children }) => {
  return (
    <div className="app">
      <Header />
      {children}
    </div>
  );
};

export default App;
