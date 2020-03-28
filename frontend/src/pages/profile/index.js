import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from  '../../services/api';

export default function Profile(){
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    
    //Busca os casos da empresa logada
    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization : ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, []);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization : ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(err){
            alert("Erro ao deletar o caso");
        }
    }

    async function handleLogout(){
        try {
            localStorage.clear();
            history.push('/');
        } catch (err) {
            
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem-Vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar Novo Caso</Link>
                <button type="button" onClick={handleLogout}><FiPower/></button>
            </header>
            <h1>Casos Cadastrados</h1>
                <ul>
                    {incidents.map(incident => (
                        <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>
                        <strong>Descrição</strong>
                        <p>{incident.description}</p>
                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style : 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}><FiTrash2 size={20} color="#a8a83e"/></button>
                    </li>
                    ))}
                </ul>
        </div>
    );
}
