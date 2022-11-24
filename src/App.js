import './App.css';
import FileTranslate from './component/FileTranslate';
import Translator from './component/Translate';

function App() {
  return (
    <div className='App'>
      <Translator />
      <br />
      <br />
      <FileTranslate />
    </div>
  );
}

export default App;
