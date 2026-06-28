(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`#38bdf8`,`#fbbf24`,`#f472b6`,`#c084fc`,`#f87171`,`#2dd4bf`],t=e=>{try{let t=new(window.AudioContext||window.webkitAudioContext),n=t.createOscillator(),r=t.createGain();n.connect(r),r.connect(t.destination),e===`send`?(n.type=`sine`,n.frequency.setValueAtTime(450,t.currentTime),n.frequency.exponentialRampToValueAtTime(150,t.currentTime+.15),r.gain.setValueAtTime(.25,t.currentTime),r.gain.exponentialRampToValueAtTime(.001,t.currentTime+.15),n.start(t.currentTime),n.stop(t.currentTime+.15)):e===`receive`&&(n.type=`triangle`,n.frequency.setValueAtTime(550,t.currentTime),n.frequency.exponentialRampToValueAtTime(820,t.currentTime+.2),r.gain.setValueAtTime(.2,t.currentTime),r.gain.exponentialRampToValueAtTime(.001,t.currentTime+.2),n.start(t.currentTime),n.stop(t.currentTime+.2))}catch{console.log(`Audio feedback error or blocked.`)}},n=(e,t)=>{if(`speechSynthesis`in window){window.speechSynthesis.cancel();let n=e.replace(/<think>[\s\S]*?<\/think>/g,``).trim();if(!n)return;let r=new SpeechSynthesisUtterance(n),i=window.speechSynthesis.getVoices().find(e=>e.lang.includes(`id`)||e.lang.includes(`ID`));i&&(r.voice=i),r.volume=1,r.rate=1.05,r.pitch=1;let a=document.getElementById(t);r.onstart=()=>{a&&a.classList.add(`speaking`)},r.onend=()=>{a&&a.classList.remove(`speaking`)},r.onerror=()=>{a&&a.classList.remove(`speaking`)},window.speechSynthesis.speak(r)}},r=(e,t)=>{let n=0;for(let t=0;t<e.length;t++)n=e.charCodeAt(t)+((n<<5)-n);let r=Math.abs(n%3),i=Math.abs((n>>2)%3),a=``;a=r===0?`<circle cx="35" cy="45" r="6" fill="#0f172a"/><circle cx="65" cy="45" r="6" fill="#0f172a"/>`:r===1?`<rect x="29" y="42" width="12" height="6" rx="2" fill="#0f172a"/><rect x="59" y="42" width="12" height="6" rx="2" fill="#0f172a"/>`:`<circle cx="35" cy="45" r="5" fill="#0f172a"/><circle cx="65" cy="45" r="5" fill="#0f172a"/><path d="M26 38 L38 38 M62 38 L74 38" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>`;let o=``;o=i===0?`<rect x="38" y="62" width="24" height="6" rx="3" fill="#0f172a"/>`:i===1?`<path d="M38 64 Q50 76 62 64" stroke="#0f172a" stroke-width="3" fill="none" stroke-linecap="round"/>`:`<path d="M38 66 L62 66" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round"/>`;let s=`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="${t}" rx="50"/>
      <rect x="10" y="40" width="8" height="22" rx="4" fill="#ffffff" opacity="0.8"/>
      <rect x="82" y="40" width="8" height="22" rx="4" fill="#ffffff" opacity="0.8"/>
      <rect x="18" y="22" width="64" height="58" rx="16" fill="#f8fafc"/>
      <line x1="50" y1="22" x2="50" y2="8" stroke="#f8fafc" stroke-width="4"/>
      <circle cx="50" cy="7" r="6" fill="#ff007f"/>
      <rect x="24" y="28" width="52" height="46" rx="10" fill="${t}" opacity="0.15"/>
      ${a}
      ${o}
    </svg>
  `;return`data:image/svg+xml;utf8,${encodeURIComponent(s)}`},i=class{constructor(e,t,n,i){this.name=e,this.model=t,this.persona=n,this.color=i,this.avatarUrl=r(e,i),this.memory=[],this.setSystemPrompt()}setSystemPrompt(){let e=`Nama lu adalah ${this.name}. ${this.persona}`;this.memory=[{role:`system`,content:e}]}receiveMessage(e,t){let n=t.replace(/<think>[\s\S]*?<\/think>/g,``).trim();this.memory.push({role:`user`,content:`${e} berkata: ${n}`})}},a=[],o=null,s=!1,c=null,l=!1,u=!0,d=`/api`,f=!0,p=!1,m=document.getElementById(`app`);m.innerHTML=`
  <div class="setup-screen" id="setupScreen">
    <div class="setup-header">
      <h1>AI Multiverse Lab 2.0</h1>
      <p style="color: var(--text-secondary); margin-top: 0.5rem; font-weight: 500;">Simulasikan grup chat AI dengan nalar pemikiran & pencarian web publik</p>
    </div>
    
    <div class="setup-form">
      <div style="display: flex; gap: 1rem; width: 100%; flex-wrap: wrap;">
        <div class="input-group" style="flex: 1; min-width: 250px;">
          <label>Ollama API URL</label>
          <input type="text" id="apiEndpoint" placeholder="Contoh: https://xxxx.ngrok-free.app" value="/api">
        </div>
        
        <div class="input-group" style="flex: 1; min-width: 200px;">
          <label>Pilih Gaya Tema</label>
          <select id="themeSelector">
            <option value="cyan">Neon Cyberpunk (Cyan)</option>
            <option value="matrix">Digital Code (Matrix Green)</option>
            <option value="pink">Synthwave Pulse (Pink)</option>
          </select>
        </div>
      </div>

      <div class="input-group">
        <label>Jumlah Agen AI</label>
        <input type="number" id="numAgents" min="1" max="8" value="2">
      </div>
      
      <div id="agentFormsContainer" style="display: flex; flex-direction: column; gap: 1.25rem;">
        <!-- Generated dynamically -->
      </div>
      
      <button class="btn-primary" id="startBtn">⚡ INITIALIZE SYSTEM</button>
    </div>
  </div>

  <div class="chat-screen" id="chatScreen">
    <div class="chat-header">
      <h2><div class="status-dot"></div> Live Simulation</h2>
      <div class="header-controls">
        <button class="btn-icon active" id="toggleAutoChatBtn">⏸️ Pause AI</button>
        <button class="btn-icon active" id="toggleThinkBtn">🧠 Think: ON</button>
        <button class="btn-icon" id="toggleWebSearchBtn">🔍 Web: OFF</button>
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
`;var h=document.getElementById(`numAgents`),g=document.getElementById(`agentFormsContainer`),_=document.getElementById(`themeSelector`);_.addEventListener(`change`,()=>{document.body.className=``,_.value!==`cyan`&&document.body.classList.add(`theme-${_.value}`)});function v(){let t=parseInt(h.value)||2,n=``;for(let i=0;i<t;i++){let t=e[i%e.length],a=`Bot ${i+1}`,o=r(a,t);n+=`
      <div class="agent-card">
        <h3 style="font-size: 1.15rem; color: ${t}; display:flex; align-items:center; gap:12px; font-weight: 800;">
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
    `}g.innerHTML=n}window.updateFormAvatar=t=>{let n=document.getElementById(`agentName_${t}`),i=document.getElementById(`formAvatarImg_${t}`);if(n&&i){let a=n.value||`Bot ${t+1}`,o=e[t%e.length];i.src=r(a,o)}},h.addEventListener(`change`,v),v(),document.getElementById(`startBtn`).addEventListener(`click`,()=>{let t=parseInt(h.value)||2;d=document.getElementById(`apiEndpoint`).value.trim()||`/api`,a=[];for(let n=0;n<t;n++){let t=document.getElementById(`agentName_${n}`).value||`Bot ${n+1}`,r=document.getElementById(`agentModel_${n}`).value||`fable5-qwen-custom`,o=document.getElementById(`agentPersona_${n}`).value||``;a.push(new i(t,r,o,e[n%e.length]))}document.getElementById(`setupScreen`).style.display=`none`,document.getElementById(`chatScreen`).style.display=`flex`,m.classList.add(`active`),s=!0,c=null,u=!0,document.getElementById(`toggleAutoChatBtn`).textContent=`⏸️ Pause AI`,document.getElementById(`chatMessages`).innerHTML=``,O()});var y=document.getElementById(`chatMessages`),b=document.getElementById(`chatInput`),x=document.getElementById(`sendBtn`);function S(){y.scrollTo({top:y.scrollHeight,behavior:`smooth`})}function C(e){let t=document.createElement(`div`);t.className=`message-wrapper user`,t.innerHTML=`
    <div class="avatar-container">
      <img src="data:image/svg+xml;utf8,%0A%20%20%20%20%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22%233b82f6%22%2F%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2250%22%20cy%3D%2240%22%20r%3D%2218%22%20fill%3D%22%23ffffff%22%2F%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M22%2080%20C%2022%2060%2C%2078%2060%2C%2078%2080%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%228%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%2F%3E%0A%20%20%20%20%3C%2Fsvg%3E%0A%20%20" class="avatar">
    </div>
    <div class="message-content">
      <div class="message-sender">Kamu (Manusia)</div>
      <div class="message-bubble">${w(e)}</div>
    </div>
  `,y.appendChild(t),S(),a.forEach(t=>t.receiveMessage(`Kamu (User Manusia)`,e))}function w(e){return e.replace(/[&<>'"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,"'":`&#39;`,'"':`&quot;`})[e])}async function T(e){try{let t=`https://api.duckduckgo.com/?q=${encodeURIComponent(e)}&format=json&no_html=1`,n=await fetch(t);if(!n.ok)return null;let r=await n.json();return r.AbstractText||r.RelatedTopics?.[0]?.Text||null}catch(e){return console.error(`Search failed:`,e),null}}function E(e){let t=``,n=e;if(e.includes(`<think>`)){let r=e.split(`</think>`);r.length>1?(t=r[0].replace(`<think>`,``).trim(),n=r[1].trim()):(t=e.replace(`<think>`,``).trim(),n=``)}let r=``;return t&&(r+=`
      <details class="think-accordion" ${n===``?`open`:``}>
        <summary>🧠 Thinking Process...</summary>
        <div class="think-content">${w(t)}</div>
      </details>
    `),(n||!t)&&(r+=`<div class="reply-text">${w(n).replace(/\n/g,`<br>`)}</div>`),r}async function D(e=null){if(l||!s||a.length===0)return;l=!0;let r=a.filter(e=>e!==c);r.length===0&&(r=a);let i=r[Math.floor(Math.random()*r.length)],o=`bubble_${Date.now()}`,u=document.createElement(`div`);u.className=`message-wrapper ai`,u.innerHTML=`
    <div class="avatar-container" id="avatar_${o}">
      <img src="${i.avatarUrl}" class="avatar">
      <div class="sound-badge">🔊</div>
    </div>
    <div class="message-content">
      <div class="message-sender" style="color: ${i.color}">${i.name}</div>
      <div class="message-bubble" id="${o}">
        <div class="typing-indicator">
          <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
        </div>
      </div>
      <div class="speedometer-badge" id="speed_${o}" style="display:none;">⚡ 0.0 tokens/s</div>
    </div>
  `,y.appendChild(u),S();let f=u.querySelector(`.message-bubble`),m=u.querySelector(`.speedometer-badge`);if(p){let t=e;if(!t){let e=i.memory[i.memory.length-1];e&&e.role===`user`&&(t=e.content.replace(/.*?berkata:\s*/,``))}if(t){let e=document.createElement(`div`);e.className=`search-loader`,e.innerHTML=`🔍 Memindai informasi web untuk "${w(t)}"...`,f.parentNode.insertBefore(e,f),S();let n=await T(t);n?(e.innerHTML=`🔍 <b>Informasi Web Ditemukan:</b> "${w(n)}"`,i.memory.push({role:`user`,content:`[Konteks Informasi Hasil Pencarian Web Terbaru: ${n}. Gunakan info ini jika relevan untuk menjawab.]`})):e.remove()}}try{let e=d.endsWith(`/api`)?`${d}/chat`:`${d}/api/chat`,r=await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`,"ngrok-skip-browser-warning":`true`},body:JSON.stringify({model:i.model,messages:i.memory,stream:!0})});if(!r.ok)throw Error(`API Error`);f.innerHTML=`<span id="textNode"></span><span class="cursor"></span>`;let s=f.querySelector(`#textNode`),l=f.querySelector(`.cursor`),u=``,h=r.body.getReader(),g=new TextDecoder,_=Date.now();for(m.style.display=`inline-block`;;){let{done:e,value:t}=await h.read();if(e)break;let n=g.decode(t,{stream:!0}).split(`
`).filter(e=>e.trim()!==``);for(let e of n)try{let t=JSON.parse(e);if(t.message&&t.message.content){u+=t.message.content,s.innerHTML=E(u);let e=(Date.now()-_)/1e3,n=Math.ceil(u.length/4);m.textContent=`⚡ ${(n/(e||.1)).toFixed(1)} tokens/s | ${n} tokens`,S()}}catch{}}l.remove(),i.memory.push({role:`assistant`,content:u}),c=i,t(`receive`),document.getElementById(`avatar_${o}`).addEventListener(`click`,()=>{n(u,o)}),a.forEach(e=>{e!==i&&e.receiveMessage(i.name,u)}),p&&(i.memory=i.memory.filter(e=>!e.content.includes(`[Konteks Informasi Hasil Pencarian Web Terbaru:`)))}catch{f.innerHTML=`<span style="color: var(--text-secondary)">[Gagal menghubungkan ke Ollama. Pastikan model dan port API valid!]</span>`}l=!1}function O(){o&&clearTimeout(o);let e=async()=>{if(!s)return;u&&!l&&await D();let t=Math.floor(Math.random()*5e3)+4e3;o=setTimeout(e,t)};o=setTimeout(e,2e3)}async function k(){let e=b.value.trim();!e||l||(b.value=``,C(e),t(`send`),o&&clearTimeout(o),await D(e),O())}x.addEventListener(`click`,k),b.addEventListener(`keypress`,e=>{e.key===`Enter`&&k()});var A=document.getElementById(`toggleAutoChatBtn`);A.addEventListener(`click`,()=>{u=!u,u?(A.textContent=`⏸️ Pause AI`,A.classList.add(`active`),l||D()):(A.textContent=`▶️ Auto Chat (Off)`,A.classList.remove(`active`))});var j=document.getElementById(`toggleThinkBtn`);j.addEventListener(`click`,()=>{f=!f,f?(j.textContent=`🧠 Think: ON`,j.classList.add(`active`),y.classList.remove(`hide-thinking`)):(j.textContent=`🧠 Think: OFF`,j.classList.remove(`active`),y.classList.add(`hide-thinking`))});var M=document.getElementById(`toggleWebSearchBtn`);M.addEventListener(`click`,()=>{p=!p,p?(M.textContent=`🔍 Web: ON`,M.classList.add(`active`)):(M.textContent=`🔍 Web: OFF`,M.classList.remove(`active`))}),document.getElementById(`resetMemBtn`).addEventListener(`click`,()=>{a.forEach(e=>e.setSystemPrompt());let e=document.createElement(`div`);e.style=`text-align: center; color: var(--text-secondary); margin: 1rem 0; font-size: 0.85rem; font-weight: 600;`,e.textContent=`— 🧹 Memori Semua AI Telah Dihapus Total —`,y.appendChild(e),S(),c=null}),document.getElementById(`exportBtn`).addEventListener(`click`,()=>{let e=`=== LOG OBROLAN MULTI-AI ===

`;y.querySelectorAll(`.message-wrapper`).forEach(t=>{let n=t.querySelector(`.message-sender`).textContent,r=t.querySelector(`.message-bubble`).innerText;e+=`[${n}]: ${r}\n\n`});let t=new Blob([e],{type:`text/plain`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`Chat_Log_MultiAI.txt`,r.click(),URL.revokeObjectURL(n)}),document.getElementById(`editBtn`).addEventListener(`click`,()=>{s=!1,o&&clearTimeout(o),m.classList.remove(`active`),document.getElementById(`setupScreen`).style.display=`flex`,document.getElementById(`chatScreen`).style.display=`none`});