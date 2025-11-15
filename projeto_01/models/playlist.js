import mongoose from "mongoose";
import { logError } from "../services/logger.js";

const playlistSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: {type: String},
    canal: {type: mongoose.Schema.Types.ObjectId, ref: "canal", required: true},
    videos: [{type: mongoose.Schema.Types.ObjectId, ref: "video"}]
});

const playlistModel = mongoose.model("playlist", playlistSchema);

export default class Playlist {
    static async adicionarPlaylist(dados) {
        try {
            return await playlistModel.create(dados);
        } catch(err) {
            console.log("erro ao adicionar playlist ao banco de dados: ", err);
            logError(err);
            return null;
        }
    }
    static async buscarTodasPlaylists() {
        try {
            return await playlistModel.find().exec();
        } catch(err) {
            console.log("erro ao buscar todas as playlists do banco de dados: ", err);
            logError(err);
            return null;
        }
    }
    static async buscarPlaylistCanal(email) {
        try {
            return await playlistModel.find().populate({path: 'canal', match: {email: email}}).exec();
        } catch(err) {
            console.log("erro ao buscar playlists pelo email no banco de dados: ", err);
            logError(err);
            return null;
        }
    }
    static async adicionarVideoPlaylist(id_playlist, id_video) {
        try {
            return await playlistModel.findByIdAndUpdate(id_playlist, {$addToSet: {videos: id_video}}, {new: true}).populate('videos').exec();
        } catch(err) {
            console.log("erro ao adicionar video a playlist: ", err);
            logError(err);
            return null;
        }
    }
    static async atualizarPlaylist(id_playlista, dados) {
        try {
            const campos = ['titulo', 'descricao'];
            const novos_dados = {};
            campos.forEach(campo => {
                if(dados[campo] !== undefined) {
                    novos_dados[campo] = dados[campo];
                }
            });
            return await playlistModel.findByIdAndUpdate(id_playlista, novos_dados, {new: true}).exec();
        } catch(err) {
            console.log("erro ao atualizar dados da playlist no banco de dados: ", err);
            logError(err);
            return null;
        }
    }
    static async deletarPlaylist(id_playlist) {
        try {
            return await playlistModel.findByIdAndDelete(id_playlist).exec();
        } catch(err) {
            console.log("erro ao deletar a playlist do banco de dados: ", err);
            logError(err);
            return null;
        }
    }
}