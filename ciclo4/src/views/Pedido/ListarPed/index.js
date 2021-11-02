import { Alert, Container, NavItem } from "reactstrap";
import { Table } from "reactstrap";
import axios from "axios";

import { api } from "../../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListarPed = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getPed = async () => {
        await axios.get(api + "/listapedidos")
            .then((response) => {
                console.log(response.data.pedidos);
                setData(response.data.pedidos);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
                // console.log("Erro: Sem conexão com a API.")
            });
    };
    const apagarPedido = async (id) => {

        const headers={
            'Content-type' : 'application/json'
        };

        await axios.get(api + '/excluirpedido/'+ id, {headers})
            .then((response) => {
                console.log(response.data.item);
                getPed();
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
            });
    };


    useEffect(() => {
        getPed();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações de Pedidos </h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="cadastrarpedido" className="btn btn-outline-primary btn-sm">Cadastrar Pedido</Link>
                    </div>
                </div>
                {status.type == 'error' ? <Alert className="text-center" color="danger"> {status.message}   </Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>ClienteId</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.data}</td>
                                <td>{item.ClienteId}</td>
                                <td className="text-center/">
                                    <Link to={"/listarpedido/" + item.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    <span className="btn btn-outline-danger btn-sm mr-2"
                                        onClick={() => apagarPedido(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};