import './style.css'

const COLORS = ['#38bdf8', '#fbbf24', '#f472b6', '#c084fc', '#f87171', '#2dd4bf'];

// === OFFLINE AVATAR GENERATOR (100% Offline-friendly, no internet needed!) ===
// Membuat robot avatar bergaya vektor secara dinamis berdasarkan nama & warna AI
const generateAvatarDataURI = (name, color) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const eyeType = Math.abs(hash % 3);
  const mouthType = Math.abs((hash >> 2) % 3);
  
  let eyesSvg = '';
  if (eyeType === 0) {
    eyesSvg = `<circle cx="35" cy="45" r="6" fill="#0f172a"/><circle cx="65" cy="45" r="6" fill="#0f172a"/>`;
  } else if (eyeType === 1) {
    eyesSvg = `<rect x="29" y="42" width="12" height="6" rx="2" fill="#0f172a"/><rect x="59" y="42" width="12" height="6" rx="2" fill="#0f172a"/>`;
  } else {
    eyesSvg = `<circle cx="35" cy="45" r="5" fill="#0f172a"/><circle cx="65" cy="45" r="5" fill="#0f172a"/><path d="M26 38 L38 38 M62 38 L74 38" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>`;
  }

  let mouthSvg = '';
  if (mouthType === 0) {
    mouthSvg = `<rect x="38" y="62" width="24" height="6" rx="3" fill="#0f172a"/>`;
  } else if (mouthType === 1) {
    mouthSvg = `<path d="M38 64 Q50 76 62 64" stroke="#0f172a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  } else {
    mouthSvg = `<path d="M38 66 L62 66" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round"/>`;
  }

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="${color}" rx="50"/>
      <!-- Telinga Robot -->
      <rect x="10" y="40" width="8" height="22" rx="4" fill="#ffffff" opacity="0.8"/>
      <rect x="82" y="40" width="8" height="22" rx="4" fill="#ffffff" opacity="0.8"/>
      <!-- Kepala Robot -->
      <rect x="18" y="22" width="64" height="58" rx="16" fill="#f8fafc"/>
      <!-- Antena -->
      <line x1="50" y1="22" x2="50" y2="8" stroke="#f8fafc" stroke-width="4"/>
      <circle cx="50" cy="7" r="6" fill="#ff007f"/>
      <!-- Layar Wajah -->
      <rect x="24" y="28" width="52" height="46" rx="10" fill="${color}" opacity="0.15"/>
      <!-- Mata & Mulut -->
      ${eyesSvg}
      ${mouthSvg}
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};

// Web Audio API Synthesizer untuk SFX (Volume Dinaikkan agar lebih besar)
const playSFX = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === 'send') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.25, ctx.currentTime); // Dinaikkan dari 0.08 ke 0.25
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'receive') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(550, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.20, ctx.currentTime); // Dinaikkan dari 0.06 ke 0.20
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    console.log("Audio not supported or interaction needed.");
  }
};

// Text-to-Speech (TTS) Engine (Volume diset maksimal 1.0)
const speakText = (text, bubbleId) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Cari suara Bahasa Indonesia
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(voice => voice.lang.includes('id') || voice.lang.includes('ID'));
    if (idVoice) utterance.voice = idVoice;
    
    utterance.volume = 1.0; // Volume Maksimal (100%)
    utterance.rate = 1.05; 
    utterance.pitch = 1.0;
    
    const bubble = document.getElementById(bubbleId);
    
    utterance.onstart = () => {
      if (bubble) bubble.classList.add('speaking');
    };
    
    utterance.onend = () => {
      if (bubble) bubble.classList.remove('speaking');
    };
    
    utterance.onerror = () => {
      if (bubble) bubble.classList.remove('speaking');
    };
    
    window.speechSynthesis.speak(utterance);
  }
};

if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
}

class AIAgent {
  constructor(name, model, persona, color) {
    this.name = name;
    this.model = model;
    this.persona = persona;
    this.color = color;
    // Menggunakan Generator Offline Lokal agar foto profil tidak hilang/blank di HP
    this.avatarUrl = generateAvatarDataURI(name, color);
    this.memory = [];
    this.setSystemPrompt();
  }

  setSystemPrompt() {
    const sp = `Nama lu adalah ${this.name}. ${this.persona}`;
    this.memory = [{ role: 'system', content: sp }];
  }

  receiveMessage(senderName, message) {
    this.memory.push({ role: 'user', content: `${senderName} berkata: ${message}` });
  }
}

// Global State
let agents = [];
let autoChatInterval = null;
let isChatActive = false;
let lastSpeaker = null;
let isStreaming = false;
let isAutoChatEnabled = true;
let apiEndpoint = '/api'; // Global variable for API URL

// DOM Elements
const app = document.getElementById('app');

app.innerHTML = `
  <div class="setup-screen" id="setupScreen">
    <div class="setup-header">
      <h1>AI Multiverse Lab</h1>
      <p style="color: var(--text-secondary); margin-top: 0.5rem; font-weight: 500;">Simulasikan percakapan antar AI secara visual & suara (Bisa HP!)</p>
    </div>
    
    <div class="setup-form">
      <div class="input-group">
        <label>Ollama API URL (Biarkan '/api' jika Lokal, isi link Ngrok jika Publik)</label>
        <input type="text" id="apiEndpoint" placeholder="Contoh: https://xxxx.ngrok-free.app" value="/api">
      </div>

      <div class="input-group">
        <label>Jumlah Agen AI</label>
        <input type="number" id="numAgents" min="1" max="8" value="2">
      </div>
      
      <div id="agentFormsContainer" style="display: flex; flex-direction: column; gap: 1.25rem;">
        <!-- Generated dynamically -->
      </div>
      
      <button class="btn-primary" id="startBtn">⚡ INISIALISASI SIMULASI</button>
    </div>
  </div>

  <div class="chat-screen" id="chatScreen">
    <div class="chat-header">
      <h2><div class="status-dot"></div> Live Simulation</h2>
      <div class="header-controls">
        <button class="btn-icon active" id="toggleAutoChatBtn">⏸️ Pause AI</button>
        <button class="btn-icon" id="resetMemBtn">🧹 Reset</button>
        <button class="btn-icon" id="exportBtn">💾 Export</button>
        <button class="btn-icon" id="editBtn">⚙️ Config</button>
      </div>
    </div>
    
    <div class="chat-messages" id="chatMessages">
      <!-- Messages go here -->
    </div>
    
    <div class="chat-input-container">
      <input type="text" id="chatInput" placeholder="Ketik pesan untuk nimbrung..." autocomplete="off">
      <button class="btn-send" id="sendBtn">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
  </div>
`;

// Setup Logic
const numAgentsInput = document.getElementById('numAgents');
const agentFormsContainer = document.getElementById('agentFormsContainer');

function renderAgentForms() {
  const num = parseInt(numAgentsInput.value) || 2;
  let html = '';
  for(let i=0; i<num; i++) {
    const defaultColor = COLORS[i % COLORS.length];
    const botName = `Bot ${i+1}`;
    // Dapatkan data URI offline instan untuk form pembuatan
    const formAvatarUrl = generateAvatarDataURI(botName, defaultColor);
    html += `
      <div class="agent-card">
        <h3 style="font-size: 1.15rem; color: ${defaultColor}; display:flex; align-items:center; gap:12px; font-weight: 800;">
          <img id="formAvatarImg_${i}" src="${formAvatarUrl}" style="width:36px; height:36px;"> 
          Profil Agen ${i+1}
        </h3>
        <div class="input-group">
          <label>Nama AI</label>
          <input type="text" id="agentName_${i}" placeholder="Nama (Contoh: Chisil)" value="${botName}" oninput="updateFormAvatar(${i})">
        </div>
        <div class="input-group">
          <label>Model Ollama</label>
          <input type="text" id="agentModel_${i}" placeholder="Model (Contoh: fable5-qwen-custom)" value="fable5-qwen-custom">
        </div>
        <div class="input-group">
          <label>Sifat/Persona</label>
          <textarea id="agentPersona_${i}" rows="2" placeholder="Persona (Contoh: Cewe gaul jkt santai)">Orang biasa.</textarea>
        </div>
      </div>
    `;
  }
  agentFormsContainer.innerHTML = html;
}

// Update avatar form secara langsung saat user mengetik nama AI
window.updateFormAvatar = (index) => {
  const nameInput = document.getElementById(`agentName_${index}`);
  const imgElement = document.getElementById(`formAvatarImg_${index}`);
  if (nameInput && imgElement) {
    const name = nameInput.value || `Bot ${index+1}`;
    const color = COLORS[index % COLORS.length];
    imgElement.src = generateAvatarDataURI(name, color);
  }
};

numAgentsInput.addEventListener('change', renderAgentForms);
renderAgentForms();

document.getElementById('startBtn').addEventListener('click', () => {
  const num = parseInt(numAgentsInput.value) || 2;
  apiEndpoint = document.getElementById('apiEndpoint').value.trim() || '/api';
  agents = [];
  for(let i=0; i<num; i++) {
    const name = document.getElementById(`agentName_${i}`).value || `Bot ${i+1}`;
    const model = document.getElementById(`agentModel_${i}`).value || 'fable5-qwen-custom';
    const persona = document.getElementById(`agentPersona_${i}`).value || '';
    agents.push(new AIAgent(name, model, persona, COLORS[i % COLORS.length]));
  }
  
  document.getElementById('setupScreen').style.display = 'none';
  document.getElementById('chatScreen').style.display = 'flex';
  
  app.classList.add('active');
  isChatActive = true;
  lastSpeaker = null;
  isAutoChatEnabled = true;
  document.getElementById('toggleAutoChatBtn').textContent = "⏸️ Pause AI";
  document.getElementById('chatMessages').innerHTML = '';
  
  startAutoChat();
});

// Chat Logic
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

function scrollToBottom() {
  chatMessages.scrollTo({
    top: chatMessages.scrollHeight,
    behavior: 'smooth'
  });
}

function appendUserMessage(text) {
  const div = document.createElement('div');
  div.className = 'message-wrapper user';
  // Avatar user menggunakan in-line SVG juga
  const userAvatarSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#3b82f6"/>
      <circle cx="50" cy="40" r="18" fill="#ffffff"/>
      <path d="M22 80 C 22 60, 78 60, 78 80" stroke="#ffffff" stroke-width="8" fill="none" stroke-linecap="round"/>
    </svg>
  `;
  const userAvatarData = `data:image/svg+xml;utf8,${encodeURIComponent(userAvatarSvg)}`;
  
  div.innerHTML = `
    <div class="avatar-container">
      <img src="${userAvatarData}" class="avatar">
    </div>
    <div class="message-content">
      <div class="message-sender">Kamu (Manusia)</div>
      <div class="message-bubble">${escapeHTML(text)}</div>
    </div>
  `;
  chatMessages.appendChild(div);
  scrollToBottom();
  
  agents.forEach(a => a.receiveMessage('Kamu (User Manusia)', text));
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag]));
}

async function triggerAIReply() {
  if (isStreaming || !isChatActive || agents.length === 0) return;
  isStreaming = true;
  
  let available = agents.filter(a => a !== lastSpeaker);
  if (available.length === 0) available = agents;
  const speaker = available[Math.floor(Math.random() * available.length)];
  
  const bubbleId = `bubble_${Date.now()}`;
  const div = document.createElement('div');
  div.className = 'message-wrapper ai';
  
  div.innerHTML = `
    <div class="avatar-container" id="avatar_${bubbleId}">
      <img src="${speaker.avatarUrl}" class="avatar">
      <div class="sound-badge">🔊</div>
    </div>
    <div class="message-content">
      <div class="message-sender" style="color: ${speaker.color}">${speaker.name}</div>
      <div class="message-bubble" id="${bubbleId}">
        <div class="typing-indicator">
          <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
        </div>
      </div>
    </div>
  `;
  chatMessages.appendChild(div);
  scrollToBottom();
  
  const bubbleDiv = div.querySelector('.message-bubble');

  try {
    const targetUrl = apiEndpoint.endsWith('/api') ? `${apiEndpoint}/chat` : `${apiEndpoint}/api/chat`;
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: speaker.model,
        messages: speaker.memory,
        stream: true
      })
    });

    if (!response.ok) throw new Error('API Error');

    bubbleDiv.innerHTML = '<span id="textNode"></span><span class="cursor"></span>';
    const textNode = bubbleDiv.querySelector('#textNode');
    const cursor = bubbleDiv.querySelector('.cursor');
    
    let fullReply = "";
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(l => l.trim() !== '');
      
      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.message && json.message.content) {
            fullReply += json.message.content;
            textNode.innerHTML = escapeHTML(fullReply).replace(/\n/g, '<br>');
            scrollToBottom();
          }
        } catch(e) {}
      }
    }
    
    cursor.remove();
    speaker.memory.push({ role: 'assistant', content: fullReply });
    lastSpeaker = speaker;
    
    playSFX('receive');
    
    document.getElementById(`avatar_${bubbleId}`).addEventListener('click', () => {
      speakText(fullReply, bubbleId);
    });
    
    agents.forEach(a => {
      if (a !== speaker) a.receiveMessage(speaker.name, fullReply);
    });

  } catch(e) {
    bubbleDiv.innerHTML = `<span style="color: var(--text-secondary)">[Gagal menghubungkan ke Ollama. Pastikan model dengan nama tersebut ada di list Ollama Anda]</span>`;
  }
  
  isStreaming = false;
}

function startAutoChat() {
  if (autoChatInterval) clearTimeout(autoChatInterval);
  
  const loop = async () => {
    if (!isChatActive) return;
    if (isAutoChatEnabled && !isStreaming) {
      await triggerAIReply();
    }
    const delay = Math.floor(Math.random() * 5000) + 4000;
    autoChatInterval = setTimeout(loop, delay);
  };
  
  autoChatInterval = setTimeout(loop, 2000);
}

// User Actions
async function handleSend() {
  const text = chatInput.value.trim();
  if (!text || isStreaming) return;
  
  chatInput.value = '';
  appendUserMessage(text);
  
  playSFX('send');
  
  if (autoChatInterval) clearTimeout(autoChatInterval);
  await triggerAIReply();
  startAutoChat();
}

sendBtn.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSend();
});

// Fitur Pause/Play Auto Chat
const toggleAutoBtn = document.getElementById('toggleAutoChatBtn');
toggleAutoBtn.addEventListener('click', () => {
  isAutoChatEnabled = !isAutoChatEnabled;
  if (isAutoChatEnabled) {
    toggleAutoBtn.textContent = "⏸️ Pause AI";
    toggleAutoBtn.classList.add('active');
    toggleAutoBtn.style.color = '#06b6d4';
    toggleAutoBtn.style.borderColor = 'rgba(6, 182, 212, 0.5)';
    if (!isStreaming) triggerAIReply();
  } else {
    toggleAutoBtn.textContent = "▶️ Auto Chat (Off)";
    toggleAutoBtn.classList.remove('active');
    toggleAutoBtn.style.color = 'var(--text-secondary)';
    toggleAutoBtn.style.borderColor = 'var(--glass-border)';
  }
});

// Fitur Reset
document.getElementById('resetMemBtn').addEventListener('click', () => {
  agents.forEach(a => a.setSystemPrompt());
  const notif = document.createElement('div');
  notif.style = "text-align: center; color: var(--text-secondary); margin: 1rem 0; font-size: 0.85rem; font-weight: 600;";
  notif.textContent = "— 🧹 Memori Semua AI Telah Dihapus Total —";
  chatMessages.appendChild(notif);
  scrollToBottom();
  lastSpeaker = null;
});

// Fitur Export (Simpan Chat ke File TXT)
document.getElementById('exportBtn').addEventListener('click', () => {
  let textToSave = "=== LOG OBROLAN MULTI-AI ===\n\n";
  const messages = chatMessages.querySelectorAll('.message-wrapper');
  messages.forEach(msg => {
    const sender = msg.querySelector('.message-sender').textContent;
    const content = msg.querySelector('.message-bubble').innerText;
    textToSave += `[${sender}]: ${content}\n\n`;
  });
  
  const blob = new Blob([textToSave], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "Chat_Log_MultiAI.txt";
  a.click();
  URL.revokeObjectURL(url);
});

// Fitur Edit Config
document.getElementById('editBtn').addEventListener('click', () => {
  isChatActive = false;
  if (autoChatInterval) clearTimeout(autoChatInterval);
  app.classList.remove('active');
  document.getElementById('setupScreen').style.display = 'flex';
  document.getElementById('chatScreen').style.display = 'none';
});
