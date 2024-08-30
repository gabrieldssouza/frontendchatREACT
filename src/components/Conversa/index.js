import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function Conversa() {
    const [conversas, setConversas] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState('');
    const token = localStorage.getItem('token');
    const nick = localStorage.getItem('nick');
    const idUser = localStorage.getItem('idUser');
    const idsala = localStorage.getItem('idsala');
    const timestamp = localStorage.getItem('timestamp'); 
    console.log("idUser: ", idUser+" token: "+token+" nick: "+nick+" idsala: "+idsala+" timestamp: "+timestamp);

    useEffect(() => {
        const listarConversas = async () => {
            try {
                const response = await api.get('/sala/listar', {
                    headers: {
                        'token': token,
                        'nick': nick,
                        'iduser': idUser,
                        'idsala': idsala,
                        'timestamp': '1724868643067'
                    }
                });
                if (response.status === 200) {
                    setConversas(response.data.msgs);
                } else {
                    console.error('Erro ao listar conversas:', response);
                }
            } catch (error) {
                console.error('Erro ao listar conversas:', error);
            }
        };

        listarConversas();
    }, [token, nick, idUser, idsala, timestamp]);

    const enviarMensagem = async () => {
        if (novaMensagem.trim() === '') return;

        try {
            const response = await api.post('/sala/enviar', {
                nick: nick,
                msg: novaMensagem,
                idsala: idsala
            }, {
                headers: {
                    'token': token,
                    'nick': nick,
                    'iduser': idUser,
                    'idsala': idsala,
                    'timestamp': '1724868643067'
                }
            });

            if (response.status === 200) {
                setConversas(prevConversas => [...prevConversas, { nick, msg: novaMensagem, timestamp: Date.now() }]);
                setNovaMensagem('');
            } else {
                console.error('Erro ao enviar mensagem:', response);
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    return (
        <div>
            <div className="conversa-box">
                {conversas.map((conversa, index) => (
                    <div key={index} className="conversa-item">
                        <p className="conversa-nick">{conversa.nick}:</p>
                        <p className="conversa-msg">{conversa.msg}</p>
                        <span className="conversa-timestamp">{new Date(conversa.timestamp).toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <div className="input-box">
                <input
                    type="text"
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    className="input-mensagem"
                    placeholder="Digite sua mensagem..."
                />
                <button onClick={enviarMensagem} className="botao-enviar">Enviar</button>
            </div>
        </div>
    );
}

export default Conversa;
