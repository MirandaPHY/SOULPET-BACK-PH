import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteLivro, getLivros } from "../api/livros";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
function Livros() {
  const [livros, setLivros] = useState(null);
  function carregarLivros() {
    getLivros().then((dados) => {
      setLivros(dados);
    });
  }
  function deletarLivro(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      deleteLivro(id).then((resposta) => {
        toast.success(resposta.message);
        carregarLivros();
      });
    }
  }
  useEffect(() => {
    carregarLivros();
  }, []);
  return (
    <main className="mt-4 container">
      <h1>Livros</h1>
      <Button as={Link} to="/livros/novo">
        Adicionar Livro
      </Button>
      <hr />
      {livros ? (
        <Table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>ISBN</th>
              <th>Gênero</th>
              <th>Quantidade</th>
              <th>Publicação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <tr key={livro.id}>
                <td>{livro.titulo}</td>
                <td>{livro.autor}</td>
                <td>{livro.isbn}</td>
                <td>{livro.genero}</td>
                <td>{livro.quantidade}</td>
                <td>
                  {livro.publicacao
                    ? new Date(livro.publicacao).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deletarLivro(livro.id)}
                  >
                    Excluir
                  </Button>
                  <Button size="sm" as={Link} to={`/livros/editar/${livro.id}`}>
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Loader />
      )}
    </main>
  );
}
export default Livros;
