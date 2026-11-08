# Manifeste du Génie d’Orchestration · LN-IA

## Édition visuelle V3 — 8 novembre 2026

Les sept affiches utilisent un fond futuriste bleu nuit, cyan et or avec des schémas pédagogiques. Le portrait de l’auteur est retiré des affiches et conservé dans les espaces auteur du site. Chaque affiche propose le téléchargement de sa capsule bilingue. Le film `presentation-v3.mp4` assemble les sept capsules (97,2 secondes), avec les voix et les sous-titres de la V2.

Le script `scripts/produire-v3.py` recompose les médias depuis le pack de production parent : affiches PNG dans `assets/images/`, pistes WAV et montage dans `video/version-amelioree/`, dépendances Python dans `video/outils/`. Ce script nécessite Pillow ; il n’est pas lancé par la compilation Vite ou GitHub Pages.

Minisite Vite en français et en arabe : film de présentation, sept affiches avec descriptions et aperçu agrandi, méthode LN-IA et présentation de l’auteur M. Abderrahman EL HISSE.

## Développement

```sh
npm ci
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Le dossier produit est `dist/`. Le chemin de base GitHub Pages est configuré dans `vite.config.js`. La publication est automatisée par `.github/workflows/deploy.yml` à chaque push sur `main`.

## Médias et narration

Les médias sont locaux dans `public/media/`. Le film V2 conserve le rythme arabe et ralentit la narration française de 15 % par rapport à la première version, sans changer la hauteur de voix. Les sous-titres WebVTT sont disponibles dans le lecteur. La vidéo ne démarre avec le son qu’après une action du visiteur.

La police Cairo est incluse localement, avec sa licence. Aucun service de suivi, formulaire de collecte ou ressource typographique distante.

Le projet de livre est en cours. Le plan en cinq parties et vingt-cinq chapitres ne signifie pas que l’ensemble du manuscrit est achevé.

## Droits

Les textes, affiches, couverture, logo et portrait sont utilisés pour la présentation du projet de l’auteur. Tous droits réservés à leurs titulaires. Le dépôt ne contient pas le manuscrit du livre et n’accorde pas de licence de réutilisation des médias.
