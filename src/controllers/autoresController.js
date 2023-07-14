import NaoEncontrado from "../err/NaoEncontrado.js";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultados = await autores.find();
      res.status(200).json(autoresResultados);
    } catch(err){
      next(err);
    }
    
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const listandoPorID = await autores.findById(id);
    
      if(listandoPorID !== null){
        res.status(200).json(listandoPorID);
      } else {
        next( new NaoEncontrado("Nao foi possiver localizar esse Identificador"));
      }
    } catch (err){
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = await new autores(req.body);
      autor.save();
      res.status(201).send(autor.toJSON());
    } catch(err){
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

      if (autorResultado !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndDelete(id);

      if (autorResultado !== null) {
        res.status(200).send({message: "Autor removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;