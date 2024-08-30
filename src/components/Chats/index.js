import api from '../../services/api';
import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

function Chats(){
    const [chats, setChats] = useState([]); 
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchApi() {
            try {
                const idUser = localStorage.getItem('idUser');
                const token = localStorage.getItem('token');
                const nick = localStorage.getItem('nick');

                console.log(idUser + ' ' + token + ' ' + nick);

                const response = await api.get('/salas', {
                    headers: {
                        'iduser': idUser,
                        'token': token,
                        'nick': nick
                    }
                });
                setChats(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Erro ao buscar chats:', error);
                alert('Erro ao buscar chats. Por favor, tente novamente.');
            }
        }
        fetchApi();
    }, []);

    const handleSalaClick = async (chat) => {
    const idUser = localStorage.getItem('idUser');
    const token = localStorage.getItem('token');
    const nick = localStorage.getItem('nick');
    const idsala = chat._id;
    localStorage.setItem('idsala', idsala);

    console.log("idUser: ", idUser);
    console.log("token: ", token);
    console.log("nick: ", nick);
    console.log("idsala: ", idsala);

    try {
        const response = await api.post('/sala/entrar', {}, {
            headers: {
                'iduser': idUser,
                'token': token,
                'nick': nick,
                'idsala': idsala
            }
        });
        if(response){
            const {timestamp} = response.data;
            localStorage.setItem('timestamp', timestamp);
            console.log("timestamp"+ timestamp);
            console.log("idsala: " + chat._id);
            console.log(response.data);
        }
        navigate('/chat');
    } catch (error) {
        console.error('Erro ao entrar na sala:', error);
        alert('Erro ao entrar na sala. Por favor, tente novamente.');
    }
    };

    return(
        <div className="boxLista">
            {chats.map((chat) => (
                <div key={chat._id} className="chat chat-item">
                    <Link onClick={() => handleSalaClick(chat)}>
                        <h2 className='text'>{chat.sala}</h2>
                        <p className='textp'>{chat.tipo}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Chats;

