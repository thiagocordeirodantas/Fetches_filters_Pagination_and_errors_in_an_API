import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const Listalivros = await livros.find()
        .populate("autor");
      res.status(200).json(Listalivros);
    } catch(err) {
      next(err);
    }
  };
  
  static listarLivroPorId = async (req, res, next) => {
    const id = req.params.id;
    try {
      const listaLivrosID = await livros.findById(id)
        .populate("autor", "nome");
      res.status(200).send(listaLivrosID);
    } catch(err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = await new livros(req.body);
      livro.save();
      res.status(201).send(livro.toJSON());
    } catch(err) {
      next(err);
    }
  
  };

  static atualizarLivro = async (req, res, next) => {
   
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Livro atualizado com sucesso"});
    } catch(err){
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({message: "Livro removido com sucesso"});
    } catch(err) {
      next(err);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    const editora = req.query.editora;
    try {
      await  livros.find({"editora": editora});
      res.status(200).send(livros);
    } catch(err){
      next(err);
    }
    
  };
}

export default LivroController;