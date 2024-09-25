# Front-end IntelBiz

Sistema de ponto de venda desenvolvido para uma empresa ficticia chamada IntelBiz.

O sistema foi pensado e desenvolvido para ajudar a empresa a registrar suas vendas, estoque e também dar uma visão para o empreendedor de quem são os clientes que estão comprando os produtos.

## Como iniciar o servidor (Sem o docker)

    1 - Depois de clonar o repositório do github, navegue até a pasta utilizando o CMD (Prompt de comando ou terminal da sua preferência) ou você pode abrir a pasta do projeto no `Visual Studio Code` e apertar `CTRL + Aspas`. Esse comando abrirá um console que já estará na pasta do projeto.

    2 - Com a pasta do projeto aberta no console, digite `npm install` e aperte ENTER para iniciar a instalação de todos os recursos que são pre-requisitos para que o projeto funcione corretamente.

    3 - Assim que terminar a instalação, no mesmo console, digite `npm start` para iniciar o servidor.

## Como iniciar o servidor (Sem o docker)

    1 - Certifique-se de ter o Docker instalado e em execução em sua máquina.

    2 - Depois de clonar o repositório do github, navegue até a pasta utilizando o CMD (Prompt de comando ou terminal da sua preferência) ou você pode abrir a pasta do projeto no `Visual Studio Code` e apertar `CTRL + Aspas`. Esse comando abrirá um console que já estará na pasta do projeto.

    3 - Execute o seguinte comando para construir a imagem Docker: 
        docker build -t front-end-intelbiz .
    
    4 - Depois que terminar de criar a imagem, basta executar o container executando o comando a seguir:
        docker run -p 3000:3000 front-end-intelbiz

## Acessando o sistema

Para acessar o software depois de ter instalado e iniciado o servidor basta ir no navegador e acessar `http://localhost:3000`

## OBS.:

O sistema consome dados da API IntelBiz e só funcionará corretamente se o servidor do back-end que serve essa APi estiver rodando. Todos os requisitos e instruções de como preparar e inciar o servidor estarão nos links enviados e também deixarei os links no final dessa documentação.

### Links importantes.

Front-end: https://github.com/brunobaumgartner/front-end-intelbiz-react.git
Banck-end: https://github.com/brunobaumgartner/back-end-intelbiz.git
Prototipo: https://www.figma.com/design/xVIYDGn9vWgSDhkfNH4ItK/Untitled?node-id=0-1&t=GWqC8sTJM5Mk0zuf-1
