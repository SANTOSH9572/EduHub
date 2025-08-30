(function() {
    'use strict';
    
    // Prevent multiple instances
    if (window.eduHubWidgetLoaded) {
        return;
    }
    window.eduHubWidgetLoaded = true;
    
    // Widget variables
    let timerInterval;
    let timerSeconds = 1500; // 25 minutes
    let timerRunning = false;
    
    // Create widget HTML
    const widgetHTML = `
        <div id="eduHubStudyWidget" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
        ">
            <div onclick="eduHubToggleMenu()" style="
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 6px 25px rgba(0,0,0,0.3);
                transition: all 0.3s ease;
                animation: eduHubFloat 3s ease-in-out infinite;
            " onmouseover="this.style.transform='scale(1.15)'; this.style.boxShadow='0 10px 35px rgba(0,0,0,0.4)';" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 6px 25px rgba(0,0,0,0.3)';">
                <span style="font-size: 1.8rem;">🎯</span>
            </div>
        </div>
        
        <div id="eduHubStudyMenu" style="
            display: none;
            position: fixed;
            bottom: 90px;
            right: 20px;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(20px);
            padding: 20px;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 999998;
            min-width: 320px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        ">
            <h3 style="margin: 0 0 20px 0; color: #333; text-align: center; font-size: 1.3rem;">🎯 Study Tools Hub</h3>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 15px;">
                <button onclick="eduHubShowTimer()" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 15px; border-radius: 12px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    ⏰ Timer
                </button>
                <button onclick="eduHubShowNotes()" style="background: linear-gradient(135deg, #4ECDC4, #44A08D); color: white; border: none; padding: 15px; border-radius: 12px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    📝 Notes
                </button>
                <button onclick="eduHubShowCalc()" style="background: linear-gradient(135deg, #FF6B6B, #FF8E53); color: white; border: none; padding: 15px; border-radius: 12px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    🧮 Calculator
                </button>
                <button onclick="eduHubGoToEduHub()" style="background: linear-gradient(135deg, #A8EDEA, #FED6E3); color: #333; border: none; padding: 15px; border-radius: 12px; cursor: pointer; font-size: 0.9rem; font-weight: 600; transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    🎓 EduHub
                </button>
            </div>
            
            <div id="eduHubToolContent" style="min-height: 200px; background: rgba(255,255,255,0.5); border-radius: 12px; padding: 15px;">
                <div style="text-align: center; color: #666; padding: 60px 20px;">
                    🚀 Select a tool above to get started!
                </div>
            </div>
        </div>
    `;
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes eduHubFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @media (max-width: 768px) {
            #eduHubStudyWidget {
                bottom: 15px !important;
                right: 15px !important;
            }
            
            #eduHubStudyWidget > div {
                width: 50px !important;
                height: 50px !important;
            }
            
            #eduHubStudyWidget span {
                font-size: 1.5rem !important;
            }
            
            #eduHubStudyMenu {
                bottom: 75px !important;
                right: 15px !important;
                min-width: 300px !important;
                max-width: calc(100vw - 30px) !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add widget to page
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
    
    // Widget functions
    window.eduHubToggleMenu = function() {
        const menu = document.getElementById('eduHubStudyMenu');
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    };
    
    window.eduHubShowTimer = function() {
        document.getElementById('eduHubToolContent').innerHTML = `
            <h4 style="margin: 0 0 15px 0; color: #333; text-align: center;">⏰ Focus Timer</h4>
            <div id="eduHubTimerDisplay" style="font-size: 2.5rem; text-align: center; font-weight: bold; color: #667eea; margin-bottom: 15px;">25:00</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
                <button onclick="eduHubStartTimer()" style="background: #4CAF50; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 600;">▶️ Start</button>
                <button onclick="eduHubPauseTimer()" style="background: #FF9800; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 600;">⏸️ Pause</button>
            </div>
            <button onclick="eduHubResetTimer()" style="background: #f44336; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; width: 100%; font-weight: 600;">🔄 Reset</button>
        `;
        eduHubUpdateTimer();
    };

    window.eduHubShowNotes = function() {
        document.getElementById('eduHubToolContent').innerHTML = `
            <h4 style="margin: 0 0 15px 0; color: #333; text-align: center;">📝 Quick Notes</h4>
            <textarea id="eduHubNoteText" placeholder="Write your quick note..." style="width: 100%; height: 120px; border: 1px solid #ddd; border-radius: 8px; padding: 10px; resize: none; margin-bottom: 10px; box-sizing: border-box;"></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <button onclick="eduHubSaveNote()" style="background: #4CAF50; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 600;">💾 Save</button>
                <button onclick="eduHubClearNote()" style="background: #f44336; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: 600;">🗑️ Clear</button>
            </div>
        `;
    };

    window.eduHubShowCalc = function() {
        document.getElementById('eduHubToolContent').innerHTML = `
            <h4 style="margin: 0 0 15px 0; color: #333; text-align: center;">🧮 Calculator</h4>
            <input id="eduHubCalcDisplay" type="text" readonly style="width: 100%; padding: 12px; font-size: 1.3rem; text-align: right; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 10px; box-sizing: border-box;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;">
                <button onclick="eduHubClearCalc()" style="background: #f44336; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">C</button>
                <button onclick="eduHubAppendCalc('/')" style="background: #FF9800; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">÷</button>
                <button onclick="eduHubAppendCalc('*')" style="background: #FF9800; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">×</button>
                <button onclick="eduHubDeleteCalc()" style="background: #f44336; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">⌫</button>
                <button onclick="eduHubAppendCalc('7')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">7</button>
                <button onclick="eduHubAppendCalc('8')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">8</button>
                <button onclick="eduHubAppendCalc('9')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">9</button>
                <button onclick="eduHubAppendCalc('-')" style="background: #FF9800; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">-</button>
                <button onclick="eduHubAppendCalc('4')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">4</button>
                <button onclick="eduHubAppendCalc('5')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">5</button>
                <button onclick="eduHubAppendCalc('6')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">6</button>
                <button onclick="eduHubAppendCalc('+')" style="background: #FF9800; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">+</button>
                <button onclick="eduHubAppendCalc('1')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">1</button>
                <button onclick="eduHubAppendCalc('2')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">2</button>
                <button onclick="eduHubAppendCalc('3')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">3</button>
                <button onclick="eduHubCalculate()" style="background: #4CAF50; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600; grid-row: span 2;">=</button>
                <button onclick="eduHubAppendCalc('0')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600; grid-column: span 2;">0</button>
                <button onclick="eduHubAppendCalc('.')" style="background: #667eea; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: 600;">.</button>
            </div>
        `;
    };

    window.eduHubGoToEduHub = function() {
        window.open('https://eduhub-main.vercel.app/', '_blank');
    };

    // Timer functions
    window.eduHubUpdateTimer = function() {
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        const display = document.getElementById('eduHubTimerDisplay');
        if (display) {
            display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    };

    window.eduHubStartTimer = function() {
        if (!timerRunning) {
            timerRunning = true;
            timerInterval = setInterval(() => {
                timerSeconds--;
                eduHubUpdateTimer();
                if (timerSeconds <= 0) {
                    eduHubPauseTimer();
                    alert('⏰ Time\'s up! Great job studying!');
                    timerSeconds = 1500;
                    eduHubUpdateTimer();
                }
            }, 1000);
        }
    };

    window.eduHubPauseTimer = function() {
        timerRunning = false;
        clearInterval(timerInterval);
    };

    window.eduHubResetTimer = function() {
        eduHubPauseTimer();
        timerSeconds = 1500;
        eduHubUpdateTimer();
    };

    // Notes functions
    window.eduHubSaveNote = function() {
        const noteText = document.getElementById('eduHubNoteText').value;
        if (noteText.trim()) {
            const notes = JSON.parse(localStorage.getItem('eduHubNotes') || '[]');
            notes.unshift({ text: noteText, date: new Date().toLocaleString() });
            localStorage.setItem('eduHubNotes', JSON.stringify(notes));
            alert('📝 Note saved!');
            document.getElementById('eduHubNoteText').value = '';
        }
    };

    window.eduHubClearNote = function() {
        document.getElementById('eduHubNoteText').value = '';
    };

    // Calculator functions
    window.eduHubAppendCalc = function(value) {
        document.getElementById('eduHubCalcDisplay').value += value;
    };

    window.eduHubClearCalc = function() {
        document.getElementById('eduHubCalcDisplay').value = '';
    };

    window.eduHubDeleteCalc = function() {
        const display = document.getElementById('eduHubCalcDisplay');
        display.value = display.value.slice(0, -1);
    };

    window.eduHubCalculate = function() {
        try {
            const result = eval(document.getElementById('eduHubCalcDisplay').value);
            document.getElementById('eduHubCalcDisplay').value = result;
        } catch (error) {
            document.getElementById('eduHubCalcDisplay').value = 'Error';
        }
    };

    // Hide menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('#eduHubStudyWidget') && !e.target.closest('#eduHubStudyMenu')) {
            document.getElementById('eduHubStudyMenu').style.display = 'none';
        }
    });

})();