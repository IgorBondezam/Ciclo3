import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
} from 'reactstrap';

export const Menu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="info" dark expand="md">
                <Container className="d-flex">
                    <NavbarBrand href="/">TI Academy</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <div className="m-auto p-1 d-flex" >
                        <div className="p-1">
                            <a href="/listar-clientes" className=" btn btn-outline-light btn-sm">Clientes</a>
                        </div>
                        <div className="p-1">
                            <a href="/listar-pedidos"
                                className="btn btn-outline-light  btn-sm">Pedidos</a>
                        </div>
                        <div className="p-1">
                            <a href="/listar-item" className=" btn btn-outline-light btn-sm">Itens</a>
                        </div>
                        <div className='p-1'>
                            <a href="/listar-servicos"
                                className="btn btn-outline-light  btn-sm">Serviços</a>
                        </div>
                    </div>

                </Container>
            </Navbar>
        </div>
    )
}