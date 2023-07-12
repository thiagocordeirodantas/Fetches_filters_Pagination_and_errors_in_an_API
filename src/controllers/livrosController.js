import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res) => {
    try {
      const Listalivros = await livros.find()
        .populate("autor");
      res.status(200).json(Listalivros);
    } catch(err) {
      res.status(400).send({message: "Ocorreu um erro ao listar livros"});
    }
  };
  
  static listarLivroPorId = async (req, res) => {
    const id = req.params.id;
    try {
      const listaLivrosID = await livros.findById(id)
        .populate("autor", "nome");
      res.status(200).send(listaLivrosID);
    } catch(err) {
      res.status(400).send({message: `${err.message} - Id do livro não localizado.`});
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = await new livros(req.body);
      livro.save();
      res.status(201).send(livro.toJSON());
    } catch(err) {
      res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`});
    }
  
  };

  static atualizarLivro = async (req, res) => {
   
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Livro atualizado com sucesso"});
    } catch(err){
      res.status(500).send({message: err.message});
    }
  };

  static excluirLivro = async (req, res) => {
    const id = req.params.id;
    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({message: "Livro removido com sucesso"});
    } catch(err) {
      res.status(500).send({message: err.message});
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    const editora = req.query.editora;
    try {
      await  livros.find({"editora": editora});
      res.status(200).send(livros);
    } catch(err){
      res.status();
    }
    
  };
}

export default LivroController;