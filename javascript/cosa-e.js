function toggleAccordion(triggerElement) {
  // Trova l'elemento contenitore principale (l'intero blocco della domanda)
  const currentItem = triggerElement.closest('.accordion-item');
  
  // Controlla se l'elemento cliccato è già aperto
  const isAlreadyActive = currentItem.classList.contains('active');
  
  // (Opzionale) Chiude tutti gli altri accordion aperti per mantenere ordine
  const allItems = document.querySelectorAll('.accordion-item');
  allItems.forEach(item => {
    item.classList.remove('active');
  });

  // Se non era già aperto, lo apre (aggiunge la classe active)
  if (!isAlreadyActive) {
    currentItem.classList.add('active');
  }
}