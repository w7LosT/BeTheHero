import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css'
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(event){
        event.preventDefault();
        try{
            const response = await api.post('session', {id});
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch(err){
            alert("Erro ao efetuar login");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input type="text" placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button type="submit" className="button">Entrar</button>
                    <Link className="black-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não Tenho Cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Imagem Heroes"/>
        </div>
    );
}