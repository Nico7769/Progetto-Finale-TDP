let quizData = [];
let currentIndex = 0;
let userScore = 0;
let isStepAnswered = false;

async function initializeQuiz() {
    try {
        // CAMBIATO QUI: ora punta a quiz.json
       const response = await fetch('quiz.json');
        
        if (!response.ok) {
            throw new Error(`Impossibile trovare quiz.json (Errore ${response.status})`);
        }

        quizData = await response.json();
        console.log("Dati caricati:", quizData);
        setupQuestion(); 
        
    } catch (err) {
        console.error("Errore critico:", err);
        // Mostriamo l'errore a video per capire cosa succede
        document.getElementById('currentTaskTitle').textContent = "Errore nel caricamento del file quiz.json";
        document.getElementById('currentTaskTitle').style.color = "red";
    }
}

function setupQuestion() {
    if (quizData.length === 0) return;

    const currentTask = quizData[currentIndex];
    const choiceGrid = document.getElementById('choiceGrid');
    const infoPanel = document.getElementById('infoPanel');
    
    isStepAnswered = false;
    choiceGrid.innerHTML = '';
    infoPanel.style.display = 'none';
    document.getElementById('actionBtn').style.display = 'none';

    // Sincronizzazione Progresso
    const completionRate = ((currentIndex + 1) / quizData.length) * 100;
    document.getElementById('stepProgress').style.width = `${completionRate}%`;
    document.getElementById('stepIndicator').textContent = `DOMANDA ${currentIndex + 1} DI ${quizData.length}`;
    document.getElementById('currentTaskTitle').textContent = currentTask.q;

    // Creazione bottoni
    currentTask.opts.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = 'sc-opt'; 
        btn.textContent = choice;
        btn.onclick = () => validateChoice(idx);
        choiceGrid.appendChild(btn);
    });
}

function validateChoice(userPick) {
    if (isStepAnswered) return;
    isStepAnswered = true;
    
    const targetTask = quizData[currentIndex];
    const isCorrect = userPick === targetTask.correct;
    
    if (isCorrect) userScore++;

    const allBtns = document.querySelectorAll('.sc-opt');
    allBtns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === targetTask.correct) {
            btn.classList.add('correct'); // Verde nel CSS
        } else if (i === userPick) {
            btn.classList.add('wrong'); // Rosso nel CSS
        }
    });

    const infoPanel = document.getElementById('infoPanel');
    infoPanel.textContent = targetTask.expl;
    infoPanel.style.display = 'block';
    document.getElementById('actionBtn').style.display = 'block';
}

function proceed() {
    currentIndex++;
    if (currentIndex < quizData.length) {
        setupQuestion();
    } else {
        finalizeResults();
    }
}

function finalizeResults() {
    document.getElementById('quiz-board').style.display = 'none';
    const summary = document.getElementById('finalSummary');
    summary.style.display = 'block';
    document.getElementById('finalScoreDisplay').textContent = `${userScore} / ${quizData.length}`;
    document.getElementById('evaluationMsg').textContent = "Test completato con successo!";
}

// Avvio
initializeQuiz();