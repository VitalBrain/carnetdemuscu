# Carnet Muscu

Carnet de séances de musculation, installable sur téléphone (PWA). Gratuit, sans pub, en français ou en anglais.

- Séries, reps, charges et ressenti par exercice (↗ à augmenter, → bien, ↘ trop dur)
- 54 exercices avec animation du mouvement et consignes techniques
- Programmes modifiables, exercices perso
- Courbes de progression, export CSV / JSON
- Connexion Google ou e-mail (Firebase) : synchro entre appareils, fonctionne hors réseau
- Coach IA (onglet Coach) : analyse les séances et conseille charges, reps et repos. Dans l'app installée, chaque utilisateur choisit son fournisseur et met sa propre clé (Google Gemini ou OpenRouter : gratuits ; Anthropic : payant). La clé reste dans le navigateur. Dans la version Claude, le coach passe par le compte Claude, sans clé.

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
