import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEmprestimos, deleteEmprestimo } from "../api/emprestimos";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
function Emprestimos() {
  const [emprestimos, setEmprestimos] = useState(null);
  function carregarEmprestimos() {
    getEmprestimos().then((dados) => {
      setEmprestimos(dados);
    });
  }
  function deletarEmprestimo(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      deleteEmprestimo(id)
        .then((resposta) => {
          toast.success(resposta.message);
          carregarEmprestimos();
        })
        .catch((err) => {
          toast.error("Erro ao excluir o empréstimo.");
          console.error(err);
        });
    }
  }
  useEffect(() => {
    carregarEmprestimos();
  }, []);
  return (
    <main className="mt-4 container">
      <h1>Empréstimos</h1>
      <Button as={Link} to="/emprestimos/novo">
        Adicionar Empréstimo
      </Button>
      <hr />
      {emprestimos ? (
        <Table>
          <thead>
            <tr>
              <th>Data do Empréstimo</th>
              <th>Data de Devolução Prevista</th>
              <th>Data de Devolução Real</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {emprestimos.map((emprestimo) => {
              return (
                <tr key={emprestimo.id}>
                  <td>
                    {emprestimo.dataEmprestimo
                      ? new Date(emprestimo.dataEmprestimo).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {emprestimo.dataDevPrevista
                      ? new Date(
                          emprestimo.dataDevPrevista
                        ).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {emprestimo.dataDevReal
                      ? new Date(emprestimo.dataDevReal).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deletarEmprestimo(emprestimo.id)}
                    >
                      Excluir
                    </Button>
                    <Button
                      size="sm"
                      as={Link}
                      to={`/emprestimos/editar/${emprestimo.id}`}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Loader />
      )}
    </main>
  );
}
export default Emprestimos;
