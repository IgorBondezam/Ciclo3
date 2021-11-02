import axios from "axios";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarServ = () => {


    const [dados, setDados] = useState([]);
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');

    const valorInputId = e => setId({
        ...id, [e.target.name]: e.target.value
    });
    const valorInputNome = e => setNome({
        ...nome, [e.target.name]: e.target.value
    });
    const valorInputDesc = e => setDescricao({
        ...descricao, [e.target.name]: e.target.value
    });


    const [status, setStatus] = useState({
        type: '',
        messege: ''
    });

    const edtServ = async e => {
        // e.preventDefault();

        const headers = {
            'Content-Type' : 'application/json'
        }
        await axios.put(api + "/atualizaservico", { id, nome, descricao }, { headers })
            .then((response) => {
                console.log(response.dados.message)
            }).catch(() => {
                console.log('Erro: sem conexão com a API')
            });

    }

    useEffect(() => {
        edtServ();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <h1>Editar Serviço</h1>
                </div>
                <hr className="m-1" />
                {status.type === "error" ? <Alert color="danger">{status.message}</Alert>
                    : ""
                }
                {status.type === "success" ? <Alert color="success">{status.message}</Alert>
                    : ""
                }
                <Form className="p-2" onSubmit={edtServ}>
                    <FormGroup className='p-2'>
                        <Label>
                            Id
                        </Label>
                        <Input
                            name="id"
                            placeholder="inserir o Id do Serviço que deseja atualizar"
                            type="text"
                            onChange={valorInputId}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Nome
                        </Label>
                        <Input
                            name="nome"
                            placeholder="informar o nome do serviço"
                            type="text"
                            onChange={valorInputNome}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Descrição
                        </Label>
                        <Input
                            name="descricao"
                            placeholder="Nova descrição do Serviço"
                            type="text"
                            onChange={valorInputDesc}
                        />
                    </FormGroup>
                    <Button className="m-3" type="submit" outline color="warning">
                        Alterar
                    </Button>
                    <Button type="reset" outline color="success">
                        Limpar
                    </Button>
                </Form>
            </Container>
        </div>
    )
}