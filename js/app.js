const notesList = JSON.parse(localStorage.getItem('notes')) || [];

const listContainer = document.querySelector('.list');
const saveNoteBtn = document.querySelector('.list_item__save_btn');
const titleInput = document.querySelector('.list_item__heading');
const noteInput = document.querySelector('.list_item__body');
const addNoteBtns = document.querySelectorAll('.list__add_note_btn');
const addNoteBtn = document.querySelector('.add_note_btn');
const addNewBtn = document.querySelector('.add_new_btn');
const noteEditor = document.querySelector('.new_list_item');
const cancelNewNoteBtn = document.querySelector('.list_item__cancel_btn');
const emptyListInfo = document.querySelector('.list_empty');
const addNewHeading = document.querySelector('.add_new_heading');
const editHeading = document.querySelector('.edit_heading');
const searchInput = document.querySelector('.header__search');
const modal = document.querySelector('.modal');
const confirmDeletionBtn = document.querySelector('.delete__submit');

document.addEventListener('DOMContentLoaded', loadList(notesList));

document.querySelectorAll('.note_input').forEach((input) => {
  input.addEventListener('input', (event) => {
    if (event.srcElement.value !== '') {
      saveNoteBtn.disabled = false;
    }
  });
});

searchInput.addEventListener('input', filterNotes);

addNoteBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
    emptyListInfo.style.display = 'none';
    if (notesList.length === 0) {
      saveNoteBtn.style.display = 'flex';
    }
    openNoteEditor({ title: '', content: '', date: '', id: null });
  })
);

saveNoteBtn.addEventListener('click', (event) => {
  const editedNoteId = parseInt(event.srcElement.form.dataset.formId);

  if (editedNoteId) {
    let editedNote = notesList.find((note) => note.id === editedNoteId);

    editedNote = {
      title: titleInput.value,
      content: noteInput.value,
      date: new Date(),
      id: editedNoteId,
    };

    const index = notesList.findIndex((note) => note.id === editedNoteId);

    notesList[index] = { ...notesList[index], ...editedNote };
  } else {
    const newNoteData = {
      title: titleInput.value,
      content: noteInput.value,
      date: new Date(),
      id: Math.floor(Math.random() * 90000),
    };

    notesList.push(newNoteData);
  }

  localStorage.setItem('notes', JSON.stringify(notesList));
  loadList(notesList);
});

cancelNewNoteBtn.addEventListener('click', () => {
  if (notesList.length === 0) {
    emptyListInfo.style.display = 'flex';
  }
  noteEditor.style.display = 'none';
  loadList(notesList);
});

confirmDeletionBtn.addEventListener('click', (event) => {
  const noteId = parseInt(event.srcElement.dataset.formId);
  modal.style.display = 'none';
  deleteNote(noteId);
});

function openNoteEditor(data) {
  noteEditor.style.display = 'flex';
  addNewBtn.style.display = 'none';
  noteEditor.setAttribute('data-form-id', data.id);
  saveNoteBtn.disabled = true;

  if (data.id) {
    addNewHeading.style.display = 'none';
    editHeading.style.display = 'flex';
    titleInput.value = data.title;
    noteInput.value = data.content;
  } else {
    editHeading.style.display = 'none';
    addNewHeading.style.display = 'flex';
  }
}

function loadList(notes) {
  if (notesList.length > 0) {
    searchInput.disabled = false;
    emptyListInfo.style.display = 'none';
    noteEditor.style.display = 'none';
    noteEditor.reset();
    addNewBtn.style.display = 'flex';
  } else {
    searchInput.disabled = true;
    emptyListInfo.style.display = 'flex';
    noteEditor.style.display = 'none';
    noteEditor.reset();
    addNewBtn.style.display = 'none';
  }
  listContainer.innerHTML = '';
  notes.sort((a, b) => a.date - b.date);
  notes.forEach((note, index) => {
    const noteContainer = document.createElement('section');
    noteContainer.classList.add('list__item');

    const dateOfCreation = `${new Date(note.date).toLocaleDateString('en-US', { month: 'long' })} ${new Date(note.date).getDate()}`;

    noteContainer.innerHTML = `
      <div class="list_item__body_container" style="flex-basis: 100%">
        <p class="list_item__body">${note.content}</p>
        <p class="list_item__date">${dateOfCreation}</p>
      </div>
    `;

    const noteTitle = document.createElement('h5');
    noteTitle.className = 'list_item__heading';
    noteTitle.innerHTML = `${note.title}`;
    const btnContainer = document.createElement('span');
    const editButton = document.createElement('button');
    editButton.className = 'btn edit_btn';
    editButton.id = `edit_${note.id}`;
    editButton.innerHTML = '<i class="material-icons edit_icon">edit_note</i>';
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn delete_btn';
    deleteButton.id = `delete_${note.id}`;
    deleteButton.innerHTML =
      '<i class="material-icons delete_icon">delete_outline</i>';

    const id = parseInt(editButton.id.replace(/\D/g, ''), 10);

    editButton.addEventListener('click', () => {
      editNote(id);
    });

    deleteButton.addEventListener('click', () => {
      modal.style.display = 'flex';
      document
        .querySelector('.delete__submit')
        .setAttribute('data-form-id', id);
    });

    btnContainer.append(editButton, deleteButton);

    noteContainer.prepend(noteTitle, btnContainer);
    listContainer.prepend(noteContainer);
  });
}

function editNote(id) {
  const filteredNote = notesList.find((note) => note.id === id);

  openNoteEditor(filteredNote);
}

function deleteNote(id) {
  const noteIndex = notesList.findIndex((note) => note.id === id);
  if (noteIndex !== -1) {
    notesList.splice(noteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notesList));
    loadList(notesList);
  } else {
    console.log('Note not found');
  }
}

function filterNotes() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredNotes = notesList.filter((note) =>
    note.title.toLowerCase().includes(searchTerm)
  );

  loadList(filteredNotes);
}

function closeModal() {
  modal.style.display = 'none';
}
