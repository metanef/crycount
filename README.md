# 💧 CryCount

Application mobile de suivi émotionnel pour enregistrer et visualiser vos pleurs.

## Description

CryCount permet de noter chaque épisode de pleurs avec un horodatage automatique et une note optionnelle. Les larmes s'accumulent progressivement en verres, bouteilles et bidons — une façon ludique de visualiser ses émotions.

**Système de cumul :**
| Unité | Équivalent |
|-------|-----------|
| 💧 1 larme | 1 pleur enregistré |
| 🥛 1 verre | 10 larmes |
| 🍶 1 bouteille | 5 verres (50 larmes) |
| 🛢️ 1 bidon | 5 bouteilles (250 larmes) |

## Structure du projet

```
CryCount/
├── src/
│   ├── components/
│   │   └── CircularProgress.tsx     # Composant progression circulaire
│   ├── pages/
│   │   ├── HomePage.tsx             # Ajout & liste des pleurs
│   │   ├── StatisticsPage.tsx       # Statistiques et cumuls
│   │   └── TrackingPage.tsx         # Suivi calendaire (à venir)
│   └── styles/
│       ├── colors.tsx               # Palette de couleurs
│       ├── styles.tsx               # Styles des composants
│       └── appStyles.tsx            # Styles globaux
├── assets/
│   └── fonts/
│       ├── Glasswater.otf
│       └── Psycho.otf
├── App.tsx                          # Navigation par onglets
└── app.json                         # Configuration Expo
```

## Technologies

| Technologie | Version | Usage |
|-------------|---------|-------|
| React Native | 0.76.5 | Framework mobile |
| Expo | ~52.0.23 | Toolchain |
| React Navigation (tabs) | ^7.2.0 | Navigation |
| expo-file-system | ~18.0.6 | Persistance locale JSON |
| react-native-svg | 15.8.0 | Cercles de progression |
| @expo/vector-icons | ^14.0.2 | Icônes MaterialCommunity |

## Installation

```bash
npm install
npx expo start -c
```

Ouvrir dans Expo Go (iOS/Android) ou un émulateur.

## Fonctionnalités

- [x] Enregistrement d'un pleur avec date/heure automatique
- [x] Note optionnelle par entrée
- [x] Suppression d'une entrée
- [x] Persistance locale (fichier `cries.json`)
- [x] Visualisation circulaire 3 niveaux (larme / verre / bouteille)
- [x] Statistiques par unité
- [x] Navigation par onglets
- [ ] Suivi calendaire
- [ ] Choix manuel de la date
- [ ] Intensité du pleur (petit / moyen / gros)
- [ ] Statistiques avancées (tendances, moyennes)

## Données

Toutes les données sont stockées **localement** dans le répertoire documents de l'application via `expo-file-system`. Aucune donnée n'est envoyée sur un serveur.

Format de stockage (`cries.json`) :
```json
[
  {
    "id": "1746012345678",
    "date": "30/04/2026 14:32",
    "note": "Film trop triste"
  }
]
```

## Palette de couleurs

| Nom | Hex | Usage |
|-----|-----|-------|
| primary | `#6a5acd` | Violet foncé — couleur principale |
| secondary | `#9370db` | Violet moyen — cercle intermédiaire |
| tertiary | `#c49ccf` | Violet clair — cercle externe |
| background | `#f0eef8` | Fond lavande clair |