const cardsContainer = document.getElementById('cards');

const NB_JOURS = 30;

// ===============================
// PERSONNALISATION DES TEXTES
// ===============================
// ATTENTION: ces données mentionnent "La Tranche sur Mer", qui ne
// correspond pas à Meaux (la ville indiquée dans le footer et la
// meta description du site). Il faut remplacer ce planning par les
// vrais marchés/jours/lieux de Meaux avant la mise en ligne.

// Fonction appelée pour chaque jour
// index = nombre de jours depuis aujourd'hui
function getTexts(index) {
  const textes = [
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'La tranche sur mer', texte3: 'Centre Ville' },
    { texte2: 'La tranche sur mer', texte3: 'Parking de la grière' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'La tranche sur mer', texte3: 'Centre Ville' },
    { texte2: 'La tranche sur mer', texte3: 'La terrière' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'La tranche sur mer', texte3: 'Centre Ville' },
    { texte2: 'La tranche sur mer', texte3: 'Parking de la grière' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'La tranche sur mer', texte3: 'Centre Ville' },
    { texte2: 'La tranche sur mer', texte3: 'La terrière' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'La tranche sur mer', texte3: 'Centre Ville' },
    { texte2: 'La tranche sur mer', texte3: 'Parking de la grière' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'La tranche sur mer', texte3: 'Centre Ville' },
    { texte2: 'La tranche sur mer', texte3: 'La terrière' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'La tranche sur mer', texte3: 'Centre Ville' },
    { texte2: 'La tranche sur mer', texte3: 'Parking de la grière' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'Pas de', texte3: 'marché' },
    { texte2: 'La tranche sur mer', texte3: 'Centre Ville' },
  ];

  // Si aucun texte n'est défini pour ce jour, texte par défaut
  return (
    textes[index] || {
      texte2: 'En',
      texte3: 'attente',
    }
  );
}

// ===============================
// CREATION DES CARTES
// ===============================

function afficherCartes() {
  cardsContainer.innerHTML = '';

  const aujourdHui = new Date();

  for (let i = 0; i < NB_JOURS; i++) {
    const date = new Date(aujourdHui);
    date.setDate(aujourdHui.getDate() + i);

    let dateTexte;

    if (i === 0) {
      dateTexte = "Aujourd'hui";
    } else {
      dateTexte = date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }

    const textes = getTexts(i);

    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="date">${dateTexte}</div>
      <div class="text2">${textes.texte2}</div>
      <div class="text3">${textes.texte3}</div>
    `;

    cardsContainer.appendChild(card);
  }
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
