(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`#38bdf8`,`#fbbf24`,`#f472b6`,`#c084fc`,`#f87171`,`#2dd4bf`],t=(e,t)=>{let n=0;for(let t=0;t<e.length;t++)n=e.charCodeAt(t)+((n<<5)-n);let r=Math.abs(n%3),i=Math.abs((n>>2)%3),a=``;a=r===0?`<circle cx="35" cy="45" r="6" fill="#0f172a"/><circle cx="65" cy="45" r="6" fill="#0f172a"/>`:r===1?`<rect x="29" y="42" width="12" height="6" rx="2" fill="#0f172a"/><rect x="59" y="42" width="12" height="6" rx="2" fill="#0f172a"/>`:`<circle cx="35" cy="45" r="5" fill="#0f172a"/><circle cx="65" cy="45" r="5" fill="#0f172a"/><path d="M26 38 L38 38 M62 38 L74 38" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>`;let o=``;o=i===0?`<rect x="38" y="62" width="24" height="6" rx="3" fill="#0f172a"/>`:i===1?`<path d="M38 64 Q50 76 62 64" stroke="#0f172a" stroke-width="3" fill="none" stroke-linecap="round"/>`:`<path d="M38 66 L62 66" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round"/>`;let s=`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="${t}" rx="50"/>
      <!-- Telinga Robot -->
      <rect x="10" y="40" width="8" height="22" rx="4" fill="#ffffff" opacity="0.8"/>
      <rect x="82" y="40" width="8" height="22" rx="4" fill="#ffffff" opacity="0.8"/>
      <!-- Kepala Robot -->
      <rect x="18" y="22" width="64" height="58" rx="16" fill="#f8fafc"/>
      <!-- Antena -->
      <line x1="50" y1="22" x2="50" y2="8" stroke="#f8fafc" stroke-width="4"/>
      <circle cx="50" cy="7" r="6" fill="#ff007f"/>
      <!-- Layar Wajah -->
      <rect x="24" y="28" width="52" height="46" rx="10" fill="${t}" opacity="0.15"/>
      <!-- Mata & Mulut -->
      ${a}
      ${o}
    </svg>
  `;return`data:image/svg+xml;utf8,${encodeURIComponent(s)}`},n=e=>{try{let t=new(window.AudioContext||window.webkitAudioContext),n=t.createOscillator(),r=t.createGain();n.connect(r),r.connect(t.destination),e===`send`?(n.type=`sine`,n.frequency.setValueAtTime(450,t.currentTime),n.frequency.exponentialRampToValueAtTime(150,t.currentTime+.15),r.gain.setValueAtTime(.25,t.currentTime),r.gain.exponentialRampToValueAtTime(.001,t.currentTime+.15),n.start(t.currentTime),n.stop(t.currentTime+.15)):e===`receive`&&(n.type=`triangle`,n.frequency.setValueAtTime(550,t.currentTime),n.frequency.exponentialRampToValueAtTime(820,t.currentTime+.2),r.gain.setValueAtTime(.2,t.currentTime),r.gain.exponentialRampToValueAtTime(.001,t.currentTime+.2),n.start(t.currentTime),n.stop(t.currentTime+.2))}catch{console.log(`Audio not supported or interaction needed.`)}},r=(e,t)=>{if(`speechSynthesis`in window){window.speechSynthesis.cancel();let n=new SpeechSynthesisUtterance(e),r=window.speechSynthesis.getVoices().find(e=>e.lang.includes(`id`)||e.lang.includes(`ID`));r&&(n.voice=r),n.volume=1,n.rate=1.05,n.pitch=1;let i=document.getElementById(t);n.onstart=()=>{i&&i.classList.add(`speaking`)},n.onend=()=>{i&&i.classList.remove(`speaking`)},n.onerror=()=>{i&&i.classList.remove(`speaking`)},window.speechSynthesis.speak(n)}};`speechSynthesis`in window&&window.speechSynthesis.getVoices();var i=class{constructor(e,n,r,i){this.name=e,this.model=n,this.persona=r,this.color=i,this.avatarUrl=t(e,i),this.memory=[],this.setSystemPrompt()}setSystemPrompt(){let e=`Nama lu adalah ${this.name}. ${this.persona}`;this.memory=[{role:`system`,content:e}]}receiveMessage(e,t){this.memory.push({role:`user`,content:`${e} berkata: ${t}`})}},a=[],o=null,s=!1,c=null,l=!1,u=!0,d=`/api`,f=document.getElementById(`app`);f.innerHTML=`
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
`;var p=document.getElementById(`numAgents`),m=document.getElementById(`agentFormsContainer`);function h(){let n=parseInt(p.value)||2,r=``;for(let i=0;i<n;i++){let n=e[i%e.length],a=`Bot ${i+1}`,o=t(a,n);r+=`
      <div class="agent-card">
        <h3 style="font-size: 1.15rem; color: ${n}; display:flex; align-items:center; gap:12px; font-weight: 800;">
          <img id="formAvatarImg_${i}" src="${o}" style="width:36px; height:36px;"> 
          Profil Agen ${i+1}
        </h3>
        <div class="input-group">
          <label>Nama AI</label>
          <input type="text" id="agentName_${i}" placeholder="Nama (Contoh: Chisil)" value="${a}" oninput="updateFormAvatar(${i})">
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
    `}m.innerHTML=r}window.updateFormAvatar=n=>{let r=document.getElementById(`agentName_${n}`),i=document.getElementById(`formAvatarImg_${n}`);if(r&&i){let a=r.value||`Bot ${n+1}`,o=e[n%e.length];i.src=t(a,o)}},p.addEventListener(`change`,h),h(),document.getElementById(`startBtn`).addEventListener(`click`,()=>{let t=parseInt(p.value)||2;d=document.getElementById(`apiEndpoint`).value.trim()||`/api`,a=[];for(let n=0;n<t;n++){let t=document.getElementById(`agentName_${n}`).value||`Bot ${n+1}`,r=document.getElementById(`agentModel_${n}`).value||`fable5-qwen-custom`,o=document.getElementById(`agentPersona_${n}`).value||``;a.push(new i(t,r,o,e[n%e.length]))}document.getElementById(`setupScreen`).style.display=`none`,document.getElementById(`chatScreen`).style.display=`flex`,f.classList.add(`active`),s=!0,c=null,u=!0,document.getElementById(`toggleAutoChatBtn`).textContent=`⏸️ Pause AI`,document.getElementById(`chatMessages`).innerHTML=``,C()});var g=document.getElementById(`chatMessages`),_=document.getElementById(`chatInput`),v=document.getElementById(`sendBtn`);function y(){g.scrollTo({top:g.scrollHeight,behavior:`smooth`})}function b(e){let t=document.createElement(`div`);t.className=`message-wrapper user`,t.innerHTML=`
    <div class="avatar-container">
      <img src="data:image/svg+xml;utf8,%0A%20%20%20%20%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22%233b82f6%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2250%22%20cy%3D%2240%22%20r%3D%2218%22%20fill%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M22%2080%20C%2022%2060%2C%2078%2060%2C%2078%2080%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%228%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20" class="avatar">
    </div>
    <div class="message-content">
      <div class="message-sender">Kamu (Manusia)</div>
      <div class="message-bubble">${x(e)}</div>
    </div>
  `,g.appendChild(t),y(),a.forEach(t=>t.receiveMessage(`Kamu (User Manusia)`,e))}function x(e){return e.replace(/[&<>'"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,"'":`&#39;`,'"':`&quot;`})[e])}async function S(){if(l||!s||a.length===0)return;l=!0;let e=a.filter(e=>e!==c);e.length===0&&(e=a);let t=e[Math.floor(Math.random()*e.length)],i=`bubble_${Date.now()}`,o=document.createElement(`div`);o.className=`message-wrapper ai`,o.innerHTML=`
    <div class="avatar-container" id="avatar_${i}">
      <img src="${t.avatarUrl}" class="avatar">
      <div class="sound-badge">🔊</div>
    </div>
    <div class="message-content">
      <div class="message-sender" style="color: ${t.color}">${t.name}</div>
      <div class="message-bubble" id="${i}">
        <div class="typing-indicator">
          <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
        </div>
      </div>
    </div>
  `,g.appendChild(o),y();let u=o.querySelector(`.message-bubble`);try{let e=d.endsWith(`/api`)?`${d}/chat`:`${d}/api/chat`,o=await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`,"ngrok-skip-browser-warning":`true`},body:JSON.stringify({model:t.model,messages:t.memory,stream:!0})});if(!o.ok)throw Error(`API Error`);u.innerHTML=`<span id="textNode"></span><span class="cursor"></span>`;let s=u.querySelector(`#textNode`),l=u.querySelector(`.cursor`),f=``,p=o.body.getReader(),m=new TextDecoder;for(;;){let{done:e,value:t}=await p.read();if(e)break;let n=m.decode(t,{stream:!0}).split(`
`).filter(e=>e.trim()!==``);for(let e of n)try{let t=JSON.parse(e);t.message&&t.message.content&&(f+=t.message.content,s.innerHTML=x(f).replace(/\n/g,`<br>`),y())}catch{}}l.remove(),t.memory.push({role:`assistant`,content:f}),c=t,n(`receive`),document.getElementById(`avatar_${i}`).addEventListener(`click`,()=>{r(f,i)}),a.forEach(e=>{e!==t&&e.receiveMessage(t.name,f)})}catch{u.innerHTML=`<span style="color: var(--text-secondary)">[Gagal menghubungkan ke Ollama. Pastikan model dengan nama tersebut ada di list Ollama Anda]</span>`}l=!1}function C(){o&&clearTimeout(o);let e=async()=>{if(!s)return;u&&!l&&await S();let t=Math.floor(Math.random()*5e3)+4e3;o=setTimeout(e,t)};o=setTimeout(e,2e3)}async function w(){let e=_.value.trim();!e||l||(_.value=``,b(e),n(`send`),o&&clearTimeout(o),await S(),C())}v.addEventListener(`click`,w),_.addEventListener(`keypress`,e=>{e.key===`Enter`&&w()});var T=document.getElementById(`toggleAutoChatBtn`);T.addEventListener(`click`,()=>{u=!u,u?(T.textContent=`⏸️ Pause AI`,T.classList.add(`active`),T.style.color=`#06b6d4`,T.style.borderColor=`rgba(6, 182, 212, 0.5)`,l||S()):(T.textContent=`▶️ Auto Chat (Off)`,T.classList.remove(`active`),T.style.color=`var(--text-secondary)`,T.style.borderColor=`var(--glass-border)`)}),document.getElementById(`resetMemBtn`).addEventListener(`click`,()=>{a.forEach(e=>e.setSystemPrompt());let e=document.createElement(`div`);e.style=`text-align: center; color: var(--text-secondary); margin: 1rem 0; font-size: 0.85rem; font-weight: 600;`,e.textContent=`— 🧹 Memori Semua AI Telah Dihapus Total —`,g.appendChild(e),y(),c=null}),document.getElementById(`exportBtn`).addEventListener(`click`,()=>{let e=`=== LOG OBROLAN MULTI-AI ===

`;g.querySelectorAll(`.message-wrapper`).forEach(t=>{let n=t.querySelector(`.message-sender`).textContent,r=t.querySelector(`.message-bubble`).innerText;e+=`[${n}]: ${r}\n\n`});let t=new Blob([e],{type:`text/plain`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`Chat_Log_MultiAI.txt`,r.click(),URL.revokeObjectURL(n)}),document.getElementById(`editBtn`).addEventListener(`click`,()=>{s=!1,o&&clearTimeout(o),f.classList.remove(`active`),document.getElementById(`setupScreen`).style.display=`flex`,document.getElementById(`chatScreen`).style.display=`none`});