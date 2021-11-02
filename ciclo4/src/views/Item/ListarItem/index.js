import { Alert, Container, NavItem } from "reactstrap";
import { Table } from "reactstrap";
import axios from "axios";

import { api } from "../../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListarItem = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getItens = async () => {
        await axios.get(api + "/listaitem")
            .then((response) => {
                console.log(response.data.item);
                setData(response.data.item);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Falha na conexão: Sem conexão com a API.'
                })
                // console.log("Erro: Sem conexão com a API.")
            })
    }

    const apagarItem = async (PedidoId) => {
        await axios.get(api + "/excluiritem/" + PedidoId)
            .then((response) => {
                console.log(response.data.error);
                getItens();
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Falha na conexão: Sem conexão com a API.'
                });
            });
    };

    useEffect(() => {
        getItens();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações dos Itens</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="cadastraritem" className="btn btn-outline-primary btn-sm">Cadastrar Itens</Link>
                    </div>
                </div>
                {status.type == 'error' ? <Alert className="text-center" color="danger"> {status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>PedidoId</th>
                            <th>ServiçoId</th>
                            <th>Valor</th>
                            <th>Quantidade</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.PedidoId}>
                                <td>{item.PedidoId}</td>
                                <td>{item.ServicoId}</td>
                                <td>{item.valor}</td>
                                <td>{item.quantidade}</td>
                                <td className="text-center/">
                                    <span className="btn btn-outline-danger btn-sm mr-2"
                                        onClick={() => apagarItem(item.PedidoId)}>Excluir</span>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};