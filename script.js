document.addEventListener("DOMContentLoaded", () => {
  // Mobile Nav Toggle
  const topbar = document.querySelector(".topbar");
  const navToggle = document.querySelector(".nav-toggle");
  const reveals = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll("[data-count]");

  if (navToggle && topbar) {
    navToggle.addEventListener("click", () => {
      const isOpen = topbar.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close mobile menu when nav link clicked
    const navLinks = document.querySelectorAll(".nav a, .nav-actions a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        topbar.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal animations on scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 30, 150)}ms`;
    revealObserver.observe(item);
  });

  // Animated metric counters
  const animateCounter = (element) => {
    const target = Number(element.dataset.count);
    const duration = 1500;
    const startTime = performance.now();
    const hasDecimal = String(element.dataset.count).includes(".");

    const update = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const value = target * eased;

      if (hasDecimal) {
        element.textContent = value.toFixed(1) + "%";
      } else {
        element.textContent = Math.round(value).toLocaleString("en-IN") + (target === 24 ? "" : "+");
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  // Interactive Recharge Simulator Logic
  const simTabs = document.querySelectorAll(".sim-tab");
  const simContents = document.querySelectorAll(".sim-content");
  const simBtn = document.getElementById("sim-btn");
  const simLoader = document.getElementById("sim-loader");
  const simSuccess = document.getElementById("sim-success");
  const simResetBtn = document.getElementById("sim-reset-btn");
  const successMessage = document.getElementById("success-message");
  const receiptRef = document.getElementById("receipt-ref");

  let activeTab = "mobile";

  // Tab switching
  simTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      simTabs.forEach((t) => t.classList.remove("active"));
      simContents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");
      activeTab = tab.dataset.tab;
      document.getElementById(`content-${activeTab}`).classList.add("active");
      
      // Update primary button text depending on tab
      const span = simBtn.querySelector("span");
      if (activeTab === "pan") {
        span.textContent = "Submit Application";
      } else {
        span.textContent = "Proceed to Pay";
      }
    });
  });

  // Helper function to switch tabs programmatically
  const switchSimTab = (tabName) => {
    const targetTab = document.querySelector(`.sim-tab[data-tab="${tabName}"]`);
    if (targetTab) {
      targetTab.click();
    }
  };

  // Connect service links to simulator tabs
  const serviceLinks = document.querySelectorAll("[data-target-tab]");
  serviceLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const tabName = link.getAttribute("data-target-tab");
      switchSimTab(tabName);
    });
  });

  // Simulator Form Submission Action
  if (simBtn) {
    simBtn.addEventListener("click", () => {
      // Validation
      let isValid = true;
      let errorMsg = "";

      if (activeTab === "mobile") {
        const mobNum = document.getElementById("mob-number").value;
        const operator = document.getElementById("mob-operator").value;
        const circle = document.getElementById("mob-circle").value;
        const amount = document.getElementById("mob-amount").value;

        if (!/^\d{10}$/.test(mobNum)) {
          isValid = false;
          errorMsg = "Please enter a valid 10-digit mobile number.";
        } else if (!operator) {
          isValid = false;
          errorMsg = "Please select a mobile operator.";
        } else if (!circle) {
          isValid = false;
          errorMsg = "Please select your regional circle.";
        } else if (!amount) {
          isValid = false;
          errorMsg = "Please select a recharge plan.";
        }

        if (isValid) {
          successMessage.textContent = `Recharge of ₹${amount} successfully completed for +91 ${mobNum} (${operator.toUpperCase()}).`;
        }
      } else if (activeTab === "dth") {
        const operator = document.getElementById("dth-operator").value;
        const dthId = document.getElementById("dth-id").value;
        const amount = document.getElementById("dth-amount").value;

        if (!operator) {
          isValid = false;
          errorMsg = "Please select a DTH operator.";
        } else if (dthId.trim() === "") {
          isValid = false;
          errorMsg = "Please enter your Customer ID.";
        } else if (!amount || Number(amount) <= 0) {
          isValid = false;
          errorMsg = "Please enter a valid recharge amount.";
        }

        if (isValid) {
          successMessage.textContent = `DTH recharge of ₹${amount} completed for ID ${dthId} (${operator.toUpperCase()}).`;
        }
      } else if (activeTab === "pan") {
        const panType = document.getElementById("pan-type").value;
        const name = document.getElementById("pan-name").value;
        const email = document.getElementById("pan-email").value;

        if (!panType) {
          isValid = false;
          errorMsg = "Please choose a PAN card application type.";
        } else if (name.trim().length < 3) {
          isValid = false;
          errorMsg = "Please enter the applicant's full name (min 3 characters).";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          isValid = false;
          errorMsg = "Please enter a valid email address.";
        }

        if (isValid) {
          const serviceNames = {
            new: "New PAN Card Application",
            correct: "PAN Correction Form",
            duplicate: "Duplicate PAN Card Reprint"
          };
          successMessage.textContent = `Your ${serviceNames[panType]} has been registered for ${name}. Check confirmation email at ${email}.`;
        }
      }

      if (!isValid) {
        alert(errorMsg);
        return;
      }

      // Show loader
      simLoader.classList.add("active");
      simLoader.setAttribute("aria-hidden", "false");

      // Set random transaction ID
      const randomTxn = "TXN" + Math.floor(10000000 + Math.random() * 90000000);
      receiptRef.textContent = randomTxn;

      // Simulate API Settlement delay
      setTimeout(() => {
        simLoader.classList.remove("active");
        simLoader.setAttribute("aria-hidden", "true");
        
        simSuccess.classList.add("active");
        simSuccess.setAttribute("aria-hidden", "false");
      }, 2000);
    });
  }

  // Reset simulator
  if (simResetBtn) {
    simResetBtn.addEventListener("click", () => {
      // Clear forms
      document.getElementById("mob-number").value = "";
      document.getElementById("mob-operator").value = "";
      document.getElementById("mob-circle").value = "";
      document.getElementById("mob-amount").value = "";
      document.getElementById("dth-operator").value = "";
      document.getElementById("dth-id").value = "";
      document.getElementById("dth-amount").value = "";
      document.getElementById("pan-type").value = "";
      document.getElementById("pan-name").value = "";
      document.getElementById("pan-email").value = "";

      // Hide success overlay
      simSuccess.classList.remove("active");
      simSuccess.setAttribute("aria-hidden", "true");
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById("back-to-top");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Callback form simulation
  const callbackSubmitBtn = document.getElementById("contact-submit-btn");
  if (callbackSubmitBtn) {
    callbackSubmitBtn.addEventListener("click", () => {
      const name = document.getElementById("contact-name").value;
      const email = document.getElementById("contact-email").value;
      const tel = document.getElementById("contact-tel").value;

      if (name.trim() === "" || email.trim() === "" || tel.trim() === "") {
        alert("Please fill in all contact fields.");
        return;
      }

      alert(`Thank you, ${name}! Your callback request is registered. A representative will contact you at ${tel} shortly.`);
      
      // Reset contact fields
      document.getElementById("contact-name").value = "";
      document.getElementById("contact-email").value = "";
      document.getElementById("contact-tel").value = "";
    });
  }
});
