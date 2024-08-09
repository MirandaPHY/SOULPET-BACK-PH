import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getLivro, updateLivro } from "../api/livros";
import toast from "react-hot-toast";
function EditarLivro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  function atualizarLivro(data) {
    if (data.publicacao === "") data.publicacao = null;
    updateLivro(id, data)
      .then((resposta) => {
        toast.success(resposta.message);
        navigate("/livros");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
  function carregarLivro() {
    getLivro(id)
      .then((dados) => {
        reset(dados);
      })
      .catch(() => {
        navigate("/livros");
      });
  }
  useEffect(() => {
    carregarLivro();
  }, [id]);
  return (
    <main className="mt-4 container">
      <h1>Editar Livro</h1>
      <hr />
      <form onSubmit={handleSubmit(atualizarLivro)}>
        <div>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            className="form-control"
            {...register("titulo", { required: true, maxLength: 200 })}
          />
          {errors.titulo && (
            <small className="text-danger">O título é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="autor">Autor</label>
          <input
            type="text"
            id="autor"
            className="form-control"
            {...register("autor", { required: true, maxLength: 200 })}
          />
          {errors.autor && (
            <small className="text-danger">O autor é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            className="form-control"
            {...register("isbn", { required: true, maxLength: 13 })}
          />
          {errors.isbn && (
            <small className="text-danger">O ISBN é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="genero">Gênero</label>
          <input
            type="text"
            id="genero"
            className="form-control"
            {...register("genero", { required: true, maxLength: 100 })}
          />
          {errors.genero && (
            <small className="text-danger">O gênero é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="quantidade">Quantidade</label>
          <input
            type="number"
            id="quantidade"
            className="form-control"
            {...register("quantidade", { required: true, min: 1 })}
          />
          {errors.quantidade && (
            <small className="text-danger">
              A quantidade deve ser um número positivo!
            </small>
          )}
        </div>
        <div>
          <label htmlFor="publicacao">Data de Publicação</label>
          <input
            type="date"
            id="publicacao"
            className="form-control"
            {...register("publicacao")}
          />
          {errors.publicacao && (
            <small className="text-danger">
              A data de publicação é inválida!
            </small>
          )}
        </div>
        <Button className="mt-3" type="submit">
          Atualizar
        </Button>
      </form>
    </main>
  );
}
export default EditarLivro;
