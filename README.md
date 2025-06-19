# Atlas des ensembles paysagers de Guyane

## Présentation

Ce projet est un site web statique de cartographie interactive présentant les grands ensembles paysagers de la Guyane. Il met en avant des fiches thématiques, des images, des citations, des carrousels et des vidéos pour illustrer la diversité du territoire.

---


## Pour démarrer
`

2. **Lancer en local**
   - Ouvre simplement `index.html` dans ton navigateur
   - Les liens sur la carte, amène sur les pages en lignes (lien githug pages, pour les avoir en local mettre l'adresse en local)
   - Ou utilise un serveur statique (ex : `http-server --port 8000`)

3. **Modifier le contenu**
   - Les textes sont dans les fichiers HTML
   - Les images/vidéos dans `images/`
   - Les styles dans `style.css`

4. **La carte**
Les liens de la carte sont gérésp par genially , il faut accéder au compte génially et les modifier par l'interface
---


## Structure du projet

- **index.html** : page d'accueil avec introduction et carte interactive.
- **A-...html, B-...html, etc.** : pages thématiques pour chaque ensemble paysager.
- **images/** : photos, illustrations, vidéos.
- **motifs/** : motifs SVG pour la décoration et l'identification visuelle.
- **pictos/** : pictogrammes SVG pour l'iconographie.
- **style.css** : feuille de style principale (mise en page, thèmes, animations, carrousels, etc.).
- **script.js** : interactions JS (carrousels, accordéons, etc. si besoin).

---

## Les différents types de cartes (`card`)

Le site utilise une grille de cartes (`.card`) pour présenter les contenus. Voici les principaux types de cartes que tu trouveras dans le code :

### 1. Carte avec **h2** (titre de section)

- Sert à introduire une nouvelle section ou sous-thématique.
- Structure typique :
  ```html
  <div class="card">
    <h2>Le titre de la section</h2> <i>optionnel</i>
  </div>
  ```
- Peut contenir un `<i>` pour un sous-titre ou une localisation, parfois décoré avec un pictogramme (ex : pin).

---

### 2. Carte **quote** (citation)

- Met en avant une ou plusieurs citations, souvent issues de témoignages locaux.
- Structure typique :
  ```html
  <div class="card">
    <p class="quote">"Texte de la citation."</p>
    <!-- Possibilité d'avoir plusieurs <p class="quote"> -->
    <div class="tag">
      <span class="tag-text">Thématique</span>
      <div class="svg-container"></div>
    </div>
  </div>
  ```
- Les citations sont stylisées (italique, animation d'apparition, guillemets décoratifs possibles).

---

### 3. Carte **slider** (carrousel d'images)

- Présente plusieurs images dans un carrousel interactif.
- Structure typique :
  ```html
  <div class="card">
    <div class="slider-container">
      <div class="slider" id="slider1">
        <img src="images/xxx.jpg" alt="Image">
        <img src="images/yyy.jpg" alt="Image">
        <!-- ... -->
      </div>
      <button class="nav prev" ...></button>
      <button class="nav next" ...></button>
      <button class="nav fullscreen" ...></button>
      <div class="dots" id="dots1">
        <span class="dot" ...></span>
        <!-- ... -->
      </div>
    </div>
    <div class="tag">
      <span class="tag-text">Thématique</span>
      <div class="svg-container"></div>
    </div>
  </div>
  ```
- Navigation par flèches, points indicateurs, et mode plein écran.

---

### 4. Carte **image simple**

- Affiche une image unique, souvent avec un tag thématique.
- Structure typique :
  ```html
  <div class="card">
    <img src="images/xxx.jpg" alt="Description">
    <div class="tag">
      <span class="tag-text">Thématique</span>
      <div class="svg-container"></div>
    </div>
  </div>
  ```

---

### 5. Carte **vidéo**

- Intègre une vidéo (souvent au format MP4).
- Structure typique :
  ```html
  <div class="card">
    <video controls>
      <source src="images/xxx.mp4" type="video/mp4">
      Votre navigateur ne supporte pas la balise vidéo.
    </video>
    <div class="tag">
      <span class="tag-text">Thématique</span>
      <div class="svg-container"></div>
    </div>
  </div>
  ```

---

## Fonctionnement général

- Les cartes sont organisées dans des grilles (`.grid`), qui s'adaptent en responsive.
- Chaque carte peut contenir un ou plusieurs éléments : titre, citation, image, slider, vidéo, tag thématique.
- Les tags permettent d'identifier la nature du contenu (bâti, nature, mobilité, etc.) via un texte et une icône SVG.
- Les couleurs et motifs sont personnalisés par thème via des classes CSS (`theme-A`, `theme-B`, etc.).
- Pour les tags il suffit d'ajouter à une div svg container le tag relatif par exemple       <div class="svg-container bati"></div>


---

## Personnalisation

- Pour ajouter une nouvelle carte, duplique une structure existante dans la grille.
- Pour ajouter un nouveau type de contenu, crée une nouvelle variante de `.card` dans le HTML et adapte le CSS si besoin.
- Pour changer les couleurs/motifs, modifie les variables CSS dans les classes de thème.


