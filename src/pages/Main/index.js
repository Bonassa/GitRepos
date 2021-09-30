
// Importando Styled Components
import { Container, Form, SubmitButton, List } from './styles';

import { FaPlus, FaSpinner, FaExternalLinkAlt, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';

import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Importando a API do gitHub
import api from '../../services/api';

import { toast } from 'react-toastify';

export default function Main(){

   const [newRepo, setNewRepo] = useState('');
   const [myRepos, setMyRepos] = useState([]);

   // State para o loading dos repositórios
   const [loading, setLoading] = useState(false);

   // Buscando no localStorage os Repositórios Salvos
   useEffect(() => {
      let data = localStorage.getItem('repos');

      if(data) {
         setMyRepos(JSON.parse(data));
      }
   }, []);

   // Salvando no localStorage os Repositórios novos
   useEffect(() => {

      localStorage.setItem('repos', JSON.stringify(myRepos));

   }, [myRepos])

   // Busca o repositório na API do GitHub
   const handleSubmit = useCallback((e) => {
      e.preventDefault();

      async function getResponse(){
         // Ativando o loading da página
         setLoading(true);

         // Colocando toda a requisição http em um try catch
         try{

            // Verificando se o usuário digitou alguma coisa
            if(newRepo === ''){
               // Como estamos dentro de um try catch, podemos usar o throw para exibir um erro
               throw new Error ('Repositório em Branco!');
            }

            let response = await api.get(`repos/${newRepo}`);

            // Verificando se esse repositório já está na lista
            const hasRepo = myRepos.find(r => r.nome === response.data.name);
            if (hasRepo) {
               throw new Error ('Repositório já Salvo');
            }

            let data = {
               nome: response.data.name,
               dono: response.data.owner.login,
               path: response.data.full_name,
               link: response.data.html_url,
               foto: response.data.owner.avatar_url
            }
   
            setMyRepos([...myRepos, data]);
            setNewRepo('');
            toast.success('Repositório Adicionado');
         }catch(err) {
            console.log(err);
            toast.error('' + err);
         // Quando toda a execução do try catch terminar, ele cai no finally
         } finally {
            setLoading(false);
         }
      }  

      getResponse();

   }, [myRepos, newRepo]);

   // Como estaremos mexendo com uma state, é melhor utilizar o useCallBack
   const handleDelete = useCallback((nome) => {

      let novo = myRepos.filter((seek) => seek.nome !== nome);
      setMyRepos(novo);

   }, [myRepos])

   return(
      <Container>
         <h1>
            <FiGithub size={24} />
            Meus Repositórios
         </h1>

         <Form onSubmit={ handleSubmit }>
            <label>Owner/Repositório</label>
            <input type="text" placeholder="Adicionar Repositório" onChange={(e) => setNewRepo(e.target.value)} value={newRepo} />
            
            <SubmitButton type="submit" loading={ loading ? 1 : 0 }>
               {loading ? (
                  <FaSpinner color="#FFF" size={18} />
               ) : (
                  <FaPlus color="#FFF" size={18} />
               )}               
            </SubmitButton>
         </Form>

         <List>
            {myRepos.map((value, index) => {
               return(
                  <li key={index} >
                     <div className="foto">
                        <img src={value.foto} alt={`Capa do Repositório ${value.nome}`} />
                     </div>
                     <div className="textos">
                        <span className="nome">{value.nome}</span><br/>
                        <span className="dono"><i>Owner:</i> {value.dono}</span>
                     </div>
                     <div className="icons">
                        <Link to={`/repositorio/${encodeURIComponent(value.path)}`}>
                           <FaSearch size={14} />
                        </Link>
                        <a href={value.link} target="_blank" rel="nofollow, noreferrer">
                           <FaExternalLinkAlt size={14} />
                        </a>
                        <button onClick={() => handleDelete(value.nome) } >
                           <FaTrashAlt size={14} />
                        </button>
                     </div>
                  </li>
               )
            })}
         </List>

      </Container>
   )
}