import { Alert, Container, NavItem } from "reactstrap";
import { Table } from "reactstrap";
import axios from "axios";

import { api } from "../../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListarCli = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getClientes = async () => {
        await axios.get(api + "/listaclientes")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Falha na conexão: Sem conexão com a API.'
                })
                // console.log("Erro: Sem conexão com a API.")
            })
    }

    const apagarCliente = async (id) =>{

        const headers={
            'Content-type' : 'application/json'
        }

        await axios.get (api+"/excluircliente/"+ id,{ headers})
        .then((response)=>{
            console.log(response.data.error);
            getClientes();
        }).catch(()=>{
            setStatus({
                type:'error',
                message:'Não foi possível conectar-se à API'
            });
        });
    };


    useEffect(() => {
        getClientes();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar Clientes Cadastrados</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="cadastrarcliente" className="btn btn-outline-primary btn-sm">Cadastrar Cliente</Link>
                    </div>
                </div>
                {status.type == 'error' ? <Alert className="text-center" color="danger"> {status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>Uf</th>
                            <th>Nascimento</th>
                            <th>Cliente Desde</th>
                            <th>Ações</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.endereco}</td>
                                <td>{item.cidade}</td>
                                <td>{item.uf}</td>
                                <td>{item.nascimento}</td>
                                <td>{item.clienteDesde}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-pedido-do-cliente/"+item.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    <span className="btn btn-outline-danger btn-sm mr-2"
                                    onClick={()=> apagarCliente(item.id)}>Excluir</span>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};