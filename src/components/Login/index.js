import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../services/api';

function LoginC(){
    const [usuario, setUsuario] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => { 
        if (usuario === '') {
            alert('Preencha o campo de usuário');
            return;
        }
    
        try {
            console.log('Enviando usuário:', usuario);
            const response = await api.post('/entrar', { nick: usuario });
            console.log('Resposta da API:', response);
    
            if (response.status === 200 && response.data) {
                const { idUser, token, nick } = response.data;
                console.log('Dados recebidos:', { idUser, token, nick });
                localStorage.setItem('idUser', idUser);
                localStorage.setItem('token', token);
                localStorage.setItem('nick', nick);
                navigate('/chats');
            } else {
                alert('Erro ao fazer login. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Por favor, tente novamente.');
        }
    };

    return (
        <div className="position-absolute top-50 start-50 box">
            <div className="position-absolute top-50 start-50 dados">
                <input 
                    className="input" 
                    type="text" 
                    placeholder="Nome de usuário" 
                    value={usuario} 
                    onChange={(e) => setUsuario(e.target.value)} 
                />
                <button className="botao" onClick={handleLogin}>Entrar</button> 
            </div>
        </div>
    );  
}

export default LoginC;
