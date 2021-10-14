const express = require('express');
const cors = require('cors');

const models=require('./models');

const app =express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let itempedido=models.ItemPedido;
let pedido=models.Pedido;
let servico=models.Servico;

app.get('/', function(rec, res){
    res.send('Olá Mundo!')
})
app.post('/clientes', async(req,res)=>{
    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Cliente cadastrado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Foi impossivel se conectar."
        });
    });
})
app.post('/servicos', async(req,res)=>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Serviço criado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Foi impossivel se conectar."
        });
    });
});
app.post('/pedidos', async(req,res)=>{
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Pedido realizado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Foi impossivel se conectar."
        });
    });
})
app.get('/itempedido', async(req, res)=>{
    await itempedido.create({
        quantidade: 3,
        valor: 10.5,
        PedidoId: 1,
        ServicoId: 2,
    });
    res.send("Item do pedido cadastrado!");

})


let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})