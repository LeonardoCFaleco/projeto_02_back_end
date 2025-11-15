# Projeto 2
---
## 🚀 Como rodar o Projeto 2
npm run dev

Conexao com o banco de dados bem sucedida
Projeto 2 rodando em http://localhost:3000

GET http://localhost:3000/api/health

## 🔧 Testes com cURL (PowerShell/Windows)

### 1) Healthcheck (pública)
```powershell
curl http://localhost:3000/api/health
```

### 2) AUTH
**Registrar canal**
```powershell
curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"nome\":\"Canal X\",\"email\":\"x@x.com\",\"senha\":\"123\"}"
```

**Login (salva cookie)**
```powershell
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -c cookie.txt ^
  -d '{\"email\":\"x@x.com\",\"senha\":\"123\"}'
```

**Me (ver sessão)**
```powershell
curl http://localhost:3000/api/auth/me -b cookie.txt
```

**Logout**
```powershell
curl -X POST http://localhost:3000/api/auth/logout -b cookie.txt
```

### 3) VÍDEOS (CRUD) — autenticado
**Criar vídeo**
```powershell
curl -X POST http://localhost:3000/api/videos ^
  -H "Content-Type: application/json" -b cookie.txt ^
  -d "{\"titulo\":\"Video 1\",\"descricao\":\"Primeiro vídeo\",\"duracao\":120}"
```

**Listar vídeos**
```powershell
curl http://localhost:3000/api/videos -b cookie.txt
```

**Obter por ID**
```powershell
curl http://localhost:3000/api/videos/VID -b cookie.txt
```

**Atualizar (ex.: descrição)**
```powershell
curl -X PUT http://localhost:3000/api/videos/VID ^
  -H "Content-Type: application/json" -b cookie.txt ^
  -d "{\"descricao\":\"Descrição atualizada\"}"
```

**Deletar**
```powershell
curl -X DELETE http://localhost:3000/api/videos/VID -b cookie.txt
```

### 4) PLAYLISTS (CRUD + add/remover vídeo) — autenticado
**Criar playlist**
```powershell
curl -X POST http://localhost:3000/api/playlists ^
  -H "Content-Type: application/json" -b cookie.txt ^
  -d "{\"titulo\":\"Minha playlist\",\"descricao\":\"Testes\"}"
```

**Listar minhas playlists**
```powershell
curl http://localhost:3000/api/playlists -b cookie.txt
```

**Obter playlist por ID**
```powershell
curl http://localhost:3000/api/playlists/PL -b cookie.txt
```

**Atualizar playlist**
```powershell
curl -X PUT http://localhost:3000/api/playlists/PL ^
  -H "Content-Type: application/json" -b cookie.txt ^
  -d "{\"descricao\":\"Nova descrição\"}"
```

**Adicionar vídeo à playlist**
```powershell
curl -X POST http://localhost:3000/api/playlists/PL/videos/VID -b cookie.txt
```

**Remover vídeo da playlist**
```powershell
curl -X DELETE http://localhost:3000/api/playlists/PL/videos/VID -b cookie.txt
```

**Deletar playlist**
```powershell
curl -X DELETE http://localhost:3000/api/playlists/PL -b cookie.txt
```

### 5) CANAL (perfil) — autenticado
**Ver meu canal**
```powershell
curl http://localhost:3000/api/canais/me -b cookie.txt
```

**Atualizar meu canal**
```powershell
curl -X PUT http://localhost:3000/api/canais/me ^
  -H "Content-Type: application/json" -b cookie.txt ^
  -d "{\"nome\":\"Novo Nome\"}"
```

**Deletar minha conta**
```powershell
curl -X DELETE http://localhost:3000/api/canais/me -b cookie.txt
```
