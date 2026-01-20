/* =========================================================
   Worklancers – Frontend Interactions
   Safe for Django | No backend dependency
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------------------------------------
       1. CTA BUTTONS – TEMP ACTION
       (Later we will connect these to Django forms / auth)
    --------------------------------------------------------- */
    const ctaButtons = document.querySelectorAll(".cta");

    ctaButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            // Check auth via data attribute
            const isAuthenticated = document.body.dataset.auth === "true";

            if (isAuthenticated) {
                window.location.href = "/dashboard/";
            } else {
                window.location.href = "/signup/";
            }
        });
    });


    /* ---------------------------------------------------------
       2. SMOOTH SCROLL (if we add anchors later)
    --------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    /* ---------------------------------------------------------
       3. FAQ TOGGLE (Accordion-style like SaaS sites)
    --------------------------------------------------------- */
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector("h4");
        const answer = item.querySelector("p");

        // hide answers initially
        answer.style.display = "none";

        question.style.cursor = "pointer";

        question.addEventListener("click", () => {
            const isOpen = answer.style.display === "block";

            // close all
            faqItems.forEach(i => {
                i.querySelector("p").style.display = "none";
            });

            // open clicked
            if (!isOpen) {
                answer.style.display = "block";
            }
        });
    });

    /* ---------------------------------------------------------
       4. HEADER SHADOW ON SCROLL (Modern SaaS feel)
    --------------------------------------------------------- */
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
        } else {
            header.style.boxShadow = "none";
        }
    });

    /* ---------------------------------------------------------
       5. SIMPLE FADE-IN ANIMATION ON SCROLL
    --------------------------------------------------------- */
    const sections = document.querySelectorAll(
        ".hero, .intro, .problem, .lifestyle, .accelerate, .feature, .workflow, .nofee, .faq"
    );

    const revealOnScroll = () => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                section.style.opacity = 1;
                section.style.transform = "translateY(0)";
            }
        });
    };

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = "translateY(40px)";
        section.style.transition = "all 0.6s ease";
    });

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // run once on load

});


/* APPLY NOW → SCROLL TO INTERVIEW FORM */
const applyButtons = document.querySelectorAll(".cta");

applyButtons.forEach(btn => {
    btn.addEventListener("click", function (e) {
        const target = document.getElementById("interview-form");

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
