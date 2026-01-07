let selectedAmount = 0;
let currentRobux = 0;
let currentUserId = null;

// Função para buscar usuário do Roblox
async function searchRobloxUser(username) {
    try {
        // Usar API do Roblox via roproxy
        const response = await fetch(`https://users.roproxy.com/v1/usernames/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                usernames: [username]
            })
        });
        
        if (!response.ok) {
            throw new Error('Falha na busca');
        }
        
        const data = await response.json();
        
        if (!data.data || data.data.length === 0) {
            throw new Error('Usuário não encontrado');
        }
        
        const user = data.data[0];
        currentUserId = user.id;
        
        return {
            id: user.id,
            username: user.name,
            displayName: user.displayName,
            avatar: `https://www.roblox.com/headshot-thumbnail/image?userId=${user.id}&width=150&height=150&format=png`
        };
    } catch (error) {
        console.error('Erro:', error);
        throw new Error('Não foi possível buscar o usuário. Tente novamente.');
    }
}

// Buscar usuário
document.getElementById('search-btn').addEventListener('click', async () => {
    const username = document.getElementById('username-input').value.trim();
    const searchBtn = document.getElementById('search-btn');
    
    if (!username) {
        alert('Digite um nick primeiro!');
        return;
    }
    
    searchBtn.disabled = true;
    searchBtn.textContent = 'BUSCANDO...';
    
    try {
        const userInfo = await searchRobloxUser(username);
        displayUserProfile(userInfo);
    } catch (error) {
        alert(error.message);
    } finally {
        searchBtn.disabled = false;
        searchBtn.textContent = '🔍 BUSCAR';
    }
});

// Enter no input
document.getElementById('username-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('search-btn').click();
    }
});

function displayUserProfile(userInfo) {
    document.getElementById('user-avatar').src = userInfo.avatar;
    document.getElementById('user-display-name').textContent = userInfo.displayName;
    document.getElementById('user-id').textContent = userInfo.id;
    document.getElementById('user-username').textContent = userInfo.username;
    document.getElementById('user-profile').classList.remove('hidden');
}

// Mensagens do terminal de hack
function getHackMessages() {
    return [
        "Iniciando conexão com servidores Roblox...",
        "Conectado! IP: 192.168.1.xxx",
        "Bypassing sistema de segurança...",
        "Acesso autorizado ✓",
        `Localizando conta do usuário ID: ${currentUserId}...`,
        "Usuário encontrado! Verificando permissões...",
        "Injetando código de Robux...",
        "Executando exploit RBX_GENERATOR_2024...",
        "Decodificando tokens de autenticação...",
        "Validando transação...",
        "Robux sendo transferidos...",
        "██████████ 100% COMPLETO",
        "Hack executado com sucesso!",
        "Robux adicionados à conta!"
    ];
}

// Seleção de quantidade
document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedAmount = parseInt(btn.dataset.amount);
    });
});

// Botão principal de gerar
document.getElementById('generate-btn').addEventListener('click', () => {
    if (!currentUserId) {
        alert('Busque seu perfil primeiro!');
        return;
    }
    
    if (selectedAmount === 0) {
        alert('Selecione uma quantidade primeiro!');
        return;
    }
    
    startHackSimulation();
});

function startHackSimulation() {
    const terminal = document.getElementById('hack-terminal');
    const terminalContent = document.getElementById('terminal-content');
    const generateBtn = document.getElementById('generate-btn');
    
    // Mostrar terminal e desabilitar botão
    terminal.classList.remove('hidden');
    generateBtn.disabled = true;
    generateBtn.textContent = 'PROCESSANDO...';
    
    // Limpar conteúdo anterior
    terminalContent.innerHTML = '';
    
    // Simular digitação das mensagens
    let messageIndex = 0;
    const hackMessages = getHackMessages();
    
    function typeMessage() {
        if (messageIndex >= hackMessages.length) {
            setTimeout(showSuccess, 1000);
            return;
        }
        
        const message = hackMessages[messageIndex];
        const messageDiv = document.createElement('div');
        messageDiv.style.color = getMessageColor(messageIndex);
        terminalContent.appendChild(messageDiv);
        
        let charIndex = 0;
        const typingInterval = setInterval(() => {
            messageDiv.textContent += message[charIndex];
            charIndex++;
            
            if (charIndex >= message.length) {
                clearInterval(typingInterval);
                messageIndex++;
                setTimeout(typeMessage, Math.random() * 800 + 200);
            }
        }, Math.random() * 50 + 30);
        
        // Auto scroll
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
    
    typeMessage();
}

function getMessageColor(index) {
    if (index < 3) return '#ffff00'; // Amarelo para início
    if (index < 8) return '#00ff00'; // Verde para processo
    if (index < 12) return '#ff6b35'; // Laranja para progresso
    return '#00ff00'; // Verde para sucesso
}

function showSuccess() {
    const successMessage = document.getElementById('success-message');
    const robuxCount = document.getElementById('robux-count');
    
    // Atualizar contador de Robux
    currentRobux += selectedAmount;
    animateCounter(robuxCount, currentRobux);
    
    // Mostrar mensagem de sucesso
    successMessage.classList.remove('hidden');
    
    // Resetar botão
    const generateBtn = document.getElementById('generate-btn');
    generateBtn.disabled = false;
    generateBtn.textContent = '🚀 GERAR ROBUX GRÁTIS 🚀';
    
    // Limpar seleção
    document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
    selectedAmount = 0;
}

function animateCounter(element, targetValue) {
    const startValue = parseInt(element.textContent) || 0;
    const duration = 2000;
    const startTime = Date.now();
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        
        element.textContent = currentValue.toLocaleString('pt-BR');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    updateCounter();
}

// Botão de resgatar (apenas para efeito)
document.getElementById('claim-btn').addEventListener('click', () => {
    alert('Redirecionando para Roblox...\n\n(Isso é apenas uma simulação! 😄)');
    
    // Esconder mensagem de sucesso após "resgate"
    document.getElementById('success-message').classList.add('hidden');
    document.getElementById('hack-terminal').classList.add('hidden');
});

// Efeitos visuais adicionais
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar efeito de matrix no fundo
    createMatrixEffect();
});

function createMatrixEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ROBUX0123456789ABCDEF";
    const drops = [];
    
    for (let x = 0; x < canvas.width / 10; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = '10px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * 10, drops[i] * 10);
            
            if (drops[i] * 10 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}