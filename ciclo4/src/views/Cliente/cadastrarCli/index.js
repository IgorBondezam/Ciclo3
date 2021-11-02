import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const CadastrarCli = () => {

    const [cliente, setCliente] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e => setCliente({
        ...cliente, [e.target.name]: e.target.value
    });

    const cadCliente = async e => {
        console.log("Cadastrar");
        e.preventDefault();
        console.log(cliente);

        const headers = {
            'Content-Type': "application/json"
        }

        await axios.post(api + "/clientes", cliente, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: 'Erro: Sem conexão com a API.'
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    })
                }
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: Sem conexão com a API.'
                })
            })
    };

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Cliente</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-clientes" className="btn btn-outline-primary btn-sm">Clientes</Link>
                </div>

            </div>

            <hr className="m-1" />

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCliente}>

            <FormGroup className="p-2">
                    <Label>Nome</Label>
                    <Input type="text" name="nome" placeholder="Nome do cliente"
                        onChange={valorInput} />
                </FormGroup>
                
                <FormGroup className="p-2">
                    <Label>Endereço</Label>
                    <Input type="text" name="endereco" placeholder="Endereço do cliente"
                        onChange={valorInput} />
                </FormGroup>
                
                <FormGroup className="p-2">
                    <Label>Cidade</Label>
                    <Input type="text" name="cidade" placeholder="Cidade do cliente"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Uf</Label>
                    <Input type="text" name="uf" placeholder="Uf do cliente"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Data de Nascimento</Label>
                    <Input type="date" name="nascimento" placeholder="Nascimento do cliente"
                    onChange={valorInput}/>
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Cliente desde</Label>
                    <Input type="date" name="clienteDesde" placeholder="Cliente desde"
                    onChange={valorInput}/>
                </FormGroup>

                <Button type="submit" className="m-2" outline color="success">Cadastrar</Button>
                
            </Form>
        </Container>
    );
};