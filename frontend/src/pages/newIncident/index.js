import React, { useEffect, useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewIncident(){
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(event){
        event.preventDefault();
        const data = {
            title, description, value,
        }
        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar novo caso');
        }
    }

    return (
        <div className="new-incident">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastrar Novo Caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                <Link className="black-link" to="/profile">
                    <FiArrowLeft size={16} color="#e02041"/>
                    Voltar Para Home
                </Link>
            </section>
            <form onSubmit={handleNewIncident}>
                <input type="text" placeholder="Título do caso" value={title} onChange={e => setTitle(e.target.value)}/>
                <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <input type="text" placeholder="Valor em Reais" value={value} onChange={e => setValue(e.target.value)}/>
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>
    );
}
