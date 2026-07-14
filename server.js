const express = require("express");
const Redis = require("ioredis");
const path = require("path");

const app = express();

const redis = new Redis({
    host: "redis",
    port: 6379
});

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/valor", async (req, res) => {

    try {

        const valor = req.body.valor;

        await redis.set("valor", valor);

        res.status(200).json({
            mensagem: "Valor salvo com sucesso!"
        });

    } catch (erro) {

        res.status(500).json({
            mensagem: "Erro ao salvar o valor."
        });

    }

});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});