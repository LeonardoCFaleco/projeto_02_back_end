import fs from "fs";
import path from "path";

const caminhoLog = path.join("logs", "exceptions.log");

// Certifique-se de que a pasta "logs" existe
if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

export function logError(error) {
    const data = new Date().toISOString();
    const log = `[${data}] ${error.stack || error}\n\n`;
    
    fs.appendFile(caminhoLog, log, (err) => {
        if (err) console.error("Erro ao escrever no arquivo de log:", err);
    });
}