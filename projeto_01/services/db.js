import mongoose from "mongoose";
import { logError } from "../services/logger.js";

export async function connBD(url) {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conexao com o banco de dados bem sucedida");
    } catch(err){
        console.log("Falha na conexao com o banco de dados: ", err);
        logError(err);
        throw err;
    }    
}

export async function disconnBD() {
    try {
        await mongoose.disconnect();
        console.log("Banco de dados desconectado com sucesso");
    } catch(err){
        console.log("Falha ao desconectar do banco de dados: ", err);
        logError(err);
    }
}