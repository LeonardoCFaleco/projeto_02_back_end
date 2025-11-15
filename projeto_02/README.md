# Projeto 2 — Streaming de Vídeos (API Express)

Reaproveita **as classes/models do Projeto 1** sem alterá‑las. O Projeto 2 expõe uma API REST com **login via sessão**, **validação de campos** e **casos de uso** de Canais, Vídeos e Playlists.

## Como rodar

1. Certifique‑se de que o diretório `projeto_01/` (com `models/` e `services/`) está ao lado deste `projeto_02/`.
2. Crie um arquivo `.env` baseado no `.env.example`.
3. Instale as dependências:
   ```bash
   npm i
   ```
4. Inicie:
   ```bash
   npm run dev
   ```

## Rotas Principais

- `POST /api/auth/register` — cria canal `{ nome, email, senha }`
- `POST /api/auth/login` — autentica `{ email, senha }` e abre sessão
- `POST /api/auth/logout` — encerra sessão
- `GET /api/auth/me` — devolve usuário logado

- `GET /api/videos` — lista (auth)
- `POST /api/videos` — cria vídeo `{ titulo, descricao, duracao }` (auth)
- `GET /api/videos/:id` — obtém vídeo (auth)
- `PUT /api/videos/:id` — atualiza (auth)
- `DELETE /api/videos/:id` — remove (auth)

- `GET /api/playlists` — lista playlists do canal logado (auth)
- `POST /api/playlists` — cria playlist `{ titulo, descricao? }` (auth)
- `GET /api/playlists/:id` — obtém playlist (auth)
- `PUT /api/playlists/:id` — atualiza (auth)
- `DELETE /api/playlists/:id` — remove (auth)
- `POST /api/playlists/:id/videos/:videoId` — **adiciona** vídeo
- `DELETE /api/playlists/:id/videos/:videoId` — **remove** vídeo

- `GET /api/canais/me` — perfil do canal logado
- `PUT /api/canais/me` — atualiza `{ nome?, senha? }`
- `DELETE /api/canais/me` — apaga conta

> Por simplicidade, as senhas são comparadas **em texto simples**, exatamente como no Projeto 1. Em produção, substitua por hash (bcrypt).

## Mínimas alterações no Projeto 1
- Nenhuma modificação nos arquivos do P1 é necessária.
- O P2 apenas **importa** `services/db.js` e registra os models de `models/` usando `await import(...)` ANTES das rotas.
- O arquivo `projeto_01/index.js` **não é utilizado** no P2.

## Observações de Avaliação
- **Express + Rotas + Sessão** (login) implementados.
- **Validação** de campos com Joi e respostas de erro claras.
- **Casos de uso** do tema *streaming de vídeos* cobertos (canais, vídeos, playlists).
