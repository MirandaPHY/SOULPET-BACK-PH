import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getEmprestimo, updateEmprestimo } from "../api/emprestimos";
import toast from "react-hot-toast";
function EditarEmprestimo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  function atualizarEmprestimo(data) {
    // Caso haja necessidade de transformar ou validar os dados, adicione aqui.
    updateEmprestimo(id, data)
      .then((resposta) => {
        toast.success(resposta.message);
        navigate("/emprestimos");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  function carregarEmprestimo() {
    getEmprestimo(id)
      .then((dados) => {
        reset(dados);
      })
      .catch(() => {
        navigate("/emprestimos");
      });
  }
  useEffect(() => {
    carregarEmprestimo();
  }, [id]);
  return (
    <main className="mt-4 container">
      <h1>Editar Empréstimo</h1>
      <hr />
      <form onSubmit={handleSubmit(atualizarEmprestimo)}>
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
              A data do empréstimo é obrigatória!
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
              A data de devolução prevista é obrigatória!
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
              A data de devolução real é inválida!
            </small>
          )}
        </div>
        <Button className="mt-3" type="submit">
          Atualizar
        </Button>
      </form>
    </main>
    ,
  );
}
export default EditarEmprestimo;
