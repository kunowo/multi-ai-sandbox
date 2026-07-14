import './style.css'

const COLORS = ['#38bdf8', '#fbbf24', '#f472b6', '#c084fc', '#f87171', '#2dd4bf'];

const defaultUserSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="#3b82f6"/>
    <circle cx="50" cy="40" r="18" fill="#ffffff"/>
    <path d="M22 80 C 22 60, 78 60, 78 80" stroke="#ffffff" stroke-width="8" fill="none" stroke-linecap="round"/>
  </svg>
`;
const defaultUserAvatar = `data:image/svg+xml;utf8,${encodeURIComponent(defaultUserSvg)}`;

// Custom Premade Vector Preset SVGs for Avatars
const svgCyberDevil = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <radialGradient id="devilGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#1e1b4b" />
        <stop offset="100%" stop-color="#030712" />
      </radialGradient>
    </defs>
    <rect width="100" height="100" fill="url(#devilGrad)" rx="50" stroke="#ef4444" stroke-width="2" />
    <path d="M 28 32 C 15 15, 12 5, 20 2 C 28 15, 32 25, 34 32 Z" fill="#ef4444" />
    <path d="M 72 32 C 85 15, 88 5, 80 2 C 72 15, 68 25, 66 32 Z" fill="#ef4444" />
    <path d="M 26 28 C 18 18, 16 10, 21 8" stroke="#06b6d4" stroke-width="2" fill="none" />
    <path d="M 74 28 C 82 18, 84 10, 79 8" stroke="#06b6d4" stroke-width="2" fill="none" />
    <path d="M 28 38 Q 20 55, 30 75 Q 50 92, 70 75 Q 80 55, 72 38 Z" fill="#090d16" stroke="#ef4444" stroke-width="1.5" />
    <polygon points="34,48 42,46 44,52 36,54" fill="#06b6d4" />
    <polygon points="66,48 58,46 56,52 64,54" fill="#06b6d4" />
    <path d="M 40 68 Q 50 78, 60 68 Q 50 72, 40 68 Z" fill="#ef4444" />
  </svg>
`;

const svgArchangel = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="#0f172a" rx="50"/>
    <circle cx="50" cy="50" r="42" fill="none" stroke="#f59e0b" stroke-width="2"/>
    <ellipse cx="50" cy="22" rx="18" ry="4" fill="none" stroke="#f59e0b" stroke-width="2.5" />
    <path d="M 25 40 C 5 35, 8 65, 30 55 C 28 48, 26 44, 25 40 Z" fill="#38bdf8" opacity="0.6"/>
    <path d="M 75 40 C 95 35, 92 65, 70 55 C 72 48, 74 44, 75 40 Z" fill="#38bdf8" opacity="0.6"/>
    <circle cx="50" cy="45" r="14" fill="#f8fafc"/>
    <circle cx="45" cy="44" r="2.5" fill="#0f172a"/>
    <circle cx="55" cy="44" r="2.5" fill="#0f172a"/>
    <path d="M 46 52 Q 50 56, 54 52" stroke="#f59e0b" stroke-width="2" fill="none"/>
  </svg>
`;

const svgSpectre = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="#090d16" rx="50"/>
    <path d="M 30 75 Q 30 30, 50 30 Q 70 30, 70 75 Q 60 70, 50 78 Q 40 70, 30 75 Z" fill="#10b981" opacity="0.8"/>
    <circle cx="43" cy="45" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 3px #10b981)"/>
    <circle cx="57" cy="45" r="3.5" fill="#ffffff" filter="drop-shadow(0 0 3px #10b981)"/>
  </svg>
`;

const svgCyberGolem = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="#1e293b" rx="50"/>
    <rect x="25" y="25" width="50" height="50" rx="8" fill="#475569" stroke="#f97316" stroke-width="3"/>
    <rect x="32" y="38" width="36" height="8" rx="2" fill="#f97316" filter="drop-shadow(0 0 4px #f97316)"/>
    <circle cx="30" cy="30" r="2" fill="#94a3b8"/>
    <circle cx="70" cy="30" r="2" fill="#94a3b8"/>
    <circle cx="30" cy="70" r="2" fill="#94a3b8"/>
    <circle cx="70" cy="70" r="2" fill="#94a3b8"/>
  </svg>
`;

const svgValkyrie = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="#2e1065" rx="50"/>
    <path d="M 32 30 L 50 18 L 68 30 L 62 60 L 38 60 Z" fill="#94a3b8" stroke="#d946ef" stroke-width="2"/>
    <path d="M 32 30 L 15 20 L 25 45 Z" fill="#d946ef"/>
    <path d="M 68 30 L 85 20 L 75 45 Z" fill="#d946ef"/>
    <circle cx="50" cy="46" r="8" fill="#fdf4ff"/>
    <circle cx="47" cy="46" r="1.5" fill="#2e1065"/>
    <circle cx="53" cy="46" r="1.5" fill="#2e1065"/>
  </svg>
`;

// Global Volume State (Controls Ambient, SFX, Clicks, and TTS)
let globalVolume = 0.5; // range: 0.0 to 1.0 (50% default)
let isUserScrollingUp = false;

// Active Streams per Chat Session Map (stores active generation states)
const activeStreams = new Map();

// Granular Audio Setting States (Including AI Typing Ticks & Ambient Presets)
let soundSettings = {
  ambientMute: false,
  ambientVolume: 1.0, // 0.0 to 1.0 multiplier
  ambientPreset: 'space', // 'space', 'forest', 'volcano', 'ocean', 'neon', 'matrix', 'monastery', 'aurora'
  clickMute: false,
  typeMute: false,
  alertsMute: false,
  aiTypeMute: false,
  aiTypeMode: 'random' // 'random', 'type1', 'type2', 'type3'
};

// Custom notification popups (Bawaan Sendiri - no native chrome alerts!)
function showNotification(message) {
  const notif = document.createElement('div');
  notif.style = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: rgba(9, 14, 24, 0.95);
    border: 1px solid var(--accent);
    box-shadow: 0 0 25px var(--accent-glow);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 14px;
    font-size: 0.9rem;
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: slideIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `;
  notif.innerHTML = `<span>⚡</span> <span>${message}</span>`;
  document.body.appendChild(notif);
  setTimeout(() => {
    notif.style.animation = "slideOut 0.3s forwards";
    setTimeout(() => notif.remove(), 300);
  }, 4000);
}

// Collapsible Terminal Logger helper
function logTerminal(message) {
  const body = document.getElementById('terminalBody');
  if (body) {
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.className = 'terminal-log-line';
    line.innerHTML = `[${time}] ${escapeHTML(message)}`;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }
}

// === Unified Web Audio API Shared AudioContext Engine ===
let sharedAudioCtx = null;
function getAudioContext() {
  if (!sharedAudioCtx) {
    sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

// Unified Retro SFX Play Node (Respects Mute Toggles & Boosted Gain Multipliers)
const playSound = (type) => {
  // Apply category mutes
  if (type === 'click' && soundSettings.clickMute) return;
  if (type === 'type' && soundSettings.typeMute) return;
  if (type === 'aiType' && soundSettings.aiTypeMute) return;
  if (type === 'type1' && soundSettings.aiTypeMute) return;
  if (type === 'type2' && soundSettings.aiTypeMute) return;
  if (type === 'type3' && soundSettings.aiTypeMute) return;
  if ((type === 'send' || type === 'receive') && soundSettings.alertsMute) return;

  // Route virtual 'aiType' sound according to chosen mode
  if (type === 'aiType') {
    let t = soundSettings.aiTypeMode;
    if (t === 'random') {
      t = ['type1', 'type2', 'type3'][Math.floor(Math.random() * 3)];
    }
    playSound(t);
    return;
  }

  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Add dynamics compressor to glue retro SFX
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.setValueAtTime(-12, ctx.currentTime);
    comp.knee.setValueAtTime(10, ctx.currentTime);
    
    osc.connect(gain);
    gain.connect(comp);
    comp.connect(ctx.destination);
    const now = ctx.currentTime;
    
    if (type === 'send') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
      gain.gain.setValueAtTime(globalVolume * 0.85, now); // Boosted from 0.25 to 0.85
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'receive') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(550, now);
      osc.frequency.exponentialRampToValueAtTime(820, now + 0.2);
      gain.gain.setValueAtTime(globalVolume * 0.75, now); // Boosted from 0.20 to 0.75
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(1050, now + 0.04);
      gain.gain.setValueAtTime(globalVolume * 0.50, now); // Boosted from 0.12 to 0.50
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(globalVolume * 0.70, now); // Boosted from 0.15 to 0.70
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'delete') {
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(600, now);
      osc.disconnect(gain);
      osc.connect(lp);
      lp.connect(gain);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.18);
      gain.gain.setValueAtTime(globalVolume * 0.75, now); // Boosted from 0.15 to 0.75
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'toggle') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.15);
      gain.gain.setValueAtTime(globalVolume * 0.45, now); // Boosted from 0.10 to 0.45
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'type') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, now);
      gain.gain.setValueAtTime(globalVolume * 0.25, now); // Boosted from 0.04 to 0.25
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
      osc.start(now);
      osc.stop(now + 0.015);
    } else if (type === 'type1') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, now);
      gain.gain.setValueAtTime(globalVolume * 0.12, now); // retro tick
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
      osc.start(now);
      osc.stop(now + 0.012);
    } else if (type === 'type2') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      gain.gain.setValueAtTime(globalVolume * 0.22, now); // deep clack
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.020);
      osc.start(now);
      osc.stop(now + 0.020);
    } else if (type === 'type3') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.015);
      gain.gain.setValueAtTime(globalVolume * 0.15, now); // high tech laser ping
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
      osc.start(now);
      osc.stop(now + 0.015);
    }
  } catch (e) {
    console.warn("Audio play failed:", e);
  }
};

// === Text-to-Speech (TTS) Engine ===
const speakText = (text, voiceName, bubbleId, rate = 1.0, pitch = 1.0) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    
    if (voiceName) {
      const targetVoice = voices.find(v => v.name === voiceName);
      if (targetVoice) utterance.voice = targetVoice;
    } else {
      // Fallback default Indonesian voice
      const idVoice = voices.find(voice => voice.lang.includes('id') || voice.lang.includes('ID'));
      if (idVoice) utterance.voice = idVoice;
    }
    
    utterance.volume = globalVolume; // Scale TTS volume directly to Global Sound Volume
    utterance.rate = parseFloat(rate) || 1.05;
    utterance.pitch = parseFloat(pitch) || 1.0;
    
    const bubble = document.getElementById(bubbleId);
    
    utterance.onstart = () => { if (bubble) bubble.classList.add('speaking'); };
    utterance.onend = () => { if (bubble) bubble.classList.remove('speaking'); };
    utterance.onerror = () => { if (bubble) bubble.classList.remove('speaking'); };
    
    window.speechSynthesis.speak(utterance);
    logTerminal(`TTS Speaking starts for model: ${voiceName || "Default voice"}`);
  }
};

// === 100% Offline-friendly Avatar Generator ===
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
      <rect x="10" y="40" width="8" height="22" rx="4" fill="#ffffff" opacity="0.8"/>
      <rect x="82" y="40" width="8" height="22" rx="4" fill="#ffffff" opacity="0.8"/>
      <rect x="18" y="22" width="64" height="58" rx="16" fill="#f8fafc"/>
      <line x1="50" y1="22" x2="50" y2="8" stroke="#f8fafc" stroke-width="4"/>
      <circle cx="50" cy="7" r="6" fill="#ff007f"/>
      <rect x="24" y="28" width="52" height="46" rx="10" fill="${color}" opacity="0.15"/>
      ${eyesSvg}
      ${mouthSvg}
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
};

class AIAgent {
  constructor(name, model, persona, color, isLocked = false, speechRate = 1.0, speechPitch = 1.0) {
    this.name = name;
    this.model = model;
    this.persona = persona;
    this.color = color;
    this.isLocked = isLocked;
    this.avatarUrl = generateAvatarDataURI(name, color);
    this.voiceName = null;
    this.speechRate = parseFloat(speechRate) || 1.0;
    this.speechPitch = parseFloat(speechPitch) || 1.0;
    // Call controls
    this.callMuted = false;
    this.callLoud = false;
  }
}

// Session isolated memory getters/modifiers
function getSessionAgentMemory(session, agentName, persona, isLocked) {
  session.agentMemories = session.agentMemories || {};
  if (!session.agentMemories[agentName]) {
    if (isLocked || agentName === "KUNOWS") {
      session.agentMemories[agentName] = [{ role: 'system', content: persona }];
    } else {
      session.agentMemories[agentName] = [{ role: 'system', content: `Nama lu adalah ${agentName}. ${persona}` }];
    }
  }
  return session.agentMemories[agentName];
}

function addMessageToSessionMemory(session, agentName, senderName, message, persona, isLocked) {
  const memory = getSessionAgentMemory(session, agentName, persona, isLocked);
  const cleanMsg = message.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  if (isLocked || agentName === "KUNOWS") {
    memory.push({ role: 'user', content: cleanMsg });
  } else {
    memory.push({ role: 'user', content: `${senderName} berkata: ${cleanMsg}` });
  }
}

// Global State
let agents = [];
let setupAgents = [];
let chats = [];
let botLibrary = [];
let currentChatId = null;
let autoChatInterval = null;
let isChatActive = false;
let lastSpeaker = null;
let isAutoChatEnabled = false;
let apiEndpoint = 'https://d99d-217-138-209-25.ngrok-free.app';
let theme = 'cyan';
let customThemeColor = '#06b6d4';
let isThinkingEnabled = true;
let isWebSearchEnabled = false;
let autoChatDelay = 4000;
let globalMood = 'default';
let searchEngine = 'ddg';

// Ambient Audio Synth Node
let ambientAudioCtx = null;
let ambientSynthNode = null;
let isAmbientPlaying = false;

// KUNOWS State
let hasKunows = false;

// User Customized Profile
let userName = "Kamu (Manusia)";
let userPersona = "Seorang manusia biasa.";
let userAvatar = defaultUserAvatar;

// === Phone Call System States ===
let isPhoneCallActive = false;
let callTimerInterval = null;
let callDurationSec = 0;
let callActiveAgentIndex = 0;
let callUserMicMuted = false;
let callSpeakerphoneActive = false;
let callRecognition = null;
let callSpeechTimeout = null;
let callActiveSpeaker = null;
let isCallAISpeaking = false;
let callAutoReplyTimeout = null; // Handles auto speaking loop in calls

// TTS System Voices State
let systemVoices = [];
function getSystemVoices() {
  if ('speechSynthesis' in window) {
    systemVoices = window.speechSynthesis.getVoices() || [];
  } else {
    systemVoices = [];
  }
}

// Native Push Notifications Sender
function showPushNotification(speakerName, contentText, avatarUrl) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      const bodyText = contentText.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      new Notification(`Balasan dari ${speakerName}`, {
        body: bodyText.substring(0, 120) + (bodyText.length > 120 ? '...' : ''),
        icon: avatarUrl
      });
    } catch(e) {
      console.warn("Native Notification trigger failed:", e);
    }
  }
}

// Request permission early on interaction
document.addEventListener('click', () => {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}, { once: true });

// Built-in Avatar Presets Grid Values
const PRESET_AVATARS = [
  { name: 'CyberDevil (Demonic)', color: '#ef4444', uri: `data:image/svg+xml;utf8,${encodeURIComponent(svgCyberDevil)}` },
  { name: 'Archangel (Saint)', color: '#f59e0b', uri: `data:image/svg+xml;utf8,${encodeURIComponent(svgArchangel)}` },
  { name: 'Spectre (Ghost)', color: '#10b981', uri: `data:image/svg+xml;utf8,${encodeURIComponent(svgSpectre)}` },
  { name: 'CyberGolem (Mech)', color: '#f97316', uri: `data:image/svg+xml;utf8,${encodeURIComponent(svgCyberGolem)}` },
  { name: 'Valkyrie (Fighter)', color: '#d946ef', uri: `data:image/svg+xml;utf8,${encodeURIComponent(svgValkyrie)}` },
  { name: 'CyberBot', color: '#06b6d4', uri: generateAvatarDataURI('CyberBot', '#06b6d4') },
  { name: 'BioSynth', color: '#d946ef', uri: generateAvatarDataURI('BioSynth', '#d946ef') },
  { name: 'RetroAlien', color: '#a855f7', uri: generateAvatarDataURI('RetroAlien', '#a855f7') },
  { name: 'HackerNoir', color: '#10b981', uri: generateAvatarDataURI('HackerNoir', '#10b981') },
  { name: 'NeonFox', color: '#f97316', uri: generateAvatarDataURI('NeonFox', '#f97316') },
  { name: 'CyberCat', color: '#ec4899', uri: generateAvatarDataURI('CyberCat', '#ec4899') }
];

// Dynamic model tags loading
let availableModels = ['fable5-qwen-opus', 'fable5-qwen-custom', 'llama3', 'deepseek-r1', 'mistral'];

// Reconstruct active agents from setupAgents state (Solves empty responses on page reload)
function rebuildActiveAgents() {
  agents = [];
  if (hasKunows) {
    const kunows = new AIAgent(
      "KUNOWS", 
      "fable5-qwen-opus", 
      "DO NOT PROVIDE FALSE OR MADE-UP INFORMATION, IF THE INFORMATION IS NOT IN YOUR DATABASE, DO NOT PROVIDE IT, JUST SAY \"I DON'T HAVE THAT INFORMATION\".", 
      "#ef4444",
      true
    );
    // Demonic avatar default for KUNOWS
    kunows.avatarUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgCyberDevil)}`;
    agents.push(kunows);
  }
  
  setupAgents.forEach((agent, i) => {
    if (!agent) return;
    const defaultColor = COLORS[i % COLORS.length];
    const newA = new AIAgent(agent.name, agent.model, agent.persona, defaultColor, false, agent.speechRate || 1.0, agent.speechPitch || 1.0);
    
    newA.avatarUrl = agent.avatar || generateAvatarDataURI(agent.name, defaultColor);
    newA.voiceName = agent.voiceName || null;
    agents.push(newA);
  });
  logTerminal(`Active agents list synchronized. Total: ${agents.length} bots active.`);
}

// DOM Layout
const app = document.getElementById('app');

app.innerHTML = `
  <!-- Sidebar Drawer Overlay -->
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <!-- Sidebar Drawer Panel -->
  <div class="sidebar-drawer" id="sidebarDrawer">
    <div class="sidebar-header">
      <div>
        <h3>CONTROL CENTER</h3>
        <div style="font-size: 0.65rem; color: var(--text-secondary); font-family: 'Fira Code', monospace; margin-top: 2px;">made by KUNOWO1095 in KUOTHOR</div>
      </div>
      <button class="btn-close-sidebar" id="closeSidebarBtn">&times;</button>
    </div>
    
    <div class="sidebar-section">
      <button class="btn-sidebar-action" id="newChatBtn">➕ New Chat Session</button>
    </div>

    <div class="sidebar-section">
      <h4>Previous Sessions</h4>
      <div class="chat-history-list" id="chatHistoryList">
        <!-- Rendered Dynamically -->
      </div>
      <button class="btn-sidebar-reset" id="resetChatsBtn">🧹 Reset Chat History</button>
    </div>

    <div class="sidebar-section">
      <h4>Simulation Settings</h4>
      <!-- Simulation delay slider -->
      <div class="slider-group" style="margin-bottom: 0.25rem;">
        <div class="slider-label-val">
          <span>Simulation Delay</span>
          <span id="delayValLabel">4.0s</span>
        </div>
        <input type="range" id="simDelayRange" min="2" max="10" step="0.5" value="4" class="cyber-slider" oninput="updateSimDelay(this.value)">
      </div>
      
      <!-- Group mood switcher select -->
      <div class="input-group" style="margin-bottom: 0.5rem; gap: 0.3rem;">
        <label style="font-size: 0.68rem;">Group Chat Mood</label>
        <select id="sidebarMoodSelect" onchange="updateGlobalMood(this.value)" style="padding: 0.6rem 0.9rem; font-size: 0.8rem;">
          <option value="default">😐 Default / Neutral</option>
          <option value="sarcastic">😏 Sarcastic / Toxic</option>
          <option value="intellectual">🧠 Intellectual / Analytical</option>
          <option value="humorous">😂 Humorous / Memes</option>
        </select>
      </div>

      <!-- Search Engine Source Selection -->
      <div class="input-group" style="margin-bottom: 0.5rem; gap: 0.3rem;">
        <label style="font-size: 0.68rem;">Search Engine Source</label>
        <select id="searchEngineSelect" onchange="updateSearchEngine(this.value)" style="padding: 0.6rem 0.9rem; font-size: 0.8rem;">
          <option value="ddg">🔍 DuckDuckGo (Scraper)</option>
          <option value="wikipedia">📖 Wikipedia (API)</option>
        </select>
      </div>

      <button class="btn-sidebar-option" id="startDebateModalBtn" onclick="openDebateModal()">⚔️ AI Debate Arena</button>
      <button class="btn-sidebar-option" id="toggleAmbientSynthBtn">🎵 Ambient Synth: OFF</button>
      
      <!-- Global Sound Volume slider (Always Visible) -->
      <div id="globalVolumeGroup" class="slider-group" style="margin-bottom: 0.5rem;">
        <div class="slider-label-val">
          <span>Global Sound Volume</span>
          <span id="globalVolumeValLabel">50%</span>
        </div>
        <input type="range" id="globalVolumeRange" min="0" max="100" value="50" class="cyber-slider" oninput="updateGlobalVolume(this.value)">
      </div>

      <button class="btn-sidebar-option" id="openSoundSettingsBtn" onclick="openSoundSettingsModal()">🔊 Sound Settings</button>
      <button class="btn-sidebar-option" id="toggleAutoChatBtn">▶️ Auto Chat (Off)</button>
      <button class="btn-sidebar-option active" id="toggleThinkBtn">🧠 Think: ON</button>
      <button class="btn-sidebar-option" id="toggleWebSearchBtn">🔍 Web Search: OFF</button>
      <button class="btn-sidebar-option" id="editBtn">⚙️ Config Screen</button>
      <button class="btn-sidebar-option" id="resetConfigBtn">🧹 Reset Setup Settings</button>
    </div>
  </div>

  <!-- Main Content Area -->
  <div class="main-content">
    
    <!-- Config / Setup Screen -->
    <div class="setup-screen" id="setupScreen">
      <div class="setup-header">
        <h1>AI Multiverse Lab 2.0</h1>
        <p style="color: var(--text-secondary); margin-top: 0.5rem; font-weight: 500;">Simulasikan grup chat AI dengan nalar pemikiran & pencarian web publik</p>
        <p style="font-size: 0.75rem; color: var(--accent); margin-top: 0.5rem; opacity: 0.85; font-family: 'Fira Code', monospace; letter-spacing: 0.05em;">made by KUNOWO1095 in KUOTHOR</p>
      </div>
      
      <div class="setup-form">
        <div style="display: flex; gap: 1rem; width: 100%; flex-wrap: wrap;">
          <div class="input-group" style="flex: 1; min-width: 250px;">
            <label>Ollama API URL</label>
            <div style="display: flex; gap: 0.5rem;">
              <input type="text" id="apiEndpoint" placeholder="Contoh: https://xxxx.ngrok-free.app" value="/api" style="flex: 1;">
              <button class="btn-icon" id="loadModelsBtn" style="padding: 0 1.25rem; font-size: 1.1rem;" title="Muat Model dari Ollama">🔄 Load</button>
            </div>
          </div>
          
          <div class="input-group" style="flex: 1; min-width: 200px;">
            <label>Pilih Gaya Tema / Aksen</label>
            <div style="display:flex; gap:0.5rem; align-items:center;">
              <select id="themeSelector" style="flex: 1;">
                <option value="cyan">Neon Cyberpunk (Cyan)</option>
                <option value="matrix">Digital Code (Matrix Green)</option>
                <option value="pink">Synthwave Pulse (Pink)</option>
                <option value="custom">Warna Kustom 🎨</option>
              </select>
              <input type="color" id="customColorInput" class="cyber-color-input" value="#06b6d4" style="display:none;" oninput="updateCustomAccentColor(this.value)">
            </div>
          </div>
        </div>

        <div class="input-group" style="width: 100%; margin-top: 0.5rem;">
          <label>Pustaka Bot Tersimpan</label>
          <div style="display:flex; gap:0.5rem;">
            <select id="savedBotsDropdown" style="flex:1;">
              <option value="">-- Muat Bot dari Pustaka --</option>
            </select>
            <button class="btn-icon" id="loadSavedBotBtn" style="padding: 0 1.25rem;">📂 Muat</button>
            <!-- Delete preset button from library -->
            <button class="btn-icon" id="deleteSavedBotBtn" style="padding: 0 1.25rem; background: rgba(239,68,68,0.15); border-color:#ef4444; color:#ef4444;" onclick="deleteBotFromLibrary()">🗑️ Hapus</button>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
          <div class="input-group" style="flex: 1; margin-right: 1.5rem;">
            <label>Jumlah Agen AI</label>
            <input type="number" id="numAgents" min="1" max="8" value="2">
          </div>
          <div id="kunowsStatusBadge" style="margin-top: 1.2rem;">
            <!-- Rendered badge if KUNOWS active -->
          </div>
        </div>
        
        <div id="agentFormsContainer" style="display: flex; flex-direction: column; gap: 1.25rem;">
          <!-- Generated dynamically -->
        </div>
        
        <div class="action-buttons-container">
          <button class="btn-secondary" id="addKunowsBtn">➕ ADD KUNOWS</button>
          <button class="btn-primary" id="startBtn">⚡ INITIALIZE SYSTEM</button>
        </div>

        <div style="text-align: center; margin-top: 1.5rem; font-size: 0.72rem; color: var(--text-secondary); font-family: 'Fira Code', monospace; opacity: 0.65;">
          made by KUNOWO1095 in KUOTHOR
        </div>
      </div>
    </div>

    <!-- Chat Interface Screen -->
    <div class="chat-screen" id="chatScreen">
      <div class="chat-header">
        <button class="btn-hamburger" id="hamburgerBtn">&#9776;</button>
        <h2 style="display: flex; align-items: center; gap: 10px;">
          <div class="status-dot"></div> Live Simulation
          <span style="font-size: 0.62rem; color: var(--text-secondary); font-family: 'Fira Code', monospace; font-weight: normal; opacity: 0.7; letter-spacing: 0.05em; margin-left: 5px;">made by KUNOWO1095 in KUOTHOR</span>
        </h2>
        <div style="flex:1;"></div>
        
        <!-- Phone Call Trigger Button -->
        <button class="btn-icon" id="startCallBtn" onclick="startVoiceCall()" style="margin-right: 0.5rem; background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981; display:flex; align-items:center; gap:5px;" title="Mulai Telepon AI">
          📞 Call
        </button>

        <!-- Export visual drop menu -->
        <div class="export-dropdown-wrapper">
          <button class="btn-icon" id="exportBtn" onclick="toggleExportMenu()">💾 Export</button>
          <div class="export-dropdown-menu" id="exportDropdownMenu">
            <button class="export-dropdown-item" onclick="exportToText()">Salin Log (.txt)</button>
            <button class="export-dropdown-item" onclick="exportToHTML()">Arsip Visual (.html)</button>
          </div>
        </div>
      </div>
      
      <div class="chat-messages" id="chatMessages">
        <!-- Messages go here -->
      </div>
      
      <!-- Floating Scroll Bottom Button -->
      <button id="floatingScrollBtn" class="floating-scroll-btn" onclick="window.scrollToBottom(true)" style="display:none;">▼</button>
      
      <!-- Floating Stop Generating Button -->
      <button id="stopStreamingBtn" class="btn-stop-stream" onclick="stopStreaming()" style="display:none;">⏹️ Stop Generating</button>

      <!-- Prompt Template Injector Tray -->
      <div class="prompt-injector-tray">
        <button class="btn-prompt-tag" onclick="injectPromptTemplate('swot')">📊 SWOT</button>
        <button class="btn-prompt-tag" onclick="injectPromptTemplate('brainstorm')">💡 Brainstorm</button>
        <button class="btn-prompt-tag" onclick="injectPromptTemplate('debug')">🪲 Debug Code</button>
        <button class="btn-prompt-tag" onclick="injectPromptTemplate('explain')">🤔 Jelaskan</button>
        <button class="btn-prompt-tag" onclick="injectPromptTemplate('socratic')">⚖️ Sokrates</button>
      </div>
      
      <div class="chat-input-container">
        <!-- Document Attachment upload components -->
        <button class="btn-icon" id="attachFileBtn" style="padding: 0 0.85rem; height: 50px; border-radius: 50%; font-size: 1.2rem; flex-shrink: 0;" title="Upload File Teks (.txt, .md)">📎</button>
        <input type="file" id="fileUploaderInput" style="display:none;" accept=".txt,.md">
        
        <input type="text" id="chatInput" placeholder="Ketik pesan untuk nimbrung..." autocomplete="off">
        
        <!-- Web speech recognition mic button -->
        <button class="btn-send" id="micBtn" style="background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); width: 50px; height: 50px; color: var(--text-secondary);" title="Perekam Suara">🎤</button>
        
        <button class="btn-send" id="sendBtn">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    </div>
    
    <!-- Collapsible Terminal Log Panel -->
    <div class="terminal-panel" id="terminalPanel">
      <div class="terminal-header" onclick="toggleTerminalPanel()">
        <div class="terminal-title">🟢 terminal.log</div>
        <button class="btn-toggle-terminal" id="terminalToggleBtn">▲ Expand</button>
      </div>
      <div class="terminal-body" id="terminalBody">
        <div class="terminal-log-line">[SYSTEM INITIALIZED] Welcome to AI Multiverse Lab 2.0. Ready for simulation logs...</div>
      </div>
    </div>
  </div>

  <!-- AI Debate Arena Settings Modal -->
  <div class="debate-modal" id="debateModal">
    <div class="debate-modal-content">
      <h3 style="font-weight: 800; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem; color: var(--accent);">⚔️ AI Debate Arena</h3>
      <div class="input-group">
        <label>Topik Debat</label>
        <input type="text" id="debateTopicInput" placeholder="Contoh: Apakah kecerdasan buatan menggantikan seniman?">
      </div>
      <div style="display:flex; gap:1rem;">
        <button class="btn-secondary" style="flex:1;" onclick="closeDebateModal()">Batal</button>
        <button class="btn-primary" style="flex:1; padding: 0.75rem 1rem;" onclick="launchAIDebate()">Mulai Debat</button>
      </div>
    </div>
  </div>

  <!-- Sound Settings Dashboard Modal -->
  <div class="debate-modal" id="soundSettingsModal">
    <div class="debate-modal-content" style="max-width: 480px; gap: 1.25rem;">
      <h3 style="font-weight: 800; border-bottom: 1px solid var(--glass-border); padding-bottom: 0.5rem; color: var(--accent); display:flex; align-items:center; gap:8px;">
        🔊 Audio Settings Dashboard
      </h3>
      
      <!-- Global Master Volume Slider -->
      <div class="slider-group">
        <div class="slider-label-val">
          <span style="font-weight:700;">Master Volume</span>
          <span id="modalMasterVolumeLabel">50%</span>
        </div>
        <input type="range" id="modalMasterVolume" min="0" max="100" value="50" class="cyber-slider" oninput="updateMasterVolumeFromModal(this.value)">
      </div>

      <!-- Granular Sound Toggles & Sliders -->
      <div style="display:flex; flex-direction:column; gap:1rem; max-height: 280px; overflow-y:auto; padding-right:6px;">
        <!-- Ambient Drone Synth -->
        <div class="sound-setting-row" style="background:rgba(255,255,255,0.02); padding:0.75rem; border-radius:10px; border:1px solid var(--glass-border); display:flex; flex-direction:column; gap:0.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.85rem; font-weight:700;">🌌 Ambient Drone Synth</span>
            <label class="cyber-switch">
              <input type="checkbox" id="ambientMuteToggle" onchange="toggleSoundCategory('ambient', this.checked)">
              <span class="cyber-switch-slider"></span>
            </label>
          </div>
          <div class="input-group" style="margin-top:0.25rem; gap:0.25rem;">
            <label style="font-size:0.68rem; opacity:0.8;">Pilih Jenis Ambient</label>
            <select id="ambientPresetSelect" onchange="updateAmbientPreset(this.value)" style="padding:0.4rem 0.6rem; font-size:0.8rem; height:32px;">
              <option value="space">🌌 Space Pad (C-Min)</option>
              <option value="forest">🌲 Forest Rain Wind</option>
              <option value="volcano">🌋 Cyber Volcano (Seismic)</option>
              <option value="ocean">🌊 Tidal Ocean Waves</option>
              <option value="neon">🌆 Neon City Synth</option>
              <option value="matrix">📟 Digital Code Rain</option>
              <option value="monastery">🔔 Tibetan Zen Bowl</option>
              <option value="aurora">✨ Cosmic Aurora Borealis</option>
            </select>
          </div>
          <div class="slider-group" id="ambientVolGroup" style="margin-top:0.25rem;">
            <input type="range" id="ambientVolumeOffset" min="0" max="100" value="100" class="cyber-slider" oninput="updateCategoryVolume('ambient', this.value)" style="height:4px;">
          </div>
        </div>

        <!-- UI Click SFX -->
        <div class="sound-setting-row" style="background:rgba(255,255,255,0.02); padding:0.75rem; border-radius:10px; border:1px solid var(--glass-border); display:flex; flex-direction:column; gap:0.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.85rem; font-weight:700;">🖱️ UI Click Feedback</span>
            <label class="cyber-switch">
              <input type="checkbox" id="clickMuteToggle" onchange="toggleSoundCategory('click', this.checked)">
              <span class="cyber-switch-slider"></span>
            </label>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button class="btn-icon" onclick="playSound('click')" style="font-size:0.75rem; padding: 0.25rem 0.5rem;">🔊 Test</button>
          </div>
        </div>

        <!-- Keyboard Typing Ticks -->
        <div class="sound-setting-row" style="background:rgba(255,255,255,0.02); padding:0.75rem; border-radius:10px; border:1px solid var(--glass-border); display:flex; flex-direction:column; gap:0.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.85rem; font-weight:700;">⌨️ Mechanical Keyboard Tick</span>
            <label class="cyber-switch">
              <input type="checkbox" id="typeMuteToggle" onchange="toggleSoundCategory('type', this.checked)">
              <span class="cyber-switch-slider"></span>
            </label>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button class="btn-icon" onclick="playSound('type')" style="font-size:0.75rem; padding: 0.25rem 0.5rem;">🔊 Test</button>
          </div>
        </div>

        <!-- Alert SFX -->
        <div class="sound-setting-row" style="background:rgba(255,255,255,0.02); padding:0.75rem; border-radius:10px; border:1px solid var(--glass-border); display:flex; flex-direction:column; gap:0.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.85rem; font-weight:700;">🔔 Message Alerts (Send/Recv)</span>
            <label class="cyber-switch">
              <input type="checkbox" id="alertsMuteToggle" onchange="toggleSoundCategory('alerts', this.checked)">
              <span class="cyber-switch-slider"></span>
            </label>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button class="btn-icon" onclick="playSound('send')" style="font-size:0.75rem; padding: 0.25rem 0.5rem;">🔊 Test Send</button>
            <button class="btn-icon" onclick="playSound('receive')" style="font-size:0.75rem; padding: 0.25rem 0.5rem;">🔊 Test Recv</button>
          </div>
        </div>

        <!-- AI Streaming Typing Ticks -->
        <div class="sound-setting-row" style="background:rgba(255,255,255,0.02); padding:0.75rem; border-radius:10px; border:1px solid var(--glass-border); display:flex; flex-direction:column; gap:0.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.85rem; font-weight:700;">🤖 AI Stream Typing Tick</span>
            <label class="cyber-switch">
              <input type="checkbox" id="aiTypeMuteToggle" onchange="toggleSoundCategory('aiType', this.checked)">
              <span class="cyber-switch-slider"></span>
            </label>
          </div>
          <div class="input-group" style="margin-top:0.25rem; gap:0.25rem;">
            <label style="font-size:0.68rem; opacity:0.8;">Pilih Jenis Suara AI</label>
            <select id="aiTypeModeSelect" onchange="updateAiTypeMode(this.value)" style="padding:0.4rem 0.6rem; font-size:0.8rem; height:32px;">
              <option value="random">🔀 Random (Ganti Acak Tiap Balasan)</option>
              <option value="type1">🔊 Type 1 (Retro Tick)</option>
              <option value="type2">🔊 Type 2 (Mechanical Clack)</option>
              <option value="type3">🔊 Type 3 (Digital Laser Ping)</option>
            </select>
          </div>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button class="btn-icon" onclick="playSound('aiType')" style="font-size:0.75rem; padding: 0.25rem 0.5rem;">🔊 Test Sound</button>
          </div>
        </div>
      </div>

      <div style="display:flex; gap:1rem;">
        <button class="btn-primary" style="flex:1; padding: 0.75rem 1rem;" onclick="closeSoundSettingsModal()">Done</button>
      </div>
    </div>
  </div>

  <!-- Holographic Phone Call Overlay Screen (Multi-Party Grid Layout) -->
  <div class="hologram-call-screen" id="hologramCallScreen">
    <!-- Top Status indicators -->
    <div class="call-status-indicator">
      <div class="call-status-badge" id="callStatusBadge">dialing...</div>
      <div class="call-duration" id="callDuration">00:00</div>
    </div>

    <!-- Active AI Participants Grid container (Supports multi bot calls simultaneously) -->
    <div class="call-participants-list" id="callParticipantsList">
      <!-- Generated dynamically on call start -->
    </div>

    <!-- Audio Waveform Visualizer -->
    <div class="call-waveform-sim" id="callWaveformSim">
      <div class="call-wave-bar"></div>
      <div class="call-wave-bar"></div>
      <div class="call-wave-bar"></div>
      <div class="call-wave-bar"></div>
      <div class="call-wave-bar"></div>
      <div class="call-wave-bar"></div>
    </div>

    <!-- Live Subtitle / Transcription Box -->
    <div class="call-subtitle-box" id="callSubtitleBox">
      [Menghubungkan saluran audio...]
    </div>

    <!-- User Call controls (Mute mic, Force Reply, End call, Loudspeaker) -->
    <div class="call-user-dock">
      <button class="btn-call-action-circle" id="callMuteMicBtn" onclick="toggleCallUserMute()" title="Mute Mic">
        🎤
      </button>
      
      <!-- Force Response button -->
      <button class="btn-call-action-circle" id="callForceBtn" onclick="forceCallAIResponse()" title="Force AI Response" style="background: rgba(251, 191, 36, 0.15); border-color: #fbbf24; color: #fbbf24;">
        ⚡
      </button>

      <button class="btn-call-action-circle end-call" id="callEndBtn" onclick="endVoiceCall()" title="End Call">
        📞
      </button>
      
      <button class="btn-call-action-circle" id="callSpeakerBtn" onclick="toggleCallSpeakerphone()" title="Loudspeaker">
        📢
      </button>
    </div>
  </div>
`;

// === LocalStorage Persistence Helpers ===
function saveConfig() {
  const apiInput = document.getElementById('apiEndpoint');
  const themeSelect = document.getElementById('themeSelector');
  const config = {
    apiEndpoint: apiInput ? apiInput.value : '/api',
    theme: themeSelect ? themeSelect.value : 'cyan',
    customThemeColor: customThemeColor,
    numAgents: setupAgents.length,
    hasKunows: hasKunows,
    setupAgents: setupAgents,
    availableModels: availableModels,
    userName: userName,
    userPersona: userPersona,
    userAvatar: userAvatar,
    globalMood: globalMood,
    searchEngine: searchEngine,
    soundSettings: soundSettings,
    globalVolume: globalVolume
  };
  localStorage.setItem('multi_ai_config', JSON.stringify(config));
  localStorage.setItem('multi_ai_bot_library', JSON.stringify(botLibrary));
}

// Initial default setup
function initializeDefaultSetupAgents() {
  setupAgents = [
    { name: "Bot 1", model: "fable5-qwen-custom", persona: "Orang biasa.", avatar: null, voiceName: "", speechRate: 1.0, speechPitch: 1.0 },
    { name: "Bot 2", model: "fable5-qwen-custom", persona: "Orang biasa.", avatar: null, voiceName: "", speechRate: 1.0, speechPitch: 1.0 }
  ];
}

function loadConfig() {
  const data = localStorage.getItem('multi_ai_config');
  const libraryData = localStorage.getItem('multi_ai_bot_library');
  
  if (libraryData) {
    try {
      botLibrary = JSON.parse(libraryData);
    } catch(e) {
      botLibrary = [];
    }
  }
  
  if (data) {
    try {
      const config = JSON.parse(data);
      const apiInput = document.getElementById('apiEndpoint');
      if (apiInput) apiInput.value = config.apiEndpoint || '/api';
      
      const themeSelect = document.getElementById('themeSelector');
      if (themeSelect) themeSelect.value = config.theme || 'cyan';
      
      customThemeColor = config.customThemeColor || '#06b6d4';
      const colorInput = document.getElementById('customColorInput');
      if (colorInput) colorInput.value = customThemeColor;
      
      const numInput = document.getElementById('numAgents');
      if (numInput) numInput.value = config.numAgents || 2;
      
      hasKunows = config.hasKunows || false;
      userName = config.userName || "Kamu (Manusia)";
      userPersona = config.userPersona || "Seorang manusia biasa.";
      userAvatar = config.userAvatar || defaultUserAvatar;
      
      globalMood = config.globalMood || 'default';
      const moodSelect = document.getElementById('sidebarMoodSelect');
      if (moodSelect) moodSelect.value = globalMood;

      searchEngine = config.searchEngine || 'ddg';
      const engineSelect = document.getElementById('searchEngineSelect');
      if (engineSelect) engineSelect.value = searchEngine;

      if (config.soundSettings) {
        soundSettings = { ...soundSettings, ...config.soundSettings };
      }
      
      if (config.globalVolume !== undefined) {
        globalVolume = config.globalVolume;
        const volRange = document.getElementById('globalVolumeRange');
        if (volRange) volRange.value = Math.round(globalVolume * 100);
        const valLabel = document.getElementById('globalVolumeValLabel');
        if (valLabel) valLabel.textContent = `${Math.round(globalVolume * 100)}%`;
      }

      if (config.availableModels && config.availableModels.length > 0) {
        availableModels = config.availableModels;
      }
      
      if (config.setupAgents && config.setupAgents.length > 0) {
        setupAgents = config.setupAgents
          .filter(agent => agent !== null && agent !== undefined)
          .map(agent => ({
            name: agent.name || "AI Agent",
            model: agent.model || availableModels[0] || 'fable5-qwen-custom',
            persona: agent.persona || "Orang biasa.",
            avatar: agent.avatar || null,
            voiceName: agent.voiceName || "",
            speechRate: parseFloat(agent.speechRate) || 1.0,
            speechPitch: parseFloat(agent.speechPitch) || 1.0
          }));
      } else {
        initializeDefaultSetupAgents();
      }
      
      theme = config.theme || 'cyan';
      document.body.className = '';
      if (theme === 'custom') {
        if (colorInput) colorInput.style.display = 'block';
        updateCustomAccentColor(customThemeColor);
      } else {
        const themeSelectEl = document.getElementById('themeSelector');
        if (themeSelectEl && theme !== 'custom') {
          document.documentElement.style.removeProperty('--accent');
          document.documentElement.style.removeProperty('--accent-glow');
        }
        document.body.className = '';
        if (theme !== 'cyan') document.body.classList.add(`theme-${theme}`);
      }
    } catch(e) {
      console.error("Failed to load JSON config from localStorage:", e);
      initializeDefaultSetupAgents();
    }
  } else {
    initializeDefaultSetupAgents();
  }

  // Sync / build active agents list to prevent silent fails when user restarts screen
  rebuildActiveAgents();
}

// Check on load if ngrok bypass cookie is set
function checkNgrokAccess(url) {
  if (url.includes('ngrok-free.app')) {
    showNotification("PENTING: Pastikan Anda sudah membuka link Ngrok Anda sekali di tab baru dan mengklik 'Visit Site' agar web publik bisa terhubung!");
  }
}

// Sound Settings Modal Controls
window.openSoundSettingsModal = () => {
  const m = document.getElementById('soundSettingsModal');
  if (m) m.classList.add('open');
  
  // Set modal element values based on soundSettings state
  const masterSlider = document.getElementById('modalMasterVolume');
  const masterLabel = document.getElementById('modalMasterVolumeLabel');
  if (masterSlider && masterLabel) {
    masterSlider.value = Math.round(globalVolume * 100);
    masterLabel.textContent = `${Math.round(globalVolume * 100)}%`;
  }
  
  const ambMute = document.getElementById('ambientMuteToggle');
  if (ambMute) ambMute.checked = !soundSettings.ambientMute;
  
  const ambVol = document.getElementById('ambientVolumeOffset');
  if (ambVol) ambVol.value = Math.round(soundSettings.ambientVolume * 100);
  
  const clickMute = document.getElementById('clickMuteToggle');
  if (clickMute) clickMute.checked = !soundSettings.clickMute;
  
  const typeMute = document.getElementById('typeMuteToggle');
  if (typeMute) typeMute.checked = !soundSettings.typeMute;
  
  const alertsMute = document.getElementById('alertsMuteToggle');
  if (alertsMute) alertsMute.checked = !soundSettings.alertsMute;

  const aiTypeMute = document.getElementById('aiTypeMuteToggle');
  if (aiTypeMute) aiTypeMute.checked = !soundSettings.aiTypeMute;

  const aiTypeMode = document.getElementById('aiTypeModeSelect');
  if (aiTypeMode) aiTypeMode.value = soundSettings.aiTypeMode || 'random';

  const ambPreset = document.getElementById('ambientPresetSelect');
  if (ambPreset) ambPreset.value = soundSettings.ambientPreset || 'space';
  
  playSound('toggle');
  closeSidebar();
};

window.closeSoundSettingsModal = () => {
  const m = document.getElementById('soundSettingsModal');
  if (m) m.classList.remove('open');
  playSound('toggle');
};

window.updateMasterVolumeFromModal = (val) => {
  updateGlobalVolume(val);
  const mainSlider = document.getElementById('globalVolumeRange');
  if (mainSlider) mainSlider.value = val;
  const label = document.getElementById('modalMasterVolumeLabel');
  if (label) label.textContent = `${val}%`;
};

window.toggleSoundCategory = (cat, isChecked) => {
  const isMuted = !isChecked;
  if (cat === 'ambient') {
    soundSettings.ambientMute = isMuted;
    if (ambientSynthNode && ambientSynthNode.mainGain) {
      const vol = isMuted ? 0 : globalVolume * 2.8 * soundSettings.ambientVolume; // 2.8x gain scaling
      ambientSynthNode.mainGain.gain.setValueAtTime(vol, ambientSynthNode.ctx.currentTime);
    }
  } else if (cat === 'click') {
    soundSettings.clickMute = isMuted;
  } else if (cat === 'type') {
    soundSettings.typeMute = isMuted;
  } else if (cat === 'alerts') {
    soundSettings.alertsMute = isMuted;
  } else if (cat === 'aiType') {
    soundSettings.aiTypeMute = isMuted;
  }
  saveConfig();
};

window.updateCategoryVolume = (cat, val) => {
  const dec = val / 100;
  if (cat === 'ambient') {
    soundSettings.ambientVolume = dec;
    if (ambientSynthNode && ambientSynthNode.mainGain) {
      const vol = soundSettings.ambientMute ? 0 : globalVolume * 2.8 * dec; // 2.8x gain scaling
      ambientSynthNode.mainGain.gain.setValueAtTime(vol, ambientSynthNode.ctx.currentTime);
    }
  }
  saveConfig();
};

window.updateAiTypeMode = (val) => {
  soundSettings.aiTypeMode = val;
  saveConfig();
  logTerminal(`AI streaming typing sound preset updated to: ${val}`);
};

window.updateAmbientPreset = (val) => {
  soundSettings.ambientPreset = val;
  saveConfig();
  // Live hot-swap ambient synthesizers if it is currently active
  if (isAmbientPlaying) {
    stopAmbientSynth();
    startAmbientSynth();
  }
  logTerminal(`Ambient drone synthesizer preset updated to: ${val}`);
};

function saveChats() {
  localStorage.setItem('multi_ai_chats', JSON.stringify(chats));
  localStorage.setItem('multi_ai_current_chat_id', currentChatId);
}

function loadChats() {
  const data = localStorage.getItem('multi_ai_chats');
  const activeId = localStorage.getItem('multi_ai_current_chat_id');
  if (data) {
    try {
      chats = JSON.parse(data);
      currentChatId = activeId;
    } catch(e) {
      console.error("Failed to parse chats history:", e);
      chats = [];
      currentChatId = null;
    }
  }
}

// === Sidebar Drawer Controls ===
const sidebarDrawer = document.getElementById('sidebarDrawer');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
  sidebarDrawer.classList.add('open');
  sidebarOverlay.classList.add('open');
  playSound('toggle');
}

function closeSidebar() {
  sidebarDrawer.classList.remove('open');
  sidebarOverlay.classList.remove('open');
  playSound('toggle');
}

document.getElementById('hamburgerBtn').addEventListener('click', openSidebar);
document.getElementById('closeSidebarBtn').addEventListener('click', closeSidebar);
sidebarOverlay.addEventListener('click', closeSidebar);

// Fetch Ollama local models dynamically
async function loadOllamaModels() {
  const apiInput = document.getElementById('apiEndpoint');
  const endpoint = apiInput ? apiInput.value.trim() : '/api';
  const targetUrl = endpoint.endsWith('/api') ? `${endpoint}/tags` : `${endpoint}/api/tags`;
  
  checkNgrokAccess(endpoint);
  logTerminal(`Fetching available models from Ollama endpoint: ${targetUrl}`);
  
  try {
    const res = await fetch(targetUrl, {
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error("HTTP error " + res.status);
    const data = await res.json();
    if (data && data.models) {
      const modelNames = data.models.map(m => m.name);
      if (modelNames.length > 0) {
        availableModels = modelNames;
        saveConfig();
        renderAgentForms();
        showNotification(`Berhasil memuat ${modelNames.length} model dari Ollama!`);
        logTerminal(`Successfully loaded models: ${modelNames.join(', ')}`);
        playSound('success');
      } else {
        showNotification("Ollama terdeteksi aktif, namun belum ada model terinstal.");
      }
    }
  } catch(e) {
    showNotification("Gagal memuat model. Hubungkan ke Ollama terlebih dahulu. Jika menggunakan Ngrok, buka link Ngrok Anda sekali di browser baru dan klik 'Visit Site'!");
    console.error("Tags fetch failed:", e);
    logTerminal("Ollama model fetch failed. Check network or ngrok bypass configuration.");
  }
}

document.getElementById('loadModelsBtn').addEventListener('click', loadOllamaModels);

// Theme custom accent color applier
window.updateCustomAccentColor = (hex) => {
  customThemeColor = hex;
  document.documentElement.style.setProperty('--accent', hex);
  
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  document.documentElement.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.35)`);
  
  document.body.className = '';
  document.body.classList.add('theme-custom');
  saveConfig();
};

// Bind Theme select
const themeSelect = document.getElementById('themeSelector');
const customColorPicker = document.getElementById('customColorInput');
if (themeSelect) {
  themeSelect.addEventListener('change', () => {
    theme = themeSelect.value;
    if (theme === 'custom') {
      if (customColorPicker) customColorPicker.style.display = 'block';
      updateCustomAccentColor(customColorPicker ? customColorPicker.value : '#06b6d4');
    } else {
      if (customColorPicker) customColorPicker.style.display = 'none';
      document.documentElement.style.removeProperty('--accent');
      document.documentElement.style.removeProperty('--accent-glow');
      document.body.className = '';
      if (theme !== 'cyan') document.body.classList.add(`theme-${theme}`);
    }
    saveConfig();
  });
}

// Preset Avatar selection handlers
window.setUserAvatarPreset = (uri) => {
  userAvatar = uri;
  const userImg = document.getElementById('userAvatarImg');
  if (userImg) userImg.src = uri;
  saveConfig();
  renderAgentForms();
};

// Bind preset avatars for agents
window.setAgentAvatarPreset = (index, uri) => {
  if (setupAgents[index]) {
    setupAgents[index].avatar = uri;
    saveConfig();
    renderAgentForms();
  }
};

// Bot Library presets populator
function populateSavedBotsDropdown() {
  const select = document.getElementById('savedBotsDropdown');
  if (!select) return;
  select.innerHTML = '<option value="">-- Muat Bot dari Pustaka --</option>';
  botLibrary.forEach((bot, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${bot.name} (${bot.model})`;
    select.appendChild(opt);
  });
}

window.saveBotToLibrary = (idx) => {
  if (setupAgents[idx]) {
    const bot = setupAgents[idx];
    botLibrary = botLibrary.filter(b => b.name.toLowerCase() !== bot.name.toLowerCase());
    botLibrary.push({
      name: bot.name,
      model: bot.model,
      persona: bot.persona,
      avatar: bot.avatar,
      voiceName: bot.voiceName,
      speechRate: bot.speechRate || 1.0,
      speechPitch: bot.speechPitch || 1.0
    });
    saveConfig();
    populateSavedBotsDropdown();
    showNotification(`Preset bot "${bot.name}" berhasil disimpan ke Pustaka!`);
    logTerminal(`Saved preset bot "${bot.name}" to library.`);
    playSound('success');
  }
};

const loadSavedBotBtn = document.getElementById('loadSavedBotBtn');
if (loadSavedBotBtn) {
  loadSavedBotBtn.addEventListener('click', () => {
    const dropdown = document.getElementById('savedBotsDropdown');
    if (dropdown && dropdown.value !== "") {
      const savedBot = botLibrary[parseInt(dropdown.value)];
      if (savedBot) {
        setupAgents.push({
          name: savedBot.name,
          model: savedBot.model,
          persona: savedBot.persona,
          avatar: savedBot.avatar,
          voiceName: savedBot.voiceName,
          speechRate: savedBot.speechRate || 1.0,
          speechPitch: savedBot.speechPitch || 1.0
        });
        const numInput = document.getElementById('numAgents');
        if (numInput) numInput.value = setupAgents.length;
        renderAgentForms();
        saveConfig();
        showNotification(`Berhasil memuat preset "${savedBot.name}"!`);
        logTerminal(`Loaded preset bot "${savedBot.name}" from library.`);
        playSound('success');
      }
    }
  });
}

// Delete selected bot preset from library
window.deleteBotFromLibrary = () => {
  const dropdown = document.getElementById('savedBotsDropdown');
  if (dropdown && dropdown.value !== "") {
    const idx = parseInt(dropdown.value);
    const botName = botLibrary[idx].name;
    botLibrary.splice(idx, 1);
    saveConfig();
    populateSavedBotsDropdown();
    showNotification(`Preset bot "${botName}" berhasil dihapus dari Pustaka!`);
    logTerminal(`Deleted preset bot "${botName}" from library.`);
    playSound('delete');
  } else {
    showNotification("Pilih bot dari pustaka terlebih dahulu untuk menghapus!");
  }
};

function renderAgentForms() {
  try {
    let html = '';
    
    // Render KUNOWS status badge
    const badgeContainer = document.getElementById('kunowsStatusBadge');
    if (badgeContainer) {
      if (hasKunows) {
        badgeContainer.innerHTML = `
          <span class="locked-badge" style="position: static; display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #ef4444, #060810);">
            🔒 KUNOWS Active (Tersembunyi) 
            <button onclick="deleteSetupKunows()" style="background:none; border:none; color:white; font-size:1rem; cursor:pointer; line-height:1; font-weight:bold;">&times;</button>
          </span>
        `;
        const addKBtn = document.getElementById('addKunowsBtn');
        if (addKBtn) addKBtn.style.display = 'none';
      } else {
        badgeContainer.innerHTML = '';
        const addKBtn = document.getElementById('addKunowsBtn');
        if (addKBtn) addKBtn.style.display = 'block';
      }
    }

    const userPresetsHtml = PRESET_AVATARS.map(preset => {
      const isSelected = userAvatar === preset.uri ? 'selected' : '';
      return `<button class="preset-avatar-btn ${isSelected}" onclick="setUserAvatarPreset('${preset.uri}')"><img src="${preset.uri}"></button>`;
    }).join('');

    html += `
      <div class="agent-card" style="border-color: #3b82f6; background: rgba(59, 130, 246, 0.03);">
        <h3 style="font-size: 1.15rem; color: #3b82f6; display:flex; align-items:center; gap:12px; font-weight: 800;">
          <img id="userAvatarImg" src="${userAvatar}" style="width:36px; height:36px; border-radius:50%; object-fit: cover;"> 
          Profil Kamu (User Manusia)
        </h3>
        <div class="input-group">
          <label>Nama Anda</label>
          <input type="text" id="userNameInput" placeholder="Contoh: Kunowo" value="${escapeHTML(userName)}" oninput="updateUserNameState()">
        </div>
        <div class="input-group">
          <label>Pilih Foto Profil (Bawaan Web)</label>
          <div class="avatar-presets-grid">${userPresetsHtml}</div>
        </div>
        <div class="input-group">
          <label>Sifat/Persona Anda (Cara AI Mengenal Anda)</label>
          <textarea id="userPersonaInput" rows="2" placeholder="Contoh: Pemilik lab yang berwibawa" oninput="updateUserPersonaState()">${escapeHTML(userPersona)}</textarea>
        </div>
      </div>
    `;
    
    setupAgents.forEach((agent, i) => {
      if (!agent) return;
      const defaultColor = COLORS[i % COLORS.length];
      const formAvatarUrl = agent.avatar || generateAvatarDataURI(agent.name, defaultColor);
      
      const botPresetsHtml = PRESET_AVATARS.map(preset => {
        const isSelected = agent.avatar === preset.uri ? 'selected' : '';
        return `<button class="preset-avatar-btn ${isSelected}" onclick="setAgentAvatarPreset(${i}, '${preset.uri}')"><img src="${preset.uri}"></button>`;
      }).join('');
      
      let voiceOptions = systemVoices.map(v => `
        <option value="${v.name}" ${agent.voiceName === v.name ? 'selected' : ''}>${v.name} (${v.lang})</option>
      `).join('');
      
      html += `
        <div class="agent-card">
          <button class="btn-card-del" onclick="deleteSetupAgent(${i})">&times;</button>
          <h3 style="font-size: 1.15rem; color: ${defaultColor}; display:flex; align-items:center; gap:12px; font-weight: 800;">
            <img id="formAvatarImg_${i}" src="${formAvatarUrl}" style="width:36px; height:36px; border-radius:50%; object-fit: cover;"> 
            Profil Agen ${i+1}
          </h3>
          <div class="input-group">
            <label>Nama AI</label>
            <input type="text" id="agentName_${i}" placeholder="Nama" value="${escapeHTML(agent.name)}" oninput="updateSetupAgentName(${i})">
          </div>
          <div class="input-group">
            <label>Pilih Foto Profil (Bawaan Web)</label>
            <div class="avatar-presets-grid">${botPresetsHtml}</div>
          </div>
          <div class="input-group">
            <label>Pilih Suara AI (TTS)</label>
            <select id="agentVoice_${i}" onchange="updateSetupAgentVoice(${i})">
              <option value="">Default System Voice (Otomatis)</option>
              ${voiceOptions}
            </select>
          </div>
          
          <!-- TTS Speed and Pitch Control Sliders -->
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.25rem;">
            <div class="slider-group" style="flex: 1; min-width: 120px;">
              <div class="slider-label-val">
                <span>TTS Speed/Rate</span>
                <span id="rateLabel_${i}">${agent.speechRate || 1.0}x</span>
              </div>
              <input type="range" id="agentRate_${i}" min="0.5" max="2.0" step="0.1" value="${agent.speechRate || 1.0}" class="cyber-slider" oninput="updateSetupAgentRate(${i}, this.value)">
            </div>
            <div class="slider-group" style="flex: 1; min-width: 120px;">
              <div class="slider-label-val">
                <span>TTS Pitch</span>
                <span id="pitchLabel_${i}">${agent.speechPitch || 1.0}x</span>
              </div>
              <input type="range" id="agentPitch_${i}" min="0.5" max="2.0" step="0.1" value="${agent.speechPitch || 1.0}" class="cyber-slider" oninput="updateSetupAgentPitch(${i}, this.value)">
            </div>
          </div>

          <!-- Hybrid model typing input and list selection -->
          <div class="input-group">
            <label>Pilih atau Ketik Model Ollama</label>
            <input type="text" id="agentModel_${i}" list="modelsDatalist_${i}" placeholder="Ketik atau pilih model dari Ollama..." value="${agent.model}" oninput="updateSetupAgentModel(${i})">
            <datalist id="modelsDatalist_${i}">
              ${availableModels.map(m => `<option value="${m}">${m}</option>`).join('')}
            </datalist>
          </div>

          <div class="input-group">
            <label>Sifat/Persona</label>
            <textarea id="agentPersona_${i}" rows="2" placeholder="Persona" oninput="updateSetupAgentPersona(${i})">${escapeHTML(agent.persona)}</textarea>
          </div>
          <button class="btn-icon" onclick="saveBotToLibrary(${i})" style="font-size:0.75rem; padding: 0.4rem 0.8rem; margin-top:0.5rem; width:fit-content; background:rgba(6,182,212,0.1); border-color:var(--accent);">💾 Simpan Ke Pustaka</button>
        </div>
      `;
    });
    
    const container = document.getElementById('agentFormsContainer');
    if (container) {
      container.innerHTML = html;
    }
    populateSavedBotsDropdown();
  } catch(e) {
    console.error("renderAgentForms crash:", e);
  }
}

// User state synchronization
window.updateUserNameState = () => {
  const nameInput = document.getElementById('userNameInput');
  if (nameInput) {
    userName = nameInput.value;
    saveConfig();
  }
};

window.updateUserPersonaState = () => {
  const personaInput = document.getElementById('userPersonaInput');
  if (personaInput) {
    userPersona = personaInput.value;
    saveConfig();
  }
};

// Global window event bindings for config cards
window.updateSetupAgentName = (index) => {
  if (setupAgents[index]) {
    const nameInput = document.getElementById(`agentName_${index}`);
    if (nameInput) {
      const val = nameInput.value || `Bot ${index+1}`;
      setupAgents[index].name = val;
      
      if (!setupAgents[index].avatar) {
        const imgElement = document.getElementById(`formAvatarImg_${index}`);
        if (imgElement) {
          const color = COLORS[index % COLORS.length];
          imgElement.src = generateAvatarDataURI(val, color);
        }
      }
    }
  }
};

window.updateSetupAgentModel = (index) => {
  if (setupAgents[index]) {
    const modelInput = document.getElementById(`agentModel_${index}`);
    if (modelInput) {
      setupAgents[index].model = modelInput.value;
    }
  }
};

window.updateSetupAgentVoice = (index) => {
  if (setupAgents[index]) {
    const voiceSelect = document.getElementById(`agentVoice_${index}`);
    if (voiceSelect) {
      setupAgents[index].voiceName = voiceSelect.value;
      saveConfig();
    }
  }
};

window.updateSetupAgentRate = (index, val) => {
  if (setupAgents[index]) {
    setupAgents[index].speechRate = parseFloat(val);
    const label = document.getElementById(`rateLabel_${index}`);
    if (label) label.textContent = `${val}x`;
    saveConfig();
  }
};

window.updateSetupAgentPitch = (index, val) => {
  if (setupAgents[index]) {
    setupAgents[index].speechPitch = parseFloat(val);
    const label = document.getElementById(`pitchLabel_${index}`);
    if (label) label.textContent = `${val}x`;
    saveConfig();
  }
};

window.updateSetupAgentPersona = (index) => {
  if (setupAgents[index]) {
    const personaInput = document.getElementById(`agentPersona_${index}`);
    if (personaInput) {
      setupAgents[index].persona = personaInput.value;
    }
  }
};

window.deleteSetupAgent = (index) => {
  setupAgents.splice(index, 1);
  const numInput = document.getElementById('numAgents');
  if (numInput) numInput.value = setupAgents.length;
  renderAgentForms();
  saveConfig();
  playSound('delete');
};

window.deleteSetupKunows = () => {
  hasKunows = false;
  renderAgentForms();
  saveConfig();
  playSound('delete');
};

// Initialize number input handler dynamically
const numInput = document.getElementById('numAgents');
if (numInput) {
  numInput.addEventListener('change', () => {
    const targetNum = parseInt(numInput.value) || 1;
    if (setupAgents.length < targetNum) {
      while (setupAgents.length < targetNum) {
        const idx = setupAgents.length;
        setupAgents.push({
          name: `Bot ${idx + 1}`,
          model: availableModels[0] || 'fable5-qwen-custom',
          persona: 'Orang biasa.',
          avatar: null,
          voiceName: "",
          speechRate: 1.0,
          speechPitch: 1.0
        });
      }
    } else if (setupAgents.length > targetNum) {
      setupAgents = setupAgents.slice(0, targetNum);
    }
    renderAgentForms();
    saveConfig();
  });
}

// Button "ADD KUNOWS" handler
const addKBtn = document.getElementById('addKunowsBtn');
if (addKBtn) {
  addKBtn.addEventListener('click', () => {
    hasKunows = true;
    renderAgentForms();
    saveConfig();
    playSound('success');
  });
}

// Sidebar settings updates
window.updateSimDelay = (val) => {
  autoChatDelay = parseFloat(val) * 1000;
  const label = document.getElementById('delayValLabel');
  if (label) label.textContent = `${val}s`;
  logTerminal(`Simulation interval delay updated to: ${val}s`);
};

window.updateGlobalMood = (val) => {
  globalMood = val;
  saveConfig();
  logTerminal(`Global chat mood modified to: ${val}`);
};

window.updateSearchEngine = (val) => {
  searchEngine = val;
  saveConfig();
  logTerminal(`Web Search search engine source changed to: ${val}`);
};

// Global Sound Volume Slider (Controls all audios in real-time)
window.updateGlobalVolume = (val) => {
  globalVolume = val / 100;
  
  const label = document.getElementById('globalVolumeValLabel');
  if (label) label.textContent = `${val}%`;
  
  // Real-time update ambient volume if playing
  if (ambientSynthNode && ambientSynthNode.mainGain) {
    const vol = soundSettings.ambientMute ? 0 : globalVolume * 2.8 * soundSettings.ambientVolume; // 2.8x gain scaling
    ambientSynthNode.mainGain.gain.setValueAtTime(vol, ambientSynthNode.ctx.currentTime);
  }
  saveConfig();
};

// Prompt templates injector
window.injectPromptTemplate = (type) => {
  const templates = {
    swot: "Tolong lakukan analisis SWOT secara rinci dan kritis mengenai topik berikut: ",
    brainstorm: "Lakukan sesi brainstorming kreatif dengan setidaknya 5 ide out-of-the-box mengenai: ",
    debug: "Temukan kelemahan logis, celah keamanan, atau bug, lalu berikan saran perbaikan pada kode/ide berikut: ",
    explain: "Jelaskan dengan analogi sederhana yang mudah dipahami oleh anak kecil mengenai konsep: ",
    socratic: "Gunakan metode tanya-jawab Sokratik untuk mempertanyakan asumsi dasar dari argumen berikut: "
  };
  const input = document.getElementById('chatInput');
  if (input && templates[type]) {
    input.value = templates[type];
    input.focus();
  }
};

// Code block copy helper
window.copyCodeText = (btn) => {
  const pre = btn.parentNode.parentNode.querySelector('pre code');
  if (pre) {
    navigator.clipboard.writeText(pre.innerText).then(() => {
      btn.textContent = "✅ Copied!";
      setTimeout(() => { btn.textContent = "📋 Copy"; }, 2000);
    }).catch(err => {
      console.error("Failed to copy text:", err);
    });
  }
};

// Upgraded Cinematic Ambient Preset Synthesizer (Space, Forest, Volcano, Ocean, Neon, Matrix, Monastery, Aurora)
function startAmbientSynth() {
  try {
    ambientAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const preset = soundSettings.ambientPreset || 'space';
    
    // Master Gain Node (Scale ambient volume dynamically with master gain 2.8x)
    const mainGain = ambientAudioCtx.createGain();
    const vol = soundSettings.ambientMute ? 0 : globalVolume * 2.8 * soundSettings.ambientVolume; // LOUDNESS GAIN MULTIPLIER BOOSTED TO 2.8x
    mainGain.gain.setValueAtTime(vol, ambientAudioCtx.currentTime); 
    
    // Dynamics Compressor Node to prevent clipping at high volumes while maintaining incredible richness
    const compressor = ambientAudioCtx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-24, ambientAudioCtx.currentTime);
    compressor.knee.setValueAtTime(30, ambientAudioCtx.currentTime);
    compressor.ratio.setValueAtTime(12, ambientAudioCtx.currentTime);
    compressor.attack.setValueAtTime(0.003, ambientAudioCtx.currentTime);
    compressor.release.setValueAtTime(0.25, ambientAudioCtx.currentTime);
    
    mainGain.connect(compressor);
    compressor.connect(ambientAudioCtx.destination);

    let oscs = [];
    let lfos = [];
    let noiseSources = [];

    if (preset === 'space') {
      // Cinematic Space Pad Synth (Original C-Minor 7th detuned chords - Loudness Boosted)
      const freqs = [65.41, 98.00, 155.56, 233.08];
      
      const synthFilter = ambientAudioCtx.createBiquadFilter();
      synthFilter.type = 'lowpass';
      synthFilter.frequency.setValueAtTime(350, ambientAudioCtx.currentTime); // Raised cutoff for richness
      synthFilter.Q.setValueAtTime(3.5, ambientAudioCtx.currentTime);
      synthFilter.connect(mainGain);
      
      freqs.forEach((freq, idx) => {
        const oscL = ambientAudioCtx.createOscillator();
        oscL.type = idx % 2 === 0 ? 'triangle' : 'sine';
        oscL.frequency.setValueAtTime(freq - (idx * 0.15 + 0.2), ambientAudioCtx.currentTime);
        
        const oscR = ambientAudioCtx.createOscillator();
        oscR.type = idx % 2 === 0 ? 'triangle' : 'sine';
        oscR.frequency.setValueAtTime(freq + (idx * 0.15 + 0.2), ambientAudioCtx.currentTime);
        
        oscL.connect(synthFilter);
        oscR.connect(synthFilter);
        oscs.push(oscL, oscR);
      });

      const lfo = ambientAudioCtx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.05, ambientAudioCtx.currentTime);
      
      const lfoGain = ambientAudioCtx.createGain();
      lfoGain.gain.setValueAtTime(160, ambientAudioCtx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(synthFilter.frequency);
      lfos.push(lfo);
      
      // Air hiss wind simulation
      const bufferSize = ambientAudioCtx.sampleRate * 2; 
      const noiseBuffer = ambientAudioCtx.createBuffer(1, bufferSize, ambientAudioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
      
      const noiseSource = ambientAudioCtx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      
      const noiseFilter = ambientAudioCtx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(300, ambientAudioCtx.currentTime);
      
      const noiseGain = ambientAudioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.08, ambientAudioCtx.currentTime); // Boosted wind hiss
      
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(mainGain);
      noiseSources.push(noiseSource);

    } else if (preset === 'forest') {
      // Forest Rain & Whistling Wind Pad (Loudness Boosted)
      const freqs = [329.63, 440.00, 523.25]; // E4, A4, C5 (soft whistles)
      
      freqs.forEach((freq, idx) => {
        const osc = ambientAudioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ambientAudioCtx.currentTime);
        
        const oscGain = ambientAudioCtx.createGain();
        oscGain.gain.setValueAtTime(0.025, ambientAudioCtx.currentTime); // Boosted flute whistles
        
        const vLfo = ambientAudioCtx.createOscillator();
        vLfo.type = 'sine';
        vLfo.frequency.setValueAtTime(0.06 + idx * 0.02, ambientAudioCtx.currentTime);
        const vLfoGain = ambientAudioCtx.createGain();
        vLfoGain.gain.setValueAtTime(0.015, ambientAudioCtx.currentTime);
        
        vLfo.connect(vLfoGain);
        vLfoGain.connect(oscGain.gain);
        
        osc.connect(oscGain);
        oscGain.connect(mainGain);
        
        oscs.push(osc);
        lfos.push(vLfo);
      });

      // Rain wind noise sweep
      const bufferSize = ambientAudioCtx.sampleRate * 2;
      const noiseBuffer = ambientAudioCtx.createBuffer(1, bufferSize, ambientAudioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
      
      const noiseSource = ambientAudioCtx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      
      const bpFilter = ambientAudioCtx.createBiquadFilter();
      bpFilter.type = 'bandpass';
      bpFilter.frequency.setValueAtTime(450, ambientAudioCtx.currentTime);
      bpFilter.Q.setValueAtTime(1.5, ambientAudioCtx.currentTime);
      
      const windLfo = ambientAudioCtx.createOscillator();
      windLfo.type = 'sine';
      windLfo.frequency.setValueAtTime(0.07, ambientAudioCtx.currentTime);
      const windLfoGain = ambientAudioCtx.createGain();
      windLfoGain.gain.setValueAtTime(250, ambientAudioCtx.currentTime);
      
      windLfo.connect(windLfoGain);
      windLfoGain.connect(bpFilter.frequency);
      
      const bpGain = ambientAudioCtx.createGain();
      bpGain.gain.setValueAtTime(0.15, ambientAudioCtx.currentTime); // Boosted rain wind
      
      noiseSource.connect(bpFilter);
      bpFilter.connect(bpGain);
      bpGain.connect(mainGain);
      
      lfos.push(windLfo);
      noiseSources.push(noiseSource);

    } else if (preset === 'volcano') {
      // Deep Seismic Volcano (Sub-bass rumble synth - Loudness Boosted)
      const freqs = [45.00, 55.00, 65.00]; 
      
      const rumbleFilter = ambientAudioCtx.createBiquadFilter();
      rumbleFilter.type = 'lowpass';
      rumbleFilter.frequency.setValueAtTime(110, ambientAudioCtx.currentTime); // Raised for audible bass rumble
      rumbleFilter.Q.setValueAtTime(6.0, ambientAudioCtx.currentTime);
      rumbleFilter.connect(mainGain);
      
      freqs.forEach((freq, idx) => {
        const osc = ambientAudioCtx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, ambientAudioCtx.currentTime);
        osc.connect(rumbleFilter);
        oscs.push(osc);
      });

      const lfo = ambientAudioCtx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.03, ambientAudioCtx.currentTime);
      const lfoGain = ambientAudioCtx.createGain();
      lfoGain.gain.setValueAtTime(30, ambientAudioCtx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(rumbleFilter.frequency);
      lfos.push(lfo);

      // Deep rumble noise
      const bufferSize = ambientAudioCtx.sampleRate * 2;
      const noiseBuffer = ambientAudioCtx.createBuffer(1, bufferSize, ambientAudioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
      
      const noiseSource = ambientAudioCtx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      
      const noiseFilter = ambientAudioCtx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(75, ambientAudioCtx.currentTime);
      
      const noiseGain = ambientAudioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.20, ambientAudioCtx.currentTime); // Boosted rumble noise
      
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(mainGain);
      noiseSources.push(noiseSource);

    } else if (preset === 'ocean') {
      // Ocean Wave Tide Sweeps (Loudness Boosted)
      const bufferSize = ambientAudioCtx.sampleRate * 3;
      const noiseBuffer = ambientAudioCtx.createBuffer(1, bufferSize, ambientAudioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
      
      const noiseSource = ambientAudioCtx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      
      const oceanFilter = ambientAudioCtx.createBiquadFilter();
      oceanFilter.type = 'lowpass';
      oceanFilter.frequency.setValueAtTime(250, ambientAudioCtx.currentTime);
      
      const tideGain = ambientAudioCtx.createGain();
      tideGain.gain.setValueAtTime(0.10, ambientAudioCtx.currentTime); // Boosted base wave
      
      const tideLfo = ambientAudioCtx.createOscillator();
      tideLfo.type = 'sine';
      tideLfo.frequency.setValueAtTime(0.04, ambientAudioCtx.currentTime); // 25-second tide interval
      
      const tideLfoGain = ambientAudioCtx.createGain();
      tideLfoGain.gain.setValueAtTime(0.08, ambientAudioCtx.currentTime); // Boosted tide sweep amplitude
      
      tideLfo.connect(tideLfoGain);
      tideLfoGain.connect(tideGain.gain);
      
      const filterLfoGain = ambientAudioCtx.createGain();
      filterLfoGain.gain.setValueAtTime(150, ambientAudioCtx.currentTime);
      tideLfo.connect(filterLfoGain);
      filterLfoGain.connect(oceanFilter.frequency);
      
      noiseSource.connect(oceanFilter);
      oceanFilter.connect(tideGain);
      tideGain.connect(mainGain);
      
      oscs.push(tideLfo);
      lfos.push(tideLfo);
      noiseSources.push(noiseSource);

    } else if (preset === 'neon') {
      // Preset 5: Neon City Synth (Bright, hopeful retro skyline chord)
      const freqs = [130.81, 164.81, 196.00, 261.63]; // C3, E3, G3, C4 (C-Major)
      
      const filter = ambientAudioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ambientAudioCtx.currentTime);
      filter.Q.setValueAtTime(5.0, ambientAudioCtx.currentTime);
      filter.connect(mainGain);

      freqs.forEach((freq, idx) => {
        const osc = ambientAudioCtx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ambientAudioCtx.currentTime);
        
        const g = ambientAudioCtx.createGain();
        g.gain.setValueAtTime(0.08, ambientAudioCtx.currentTime);
        
        // Modulate individual osc phases slowly for detune
        const detuneLfo = ambientAudioCtx.createOscillator();
        detuneLfo.frequency.setValueAtTime(0.2 + idx * 0.1, ambientAudioCtx.currentTime);
        const dGain = ambientAudioCtx.createGain();
        dGain.gain.setValueAtTime(15, ambientAudioCtx.currentTime);
        
        detuneLfo.connect(dGain);
        dGain.connect(osc.detune);

        osc.connect(g);
        g.connect(filter);
        oscs.push(osc);
        lfos.push(detuneLfo);
      });

      // Neon flicker LFO sweeping filter
      const lfo = ambientAudioCtx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.15, ambientAudioCtx.currentTime);
      const lfoG = ambientAudioCtx.createGain();
      lfoG.gain.setValueAtTime(300, ambientAudioCtx.currentTime);
      lfo.connect(lfoG);
      lfoG.connect(filter.frequency);
      lfos.push(lfo);

      // Low bass backing pad
      const subOsc = ambientAudioCtx.createOscillator();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(65.41, ambientAudioCtx.currentTime); // C2
      const subGain = ambientAudioCtx.createGain();
      subGain.gain.setValueAtTime(0.35, ambientAudioCtx.currentTime); // Deep warm sub-bass
      subOsc.connect(subGain);
      subGain.connect(mainGain);
      oscs.push(subOsc);

    } else if (preset === 'matrix') {
      // Preset 6: Digital Code Rain (Falling digital code sweeps and terminal hum)
      const baseHum = ambientAudioCtx.createOscillator();
      baseHum.type = 'square';
      baseHum.frequency.setValueAtTime(110.00, ambientAudioCtx.currentTime); // A2 deep digital hum
      
      const humFilter = ambientAudioCtx.createBiquadFilter();
      humFilter.type = 'lowpass';
      humFilter.frequency.setValueAtTime(120, ambientAudioCtx.currentTime);
      
      const humGain = ambientAudioCtx.createGain();
      humGain.gain.setValueAtTime(0.18, ambientAudioCtx.currentTime);
      
      baseHum.connect(humFilter);
      humFilter.connect(humGain);
      humGain.connect(mainGain);
      oscs.push(baseHum);

      // Falling code droplets (Modulated sine pings)
      const dropFreqs = [880, 1200, 1500]; // high tech frequencies
      dropFreqs.forEach((freq, idx) => {
        const dropOsc = ambientAudioCtx.createOscillator();
        dropOsc.type = 'sine';
        dropOsc.frequency.setValueAtTime(freq, ambientAudioCtx.currentTime);
        
        const dropGain = ambientAudioCtx.createGain();
        dropGain.gain.setValueAtTime(0.005, ambientAudioCtx.currentTime);
        
        // Modulate frequency downwards rapidly to simulate code dropping
        const fLfo = ambientAudioCtx.createOscillator();
        fLfo.type = 'sawtooth'; // ramp down frequency
        fLfo.frequency.setValueAtTime(0.4 + idx * 0.15, ambientAudioCtx.currentTime);
        const fLfoGain = ambientAudioCtx.createGain();
        fLfoGain.gain.setValueAtTime(-500, ambientAudioCtx.currentTime); // slides down by 500Hz
        
        fLfo.connect(fLfoGain);
        fLfoGain.connect(dropOsc.frequency);

        // Modulate volume synchronized to falling drops
        const vLfo = ambientAudioCtx.createOscillator();
        vLfo.type = 'sine';
        vLfo.frequency.setValueAtTime(0.4 + idx * 0.15, ambientAudioCtx.currentTime);
        const vLfoGain = ambientAudioCtx.createGain();
        vLfoGain.gain.setValueAtTime(0.025, ambientAudioCtx.currentTime);
        
        vLfo.connect(vLfoGain);
        vLfoGain.connect(dropGain.gain);

        dropOsc.connect(dropGain);
        dropGain.connect(mainGain);
        
        oscs.push(dropOsc);
        lfos.push(fLfo, vLfo);
      });

    } else if (preset === 'monastery') {
      // Preset 7: Tibetan Zen Bowl (Excited high-resonance bell rings and meditation drone)
      const bowlFreqs = [220.00, 293.66, 440.00, 587.33]; // A3, D4, A4, D5
      
      // Meditative warm drone base
      const baseDrone = ambientAudioCtx.createOscillator();
      baseDrone.type = 'sine';
      baseDrone.frequency.setValueAtTime(55.00, ambientAudioCtx.currentTime); // A1
      const baseDroneGain = ambientAudioCtx.createGain();
      baseDroneGain.gain.setValueAtTime(0.35, ambientAudioCtx.currentTime);
      baseDrone.connect(baseDroneGain);
      baseDroneGain.connect(mainGain);
      oscs.push(baseDrone);

      bowlFreqs.forEach((freq, idx) => {
        const osc = ambientAudioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ambientAudioCtx.currentTime);
        
        const filter = ambientAudioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(freq, ambientAudioCtx.currentTime);
        filter.Q.setValueAtTime(15, ambientAudioCtx.currentTime); // High selectivity creates bowl ringing

        const g = ambientAudioCtx.createGain();
        g.gain.setValueAtTime(0.015, ambientAudioCtx.currentTime);

        // Modulate singing bowl resonance gain very slowly (long meditative swells)
        const swellLfo = ambientAudioCtx.createOscillator();
        swellLfo.type = 'sine';
        swellLfo.frequency.setValueAtTime(0.04 + idx * 0.015, ambientAudioCtx.currentTime);
        const swellLfoGain = ambientAudioCtx.createGain();
        swellLfoGain.gain.setValueAtTime(0.012, ambientAudioCtx.currentTime);

        swellLfo.connect(swellLfoGain);
        swellLfoGain.connect(g.gain);

        osc.connect(filter);
        filter.connect(g);
        g.connect(mainGain);

        oscs.push(osc);
        lfos.push(swellLfo);
      });

    } else if (preset === 'aurora') {
      // Preset 8: Cosmic Aurora Borealis (Ethereal sweeping solar wind cords)
      const freqs = [220.00, 277.18, 329.63, 392.00]; // A3, C#4, E4, G4 (A7 ethereal sweep)
      
      const sweepFilter = ambientAudioCtx.createBiquadFilter();
      sweepFilter.type = 'lowpass';
      sweepFilter.frequency.setValueAtTime(500, ambientAudioCtx.currentTime);
      sweepFilter.Q.setValueAtTime(4.0, ambientAudioCtx.currentTime);
      sweepFilter.connect(mainGain);

      freqs.forEach((freq, idx) => {
        const osc = ambientAudioCtx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ambientAudioCtx.currentTime);
        
        const g = ambientAudioCtx.createGain();
        g.gain.setValueAtTime(0.12, ambientAudioCtx.currentTime);

        // Detune solar sweeps slightly
        const detLfo = ambientAudioCtx.createOscillator();
        detLfo.frequency.setValueAtTime(0.05 + idx * 0.02, ambientAudioCtx.currentTime);
        const detG = ambientAudioCtx.createGain();
        detG.gain.setValueAtTime(10, ambientAudioCtx.currentTime);
        
        detLfo.connect(detG);
        detG.connect(osc.detune);

        osc.connect(g);
        g.connect(sweepFilter);

        oscs.push(osc);
        lfos.push(detLfo);
      });

      // Dual interactive LFOs sweeping filters to simulate northern lights phasers
      const lfo1 = ambientAudioCtx.createOscillator();
      lfo1.frequency.setValueAtTime(0.04, ambientAudioCtx.currentTime);
      const lfoG1 = ambientAudioCtx.createGain();
      lfoG1.gain.setValueAtTime(200, ambientAudioCtx.currentTime);
      lfo1.connect(lfoG1);
      lfoG1.connect(sweepFilter.frequency);

      const lfo2 = ambientAudioCtx.createOscillator();
      lfo2.frequency.setValueAtTime(0.06, ambientAudioCtx.currentTime);
      const lfoG2 = ambientAudioCtx.createGain();
      lfoG2.gain.setValueAtTime(150, ambientAudioCtx.currentTime);
      lfo2.connect(lfoG2);
      lfoG2.connect(sweepFilter.frequency); // stacked sweep modulation

      lfos.push(lfo1, lfo2);
    }

    oscs.forEach(osc => { try { osc.start(); } catch(e){} });
    lfos.forEach(lfo => { try { lfo.start(); } catch(e){} });
    noiseSources.forEach(ns => { try { ns.start(); } catch(e){} });
    
    ambientSynthNode = { oscs, lfos, noiseSources, mainGain, ctx: ambientAudioCtx };
    isAmbientPlaying = true;
    
    const btn = document.getElementById('toggleAmbientSynthBtn');
    if (btn) {
      btn.textContent = `🎵 Ambient Synth: ON (${preset.toUpperCase()})`;
      btn.classList.add('active');
    }
    
    logTerminal(`Ambient drone preset [${preset}] activated.`);
  } catch(e) {
    console.error("Ambient Synth failed:", e);
  }
}

// Cleans up all node arrays in Ambient synthesizer
function stopAmbientSynth() {
  if (ambientSynthNode) {
    try {
      ambientSynthNode.oscs.forEach(osc => { try { osc.stop(); } catch(e){} });
      ambientSynthNode.lfos.forEach(lfo => { try { lfo.stop(); } catch(e){} });
      ambientSynthNode.noiseSources.forEach(ns => { try { ns.stop(); } catch(e){} });
      ambientSynthNode.ctx.close();
    } catch(e) {}
    ambientSynthNode = null;
    ambientAudioCtx = null;
  }
  isAmbientPlaying = false;
  const btn = document.getElementById('toggleAmbientSynthBtn');
  if (btn) {
    btn.textContent = "🎵 Ambient Synth: OFF";
    btn.classList.remove('active');
  }
  
  logTerminal("Ambient drone synthesizer stopped.");
}

const toggleAmbientBtn = document.getElementById('toggleAmbientSynthBtn');
if (toggleAmbientBtn) {
  toggleAmbientBtn.addEventListener('click', () => {
    if (isAmbientPlaying) {
      stopAmbientSynth();
    } else {
      startAmbientSynth();
    }
  });
}

// Speech Recognition Engine (Mic Input)
let recognition = null;
let isListening = false;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRec();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'id-ID';
  
  recognition.onstart = () => {
    isListening = true;
    const micBtn = document.getElementById('micBtn');
    if (micBtn) {
      micBtn.style.borderColor = '#ef4444';
      micBtn.style.color = '#ef4444';
      micBtn.textContent = "🔴";
    }
    showNotification("Mendengarkan suara Anda...");
    logTerminal("Web Speech Recognition listener active.");
  };
  
  recognition.onend = () => {
    isListening = false;
    const micBtn = document.getElementById('micBtn');
    if (micBtn) {
      micBtn.style.borderColor = 'var(--glass-border)';
      micBtn.style.color = 'var(--text-secondary)';
      micBtn.textContent = "🎤";
    }
  };
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
      chatInput.value = transcript;
      chatInput.focus();
    }
    showNotification(`Diterjemahkan: "${transcript}"`);
    logTerminal(`Web Speech Recognition transcript captured: "${transcript}"`);
  };
}

const micButton = document.getElementById('micBtn');
if (micButton) {
  if (recognition) {
    micButton.addEventListener('click', () => {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    });
  } else {
    micButton.style.display = 'none';
  }
}

// Document/Text Attachment File Uploader
const fileUploaderInput = document.getElementById('fileUploaderInput');
const attachFileBtn = document.getElementById('attachFileBtn');
if (attachFileBtn && fileUploaderInput) {
  attachFileBtn.addEventListener('click', () => fileUploaderInput.click());
  fileUploaderInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const fileName = file.name;
        
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
          chatInput.value = `[DOKUMEN LAMPIRAN: ${fileName}]\nIsi:\n${fileContent.substring(0, 1800)}\n\nPertanyaan mengenai dokumen ini: `;
          chatInput.focus();
          showNotification("File loaded successfully.");
          logTerminal(`Text file "${fileName}" uploaded.`);
        }
      };
      reader.readAsText(file);
    }
  });
}

// Terminal collapse controls
window.toggleTerminalPanel = () => {
  const panel = document.getElementById('terminalPanel');
  const btn = document.getElementById('terminalToggleBtn');
  if (panel && btn) {
    panel.classList.toggle('expanded');
    if (panel.classList.contains('expanded')) {
      btn.textContent = "▼ Collapse";
    } else {
      btn.textContent = "▲ Expand";
    }
    playSound('toggle');
  }
};

// Debate arena modals trigger
window.openDebateModal = () => {
  const m = document.getElementById('debateModal');
  if (m) m.classList.add('open');
  playSound('toggle');
  closeSidebar();
};
window.closeDebateModal = () => {
  const m = document.getElementById('debateModal');
  if (m) m.classList.remove('open');
  playSound('toggle');
};

window.launchAIDebate = async () => {
  const topicInput = document.getElementById('debateTopicInput');
  const topic = topicInput ? topicInput.value.trim() : '';
  if (!topic) return;
  closeDebateModal();
  
  createNewChatSession();
  
  const session = chats.find(c => c.id === currentChatId);
  if (session) {
    session.title = `Debat ⚔️: ${topic.substring(0, 20)}...`;
    renderChatHistory();
  }
  
  appendUserMessage(`[SIMULASI DEBAT DIMULAI] Topik: ${topic}`);
  logTerminal("Debate simulation started.");
  
  if (agents.length >= 2) {
    const memory0 = getSessionAgentMemory(session, agents[0].name, agents[0].persona, agents[0].isLocked);
    memory0.push({
      role: 'system',
      content: `Anda sedang berada di arena DEBAT. Topik debat: "${topic}". Anda berada di pihak PRO (setuju). Berikan argumen pro Anda secara tajam, tanggapi argumen kontra lawan dengan cerdas, dan jaga argumen Anda tetap singkat (max 3 kalimat).`
    });
    const memory1 = getSessionAgentMemory(session, agents[1].name, agents[1].persona, agents[1].isLocked);
    memory1.push({
      role: 'system',
      content: `Anda sedang berada di arena DEBAT. Topik debat: "${topic}". Anda berada di pihak KONTRA (tidak setuju). Berikan argumen kontra lawan secara tajam, sanggah argumen pro lawan secara langsung, dan jaga argumen Anda tetap singkat (max 3 kalimat).`
    });
  }
  
  isAutoChatEnabled = true;
  const toggleAutoBtn = document.getElementById('toggleAutoChatBtn');
  if (toggleAutoBtn) {
    toggleAutoBtn.textContent = "⏸️ Pause AI";
    toggleAutoBtn.classList.add('active');
  }
  
  await triggerAIReply();
};

// Export Dropdown menu controls
window.toggleExportMenu = () => {
  const menu = document.getElementById('exportDropdownMenu');
  if (menu) {
    menu.classList.toggle('open');
    playSound('toggle');
  }
};

// Close export dropdown when clicking elsewhere
document.addEventListener('click', (e) => {
  const wrapper = document.querySelector('.export-dropdown-wrapper');
  const menu = document.getElementById('exportDropdownMenu');
  if (menu && wrapper && !wrapper.contains(e.target)) {
    menu.classList.remove('open');
  }
});

window.exportToText = () => {
  const msgsDiv = document.getElementById('chatMessages');
  if (!msgsDiv) return;
  let textToSave = "=== LOG OBROLAN MULTI-AI ===\n\n";
  const messages = msgsDiv.querySelectorAll('.message-wrapper');
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
  logTerminal("Text chat log exported successfully.");
  toggleExportMenu();
};

window.exportToHTML = () => {
  const msgsDiv = document.getElementById('chatMessages');
  if (!msgsDiv) return;
  
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Arsip AI Multiverse Lab Chat Log</title>
      <style>
        body { background: #080c14; color: #f3f4f6; font-family: 'Segoe UI', sans-serif; padding: 2rem; }
        .message-wrapper { display: flex; margin-bottom: 1.5rem; max-width: 80%; align-items: flex-end; gap: 10px; }
        .message-wrapper.user { align-self: flex-end; margin-left: auto; flex-direction: row-reverse; }
        .avatar { width: 42px; height: 42px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.08); }
        .message-sender { font-size: 0.75rem; font-weight: bold; margin-bottom: 4px; }
        .message-bubble { padding: 1rem; border-radius: 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); line-height: 1.5; }
        .message-wrapper.user .message-bubble { background: linear-gradient(135deg, #1d4ed8, #3b82f6); }
        .reply-text { font-size: 0.95rem; }
      </style>
    </head>
    <body>
      <h2 style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; color: #06b6d4;">Arsip AI Multiverse Lab Chat Log</h2>
      <div style="display:flex; flex-direction:column; gap:1rem; margin-top:2rem;">
  `;
  
  const wrappers = msgsDiv.querySelectorAll('.message-wrapper');
  wrappers.forEach(w => {
    const isUser = w.classList.contains('user');
    const sender = w.querySelector('.message-sender').textContent;
    const avatar = w.querySelector('.avatar').src;
    const bubble = w.querySelector('.message-bubble').innerHTML;
    
    htmlContent += `
      <div class="message-wrapper ${isUser ? 'user' : 'ai'}">
        <img class="avatar" src="${avatar}">
        <div>
          <div class="message-sender">${escapeHTML(sender)}</div>
          <div class="message-bubble">${bubble}</div>
        </div>
      </div>
    `;
  });
  
  htmlContent += `
      </div>
    </body>
    </html>
  `;
  
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "Chat_Archive_MultiAI.html";
  a.click();
  URL.revokeObjectURL(url);
  logTerminal("HTML visual archive exported successfully.");
  toggleExportMenu();
};

// Chat Sessions Logic
function renderChatHistory() {
  const historyList = document.getElementById('chatHistoryList');
  if (!historyList) return;
  historyList.innerHTML = '';
  chats.forEach(c => {
    const activeClass = c.id === currentChatId ? 'active' : '';
    const isGenerating = activeStreams.has(c.id);

    let loadingIndicator = '';
    if (isGenerating) {
      loadingIndicator = `
        <div class="sidebar-generating-indicator" title="Sedang memproses jawaban...">
          <div class="mini-spinner"></div>
        </div>
      `;
    }

    const item = document.createElement('div');
    item.className = `history-item ${activeClass}`;
    item.innerHTML = `
      <span class="history-title" onclick="loadChatSession('${c.id}')">
        ${escapeHTML(c.title)}
        ${loadingIndicator}
      </span>
      <button class="btn-history-del" onclick="deleteChatSession(event, '${c.id}')">&times;</button>
    `;
    historyList.appendChild(item);
  });
}

window.loadChatSession = (id) => {
  const session = chats.find(c => c.id === id);
  if (!session) return;
  
  currentChatId = id;
  isChatActive = true;
  lastSpeaker = null;
  
  document.getElementById('setupScreen').style.display = 'none';
  document.getElementById('chatScreen').style.display = 'flex';
  
  const msgsDiv = document.getElementById('chatMessages');
  if (msgsDiv) {
    msgsDiv.innerHTML = '';
    const isGenerating = activeStreams.has(id);
    const generatingInfo = activeStreams.get(id);

    session.messages.forEach((m, idx) => {
      if (m.role === 'user') {
        appendUserMessageUI(m.content, idx);
      } else {
        const isThisMessageGenerating = isGenerating && idx === session.messages.length - 1;
        if (isThisMessageGenerating) {
          const bubbleId = generatingInfo.bubbleId;
          const div = document.createElement('div');
          div.className = 'message-wrapper ai';
          div.id = `wrapper_${bubbleId}`;
          div.innerHTML = `
            <div class="avatar-container" id="avatar_${bubbleId}">
              <img src="${m.avatarUrl}" class="avatar" style="object-fit: cover; border-radius: 50%;">
              <div class="sound-badge">🔊</div>
            </div>
            <div class="message-content">
              <div class="message-sender" style="color: ${m.color}">${m.name}</div>
              <div class="message-bubble" id="${bubbleId}">
                <span id="text_${bubbleId}">${renderContentWithThink(m.content)}</span>
                <span class="cursor" id="cursor_${bubbleId}"></span>
              </div>
              <div class="speedometer-badge" id="speed_${bubbleId}">⚡ ${generatingInfo.tps} tokens/s | ${generatingInfo.tokensCount} tokens</div>
            </div>
          `;
          msgsDiv.appendChild(div);
          
          div.querySelector(`#avatar_${bubbleId}`).addEventListener('click', () => {
            speakText(m.content, m.voiceName, bubbleId, m.speechRate, m.speechPitch);
          });
        } else {
          appendAIMessageUI(m.name, m.color, m.content, m.avatarUrl, idx);
        }
      }
    });

    const stopBtn = document.getElementById('stopStreamingBtn');
    if (stopBtn) {
      stopBtn.style.display = isGenerating ? 'flex' : 'none';
    }
  }
  
  // Reconstruct active agents array if empty (Ensures reliability on switches)
  if (agents.length === 0) {
    rebuildActiveAgents();
  }

  // Initialize memories inside target session if empty
  agents.forEach(a => {
    getSessionAgentMemory(session, a.name, a.persona, a.isLocked);
  });
  
  renderChatHistory();
  saveChats();
  closeSidebar();
  scrollToBottom(true);
  
  startAutoChat();
};

window.deleteChatSession = (event, id) => {
  event.stopPropagation();
  
  const streamInfo = activeStreams.get(id);
  if (streamInfo && streamInfo.abortController) {
    streamInfo.abortController.abort();
  }
  activeStreams.delete(id);

  chats = chats.filter(c => c.id !== id);
  if (currentChatId === id) {
    currentChatId = null;
    const msgsDiv = document.getElementById('chatMessages');
    if (msgsDiv) msgsDiv.innerHTML = '';
    isChatActive = false;
    if (autoChatInterval) clearTimeout(autoChatInterval);
    const configBtn = document.getElementById('editBtn');
    if (configBtn) configBtn.click();
  }
  renderChatHistory();
  saveChats();
  playSound('delete');
};

function createNewChatSession() {
  const d = new Date();
  const dateStr = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
  const newId = `chat_${Date.now()}`;
  const newSession = {
    id: newId,
    title: `Obrolan (Ops) #${chats.length + 1} (${dateStr})`,
    messages: [],
    agentMemories: {}
  };
  
  chats.push(newSession);
  currentChatId = newId;
  const msgsDiv = document.getElementById('chatMessages');
  if (msgsDiv) msgsDiv.innerHTML = '';
  
  if (agents.length === 0) {
    rebuildActiveAgents();
  }

  agents.forEach(a => {
    getSessionAgentMemory(newSession, a.name, a.persona, a.isLocked);
  });
  
  renderChatHistory();
  saveChats();
  
  document.getElementById('setupScreen').style.display = 'none';
  document.getElementById('chatScreen').style.display = 'flex';
  isChatActive = true;
  closeSidebar();
  startAutoChat();
}

const newChatButton = document.getElementById('newChatBtn');
if (newChatButton) {
  newChatButton.addEventListener('click', createNewChatSession);
}

// Config startup button with Immersive Cyber Boot Sequence
const startButton = document.getElementById('startBtn');
if (startButton) {
  startButton.addEventListener('click', () => {
    const bootScreen = document.getElementById('cyberBootScreen');
    const bootBar = document.getElementById('bootProgressBar');
    const bootPercent = document.getElementById('bootPercent');
    const bootTerm = document.getElementById('bootTerminal');
    
    if (!bootScreen || !bootBar || !bootPercent || !bootTerm) {
      proceedToInitialization();
      return;
    }
    
    bootScreen.classList.add('active');
    bootBar.style.width = '0%';
    bootPercent.textContent = '0%';
    bootTerm.innerHTML = '';
    
    const logs = [
      { pct: 15, msg: 'INITIALIZING MULTIVERSE ENGINE...' },
      { pct: 32, msg: 'LINKING LOCAL PORT PROXIES...' },
      { pct: 48, msg: 'OLLAMA CONNECTION VERIFIED' },
      { pct: 65, msg: 'SYNCHRONIZING AI AGENTS CORE...' },
      { pct: 80, msg: 'ALLOCATING SESSION MEMORY POOLS...' },
      { pct: 92, msg: 'MOUNTING AUDIO SPEECH INTEGRATION...' },
      { pct: 100, msg: 'BOOT SUCCESSFUL! ACCESS GRANTED.' }
    ];
    
    let currentLogIndex = 0;
    let progress = 0;
    
    playSound('toggle');
    
    const interval = setInterval(() => {
      progress += 2;
      if (progress > 100) progress = 100;
      
      bootBar.style.width = `${progress}%`;
      bootPercent.textContent = `${progress}%`;
      
      if (currentLogIndex < logs.length && progress >= logs[currentLogIndex].pct) {
        const item = logs[currentLogIndex];
        const line = document.createElement('div');
        line.className = 'boot-log-line';
        line.innerHTML = `<span>[${progress}%] ${item.msg}</span> <span class="ok">OK</span>`;
        bootTerm.appendChild(line);
        bootTerm.scrollTop = bootTerm.scrollHeight;
        
        playSound('type');
        currentLogIndex++;
      }
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          proceedToInitialization();
          bootScreen.classList.add('fade-out');
          setTimeout(() => {
            bootScreen.classList.remove('active', 'fade-out');
          }, 600);
        }, 500);
      }
    }, 35);

    function proceedToInitialization() {
      const apiInput = document.getElementById('apiEndpoint');
      apiEndpoint = apiInput ? apiInput.value.trim() : '/api';
      
      const nameInput = document.getElementById('userNameInput');
      userName = nameInput ? nameInput.value.trim() : 'Kamu';
      
      const personaInput = document.getElementById('userPersonaInput');
      userPersona = personaInput ? personaInput.value.trim() : 'Seorang manusia biasa.';
      
      agents = [];
      
      if (hasKunows) {
        const kunows = new AIAgent(
          "KUNOWS", 
          "fable5-qwen-opus", 
          "DO NOT PROVIDE FALSE OR MADE-UP INFORMATION, IF THE INFORMATION IS NOT IN YOUR DATABASE, DO NOT PROVIDE IT, JUST SAY \"I DON'T HAVE THAT INFORMATION\".", 
          "#ef4444",
          true
        );
        kunows.avatarUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgCyberDevil)}`;
        agents.push(kunows);
      }
      
      setupAgents.forEach((agent, i) => {
        if (!agent) return;
        const defaultColor = COLORS[i % COLORS.length];
        const newA = new AIAgent(agent.name, agent.model, agent.persona, defaultColor, false, agent.speechRate || 1.0, agent.speechPitch || 1.0);
        
        newA.avatarUrl = agent.avatar || generateAvatarDataURI(agent.name, defaultColor);
        newA.voiceName = agent.voiceName || null;
        agents.push(newA);
      });
      
      saveConfig();
      createNewChatSession();
      playSound('success');
    }
  });
}

// Resets
const resetConfBtn = document.getElementById('resetConfigBtn');
if (resetConfBtn) {
  resetConfBtn.addEventListener('click', () => {
    localStorage.removeItem('multi_ai_config');
    hasKunows = false;
    userName = "Kamu (Manusia)";
    userPersona = "Seorang manusia biasa.";
    userAvatar = defaultUserAvatar;
    const apiInput = document.getElementById('apiEndpoint');
    if (apiInput) apiInput.value = '/api';
    const themeSelect = document.getElementById('themeSelector');
    if (themeSelect) themeSelect.value = 'cyan';
    const numInput = document.getElementById('numAgents');
    if (numInput) numInput.value = 2;
    theme = 'cyan';
    globalMood = 'default';
    searchEngine = 'ddg';
    globalVolume = 0.5;
    
    soundSettings = {
      ambientMute: false,
      ambientVolume: 1.0,
      ambientPreset: 'space',
      clickMute: false,
      typeMute: false,
      alertsMute: false,
      aiTypeMute: false,
      aiTypeMode: 'random'
    };

    const moodSelect = document.getElementById('sidebarMoodSelect');
    if (moodSelect) moodSelect.value = 'default';
    const engineSelect = document.getElementById('searchEngineSelect');
    if (engineSelect) engineSelect.value = 'ddg';
    
    const masterSlider = document.getElementById('globalVolumeRange');
    if (masterSlider) masterSlider.value = 50;
    const masterLabel = document.getElementById('globalVolumeValLabel');
    if (masterLabel) masterLabel.textContent = "50%";

    document.body.className = '';
    availableModels = ['fable5-qwen-opus', 'fable5-qwen-custom', 'llama3', 'deepseek-r1', 'mistral'];
    initializeDefaultSetupAgents();
    renderAgentForms();
    showNotification("Setup settings reset successfully!");
    playSound('delete');
  });
}

const resetCBtn = document.getElementById('resetChatsBtn');
if (resetCBtn) {
  resetCBtn.addEventListener('click', () => {
    activeStreams.forEach(info => {
      if (info.abortController) info.abortController.abort();
    });
    activeStreams.clear();

    localStorage.removeItem('multi_ai_chats');
    localStorage.removeItem('multi_ai_current_chat_id');
    chats = [];
    currentChatId = null;
    const msgsDiv = document.getElementById('chatMessages');
    if (msgsDiv) msgsDiv.innerHTML = '';
    isChatActive = false;
    if (autoChatInterval) clearTimeout(autoChatInterval);
    renderChatHistory();
    const configBtn = document.getElementById('editBtn');
    if (configBtn) configBtn.click();
    showNotification("Chat history reset successfully!");
    playSound('delete');
  });
}

window.scrollToBottom = (force = false) => {
  const msgsDiv = document.getElementById('chatMessages');
  if (msgsDiv) {
    if (force || !isUserScrollingUp) {
      msgsDiv.scrollTo({
        top: msgsDiv.scrollHeight,
        behavior: 'smooth'
      });
    }
  }
};
const scrollToBottom = window.scrollToBottom;

function appendUserMessageUI(text, msgIndex) {
  const msgsDiv = document.getElementById('chatMessages');
  if (!msgsDiv) return;
  const div = document.createElement('div');
  div.className = 'message-wrapper user';
  
  div.innerHTML = `
    <div class="avatar-container">
      <img src="${userAvatar}" class="avatar" style="object-fit: cover; border-radius:50%;">
    </div>
    <div class="message-content">
      <div class="message-sender">${escapeHTML(userName)}</div>
      <div class="message-bubble">${escapeHTML(text)}</div>
      <div class="message-actions">
        <button class="btn-msg-action" onclick="editUserMessage('${currentChatId}', ${msgIndex})">✏️ Edit</button>
        <button class="btn-msg-action" onclick="copyMessageText(this)">📋 Copy</button>
      </div>
    </div>
  `;
  msgsDiv.appendChild(div);
}

function appendUserMessage(text) {
  const session = chats.find(c => c.id === currentChatId);
  if (!session) return;

  const newIndex = session.messages.length;
  session.messages.push({ role: 'user', content: text });
  saveChats();
  
  appendUserMessageUI(text, newIndex);
  scrollToBottom(true);
  
  if (agents.length === 0) {
    rebuildActiveAgents();
  }

  agents.forEach(a => {
    addMessageToSessionMemory(session, a.name, `${userName} (Sifat Anda: ${userPersona})`, text, a.persona, a.isLocked);
  });
  saveChats();
}

function appendAIMessageUI(name, color, content, avatarUrl, msgIndex) {
  const msgsDiv = document.getElementById('chatMessages');
  if (!msgsDiv) return;
  const bubbleId = `bubble_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  const div = document.createElement('div');
  
  // Demonic styling class injector for KUNOWS
  const isKunows = name === "KUNOWS";
  div.className = `message-wrapper ai ${isKunows ? 'kunows-theme' : ''}`;
  
  div.innerHTML = `
    <div class="avatar-container" id="avatar_${bubbleId}">
      <img src="${avatarUrl}" class="avatar" style="object-fit: cover; border-radius: 50%;">
      <div class="sound-badge">🔊</div>
    </div>
    <div class="message-content">
      <div class="message-sender" style="color: ${color}">${name}</div>
      <div class="message-bubble" id="${bubbleId}">${renderContentWithThink(content)}</div>
      <div class="message-actions">
        <button class="btn-msg-action" onclick="copyMessageText(this)">📋 Copy</button>
        <button class="btn-msg-action" onclick="regenerateAIMessage('${currentChatId}', ${msgIndex})">🔄 Re-generate</button>
      </div>
    </div>
  `;
  msgsDiv.appendChild(div);
  
  const speaker = agents.find(a => a.name === name);
  const voiceName = speaker ? speaker.voiceName : null;
  
  div.querySelector(`#avatar_${bubbleId}`).addEventListener('click', () => {
    speakText(content, voiceName, bubbleId, speaker ? speaker.speechRate : 1.0, speaker ? speaker.speechPitch : 1.0);
  });
}

function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag]));
}

// Proxied search query that gathers actual live snippets using AllOrigins CORS proxy
async function searchWeb(query) {
  try {
    const target = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(target)}`;
    
    const res = await fetch(proxyUrl);
    if (!res.ok) throw new Error("Proxy response error");
    const json = await res.json();
    
    if (json.contents) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(json.contents, 'text/html');
      const snippets = Array.from(doc.querySelectorAll('.result-snippet, .result__snippet'))
        .slice(0, 3)
        .map(el => el.textContent.trim())
        .filter(text => text.length > 0);
        
      if (snippets.length > 0) {
        return snippets.join('; ');
      }
    }
  } catch (e) {
    console.warn("CORS proxy search failed, falling back to DDG instant API:", e);
  }
  
  // Fallback to traditional DuckDuckGo instant API
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    
    let result = data.AbstractText || "";
    if (!result && data.RelatedTopics && data.RelatedTopics.length > 0) {
      result = data.RelatedTopics
        .map(topic => topic.Text)
        .filter(text => text)
        .slice(0, 3)
        .join('; ');
    }
    return result || null;
  } catch (err) {
    console.error("Web search fallback failed:", err);
    return null;
  }
}

// Wikipedia Native CORS Search API
async function searchWikipedia(query) {
  try {
    const url = `https://id.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.query && data.query.search && data.query.search.length > 0) {
      return data.query.search
        .slice(0, 3)
        .map(s => `${s.title}: ${s.snippet.replace(/<[^>]*>/g, '')}`)
        .join('; ');
    }
    return null;
  } catch(e) {
    console.error("Wikipedia search failed:", e);
    return null;
  }
}

// Poll Option voting handler
window.votePollOption = (pollId, optIndex) => {
  let votes = JSON.parse(localStorage.getItem(`votes_${pollId}`)) || {};
  votes[optIndex] = (votes[optIndex] || 0) + 1;
  localStorage.setItem(`votes_${pollId}`, JSON.stringify(votes));
  
  let total = Object.values(votes).reduce((a, b) => a + b, 0);
  
  const pollContainer = document.getElementById(pollId);
  if (pollContainer) {
    const optionRows = pollContainer.querySelectorAll('.poll-option-row');
    optionRows.forEach((row, idx) => {
      const count = votes[idx] || 0;
      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
      
      const countSpan = document.getElementById(`${pollId}_count_${idx}`);
      const bar = document.getElementById(`${pollId}_bar_${idx}`);
      if (countSpan) countSpan.textContent = `${pct}% (${count})`;
      if (bar) bar.style.width = `${pct}%`;
    });
  }
  playSound('click');
};

// Copy full message bubble text (excluding thinking detail blocks)
window.copyMessageText = (btn) => {
  const bubble = btn.closest('.message-content').querySelector('.message-bubble');
  if (bubble) {
    let text = bubble.innerText;
    const details = bubble.querySelector('.think-accordion');
    if (details) {
      text = text.replace(/🧠[\s\S]*?Thinking Process\.\.\./, '').trim();
    }
    navigator.clipboard.writeText(text).then(() => {
      btn.innerHTML = "✅ Copied";
      setTimeout(() => { btn.innerHTML = "📋 Copy"; }, 2000);
    });
  }
};

// Edit past user message timeline
window.editUserMessage = (chatId, msgIndex) => {
  const session = chats.find(c => c.id === chatId);
  if (!session) return;
  const msg = session.messages[msgIndex];
  if (msg) {
    const input = document.getElementById('chatInput');
    if (input) {
      input.value = msg.content;
      input.focus();
    }
    session.messages = session.messages.slice(0, msgIndex);
    saveChats();
    loadChatSession(chatId);
    playSound('click');
  }
};

// Regenerate AI responses
window.regenerateAIMessage = async (chatId, msgIndex) => {
  const session = chats.find(c => c.id === chatId);
  if (!session) return;
  
  session.messages = session.messages.slice(0, msgIndex);
  saveChats();
  loadChatSession(chatId);
  
  await triggerAIReply();
};

// Stop current generation stream (modified for multi-session support)
window.stopStreaming = () => {
  const streamInfo = activeStreams.get(currentChatId);
  if (streamInfo && streamInfo.abortController) {
    streamInfo.abortController.abort();
    logTerminal(`AI generation for chat ${currentChatId} cancelled by user.`);
    showNotification("Generation dihentikan.");
  }
  activeStreams.delete(currentChatId);
  renderChatHistory();

  const stopBtn = document.getElementById('stopStreamingBtn');
  if (stopBtn) stopBtn.style.display = 'none';

  if (streamInfo) {
    const cursor = document.getElementById(`cursor_${streamInfo.bubbleId}`);
    if (cursor) cursor.remove();
  }
};

// Rich Markdown and Friendly Math parser (Lightweight & Offline-friendly)
function renderContentWithThink(fullText) {
  let thinkText = "";
  let replyText = fullText;
  
  const thinkMatch = fullText.match(/<think>([\s\S]*?)(?:<\/think>|$)/);
  if (thinkMatch) {
    thinkText = thinkMatch[1].trim();
    replyText = fullText.replace(/<think>[\s\S]*?<\/think>/g, '').replace(/<think>[\s\S]*/, '').trim();
  }
  
  let html = "";
  if (thinkText) {
    html += `
      <details class="think-accordion" ${replyText === "" ? "open" : ""}>
        <summary>🧠 Thinking Process...</summary>
        <div class="think-content">${escapeHTML(thinkText)}</div>
      </details>
    `;
  }
  
  if (replyText || !thinkText) {
    const pollMatch = replyText.match(/\[POLL:\s*([^|]+)\|([^\]]+)\]/i);
    if (pollMatch) {
      const q = pollMatch[1].trim();
      const options = pollMatch[2].split('|').map(o => o.trim()).filter(o => o.length > 0);
      const pollId = `poll_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      
      let pollHtml = `<div class="poll-card" id="${pollId}">`;
      pollHtml += `<div class="poll-question">📊 ${escapeHTML(q)}</div>`;
      options.forEach((opt, idx) => {
        pollHtml += `
          <div class="poll-option-row">
            <button class="poll-option-btn" onclick="votePollOption('${pollId}', ${idx})">
              <span>${escapeHTML(opt)}</span>
              <span class="poll-vote-count" id="${pollId}_count_${idx}">0% (0)</span>
            </button>
            <div class="poll-progress-container">
              <div class="poll-progress-bar" id="${pollId}_bar_${idx}"></div>
            </div>
          </div>
        `;
      });
      pollHtml += `</div>`;
      replyText = replyText.replace(/\[POLL:[\s\S]*?\]/i, pollHtml);
    }

    const parts = escapeHTML(replyText).split('```');
    let formattedText = "";
    for (let idx = 0; idx < parts.length; idx++) {
      if (idx % 2 === 1) {
        const codePart = parts[idx];
        const firstNewline = codePart.indexOf('\n');
        let lang = "code";
        let code = codePart;
        if (firstNewline !== -1) {
          lang = codePart.substring(0, firstNewline).trim() || "code";
          code = codePart.substring(firstNewline + 1);
        }
        formattedText += `
          <div class="code-container">
            <div class="code-header">
              <span>${lang}</span>
              <button class="btn-copy-code" onclick="copyCodeText(this)">📋 Copy</button>
            </div>
            <pre><code>${code}</code></pre>
          </div>
        `;
      } else {
        let txt = parts[idx];
        
        txt = txt
          .replace(/\\sqrt\{([^}]+)\}/g, '√$1')
          .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1/$2)')
          .replace(/\\times/g, ' × ')
          .replace(/\\div/g, ' ÷ ')
          .replace(/\\pm/g, ' ± ')
          .replace(/\\le/g, ' ≤ ')
          .replace(/\\ge/g, ' ≥ ')
          .replace(/\\neq/g, ' ≠ ')
          .replace(/\\approx/g, ' ≈ ')
          .replace(/\\pi/g, 'π')
          .replace(/\\infty/g, '∞');

        txt = txt.replace(/\$\$([\s\S]*?)\$\$/g, '<div class="math-block">$1</div>');
        txt = txt.replace(/\\\[([\s\S]*?)\\\]/g, '<div class="math-block">$1</div>');
        txt = txt.replace(/\\\((.*?)\\\)/g, '<span class="math-inline">$1</span>');
        txt = txt.replace(/\$([^$]+)\$/g, '<span class="math-inline">$1</span>');
        txt = txt.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        txt = txt.replace(/__(.*?)__/g, '<strong>$1</strong>');
        txt = txt.replace(/\*(.*?)\*/g, '<em>$1</em>');
        txt = txt.replace(/_([^_]+)_/g, '<em>$1</em>');
        txt = txt.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

        formattedText += txt.replace(/\n/g, '<br>');
      }
    }
    html += `<div class="reply-text">${formattedText}</div>`;
  }
  
  return html;
}

// Multi-Session Background Generation Engine with Isolated Memory Contexts
async function triggerAIReply(forcedQuery = null, targetChatId = currentChatId) {
  const session = chats.find(c => c.id === targetChatId);
  
  // Reconstruct active agents if empty (Solves refreshing page issue)
  if (agents.length === 0) {
    rebuildActiveAgents();
  }

  if (!session || agents.length === 0 || !isChatActive) return;

  if (activeStreams.has(targetChatId)) return; // Prevent double streaming

  let speaker = null;
  if (forcedQuery) {
    const mentionMatch = forcedQuery.match(/@(\w+)/);
    if (mentionMatch) {
      const mentionedName = mentionMatch[1].toLowerCase();
      speaker = agents.find(a => a.name.toLowerCase() === mentionedName);
    }
  }
  
  if (!speaker) {
    let available = agents.filter(a => a !== lastSpeaker);
    if (available.length === 0) available = agents;
    speaker = available[Math.floor(Math.random() * available.length)];
  }
  
  // Decide the sound type once for this entire message generation session
  let chosenSoundType = soundSettings.aiTypeMode;
  if (chosenSoundType === 'random') {
    chosenSoundType = ['type1', 'type2', 'type3'][Math.floor(Math.random() * 3)];
  }

  const bubbleId = `bubble_${Date.now()}`;
  const streamAbort = new AbortController();
  
  const streamInfo = {
    abortController: streamAbort,
    speakerName: speaker.name,
    speakerColor: speaker.color,
    speakerAvatarUrl: speaker.avatarUrl,
    bubbleId: bubbleId,
    chosenSoundType: chosenSoundType,
    fullReply: "",
    tps: "0.0",
    tokensCount: 0
  };
  activeStreams.set(targetChatId, streamInfo);
  
  // Re-render sidebar to display loading status on the chat list
  renderChatHistory();

  // If currently viewing this session, show loader on screen
  if (currentChatId === targetChatId) {
    const msgsDiv = document.getElementById('chatMessages');
    if (msgsDiv) {
      let initialLoadingText = "[WAITING FOR OLLAMA...]";
      if (isWebSearchEnabled) {
        initialLoadingText = searchEngine === 'wikipedia' ? "[RETRIEVING WIKIPEDIA FACTS...]" : "[ANALYZING WEB QUERIES...]";
      }

      const div = document.createElement('div');
      div.className = `message-wrapper ai ${speaker.name === "KUNOWS" ? 'kunows-theme' : ''}`;
      div.id = `wrapper_${bubbleId}`;
      div.innerHTML = `
        <div class="avatar-container" id="avatar_${bubbleId}">
          <img src="${speaker.avatarUrl}" class="avatar" style="object-fit: cover; border-radius:50%;">
          <div class="sound-badge">🔊</div>
        </div>
        <div class="message-content">
          <div class="message-sender" style="color: ${speaker.color}">${speaker.name}</div>
          <div class="message-bubble" id="${bubbleId}">
            <div class="cyber-loader" id="loader_${bubbleId}">
              <div class="cyber-spinner"></div>
              <span class="pulse-text">${initialLoadingText}</span>
            </div>
          </div>
          <div class="speedometer-badge" id="speed_${bubbleId}" style="display:none;">⚡ 0.0 tokens/s</div>
        </div>
      `;
      msgsDiv.appendChild(div);
      scrollToBottom();
    }
  }

  let lastUserMsg = forcedQuery;
  if (!lastUserMsg) {
    const lastMemory = getSessionAgentMemory(session, speaker.name, speaker.persona, speaker.isLocked);
    const lastMsgItem = lastMemory[lastMemory.length - 1];
    if (lastMsgItem && lastMsgItem.role === 'user') {
      lastUserMsg = lastMsgItem.content.replace(/.*?berkata:\s*/, '');
    }
  }

  let searchResult = null;
  if (isWebSearchEnabled && lastUserMsg) {
    if (currentChatId === targetChatId) {
      const bubble = document.getElementById(bubbleId);
      if (bubble) {
        const loader = document.createElement('div');
        loader.className = 'search-loader';
        loader.id = `search_loader_${bubbleId}`;
        loader.innerHTML = `
          <div class="cyber-spinner" style="width:14px; height:14px; border-width:1.5px; box-shadow:none;"></div>
          <span>Memindai ${searchEngine === 'wikipedia' ? 'Wikipedia' : 'Web'} untuk "${escapeHTML(lastUserMsg)}"...</span>
        `;
        bubble.parentNode.insertBefore(loader, bubble);
        scrollToBottom();
      }
    }
    
    if (searchEngine === 'wikipedia') {
      searchResult = await searchWikipedia(lastUserMsg);
    } else {
      searchResult = await searchWeb(lastUserMsg);
    }
    
    if (currentChatId === targetChatId) {
      const loader = document.getElementById(`search_loader_${bubbleId}`);
      if (loader) {
        if (searchResult) {
          loader.innerHTML = `🔍 <b>Informasi Ditemukan:</b> "${escapeHTML(searchResult.substring(0, 120))}..."`;
        } else {
          loader.remove();
        }
      }
    }
  }
  
  if (currentChatId === targetChatId) {
    const loader = document.getElementById(`loader_${bubbleId}`);
    if (loader) {
      const pText = loader.querySelector('.pulse-text');
      if (pText) pText.textContent = "[PROCESSING OLLAMA RESPONSE...]";
    }
  }

  try {
    const targetUrl = apiEndpoint.endsWith('/api') ? `${apiEndpoint}/chat` : `${apiEndpoint}/api/chat`;
    
    // Retrieve isolated memory for this session
    let requestMessages = JSON.parse(JSON.stringify(getSessionAgentMemory(session, speaker.name, speaker.persona, speaker.isLocked)));
    
    if (isWebSearchEnabled && searchResult) {
      for (let idx = requestMessages.length - 1; idx >= 0; idx--) {
        if (requestMessages[idx].role === 'user') {
          requestMessages[idx].content = `[WEB SEARCH CONTEXT]: ${searchResult}\n\n[USER INSTRUCTION]: Gunakan informasi dari Web Search Context di atas secara akurat dan abaikan database lama Anda jika bertentangan untuk menjawab pertanyaan berikut:\n${requestMessages[idx].content}`;
          break;
        }
      }
    }

    if (globalMood !== 'default') {
      const moodInstruction = {
        'sarcastic': "Sikap: Bicara dengan nada sinis, ketus, sarkastik, dan suka mengejek secara humoris fiksi ilmiah.",
        'intellectual': "Sikap: Bicara dengan nada sangat akademis, cerdas, teoritis, menggunakan logika formal, dan analitis tajam.",
        'humorous': "Sikap: Bicara dengan nada kocak, humoris, santai, penuh lelucon, dan sering menggunakan kiasan meme internet."
      }[globalMood];
      
      if (moodInstruction) {
        requestMessages.push({ role: 'system', content: `[MOOD INSTRUCTION]: ${moodInstruction}` });
      }
    }

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: speaker.model,
        messages: requestMessages,
        stream: true
      }),
      signal: streamAbort.signal
    });

    if (!response.ok) throw new Error('API Error');

    if (currentChatId === targetChatId) {
      const bubble = document.getElementById(bubbleId);
      if (bubble) {
        bubble.innerHTML = `<span id="text_${bubbleId}"></span><span class="cursor" id="cursor_${bubbleId}"></span>`;
      }
      const stopBtn = document.getElementById('stopStreamingBtn');
      if (stopBtn) {
        stopBtn.style.display = 'flex';
      }
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const startTime = Date.now();
    const msgIdx = session.messages.length;

    // Push base structure into database history immediately so switching sessions is seamless
    session.messages.push({
      role: 'assistant',
      name: speaker.name,
      color: speaker.color,
      content: "",
      avatarUrl: speaker.avatarUrl
    });

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter(l => l.trim() !== '');
      
      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          if (json.message && json.message.content) {
            streamInfo.fullReply += json.message.content;
            
            // Play typing tick sound matching this stream's selected style
            playSound(streamInfo.chosenSoundType || 'type1');

            const elapsed = (Date.now() - startTime) / 1000;
            streamInfo.tokensCount = Math.ceil(streamInfo.fullReply.length / 4);
            streamInfo.tps = (streamInfo.tokensCount / (elapsed || 0.1)).toFixed(1);

            // Progressive data backup to localStorage
            session.messages[msgIdx].content = streamInfo.fullReply;
            saveChats();

            // Render live text stream only if we are currently inspecting this session
            if (currentChatId === targetChatId) {
              const textNode = document.getElementById(`text_${bubbleId}`);
              const speedBadge = document.getElementById(`speed_${bubbleId}`);
              
              if (textNode) {
                textNode.innerHTML = renderContentWithThink(streamInfo.fullReply);
              }
              if (speedBadge) {
                speedBadge.style.display = 'inline-block';
                speedBadge.textContent = `⚡ ${streamInfo.tps} tokens/s | ${streamInfo.tokensCount} tokens`;
              }
              scrollToBottom();
            }
          }
        } catch(e) {}
      }
    }
    
    // Complete stream cycle in session memory
    const speakerMemory = getSessionAgentMemory(session, speaker.name, speaker.persona, speaker.isLocked);
    speakerMemory.push({ role: 'assistant', content: streamInfo.fullReply });
    lastSpeaker = speaker;

    if (currentChatId === targetChatId) {
      const cursor = document.getElementById(`cursor_${bubbleId}`);
      if (cursor) cursor.remove();

      // Add actions toolbar to active view
      const bubble = document.getElementById(bubbleId);
      if (bubble) {
        const toolbar = document.createElement('div');
        toolbar.className = 'message-actions';
        toolbar.innerHTML = `
          <button class="btn-msg-action" onclick="copyMessageText(this)">📋 Copy</button>
          <button class="btn-msg-action" onclick="regenerateAIMessage('${targetChatId}', ${msgIdx})">🔄 Re-generate</button>
        `;
        bubble.parentNode.appendChild(toolbar);
      }
      
      const stopBtn = document.getElementById('stopStreamingBtn');
      if (stopBtn) {
        stopBtn.style.display = 'none';
      }

      document.getElementById(`avatar_${bubbleId}`).addEventListener('click', () => {
        speakText(streamInfo.fullReply, speaker.voiceName, bubbleId, speaker.speechRate, speaker.speechPitch);
      });
    }

    // Trigger Native Push Notification to desktop/mobile OS
    showPushNotification(speaker.name, streamInfo.fullReply, speaker.avatarUrl);

    // Sync agent minds inside the isolated session
    agents.forEach(a => {
      if (a.name !== speaker.name) {
        addMessageToSessionMemory(session, a.name, speaker.name, streamInfo.fullReply, a.persona, a.isLocked);
      }
    });

    saveChats();
    playSound('receive');

  } catch(e) {
    if (e.name !== 'AbortError') {
      if (currentChatId === targetChatId) {
        const bubble = document.getElementById(bubbleId);
        if (bubble) {
          bubble.innerHTML = `<span style="color: var(--text-secondary)">[Gagal menghubungkan ke Ollama. Pastikan model dan port API valid!]</span>`;
        }
      }
    }
  } finally {
    activeStreams.delete(targetChatId);
    renderChatHistory();

    if (currentChatId === targetChatId) {
      const stopBtn = document.getElementById('stopStreamingBtn');
      if (stopBtn) stopBtn.style.display = 'none';
    }
  }
}

function startAutoChat() {
  if (autoChatInterval) clearTimeout(autoChatInterval);
  
  const loop = async () => {
    if (!isChatActive) return;
    
    // In phone call mode, AI-to-AI loop is handled by callAutoReplyTimeout instead of main loop
    if (isPhoneCallActive) return;

    if (isAutoChatEnabled && !activeStreams.has(currentChatId)) {
      await triggerAIReply();
    }
    const delay = autoChatDelay + Math.floor(Math.random() * 2000);
    autoChatInterval = setTimeout(loop, delay);
  };
  
  autoChatInterval = setTimeout(loop, 2000);
}

async function handleSend() {
  const input = document.getElementById('chatInput');
  const text = input ? input.value.trim() : '';
  if (!text || activeStreams.has(currentChatId)) return;
  
  if (input) input.value = '';
  appendUserMessage(text);
  
  playSound('send');
  logTerminal(`User message submitted: "${text}"`);
  
  if (autoChatInterval) clearTimeout(autoChatInterval);
  await triggerAIReply(text);
  startAutoChat();
}

const sendButton = document.getElementById('sendBtn');
if (sendButton) {
  sendButton.addEventListener('click', handleSend);
}
const inputField = document.getElementById('chatInput');
if (inputField) {
  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}

// === Holographic Phone Conference Call Implementation ===
window.startVoiceCall = () => {
  if (agents.length === 0) {
    rebuildActiveAgents();
  }
  if (agents.length === 0) {
    showNotification("Tambahkan setidaknya 1 Agen AI terlebih dahulu untuk menelpon!");
    return;
  }

  isPhoneCallActive = true;
  callDurationSec = 0;
  callActiveAgentIndex = 0;
  callUserMicMuted = false;
  callSpeakerphoneActive = false; // Loudspeaker starts as false (Handset mode)
  isCallAISpeaking = false;
  
  // Initialize call-specific controls per agent
  agents.forEach(a => {
    a.callMuted = false;
    a.callLoud = false;
  });

  // Pause main auto chat loop
  if (autoChatInterval) clearTimeout(autoChatInterval);
  if (callAutoReplyTimeout) clearTimeout(callAutoReplyTimeout);

  // Hologram Dialer Beeps
  const dialInterval = 250;
  playSound('click');
  setTimeout(() => playSound('click'), dialInterval);
  setTimeout(() => playSound('success'), dialInterval * 2);

  // Show Holographic overlay
  const callScreen = document.getElementById('hologramCallScreen');
  if (callScreen) callScreen.classList.add('active');

  const statusBadge = document.getElementById('callStatusBadge');
  const durationLabel = document.getElementById('callDuration');
  const subtitleBox = document.getElementById('callSubtitleBox');
  
  if (statusBadge) statusBadge.textContent = "dialing...";
  if (durationLabel) durationLabel.textContent = "00:00";
  // Prompt user that Handset Mode is active (extremely quiet by default)
  if (subtitleBox) subtitleBox.textContent = "[Handset Mode Aktif: Tempelkan kuping ke layar HP atau klik 📢 Loudspeaker]";

  // Build the list of all bot participant cards
  renderCallParticipantsList();

  // Call duration counter
  if (callTimerInterval) clearInterval(callTimerInterval);
  callTimerInterval = setInterval(() => {
    callDurationSec++;
    const m = String(Math.floor(callDurationSec / 60)).padStart(2, '0');
    const s = String(callDurationSec % 60).padStart(2, '0');
    if (durationLabel) durationLabel.textContent = `${m}:${s}`;
  }, 1000);

  // Connected state transition after 1.5 seconds
  setTimeout(() => {
    if (!isPhoneCallActive) return;
    if (statusBadge) statusBadge.textContent = "connected";
    playSound('receive');
    
    // Greet user & start AI talk loop
    triggerCallAgentIntro();
  }, 1500);

  logTerminal("Holographic conference call session started.");
};

function renderCallParticipantsList() {
  const container = document.getElementById('callParticipantsList');
  if (!container) return;

  container.innerHTML = agents.map((agent, index) => {
    const isKunows = agent.name === "KUNOWS";
    return `
      <div class="call-profile-card ${isKunows ? 'kunows-call-card' : ''}" id="callCard_${index}" style="border-color: rgba(255,255,255,0.08);">
        <div class="call-avatar-wrapper">
          <div class="call-pulse-ring" style="border-color:${agent.color};"></div>
          <div class="call-pulse-ring" style="border-color:${agent.color};"></div>
          <div class="call-pulse-ring" style="border-color:${agent.color};"></div>
          <img src="${agent.avatarUrl}" class="call-avatar-img">
        </div>
        <div class="call-agent-name">${agent.name}</div>
        <div class="call-agent-model">${agent.model}</div>
        
        <!-- Controls under each bot profile card -->
        <div class="call-bot-controls-group">
          <button class="btn-bot-call-ctrl ${agent.callMuted ? 'active' : ''}" onclick="toggleCallBotMute(${index}, this)">
            限制 Mute
          </button>
          <button class="btn-bot-call-ctrl" onclick="stopCallBotSpeak(${index})">
            Stop
          </button>
          <button class="btn-bot-call-ctrl ${agent.callLoud ? 'active' : ''}" onclick="toggleCallBotLoud(${index}, this)">
            🔊 Loud
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Introductory greeting from the first active bot
async function triggerCallAgentIntro() {
  callActiveSpeaker = agents[0];
  const introText = `Halo, saluran panggilan konferensi telah terhubung dengan ${agents.map(a => a.name).join(', ')}. Silakan mulai berdiskusi, kami siap mendengarkan!`;
  
  const subtitleBox = document.getElementById('callSubtitleBox');
  if (subtitleBox) {
    subtitleBox.innerHTML = `<span style="color:${callActiveSpeaker.color};">${callActiveSpeaker.name}:</span> "${introText}"`;
  }
  
  speakCallText(introText, () => {
    // Start microphone speech recognition loop once introduction completes
    initializeCallSpeechRecognition();
    
    // Start AI-to-AI speech conversation loop if Auto Chat is toggled on!
    queueNextAICallResponse();
  });
}

// Play TTS for Call Mode (Callback triggered when TTS ends)
function speakCallText(text, callback) {
  if (!isPhoneCallActive) return;
  
  // If active speaker is muted in the call card controls
  if (callActiveSpeaker && callActiveSpeaker.callMuted) {
    if (callback) callback();
    return;
  }

  isCallAISpeaking = true;
  const waves = document.getElementById('callWaveformSim');
  if (waves) waves.classList.add('speaking');

  // Temporarily pause Speech Recognition to avoid capturing robot feedback
  if (callRecognition) {
    try { callRecognition.stop(); } catch(e){}
  }

  // Visual Highlight active speaker card
  const speakerIndex = agents.indexOf(callActiveSpeaker);
  agents.forEach((a, idx) => {
    const card = document.getElementById(`callCard_${idx}`);
    if (card) {
      card.classList.remove('highlighted');
      card.style.removeProperty('box-shadow');
      card.style.removeProperty('border-color');
    }
  });

  const activeCard = document.getElementById(`callCard_${speakerIndex}`);
  if (activeCard) {
    activeCard.classList.add('highlighted');
    
    // Demonic dual glow for KUNOWS
    if (callActiveSpeaker.name === "KUNOWS") {
      activeCard.style.boxShadow = `0 0 35px #06b6d4, 0 0 20px #ef4444`;
      activeCard.style.borderColor = "#06b6d4";
    } else {
      activeCard.style.boxShadow = `0 0 35px ${callActiveSpeaker.color}`;
      activeCard.style.borderColor = callActiveSpeaker.color;
    }
  }

  const cleanText = text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    
    if (callActiveSpeaker && callActiveSpeaker.voiceName) {
      const v = voices.find(voice => voice.name === callActiveSpeaker.voiceName);
      if (v) utterance.voice = v;
    } else {
      const idVoice = voices.find(voice => voice.lang.includes('id') || voice.lang.includes('ID'));
      if (idVoice) utterance.voice = idVoice;
    }

    // Apply Loudspeaker or Handset (Earpiece Mode) volume modifications
    let finalVolume = globalVolume;
    let finalPitch = callActiveSpeaker ? callActiveSpeaker.speechPitch : 1.0;
    let finalRate = callActiveSpeaker ? callActiveSpeaker.speechRate : 1.0;

    if (callSpeakerphoneActive) {
      // Loudspeaker ON: normal/loud volume
      finalVolume = Math.min(1.0, finalVolume * 1.6);
      finalPitch *= 1.05;
      finalRate *= 1.15; // speakerphone acoustics
    } else {
      // Handset Earpiece mode: extremely quiet (5% of master volume), requires ear on screen
      finalVolume = finalVolume * 0.05;
    }

    if (callActiveSpeaker && callActiveSpeaker.callLoud) {
      finalVolume = callSpeakerphoneActive ? 1.0 : 0.25; // boost slightly even in earpiece
      finalPitch *= 1.10;
    }

    utterance.volume = finalVolume;
    utterance.pitch = finalPitch;
    utterance.rate = finalRate;

    utterance.onend = () => {
      isCallAISpeaking = false;
      if (waves) waves.classList.remove('speaking');
      if (activeCard) activeCard.classList.remove('highlighted');
      if (callback) callback();
    };

    utterance.onerror = () => {
      isCallAISpeaking = false;
      if (waves) waves.classList.remove('speaking');
      if (activeCard) activeCard.classList.remove('highlighted');
      if (callback) callback();
    };

    window.speechSynthesis.speak(utterance);
  } else {
    if (callback) callback();
  }
}

// Continuous mic input monitoring in Phone Call Mode
function initializeCallSpeechRecognition() {
  if (!isPhoneCallActive || isCallAISpeaking) return;
  
  if (callRecognition) {
    try { callRecognition.stop(); } catch(e){}
  }

  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    callRecognition = new SpeechRec();
    callRecognition.continuous = true;
    callRecognition.interimResults = true;
    callRecognition.lang = 'id-ID';

    callRecognition.onstart = () => {
      const subtitleBox = document.getElementById('callSubtitleBox');
      if (subtitleBox && !callUserMicMuted && !isCallAISpeaking) {
        subtitleBox.innerHTML = `<span style="opacity:0.6;">[Mendengarkan suara Anda...]</span>`;
      }
    };

    callRecognition.onresult = (event) => {
      if (callUserMicMuted || isCallAISpeaking) return;

      // Accumulate full string representation across the utterance (Resolves short-word detection dropouts)
      let fullSpeech = '';
      for (let i = 0; i < event.results.length; ++i) {
        fullSpeech += event.results[i][0].transcript;
      }

      if (!fullSpeech.trim()) return;

      const subtitleBox = document.getElementById('callSubtitleBox');
      if (subtitleBox) {
        subtitleBox.innerHTML = `Anda berkata: "<span style="color:var(--accent); font-weight:500;">${fullSpeech}</span>"`;
      }

      // Debounce: User is actively talking, cancel previous timeout loops
      clearTimeout(callSpeechTimeout);
      clearTimeout(callAutoReplyTimeout);

      callSpeechTimeout = setTimeout(() => {
        processCallUserResponse(fullSpeech);
      }, 1200); // 1.2 seconds of silence commits user spoken phrase
    };

    callRecognition.onend = () => {
      // Re-initialize loop if call is active and bot is not speaking
      if (isPhoneCallActive && !isCallAISpeaking && !callUserMicMuted) {
        try { callRecognition.start(); } catch(e){}
      }
    };

    try {
      callRecognition.start();
    } catch(e){}
  } else {
    const subtitleBox = document.getElementById('callSubtitleBox');
    if (subtitleBox) {
      subtitleBox.textContent = "[Speech recognition tidak didukung di browser ini]";
    }
  }
}

// Sends user spoken text to active agent via Ollama and loops reply
async function processCallUserResponse(phraseText) {
  if (!isPhoneCallActive) return;
  
  // Stop mic capture
  if (callRecognition) {
    try { callRecognition.stop(); } catch(e){}
  }
  clearTimeout(callAutoReplyTimeout);

  // Display user text in main chat timeline with Voice Call marker
  appendUserMessage(`📞 [Phone Call]: ${phraseText}`);

  // Select next bot to respond to user
  callActiveAgentIndex = (callActiveAgentIndex + 1) % agents.length;
  callActiveSpeaker = agents[callActiveAgentIndex];

  await fetchAndSpeakAICallResponse();
}

// Fetches AI response via API and triggers speakText
async function fetchAndSpeakAICallResponse() {
  if (!isPhoneCallActive) return;

  const statusBadge = document.getElementById('callStatusBadge');
  if (statusBadge) statusBadge.textContent = "AI is thinking...";

  const subtitleBox = document.getElementById('callSubtitleBox');
  if (subtitleBox) {
    subtitleBox.innerHTML = `<span style="opacity:0.6;">[${callActiveSpeaker.name} sedang berpikir...]</span>`;
  }

  try {
    const targetUrl = apiEndpoint.endsWith('/api') ? `${apiEndpoint}/chat` : `${apiEndpoint}/api/chat`;
    const session = chats.find(c => c.id === currentChatId);
    if (!session) throw new Error("No active session");

    // Gather context memory
    let requestMessages = JSON.parse(JSON.stringify(getSessionAgentMemory(session, callActiveSpeaker.name, callActiveSpeaker.persona, callActiveSpeaker.isLocked)));
    
    // Add call duration indicator to system context to keep it concise
    requestMessages.push({
      role: 'system',
      content: "[SYSTEM CONTEXT]: Anda berada di panggilan suara bersama. Tanggapi dengan sangat singkat, padat, dan natural (maksimal 2 kalimat) agar percakapan suara terasa dinamis."
    });

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: callActiveSpeaker.model,
        messages: requestMessages,
        stream: false // Non-stream for instant call readout
      })
    });

    if (!response.ok) throw new Error("Ollama fail");
    const json = await response.json();
    const botReply = json.message.content.trim();

    // Push bot response to logs
    session.messages.push({
      role: 'assistant',
      name: callActiveSpeaker.name,
      color: callActiveSpeaker.color,
      content: botReply,
      avatarUrl: callActiveSpeaker.avatarUrl
    });

    // Update memories
    const speakerMemory = getSessionAgentMemory(session, callActiveSpeaker.name, callActiveSpeaker.persona, callActiveSpeaker.isLocked);
    speakerMemory.push({ role: 'assistant', content: botReply });
    
    agents.forEach(a => {
      if (a.name !== callActiveSpeaker.name) {
        addMessageToSessionMemory(session, a.name, callActiveSpeaker.name, botReply, a.persona, a.isLocked);
      }
    });
    saveChats();

    // Render message inside main Chat UI
    appendAIMessageUI(callActiveSpeaker.name, callActiveSpeaker.color, botReply, callActiveSpeaker.avatarUrl, session.messages.length - 1);
    scrollToBottom(true);

    if (statusBadge) statusBadge.textContent = "connected";
    if (subtitleBox) {
      subtitleBox.innerHTML = `<span style="color:${callActiveSpeaker.color}; font-weight:600;">${callActiveSpeaker.name}:</span> "${botReply}"`;
    }

    // Read bot answer aloud
    speakCallText(botReply, () => {
      // Restart user mic
      initializeCallSpeechRecognition();
      
      // Queue next AI speaker in the loop
      queueNextAICallResponse();
    });

  } catch (err) {
    console.error("Call reply fetch error:", err);
    if (statusBadge) statusBadge.textContent = "error";
    if (subtitleBox) subtitleBox.textContent = "[Saluran transmisi terganggu. Mencoba menyambungkan kembali...]";
    
    setTimeout(() => {
      if (isPhoneCallActive) initializeCallSpeechRecognition();
    }, 3000);
  }
}

// Queues next AI to speak in the multi-party loop (respects auto chat state)
function queueNextAICallResponse() {
  if (!isPhoneCallActive) return;
  clearTimeout(callAutoReplyTimeout);

  if (isAutoChatEnabled) {
    const delay = autoChatDelay + Math.floor(Math.random() * 1500);
    callAutoReplyTimeout = setTimeout(async () => {
      if (!isPhoneCallActive || isCallAISpeaking) return;

      // Cycle to next bot speaker
      callActiveAgentIndex = (callActiveAgentIndex + 1) % agents.length;
      callActiveSpeaker = agents[callActiveAgentIndex];
      
      await fetchAndSpeakAICallResponse();
    }, delay);
  }
}

// User Control: Force next AI Response instantly
window.forceCallAIResponse = () => {
  if (!isPhoneCallActive || isCallAISpeaking) return;
  
  playSound('click');
  showNotification("Memaksa respon AI...");
  logTerminal("Forced AI reply loop triggered via Call control panel.");

  // Clear pending timers to prevent double triggers
  clearTimeout(callSpeechTimeout);
  clearTimeout(callAutoReplyTimeout);

  if (callRecognition) {
    try { callRecognition.stop(); } catch(e){}
  }

  // Shift focus to next speaker and fetch response
  callActiveAgentIndex = (callActiveAgentIndex + 1) % agents.length;
  callActiveSpeaker = agents[callActiveAgentIndex];
  
  fetchAndSpeakAICallResponse();
};

// User Control: Mute Mic
window.toggleCallUserMute = () => {
  callUserMicMuted = !callUserMicMuted;
  const btn = document.getElementById('callMuteMicBtn');
  const subtitleBox = document.getElementById('callSubtitleBox');

  if (btn) {
    btn.classList.toggle('active', callUserMicMuted);
    btn.style.background = callUserMicMuted ? '#ef4444' : 'rgba(255,255,255,0.05)';
    btn.style.borderColor = callUserMicMuted ? '#ef4444' : 'rgba(255,255,255,0.15)';
  }

  if (callUserMicMuted) {
    if (callRecognition) {
      try { callRecognition.stop(); } catch(e){}
    }
    if (subtitleBox) subtitleBox.innerHTML = `<span style="color:#ef4444; font-weight:bold;">[Mikrofon Anda Dimute]</span>`;
  } else {
    initializeCallSpeechRecognition();
  }
  playSound('toggle');
};

// User Control: End Call
window.endVoiceCall = () => {
  isPhoneCallActive = false;
  
  if (callTimerInterval) clearInterval(callTimerInterval);
  clearTimeout(callAutoReplyTimeout);
  clearTimeout(callSpeechTimeout);

  if (callRecognition) {
    try { callRecognition.stop(); } catch(e){}
  }
  window.speechSynthesis.cancel();

  // Clear highlighted active speak cards
  agents.forEach((a, idx) => {
    const card = document.getElementById(`callCard_${idx}`);
    if (card) {
      card.classList.remove('highlighted');
      card.style.removeProperty('box-shadow');
      card.style.removeProperty('border-color');
    }
  });

  const callScreen = document.getElementById('hologramCallScreen');
  if (callScreen) callScreen.classList.remove('active');

  showNotification("Panggilan Suara Berakhir.");
  logTerminal("Phone Call disconnected.");
  playSound('delete');

  // Resume auto chat if enabled
  if (isAutoChatEnabled) {
    startAutoChat();
  }
};

// User Control: Loudspeaker Toggle
window.toggleCallSpeakerphone = () => {
  callSpeakerphoneActive = !callSpeakerphoneActive;
  const btn = document.getElementById('callSpeakerBtn');
  if (btn) {
    btn.classList.toggle('active', callSpeakerphoneActive);
  }
  playSound('toggle');
  showNotification(callSpeakerphoneActive ? "Loudspeaker: ON (Volume Normal)" : "Loudspeaker: OFF (Mode Handset - Suara Sangat Kecil)");
};

// AI Profile Control: Mute bot audio
window.toggleCallBotMute = (index, btn) => {
  const agent = agents[index];
  if (agent) {
    agent.callMuted = !agent.callMuted;
    if (btn) btn.classList.toggle('active', agent.callMuted);
    playSound('toggle');
    showNotification(`${agent.name} ${agent.callMuted ? 'dimute' : 'diunmute'}`);
  }
};

// AI Profile Control: Stop speaking instantly
window.stopCallBotSpeak = (index) => {
  const agent = agents[index];
  if (agent) {
    window.speechSynthesis.cancel();
    isCallAISpeaking = false;
    
    const waves = document.getElementById('callWaveformSim');
    if (waves) waves.classList.remove('speaking');
    
    playSound('click');
    showNotification(`Suara ${agent.name} dihentikan.`);
    
    // Switch mic listener back on
    initializeCallSpeechRecognition();

    // Re-queue next AI to speak in loop
    queueNextAICallResponse();
  }
};

// AI Profile Control: Loud Voice
window.toggleCallBotLoud = (index, btn) => {
  const agent = agents[index];
  if (agent) {
    agent.callLoud = !agent.callLoud;
    if (btn) btn.classList.toggle('active', agent.callLoud);
    playSound('toggle');
  }
};

// Toggles Logic
const toggleAutoBtn = document.getElementById('toggleAutoChatBtn');
if (toggleAutoBtn) {
  toggleAutoBtn.addEventListener('click', () => {
    isAutoChatEnabled = !isAutoChatEnabled;
    if (isAutoChatEnabled) {
      toggleAutoBtn.textContent = "⏸️ Pause AI";
      toggleAutoBtn.classList.add('active');
      
      if (isPhoneCallActive) {
        queueNextAICallResponse();
      } else {
        if (!activeStreams.has(currentChatId)) triggerAIReply();
      }
    } else {
      toggleAutoBtn.textContent = "▶️ Auto Chat (Off)";
      toggleAutoBtn.classList.remove('active');
      clearTimeout(callAutoReplyTimeout);
    }
  });
}

const toggleThinkBtn = document.getElementById('toggleThinkBtn');
if (toggleThinkBtn) {
  toggleThinkBtn.addEventListener('click', () => {
    isThinkingEnabled = !isThinkingEnabled;
    const msgsDiv = document.getElementById('chatMessages');
    if (isThinkingEnabled) {
      toggleThinkBtn.textContent = "🧠 Think: ON";
      toggleThinkBtn.classList.add('active');
      if (msgsDiv) msgsDiv.classList.remove('hide-thinking');
    } else {
      toggleThinkBtn.textContent = "🧠 Think: OFF";
      toggleThinkBtn.classList.remove('active');
      if (msgsDiv) msgsDiv.classList.add('hide-thinking');
    }
  });
}

const toggleWebSearchBtn = document.getElementById('toggleWebSearchBtn');
if (toggleWebSearchBtn) {
  toggleWebSearchBtn.addEventListener('click', () => {
    isWebSearchEnabled = !isWebSearchEnabled;
    if (isWebSearchEnabled) {
      toggleWebSearchBtn.textContent = "🔍 Web: ON";
      toggleWebSearchBtn.classList.add('active');
    } else {
      toggleWebSearchBtn.textContent = "🔍 Web: OFF";
      toggleWebSearchBtn.classList.remove('active');
    }
  });
}

// Edit Config
const configEditBtn = document.getElementById('editBtn');
if (configEditBtn) {
  configEditBtn.addEventListener('click', () => {
    isChatActive = false;
    if (autoChatInterval) clearTimeout(autoChatInterval);
    app.classList.remove('active');
    document.getElementById('setupScreen').style.display = 'flex';
    document.getElementById('chatScreen').style.display = 'none';
    closeSidebar();
  });
}

// Async Load voices & Bind voiceschanged event
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    getSystemVoices();
    setupAgents.forEach((agent, i) => {
      if (!agent) return;
      const select = document.getElementById(`agentVoice_${i}`);
      if (select) {
        const currentVal = select.value || agent.voiceName || "";
        let voiceOptions = systemVoices.map(v => `
          <option value="${v.name}" ${currentVal === v.name ? 'selected' : ''}>${v.name} (${v.lang})</option>
        `).join('');
        select.innerHTML = `<option value="">Default System Voice (Otomatis)</option>` + voiceOptions;
      }
    });
  };
  getSystemVoices();
}

// Global click sound & ripple generator binder (Plays retro beep & spawns glowing ripple)
document.addEventListener('click', (e) => {
  const target = e.target;
  const isInteractive = (
    target.tagName === 'BUTTON' || 
    target.tagName === 'SELECT' || 
    target.tagName === 'INPUT' || 
    target.classList.contains('btn-prompt-tag') ||
    target.classList.contains('preset-avatar-btn') ||
    target.classList.contains('history-title') ||
    target.classList.contains('terminal-header') ||
    target.classList.contains('btn-history-del') ||
    target.closest('.btn-copy-code')
  );

  if (isInteractive) {
    playSound('click');
    
    // Spawn custom neon ripple animation at coordinate
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 380);
  }
});

// Setup scroll listeners for floating bottom jumps & keyboard input ticking
const chatInputBar = document.getElementById('chatInput');
if (chatInputBar) {
  chatInputBar.addEventListener('input', () => {
    playSound('type');
  });
}

const msgsPanel = document.getElementById('chatMessages');
if (msgsPanel) {
  msgsPanel.addEventListener('scroll', () => {
    const offset = msgsPanel.scrollHeight - msgsPanel.clientHeight - msgsPanel.scrollTop;
    isUserScrollingUp = offset > 150;
    
    const scrollBtn = document.getElementById('floatingScrollBtn');
    if (scrollBtn) {
      scrollBtn.style.display = isUserScrollingUp ? 'flex' : 'none';
    }
  });
}

// Resilient startup & configuration loader
try {
  loadConfig();
  loadChats();
  renderAgentForms();
  renderChatHistory();

  if (currentChatId && chats.some(c => c.id === currentChatId)) {
    loadChatSession(currentChatId);
  }
} catch(e) {
  console.error("Initialization load failed:", e);
}
