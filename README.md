# Guida
Gli articoli vanno inseriti nella cartella `_posts` e rinominati in questo modo: `Anno(0000)/Mese(00)/Giorno(00)`

```
_posts
    └── 2016-01-10-titolo-dell-articolo.md
    └── 2016-01-15-un-altro-articolo.md
```

La cartella `_drafts` serve a contenere bozze di articoli che verranno pubblicati solo quando spostati in `_posts`.

Nella cartella `immagini` vanno le immagini degli articoli.

## Markdown

Gli articoli vanno scritti in Markdown, file di test semplice con estensione `.md` o `.markdown`.

* [Guida Inglese 🇬🇧](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
* [Guida Italiano 🇮🇹](http://www.maffucci.it/2013/08/29/formattazione-del-testo-con-markdown/)

Ogni file deve iniziare con:

```
---
layout: post
title:  "Titolo"
date:   2015-11-01 12:44:14 +0100
cover:
---
```

e poi il testo dell'articolo.
