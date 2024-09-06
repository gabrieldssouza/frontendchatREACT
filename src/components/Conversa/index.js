import React, { useEffect, useState, useRef } from 'react';
import api from '../../services/api';

function Conversa() {
    const [conversas, setConversas] = useState([]);
    const [novaMensagem, setNovaMensagem] = useState('');
    const token = localStorage.getItem('token');
    const nick = localStorage.getItem('nick');
    const idUser = localStorage.getItem('idUser');
    const idsala = localStorage.getItem('idsala');
    const timestamp = localStorage.getItem('timestamp'); 
    const conversaBoxRef = useRef(null);

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
        const intervalId = setInterval(listarConversas, 2000); 

        return () => clearInterval(intervalId); 
    }, [token, nick, idUser, idsala, timestamp]);

    useEffect(() => {
        if (conversaBoxRef.current) {
            conversaBoxRef.current.scrollTop = conversaBoxRef.current.scrollHeight;
        }
    }, [conversas]);

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
        <div className='container'>
            <div className="conversa-box" ref={conversaBoxRef}>
                {conversas.map((conversa, index) => (
                   <div key={index} className={`conversa-item ${conversa.nick === nick ? 'minha-mensagem' : ''}`}>
                        {conversa.nick !== nick && <p className="conversa-nick">{conversa.nick}:</p>}
                        <p className={`conversa-msg ${conversa.nick === nick ? 'verde' : ''} `}>{conversa.msg}</p>
                        <span className={`conversa-timestamp ${conversa.nick === nick ? 'verde' : ''} `}>{new Date(conversa.timestamp).toLocaleString()}</span>
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