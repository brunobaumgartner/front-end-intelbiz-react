class Buscar {
    constructor() {
        this.LINKS = {
            busca_produtos: 'http://127.0.0.1:5000/produto',
            busca_produto: 'http://127.0.0.1:5000/produto/?nome=',
            busca_clientes: 'http://127.0.0.1:5000/cliente',
            busca_cliente: 'http://127.0.0.1:5000/cliente/?id=',
            busca_proxima_venda: 'http://127.0.0.1:5000/ultima-venda',
            busca_vendas: 'http://127.0.0.1:5000/venda/?cliente_id=',
            busca_dados_tempo: 'https://api.hgbrasil.com/weather?format=json-cors&key=f742b786&user_ip=remote',
            buscar_dolar: 'https://economia.awesomeapi.com.br/last/USD-BRL'
        };
    }

    async busca_produtos() {
        try {
            let url = this.LINKS.busca_produtos;
            const response = await fetch(url, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Erro ao obter dados');
            }
            const dado = await response.json();
            return dado.produtos.map(item => ({
                id: item.id,
                Quantidade: item.quantidade,
                Produto: item.nome,
                Valor: item.valor
            }));
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async  busca_clientes() {
        try {
            let url = this.LINKS.busca_clientes;
            const response = await fetch(url, {
                method: 'get',
            });
            if (!response.ok) {
                throw new Error('Erro ao obter dados');
            }
            const dado = await response.json();
            return dado.clientes.map(item => ({
                id: item.id,
                nome: item.nome,
                endereco: item.endereco,
                telefone: item.telefone
            }));
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async busca_cliente(id) {
        try {
            let url = this.LINKS.busca_cliente + id;
            const response = await fetch(url, {
                method: 'get',
            });
            if (!response.ok) {
                throw new Error('Erro ao obter dados');
            }
            const dado = await response.json();
            return dado.clientes.map(item => ({
                id: item.id,
                nome: item.nome,
                endereco: item.endereco,
                telefone: item.telefone
            }));
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async busca_produto(nome) {
        try {
            let url = this.LINKS.busca_produto + nome;
            const response = await fetch(url, {
                method: 'get',
            });
            if (!response.ok) {
                throw new Error('Erro ao obter dados');
            }
            const dado = await response.json();
            return dado;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async busca_proxima_venda() {
        try {
            let url = this.LINKS.busca_proxima_venda;
            const response = await fetch(url, {
                method: 'get',
            });
            if (!response.ok) {
                throw new Error('Erro ao obter dados');
            }
            const dado = await response.json();
            return dado.venda_ultimo_id+1;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    
    async busca_clima() {
        try {
            let url = this.LINKS.busca_dados_tempo;
            const response = await fetch(url, {
                method: 'get',
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar os dados: ' + response.statusText);
            }
            const resData = await response.json();
            const data = [];
            data['img'] = 'https://assets.hgbrasil.com/weather/icons/conditions/' + resData.results.condition_slug + '.svg';
            data['clima'] = resData.results.description;
            return data;
        } catch(e) {
            console.log('Erro: ' + e);
        }
    }

    async buscar_dolar () {
        try {
            const url = this.LINKS.buscar_dolar;
            const response = await fetch(url, {
                method: 'get',
            });
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados: ' + response.statusText);
            }

            const resData = await response.json();
            return resData;
        } catch(e) {
            console.log('Erro: ' + e);
        }
    }
}

export default Buscar;