import React, { useEffect, useState } from 'react';
import './Translate.css';

const Translator = () => {
  const [inputText, setInputText] = useState();
  const [translatedText, setTranslatedText] = useState();
  const [languages, setLanguages] = useState([]);
  const [sourceLanguage, setSourceLanguage] = useState(navigator.language);
  const [targetLanguage, setTargetLanguage] = useState('hi');
  const apiKey = process.env.REACT_APP_API_KEY;
  let url = `https://translation.googleapis.com/language/translate/v2/languages?key=${apiKey}`;
  useEffect(() => {
    fetch(url, {
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
  }, [url]);
  let url1 = `https://translation.googleapis.com/language/translate/v2/?key=${apiKey}`;
  const translate = () => {
    fetch(url1, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: inputText,
        target: targetLanguage,
      }),
    }).then((res) =>
      res.json().then((data) => {
        setTranslatedText(data.data.translations[0].translatedText);
        setSourceLanguage(data.data.translations[0].detectedSourceLanguage);
      })
    );
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
            onChange={(e) => setInputText(e.target.value)}
            placeholder='Enter your text here'
          />
          <div className='icons'>
            <i
              onClick={() => navigator.clipboard.writeText(inputText)}
              className='bi bi-clipboard'
            ></i>
            <i className='bi bi-volume-up'></i>
            <i onClick={() => setInputText('')} className='bi bi-x-lg'></i>
          </div>
        </div>
        <div>
          <i className='bi bi-arrow-left-right'></i>
        </div>
        <div className='sub-container'>
          <select
            className='form-select form-select-sm'
            onChange={(e) => setTargetLanguage(e.target.value)}
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
            <i className='bi bi-volume-up'></i>
            <i onClick={() => setTranslatedText('')} className='bi bi-x-lg'></i>
          </div>
        </div>
      </div>
      <button type='submit' onClick={translate}>
        Translate
      </button>
    </>
  );
};

export default Translator;
