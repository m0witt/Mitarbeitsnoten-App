// Neue Version sofort beim Öffnen laden statt erst beim nächsten Mal: Ist kurz nach dem Start
// (oder nach mehr als 10 Minuten im Hintergrund, dann ist die App ohnehin gesperrt) eine neue
// Version heruntergeladen, lädt die Seite einmal neu. Mitten in einer Eingabe passiert das nie.
if ('serviceWorker' in navigator) window.addEventListener('load', () => {
  const hatte = !!navigator.serviceWorker.controller;
  let frisch = Date.now();
  let weg = 0;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hatte && Date.now() - frisch < 20000) location.reload();
  });
  navigator.serviceWorker.register('./sw.js').then((reg) => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') weg = Date.now();
      else if (weg && Date.now() - weg > 600000) { frisch = Date.now(); reg.update(); }
    });
  });
});
