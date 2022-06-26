let noteTitles = [];
let noteTexts = [];

let archiveNoteTitles = [];
let archiveNoteTexts = [];

let deletedNoteTitles = [];
let deletedNoteTexts = [];

function onload() {
    deletedNotesSection();
    binRender();
    archiveNoteSection();
    archiveRender();
    loadNotes();
    noteRender();
}


/////NOTES SECTION/////

//Function for load saved notes in the notes section
function loadNotes() {
    noteTitles = getArray('noteTitles');
    noteTexts = getArray('noteTexts');
    if (!noteTitles || !noteTexts) { 
        noteTitles = [];
        noteTexts = [];
    }
    document.getElementById('myNotes').innerHTML = noteRender();
}

//Function for adding notes to the notes section
function addNote() {
    let title = document.getElementById('noteTitle').value;
    let text = document.getElementById('noteText').value;
    if(text.length == 0 || title.length == 0){
        alert('Bitte alle Felder ausfüllen')
    }else {    
        noteTitles.push(title);
        noteTexts.push(text);
        addingNotes();
        noteRender();
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteText').value = '';
    }
}

//Function for delete notes in the notes section
function deleteNote(i) {
    let title = noteTitles[i];
    let text = noteTexts[i]
    deletedNoteTitles.push(title);
    deletedNoteTexts.push(text);
    noteTitles.splice(i, 1);
    noteTexts.splice(i, 1);
    moveToBin();
    addingNotes();
    loadNotes();
    noteRender();
}


/////ARCHIVE SECTION/////

//Function for return archived notes to the notes section
function returnArchiveNote(i){
    noteTitles.push(archiveNoteTitles[i]);
    noteTexts.push(archiveNoteTexts[i]);
    archiveNoteTitles.splice(i, 1);
    archiveNoteTexts.splice(i, 1);
    archiveRender();
    moveToArchive();
    addingNotes();
    }

//Function for deleting archived notes in the archive section
function deleteArchiveNote(i) {
    let title = archiveNoteTitles[i];
    let text = archiveNoteTexts[i]
    deletedNoteTitles.push(title);
    deletedNoteTexts.push(text);
    archiveNoteTitles.splice(i, 1);
    archiveNoteTexts.splice(i, 1);
    moveToBin();
    moveToArchive();
    archiveRender();
}

//Function for archive notes in the notes section
function archiveNotes(i){
    let title = noteTitles[i];
    let text = noteTexts[i];
    archiveNoteTitles.push(title);
    archiveNoteTexts.push(text);
    noteTitles.splice(i, 1);
    noteTexts.splice(i, 1);
    moveToArchive();
    addingNotes();
    loadNotes();
    noteRender();
}

//Function for load archvied notes in the archive section
function archiveNoteSection(){
    archiveSection();
    if (!archiveNoteTitles || !archiveNoteTexts) { 
        archiveNoteTitles = [];
        archiveNoteTexts = [];
    }
}


/////BIN SECTION/////

//Function for return deleted notes to the notes section
function returnDeletedNote(i){
    noteTitles.push(deletedNoteTitles[i]);
    noteTexts.push(deletedNoteTexts[i]);
    deletedNoteTitles.splice(i, 1);
    deletedNoteTexts.splice(i, 1);
    binRender();
    deleteBinArray();
    addingNotes();
}

//Function for load deleted notes in the bin section
function deletedNotesSection(){
    binSection();
    if (!deletedNoteTitles || !deletedNoteTexts) { 
        deletedNoteTitles = [];
        deletedNoteTexts = [];
    }
}

//Function for delete notes permanently in the bin section
function deleteNotePermanently(i){
    deletedNoteTitles.splice(i, 1);
    deletedNoteTexts.splice(i, 1);
    binRender();
    deleteBinArray();
}


/////TEMPLATES/////

//Save Array function
function setArray(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

//Load Array function
function getArray(key) {
    return JSON.parse(localStorage.getItem(key));
}

//Function for adding notes
function addingNotes(){
    setArray('noteTitles', noteTitles);
    setArray('noteTexts', noteTexts);
}

//Function for move Array data from note section to archive section
function moveToArchive(){
    setArray('archiveNoteTitles', archiveNoteTitles);
    setArray('archiveNoteTexts', archiveNoteTexts);
}

//Function for load arrays in archive section
function archiveSection() {
    archiveNoteTitles = getArray('archiveNoteTitles');
    archiveNoteTexts = getArray('archiveNoteTexts');
}

//Function for deleting notes
function moveToBin(){
    setArray('deletedNoteTitles',deletedNoteTitles);
    setArray('deletedNoteTexts', deletedNoteTexts);
}

//Function for loading notes in the bin section
function binSection(){
    deletedNoteTitles = getArray('deletedNoteTitles');
    deletedNoteTexts = getArray('deletedNoteTexts');
}

//Function for delete Array permanently in the bin section
function deleteBinArray(){
    setArray('deletedNoteTitles', deletedNoteTitles);
    setArray('deletedNoteTexts', deletedNoteTexts);
}


/////CSS TEMPLATES/////

//Function for adding CSS-Class only to the note section button
function noteSectionButton(){
    document.getElementById('deleteButton').classList.remove('delete-button');
    document.getElementById('archiveButton').classList.remove('archive-button');
    document.getElementById('noteButton').classList.add('note-button');
    document.getElementById('noteIconBlack').src="img/note-black.png";
    document.getElementById('archiveIconBlack').src="img/archiv-white.png";
    document.getElementById('binIconBlack').src="img/trash-white.png";
}

//Function for adding CSS-Class only to the archive section button
function archiveSectionButton(){
    document.getElementById('noteButton').classList.remove('note-button');
    document.getElementById('deleteButton').classList.remove('delete-button');
    document.getElementById('archiveButton').classList.add('archive-button');
    document.getElementById('noteIconBlack').src="img/note-white.png";
    document.getElementById('binIconBlack').src="img/trash-white.png";
    document.getElementById('archiveIconBlack').src="img/archiv-black.png";
}

//Function for adding CSS-Class only to the bin section button
function binSectionButton(){
    document.getElementById('noteButton').classList.remove('note-button');
    document.getElementById('archiveButton').classList.remove('archive-button');
    document.getElementById('deleteButton').classList.add('delete-button');
    document.getElementById('noteIconBlack').src="img/note-white.png";
    document.getElementById('archiveIconBlack').src="img/archiv-white.png";
    document.getElementById('binIconBlack').src="img/trash-black.png";
}


/////ADDING NOTES FOR DIFFERENT SECTION/////

//Function for creating notes
function noteRender() {
    let myNotes = document.getElementById('myNotes');
    myNotes.innerHTML = '';
    for (let i = 0; i < noteTitles.length; i++) {
        myNotes.innerHTML += /*html*/ `
        <div class="post">
            <p class="added-note-title">${noteTitles[i]}</p><br>
            <p class="added-note-textarea">${noteTexts[i]}</p>
                <div class="sections-buttons">
                    <button onclick="archiveNotes(${i})" class="section-button"><img src="img/archiv-black.png"></button>
                    <button onclick="deleteNote(${i})" class="section-button"><img src="img/trash-black.png"></button>
                </div>
        </div>`;
            
    }
    noteSectionButton();
}

//Function for showing archived notes
function archiveRender(){
    let myNotes = document.getElementById('myNotes');
    myNotes.innerHTML = '';
    for (let i = 0; i < archiveNoteTitles.length; i++) {
        myNotes.innerHTML += /*html*/ `
        <div class="post">
            <p class="added-note-title">${archiveNoteTitles[i]}</p><br>
            <p class="added-note-textarea">${archiveNoteTexts[i]}</p>
                <div class="sections-buttons">
                    <button onclick="returnArchiveNote(${i})" class="section-button"><img src="img/back-black.png"></button>
                    <button onclick="deleteArchiveNote(${i})" class="section-button"><img src="img/trash-black.png"></button>
                </div>
        </div>`;
    }
    archiveSectionButton();
}

//Function for showing deleted notes
function binRender(){
    let myNotes = document.getElementById('myNotes');
    myNotes.innerHTML = '';
    for (let i = 0; i < deletedNoteTitles.length; i++) {
        myNotes.innerHTML += /*html*/ `
        <div class="post">
            <p class="added-note-title">${deletedNoteTitles[i]}</p><br>
            <p class="added-note-textarea">${deletedNoteTexts[i]}</p>
            <div class="sections-buttons">
                <button onclick="returnDeletedNote(${i})" class="section-button"><img src="img/back-black.png"></button>
                <button onclick="deleteNotePermanently(${i})" class="section-button"><img src="img/trash-black.png"></button>
            </div>
        </div>`;
    }
    binSectionButton();
}

