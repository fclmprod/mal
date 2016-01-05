# MALware - HTML Bookmaker
*par Martin, Alexandre & Laurie*
> Le projet **HTML Bookmaker** permet de réaliser un document ``.pdf`` imprimable selon des parametres definis par l'utilisateur.

### Source
* Lien a convertir

### Images

### Style
Afin d'offrir un contrôle maximum sur l'objet final, nous avons décider de laisser l'utilisateur entrer directement du code CSS

### Pagination
#### Les compteurs en CSS
La réponse immediate aurait été celle d'utiliser un propriété native de CSS 2.1 comprise par tous les navigateurs. Cependant lorsque le DOM est modifié les compteurs se réactualisent, rendant l'étape d'imposition impossible.

```
body {
  counter-reset: section;
}
.folio::after {
  counter-increment: section;
  content: "Page" counter(section);
}
```
#### Pagination en Jquery
*Contrairement à la méthode choisie par le site *gutemberg.org*il est important que la pagniation se trouve en dehors

### Imposition

## Interface Utilisateur
