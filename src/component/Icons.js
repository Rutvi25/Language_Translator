import React from 'react';

const Icons = ({ text, setText, showChar }) => {
  // sound functionality
  const sound = (text) => {
    console.log('sound', text);
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };
  const characterCount = text.length;
  return (
    <div className='functions'>
      {text ? <div className='icons'>
        <i onClick={() => setText('')} className='fa-solid fa-trash-can'></i>
        <i
          onClick={() => navigator.clipboard.writeText(text)}
          className='fa-regular fa-copy'
        ></i>
        <i onClick={() => sound(text)} className='fa-solid fa-volume-high'></i>
      </div> : <></>}
      {showChar ? <div className='wordcount'>{characterCount}/5</div> : null}
    </div>
  );
};

export default Icons;
