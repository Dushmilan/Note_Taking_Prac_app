// SELECTING ELEMENTS
const noteTitleInput = document.getElementById('noteTitle');
const noteInput = document.getElementById('note');
const notesPanel = document.getElementById('notesPanel');
const addBtn = document.getElementById('addBtn');
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');

// ARRAY TO STORE NOTES
let notes = [];

// FUNCTIONS
function addNote() {
    titleText = noteTitleInput.value.trim();
    noteText = noteInput.value.trim();
    
    if (titleText === "") {
        noteTitleInput.setAttribute('placeholder', 'Please enter a title name!');
        noteTitleInput.style.border = "1px solid rgba(255, 34, 34, 0.28)";
        noteTitleInput.style.background = "rgba(255, 44, 44, 0.08)";
        noteTitleInput.style.boxShadow = "0 0 0 3px rgba(255, 34, 34, 0.2)";
        noteTitleInput.focus();
        return;
    } 

    const noteObj = {
        id: Date.now(),
        titleText: titleText,
        noteText: noteText,
    }

    notes.push(noteObj);
    noteTitleInput.value = "";
    noteInput.value = "";
    renderNotes();
}

function renderNotes() {
    if (notes.length === 0) {
        notesPanel.innerHTML = `
            <p>List is empty</p>
        `;
        return;
    }

    notesPanel.innerHTML = notes.map(note => `
        <div class="note-file">
            <h2>${note.titleText}</h2>
            <div class="button-group">
                <button id="editBtn" class="edit-btn"><i class="fa-solid fa-pencil"></i></button>
                <button id="deleteBtn" class="edit-btn"><i class="fa-solid fa-trash"></i>   </button>
            </div>
        </div>
        `).join('');
}




// Bold Function
const boldBtn = document.getElementById('boldBtn');
boldBtn.addEventListener('click', () => {
  const note = document.getElementById('note');
  note.style.fontWeight = note.style.fontWeight === 'bold' ? 'normal' : 'bold';
});

// Italic Function
const italicBtn = document.getElementById('italicBtn');
italicBtn.addEventListener('click', () => {
  const note = document.getElementById('note');
  note.style.fontStyle = note.style.fontStyle === 'italic' ? 'normal' : 'italic';
});

// Underline Function
const underlineBtn = document.getElementById('underlineBtn');
underlineBtn.addEventListener('click', () => {
  const note = document.getElementById('note');
  note.style.textDecoration = note.style.textDecoration === 'underline' ? 'none' : 'underline';
});


// EVENT LISTENERS
noteTitleInput.focus();

noteTitleInput.addEventListener('click', () => {
    noteTitleInput.setAttribute('placeholder', 'Enter the title...');
    noteTitleInput.style.border = "";
    noteTitleInput.style.background = "";
    noteTitleInput.style.boxShadow = "";
}) 

noteTitleInput.addEventListener('keypress', e => {
    if (e.key === "Enter") {
        noteInput.focus();
    }
});

addBtn.addEventListener('click', addNote);