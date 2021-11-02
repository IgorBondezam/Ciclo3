import { Alert, Container, NavItem } from "reactstrap";
import { Table } from "reactstrap";
import axios from "axios";

import { api } from "../../../config";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListarServ = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });
    const getServicos = async () => {
        await axios.get(api + "/listaservicos")
            .then((response) => {
                console.log(response.data.servicos);
                setData(response.data.servicos);
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Falha na conexão: Sem conexão com a API.'
                })
                // console.log("Erro: Sem conexão com a API.")
            })
    }

    const apagarServico = async (id) => {
        await axios.get(api + "/excluirservico/" + id)
            .then((response) => {
                console.log(response.data.error);
                getServicos();
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Falha na conexão: Sem conexão com a API.'
                });
            });
    };

    useEffect(() => {
        getServicos();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações do serviço</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="cadastrarservico" className="btn btn-outline-primary btn-sm ">Cadastrar Serviço</Link>
                        <Link to="/atualizar-servico/" className="btn btn-outline-warning  btn-sm">Editar Serviço</Link>
                    </div>
                </div>
                {status.type == 'error' ? <Alert className="text-center" color="danger"> {status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-pedido/" + item.id}
                                        className="btn btn-outline-primary btn-sm">Consultar</Link>
                                    <span className="btn btn-outline-danger btn-sm mr-2"
                                        onClick={() => apagarServico(item.id)}>Excluir</span>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};