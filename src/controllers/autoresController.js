import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresResultados = await autores.find();
      res.status(200).json(autoresResultados);
    } catch(err){
      res.status(500).json({message: "Erro interno no servidor"});
    }
    
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const listandoPorID = await autores.findById(id);
    
        if(listandoPorID !== null){
          res.status(200).json(listandoPorID);
        } else {
          req.status(404).json({message: "Nao foi possiver localizar esse Identificador"});
        }
    } catch (err){
      if(err instanceof mongoose.Error.CastError){
        res.status(400).send({message: "Um ou mais dados fornecidos estao incorretos"})
      } else {
        res.status(500).send({message: "Erro interno de servidor"})
      }

    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      let autor = await new autores(req.body);
      autor.save();
      res.status(201).send(autor.toJSON());
    } catch(err){
      res.status(500).send({message: `${err.message} - falha ao cadastrar Autor.`});
    }
  };

  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id,{$set: req.body});
      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (err){
      res.status(500).send({message: `${err} ocorreu um erro ao atualizar esse identificador`});
    }
  };

  static excluirAutor = async (req, res) => {
    
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "Autor removido com sucesso"});
    } catch (err){
      res.status(500).send({message: err.message});
    }
  };
}

export default AutorController;