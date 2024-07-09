class Deletar {
    constructor() {
        this.LINKS = {
            delete_produto: 'http://127.0.0.1:5000/produto?nome=',
            delete_cliente: 'http://127.0.0.1:5000/cliente?id=',
        };
    }

    delete_produto(nome) {
        if (window.confirm('Deseja excluir o produto?')) {
            let url = this.LINKS.delete_produto + nome;
            fetch(url, {
                method: 'delete'
            })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    delete_cliente(telefone) {
        if (window.confirm('Deseja excluir o cliente?')) {
            let url = this.LINKS.delete_cliente + telefone;
            fetch(url, {
                method: 'delete'
            })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }
}

export default Deletar;