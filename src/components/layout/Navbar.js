import React from 'react';
import { Link } from 'react-router-dom';
import vendas from '../../assets/imagens/vendas_icon.png'
import produtos from '../../assets/imagens/produtos_icon.png'
import clientes from '../../assets/imagens/clientes_icon.png'
import '../../assets/styles/Navbar.css'

export default function Navbar() {
    return (
        <nav>
            <ul class="nav flex-column ">
                <li class="nav-item">
                    <Link to='/' class="nav-link" >
                        <img src={vendas} alt='Vendas' title='Vendas' class="btn btn-light"/>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to='/produtos' class="nav-link" >
                        <img src={produtos} alt='Produtos' title='Produtos' class="btn btn-light"/>
                    </Link>
                </li>
                <li class="nav-item">
                    <Link to='/clientes' class="nav-link" >
                    <img src={clientes} alt='Clientes' title='Clientes' class="btn btn-light"/>
                    </Link>
                </li>
            </ul>
            
        </nav>
    );
}
