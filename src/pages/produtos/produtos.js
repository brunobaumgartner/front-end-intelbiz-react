import React, { useEffect } from "react";
import DefaultButton from "../../components/common/DefaultButton";
import DefaultSelect from "../../components/common/DefaultSelect";
import DefaultTable from "../../components/common/DefaultTable";
import DefaultInput from "../../components/common/DefaultInput"
import FormContainer from "../../components/layout/FormContainer";
import Buscar from "../../scripts/Buscar.js";
import Inserir from "../../scripts/Inserir.js";
import Deletar from "../../scripts/Deletar.js";
import Header from "../../components/layout/Header";
import "./Produtos.css";
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const buscar = new Buscar();
const inserir = new Inserir();
const deletar = new Deletar();

export default function Produtos() {
    const [show, setShow] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [inputData, setInputData] = useState([]);
    const [nomeProduto, setnomeProduto] = useState('');
    const [quantProduto, setQuantProduto] = useState('');
    const [valorProduto, setValorProduto] = useState('');
    const [filtroProduto, setFiltroProduto] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const busca_produtos = () => {
        buscar.busca_produtos()
            .then(produtos => {
                const formattedData = produtos.map(item => ({
                    id: item.id,
                    keyDelete: item.Produto,
                    data: [item.Produto, item.Quantidade, item.Valor]
                }));
                setTableData(formattedData);

                const listProdutos = produtos.map(item => ({
                    id: item.Produto,
                    value: item.Produto
                }))
                setInputData(listProdutos);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function busca_produto(nome) {
        buscar.busca_produto(nome)
            .then(res => {
                var produtos = res.produtos
                const formattedData = produtos.map(item => ({
                    id: item.id,
                    keyDelete: item.nome,
                    data: [item.nome, item.Quantidade, item.Valor]
                }));
                setTableData(formattedData);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        if (!filtroProduto) {
            busca_produtos()
        } else {
            busca_produto(filtroProduto);
        }
    }, [filtroProduto]);

    function insereValores() {
        inserir.insert_produto_base(nomeProduto, quantProduto, valorProduto);
        window.location.reload(true);
    }

    const deletaProduto = (Produto) => {
        deletar.delete_produto(Produto);
        window.location.reload(true);
    }

    const table_header = ['PRODUTOS', 'QUANTIDADE', 'VALOR', ''];
    return (
        <>
        <Header page='Produtos' />
        <FormContainer>
            <Modal show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header>
                        <Modal.Title>CADASTRAR PRODUTOS</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <DefaultInput id='nome_produto_modal' label = 'PRODUTO' onChange={(e)=>setnomeProduto(e.target.value)} step="0.01" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <DefaultInput type="number" id='quant_produto_modal' label = 'QUANTIDADE' onChange={(e)=>setQuantProduto(e.target.value)} step="0.01" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <DefaultInput type="number" id='valor_produto_modal' label = 'VALOR' onChange={(e)=>setValorProduto(e.target.value)} step="0.01" />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <DefaultButton label='FECHAR' onClick={handleClose} id='buscar' />
                        <DefaultButton label='SALVAR' onClick={insereValores} id='buscar' />
                    </Modal.Footer>
                </Form>
            </Modal>
            <DefaultSelect opcoes={inputData} label='PRODUTO' id='select_produtos' onChange={(e)=>setFiltroProduto(e.target.value)} />
            <div id="div_botoes">
                <DefaultButton label='CADASTRAR' onClick={handleShow} id='teste' />
            </div>
        </FormContainer>
        <DefaultTable aHeader={table_header} aDados={tableData} id='table_produtos' onButtonClick = {deletaProduto} />
        
        </>
    )
}