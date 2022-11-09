import React, { useCallback, useEffect, useState } from 'react';
import './Translate.css';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [languages, setLanguages] = useState([]);
  const [sourceLanguage, setSourceLanguage] = useState(navigator.language);
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const apiKey = process.env.REACT_APP_API_KEY;
  let url = `https://translation.googleapis.com/language/translate/v2/`;
  useEffect(() => {
    fetch(url + `languages?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: navigator.language,
      }),
    }).then((res) =>
      res.json().then((data) => setLanguages(data.data.languages))
    );
  }, [url, apiKey]);
  // translate functionality
  const translate = (text, lang) => {
    console.log('translating...');
    fetch(url + `?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        target: lang,
      }),
    }).then((res) =>
      res.json().then((data) => {
        setTranslatedText(data.data.translations[0].translatedText);
        setSourceLanguage(data.data.translations[0].detectedSourceLanguage);
      })
    );
  };
  // sound functionality
  const sound = (text) => {
    console.log('sound', text);
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };
  // debounce function
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };
  const optimizedFn = useCallback(debounce(translate), []);
  // exchange function
  const exchange = () => {
    const tempText = inputText;
    setInputText(translatedText);
    setTranslatedText(tempText);
    const tempLanguage = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tempLanguage);
    console.log('exchange');
  };
  return (
    <>
      <h1>Language Translator</h1>
      <div className='container'>
        <div className='sub-container'>
          <select
            className='form-select form-select-sm'
            onChange={(e) => setSourceLanguage(e.target.value)}
            value={sourceLanguage}
          >
            {languages.map((language) => (
              <option key={language.language} value={language.language}>
                {language.name}
              </option>
            ))}
          </select>
          <br />
          <textarea
            rows={4}
            className='form-control'
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              optimizedFn(e.target.value, targetLanguage);
            }}
            placeholder='Enter your text here'
          />
          <div className='icons'>
            <i
              onClick={() => navigator.clipboard.writeText(inputText)}
              className='bi bi-clipboard'
            ></i>
            <i onClick={() => sound(inputText)} className='bi bi-volume-up'></i>
            <i onClick={() => setInputText('')} className='bi bi-x-lg'></i>
          </div>
        </div>
        <div onClick={exchange}>
          <i className='bi bi-arrow-left-right'></i>
        </div>
        <div className='sub-container'>
          <select
            className='form-select form-select-sm'
            onChange={(e) => {
              setTargetLanguage(e.target.value);
              optimizedFn(inputText, e.target.value);
            }}
            value={targetLanguage}
          >
            {languages.map((language) => (
              <option key={language.language} value={language.language}>
                {language.name}
              </option>
            ))}
          </select>
          <br />
          <textarea
            rows={4}
            className='form-control'
            placeholder='Translation'
            value={translatedText}
          />
          <div className='icons'>
            <i
              onClick={() => navigator.clipboard.writeText(translatedText)}
              className='bi bi-clipboard'
            ></i>
            <i
              onClick={() => sound(translatedText)}
              className='bi bi-volume-up'
            ></i>
            <i onClick={() => setTranslatedText('')} className='bi bi-x-lg'></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Translator;
