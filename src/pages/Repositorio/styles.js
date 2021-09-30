
import styled, { keyframes } from 'styled-components';
import "animate.css";

const animated = keyframes`
   // Colocando o que irá ser feito from / to
   from {
      transform: rotate(0deg);
   }

   to {
      transform: rotate(360deg);
   }
`;

const voltar = keyframes`
   from {
      transform: translateX(7px);
   }
   to {
      transform: translateX(-2px);
   }
`;

export const Loading = styled.div`

   display: flex;
   align-items: center;
   justify-content: center;
   height: 90vh;

   svg {
      animation: ${ animated } 2s linear infinite;
   }

   h1 {
      font-size: 28px;
      color: var(--branco);
      margin-left: 15px;
   }

`;

export const Container = styled.div`
   max-width: 700px;
   background-color: var(--branco);
   border-radius: 4px;
   padding: 30px;
   margin: 80px auto;
   box-shadow: 0 0 20px rgba(0, 0, 0, 1);
`;

export const Owner = styled.div`
	display: flex;
   flex-direction: column;
   align-items: center;

   img {
      border-radius: 25%;
      height: 10rem;

      animation: fadeIn;
      animation-duration: .8s;
   }

   h1 {
      text-transform: capitalize;
      color: var(--azul);
      margin: 5px 0;
      font-weight: 600;
   }

   p {
      font-style: italic;
      font-size: 16px;
      font-weight: 400;

      max-width: 90%;
      text-align: center;
   }

`;

export const BackButton = styled.button`
   position: absolute;
   display: flex;
   flex-direction: row;
   align-items: center;
   border: none;
   color: var(--azul);
   font-size: 18px;
   padding: 5px 10px 5px 5px;

   background-color: var(--laranja);
   border-radius: 5px;

   svg {
      margin-right: 5px;
      fill: var(--azul);
   }

   &:hover {
      color: var(--branco);

      svg {
         fill: var(--branco);
         animation: ${ voltar } .5s linear infinite;
      }

   }
`;

export const IssuesList = styled.ul`
   list-style: none;
   margin: 40px 0 10px 0;

   .cabecalho {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 35px;

      h2 {
         text-transform: capitalize;
      }
   }

   li {
      display: flex;
      flex-direction: row;
      margin: 15px 0;
      align-items: center;
      border-radius: 50px 15px 15px 50px;

      animation: slideInUp;
      animation-duration: .5s;

      &:hover {
         background-color: #DDD9;
      }

      img {
         width: 5rem;
         height: 5rem;
         border-radius: 50%;
         box-shadow: 0 0 6px var(--azul);
         border: 3px solid var(--azul);
      }

      .info {
         margin-left: 15px;
         display: flex;
         flex-direction: column;

         a {
            font-size: 18px;
            text-transform: capitalize;
            text-decoration: none;
            color: var(--azul);

            &:hover {
               color: #0071db;
            }
         }

         .tags {
            display: flex;
            flex-direction: row;

            span {
               padding: 2px 5px;
               border-radius: 4px;
               margin: 3px 0;

               &:not(:first-child) {
                  margin-left: 8px;
               }
            }

         }

      }
   }


`;

export const FilterList = styled.div`
   display:flex;
   flex-direction:row;
   align-items: center;

   button {
      border: none;
      padding: 5px 15px;
      background-color: var(--azul);
      color: var(--branco);
      border-radius: 0;
   
      font-size: 16px;
   
      &:last-child {
         border-radius: 0 5px 5px 0;
      }

      &:first-child {
         border-radius: 5px 0 0 5px;
      }

      &:hover {
         background-color: var(--laranja);
      }

      /**Estilização do botton active */
      &:nth-child(${props => props.active + 1}){
         background-color: var(--laranja);
      }
   }

`;

export const Tag = styled.span`
   background-color: ${(props) => `#${props.bg}`};
   color: ${(props) => props.color};
   text-transform: capitalize;
`;

export const PageActions = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: center;
   align-items: center;

   button {
      margin: 2px 15px;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      border: none;

      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
         background-color: var(--azul);

         svg {
            fill: var(--branco);
         }
      }

      &:disabled {
         opacity: 0.5;
         cursor: default;
      }
   }
`;