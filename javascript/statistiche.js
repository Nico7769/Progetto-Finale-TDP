async function caricaDatiVerdi() {
    try {
      
        const risposta = await fetch('cyberbullismo_italia.json');
        const dati = await risposta.json();

       
        document.getElementById('dato-vittime').innerText = dati.statistiche_generali.percentuale_giovani_vittime + "%";
        document.getElementById('dato-denunce').innerText = dati.statistiche_generali.minori_denunciati_totali;
        document.getElementById('dato-chiamate').innerText = dati.statistiche_generali.chiamate_supporto_totali;
        document.getElementById('dato-leggi').innerText = dati.leggi_vigenti.length; 

    } catch (errore) {
        console.error("Errore durante il caricamento dei dati:", errore);
    }
}


caricaDatiVerdi();