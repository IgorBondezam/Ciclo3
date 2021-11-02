import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const CadastrarItem = () => {

    const [item, setItem] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e => setItem({
        ...item, [e.target.name]: e.target.value
    });

    const cadItem = async e => {
        console.log("Cadastrar");
        e.preventDefault();
        console.log(item);

        const headers = {
            'Content-Type': "application/json"
        }

        await axios.post(api + "/itempedidos", item, { headers })
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
                    <h1>Cadastrar Item</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-item" className="btn btn-outline-primary btn-sm">Itens</Link>
                </div>

            </div>

            <hr className="m-1" />

            {status.type ==='error' ? <Alert color="danger">{status.message}</Alert> : ""}

            {status.type ==='success' ? <Alert color="success">{status.message}</Alert>: ""}

            <Form className="p-2" onSubmit={cadItem}>
                <FormGroup className="p-2">
                    <Label>Pedido Id</Label>
                    <Input type="text" name="PedidoId" placeholder="Id do pedido que será cadastrado"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Serviço Id</Label>
                    <Input type="text" name="ServicoId" placeholder="Id do serviço que será necessário "
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Valor</Label>
                    <Input type="text" name="valor" placeholder="Valor do serviço"
                        onChange={valorInput} />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>Quantidade</Label>
                    <Input type="text" name="quantidade" placeholder="Quantidade de serviços"
                        onChange={valorInput} />
                </FormGroup>

                <Button type="submit" outline color="success">Cadastrar</Button>
            </Form>
        </Container>
    );
};