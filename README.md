# MALware - HTML Bookmaker
*par Martin, Alexandre & Laurie*
> Le projet **HTML Bookmaker** permet de réaliser un document ``.pdf`` imprimable selon des parametres definis par l'utilisateur.

Utilisez l'outil en ligne ici : [http://maous.fr/HTMLbookmaker/](http://maous.fr/HTMLbookmaker/)

## Fonctionnement
Le document source est récupéré par un script ``php`` pour être prévusialisé dans l'outil. Les parametres définis par l'utilisateur sont appliqués directement.

## Utilisation
> Marche mieux sur Google Chrome

* Copier l'url d'une page ``html``
* Cliquer sur [Récuperer le contenu]
* Choisir les options
* Entrer le style CSS
    * ``.page`` pour cibler les pages
    * ``.folio`` pour cibler la pagination
    * ``.cover`` pour cibler les couvertures
    * ``@page`` pour définir le format de la page final (A3 ou A4, portrait ou landscape)
* [ctrl]+[p] ou [ctrl]+[s] pour imprimer le document en ``.pdf``

## Crédits
* Colorisation de syntaxe avec [http://codemirror.net/](http://codemirror.net/)
* Typographies :
    * [Cooper Hewitt](http://www.cooperhewitt.org/open-source-at-cooper-hewitt/cooper-hewitt-the-typeface-by-chester-jenkins/) par Chester Jenkins sous licence [SIL Open Font License](http://scripts.sil.org/cms/scripts/page.php?item_id=OFL-FAQ_web)
    * [Anonymous Pro](http://www.marksimonson.com/fonts/view/anonymous-pro) par Mark Simonson sous licence [SIL Open Font License](http://scripts.sil.org/cms/scripts/page.php?item_id=OFL-FAQ_web)

---

## Work in progress

### Découpage du contenu

### Imposition
* En livret
* Plusieurs pages par planches

### Images
* Dithering
* Filtres CSS
