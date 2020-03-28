import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles.js';
import api from '../../services/api';

export default function Incidents(){
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); //usado para evitar que o node cancele uma requisição em andamento para realizar outra
    /*
        Imagine que estão sendo carregados incidents e o usuário fica puxando a tela pra cima pra carregar logo, isso vai gerar novas requisições 
        e cancelar as anteriores, logo nada vai carregar. Por isso, precisa do loading e dos ifs no loadIncidents()
    */

    function navigateToDetail(incident){
        //A rota deve conter exatamente a mesma string de NAME do arquivo routes.js da pasta mobile
        navigation.navigate('Detail', { incident }); //Vai navegar para a rota Detail e enviar um incident para a mesma
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: {page}
        });
        //setIncidents(incidents.response.data); //Todas vez que carregar os resultados, substituir o que já existe na página
        setIncidents([...incidents, ...response.data.incidents]); // Ao invés de substituir o que já existe, irá anexar os novos resultado aos existentes
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total}</Text>
                </Text>
            </View>

            <Text style={styles.title}>
                Bem-Vindo!
            </Text>

            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia
            </Text>

            <FlatList 
                data={incidents} //quantos elementos terá
                style={styles.incidentsList}
                keyExtractor={incident => String(incident.id)} //Diz ao flat list o que usar como identificador para cada item da lista
                showsVerticalScrollIndicator={false} //Esconde o scroll verical
                //Renderiza o jsx, por isso deve-se usar () ao invés de {} após o =>
                onEndReached={loadIncidents} //Alerta o node que quando o usuário chegar ao final da lista, deve carregar novos itens
                onEndReachedThreshold={0.2} //Define a qual distância do final da lista deve buscar novos itens. (0.2 == 20% de distância do final) 
                renderItem={({ item: incident }) => ( //a função vai receber os dados de incidents e jogar dentro de item, item pode ser referenciado como incident
                    <View style={styles.incident}> 
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>Caso:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver Mais Detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}