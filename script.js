// SELECTING ELEMENTS
const noteTitleInput = document.getElementById('noteTitle');
const noteInput = document.getElementById('note');
const notesPanel = document.getElementById('notesPanel');
const addBtn = document.getElementById('addBtn');
const deleteBtn = document.getElementById('deleteBtn');

// ARRAY TO STORE NOTES
let notes = [];
let lastNoteCount = 0;

// ==========================================Note Functionalities==========================================
// Add Note Function
function addNote() {
    titleText = noteTitleInput.value.trim();
    noteText = noteInput.textContent.trim();
    
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
    noteInput.textContent = "";
    renderNotes(true);
}

// Render Notes Function
function renderNotes(isNewNote = false) {
    if (notes.length === 0) {
        notesPanel.innerHTML = `
            <p>List is empty</p>
        `;
        lastNoteCount = 0;
        return;
    }

    notesPanel.innerHTML = notes.map((note, index) => {
        const isNewlyAdded = isNewNote && index === notes.length - 1;
        const animationClass = isNewlyAdded ? ' adding' : '';
        
        return `
            <div class="note-file${animationClass}" data-note-id="${note.id}">
                <h2>${note.titleText}</h2>
                <div class="button-group">
                    <button id="viewBtn" class="edit-btn"><i class="fa-solid fa-eye"></i></button>
                    <button id="editBtn" class="edit-btn"><i class="fa-solid fa-pencil"></i></button>
                    <button id="deleteBtn" class="edit-btn"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    }).join('');
    
    // Remove animation class after animation completes
    if (isNewNote) {
        setTimeout(() => {
            const newNoteElement = notesPanel.querySelector('.note-file.adding');
            if (newNoteElement) {
                newNoteElement.classList.remove('adding');
            }
        }, 400);
    }
    
    lastNoteCount = notes.length;
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

// Function to close view modal with animation
function closeViewModal() {
    const viewModal = document.getElementById('viewModal');
    const viewContent = viewModal.querySelector('.view-content');
    
    // Add closing animations
    viewModal.style.animation = 'fadeOut 0.3s ease-out forwards';
    viewContent.style.animation = 'slideOutScale 0.3s ease-out forwards';
    
    // Hide modal after animation completes
    setTimeout(() => {
        viewModal.style.display = 'none';
        // Reset animations for next time
        viewModal.style.animation = '';
        viewContent.style.animation = '';
    }, 300);
}

// Close view modal
document.getElementById('closeViewBtn').addEventListener('click', closeViewModal);

// Close view modal when clicking outside
document.getElementById('viewModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('viewModal')) {
        closeViewModal();
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
                closeEditForm();
            }
        }
    }
});

// Function to close edit form with animation
function closeEditForm() {
    const editForm = document.getElementById('editForm');
    
    // Add closing animation
    editForm.style.animation = 'fadeOutScale 0.3s ease-out forwards';
    
    // Hide form after animation completes
    setTimeout(() => {
        editForm.style.display = 'none';
        // Reset animation for next time
        editForm.style.animation = '';
    }, 300);
}

// Cancel button event listener
document.getElementById('cancelEditBtn').addEventListener('click', closeEditForm);

// Delete Note Function
notesPanel.addEventListener('click', (e) => {
    if (e.target.closest('.edit-btn') && e.target.closest('.edit-btn').id === 'deleteBtn') {
        const noteElement = e.target.closest('.note-file');
        const noteId = noteElement.getAttribute('data-note-id');
        
        // Add removing animation class
        noteElement.classList.add('removing');
        
        // Remove note from array and re-render after animation
        setTimeout(() => {
            notes = notes.filter(note => note.id != noteId);
            renderNotes(false);
        }, 300);
    }
});

// ========================== Styling functionalities =========================
// Make Bold Function
function makeBold() {
    const selection = window.getSelection();
  
    if (!selection.rangeCount || selection.isCollapsed) return;
  
    const range = selection.getRangeAt(0);

    // Get the parent element of the selection
    const parent = selection.anchorNode.parentElement;

    // Wrap selection in a <strong> element
    if (parent && parent.tagName === "STRONG") {
        const strong = parent;
        const fragment = document.createDocumentFragment();

        while (strong.firstChild) {
            fragment.appendChild(strong.firstChild);
        }

        strong.replaceWith(fragment);
    } else {
        const strong = document.createElement("strong");
        range.surroundContents(strong);
    }
  
    // Clear selection
    selection.removeAllRanges();
    selection.addRange(range);
}

// Make Italic Function
function makeItalic() {
    const selection = window.getSelection();

    if (!selection.rangeCount || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);

    // Get the parent element of the selection
    const parent = selection.anchorNode.parentElement;

    // Wrap selection in a <em> element
    if (parent && parent.tagName === "EM") {
        const em = parent;
        const fragment = document.createDocumentFragment();

        while (em.firstChild) {
            fragment.appendChild(em.firstChild);
        }

        em.replaceWith(fragment);
    } else {
        const em = document.createElement("em");
        range.surroundContents(em);
    }

    // Clear selection
    selection.removeAllRanges();
    selection.addRange(range);
}

// Make Underline Function
function makeUnderline() {
    const selection = window.getSelection();
  
    if (!selection.rangeCount || selection.isCollapsed) return;
  
    const range = selection.getRangeAt(0);

    // Get the parent element of the selection
    const parent = selection.anchorNode.parentElement;

    // Wrap selection in a <strong> element
    if (parent && parent.tagName === "U") {
        const u = parent;
        const fragment = document.createDocumentFragment();

        while (u.firstChild) {
            fragment.appendChild(u.firstChild);
        }

        u.replaceWith(fragment);
    } else {
        const u = document.createElement("u");
        range.surroundContents(u);
    }
  
    // Clear selection
    selection.removeAllRanges();
    selection.addRange(range);
}

// =============== Event listeners for adding notes and focusing inputs ===============
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