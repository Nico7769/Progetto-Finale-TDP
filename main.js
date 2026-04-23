const scenarios = [
  {
    situation: "Sei nel gruppo WhatsApp della classe. Un compagno inizia a mandare meme offensivi su Sofia, che non è nel gruppo. Tutti ridono e mandano emoji. Sofia non sa nulla.",
    question: "Cosa è corretto fare?",
    options: [
      { text: "Mandi un emoji di risata per non sembrare antipatico", correct: false, feedback: "Sbagliato. Anche solo un like o un'emoji amplifica il fenomeno e indica approvazione." },
      { text: "Esci silenziosamente dal gruppo senza fare nulla", correct: false, feedback: "Meglio che partecipare, ma non abbastanza. Uscire non ferma il comportamento abusivo." },
      { text: "Scrivi nel gruppo che non è divertente e avvisi Sofia privatamente", correct: true, feedback: "Ottima scelta. Stai usando la tua voce per difendere qualcuno e rompi il silenzio complice." },
      { text: "Fai uno screenshot e lo mandi ad altri amici per mostrare cosa succede", correct: false, feedback: "Peggiora la situazione. Diffondere screenshot aumenta il danno per la vittima." }
    ]
  },
  {
    situation: "Ricevi un messaggio su Instagram da uno sconosciuto che dice di conoscere amici tuoi. Ti chiede una foto e dice che se non la mandi 'ci sono le conseguenze'.",
    question: "Qual è la risposta più sicura?",
    options: [
      { text: "Chiedi chi è per capire se lo conosci davvero", correct: false, feedback: "Rischioso. Gli estorsori usano spesso identità rubate per sembrare credibili." },
      { text: "Non rispondi, blocchi il profilo e lo segnali", correct: true, feedback: "Perfetto. Questa è sextortion. Blocca, segnala e parla subito con un adulto." },
      { text: "Mandi una foto innocua per calmarlo", correct: false, feedback: "Mai farlo. Rispondere alle minacce dimostra che la tattica funziona." },
      { text: "Minacci a tua volta di denunciarlo", correct: false, feedback: "Rispondere ti espone. Meglio il silenzio totale e la segnalazione." }
    ]
  },
  {
    situation: "Il tuo migliore amico Marco vuole creare un profilo Instagram falso con il nome di Giulia per vendicarsi. Ti chiede di aiutarlo.",
    question: "Come rispondi a Marco?",
    options: [
      { text: "Lo aiuti perché è il tuo migliore amico", correct: false, feedback: "Sbagliato. L'amicizia non giustifica un reato come il furto d'identità." },
      { text: "Non lo aiuti ma non dici nulla", correct: false, feedback: "Il silenzio complice ti rende moralmente responsabile del danno." },
      { text: "Gli spieghi che è illegale e potrebbe avere conseguenze penali", correct: true, feedback: "Corretto. Un vero amico evita che l'altro commetta un errore grave." },
      { text: "Denunci subito Marco alla polizia senza parlargli", correct: false, feedback: "Prima di denunciare, tenta sempre di dissuaderlo direttamente." }
    ]
  },
  {
    situation: "Noti che Luca riceve insulti da un gruppo scolastico da cui è stato escluso. Luca ti chiede di non dire niente.",
    question: "Rispetti il desiderio di Luca?",
    options: [
      { text: "Sì, rispetti il segreto. Non è affar tuo.", correct: false, feedback: "Sbagliato. Il silenzio protegge il bullo, non la vittima." },
      { text: "Parli con Luca e gli offri di accompagnarlo da un adulto", correct: true, feedback: "Risposta eccellente. Rispetti la sua dignità ma agisci per aiutarlo." },
      { text: "Vai subito dall'insegnante senza dirlo a Luca", correct: false, feedback: "Agire senza coinvolgere Luca può farlo sentire tradito." },
      { text: "Entri nel gruppo e difendi Luca pubblicamente", correct: false, feedback: "Potrebbe scatenare ulteriori reazioni negative." }
    ]
  },
  {
    situation: "Vedi un video virale in cui si vede un ragazzo della tua scuola in una situazione imbarazzante, ripreso di nascosto.",
    question: "Cosa fai?",
    options: [
      { text: "Lo condividi anche tu perché tanto è già virale", correct: false, feedback: "Sbagliato. Ogni condivisione aumenta il danno." },
      { text: "Lo guardi ma non lo condividi", correct: false, feedback: "Meglio, ma non aiuta la vittima a fermare la diffusione." },
      { text: "Lo segnali sulle piattaforme e avvisi un adulto", correct: true, feedback: "Corretto. La segnalazione massiva accelera la rimozione del video." },
      { text: "Scarichi il video come prova", correct: false, feedback: "Non farlo: detenere video non consensuali può essere illegale." }
    ]
  }
];

let current = 0, score = 0, answered = false;

function render() {
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
    "DIo porco",
    "Bestia mamma di lecce",
    "Nico negro",
    "SImo negrone"
  ];
  
  const msgIndex = score <= 1 ? 0 : score <= 3 ? 1 : score === 4 ? 2 : 3;
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


render();