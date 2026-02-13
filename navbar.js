async function loadNavbar() {
  const targets = ["navbar.html", "../navbar.html"];
  for (const path of targets) {
    try {
      const res = await fetch(path);
      if (!res.ok) {
        continue;
      }
      const data = await res.text();
      const mount = document.getElementById("navbar");
      if (mount) {
        mount.innerHTML = data;
        normalizeNavbarPaths(mount);
      }
      return;
    } catch (err) {
      // Try the next path.
    }
  }
}

function normalizeNavbarPaths(container) {
  if (!window.location.pathname.includes("/projects/")) {
    return;
  }

  const prefix = "../";
  container.querySelectorAll("a[href], img[src]").forEach((el) => {
    const attr = el.tagName.toLowerCase() === "img" ? "src" : "href";
    const value = el.getAttribute(attr);
    if (!value) {
      return;
    }
    if (value.startsWith("http") || value.startsWith("/") || value.startsWith("#") || value.startsWith("../")) {
      return;
    }
    el.setAttribute(attr, prefix + value);
  });
}

loadNavbar();
