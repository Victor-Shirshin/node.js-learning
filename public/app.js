document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.edit === "edit") {
    const id = event.target.dataset.id;
    const title = prompt("Введите новое значение");
    if (title !== "" && title !== null) {
      editNote(id, title).then(() => {
        event.target.closest("li").firstChild.textContent = title;
      })
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  })
}

async function editNote(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}