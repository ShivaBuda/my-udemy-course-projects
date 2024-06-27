const modalBtnEl = document.querySelectorAll(".modal__btn");
const modalOverlayEl = document.querySelector(".modal__overlay");

document.querySelector(".modal__close").addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalOverlayEl.classList.contains("hidden")) {
        closeModal();
    }
});

for (let i = 0; i < modalBtnEl.length; i++) {
    modalBtnEl[i].addEventListener("click", openModal);
}

function openModal() {
    modalOverlayEl.classList.remove("hidden");
}

function closeModal() {
    modalOverlayEl.classList.add("hidden");
}
