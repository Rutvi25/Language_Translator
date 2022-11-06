import React, { useState } from "react";
import "./Translate.css";

const Translate = () => {
  const [inputText, setInputText] = useState();
  return (
    <>
      <h1>Language Translator</h1>
      <div className="container">
        <div className="sub-container">
          <select className="form-select form-select-sm"></select>
          <br />
          <textarea
            rows={4}
            className="form-control"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here"
          />
          <div className="icons">
            <i className="bi bi-clipboard"></i>
            <i class="bi bi-volume-up"></i>
            <i class="bi bi-x-lg"></i>
          </div>
        </div>
        <div>
          <i class="bi bi-arrow-left-right"></i>
        </div>
        <div className="sub-container">
          <select className="form-select form-select-sm"></select>
          <br />
          <textarea
            rows={4}
            className="form-control"
            placeholder="Translation"
          />
          <div className="icons">
            <i className="bi bi-clipboard"></i>
            <i class="bi bi-volume-up"></i>
            <i class="bi bi-x-lg"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Translate;
