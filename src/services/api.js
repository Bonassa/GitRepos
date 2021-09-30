
// Importando o axios
import axios from 'axios';

// Criando export da api
const api = axios.create({
   baseURL: 'https://api.github.com/',
})

export default api;