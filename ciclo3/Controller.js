const express = require('express');
const cors = require('cors');

const {Sequelize} = require('./models');

const models=require('./models');

const app =express();
app.use(cors());
app.use(express.json());

let cliente=models.Cliente;
let itempedido=models.ItemPedido;
let pedido=models.Pedido;
let servico=models.Servico;

let compra=models.Compra;
let itemcompra=models.ItemCompra;
let produto=models.Produto;

app.get('/', function(rec, res){
    res.send('Olá Mundo!')
})

//                                     criar clientes 
//                  -------------------------------------------------------------

app.post('/clientes', async(req,res)=>{ //criar clientes
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
});

//                                     criar servicos 
//                  -------------------------------------------------------------

app.post('/servicos', async(req,res)=>{ //criar servicos
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

//                                     criar pedidos 
//                  -------------------------------------------------------------

app.post('/pedidos', async(req,res)=>{ //criar pedidos
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Pedido cadastrado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Não há cliente com esse Id!"
        });
    });
});

//                                     criar itens 
//                  -------------------------------------------------------------

app.post('/itempedidos', async(req,res)=>{ //criar itens
    await itempedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item cadastrado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Não há cliente com esse Id!"
        });
    });
});
//                                                                          fim de Criar
//--------------------------------------------------------------------------------------------------------------------

//                                     listas clientes 
//                  -------------------------------------------------------------

app.get('/listaclientes', async(req, res)=>{//lista de clientes
    await cliente.findAll({
        raw: true,
        order:[["nome", "ASC"]]
    }).then(function(clientes){
        res.json({clientes})
    });
});

app.get('/numeroclientes', async(req, res)=>{ //numero total de clientes
    await cliente.count('id').then(function(clientes){
        res.json({clientes});
    });
});

//                                     listas pedidos 
//                  -------------------------------------------------------------

app.get('/listapedidos', async(req, res)=>{//lista de pedidos
    await pedido.findAll({
        //raw: true
        // order:[['clienteDesde', 'ASC']]
    }).then(function(pedidos){
        res.json({pedidos})
    });
});

app.get('/pedidos/:id', async(req, res)=>{ //lista pedido por id
    await pedido.findByPk(req.params.id,{include:[{all: true}]})
    .then(ped=>{
        return res.json({ped});
    })
} )
app.get('/pedidos/cliente/:ClienteId', async(req, res)=>{ //lista pedido por id
    await pedido.findAll({where: {ClienteId: req.params.ClienteId}})
    .then(ped=>{
        return res.json({ped});
    })
} )
//                                     listas servicos 
//                  -------------------------------------------------------------


app.get('/listaservicos', async(req, res)=>{ //lista de servicos
    await servico.findAll({
        //raw: true
        order:[['id', 'ASC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});

app.get('/ofertaservicos', async(req, res)=>{ //numero total de clientes
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/pedidos/:id/servico', async(req, res)=>{ //lista servicos por id
    await itempedido.findAll({where: {PedidoId: req.params.id}})
    .then(item =>{
        return res.json({
            error: false,
            item
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel conectar"
        });
    });
});

//                                     listas item_pedidos 
//                  -------------------------------------------------------------

app.get('/listaitem', async(req, res)=>{//lista de item
    await itempedido.findAll({
        order:[['PedidoId', 'ASC']]
        //raw: true
    }).then(function(item){
        res.json({item})
    });
});

app.get('/servico/:id/pedidos', async(req, res)=>{ //lista servicos por id
    await itempedido.findAll({where: {ServicoId: req.params.id}})
    .then(item =>{
        return res.json({
            error: false,
            item
        });
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi possivel conectar"
        });
    });
});

// app.get('/item/:id', async(req, res)=>{ //lista item por Pedidoid
//     await itempedido.findByPk(req.params.PedidoId,{include:[{all: true}]})
//     .then(item=>{
//         return res.json({item});
//     })
// } )



//                                                                          fim de listar
//--------------------------------------------------------------------------------------------------------------------


app.put('/atualizaservico', async(req, res)=>{ //atualização de servicos
    await servico.update(req.body,{
        where: {id: req.body.id}
        }).then(function(){
            return res.json({
                error: false,
                message: 'Serviço alterado com sucesso!'
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Erro na alteração"
            });
        });
    });


app.put('/atualizaclientes', async(req, res)=>{ //atualização de clientes
    await cliente.update(req.body,{
        where: {id: req.body.id}
        }).then(function(){
            return res.json({
                error: false,
                message: 'Cliente alterado com sucesso!'
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Erro na alteração"
            });
        });
    });

app.put('/atualizapedidos', async(req, res)=>{ //atualização de pedido
    await pedido.update(req.body,{
        where: {id: req.body.id}
        }).then(function(){
            return res.json({
                error: false,
                message: 'Pedido alterado com sucesso!'
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Erro na alteração"
            });
        });
    });

app.put('/pedidos/:id/editaritem', async(req, res)=>{  //atualização de pedido por Id
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if(!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'pedido não encontrado.'
        });
    };

    if(!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error: true,
            message: 'Serviço não encontrado.'
        });
    };

    await itempedido.update(item, {
        where: Sequelize.and({ServicoId: req.body.ServicoId},
            {PedidoId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: 'Pedido alterado com sucesso!',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi preciso alterar"
        });
    });
});


app.put('/atualizaitem', async(req, res)=>{ //atualização de itens
    await itempedido.update(req.body,{
        where: {PedidoId: req.body.PedidoId}
        }).then(function(){
            return res.json({
                error: false,
                message: 'Item alterado com sucesso!'
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Erro na alteração"
            });
        });
    });

    //                                                                          fim de atualizar
//--------------------------------------------------------------------------------------------------------------------

app.get('/excluircliente/:id', async(req, res)=>{ //Exclui cliente
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir cliente!'
        });
    });
});

app.get('/excluirpedido/:id', async(req, res)=>{ //Exclui pedido
    await pedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Pedido excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir cliente!'
        });
    });
});

app.get('/excluirservico/:id', async(req, res)=>{ //Exclui servico
    await servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir cliente!'
        });
    });
});

app.get('/excluiritem/:Pedidoid', async(req, res)=>{ //Exclui item
    await itempedido.destroy({
        where: {Pedidoid: req.params.Pedidoid}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir cliente!'
        });
    });
});


    //                                              DESAFIO CICLO 3
//--------------------------------------------------------------------------------------------------------------------


//                                     criar compra 
//                  -------------------------------------------------------------


app.post('/compras', async(req,res)=>{ //criar compra
    await compra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Compra cadastrada com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Não há cliente com esse Id!"
        });
    });
});

//                                     criar produto 
//                  -------------------------------------------------------------

app.post('/produtos', async(req,res)=>{ //criar produto
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Produto criado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Foi impossivel se conectar."
        });
    });
});

//                                     criar itens 
//                  -------------------------------------------------------------

app.post('/itemcompra', async(req,res)=>{ //criar itemProduto
    await itemcompra.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Item cadastrado com sucesso!"
            })
        }).catch(function(error){
            return res.status(400).json({
                error: true,
                message: "Não há cliente com esse Id!"
        });
    });
});

//                                                                          fim de Criar
//--------------------------------------------------------------------------------------------------------------------

//                                     listas compras 
//                  -------------------------------------------------------------

app.get('/listacompras', async(req, res)=>{//lista de pedidos
    await compra.findAll({
        //raw: true
        // order:[['clienteDesde', 'ASC']]
    }).then(function(compra){
        res.json({compra})
    });
});

app.get('/compras/:id', async(req, res)=>{ //lista pedido por id
    await compra.findByPk(req.params.id,{include:[{all: true}]})
    .then(compra=>{
        return res.json({compra});
    })
} )

//                                     listas produtos 
//                  -------------------------------------------------------------

app.get('/listaprodutos', async(req, res)=>{ //lista de produtos
    await produto.findAll({
        //raw: true
        order:[['id', 'ASC']]
    }).then(function(produtos){
        res.json({produtos})
    });
});

//                                     listas item 
//                  -------------------------------------------------------------

app.get('/listaitemcompra', async(req, res)=>{//lista de clientes
    await itemcompra.findAll({
        order:[['CompraId', 'ASC']]
        //raw: true
    }).then(function(item){
        res.json({item})
    });
});

// app.get('/itemcompra/:id', async(req, res)=>{ //lista item por compraid
//     await itemcompra.findByPk(req.params.CompraId,{include:[{all: true}]})
//     .then(item=>{
//         return res.json({item});
//     })
// } )

//                                                                          fim de listar
//--------------------------------------------------------------------------------------------------------------------

app.put('/atualizacompra', async(req, res)=>{ //atualização de compra
    await compra.update(req.body,{
        where: {id: req.body.id}
        }).then(function(){
            return res.json({
                error: false,
                message: 'Compra alterada com sucesso!'
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Erro na alteração"
            });
        });
    });

app.put('/compra/:id/editaritem', async(req, res)=>{  //atualização de compra por Id
    const item = {
        quantidade: req.body.quantidade,
        valor: req.body.valor
    };

    if(!await compra.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: 'compra não encontrado.'
        });
    };

    if(!await produto.findByPk(req.body.ProdutoId)){
        return res.status(400).json({
            error: true,
            message: 'Produto não encontrado.'
        });
    };

    await itemcompra.update(item, {
        where: Sequelize.and({ProdutoId: req.body.ProdutoId},
            {CompraId: req.params.id})
    }).then(function(itens){
        return res.json({
            error: false,
            message: 'Compra alterada com sucesso!',
            itens
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: não foi preciso alterar"
        });
    });
});

app.put('/atualizaproduto', async(req, res)=>{ //atualização de produto
    await produto.update(req.body,{
        where: {id: req.body.id}
        }).then(function(){
            return res.json({
                error: false,
                message: 'Produto alterado com sucesso!'
            });
        }).catch(function(erro){
            return res.status(400).json({
                error: true,
                message:"Erro na alteração"
            });
        });
    });

//                                                                          fim de atualizar
//--------------------------------------------------------------------------------------------------------------------

app.get('/excluircompras/:id', async(req, res)=>{ //Exclui compras
    await compra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compra excluida com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir compra!'
        });
    });
});

app.get('/excluirproduto/:id', async(req, res)=>{ //Exclui produto
    await produto.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir produto!'
        });
    });
});

app.get('/excluiritemcompra/:Compraid', async(req, res)=>{ //Exclui item
    await itemcompra.destroy({
        where: {Compraid: req.params.Compraid}
    }).then(function(){
        return res.json({
            error: false,
            message: "Item excluido com sucesso!"
        });
    }).catch(function(){
        return res.status(400).json({
            error: true,
            message: 'Erro ao excluir item!'
        });
    });
});



let port = process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})