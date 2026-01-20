function scrollToForm() {
    document.getElementById("apply-form")
        .scrollIntoView({ behavior: "smooth" });
}

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 120;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =========================================================
   Worklancers Landing Page – Main JS
   Author: Professional SaaS Frontend
   Purpose: Animations, interactions, UX polish
========================================================= */

/* -------------------------------
   Smooth scroll to Apply Form
-------------------------------- */
function scrollToForm() {
    const formSection = document.getElementById("apply-form");
    if (formSection) {
        formSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

/* -------------------------------
   Scroll Reveal Animation
-------------------------------- */
const revealElements = document.querySelectorAll(".reveal");

function handleScrollReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 120;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", handleScrollReveal);
window.addEventListener("load", handleScrollReveal);

/* -------------------------------
   FAQ Accordion
-------------------------------- */
function toggleFaq(item) {
    const answer = item.querySelector(".faq-answer");

    // Close other open FAQs (professional behavior)
    document.querySelectorAll(".faq-item.open").forEach(openItem => {
        if (openItem !== item) {
            openItem.classList.remove("open");
            openItem.querySelector(".faq-answer").style.maxHeight = null;
        }
    });

    item.classList.toggle("open");

    if (item.classList.contains("open")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
        answer.style.maxHeight = null;
    }
}

/* -------------------------------
   Button Ripple Feedback (Subtle)
-------------------------------- */
document.querySelectorAll(".primary-btn").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.add("clicked");
        setTimeout(() => {
            button.classList.remove("clicked");
        }, 200);
    });
});

/* -------------------------------
   Navbar Shadow on Scroll
-------------------------------- */
const header = document.querySelector(".top-header");

window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 20) {
        header.style.boxShadow = "0 10px 30px rgba(15,23,42,0.08)";
    } else {
        header.style.boxShadow = "none";
    }
});

/* -------------------------------
   Video Placeholder Interaction
-------------------------------- */
document.querySelectorAll(".video-left").forEach(videoBox => {
    videoBox.addEventListener("mouseenter", () => {
        videoBox.style.transform = "scale(1.02)";
    });

    videoBox.addEventListener("mouseleave", () => {
        videoBox.style.transform = "scale(1)";
    });
});

/* -------------------------------
   Image Hover Motion (Lifestyle)
-------------------------------- */
document.querySelectorAll(".lifestyle-images img").forEach(img => {
    img.addEventListener("mouseenter", () => {
        img.style.transform = "scale(1.05)";
    });

    img.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
    });
});

/* -------------------------------
   Prevent Double Form Submit
-------------------------------- */
const applyForm = document.querySelector("#apply-form form");

if (applyForm) {
    applyForm.addEventListener("submit", () => {
        const submitBtn = applyForm.querySelector("button");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "Submitting...";
        }
    });
}

/* -------------------------------
   Accessibility: Keyboard FAQ
-------------------------------- */
document.querySelectorAll(".faq-item").forEach(item => {
    item.setAttribute("tabindex", "0");
    item.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            toggleFaq(item);
        }
    });
});


/* --------------------------------
   Apply Now → Scroll to Form
-------------------------------- */
/* --------------------------------
   Apply Now → Replace Section
-------------------------------- */
document.querySelectorAll(".apply-now-btn").forEach(button => {
    button.addEventListener("click", () => {
        const chatSection = document.getElementById("chat-section");
        const formSection = document.getElementById("form-section");

        if (chatSection && formSection) {
            chatSection.classList.add("hidden");
            formSection.classList.remove("hidden");
        }
    });
});

/* --------------------------------
   Back Button → Return to Chat
-------------------------------- */
const backBtn = document.getElementById("backToChat");

if (backBtn) {
    backBtn.addEventListener("click", () => {
        const chatSection = document.getElementById("chat-section");
        const formSection = document.getElementById("form-section");

        if (chatSection && formSection) {
            formSection.classList.add("hidden");
            chatSection.classList.remove("hidden");
        }
    });
}

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');

    btn.addEventListener('click', () => {
        faqItems.forEach(i => {
            if (i !== item) i.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});

const chatSection = document.getElementById("chat-section");
const formSection = document.getElementById("form-section");
const sourceField = document.getElementById("sourceField");

// CTA click → replace section
document.querySelectorAll(".cta-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        sourceField.value = btn.dataset.source;
        chatSection.classList.add("hidden");
        formSection.classList.remove("hidden");
        formSection.scrollIntoView({ behavior: "smooth" });
    });
});

// Submit form via AJAX

document.getElementById("applyForm").addEventListener("submit", function (e) {
    e.preventDefault(); // ❗ stop normal submit

    const form = this;
    const formData = new FormData(form);

    // show loader
    form.querySelector(".loader").style.display = "inline-block";
    form.querySelector(".text").textContent = "Submitting...";

    fetch("/apply/", {
        method: "POST",
        body: formData,
        headers: {
            "X-CSRFToken": form.querySelector("[name=csrfmiddlewaretoken]").value
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                form.innerHTML = `
                <h3>✅ Application submitted</h3>
                <p>Please check your email for confirmation.</p>
            `;
            } else {
                alert("Something went wrong. Try again.");
            }
        })
        .catch(err => {
            console.error(err);
            alert("Server error");
        });
});

/* --------------------------------
   Hero Video Mute / Unmute
-------------------------------- */
const heroVideo = document.getElementById("heroVideo");
const muteToggle = document.getElementById("muteToggle");

if (heroVideo && muteToggle) {
    muteToggle.addEventListener("click", () => {
        heroVideo.muted = !heroVideo.muted;

        muteToggle.innerText = heroVideo.muted ? "Unmute" : "Mute";
    });
}

/* --------------------------------
   Hero Word Slider
-------------------------------- */
const words = document.querySelectorAll(".word-slider .word");
let currentWord = 0;
const wordInterval = 2200; // 2.2 seconds

setInterval(() => {
    const current = words[currentWord];
    current.classList.remove("active");
    current.classList.add("exit");

    currentWord = (currentWord + 1) % words.length;
    const next = words[currentWord];

    next.classList.add("active");

    setTimeout(() => {
        current.classList.remove("exit");
    }, 700);

}, wordInterval);


/* -------------------------------
   Star Rating Selection
-------------------------------- */
const stars = document.querySelectorAll("#starInput span");
const ratingInput = document.getElementById("ratingInput");

stars.forEach(star => {
    star.addEventListener("click", () => {
        const value = star.dataset.value;
        ratingInput.value = value;

        stars.forEach(s => {
            s.classList.toggle("active", s.dataset.value <= value);
        });
    });
});

/* -------------------------------
   Submit Review (AJAX)
-------------------------------- */
const reviewForm = document.getElementById("reviewForm");
const testimonialTrack = document.querySelector(".testimonial-track");

reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!ratingInput.value) {
        alert("Please select a rating");
        return;
    }

    const formData = new FormData(reviewForm);

    const response = await fetch("/submit-testimonial/", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    // Create new testimonial card
    const card = document.createElement("div");
    card.className = "testimonial-card new";

    card.innerHTML = `
    <div class="rating">${"★".repeat(data.rating)}</div>
    <p>${data.review}</p>
    <div class="author">
      <strong>${data.name}</strong>
      <span>${data.role}</span>
    </div>
  `;

    // Add to scrolling testimonials
    testimonialTrack.prepend(card);
    showToast("Thank you! Your review has been added.");

    // Highlight animation
    setTimeout(() => card.classList.add("highlight"), 100);
    setTimeout(() => card.classList.remove("new", "highlight"), 2500);

    // Reset form
    reviewForm.reset();
    ratingInput.value = "";
    stars.forEach(s => s.classList.remove("active"));
});

/* --------------------------------
   Review Form Toggle
-------------------------------- */
const openReviewBtn = document.getElementById("openReviewForm");
const closeReviewBtn = document.getElementById("closeReviewForm");
const reviewFormWrapper = document.getElementById("reviewFormWrapper");

if (openReviewBtn && reviewFormWrapper) {
    openReviewBtn.addEventListener("click", () => {
        reviewFormWrapper.classList.remove("hidden");
        openReviewBtn.style.display = "none";
    });
}

if (closeReviewBtn) {
    closeReviewBtn.addEventListener("click", () => {
        reviewFormWrapper.classList.add("hidden");
        openReviewBtn.style.display = "inline-block";
    });
}

/* --------------------------------
   Toast Utility
-------------------------------- */
function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMessage = document.getElementById("toastMessage");

    toastMessage.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
