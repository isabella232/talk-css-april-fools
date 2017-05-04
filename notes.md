# Slides

Titre

Présentation Speaker

Rapide présentation Algolia
SaaS Search
API client dans plein de langage
Speed, Relevance, UX

Histoire du poisson d'avril
expliquer que c'était un poisson d'avril
donner les dates
nombres de vues
troublé les pistes. product hunt, release, mais surtout démo

Démo
instant search
nombre de résultats
highlight
faceting
custom ranking

naissance de l'idée
octobre dernier
idée avec collègues
premier proto (retrouver les gifs?)
ajouter des features au fur et à mesure
améliorer l'algo pour générer moins de CSS
bug sur le nombre max de selecteurs

Comment on fait un truc si compliqué en CSS
Pas de variables, de conditions, de loops, de functions, de regexp
En même temps, CSS est super fort pour ses selecteurs
Il peut selectionner n'importe quoi dans une liste en fonction de ses caracs
Ça corresponds pas mal à la définition d'un moteur de recherche

technique de base
selecteur d'attribut
~ selector
pseudo element content
expliquer les trois individuellement
puis les 3 ensemble

JavaScript
CSS ne rearde que la valeur dans le html
mettre à jour l'input n'update pas
le but était de faire illusion, donc on a menti
une ligne de js
un peu obvious: cette value est égale à cette value
sinon, pas d'update as-you-type

as-you-type
très important, car on est habitué au real-time
si obligé d'appuyer sur enter, semble backward
résultats doivent s'affichr au fur et à mesure

n-grams
besoin de taper tout, pas pratique
on peut trouver les résultats dès les premières lettre
donc générer les n-grams
quand on cherche on veut savoir les résultats qui correspondent à ce qu'on tape
quand on créé le moteur, on veut trouver les suites de lettres qui
corrrespondent à tel élément
ça s'appelle l'indexing

afficher plusieurs résultats
juste mettre un after pas assez, veut en afficher plus
crée plein de divs, leur mets leur data de base mais masqué
display: block seulement si matche
laisse l'empty query, qui doit tout afficher

random order
on est plus de 100, à chaque fois on voit les même dans le haut de page
pas représentatif de qui ont est, et de notre flat hierarchy
donc affichage random des résultats
cherché longtemps comment faire du random en CSS
peut utiliser order: en flexbox pour choisir l'ordre
un peu triché pour ça
peut le faire en SCSS? mais pas vraiment random (XKCD: random number generator)
CSS généré coté serveur random, qui attribut un order random à chacun
donc ordre différent à chaque load
webtask.io pour ça, super Gist + Heroku par Auth0

amélioration de la mise en page
nom, prénom, image et job title
image vient de cloudinary pour avoir noir et blanc, rond et même format
nom et job title sont dans le before avec un saut de ligne
au hover, ajoute un fun fact

plus de searchableAttributes
par défaut chercher seulement sur first name
ajouté last name, et job title
si j'affiche des infos, je dois permettre e rechercher dessus, sinon frustrant
chaque nouvel attribut je dois générer des n-grams pour ça
augmente la taille du fichier

quelques feintes
noms composés et lettres accentuées
besoin de trouver avec ou sans l'accent
besoin de trouver RCS sur Remy ou Christophe
générer des n-grams pour ça

highlight
peut trouver dans plein de choses
parfois dur de voir pourquoi une personne est affichée
besoin de highlight
montrer l'exemple de google
doit etre visible, mais pas trop
doit permettre de comprendre pourquoi un résultat est là, mais doit voir le
résultat en premier

generated content, donc peut pas utiliser de css dessus
utilise donc une font custom, qui est le merge d'une font de base et d'une bold
mise dans le private-use area
example du code du before
ces characteres sont des versions bold

ordre d'affichage
maintenant on voit tout ce qui s'affiche
on comprends pourquoi tel résultat est là
mais on se demande pourquoi il est avant un autre
l'ordre est random parce que j'affiche tout en random
je doit classer par ordre de pertinence
first name > last name > job title
poids sur les attributs, d'abord ceux du first name, puis ceux du last name (ex:
Kim)

même nom
mais plusieurs personnes s'appellent Alex, ou Nicolas
Comment les ranger?
On utilise un custom ranking, des données métiers
Masquées à l'utilisateur, mais utilisée dans le ranking
peut etre un score de popularité si c'était des chanteurs
là, c'est juste la date d'arrivée. Les premiers employés sont avant les plus
récents

Tie-Breaking
fonctionne selon un principe de buckets
"Ch"
d'abord les matches dans le first name, puis last name, puis job
dans chaque bucket, rangé par ordre d'arrivée
API prends en comte plus de uckets, ainsi que le nombre de typos

typos
certaines personnes ont des noms compliqués
on va faire des fautes, on ne sait pas comment ça s'écrit
gros doigts sur mobile
important d'etre tolerent à la faute de frappe
shermesser? schermeser?
générer de nouveaux n-grams pour les fautes
techniquement une faute se calcule avec la distance de levenshtein
nombre d'ajout, suppression, permutations pour arriver au mot
peut se générer, mais ferait un fichier CSS bien trop gros
me suis limité à un seul type de faute
où on enlever une lettre
et bien sur celui que j'utilise dans la démo
garde le highlight

synonyms
en vrai personne appelle Rémy-Christophe comme ça
on utilise RCS
on a l'habitude de se voir sur github, par login
donc ajout de synonymes
ajouter un nouveau n-gram à un résultat
mais pour pas perturber l'utilisateur, surligner celui-là

facets
chaque eployé fait parti d'une team
12 divs vides avec ids uniques
contenu rempli avec CSS comme pour les résultats
affichés/masqués en fonction de la query tapée
nombre de résultats mis à jour aussi

choisir facet
radio hack
chaque facet est un label, lié à un bouton radio en haut de la page
quand clique sur label, selectionne radio
selon la facet selectionnée, permet de définir un état global à la page
avec checked + next element
dans ce cas, je masque tous les résultats qui ne sont PAS de la facet
selectionnée

changer de facet
parce que radio, peut cliquer sur n autre et seulement un est selectionné à la
fois, change l'affichage
parce que utilise des order flexbox, il y a des trous dans le display, mais
quand même dans le bon ordre
par contre, doit pouvoir unselect une facet et pas possible d'unselect un radio
pour ça, jtuilisé un 13e element
quand je clique sur un label, il se masque, et je mets ce label en plus à la
place (même nom, même count)
quand je clique dessus, c'est comme si je selectionnais un label nutile, donc
désélectionne tout
utiliser flexbox order pour le mettre où il faut


conclusion
ne l'utilisez pas en production
taille du fichier CSS grossit trop, trop vite
peut pas gérer correctement toutes les typos
permet de comprendre comment le moteur marche
bien plus puissant par l'API
plein de edge case pas gérés par mon implementation
peut pas savoir que impossible tant que pas essayé







Slow
Au début, sélecteurs "malins" avec nth-child
hyper lent
pas de classes dans le HTML, juste des selecteurs en fonction du placement dans
la page
je voulais faire mon malin et rendre le code "magique"
mais hyper lent
on avait un lag en tapant
remplacé par des ids, extremement rapide
