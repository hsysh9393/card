(() => {
  const portrait = document.getElementById("portrait");
  const eyes = document.getElementById("eyes");
  const toast = document.getElementById("toast");
  const contacts = document.querySelectorAll(".contact");

  let toastTimer = 0;

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 1600);
  };

  contacts.forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy;
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
        showToast("복사됐어요");
      } catch {
        showToast(value);
      }
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !portrait || !eyes) return;

  const maxEye = 4;
  const maxTilt = 6;

  const onPointerMove = (event) => {
    const rect = portrait.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = Math.max(-1, Math.min(1, (event.clientX - cx) / (rect.width / 2)));
    const ny = Math.max(-1, Math.min(1, (event.clientY - cy) / (rect.height / 2)));

    eyes.style.transform = `translate(${nx * maxEye}px, ${ny * maxEye}px)`;
    portrait.style.transform = `rotateX(${-ny * maxTilt}deg) rotateY(${nx * maxTilt}deg)`;
  };

  const reset = () => {
    eyes.style.transform = "translate(0, 0)";
    portrait.style.transform = "rotateX(0) rotateY(0)";
  };

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerleave", reset);
})();
