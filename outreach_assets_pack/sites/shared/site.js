(function () {
  const configs = {
    "mock-law": {
      name: "Verum Law",
      initials: "VL",
      prompt: "Need help choosing a legal service?",
      replies: {
        primary: "I can help you book a consultation or point you to Business Law, Real Estate Law, Wills & Estates, or Dispute Resolution.",
        secondary: "Consultations are available Monday to Friday, 8:30 AM to 5:00 PM."
      },
      actions: ["Book a Consultation", "View Services", "Call 825-535-3700"]
    },
    "mock-pw": {
      name: "PW Design and Co",
      initials: "PW",
      prompt: "Looking for VA support or a handmade piece?",
      replies: {
        primary: "I can guide you to virtual assistant services, cake toppers, floral shadow boxes, or custom order details.",
        secondary: "A short discovery note is the best way to start."
      },
      actions: ["Work With Me", "Explore VA Services", "View Handmade Products"]
    },
    "mock-hr": {
      name: "Natasha Hunt Consulting",
      initials: "NH",
      prompt: "Need HR guidance for a growing team?",
      replies: {
        primary: "I can help you explore HR processes, policy support, employee relations, or HR strategy.",
        secondary: "The free explore session is a good first step."
      },
      actions: ["Book Free Session", "View HR Services", "See Process"]
    },
    "mock-accounting": {
      name: "Mowbrey Gil LLP",
      initials: "MG",
      prompt: "How can our accounting team help?",
      replies: {
        primary: "I can direct you to audit and accounting, taxation, advisory, valuation, secure upload, or invoice payment.",
        secondary: "For client documents, use Secure Upload from the header."
      },
      actions: ["Explore Services", "Secure Upload", "Pay an Invoice"]
    },
    "mock-sugar": {
      name: "California Sugar",
      initials: "CS",
      prompt: "Ready to book sugaring or have a first-visit question?",
      replies: {
        primary: "I can help with service areas, appointment prep, aftercare, and booking from the Hollick Kenyon studio.",
        secondary: "For best results, arrive with clean, dry skin and about 1/4 inch of growth."
      },
      actions: ["Book Now", "View Services", "First Visit Tips"]
    },
    "mock-performance": {
      name: "E-Pops Performance",
      initials: "EP",
      prompt: "Want support with pressure and performance?",
      replies: {
        primary: "I can explain the Regulate, Refocus, Perform method or help you book a session.",
        secondary: "This assistant can qualify goals and route visitors to bookings."
      },
      actions: ["Book a Session", "Learn the Method", "Pressure Symptoms"]
    },
    "mock-boussole": {
      name: "Boussole Wellness",
      initials: "BW",
      prompt: "Feeling burned out or exploring coaching?",
      replies: {
        primary: "I can guide you to burnout recovery, purpose alignment, healthy habits, or the discovery call.",
        secondary: "You can also grab the Healthy Habits Guide from the page."
      },
      actions: ["Book Discovery Call", "Get the Guide", "View Programs"]
    }
  };

  const body = document.body;
  const key = Object.keys(configs).find((className) => body.classList.contains(className));
  const config = configs[key];

  document.querySelectorAll("main > section, footer, .mock-service-card, .mock-mini-card, .mock-proof, .mock-stat").forEach((el, index) => {
    el.classList.add("reveal-on-scroll");
    el.dataset.revealDelay = String(index % 4);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  document.querySelectorAll(".reveal-on-scroll").forEach((el) => revealObserver.observe(el));

  if (!config) return;

  const chat = document.createElement("aside");
  chat.className = "demo-chat";
  chat.setAttribute("aria-label", `${config.name} website assistant`);
  chat.innerHTML = `
    <div class="demo-chat-panel">
      <div class="demo-chat-header">
        <div class="demo-chat-avatar">${config.initials}</div>
        <div class="demo-chat-title">
          <strong>${config.name}</strong>
          <span>Website assistant</span>
        </div>
        <button class="demo-chat-close" type="button" aria-label="Close chat">×</button>
      </div>
      <div class="demo-chat-body" aria-live="polite">
        <div class="demo-chat-msg">${config.prompt}</div>
      </div>
      <div class="demo-chat-actions">
        ${config.actions.map((action) => `<button class="demo-chat-action" type="button">${action}</button>`).join("")}
      </div>
      <form class="demo-chat-input">
        <input type="text" aria-label="Chat message" placeholder="Type a question...">
        <button type="submit">Send</button>
      </form>
    </div>
    <button class="demo-chat-toggle" type="button">Chat with ${config.initials}</button>
  `;

  document.body.appendChild(chat);

  if (window.matchMedia("(max-width: 700px)").matches) {
    chat.classList.add("is-delayed", "is-closed");
    window.setTimeout(() => {
      chat.classList.remove("is-delayed", "is-closed");
    }, 5000);
  }

  const bodyEl = chat.querySelector(".demo-chat-body");
  const addMessage = (text, type) => {
    const msg = document.createElement("div");
    msg.className = `demo-chat-msg${type ? ` ${type}` : ""}`;
    msg.textContent = text;
    bodyEl.appendChild(msg);
    bodyEl.scrollTop = bodyEl.scrollHeight;
  };

  chat.querySelector(".demo-chat-close").addEventListener("click", () => chat.classList.add("is-closed"));
  chat.querySelector(".demo-chat-toggle").addEventListener("click", () => chat.classList.remove("is-closed"));

  chat.querySelectorAll(".demo-chat-action").forEach((button, index) => {
    button.addEventListener("click", () => {
      addMessage(button.textContent, "user");
      addMessage(index === 0 ? config.replies.primary : config.replies.secondary);
    });
  });

  chat.querySelector(".demo-chat-input").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = chat.querySelector("input");
    const value = input.value.trim();
    if (!value) return;
    addMessage(value, "user");
    addMessage(config.replies.primary);
    input.value = "";
  });
})();
