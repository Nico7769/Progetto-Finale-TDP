let scenarios = []; 
let current = 0;
let score = 0;
let answered = false;


async function loadScenarios() {
    try {
        const response = await fetch('scenarios.json');
        if (!response.ok) throw new Error("Errore nel caricamento del file JSON");
        
        scenarios = await response.json();
        render(); 
    } catch (error) {
        console.error(error);
        document.getElementById('situation').textContent = "Errore nel caricamento delle domande.";
    }
}

function render() {
    if (scenarios.length === 0) return;

    const s = scenarios[current];
    const optionsContainer = document.getElementById('options');
    
    optionsContainer.innerHTML = ''; 
    document.getElementById('counter').textContent = `${current + 1} / ${scenarios.length}`;
    document.getElementById('situation').textContent = s.situation;
    document.getElementById('question').textContent = s.question;
    
    const fb = document.getElementById('feedback');
    fb.style.display = 'none';
    fb.className = 'sc-feedback';
    
    document.getElementById('nextBtn').classList.remove('show');
    answered = false;

    s.options.forEach((o, i) => {
        const btn = document.createElement('button');
        btn.className = 'sc-opt';
        btn.textContent = o.text;
        btn.onclick = () => pick(i);
        optionsContainer.appendChild(btn);
    });
}

function pick(i) {
    if (answered) return;
    answered = true;
    
    const s = scenarios[current];
    const buttons = document.querySelectorAll('.sc-opt');
    const isCorrect = s.options[i].correct;
    
    if (isCorrect) score++;

    buttons.forEach((b, index) => {
        b.disabled = true;
        if (index === i) {
            b.classList.add(isCorrect ? 'correct' : 'wrong');
        } else if (s.options[index].correct) {
            b.classList.add('correct');
        } else {
            b.classList.add('missed');
        }
    });

    const fb = document.getElementById('feedback');
    fb.textContent = s.options[i].feedback;
    fb.style.display = 'block';
    fb.classList.add('show', isCorrect ? 'ok' : 'bad');
    
    document.getElementById('nextBtn').classList.add('show');
}

function next() {
    current++;
    if (current >= scenarios.length) {
        showResult();
    } else {
        render();
    }
}

function showResult() {
    document.getElementById('sc-content').style.display = 'none';
    const resultDiv = document.getElementById('result');
    resultDiv.classList.add('show');
    
    document.getElementById('rScore').textContent = `${score} / ${scenarios.length}`;
    
    const msgs = [
        "Rifletti di più sull'impatto delle tue azioni.",
        "Puoi migliorare! Impegnati di più.",
        "Quasi perfetto! Sei sulla buona strada.",
        "Eccellente! Sei un cittadino digitale consapevole."
    ];
    
   
    let msgIndex = 0;
    if (score === scenarios.length) msgIndex = 3;
    else if (score >= scenarios.length / 2) msgIndex = 2;
    else if (score > 0) msgIndex = 1;

    document.getElementById('rMsg').textContent = msgs[msgIndex];
}

function restart() {
    current = 0; 
    score = 0; 
    answered = false;
    document.getElementById('sc-content').style.display = 'block';
    document.getElementById('result').classList.remove('show');
    render();
}


loadScenarios();