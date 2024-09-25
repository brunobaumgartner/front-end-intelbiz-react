class Inserir {
    constructor() {
        this.LINKS = {
            insert_produto_base: 'http://127.0.0.1:5000/produto',
            insert_cliente_base: 'http://127.0.0.1:5000/cliente/',
            insert_venda_base: 'http://127.0.0.1:5000/venda'
        };
    }

    msg(res, msg) {
        if (res.status === 200 || res.status === "200") {    
            alert(msg)
        }
    }

    insert_produto_base = (nome, quantidade, preco) => {
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('quantidade', quantidade);
        formData.append('valor', preco);
        let url = this.LINKS.insert_produto_base;
        fetch(url, {
            method: 'post',
            body: formData
        }).then((res)=>{
            this.msg(res, "Produto inserido com sucesso!");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        return false;
    }

    insert_cliente_base(nome, endereco, telefone) {
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('endereco', endereco);
        formData.append('telefone', telefone);
        let url = this.LINKS.insert_cliente_base;
        fetch(url, {
            method: 'post',
            body: formData
        }).then((res)=>{
            this.msg(res, "Cliente inserido com sucesso!");
        })
        .catch((error) => {
            console.error('Error:', error);
            return false;
        });
    }

    async insert_venda_base(cliente_id, produto_id, quantidade, venda_id) {
        const formData = new FormData();
        console.log(cliente_id, produto_id, quantidade, venda_id)
        formData.append('cliente_id', cliente_id);
        formData.append('produto_id', produto_id);
        formData.append('quantidade', quantidade);
        formData.append('venda_id', venda_id);
        let url = this.LINKS.insert_venda_base;
        fetch(url, {
            method: 'post',
            body: formData
        }).then((res)=>{
            this.msg(res, "Venda finalizada com sucesso!");
        })
        .catch((error) => {
            console.error('Error:', error);
            return false;
        });
    }
}

export default Inserir;