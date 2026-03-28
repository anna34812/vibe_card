(function () {
  const toast = document.getElementById("toast");
  const card = document.getElementById("card");
  const contacts = document.querySelectorAll(".contact[data-copy]");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2000);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast("클립보드에 복사했어요");
    } catch {
      showToast("복사에 실패했어요");
    }
  }

  contacts.forEach(function (el) {
    el.addEventListener("click", function (e) {
      const value = el.getAttribute("data-copy");
      if (!value) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      copyText(value);
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // subtle tilt on pointer move (desktop)
  if (card && window.matchMedia("(pointer: fine)").matches && !reduceMotion) {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const max = 6;
      card.style.transform =
        "perspective(900px) rotateY(" +
        (x * max).toFixed(2) +
        "deg) rotateX(" +
        (-y * max).toFixed(2) +
        "deg) translateY(-4px)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  }
})();
