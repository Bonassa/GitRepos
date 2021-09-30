
// Utilizando Styled Components - Estilo Global

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

:root {
   --azul: #0d2636;
   --laranja: #faa201;
   --branco: #fff;
}

   * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
   }

   html, body, #root {
      min-height: 100%;
   }

   body {
      background-color: var(--azul);
      font-size: 14px;
      -webkit-font-smoothing: antialiased !important;
   }

   body, input, button {
      color: #222;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
   }

   button {
      cursor: pointer;
      background: none;
   }
`;