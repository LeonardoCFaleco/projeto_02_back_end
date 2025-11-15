import mongoose, { mongo, Mongoose } from "mongoose";
import { logError } from "../services/logger.js";

const videoSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: {type: String, required: true},
    duracao: {type: Number, required: true},
    canal: {type: mongoose.Schema.Types.ObjectId, ref: "canal", required: true}
});

const videoModel = mongoose.model("video", videoSchema);

export default class Video {
    static async adicionarVideo(dados){
        try {
            return await videoModel.create(dados);
        } catch(err) {
            console.error("Erro em Video.adicionar:", err);
            logError(err);
            return null;
        }
    }
    static async buscarTodosVideos() {
        try {
            return await videoModel.find().populate("canal", "nome").exec();
        } catch(err) {
            console.error("Falha ao buscar todos os videos do banco de dados:", err);
            logError(err);
            return null;
        }    
    }
    static async buscarVideoId(id){
        try {
            return await videoModel.findById(id).populate("canal", "nome").exec();
        } catch(err){
            console.log("Falha ao buscar video por id: ", err);
            logError(err);
            return null;
        }
    }
    static async buscarVideoCanal(canal_id) {
        try {
            return await videoModel.find({canal: canal_id}).populate("canal", "nome").exec();
        } catch(err){
            console.log("Falha ao buscar os videos do canal: ", err);
            logError(err);
            return null;
        }
    }
    
    static async atualizarVideo(id_video, dados) {
        try {
            const campos = ['titulo', 'descricao', 'duracao']
            const novos_dados = {}
            campos.forEach(campo => {
                if(dados[campo] !== undefined) {
                    novos_dados[campo] = dados[campo];
                }
            });
            return await videoModel.findByIdAndUpdate(id_video, novos_dados, {new: true}).exec();
            } catch(err) {
            console.error("Erro em atualizar os dados do video:", err);
            logError(err);
            return null;
        }
    }
    static async deletarVideo(id) {
        try {
            return await videoModel.findByIdAndDelete(id).exec();
        } catch(err){
            console.log("Falha ao deletar video: ", err);
            logError(err);
            return null;
        }
    }
}