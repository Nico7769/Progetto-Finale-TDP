const qzData = [
  {"q":"Quale legge italiana del 2017 ha introdotto per la prima volta una definizione legale di cyberbullismo?","opts":["Legge 90/2012","Legge 71/2017","D.Lgs. 231/2001","Legge 92/2019"],"correct":1,"expl":"La Legge 71 del 29 maggio 2017 è la prima legge italiana specificamente dedicata al contrasto del cyberbullismo. Ha introdotto la definizione legale del fenomeno e strumenti di tutela non penali per i minori."},
  {"q":"Il cyberstalking differisce dall'harassment tradizionale principalmente perché...","opts":["Si svolge solo su Instagram","Include comportamenti fisicamente pericolosi e sorveglianza digitale persistente","Riguarda solo gli adulti","È sempre anonimo"],"correct":1,"expl":"Il cyberstalking è una forma grave e reiterata di molestia online che include sorveglianza digitale, tracking della posizione, messaggi ossessivi e può sfociare in comportamenti che mettono a rischio la sicurezza fisica della vittima."},
  {"q":"Cos'è l'outing nel contesto del cyberbullismo?","opts":["Pubblicare foto di luoghi","Escludere qualcuno da un gioco online","Divulgare informazioni private o segreti altrui senza consenso","Creare un profilo falso"],"correct":2,"expl":"L'outing consiste nel rendere pubblica, senza consenso, una informazione privata di un'altra persona, spesso combinato con trickery: ottenere l'informazione con l'inganno per poi divulgarla."},
  {"q":"Quale articolo del Codice Penale introdotto nel 2019 punisce la diffusione non consensuale di immagini sessuali?","opts":["Art. 575","Art. 612-ter","Art. 640","Art. 595"],"correct":1,"expl":"L'art. 612-ter c.p. punisce con reclusione da 1 a 6 anni e multa fino a 15.000€ chi diffonde immagini o video sessualmente espliciti senza il consenso del soggetto."},
  {"q":"Nel modello dei ruoli nel cyberbullismo, chi è l'upstander?","opts":["Il bullo che fa il primo passo","Il testimone che interviene attivamente a difesa della vittima","L'insegnante che fa lezione","Il moderatore della piattaforma"],"correct":1,"expl":"L'upstander è colui che, assistendo a un episodio di cyberbullismo, sceglie di intervenire attivamente: difende la vittima, segnala i contenuti, informa un adulto."},
  {"q":"Entro quante ore deve rispondere un gestore di piattaforma a una richiesta di rimozione contenuti secondo la L. 71/2017?","opts":["12 ore","24 ore","48 ore","72 ore"],"correct":1,"expl":"La L. 71/2017 prevede che le piattaforme digitali abbiano 24 ore per rispondere. Se non lo fanno, si può ricorrere al Garante per la Privacy che ha a sua volta 48 ore per intervenire."},
  {"q":"Quale numero chiamare in Italia per segnalare crimini informatici alla Polizia Postale?","opts":["113","112","800.274.274","114"],"correct":2,"expl":"Il numero gratuito 800.274.274 è la linea dedicata della Polizia Postale per segnalare reati informatici, cyberbullismo e altri crimini digitali."},
  {"q":"Il 'flaming' online è caratterizzato principalmente da...","opts":["Esclusione dai gruppi social","Messaggi aggressivi e offensivi in chat o forum pubblici","Furto di account","Invio di contenuti sessualmente espliciti"],"correct":1,"expl":"Il flaming consiste nell'invio di messaggi violenti, offensivi e provocatori in spazi pubblici online con l'intento di scatenare reazioni e umiliare la vittima."},
  {"q":"La L. 92/2019 sull'educazione civica prevede un minimo di quante ore annue di insegnamento?","opts":["10 ore","20 ore","33 ore","50 ore"],"correct":2,"expl":"La Legge 92/2019 ha reso obbligatoria l'educazione civica prevedendo almeno 33 ore annue di insegnamento trasversale che comprende anche la cittadinanza digitale."},
  {"q":"Quale delle seguenti azioni NON costituisce cyberbullismo secondo la L. 71/2017?","opts":["Denigrazione ripetuta via messaggio","Un litigio unico e non reiterato tra due coetanei online","Diffusione di foto private","Furto di identità digitale"],"correct":1,"expl":"Per configurarsi come cyberbullismo il comportamento deve essere reiterato nel tempo. Un singolo episodio può configurare altri reati ma non cyberbullismo in senso tecnico."}
];

let qzCurrent = 0, qzScore = 0, qzAnswered = false;

function renderQuiz() {
  const s = qzData[qzCurrent];

  document.getElementById('qz-counter').textContent = (qzCurrent + 1) + ' / ' + qzData.length;
  document.getElementById('progressBar').style.width = ((qzCurrent + 1) / qzData.length * 100) + '%';
  document.getElementById('qz-question').textContent = s.q;

  const opts = document.getElementById('qz-options');
  opts.innerHTML = '';
  s.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'qz-opt';
    btn.textContent = o;
    btn.onclick = () => pickQuiz(i);
    opts.appendChild(btn);
  });

  const fb = document.getElementById('qz-feedback');
  fb.className = 'qz-feedback';        
  fb.textContent = '';                 

  document.getElementById('qz-nextBtn').classList.remove('show');
  qzAnswered = false;
}

function pickQuiz(i) {
  if (qzAnswered) return;
  qzAnswered = true;

  const s = qzData[qzCurrent];
  const isCorrect = i === s.correct;
  if (isCorrect) qzScore++;

  document.querySelectorAll('.qz-opt').forEach((b, idx) => {
    b.disabled = true;
    if (idx === i)              b.classList.add(isCorrect ? 'correct' : 'wrong');
    else if (idx === s.correct) b.classList.add('correct');
    else                        b.classList.add('missed');
  });

  const fb = document.getElementById('qz-feedback');
  fb.textContent = (isCorrect ? '✓ Corretto! ' : '✗ Sbagliato! ') + s.expl;
  fb.className = 'qz-feedback show ' + (isCorrect ? 'ok' : 'bad');

  document.getElementById('qz-nextBtn').classList.add('show');
}

function qzNext() {
  qzCurrent++;
  if (qzCurrent >= qzData.length) showQuizResult();
  else renderQuiz();
}

function showQuizResult() {
  document.getElementById('qz-content').style.display = 'none';
  const r = document.getElementById('qz-result');
  r.className = 'qz-result show';
  document.getElementById('qz-rScore').textContent = qzScore + ' / ' + qzData.length;

  const pct = Math.round(qzScore / qzData.length * 100);
  setTimeout(() => { document.getElementById('rBar').style.width = pct + '%'; }, 100);

  const msgs = [
    'Rifletti di più sull\'impatto delle tue azioni.',
    'Puoi migliorare! Continua a studiare.',
    'Quasi perfetto! Sei sulla buona strada.',
    'Eccellente! Sei un cittadino digitale consapevole.'
  ];

  let mi = 0;
  if (qzScore === qzData.length)                       mi = 3;
  else if (qzScore >= Math.ceil(qzData.length * .75))  mi = 2;
  else if (qzScore >= Math.ceil(qzData.length * .5))   mi = 1;

  document.getElementById('qz-rMsg').textContent = msgs[mi];
}

function qzRestart() {
  qzCurrent = 0; qzScore = 0; qzAnswered = false;
  document.getElementById('qz-content').style.display = 'block';
  document.getElementById('qz-result').className = 'qz-result';
  document.getElementById('progressBar').style.width = '0%';
  renderQuiz();
}

renderQuiz();