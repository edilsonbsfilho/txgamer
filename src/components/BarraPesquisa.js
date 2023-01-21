import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Games.module.css'

class BarraPesquisa extends React.Component {

    render() {
        return (
            <Navbar bg="secondary" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand  href="#"><span className={styles.brand}>TXGamer</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll />
                <Form className="d-flex">
                    <Form.Control
                    id='txtName'
                    type="search"
                    placeholder="Digite o nome do jogo"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="dark" onClick={() => 
                        this.props.owner.buscarGame(document.getElementById('txtName').value)}>Pesquisar</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        );
    }
}

export default BarraPesquisa;