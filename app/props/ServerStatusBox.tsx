"use client"

import React, { useState, useEffect, useMemo } from 'react';
import StatusBox from './StatusBox';

// Tipagem
interface ServerStatus {
    online: boolean;
    players: number;
    maxPlayers: number;
    map: string;
}

/* Tipagem simplificada do objeto retornado pela API.
   Alguns dados não são utilizados na página, porém mantidos para caso sejam usados futuramente. */
interface ApiServerStatus {
    name: string;
    map: string;
    tags: string[];
    players: number;
    round_id: string;
    round_start_time: string;
    soft_max_players: number;
}

// Tipagem do objeto principal da API (o que está dentro de servers[])
interface ApiServer {
    address: string;
    statusData: ApiServerStatus;
    // ...outras propriedades que não vamos usar
}

// Definição das constantes
const TARGET_ADDRESS = 'ss14://server.estacaoandromeda.xyz:1212';
const API_URL = 'https://hub.spacestation14.com/api/servers';
const REFRESH_INTERVAL_MS = 30000; // Recarrega a cada 30 segundos

const ServerStatusBox: React.FC = () => {
    const [status, setStatus] = useState<ServerStatus | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Começo da procura
    const fetchServerData = async () => {
        setLoading(true);
        setError(null);
        try
        {
            const response = await fetch(API_URL);
            if (!response.ok) {
                new Error(`Erro HTTP! status: ${response.status}`);
            }

            const servers: ApiServer[] = await response.json();

            // Encontra o servidor alvo pelo endereço IP
            const targetServer = servers.find(server => server.address.includes(TARGET_ADDRESS));

            if (targetServer && targetServer.statusData) {
                const { players, soft_max_players, map } = targetServer.statusData;

                // Atualiza o estado com os dados do servidor
                setStatus({
                    online: true,
                    players: players,
                    maxPlayers: soft_max_players,
                    map: map,
                });
            } else {
                // Servidor não encontrado, mas a API respondeu
                setStatus({ online: false, players: 0, maxPlayers: 0, map: 'Desconhecido' });
                setError(`Servidor com endereço ${TARGET_ADDRESS} não encontrado.`);
            }
        } catch (e) {
            console.error('Error fetching server data:', e);
            // Em caso de erro na requisição (API fora do ar, etc.)
            setStatus({ online: false, players: 0, maxPlayers: 0, map: 'Desconhecido' });
            setError('Erro ao carregar dados do servidor. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    // Efeito para buscar os dados na montagem e configurar o refresh
    useEffect(() => {
        fetchServerData(); // Primeira busca

        const intervalId = setInterval(fetchServerData, REFRESH_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, []);

    // Formação do StatusBox
    const [titleContent, contentContent] = useMemo(() => {
        // Estados de Carregamento ou Erro
        if (loading) {
            return [<>{/*  */}<span className="dot loading"></span> Carregando...</>, 'Buscando dados do servidor...'];
        }

        if (error && !status?.online) {
            return [<><span className="dot error"></span> Offline</>, 'Erro: ' + error];
        }

        // 2. Estado Online (ou Desconhecido)
        const isOnline = status?.online ?? false;
        const dotColor = isOnline ? 'online' : 'offline';
        const titleText = isOnline ? 'Online' : 'Offline';

        const title = (
            <>
                <span className={`dot ${dotColor}`}></span> {titleText}
            </>
        );

        const content = isOnline
            ? `${status!.players} jogadores • ${status!.maxPlayers} slots`
            : '0 jogadores • 0 slots'; // Se offline

        return [title, content];

    }, [status, loading, error]);


    return (
        // Usa o componente base com os dados dinâmicos
        <StatusBox
            title={titleContent}
            content={contentContent}
            className={loading ? 'loading' : ''}
        />
    );
};

export default ServerStatusBox;