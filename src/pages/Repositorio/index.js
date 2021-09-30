
import { Container, Loading, Owner, BackButton, IssuesList, Tag, PageActions, FilterList } from './styles';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FaSpinner, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import "animate.css";

//{decodeURIComponent(match.params.repositorio)}

export default function Repositorio({match}){

   const [repository, setRepository] = useState({});
   const [issues, setIssues] = useState([]);
   const [loading, setLoading] = useState(true);

   const [page, setPage] = useState(1);
   //const [estado, setEstado] = useState('open'); -- Quando fiz com radio button

   // Iremos controlar os botões de filtros através de states
   const [filter, setFilter] = useState([
      {state: 'open', label: 'Open', active: true},
      {state: 'closed', label: 'Closed', active: false},
      {state: 'all', label: 'All', active: false}
   ]);

   // Criando um index do filter selecionado (Marcação active option) começa no indice 0
   const [filterIndex, setFilterIndex] = useState(0);

   // Declarando o useHistory
   const history = useHistory();

   const path = decodeURIComponent(match.params.repositorio);

   // INICIALIZAÇÃO -- Buscando na api o respositorio selecionado
   useEffect(() => {
      async function buscaRepositorio(){
         const [r, i] = await Promise.all([
            api.get(`/repos/${path}`),
            api.get(`/repos/${path}/issues`, {
               params: {
                  state: filter.find(seek => seek.active).state, // Encontra o active true
                  per_page: 5
               }
            })
         ])

         setRepository(r.data);
         setIssues(i.data);
         setLoading(false);
      }

      buscaRepositorio();

   }, [path, filter]);

   // PAGINAÇÃO -- Alterando as issues da página
   useEffect(() => {
      async function pageUpdate(){
         let response = await api.get(`/repos/${path}/issues`, {
            params: {
               state: filter[filterIndex].state,
               per_page: 5,
               page: page
            }
         })

         setIssues(response.data);
      }

      pageUpdate();
   }, [page, path, filter, filterIndex]);

   // Função para voltar a Página Principal
   function handleGoBack(){
      history.push('/');
   }

   // Função para baseado na cor de fundo da tag, definir se o texto é branco ou preto
   function handleColor(color){
      var r = parseInt(color.substring(0, 2), 16); // hexToR
      var g = parseInt(color.substring(2, 4), 16); // hexToG
      var b = parseInt(color.substring(4, 6), 16); // hexToB
      return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
         '#000' : '#FFF';
   }

   // Função para controlar a paginação
   function handlePage(action){
      if (page === 1 && action === 'back'){
         return;
      }
      setPage(action === 'back' ? page - 1 : page + 1);
   }

   // Função para a troca dos radion buttons
   function handleOptionChange(index){
      //setEstado(event.target.value);
      setFilterIndex(index);
      setPage(1);
   }

   // Renderização condicional do loading
   if(loading) {
      return(
         <Loading>
            <FaSpinner size={50} color="#FFF" />
            <h1>Carregando...</h1>
         </Loading>
      );
   }

   return (
      <Container>
         <BackButton onClick={ handleGoBack }>
            <FaAngleLeft size={28} />
            Voltar
         </BackButton>
         <Owner>
            <img src={repository.owner.avatar_url} alt={`Foto de capa do ${repository.name}`} />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
         </Owner>

         <IssuesList>
            <div className="cabecalho">
               <h2>{repository.name} Issues</h2>

               {/**Passando uma prop chamada active para ser estilizado o botão selecionado */}
               <FilterList active={filterIndex}>
                  {filter.map((button, index) => {
                     return(
                        <button type="button" key={index} onClick={() => handleOptionChange(index) } >{button.label}</button>
                     )
                  })}
               </FilterList>
            </div>
            {issues.map((issue) => {
               return(
                  <li key={String(issue.id)} >
                     <img src={issue.user.avatar_url} alt={`Foto de perfil do ${issue.user.login}`} loading="lazy" />

                     <div className="info">
                        <a href={issue.html_url} target="_blank" rel="nofollow, noreferrer">{issue.title}</a>

                        <div className="tags">
                           {issue.labels.map((label) => {
                              return(
                                 <Tag bg={label.color} color={ handleColor(label.color) } key={String(label.id)} >{label.name}</Tag>
                              );
                           })}
                        </div>

                        <label><i>Created by: </i>{issue.user.login}</label>
                     </div>

                  </li>
               );
            })}

            <PageActions>
               <button type="button" onClick={() => handlePage('back') } disabled={ page < 2 } ><FaAngleLeft size={22} /></button>
               <label>{page}</label>
               <button type="button" onClick={() => handlePage('next') } ><FaAngleRight size={22} /></button>
            </PageActions>

         </IssuesList>
      </Container>
   )
}