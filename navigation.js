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
