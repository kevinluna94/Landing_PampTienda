// ===============================
// 🌟 ANIMACIÓN FADE-IN AL HACER SCROLL
// ===============================
const sections = document.querySelectorAll('.section-fade');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));


// ===============================
// 📬 FORMULARIO DE CONTACTO (funcional con Google Sheets)
// ===============================
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      asunto: form.asunto.value.trim(),
      mensaje: form.mensaje.value.trim()
    };

    if (!data.nombre || !data.email || !data.mensaje) {
      showMessage("Por favor completá todos los campos obligatorios ⚠️", "error");
      return;
    }

    showMessage("Enviando mensaje...", "loading");

    try {
      // 🔥 Importante: usar mode: "no-cors" para evitar errores de CORS
      await fetch("https://script.google.com/macros/s/AKfycbwys90Y1xhQUzR7iWBAPm66t__UQmqeAlZiwK3ZQnQuUVu0uZ5vy62Um42ztWiDiNt3Hg/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      // Como no se puede leer respuesta en no-cors, se asume éxito si no hay error
      showMessage("¡Gracias! Tu consulta ha sido enviada ✅", "success");
      form.reset();

    } catch (err) {
      console.error("Error al enviar:", err);
      showMessage("Error al enviar mensaje ❌", "error");
    }
  });
}


// ===============================
// 🧩 FUNCIÓN DE MENSAJE
// ===============================
function showMessage(text, type) {
  if (!formMessage) return;
  formMessage.textContent = text;
  formMessage.style.transition = "all 0.3s ease";
  formMessage.style.opacity = "1";

  switch (type) {
    case "success": formMessage.style.color = "green"; break;
    case "error": formMessage.style.color = "red"; break;
    case "loading": formMessage.style.color = "#007bff"; break;
    default: formMessage.style.color = "#333";
  }

  if (type === "success" || type === "error") {
    setTimeout(() => formMessage.style.opacity = "0", 4000);
  }
}


// ===============================
// 🌄 PARALLAX HERO
// ===============================
const demoHero = document.querySelector('.demo-hero');
if (demoHero) {
  const parallaxBg = demoHero.querySelector('.parallax-bg');
  window.addEventListener('scroll', () => {
    const offset = window.pageYOffset;
    const heroTop = demoHero.offsetTop;
    const heroHeight = demoHero.offsetHeight;
    if (offset >= heroTop && offset <= heroTop + heroHeight) {
      const yPos = (offset - heroTop) * 0.5;
      parallaxBg.style.transform = `translateY(${yPos}px)`;
    }
  });
}
