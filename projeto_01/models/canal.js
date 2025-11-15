import mongoose from "mongoose";
import { logError } from "../services/logger.js";

const canalSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    senha: {type: String, required: true}
});

const canalModel = mongoose.model("canal", canalSchema);

export default class Canal {
    static async adicionarCanal(dados) {
        try{
            return await canalModel.create(dados);
        } catch(err) {
            console.log("erro ao adicionar o canal ao banco de dados: ", err);
            logError(err);
            return null;    
        }
    }
    static async buscarTodosCanais() {
        try {
            return await canalModel.find().exec(); 
        } catch(err) {
            console.log("erro ao buscar todos os canais do banco de dados: ", err);
            logError(err);
            return null;
        }
    }
    static async buscarCanalEmail(email) {
        try {
            return await canalModel.findOne({email}).exec();
        } catch(err) {
            console.log("erro ao buscar canal pelo email: ", err);
            logError(err);
            return null;
        }
    }
    static async buscarCanalNome(nome) {
        try{
            return await canalModel.find({nome}).exec();
        } catch(err) {
            console.log("erro ao buscar canal pelo nome: ", err);
            logError(err);
            return null;
        }
    }
    static async atualizarCanal(email, dados) {
        try {
            const campos = ['nome', 'senha'];
            const novos_dados = {}
            campos.forEach(campo => {
                if(dados[campo] !== undefined) {
                    novos_dados[campo] = dados[campo];
                }
            });
            return await canalModel.findOneAndUpdate({email: email}, novos_dados, {new: true}).exec();
        } catch(err) {
            console.log("erro ao atualizar os dados do canal no bando de dados: ", err);
            logError(err);
            return null;
        }
    }
    static async deletarCanal(email) {
        try {
            return await canalModel.findOneAndDelete({email: email});
        } catch(err) {
            console.log("erro ao deletar canal do banco de dados: ", err);
            logError(err);
            return null;
        }
    }
}