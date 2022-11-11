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
        <i onClick={() => setText('')} className='bi bi-x-lg'></i>
        <i
          onClick={() => navigator.clipboard.writeText(text)}
          className='bi bi-clipboard'
        ></i>
        <i onClick={() => sound(text)} className='bi bi-volume-up'></i>
      </div> : <></>}
      {showChar ? <div className='wordcount'>{characterCount}/5</div> : null}
    </div>
  );
};

export default Icons;
