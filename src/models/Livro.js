import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: 
    {type: String, 
      required: [true, "o titulo e obrigatorio"]},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "autor(a) e obrigatorio"]},
    editora: {type: String, required: [true, "a editora e obrigatorio"]},
    numeroPaginas: {type: Number}
  }
);

const livros= mongoose.model("livros", livroSchema);

export default livros;