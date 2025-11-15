import app from "./app.js";
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Projeto 2 rodando em http://localhost:${port}`));
