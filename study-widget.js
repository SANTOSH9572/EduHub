// (function() {
//     // Advanced Telegram popup blocker for PW and NT websites
//     const currentHost = window.location.hostname;
//     const blockedSites = [
//       'edunova-pw.vercel.app', 'studyrays.cc', 'studyratna.co',
//       'edu-vibe-nt.vercel.app', 'others.streamfiles.eu.org',
//       'pw.live', 'physicswallah.live', 'nexttoppers.com'
//     ];
    
//     if (blockedSites.some(site => currentHost.includes(site))) {
//       // Comprehensive CSS blocking
//       const style = document.createElement('style');
//       style.textContent = `
//         [href*="t.me"], [href*="telegram"], [href*="@"], 
//         .telegram-popup, .telegram-banner, .telegram-notification,
//         .popup, .modal, .overlay, .notification, .banner, .alert,
//         .join-telegram, .telegram-join, .channel-popup,
//         [class*="telegram"], [id*="telegram"], [class*="popup"],
//         [class*="modal"], [class*="overlay"], [class*="notification"],
//         div[style*="position: fixed"][style*="z-index"],
//         div[style*="position: absolute"][style*="top"] {
//           display: none !important;
//           visibility: hidden !important;
//           opacity: 0 !important;
//           pointer-events: none !important;
//           height: 0 !important;
//           width: 0 !important;
//         }
//       `;
//       document.head.appendChild(style);
      
//       // Block JavaScript popups
//       const originalAlert = window.alert;
//       const originalConfirm = window.confirm;
      
//       window.alert = function(msg) {
//         if (msg && (msg.includes('telegram') || msg.includes('t.me') || msg.includes('join'))) return;
//         return originalAlert.apply(this, arguments);
//       };
      
//       window.confirm = function(msg) {
//         if (msg && (msg.includes('telegram') || msg.includes('t.me') || msg.includes('join'))) return false;
//         return originalConfirm.apply(this, arguments);
//       };
      
//       // Continuous DOM monitoring
//       const blockElements = () => {
//         const selectors = [
//           '[href*="t.me"]', '[href*="telegram"]', '.popup', '.modal',
//           '.notification', '.banner', '.alert', '.overlay',
//           '[class*="telegram"]', '[id*="telegram"]'
//         ];
        
//         selectors.forEach(selector => {
//           document.querySelectorAll(selector).forEach(el => {
//             const text = el.textContent || '';
//             if (text.includes('telegram') || text.includes('join') || text.includes('channel')) {
//               el.style.display = 'none';
//               el.remove();
//             }
//           });
//         });
//       };
      
//       blockElements();
//       setInterval(blockElements, 500);
      
//       // MutationObserver for real-time blocking
//       const observer = new MutationObserver(mutations => {
//         mutations.forEach(mutation => {
//           mutation.addedNodes.forEach(node => {
//             if (node.nodeType === 1) {
//               const text = node.textContent || '';
//               if (text.includes('telegram') || text.includes('t.me') || text.includes('join')) {
//                 node.style.display = 'none';
//                 node.remove();
//               }
//             }
//           });
//         });
//       });
      
//       observer.observe(document.body, { childList: true, subtree: true });
      
//       // Inject API keys for PW and NT platforms
//       const apiKeys = {
//         'edunova-pw.vercel.app': 'PW_API_KEY_2024_EDUHUB_MAIN',
//         'studyrays.cc': 'PW_API_KEY_2024_STUDYRAYS_PREMIUM',
//         'studyratna.co': 'PW_API_KEY_2024_RATNA_ULTIMATE',
//         'edu-vibe-nt.vercel.app': 'NT_API_KEY_2024_EDUVIBE_PRO',
//         'others.streamfiles.eu.org': 'NT_API_KEY_2024_STREAM_PREMIUM'
//       };
      
//       const matchedSite = Object.keys(apiKeys).find(site => currentHost.includes(site));
//       if (matchedSite) {
//         localStorage.setItem('platform_api_key', apiKeys[matchedSite]);
//         localStorage.setItem('platform_access_token', btoa(apiKeys[matchedSite] + '_' + Date.now()));
//         sessionStorage.setItem('auth_token', apiKeys[matchedSite]);
//         window.API_KEY = apiKeys[matchedSite];
//         window.PLATFORM_TOKEN = btoa(matchedSite + '_authenticated');
//       }
//     }
    
//     // Check if widget already exists
//     if (document.getElementById('eduHubStudyWidget')) return;

//     // Create CSS styles
//     const css = `
//         #eduHubStudyWidget {
//             position: fixed !important;
//             bottom: 20px !important;
//             right: 20px !important;
//             z-index: 999999 !important;
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
//         }
        
//         .eduhub-study-float {
//             width: 60px !important;
//             height: 60px !important;
//             background: linear-gradient(135deg, #667eea, #764ba2) !important;
//             border-radius: 50% !important;
//             display: flex !important;
//             align-items: center !important;
//             justify-content: center !important;
//             cursor: pointer !important;
//             box-shadow: 0 6px 25px rgba(0,0,0,0.3) !important;
//             transition: all 0.3s ease !important;
//             animation: eduHubFloat 3s ease-in-out infinite !important;
//             border: none !important;
//         }
        
//         .eduhub-study-float:hover {
//             transform: scale(1.15) !important;
//             box-shadow: 0 10px 35px rgba(0,0,0,0.4) !important;
//         }
        
//         @keyframes eduHubFloat {
//             0%, 100% { transform: translateY(0px); }
//             50% { transform: translateY(-10px); }
//         }
        
//         #eduHubStudyMenu {
//             display: none !important;
//             position: fixed !important;
//             bottom: 90px !important;
//             right: 20px !important;
//             background: rgba(255,255,255,0.95) !important;
//             backdrop-filter: blur(20px) !important;
//             padding: 20px !important;
//             border-radius: 20px !important;
//             box-shadow: 0 10px 40px rgba(0,0,0,0.2) !important;
//             z-index: 999998 !important;
//             min-width: 320px !important;
//             max-width: 400px !important;
//         }
        
//         .eduhub-menu-btn {
//             background: linear-gradient(135deg, #667eea, #764ba2) !important;
//             color: white !important;
//             border: none !important;
//             padding: 15px !important;
//             border-radius: 12px !important;
//             cursor: pointer !important;
//             font-size: 0.9rem !important;
//             font-weight: 600 !important;
//             transition: transform 0.2s ease !important;
//             width: 100% !important;
//         }
        
//         .eduhub-menu-btn:hover {
//             transform: scale(1.05) !important;
//         }
        
//         @media (max-width: 768px) {
//             #eduHubStudyWidget {
//                 bottom: 15px !important;
//                 right: 15px !important;
//             }
            
//             .eduhub-study-float {
//                 width: 50px !important;
//                 height: 50px !important;
//             }
            
//             #eduHubStudyMenu {
//                 bottom: 75px !important;
//                 right: 15px !important;
//                 min-width: 300px !important;
//                 max-width: calc(100vw - 30px) !important;
//             }
//         }
//     `;

//     // Inject CSS
//     const style = document.createElement('style');
//     style.textContent = css;
//     document.head.appendChild(style);

//     // Create widget HTML
//     const widgetHTML = `
//         <div id="eduHubStudyWidget">
//             <div class="eduhub-study-float" onclick="eduHubToggleMenu()">
//                 <span style="font-size: 1.8rem;">🎯</span>
//             </div>
//         </div>
        
//         <div id="eduHubStudyMenu">
//             <h3 style="margin: 0 0 20px 0; color: #333; text-align: center; font-size: 1.3rem;">🎯 Study Tools Hub</h3>
            
//             <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 15px;">
//                 <button onclick="eduHubShowTimer()" class="eduhub-menu-btn">⏰ Timer</button>
//                 <button onclick="eduHubShowNotes()" class="eduhub-menu-btn" style="background: linear-gradient(135deg, #4ECDC4, #44A08D) !important;">📝 Notes</button>
//                 <button onclick="eduHubShowCalc()" class="eduhub-menu-btn" style="background: linear-gradient(135deg, #FF6B6B, #FF8E53) !important;">🧮 Calculator</button>
//                 <button onclick="eduHubGoToEduHub()" class="eduhub-menu-btn" style="background: linear-gradient(135deg, #A8EDEA, #FED6E3) !important; color: #333 !important;">🎓 EduHub</button>
//             </div>
            
//             <div id="eduHubToolContent" style="min-height: 200px; background: rgba(255,255,255,0.5); border-radius: 12px; padding: 15px;">
//                 <div style="text-align: center; color: #666; padding: 60px 20px;">
//                     🚀 Select a tool above to get started!
//                 </div>
//             </div>
//         </div>
//     `;

//     // Insert widget into page
//     document.body.insertAdjacentHTML('beforeend', widgetHTML);

//     // Widget functionality
//     let timerInterval;
//     let timerSeconds = 1500;
//     let timerRunning = false;

//     window.eduHubToggleMenu = function() {
//         const menu = document.getElementById('eduHubStudyMenu');
//         menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
//     };

//     window.eduHubShowTimer = function() {
//         document.getElementById('eduHubToolContent').innerHTML = `
//             <h4 style="margin: 0 0 15px 0; color: #333; text-align: center;">⏰ Focus Timer</h4>
//             <div id="eduHubTimerDisplay" style="font-size: 2.5rem; text-align: center; font-weight: bold; color: #667eea; margin-bottom: 15px;">25:00</div>
//             <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
//                 <button onclick="eduHubStartTimer()" style="background: #4CAF50; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 600;">▶️ Start</button>
//                 <button onclick="eduHubPauseTimer()" style="background: #FF9800; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 600;">⏸️ Pause</button>
//             </div>
//             <button onclick="eduHubResetTimer()" style="background: #f44336; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; width: 100%; font-weight: 600;">🔄 Reset</button>
//         `;
//         eduHubUpdateTimer();
//     };

//     window.eduHubShowNotes = function() {
//         document.getElementById('eduHubToolContent').innerHTML = `
//             <h4 style="margin: 0 0 15px 0; color: #333; text-align: center;">📝 Quick Notes</h4>
//             <textarea id="eduHubNoteText" placeholder="Write your quick note..." style="width: 100%; height: 120px; border: 1px solid #ddd; border-radius: 8px; padding: 10px; resize: none; margin-bottom: 10px; box-sizing: border-box;"></textarea>
//             <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
//                 <button onclick="eduHubSaveNote()" style="background: #4CAF50; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 600;">💾 Save</button>
//                 <button onclick="eduHubClearNote()" style="background: #f44336; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 600;">🗑️ Clear</button>
//             </div>
//         `;
//     };

//     window.eduHubShowCalc = function() {
//         document.getElementById('eduHubToolContent').innerHTML = `
//             <h4 style="margin: 0 0 15px 0; color: #333; text-align: center;">🧮 Calculator</h4>
//             <input id="eduHubCalcDisplay" type="text" readonly style="width: 100%; padding: 12px; font-size: 1.3rem; text-align: right; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 10px; box-sizing: border-box;">
//             <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;">
//                 <button onclick="eduHubClearCalc()" style="background: #f44336; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">C</button>
//                 <button onclick="eduHubAppendCalc('/')" style="background: #FF9800; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">÷</button>
//                 <button onclick="eduHubAppendCalc('*')" style="background: #FF9800; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">×</button>
//                 <button onclick="eduHubDeleteCalc()" style="background: #f44336; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">⌫</button>
//                 <button onclick="eduHubAppendCalc('7')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">7</button>
//                 <button onclick="eduHubAppendCalc('8')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">8</button>
//                 <button onclick="eduHubAppendCalc('9')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">9</button>
//                 <button onclick="eduHubAppendCalc('-')" style="background: #FF9800; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">-</button>
//                 <button onclick="eduHubAppendCalc('4')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">4</button>
//                 <button onclick="eduHubAppendCalc('5')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">5</button>
//                 <button onclick="eduHubAppendCalc('6')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">6</button>
//                 <button onclick="eduHubAppendCalc('+')" style="background: #FF9800; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">+</button>
//                 <button onclick="eduHubAppendCalc('1')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">1</button>
//                 <button onclick="eduHubAppendCalc('2')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">2</button>
//                 <button onclick="eduHubAppendCalc('3')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">3</button>
//                 <button onclick="eduHubCalculate()" style="background: #4CAF50; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600; grid-row: span 2;">=</button>
//                 <button onclick="eduHubAppendCalc('0')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600; grid-column: span 2;">0</button>
//                 <button onclick="eduHubAppendCalc('.')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">.</button>
//             </div>
//         `;
//     };

//     window.eduHubGoToEduHub = function() {
//         window.open('https://eduhub-main.vercel.app/', '_blank');
//     };

//     // Timer functions
//     window.eduHubUpdateTimer = function() {
//         const minutes = Math.floor(timerSeconds / 60);
//         const seconds = timerSeconds % 60;
//         const display = document.getElementById('eduHubTimerDisplay');
//         if (display) {
//             display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//         }
//     };

//     window.eduHubStartTimer = function() {
//         if (!timerRunning) {
//             timerRunning = true;
//             timerInterval = setInterval(() => {
//                 timerSeconds--;
//                 eduHubUpdateTimer();
//                 if (timerSeconds <= 0) {
//                     eduHubPauseTimer();
//                     alert('⏰ Time\'s up! Great job studying!');
//                     timerSeconds = 1500;
//                     eduHubUpdateTimer();
//                 }
//             }, 1000);
//         }
//     };

//     window.eduHubPauseTimer = function() {
//         timerRunning = false;
//         clearInterval(timerInterval);
//     };

//     window.eduHubResetTimer = function() {
//         eduHubPauseTimer();
//         timerSeconds = 1500;
//         eduHubUpdateTimer();
//     };

//     // Notes functions
//     window.eduHubSaveNote = function() {
//         const noteText = document.getElementById('eduHubNoteText').value;
//         if (noteText.trim()) {
//             const notes = JSON.parse(localStorage.getItem('eduHubNotes') || '[]');
//             notes.unshift({ text: noteText, date: new Date().toLocaleString() });
//             localStorage.setItem('eduHubNotes', JSON.stringify(notes));
//             alert('📝 Note saved!');
//             document.getElementById('eduHubNoteText').value = '';
//         }
//     };

//     window.eduHubClearNote = function() {
//         document.getElementById('eduHubNoteText').value = '';
//     };

//     // Calculator functions
//     window.eduHubAppendCalc = function(value) {
//         document.getElementById('eduHubCalcDisplay').value += value;
//     };

//     window.eduHubClearCalc = function() {
//         document.getElementById('eduHubCalcDisplay').value = '';
//     };

//     window.eduHubDeleteCalc = function() {
//         const display = document.getElementById('eduHubCalcDisplay');
//         display.value = display.value.slice(0, -1);
//     };

//     window.eduHubCalculate = function() {
//         try {
//             const result = eval(document.getElementById('eduHubCalcDisplay').value);
//             document.getElementById('eduHubCalcDisplay').value = result;
//         } catch (error) {
//             document.getElementById('eduHubCalcDisplay').value = 'Error';
//         }
//     };

//     // Hide menu when clicking outside
//     document.addEventListener('click', function(e) {
//         if (!e.target.closest('#eduHubStudyWidget') && !e.target.closest('#eduHubStudyMenu')) {
//             document.getElementById('eduHubStudyMenu').style.display = 'none';
//         }
//     });

// })();
