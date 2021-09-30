
// Utilizando Styled Components
import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
   max-width: 700px;
   background-color: var(--branco);
   border-radius: 4px;
   padding: 30px;
   margin: 80px auto;
   box-shadow: 0 0 20px rgba(0, 0, 0, 1);

   h1 {
      font-size: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20px;

      svg {
         margin-right: 10px;
      }
   }

`;

export const Form = styled.form`
   display: flex;
   flex-direction: row;

   label {
      display: flex;
      align-items: center;
      padding: 0 15px;
      background-color: #DDD;
      border-radius: 5px 0 0 5px;
   }

   input {
      flex: 1;
      border: 1px solid #DDD;
      border-radius: 0;
      padding: 0 10px;
      border-right: none;
   }
`;

// Criando animação do botão
const animated = keyframes`
   // Colocando o que irá ser feito from / to
   from {
      transform: rotate(0deg);
   }

   to {
      transform: rotate(360deg);
   }
`;

export const SubmitButton = styled.button.attrs( props => ({
   disabled: props.loading,
})) `
   border: none;
   padding: 7px 15px;
   display: flex;
   align-items: center;
   background-color: var(--laranja);
   border-radius: 0 5px 5px 0;
   transition: ease-in-out .3s;

   &:hover {
      background-color: var(--azul);
   }

   &[disabled]{
      cursor: not-allowed;
      opacity: 0.5;
      background-color: var(--azul);
   }

   // Abrindo uma condicional para se estiver em loading
   ${props => props.loading && 
      css`
         svg {
            animation: ${animated} 2s linear infinite;
         }
      `
   }

`;

export const List = styled.ul`
   list-style: none;
   margin: 15px 0;

   li {

      display: flex;
      flex-direction: row;
      border-radius: 4px;
      padding: 4px;
      transition: ease-out .15s;

      &:hover {
         background-color: #DDD9;
      }
      
      .foto {
         display: flex;
         align-items: center;
         margin: 0 15px 0 7px;
         
         img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
         }
      }


      .textos {

         margin: auto 0;

         .nome {
            text-transform: capitalize;
            font-size: 18px;
            font-weight: 500;
         }
   
         .dono {
            text-transform: capitalize;
         }
      }

      .icons {
         display: flex;
         align-items: center;
         justify-content: end;
         flex: 1;
         flex-direction: row-reverse;
         margin-right: 15px;

         a, button {
            border: none;
            border-radius: 50%;
            padding: 10px;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
               width: 15px;
               height: 15px;
               fill: var(--azul);
            }

            &:hover {
               background-color: var(--branco);
            }

            &:not(:last-child) {
               margin-left: 10px;
            }
         }
      }
   }

`;