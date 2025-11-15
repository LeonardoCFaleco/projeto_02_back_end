import dotenv from "dotenv"
dotenv.config();

import {connBD, disconnBD} from "./services/db.js";
import Canal from "./models/canal.js";
import Video from "./models/video.js";
import Playlist from "./models/playlist.js";
import { connect } from "mongoose";
import { logError } from "./services/logger.js";

async function main() {
    try {
        await connBD(process.env.MONGO_URL);
        //criacao do primerio canal
        const canal_01 = await Canal.adicionarCanal({
            nome: "Leonardo",
            email: "teste@gmail.com",
            senha: "123"
        });
        if(!canal_01) return console.error("erro ao criar canal");
        console.log("canal criado com sucesso:\n ", canal_01.toString());

        //criacao do segundo canal
        const canal_02 = await Canal.adicionarCanal({
            nome: "Julio",
            email: "teste@hotmail.com",
            senha: "321"
        });
        if(!canal_02) return console.error("erro ao criar canal");
        console.log("canal criado com sucesso:\n ", canal_02.toString());

        //criacao do primeiro video
        const video_01 = await Video.adicionarVideo({
            titulo: "gameplay-ep1",
            descricao: "inicio da nossa serie de jogo",
            duracao: 25,
            canal: canal_01._id
        });
        if(!video_01) return console.error("erro ao criar video");
        console.log("video criado com sucesso:\n ", video_01._id.toString());

        //criacao do segundo video
        const video_02 = await Video.adicionarVideo({
            titulo: "gameplay-ep2",
            descricao: "continuacao da nossa serie de jogo",
            duracao: 30,
            canal: canal_01._id
        });
        if(!video_02) return console.error("erro ao criar video");
        console.log("video criado com sucesso:\n ", video_02._id.toString());

        //criacao do terceiro video
        const video_03 = await Video.adicionarVideo({
            titulo: "vlog-ep1",
            descricao: "inicio dos vlogs da viagem",
            duracao: 15,
            canal: canal_02._id
        });
        if(!video_03) return console.error("erro ao criar video");
        console.log("video criado com sucesso:\n ", video_03._id.toString());

        //busca de videos por canal
        const canal_videos = await Video.buscarVideoCanal(canal_01._id);
        console.log("videos encontrados:\n ", canal_videos);

        //todos os videos do banco de dados
        const todos_videos = await Video.buscarTodosVideos();
        console.log("videos encontrados:\n ", todos_videos);

        //atualizar video
        const video_atualizado = await Video.atualizarVideo(video_01._id, {descricao: "inicio da nossa serie de novo jogo", duracao: 30});
        console.log("video atualizado:\n ", video_atualizado);

        //criacao da primeira playlist
        const playlist =  await Playlist.adicionarPlaylist({
            titulo: "serie completa de jogo",
            descricao: "todos os nossos videos da serie do jogo",
            canal: canal_01._id,
            videos: [video_01._id]
        });
        if(!playlist) return console.error("erro ao criar video");
        console.log("playlist criado com sucesso:\n ", playlist);

        //adiciona um video a playlist
        const video_playlist = await Playlist.adicionarVideoPlaylist(playlist._id, video_02._id)
        console.log("playlist modificada:\n ", video_playlist);

        //deletar video de um canak
        const video_deletado = await Video.deletarVideo(video_03._id)
        console.log(video_deletado);
    } catch(err) {
        console.error("erro na funcao main: ", err);
        logError(err);
    } finally {
        await disconnBD();
    }
}

main();