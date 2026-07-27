const cardsContainer = document.getElementById('cards');

// ===============================
// PLANNING - AJOUTEZ VOS DATES ICI
// ===============================
// Chaque ligne = un jour de marché.
// - date   : format 'AAAA-MM-JJ'
// - texte2 : première ligne de texte de la carte (ex: nom de la ville)
// - texte3 : deuxième ligne de texte de la carte (ex: lieu précis)
//
// Dès que la date est dépassée, la carte disparaît automatiquement
// du site au changement de jour (minuit) : pas besoin de la supprimer
// à la main. Pour ajouter un nouveau jour, il suffit d'ajouter une
// ligne dans le tableau ci-dessous, à n'importe quel endroit (le
// tri par date se fait automatiquement).
const planning = [
  { date: '2026-07-27', texte2: 'Jard-sur-mer', texte3: 'Place des Ormeaux' },
  { date: '2026-07-28', texte2: 'La Tranche-sur-mer', texte3: 'Centre Ville' },
  { date: '2026-07-29', texte2: 'La Tranche-sur-mer', texte3: 'Parking de la Grière' },
  { date: '2026-07-30', texte2: 'La Faute-sur-mer', texte3: 'Place de la Mairie' },
  { date: '2026-07-31', texte2: 'L\'Aiguillon-sur-mer', texte3: 'Place de la Mairie' },
  { date: '2026-08-01', texte2: 'La Tranche-sur-mer', texte3: 'Centre Ville' },
  { date: '2026-08-02', texte2: 'La Faute-sur-mer', texte3: 'Route de la Pointe d\'Arçay' },
  { date: '2026-08-03', texte2: 'Jard-sur-mer', texte3: 'Place des Ormeaux' },
  { date: '2026-08-04', texte2: 'La Tranche-sur-mer', texte3: 'Centre Ville' },
  { date: '2026-08-05', texte2: 'La Tranche-sur-mer', texte3: 'Parking de la Grière' },
  { date: '2026-08-06', texte2: 'La Faute-sur-mer', texte3: 'Place de la Mairie' },
  { date: '2026-08-07', texte2: 'L\'Aiguillon-sur-mer', texte3: 'Place de la Mairie' },
  { date: '2026-08-08', texte2: 'La Tranche-sur-mer', texte3: 'Centre Ville' },
  { date: '2026-08-09', texte2: 'La Faute-sur-mer', texte3: 'Route de la Pointe d\'Arçay' },
  { date: '2026-08-10', texte2: 'Jard-sur-mer', texte3: 'Place des Ormeaux' },
  { date: '2026-08-11', texte2: 'La Tranche-sur-mer', texte3: 'Centre Ville' },
  { date: '2026-08-12', texte2: 'La Tranche-sur-mer', texte3: 'Parking de la Grière' },
  { date: '2026-08-13', texte2: 'La Faute-sur-mer', texte3: 'Place de la Mairie' },
  { date: '2026-08-14', texte2: 'L\'Aiguillon-sur-mer', texte3: 'Place de la Mairie' },
  { date: '2026-08-15', texte2: 'La Tranche-sur-mer', texte3: 'Centre Ville' },
  { date: '2026-08-16', texte2: 'La Faute-sur-mer', texte3: 'Route de la Pointe d\'Arçay' },
  { date: '2026-08-17', texte2: 'Jard-sur-mer', texte3: 'Place des Ormeaux' },
  { date: '2026-08-18', texte2: 'La Tranche-sur-mer', texte3: 'Centre Ville' },
  { date: '2026-08-19', texte2: 'La Tranche-sur-mer', texte3: 'Parking de la Grière' },
  { date: '2026-08-20', texte2: 'La Faute-sur-mer', texte3: 'Place de la Mairie' },
  { date: '2026-08-21', texte2: 'L\'Aiguillon-sur-mer', texte3: 'Place de la Mairie' },
  { date: '2026-08-22', texte2: 'La Tranche-sur-mer', texte3: 'Centre Ville' },
  { date: '2026-08-23', texte2: 'La Faute-sur-mer', texte3: 'Route de la Pointe d\'Arçay' },
  { date: '2026-08-24', texte2: 'Jard-sur-mer', texte3: 'Place des Ormeaux' },
  { date: '2026-08-25', texte2: 'La Tranche-sur-mer', texte3: 'Centre Ville' },
  

];

// ===============================
// CREATION DES CARTES
// ===============================

// Convertit une chaîne 'AAAA-MM-JJ' en objet Date (heure 00:00 locale)
function parseDate(dateStr) {
  const [annee, mois, jour] = dateStr.split('-').map(Number);
  return new Date(annee, mois - 1, jour);
}

function afficherCartes() {
  cardsContainer.innerHTML = '';

  const maintenant = new Date();
  const debutAujourdHui = new Date(
    maintenant.getFullYear(),
    maintenant.getMonth(),
    maintenant.getDate()
  );

  const evenementsAVenir = planning
    .map((evt) => ({ ...evt, dateObj: parseDate(evt.date) }))
    // On ne garde que les dates non dépassées (aujourd'hui inclus)
    .filter((evt) => evt.dateObj >= debutAujourdHui)
    // Tri chronologique, peu importe l'ordre dans lequel elles ont été ajoutées
    .sort((a, b) => a.dateObj - b.dateObj);

  evenementsAVenir.forEach((evt) => {
    let dateTexte;

    if (evt.dateObj.getTime() === debutAujourdHui.getTime()) {
      dateTexte = "Aujourd'hui";
    } else {
      dateTexte = evt.dateObj.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }

    // Nom du jour (lundi, mardi, ...) avec une majuscule au début
    const jourBrut = evt.dateObj.toLocaleDateString('fr-FR', { weekday: 'long' });
    const jourTexte = jourBrut.charAt(0).toUpperCase() + jourBrut.slice(1);

    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="jour">${jourTexte}</div>
      <div class="date">${dateTexte}</div>
      <div class="text2">${evt.texte2}</div>
      <div class="text3">${evt.texte3}</div>
    `;

    cardsContainer.appendChild(card);
  });
}

// ===============================
// MISE A JOUR A MINUIT
// ===============================

function programmerMiseAJour() {
  const maintenant = new Date();

  const prochainMinuit = new Date(
    maintenant.getFullYear(),
    maintenant.getMonth(),
    maintenant.getDate() + 1,
    0,
    0,
    0
  );

  const tempsRestant = prochainMinuit - maintenant;

  setTimeout(() => {
    afficherCartes();

    // Reprogramme le prochain changement
    programmerMiseAJour();
  }, tempsRestant);
}

// Lancement initial
afficherCartes();
programmerMiseAJour();

// ===============================
// GRAB & DRAG HORIZONTAL AVEC INERTIE
// ===============================

let isDragging = false;
let startX;
let startScrollLeft;
let velocity = 0;
let animationFrame;

cardsContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  cardsContainer.style.cursor = 'grabbing';

  startX = e.pageX;
  startScrollLeft = cardsContainer.scrollLeft;
  velocity = 0;

  // Arrête une inertie précédente
  cancelAnimationFrame(animationFrame);
});

cardsContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  e.preventDefault();

  const distance = e.pageX - startX;
  cardsContainer.scrollLeft = startScrollLeft - distance;

  // mémorise la vitesse
  velocity = -distance;
  startX = e.pageX;
});

window.addEventListener('mouseup', () => {
  if (!isDragging) return;

  isDragging = false;
  cardsContainer.style.cursor = 'grab';

  lancerInertie();
});

// Animation d'inertie
function lancerInertie() {
  function animate() {
    if (Math.abs(velocity) < 0.5) {
      cancelAnimationFrame(animationFrame);
      return;
    }

    cardsContainer.scrollLeft += velocity;

    // ralentissement progressif
    velocity *= 0.95;

    animationFrame = requestAnimationFrame(animate);
  }

  animationFrame = requestAnimationFrame(animate);
}