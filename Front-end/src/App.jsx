import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import Emprestimo from "./pages/Emprestimo";
import NovoEmprestimo from "./pages/NovoEmprestimo";
import EditarEmprestimo from "./pages/EditarEmprestimo";
import Livros from "./pages/Livro";
import NovoLivro from "./pages/NovoLivro";
import EditarLivro from "./pages/EditarLivro";
import Usuarios from "./pages/Usuarios";
import NovoUsuario from "./pages/NovoUsuario";
import EditarUsuario from "./pages/EditarUsuario";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emprestimo" element={<Emprestimo />} />
          <Route path="/emprestimo/novo" element={<NovoEmprestimo />} />
          <Route path="/emprestimo/editar/:id" element={<EditarEmprestimo />} />
          <Route path="/livros" element={<Livros />} />
          <Route path="/livros/novo" element={<NovoLivro />} />
          <Route path="/livros/editar/:id" element={<EditarLivro />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/usuarios/novo" element={<NovoUsuario />} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </>
  );
}
export default App;
