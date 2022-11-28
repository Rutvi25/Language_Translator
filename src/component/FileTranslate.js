/* eslint-disable no-undef */
import React, { useState } from 'react';

const FileTranslate = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  console.log('>>> file', file);
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log('file>>>', reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  const target='gu'
  function download() {
    let filen = fileName.split('.').slice(0, -1).join('.');
    console.log('>>> name without ext.', filen);
    window.location.href = `https://storage.cloud.google.com/translator-367713.appspot.com/demo-file.xlsx/translator-367713.appspot.com_${filen}_${target}_translations.xlsx`;
  }
  async function translatefile() {
    console.log('translated file...');

    let firebaseConfig = {
      projectId: 'translator-367713',
      storageBucket: 'gs://translator-367713.appspot.com',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
   const ref = firebase.storage().ref();
    const file1 = file;
    const name = +new Date() + '-' + file1.name;
    setFileName(name);
    console.log('>>> file name', name);
    const metadata = {
      contentType: file1.type,
    };
    const task = ref.child(name).put(file1, metadata);
    await task
      .then((snapshot) => console.log(snapshot.ref.getDownloadURL()))
      .then((url) => {
        console.log(url);
      });

    console.log(firebaseConfig);

    await fetch(
      `https://translation.googleapis.com/v3/projects/${process.env.REACT_APP_PROJECT_ID}/locations/us-central1:translateDocument`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
        body: JSON.stringify({
          source_language_code: 'en',
          target_language_code: 'gu',
          document_input_config: {
            gcsSource: {
              inputUri: `gs://translator-367713.appspot.com/${name}`,
            },
          },
          document_output_config: {
            gcsDestination: {
              outputUriPrefix:
                'gs://translator-367713.appspot.com/demo-file.xlsx/',
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
      <button onClick={() => download()}>Download!</button>
    </>
  );
};

export default FileTranslate;
