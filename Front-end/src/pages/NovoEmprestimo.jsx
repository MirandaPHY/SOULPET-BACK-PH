import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addEmprestimo } from "../api/emprestimos"; // Importe a função para adicionar um novo
empréstimo;
function NovoEmprestimo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  function salvarEmprestimo(data) {
    // Envia os dados para o backend para criar um novo empréstimo
    addEmprestimo(data)
      .then((resposta) => {
        toast.success(resposta.message);
        navigate("/emprestimos");
      })
      .catch((err) => {
        toast.error("Erro ao adicionar empréstimo.");
        console.error(err);
      });
  }
  return (
    <main className="mt-4 container">
      <h1>Novo Empréstimo</h1>
      <hr />
      <form onSubmit={handleSubmit(salvarEmprestimo)}>
        <div>
          <label htmlFor="dataEmprestimo">Data do Empréstimo</label>
          <input
            type="date"
            id="dataEmprestimo"
            className="form-control"
            {...register("dataEmprestimo", { required: true })}
          />
          {errors.dataEmprestimo && (
            <small className="text-danger">
              Data do empréstimo é obrigatória!
            </small>
          )}
        </div>
        <div>
          <label htmlFor="dataDevPrevista">Data de Devolução Prevista</label>
          <input
            type="date"
            id="dataDevPrevista"
            className="form-control"
            {...register("dataDevPrevista", { required: true })}
          />
          {errors.dataDevPrevista && (
            <small className="text-danger">
              Data de devolução prevista é obrigatória!
            </small>
          )}
        </div>
        <div>
          <label htmlFor="dataDevReal">Data de Devolução Real</label>
          <input
            type="date"
            id="dataDevReal"
            className="form-control"
            {...register("dataDevReal")}
          />
          {errors.dataDevReal && (
            <small className="text-danger">
              Data de devolução real é inválida!
            </small>
          )}
        </div>
        <Button className="mt-3" type="submit">
          Cadastrar
        </Button>
      </form>
    </main>
  );
}
export default NovoEmprestimo;
