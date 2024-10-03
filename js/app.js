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
const editSaveBtn = document.querySelector('.edit_save_btn');
const searchInput = document.querySelector('.header__search');

// switch (state) {
//   case 'empty':
//     emptyListInfo.style.display = 'flex';
//     noteEditor.style.display = 'none';
//     addNewBtn.style.display = 'none';
//     break;
//   case 'list':
//     emptyListInfo.style.display = 'none';
//     noteEditor.style.display = 'none';
//     addNewBtn.style.display = 'flex';
//     break;
//   case 'create':
//     emptyListInfo.style.display = 'none';
//     noteEditor.style.display = 'flex';
//     addNewBtn.style.display = 'none';
//     break;
//   case 'edit':
//     emptyListInfo.style.display = 'none';
//     noteEditor.style.display = 'flex';
//     addNewBtn.style.display = 'none';
//     break;
// }

function formatDate(date) {
  return `${date.toLocaleDateString('en-US', { month: 'long' })} ${date.getDate()}`;
}
const dateOfCreation = formatDate(new Date());

document.addEventListener('DOMContentLoaded', loadList(notesList));

searchInput.addEventListener('input', filterNotes);

saveNoteBtn.addEventListener('click', () => {
  const newNoteData = {
    title: titleInput.value,
    content: noteInput.value,
    date: dateOfCreation,
    id: Math.floor(Math.random() * 90000),
  };

  notesList.push(newNoteData);
  localStorage.setItem('notes', JSON.stringify(notesList));
  loadList(notesList);
});

editSaveBtn.addEventListener('click', (event) => {
  const editedNoteId = parseInt(event.srcElement.form.dataset.formId);

  let editedNote = notesList.find((note) => note.id === editedNoteId);

  editedNote = {
    title: titleInput.value,
    content: noteInput.value,
    date: dateOfCreation,
    id: editedNoteId,
  };

  const index = notesList.findIndex((note) => note.id === editedNoteId);

  notesList[index] = { ...notesList[index], ...editedNote };

  localStorage.setItem('notes', JSON.stringify(notesList));
  loadList(notesList);
});

addNoteBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
    emptyListInfo.style.display = 'none';
    if (notesList.length === 0) {
      saveNoteBtn.style.display = 'flex';
    }
    openNoteEditor({ title: '', content: '', date: '', id: null });
  })
);

function openNoteEditor(data) {
  noteEditor.style.display = 'flex';
  addNewBtn.style.display = 'none';
  noteEditor.setAttribute('data-form-id', data.id);
  if (data.id) {
    addNewHeading.style.display = 'none';
    saveNoteBtn.style.display = 'none';
    editSaveBtn.style.display = 'flex';
    editHeading.style.display = 'flex';
    titleInput.value = data.title;
    noteInput.value = data.content;
  } else {
    editHeading.style.display = 'none';
    editSaveBtn.style.display = 'none';
  }
}

cancelNewNoteBtn.addEventListener('click', () => {
  if (notesList.length === 0) {
    emptyListInfo.style.display = 'flex';
  }
  noteEditor.style.display = 'none';
});

function loadList(notes) {
  if (notesList.length > 0) {
    emptyListInfo.style.display = 'none';
    noteEditor.style.display = 'none';
    addNewBtn.style.display = 'flex';
  } else {
    emptyListInfo.style.display = 'flex';
    noteEditor.style.display = 'none';
    addNewBtn.style.display = 'none';
  }
  listContainer.innerHTML = '';
  notes.forEach((note, index) => {
    const noteContainer = document.createElement('section');
    noteContainer.classList.add('list__item');

    noteContainer.innerHTML = `
      <h5 className="list_item__heading">${note.title}</h5>
      <p className="list_item__body">${note.content}</p>
      <p className="list_item__date">${note.date}</p>
    `;

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
      deleteNote(id);
    });

    btnContainer.append(editButton, deleteButton);

    noteContainer.prepend(btnContainer);
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
