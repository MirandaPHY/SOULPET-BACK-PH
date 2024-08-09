import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteUsuario, getUsuarios } from "../api/usuarios";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
function Usuarios() {
  const [usuarios, setUsuarios] = useState(null);
  function carregarUsuarios() {
    getUsuarios().then((dados) => {
      setUsuarios(dados);
    });
  }
  function deletarUsuario(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if (deletar) {
      deleteUsuario(id).then((resposta) => {
        toast.success(resposta.message);
        carregarUsuarios();
      });
    }
  }
  useEffect(() => {
    carregarUsuarios();
  }, []);
  return (
    <main className="mt-4 container">
      <h1>Usuários</h1>
      <Button as={Link} to="/usuarios/novo">
        Adicionar Usuário
      </Button>
      <hr />
      {usuarios ? (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Data de Nascimento</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.cpf}</td>
                <td>{usuario.email}</td>
                <td>{usuario.telefone}</td>
                <td>{usuario.dataNasc}</td>
                <td>{usuario.endereco}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deletarUsuario(usuario.id)}
                  >
                    Excluir
                  </Button>
                  <Button
                    size="sm"
                    as={Link}
                    to={`/usuarios/editar/${usuario.id}`}
                  >
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
export default Usuarios;
