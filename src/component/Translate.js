import React, { useMemo, useEffect, useState } from 'react';
import Icons from './Icons';
import './Translate.css';

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [languages, setLanguages] = useState([]);
  const [sourceLanguage, setSourceLanguage] = useState(navigator.language);
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const apiKey = process.env.REACT_APP_API_KEY;
  let url = `https://translation.googleapis.com/language/translate/v2/`;
  // fetching a list of languages
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
    setTranslatedText('Translating...');
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
        console.log(data.data.translations[0]);
        setSourceLanguage(data.data.translations[0].detectedSourceLanguage);
      })
    );
  };
  // debounce function
  const debounce = (func) => {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(this, args);
      }, 500);
    };
  };
  const optimizedFn = useMemo(() => debounce(translate), []);
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
  const options = languages.map((language) => (
    <option key={language.language} value={language.language}>
      {language.name}
    </option>
  ));
  return (
    <>
      <h1>Language Translator</h1>
      <div className='container'>
        <div className='sub-container'>
          {/* select source language */}
          <select
            className='form-select form-select-sm'
            onChange={(e) => setSourceLanguage(e.target.value)}
            value={sourceLanguage}
          >
            {options}
          </select>
          {/* exchange button */}
          <div className='exchange-btn' onClick={exchange}>
            <i className='bi bi-arrow-left-right'></i>
          </div>
          {/* select target language */}
          <select
            className='form-select form-select-sm'
            onChange={(e) => {
              setTargetLanguage(e.target.value);
              optimizedFn(inputText, e.target.value);
            }}
            value={targetLanguage}
          >
            {options}
          </select>
        </div>
        <hr />
        <div className='sub-container'>
          <div className='textarea-div source-container'>
            <textarea
              maxLength={5}
              rows={4}
              className='form-control'
              placeholder='Enter your text here'
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                optimizedFn(e.target.value, targetLanguage);
              }}
            />
            <Icons showChar={true} text={inputText} setText={setInputText} />
          </div>
          <div className='vertical-divider'></div>
          <div
            className={
              translatedText
                ? 'textarea-div translation-container'
                : 'textarea-div'
            }
          >
            <textarea
              rows={4}
              className={
                translatedText
                  ? 'form-control translation-area'
                  : 'form-control'
              }
              placeholder='Translation'
              value={translatedText}
            />
            <Icons
              showChar={false}
              text={translatedText}
              setText={setTranslatedText}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Translator;
