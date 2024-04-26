import { server } from "typescript";
import app from "./app";
import mongoose from "mongoose";

function main() {
    app.listen(1000, 'localhost', () => {
        console.log('Servidor rodando na porta 1000')
    })
}

main()