import {useState} from 'react';
import {FiSearch, FiLoader} from 'react-icons/fi';
import './styles.css';
import api from './services/api';
import { useEffect } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(){
    setIsLoading(true);

    if(input === ''){
      alert('Preencha com algum CEP!')
    } 

    try{  
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }catch{
      alert('OPS, algo deu errado!');
      setInput('');
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  }

 useEffect(() => {
    if(input.length === 8){
      const bouncer = setTimeout(() => {
        handleSearch();
      }, 1000);

      return () => clearTimeout(bouncer);
    }
  }, [input]);

  const RenderSearch = () => {
    return isLoading ? (<FiLoader size={25} color='whitesmoke' />) : (<FiSearch size={25} color='whitesmoke' />) 
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP </h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <RenderSearch />
        </button>
      </div>

      {Object.keys(cep).length > 0 && !isLoading &&(
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
