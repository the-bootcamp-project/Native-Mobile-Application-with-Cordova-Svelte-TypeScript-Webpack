# TypeScript Modules

## Standards

- Classes and Interfaces
- Composition
- Export abstract classes
- Summarize modules in the `./{module}/index.ts`
- Public, private, and protected modifiers

## Browser

### Browser ToDos

- **Tabs**
  - [x] Get Active Tabs per Window
  - [ ] Check is active Tab bookmarked
  - [ ] Get Infos of active Tab if bookmarked
- **Bookmarks**
  - [x] Get List of all Bookmarks and Folder
  - [ ] Check is URL bookmarked
  - [ ] Remove Bookmark DB Entry if Bookmark removed
  - [ ] Remove all Bookmarks recursively if Parrent Folder removed
  - [ ] Update Bookmark DB Entry if Bookmark modified
  - [ ] Update all Bookmarks recursively if Parrent Folder modified
  - [ ] Add Bookmark DB Entry if Bookmark added
  - [ ] Search in Bookmarks, query in URL and Title
  - [ ] Get all Bookmarks of spezific Folder
  - [ ] Get ParentID of Bookmark
  - [ ] Get last modifed Date of Bookmark DB Entry
  - [ ] Get last modifed Date of Parent Folder DB Entry
  - [ ] Get list of Root Folder first level Childfolder
  - [ ] Move Bookmarks and Folder to other location in Browser
- **Window**
  - [ ] Get current Window ID

### Browser References

## Crawler

- **Metadata**
  - [ ] Standard
    - [ ] Categorization
  - [ ] [Open Graph](https://ogp.me/)
  - [ ] [Dublin Core](https://en.wikipedia.org/wiki/Dublin_Core)
  - [ ] [Canonical Link](https://de.wikipedia.org/wiki/Canonical_Link)
  - [ ] [JSON-LD](https://json-ld.org/)
  - [ ] [Microdata](<https://en.wikipedia.org/wiki/Microdata_(HTML)>)
  - [ ] [Microformats](https://microformats.org/)
  - [ ] [Schema.org](https://schema.org/)
  - [ ] [RDFa](https://en.wikipedia.org/wiki/RDFa)

## Logger

- [The Cost of Logging - Matteo Collina, nearForm](https://www.youtube.com/watch?v=Dnx2SPdcDSU)
- [Logging im richtigen Level](https://blog.holisticon.de/2013/07/logging-im-richtigen-level/)
- [Split2(matcher, mapper, options)](https://www.npmjs.com/package/split2)
- [flatstr](https://www.npmjs.com/package/flatstr)
- [fast-safe-stringify](https://www.npmjs.com/package/fast-safe-stringify)
- [quick-format](https://www.npmjs.com/package/quick-format)
- [Logging in JavaScript Best Practices](https://www.youtube.com/watch?v=DIzJC8wRp-s&t=226s)

### Logger Requirements

- audit - Security, heavily changes
- progress - UX, Achievments,
- event - System, Connections
- tracing - Errors, Warning

### Loglevel

- Error - 0
- Warning - 1
- Log - 2
- Info - 3
- Debug - 4

## Storage

- IndexedDB in most browsers,
- WebSQL in older browsers,
- and LevelDB in Node.js.

### Storage ToDos

- [ ] Init DB at first run
- [ ] Create, Read, Update, Delete Bookmarks
- [ ] Compact the database

## System

### System ToDos

- **Runtime**
  - [ ] Get Plattform
  - [ ] Get current Envirement Infos
  - [ ] Get User-Agent
