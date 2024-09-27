import React, { useEffect, useState, useCallback } from "react";
import DefaultButton from "../../components/common/DefaultButton";
import DefaultTable from "../../components/common/DefaultTable";
import DefaultInput from "../../components/common/DefaultInput";
import DefaultSelect from "../../components/common/DefaultSelect";
import FormContainer from "../../components/layout/FormContainer";
import Header from "../../components/layout/Header";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "./Vendas.css";

import Buscar from "../../scripts/Buscar.js";
import Inserir from "../../scripts/Inserir.js";

const buscar = new Buscar();
const inserir = new Inserir();

export default function Vendas() {
    const [show, setShow] = useState(false);
    const [inputDataClientes, setInputDataClientes] = useState([]);
    const [inputDataProdutos, setInputDataProdutos] = useState([]);
    const [tableData, setTableData] = useState([]);

    const [cliente, setCliente] = useState('');
    const [produto, setProduto] = useState('');
    const [idProduto, setIdProduto] = useState('');
    const [quantProduto, setQuantProduto] = useState('');
    const [valorProduto, setValorProduto] = useState('');
    const [valorPago, setValorPago] = useState('');
    const [valorTroco, setValorTroco] = useState('');
    const [valorProdutoTot, setValorProdutoTot] = useState('');
    const [valorCarrinhoTot, setValorCarrinhoTot] = useState('');
    const [buscaProduto, setBuscaProduto] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const busca_clientes = useCallback(() => {
        buscar.busca_clientes()
            .then(clientes => {
                const listClientes = clientes.map(item => ({
                    id: item.id,
                    value: item.nome
                }));
                setInputDataClientes(listClientes);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const busca_produtos = useCallback(() => {
        buscar.busca_produtos()
            .then(produtos => {
                const listProdutos = produtos.map(item => ({
                    id: item.id,
                    value: item.Produto
                }));
                console.log(produtos)
                setInputDataProdutos(listProdutos);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const busca_produto = useCallback((nome) => {
        buscar.busca_produto(nome)
            .then(res => {
                var produtos = res.produtos;
                const formattedData = produtos.map(item => ({
                    id: item.id,
                    keyDelete: item.nome,
                    data: [item.nome, item.quantidade, item.valor]
                }));
                setBuscaProduto(formattedData);
                setValorProduto(produtos[0].valor);
                setValorProdutoTot((produtos[0].valor * quantProduto).toFixed(2));
            })
            .catch(error => {
                console.error(error);
            });
    }, [quantProduto]);

    const get_carrinho = useCallback(() => {
        var produto = [];
        var total_carrinho = 0.0;
        for (let i = 0; i < localStorage.length; i++) {
            let chave = localStorage.key(i);
            if (chave !== 'contador') {
                let item = JSON.parse(localStorage.getItem(chave));
                produto.push({
                    id: chave,
                    keyDelete: chave,
                    data: [item.nome_produto, item.quantidade, item.valor_total]
                });
                total_carrinho += parseFloat(item.valor_total);
            }
        }
        setValorCarrinhoTot(total_carrinho.toFixed(2));
        setTableData(produto);
    }, []);

    const insert_venda = useCallback(() => {
        for (let i = 0; i < localStorage.length; i++) {
            let chave = localStorage.key(i);
            if (chave !== 'contador') {
                let item = JSON.parse(localStorage.getItem(chave));
                inserir.insert_venda_base(item.id_cliente, item.id_produto, item.quantidade, item.id_venda);
            }
        }
        localStorage.clear();
        handleClose();
        setTableData([]);
    }, []);

    const insert_carrinho = useCallback(() => {
        var contador = localStorage.getItem('contador');
        contador = (!contador) ? 1 : parseInt(contador) + 1;
        localStorage.setItem('contador', contador);
        buscar.busca_proxima_venda().then((dado) => {
            const carrinho = {
                id: contador,
                id_venda: dado,
                nome_produto: buscaProduto[0].data[0],
                id_produto: idProduto,
                nome_cliente: inputDataClientes[cliente - 1].value,
                id_cliente: cliente,
                quantidade: quantProduto,
                valor_produto: valorProduto,
                valor_total: valorProdutoTot
            };
            localStorage.setItem(contador, JSON.stringify(carrinho));
        }).then(() => {
            get_carrinho();
        });
    }, [buscaProduto, idProduto, cliente, quantProduto, valorProduto, valorProdutoTot, inputDataClientes, get_carrinho]);

    const calcula_troco = useCallback(() => {
        setValorTroco((valorPago - valorCarrinhoTot).toFixed(2));
    }, [valorPago, valorCarrinhoTot]);

    useEffect(() => {
        busca_clientes();
        busca_produtos();
        get_carrinho();

        if (produto) {
            busca_produto(produto);
        } else if (valorPago) {
            calcula_troco();
        }
    }, [produto, valorProduto, quantProduto, valorPago, busca_clientes, busca_produtos, get_carrinho, busca_produto, calcula_troco]);

    const deleta_produto = useCallback((produto) => {
        localStorage.removeItem(produto);
        get_carrinho();
    }, [get_carrinho]);

    const table_header = ['PRODUTOS', 'QUANTIDADE', 'VALOR', ''];

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Form>
                    <Modal.Header>
                        <Modal.Title>FINALIZAR VENDA</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <DefaultInput id='modal_valor_total' label='VALOR' value={valorCarrinhoTot} desabilitar={true} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <DefaultInput type="number" id='modal_valor_pago' label='PAGO' onChange={(e) => setValorPago(e.target.value)} step="0.01" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <DefaultInput type="number" id='modal_troco' label='TROCO' value={valorTroco} onChange={(e) => setValorProduto(e.target.value)} step="0.01" desabilitar={true} />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <DefaultButton label='FECHAR' onClick={handleClose} id='buscar' />
                        <DefaultButton label='SALVAR' onClick={insert_venda} id='buscar' />
                    </Modal.Footer>
                </Form>
            </Modal>

            <Header page='Vendas' />
            <FormContainer id='form_container_vendas'>
                <DefaultSelect opcoes={inputDataClientes} id='select_clientes' label='CLIENTE' onChange={(e) => setCliente(e.target.value)} />
                <DefaultSelect opcoes={inputDataProdutos} id='select_produtos' label='PRODUTO' onChange={(e) => {
                                                                                                            setProduto(e.target.options[e.target.selectedIndex].text); 
                                                                                                            setIdProduto(e.target.value) }}  />
                <DefaultInput id='input_quant' label='QUANTIDADE' onChange={(e) => setQuantProduto(e.target.value)} />
                <DefaultInput id='input_valor' label='VALOR' value={valorProduto} onChange={(e) => setValorProduto(e.target.value)} desabilitar={true} />
                <DefaultInput id='input_total' label='TOTAL' value={valorProdutoTot} onChange={(e) => setValorProdutoTot(e.target.value)} desabilitar={true} />
                <div id="div_botoes">
                    <DefaultButton label='ADICIONAR' onClick={insert_carrinho} id='buscar' />
                    <DefaultButton label='CONCLUIR' onClick={handleShow} id='buscar' />
                </div>
            </FormContainer>
            <DefaultTable aHeader={table_header} aDados={tableData} id='table_clientes' onButtonClick={deleta_produto} />
        </>
    );
}
