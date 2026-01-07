let selectedAmount = 0;
let currentRobux = 0;

// Mensagens do terminal de hack
const hackMessages = [
    "Iniciando conexão com servidores Roblox...",
    "Conectado! IP: 192.168.1.xxx",
    "Bypassing sistema de segurança...",
    "Acesso autorizado ✓",
    "Localizando conta do usuário...",
    "Usuário encontrado! ID: #" + Math.floor(Math.random() * 1000000),
    "Injetando código de Robux...",
    "Executando exploit RBX_GENERATOR_2024...",
    "Decodificando tokens de autenticação...",
    "Validando transação...",
    "Robux sendo transferidos...",
    "██████████ 100% COMPLETO",
    "Hack executado com sucesso!",
    "Robux adicionados à conta!"
];

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