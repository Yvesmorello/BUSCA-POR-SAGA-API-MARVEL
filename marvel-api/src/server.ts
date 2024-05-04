import app from "./app";

function main() {
    app.listen(2000, 'localhost', () => {
        console.log('Servidor rodando na porta 2000')
    })
}

main()
