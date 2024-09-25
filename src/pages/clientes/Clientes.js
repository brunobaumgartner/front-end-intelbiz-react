import React, { useEffect } from "react";
import DefaultButton from "../../components/common/DefaultButton";
import DefaultSelect from "../../components/common/DefaultSelect";
import DefaultTable from "../../components/common/DefaultTable";
import FormContainer from "../../components/layout/FormContainer";
import DefaultInput from "../../components/common/DefaultInput";
import Header from "../../components/layout/Header";
import Buscar from "../../scripts/Buscar.js";
import Inserir from "../../scripts/Inserir.js";
import Deletar from "../../scripts/Deletar.js";
import "./Clientes.css";
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const buscar = new Buscar();
const inserir = new Inserir();
const deletar = new Deletar();

export default function Clientes() {

    const [show, setShow] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [inputData, setInputData] = useState([]);
    const [nomeCliente, setNomeCliente] = useState('');
    const [enderecoCliente, setEnderecoCliente] = useState('');
    const [valorCliente, setValorCliente] = useState('');
    const [filtroCliente, setFiltroCliente] = useState('');
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);





    const busca_clientes = () => {
        buscar.busca_clientes()
            .then(clientes => {
                const formattedData = clientes.map(item => ({
                    id: item.id,
                    keyDelete: item.id,
                    data: [item.id, item.nome, item.endereco, item.telefone]
                }));
                setTableData(formattedData);

                const listClientes = clientes.map(item => ({
                    id: item.id,
                    value: item.nome
                }))
                setInputData(listClientes);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function busca_cliente(id) {
        buscar.busca_cliente(id)
            .then(clientes => {
                const formattedData = clientes.map(item => ({
                    id: item.id,
                    keyDelete: item.id,
                    data: [item.id, item.nome, item.endereco, item.telefone]
                }));
                setTableData(formattedData);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        if (!filtroCliente) {
            busca_clientes()
        } else {
            busca_cliente(filtroCliente);
        }
    }, [filtroCliente]);



    function insereValores() {
        inserir.insert_cliente_base(nomeCliente, enderecoCliente, valorCliente);
        window.location.reload(true);
    }

    const deletaCliente = (Cliente) => {
        deletar.delete_cliente(Cliente);
        window.location.reload(true);
    }

    const table_header = ['#', 'NOME', 'ENDEREÇO', 'TELEFONE', ''];

    return (
        <>
            <Header page='Clientes' />
            <FormContainer>
                <Modal show={show} onHide={handleClose}>
                    <Form>
                        <Modal.Header>
                            <Modal.Title>CADASTRAR CLIENTES</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <DefaultInput label = 'NOME' onChange={(e)=>setNomeCliente(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <DefaultInput label = 'ENDEREÇO' onChange={(e)=>setEnderecoCliente(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <DefaultInput label = 'TELEFONE' onChange={(e)=>setValorCliente(e.target.value)} required />
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <DefaultButton label='FECHAR' onClick={handleClose} id='buscar' />
                            <DefaultButton label='SALVAR' onClick={insereValores} id='buscar' />
                        </Modal.Footer>
                    </Form>
                </Modal>
                <DefaultSelect opcoes={inputData} label='CLIENTE' id='select_clientes' onChange={(e)=>setFiltroCliente(e.target.value)} />
                <div id="div_botoes">
                    <DefaultButton label='CADASTRAR' onClick={handleShow} id='teste' />
                </div>
            </FormContainer>
            <DefaultTable aHeader={table_header} aDados={tableData} id='table_clientes' onButtonClick = {deletaCliente} />
            
        </>
    )
}