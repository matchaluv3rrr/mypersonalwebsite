const links = [...document.querySelectorAll(".site-header nav a")];
const pages = [...document.querySelectorAll("main > .page")];
const title = document.title;

function showPage() {
  const active = pages.find((page) => "#" + page.id === location.hash) ?? pages[0];
  for (const page of pages) {
    page.hidden = page !== active;
  }
  for (const link of links) {
    if (link.hash === "#" + active.id) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  }
  const label = active.querySelector("h2[id$='-title']")?.textContent;
  document.title = label ? label + " | Gabrielle Diaz" : title;
}

window.addEventListener("hashchange", showPage);
showPage();

function animateIntroduction() {
  const introduction = document.querySelector(".intro-copy");
  const text = introduction.textContent.trim();
  const accessibleCopy = document.createElement("span");
  accessibleCopy.className = "visually-hidden";
  accessibleCopy.textContent = text;

  const animatedCopy = document.createElement("span");
  animatedCopy.setAttribute("aria-hidden", "true");
  const letters = Array.from(text, (letter, index) => {
    if (/\s/.test(letter)) return letter;

    const span = document.createElement("span");
    span.textContent = letter;
    span.className = "intro-letter";
    span.style.animationDelay = index * 15 + "ms";
    return span;
  });
  animatedCopy.replaceChildren(...letters);
  introduction.replaceChildren(accessibleCopy, animatedCopy);
}

if (!pages[0].hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  animateIntroduction();
}
