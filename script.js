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

// ============================TEXT SELECTION AND FORMATTING FUNCTIONALITY=============================
// Floating Toolbar Elements
const formatToolbar = document.getElementById('formatToolbar');
const noteTextarea = document.getElementById('note');
let currentSelection = null;

// Function to get selection info
function getSelectionInfo() {
    const start = noteTextarea.selectionStart;
    const end = noteTextarea.selectionEnd;
    const selectedText = noteTextarea.value.substring(start, end);
    
    return {
        start: start,
        end: end,
        text: selectedText,
        hasSelection: selectedText.length > 0
    };
}

// Function to position toolbar near selection
function positionToolbar() {
    const rect = noteTextarea.getBoundingClientRect();
    const selection = getSelectionInfo();
    
    if (selection.hasSelection) {
        // Calculate approximate position based on cursor
        const left = rect.left + 20; // Offset from left edge
        const top = rect.top - 50; // Position above textarea
        
        formatToolbar.style.left = `${left}px`;
        formatToolbar.style.top = `${top}px`;
        formatToolbar.style.display = 'flex';
        
        // Update button states based on current formatting
        updateButtonStates();
    } else {
        formatToolbar.style.display = 'none';
    }
}

// Store formatting states for text ranges
let textFormatting = {
    bold: new Set(),
    italic: new Set(),
    underline: new Set()
};

// Function to update button states
function updateButtonStates() {
    const selection = getSelectionInfo();
    if (!selection.hasSelection) return;
    
    // Check if any part of selection has formatting
    const hasBold = hasFormattingInRange(selection.start, selection.end, 'bold');
    const hasItalic = hasFormattingInRange(selection.start, selection.end, 'italic');
    const hasUnderline = hasFormattingInRange(selection.start, selection.end, 'underline');
    
    document.getElementById('floatBoldBtn').classList.toggle('active', hasBold);
    document.getElementById('floatItalicBtn').classList.toggle('active', hasItalic);
    document.getElementById('floatUnderlineBtn').classList.toggle('active', hasUnderline);
}

// Function to check if range has formatting
function hasFormattingInRange(start, end, type) {
    const ranges = textFormatting[type];
    for (let range of ranges) {
        if (range.start <= start && range.end >= end) {
            return true;
        }
    }
    return false;
}

// Function to apply CSS styling to textarea selection
function applyFormatting(tag) {
    const selection = getSelectionInfo();
    if (!selection.hasSelection) return;
    
    // Store the formatting range
    const formatRange = {
        start: selection.start,
        end: selection.end,
        text: selection.text
    };
    
    // Toggle formatting
    const hasFormatting = hasFormattingInRange(selection.start, selection.end, tag);
    
    if (hasFormatting) {
        // Remove formatting
        removeFormattingFromRange(selection.start, selection.end, tag);
    } else {
        // Add formatting
        textFormatting[tag].add(formatRange);
    }
    
    // Apply visual styling to textarea
    applyTextareaStyles();
    
    // Restore selection
    noteTextarea.setSelectionRange(selection.start, selection.end);
    noteTextarea.focus();
    
    // Update toolbar
    updateButtonStates();
}

// Function to remove formatting from range
function removeFormattingFromRange(start, end, type) {
    const ranges = textFormatting[type];
    const rangesToRemove = [];
    
    for (let range of ranges) {
        if (range.start <= end && range.end >= start) {
            rangesToRemove.push(range);
        }
    }
    
    rangesToRemove.forEach(range => ranges.delete(range));
}

// Function to apply styles to textarea based on formatting state
function applyTextareaStyles() {
    const styles = [];
    
    // Check what formatting is active for the current selection or cursor position
    const selection = getSelectionInfo();
    const position = selection.hasSelection ? selection.start : noteTextarea.selectionStart;
    
    // Apply styles based on active formatting
    if (hasFormattingAtPosition(position, 'bold')) {
        styles.push('font-weight: bold');
    } else {
        styles.push('font-weight: normal');
    }
    
    if (hasFormattingAtPosition(position, 'italic')) {
        styles.push('font-style: italic');
    } else {
        styles.push('font-style: normal');
    }
    
    if (hasFormattingAtPosition(position, 'underline')) {
        styles.push('text-decoration: underline');
    } else {
        styles.push('text-decoration: none');
    }
    
    // Apply combined styles
    const styleString = styles.join('; ');
    noteTextarea.style.cssText += '; ' + styleString;
}

// Function to check if position has specific formatting
function hasFormattingAtPosition(position, type) {
    const ranges = textFormatting[type];
    for (let range of ranges) {
        if (position >= range.start && position <= range.end) {
            return true;
        }
    }
    return false;
}

// Function to update formatting ranges when text is modified
function updateFormattingRangesOnInput() {
    
    const selection = getSelectionInfo();
    applyTextareaStyles();
}

noteTextarea.addEventListener('blur', () => {
    // Hide toolbar when textarea loses focus (with delay to allow toolbar clicks)
    setTimeout(() => {
        if (!formatToolbar.matches(':hover')) {
            formatToolbar.style.display = 'none';
        }
    }, 200);
});

// Event listeners for text selection
noteTextarea.addEventListener('mouseup', () => {
    setTimeout(() => {
        positionToolbar();
        applyTextareaStyles();
    }, 10); // Small delay to ensure selection is finalized
});

noteTextarea.addEventListener('keyup', () => {
    setTimeout(() => {
        positionToolbar();
        applyTextareaStyles();
    }, 10);
});

noteTextarea.addEventListener('input', () => {
    // Update formatting ranges when text changes
    updateFormattingRangesOnInput();
    applyTextareaStyles();
});

// Event listeners for formatting buttons
document.getElementById('floatBoldBtn').addEventListener('click', (e) => {
    e.preventDefault();
    applyFormatting('bold');
});

document.getElementById('floatItalicBtn').addEventListener('click', (e) => {
    e.preventDefault();
    applyFormatting('italic');
});

document.getElementById('floatUnderlineBtn').addEventListener('click', (e) => {
    e.preventDefault();
    applyFormatting('underline');
});

// Event listeners for adding notes and focusing inputs
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