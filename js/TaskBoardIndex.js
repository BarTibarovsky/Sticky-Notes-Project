const DOM = {
  form: null,
  noteDate: null,
  noteTime: null,
  noteDescription: null,
  notesContainer: null,
};
const CONFIG = { NOTES: "notes" };
const state = { notes: [] };

function init() {
  DOM.form = document.querySelector("#addNoteForm");
  DOM.noteDate = document.querySelector("#noteDate");
  DOM.noteTime = document.querySelector("#noteTime");
  DOM.noteDescription = document.querySelector("#noteDescription");
  DOM.notesContainer = document.querySelector("#notesContainer");
  const addButton = document.querySelector("#addButton");
  addButton.addEventListener("click", addNote);
  const clearButton = document.querySelector("#clearButton");
  clearButton.addEventListener("click", clearForm);

  try {
    const notesString = localStorage.getItem(CONFIG.NOTES);
    const notes = JSON.parse(notesString);
    if (!notes) return;
    state.notes = notes;
  } catch { }
  setLocalStorageAndDraw();
}

init();

function addNote() {
  if (!noteDescription.value || !noteDate.value || !noteTime.value) {
    alert("Please fill out the form")
    return;
  }
  const noteDescriptionValue = DOM.noteDescription.value;
  const noteDateValue = DOM.noteDate.value;
  const noteTimeValue = DOM.noteTime.value;
  const note = getNote(noteDescriptionValue, noteDateValue, noteTimeValue);
  state.notes.push(note);
  setLocalStorageAndDraw();
}

function draw() {
  DOM.notesContainer.innerHTML = "";
  for (let index = 0; index < state.notes.length; index++) {
    const stickyNote = getNoteUI(state.notes[index]);
    DOM.notesContainer.append(stickyNote);
  }
}

function clearForm() {
  document.getElementById("addNoteForm").reset();
}

function getNoteIndexById(id, _note) {
  if (typeof id !== "string") return;
  if (!Array.isArray(_note)) return;
  for (let index = 0; index < _note.length; index++) {
    const currentNote = state.notes[index];
    if (currentNote.id === id) {
      return index;
    }
  }
}

function deleteNote() {
  const noteIndex = getNoteIndexById(state.notes.id, state.notes);
  if (noteIndex < 0) return;
  state.notes.splice(noteIndex, 1);
  setLocalStorageAndDraw();
};

function setLocalStorageAndDraw() {
  localStorage.setItem(CONFIG.NOTES, JSON.stringify(state.notes));
  draw(state.notes);
}