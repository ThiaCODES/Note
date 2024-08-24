const create = document.querySelector("#createBtn");
const text = document.querySelector(".text");
const delBtn = document.querySelector(".fa-trash");
const noteContainer = document.querySelector(".note-container");
note = document.querySelector(".textContainer");

create.addEventListener("click", createNote);
function createNote() {
  const textContainer = document.createElement("div");
  textContainer.classList.add("textContainer");
  textContainer.innerHTML = `<p contenteditable="true" class="text" >
        </p>
        <button id = 'trash'>
            <i class="fa-solid fa-trash"></i>
          </button>`;
  noteContainer.appendChild(textContainer);
  textContainer.querySelector(".text").addEventListener("input", saveNote);
}
noteContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.parentElement.remove();
    saveNote();
  }
});
function saveNote() {
  const notes = Array.from(
    noteContainer.querySelectorAll(".textContainer")
  ).map((container) => {
    return container.querySelector(".text").innerHTML;
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
function loadNote() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((noteContent) => {
    const textContainer = document.createElement("div");
    textContainer.classList.add("textContainer");
    textContainer.innerHTML = `<p contenteditable="true" class="text">${noteContent}</p>
        <button id='trash'>
            <i class="fa-solid fa-trash"></i>
          </button>`;
    noteContainer.appendChild(textContainer);
    textContainer.querySelector(".text").addEventListener("input", saveNote);
  });
}
loadNote();
