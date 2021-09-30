
import Routes from "./routes";

// Importando style global
import GlobalStyle from './styles/global';

// Importando o toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} theme="dark" />
      <GlobalStyle/>
      <Routes />
    </>
  );
}

export default App;
