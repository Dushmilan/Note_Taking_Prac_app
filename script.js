// SELECTING ELEMENTS
const noteTitleInput = document.getElementById('noteTitle');
const noteInput = document.getElementById('note');
const notesPanel = document.getElementById('notesPanel');
const addBtn = document.getElementById('addBtn');
const deleteBtn = document.getElementById('deleteBtn');

// ARRAY TO STORE NOTES
let notes = [];

// Add Note Function
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
// Render Notes Function
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
                <button id="viewBtn" class="edit-btn"><i class="fa-solid fa-eye"></i></button>
                <button id="editBtn" class="edit-btn"><i class="fa-solid fa-pencil"></i></button>
                <button id="deleteBtn" class="edit-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        `).join('');
}

// View Note Function
notesPanel.addEventListener('click', (e) => {
    if (e.target.closest('.edit-btn') && e.target.closest('.edit-btn').id === 'viewBtn') {
        const noteTitle = e.target.closest('.note-file').querySelector('h2').textContent;
        const note = notes.find(n => n.titleText === noteTitle);
        if (note) {
            // Show view modal
            const viewModal = document.getElementById('viewModal');
            const viewTitle = document.getElementById('viewTitle');
            const viewNoteContent = document.getElementById('viewNoteContent');
            
            viewTitle.textContent = note.titleText;
            viewNoteContent.textContent = note.noteText;
            viewModal.style.display = 'flex';
        }
    }
});

// Close view modal
document.getElementById('closeViewBtn').addEventListener('click', () => {
    document.getElementById('viewModal').style.display = 'none';
});

// Close view modal when clicking outside
document.getElementById('viewModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('viewModal')) {
        document.getElementById('viewModal').style.display = 'none';
    }
});

// Edit Note Function 
notesPanel.addEventListener('click', (e) => {
    if (e.target.closest('.edit-btn') && e.target.closest('.edit-btn').id === 'editBtn') {
        // Show edit form
        const editForm = document.getElementById('editForm');
        editForm.style.display = 'block';
        
        // Find the note to edit based on the clicked element
        const noteElement = e.target.closest('.note-file');
        const noteTitle = noteElement.querySelector('h2').textContent;
        const note = notes.find(n => n.titleText === noteTitle);
        
        if (note) {
            document.getElementById('editTitle').value = note.titleText;
            document.getElementById('editNote').value = note.noteText;
            
            // Handle form submission
            editForm.onsubmit = function(event) {
                event.preventDefault();
                note.titleText = document.getElementById('editTitle').value;
                note.noteText = document.getElementById('editNote').value;
                renderNotes();
                editForm.style.display = 'none';
            }
        }
    }
});

// Delete Note Function
notesPanel.addEventListener('click', (e) => {
    if (e.target.closest('.edit-btn') && e.target.closest('.edit-btn').id === 'deleteBtn') {
        const noteId = e.target.closest('.note-file').querySelector('h2').textContent;
        notes = notes.filter(note => note.titleText !== noteId);
        renderNotes();
    }
});

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