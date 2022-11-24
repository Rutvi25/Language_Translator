import React, { useState } from 'react';

const FileTranslate = () => {
  const [file, setFile] = useState();
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  function translatefile() {
    console.log('translated file...');
    fetch(
      `https://translation.googleapis.com/v3/projects/${process.env.REACT_APP_PROJECT_ID}/locations/us-central1:translateDocument`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
        body: JSON.stringify({
          source_language_code: 'en',
          target_language_code: 'hi',
          document_input_config: {
            gcsSource: {
              inputUri: 'gs://translated_file/demo file.xlsx',
            },
          },
          document_output_config: {
            gcsDestination: {
              outputUriPrefix: 'gs://translated_file/demo-File.xlsx/',
            },
          },
        }),
      }
    );
  }

  return (
    <>
      <div>File Translate</div>
      <input
        className='photo'
        type='file'
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button
        onClick={() => {
          getBase64(file);
          translatefile();
        }}
      >
        upload!
      </button>
    </>
  );
};

export default FileTranslate;
