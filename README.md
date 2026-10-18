# Carnet Muscu

Carnet de séances de musculation, installable sur téléphone (PWA). Gratuit, sans pub, en français ou en anglais.

- Séries, reps, charges et ressenti par exercice (↗ à augmenter, → bien, ↘ trop dur)
- 54 exercices avec animation du mouvement et consignes techniques
- Programmes modifiables, exercices perso
- Courbes de progression, export CSV / JSON
- Connexion Google ou e-mail (Firebase) : synchro entre appareils, fonctionne hors réseau

☕ Soutenir le projet : https://ko-fi.com/carnetdemuscu

## Contenu du dépôt

| Chemin | Rôle |
|---|---|
| `index.html`, `manifest.webmanifest`, `sw.js`, `icon-*.png` | L'app installable, à servir telle quelle (Netlify, GitHub Pages…) |
| `claude/carnet-muscu.html` | Version qui tourne comme page Claude (synchro avec le compte Claude) |
| `kofi/` | Photo de profil, bannière, image de post et textes de la page Ko-fi |

## Mise en ligne

Netlify : « Add new site › Import from Git », choisir ce dépôt, sans commande de build, dossier de publication `/`.

## Firebase

L'app utilise le projet Firebase existant (`matrice-d-eisenhower-aa8df`). Il faut :

1. Dans les règles Firestore, autoriser chaque compte sur ses propres données :
   ```
   match /muscu/{uid}/{document=**} {
     allow read, write: if request.auth != null && request.auth.uid == uid;
   }
   ```
2. Ajouter le domaine du site dans Authentication › Paramètres › Domaines autorisés.
