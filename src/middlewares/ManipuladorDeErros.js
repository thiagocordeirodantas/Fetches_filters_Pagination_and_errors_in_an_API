import mongoose from "mongoose";
import ErroBase from "../err/erroBase.js";
import RequisicaoIncorreta from "../err/RequisicaoIncorreta.js";
import ErroValidacao from "../err/ErroValidacao.js";
import NaoEncontrado from "../err/NaoEncontrado.js";


// eslint-disable-next-line no-unused-vars
function ManipuladorDeErros (erro,req,res,next)  {
    
  if(erro instanceof mongoose.Error.CastError){
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (erro instanceof mongoose.Error.ValidationError){
    new ErroValidacao(erro).enviarResposta(res);
  } else if (erro instanceof NaoEncontrado){
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
} 
  
export default ManipuladorDeErros;