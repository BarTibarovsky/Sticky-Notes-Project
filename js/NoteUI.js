function getNote(noteDescription, noteDate, noteTime) {
    return {
        noteDescription,
        noteDate,
        noteTime,
    };
}

function getNoteUI(note) {
    const outerDiv = document.createElement("div");
    outerDiv.classList.add("noteUI");
    outerDiv.classList.add("fade-in");

    const deleteNoteButton = document.createElement("Button")
    deleteNoteButton.classList.add("btn", "btn-danger", "hiddenDelButton", "mt-2");
    deleteNoteButton.style.visibility = "hidden";
    const xIcon = document.createElement("icon");
    xIcon.classList.add("bi", "bi-x");
    deleteNoteButton.append(xIcon);
    deleteNoteButton.addEventListener("click", function () {
        deleteNote(state.notes)
    });

    outerDiv.addEventListener("mouseover", function () {
        deleteNoteButton.style.visibility = "visible";
        deleteNoteButton.classList.add("fade-in");
    })
    outerDiv.addEventListener("mouseleave", function () {
        deleteNoteButton.style.visibility = "hidden";
    })

    const noteDescriptionPrint = document.createElement("p");
    noteDescriptionPrint.innerText = note.noteDescription;
    noteDescriptionPrint.className = "noteTextBox";

    const noteDatePrint = document.createElement("footer");
    noteDatePrint.className = "noteDueDate";
    noteDatePrint.innerText = note.noteDate;
    noteDatePrint.style.textAlign = "center";

    const noteTimePrint = document.createElement("footer");
    noteTimePrint.className = "noteDueTime";
    noteTimePrint.innerText = note.noteTime;
    noteTimePrint.style.textAlign = "center";

    outerDiv.append(deleteNoteButton, noteDescriptionPrint, noteDatePrint, noteTimePrint);

    return outerDiv;
}