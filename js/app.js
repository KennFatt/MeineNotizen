/**
 * Feature to let the note being completed.
 *
 * - Attach 'click' event to the <li>.
 * - Modify the note-title textContent's tyle.
 * - Checked the checkbox.
 */
const ulNotes = document.querySelector('.notes');

const onListItemClicked = function(checkbox, title) {
    /** Handle the appearance first */
    if (!checkbox.checked) {
        checkbox.checked = true;
        title.style.textDecoration = 'line-through';
    } else {
        checkbox.checked = false;
        title.style.textDecoration = 'none';
    }
};

ulNotes.addEventListener('click', function(ev) {
    if (ev.target.className === 'note-item') {
        const liNoteItem = ev.target;
        onListItemClicked(liNoteItem.children[0], liNoteItem.children[1]);
    } else if (ev.target.className === 'note-checkbox') {
        const checkbox = ev.target;
        /**
         * HACK!
         * 
         * By default, if we click on checkbox it will invert the checkbox's state.
         *  Therefore, we should invert it again here to make our function run properly.
         */
        checkbox.checked = !checkbox.checked;

        const title = checkbox.nextElementSibling;

        onListItemClicked(checkbox, title);
    } else if (ev.target.className === 'note-title') {
        const title = ev.target;
        const checkbox = title.previousElementSibling;
        onListItemClicked(checkbox, title);
    }
});

/**
 * Add new note into the notes element.
 * 
 * - Handle form interaction.
 */
const formAddNote = document.forms['form-add-note'];

const onNewNoteAdded = function(noteTitleContent) {
    const newNoteItem = document.createElement('li');
    newNoteItem.className = 'note-item';

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'note-checkbox';

    const noteTitle = document.createElement('span');
    noteTitle.className = 'note-title';
    noteTitle.textContent = noteTitleContent;

    newNoteItem.appendChild(checkBox);
    newNoteItem.appendChild(noteTitle);

    ulNotes.appendChild(newNoteItem);
};

formAddNote.addEventListener('submit', function(ev) {
    /** Preventing default behavior to refresh the whole page */
    ev.preventDefault();

    const textInput = formAddNote.querySelector('#note-add-bar');
    if (textInput.value.length > 0) {
        onNewNoteAdded(textInput.value);
    }

    /** Reset the input */
    textInput.value = '';
});

/**
 * Search and filter the notes.
 * 
 * - Search note and match with the given value
 */
const formSearchNote = document.forms['form-search-note'];
formSearchNote.addEventListener('submit', function(ev) { ev.preventDefault(); });
formSearchNote.addEventListener('keyup', function(ev) {
    const value = ev.target.value.toLowerCase().trim();
    const noteTitles = ulNotes.querySelectorAll('.note-title');
    const reset = value.length <= 0;

    noteTitles.forEach(function(titleSpan) {
        const noteItem = titleSpan.parentElement;
        if (reset) {
            noteItem.style.display = 'block';
            return;
        }

        const title = titleSpan.textContent.toLowerCase().trim();

        if (title.indexOf(value) !== -1) {
            noteItem.style.display = 'block';
        } else {
            /** Hide the <li> element if the pattern did not match */
            noteItem.style.display = 'none';
        }
    });
});