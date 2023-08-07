import 'bootstrap/dist/css/bootstrap.min.css';
import ApiList from './components/content/ApiList';

function App() {
  return (
    <>
      <div className="container-fluid">
        <h1 className='h1 text-center'>Public API list</h1>
        <h6 className='h6 text-center'>(Original source: <a href="https://api.publicapis.org/" target="_blank" rel="noreferrer">https://api.publicapis.org/</a>)</h6>
        <hr />
        <ApiList />
      </div>
    </>
  );
}

export default App;
