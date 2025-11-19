function toggleDescription(id) {
  const element = document.getElementById(id);
  const icon = element.previousElementSibling.querySelector(".toggle-icon");

  if (element.classList.contains("hidden")) {
    element.classList.remove("hidden");
    icon.textContent = "—";
  } else {
    element.classList.add("hidden");
    icon.textContent = "+";
  }
}

(function () {
  const root = document.documentElement;
  const btn = document.getElementById("theme-toggle");

  // Wczytanie zapisanej preferencji
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);

  // Obsługa kliknięcia
  btn?.addEventListener("click", () => {
    const current =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", current);
    localStorage.setItem("theme", current);

    // Zmieniamy też napis na przycisku
    btn.textContent =
      current === "light" ? "Zmień motyw (ciemny)" : "Zmień motyw (jasny)";
  });

  // // !!! УДАЛЕНА ИЗ IIFE !!!
  // function toggleDescription(id) { /* ... */ }

  // Pokaż/Ukryj dodatkowe treści na stronie głównej
  const moreBtn = document.getElementById("toggle-more");
  const more = document.getElementById("more-content");
  moreBtn?.addEventListener("click", () => {
    const hidden = more?.getAttribute("hidden") !== null;
    if (hidden) more?.removeAttribute("hidden");
    else more?.setAttribute("hidden", "");
    moreBtn.textContent = hidden ? "Ukryj szczegóły" : "Pokaż szczegóły";
  });

  // Zegar w stopce
  const clock = document.getElementById("clock");
  function tick() {
    const d = new Date();
    clock && (clock.textContent = d.toLocaleString("pl-PL"));
  }
  setInterval(tick, 1000);
  tick();

  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", (e) => {
    const email = document.getElementById("email");
    const topic = document.getElementById("topic");
    const msg = document.getElementById("message");
    let errors = [];

    if (
      !email.value.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ) {
      errors.push("Podaj poprawny adres E-Mail.");
    }
    if (!topic.value) {
      errors.push("Wybierz temat wiadomości.");
    }
    if (!msg.value.trim() || msg.value.trim().length < 10) {
      errors.push("Wiadomość musi zawierać co najmniej 10 znaków.");
    }

    if (errors.length) {
      e.preventDefault();
      alert(errors.join("\n"));
      return;
    }
    localStorage.setItem("ostatniEmail", email.value.trim());
  });
})();
