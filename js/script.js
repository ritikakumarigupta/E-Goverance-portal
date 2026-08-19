/**
 * SevaSetu – E-Governance Portal
 * Core Interactive JavaScript Engine
 * Features:
 *  1. Hamburger Mobile Navigation
 *  2. Service Application Modal with Comprehensive Client-Side Validation
 *  3. Dynamic Real-Time Search & Category Filter (Services & Schemes)
 *  4. Scheme Details Modal & Learn More Engine
 *  5. Citizen & Official Login / Register Modal with Tab Switching
 *  6. Contact Form Validation
 *  7. Toast Notification System
 *  8. Back-to-Top Floating Button
 *  9. Animated Statistics Counters
 * 10. Accessibility Font Resizer & FAQ Accordion
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initAccessibilityResizer();
  initHamburgerNav();
  initActiveNavLink();
  initDynamicSearchFilter();
  initServiceApplicationModal();
  initSchemeDetailsModal();
  initLoginRegisterModal();
  initContactForm();
  initBackToTop();
  initFaqAccordion();
  initStatCounters();
  initHeaderScrollEffect();
});

/* ==========================================================================
   1. ACCESSIBILITY FONT RESIZER
   ========================================================================== */
function initAccessibilityResizer() {
  const btnDecrease = document.getElementById('fontDecBtn');
  const btnReset = document.getElementById('fontResetBtn');
  const btnIncrease = document.getElementById('fontIncBtn');

  let currentScale = 16; // base 16px

  if (btnDecrease) {
    btnDecrease.addEventListener('click', () => {
      if (currentScale > 13) {
        currentScale -= 1;
        document.documentElement.style.fontSize = `${currentScale}px`;
        showToast('Accessibility', `Font size decreased to ${currentScale}px`, 'info');
      }
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      currentScale = 16;
      document.documentElement.style.fontSize = `16px`;
      showToast('Accessibility', 'Font size reset to standard default (16px)', 'info');
    });
  }

  if (btnIncrease) {
    btnIncrease.addEventListener('click', () => {
      if (currentScale < 20) {
        currentScale += 1;
        document.documentElement.style.fontSize = `${currentScale}px`;
        showToast('Accessibility', `Font size increased to ${currentScale}px`, 'info');
      }
    });
  }
}

/* ==========================================================================
   2. INTERACTIVE COMPONENT 1 – HAMBURGER NAVIGATION
   ========================================================================== */
function initHamburgerNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburgerBtn || !mainNav) return;

  function openMenu() {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mainNav.classList.add('nav-active');
    if (navBackdrop) navBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mainNav.classList.remove('nav-active');
    if (navBackdrop) navBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mainNav.classList.contains('nav-active');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking a navigation link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 860) {
        closeMenu();
      }
    });
  });

  // Close menu on backdrop click
  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMenu);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('nav-active')) {
      closeMenu();
    }
  });

  // Reset when window resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && mainNav.classList.contains('nav-active')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. ACTIVE NAVIGATION LINK DETECTION
   ========================================================================== */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   4. INTERACTIVE COMPONENT 2 – SERVICE APPLICATION MODAL
   ========================================================================== */
function initServiceApplicationModal() {
  const modal = document.getElementById('serviceApplyModal');
  if (!modal) return;

  const closeBtns = modal.querySelectorAll('.modal-close-trigger');
  const applyForm = document.getElementById('serviceApplyForm');
  const modalFormContainer = document.getElementById('modalFormView');
  const modalSuccessContainer = document.getElementById('modalSuccessView');
  const serviceSelect = document.getElementById('applyServiceSelect');
  const modalTitle = document.getElementById('applyModalTitle');
  const appAckIdSpan = document.getElementById('appAckId');
  const newAppBtn = document.getElementById('startNewAppBtn');

  // Open modal triggers from Service Cards
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-apply-service]');
    if (!trigger) return;

    e.preventDefault();
    const serviceName = trigger.getAttribute('data-apply-service');
    openApplyModal(serviceName);
  });

  function openApplyModal(serviceName = '') {
    // Reset view states
    if (modalFormContainer) modalFormContainer.style.display = 'block';
    if (modalSuccessContainer) modalSuccessContainer.classList.remove('show');
    if (applyForm) applyForm.reset();
    clearAllFormErrors(applyForm);

    // Set service dropdown selection if provided
    if (serviceSelect && serviceName) {
      for (let option of serviceSelect.options) {
        if (option.value.toLowerCase() === serviceName.toLowerCase() || option.text.toLowerCase().includes(serviceName.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
      if (modalTitle) {
        modalTitle.textContent = `Apply for ${serviceName}`;
      }
    } else if (modalTitle) {
      modalTitle.textContent = 'Apply for E-Service';
    }

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first input
    const firstInput = modal.querySelector('input:not([type="hidden"])');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  function closeApplyModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Close handlers
  closeBtns.forEach((btn) => btn.addEventListener('click', closeApplyModal));

  // Outside backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeApplyModal();
    }
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeApplyModal();
    }
  });

  if (newAppBtn) {
    newAppBtn.addEventListener('click', () => {
      if (modalFormContainer) modalFormContainer.style.display = 'block';
      if (modalSuccessContainer) modalSuccessContainer.classList.remove('show');
      if (applyForm) applyForm.reset();
      clearAllFormErrors(applyForm);
    });
  }

  // Form Validation & Submission
  if (applyForm) {
    // Real-time input validation
    const nameInput = document.getElementById('applyFullName');
    const emailInput = document.getElementById('applyEmail');
    const phoneInput = document.getElementById('applyPhone');
    const serviceInput = document.getElementById('applyServiceSelect');
    const descInput = document.getElementById('applyDescription');
    const agreeCheck = document.getElementById('applyAgree');

    if (nameInput) nameInput.addEventListener('input', () => validateFullName(nameInput));
    if (emailInput) emailInput.addEventListener('input', () => validateEmail(emailInput));
    if (phoneInput) phoneInput.addEventListener('input', () => validatePhone(phoneInput));
    if (serviceInput) serviceInput.addEventListener('change', () => validateServiceSelect(serviceInput));

    applyForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateFullName(nameInput);
      const isEmailValid = validateEmail(emailInput);
      const isPhoneValid = validatePhone(phoneInput);
      const isServiceValid = validateServiceSelect(serviceInput);
      const isCheckValid = validateCheckbox(agreeCheck, 'You must declare and accept the verification terms.');

      if (isNameValid && isEmailValid && isPhoneValid && isServiceValid && isCheckValid) {
        const submitBtn = applyForm.querySelector('button[type="submit"]');
        const origBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Application';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon" style="animation: spin 0.8s linear infinite;">
              <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
              <path d="M12 2a10 10 0 0 1 10 10"></path>
            </svg> Submitting...
          `;
        }

        // Simulate secure submission
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = origBtnText;
          }

          // Generate Application ID
          const randomId = 'SS-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
          if (appAckIdSpan) appAckIdSpan.textContent = randomId;

          // Switch views inside modal
          if (modalFormContainer) modalFormContainer.style.display = 'none';
          if (modalSuccessContainer) modalSuccessContainer.classList.add('show');

          // Trigger Success Toast
          showToast(
            'Application Submitted!',
            `Application ID ${randomId} registered successfully. An SMS confirmation was sent to ${phoneInput.value}.`,
            'success'
          );
        }, 600);
      } else {
        showToast('Validation Error', 'Please correct the highlighted fields in the application form.', 'error');
      }
    });
  }
}

/* ==========================================================================
   5. INTERACTIVE COMPONENT 3 – DYNAMIC SEARCH & FILTER
   ========================================================================== */
function initDynamicSearchFilter() {
  const searchInput = document.getElementById('portalSearchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const resultCounter = document.getElementById('searchResultCount');
  const noResultsCard = document.getElementById('noResultsCard');
  const resetSearchBtn = document.getElementById('resetSearchBtn');

  const serviceCards = document.querySelectorAll('.service-card');
  const schemeCards = document.querySelectorAll('.scheme-card');

  if (!searchInput && filterTabs.length === 0) return;

  let activeCategory = 'all';
  let searchTerm = '';

  function performFilter() {
    let visibleCount = 0;
    const query = searchTerm.toLowerCase().trim();

    // 1. Filter Service Cards
    serviceCards.forEach((card) => {
      const title = (card.querySelector('.service-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.service-desc')?.textContent || '').toLowerCase();
      const category = (card.getAttribute('data-category') || '').toLowerCase();

      const matchesSearch = !query || title.includes(query) || desc.includes(query) || category.includes(query);
      const matchesCategory = activeCategory === 'all' || category === activeCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // 2. Filter Scheme Cards
    schemeCards.forEach((card) => {
      const title = (card.querySelector('.scheme-title')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.scheme-desc')?.textContent || '').toLowerCase();
      const ministry = (card.querySelector('.scheme-ministry')?.textContent || '').toLowerCase();
      const category = (card.getAttribute('data-category') || '').toLowerCase();

      const matchesSearch = !query || title.includes(query) || desc.includes(query) || ministry.includes(query) || category.includes(query);
      const matchesCategory = activeCategory === 'all' || category === activeCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // 3. Update Result Counter
    if (resultCounter) {
      const totalItems = serviceCards.length + schemeCards.length;
      resultCounter.textContent = `Showing ${visibleCount} of ${totalItems} items`;
    }

    // 4. Toggle "No Results" Card
    if (noResultsCard) {
      if (visibleCount === 0) {
        noResultsCard.style.display = 'block';
      } else {
        noResultsCard.style.display = 'none';
      }
    }
  }

  // Search Input Event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = searchTerm.length > 0 ? 'inline-flex' : 'none';
      }
      performFilter();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchTerm = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        performFilter();
      });
    }
  }

  // Category Tag Buttons
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-filter') || 'all';
      performFilter();
    });
  });

  // Reset Button on Empty State
  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchTerm = '';
      }
      if (clearBtn) clearBtn.style.display = 'none';

      activeCategory = 'all';
      filterTabs.forEach((t) => {
        if (t.getAttribute('data-filter') === 'all') {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });

      performFilter();
    });
  }
}

/* ==========================================================================
   6. SCHEME DETAILS MODAL (Learn More Component)
   ========================================================================== */
const SCHEME_DETAILS_DATA = {
  'pm-kisan': {
    title: 'PM Kisan Samman Nidhi',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    desc: 'Central Sector Scheme with 100% funding from Government of India to provide income support to all landholding farmers families across the country.',
    benefit: 'Direct Benefit Transfer (DBT) of ₹6,000 per year paid in three equal four-monthly installments of ₹2,000 directly into the bank accounts of eligible farmers.',
    eligibility: 'All landholding farmer families having cultivable land in their names (subject to exclusion criteria for high-income taxpayers).',
    documents: ['Aadhaar Card', 'Land Ownership Records (Khata/Khasra)', 'Valid Bank Passbook with IFSC', 'Active Mobile Number linked with Aadhaar']
  },
  'ayushman-bharat': {
    title: 'Ayushman Bharat (PM-JAY)',
    ministry: 'Ministry of Health and Family Welfare',
    desc: 'World’s largest government funded health assurance scheme, aiming to provide free secondary and tertiary healthcare coverage to underprivileged families.',
    benefit: 'Cashless health cover of up to ₹5,00,000 per family per year for secondary and tertiary care hospitalization across empanelled public and private hospitals.',
    eligibility: 'Families identified based on the deprivation and occupational criteria of the Socio-Economic Caste Census (SECC 2011).',
    documents: ['Aadhaar Card or Ration Card', 'Proof of Family Identification', 'Mobile Number for OTP Verification']
  },
  'digital-india': {
    title: 'Digital India Initiative',
    ministry: 'Ministry of Electronics and Information Technology (MeitY)',
    desc: 'Flagship programme of the Government of India with a vision to transform India into a digitally empowered society and knowledge economy.',
    benefit: 'Universal digital infrastructure as a utility to every citizen, governance & services on demand, and digital empowerment through DigiLocker, UMANG, and SevaSetu.',
    eligibility: 'Open to all Indian citizens, educational institutions, startups, and rural entrepreneurs.',
    documents: ['Aadhaar Card', 'Digital Identity Authentication']
  },
  'pm-awas-yojana': {
    title: 'Pradhan Mantri Awas Yojana (PMAY)',
    ministry: 'Ministry of Housing and Urban Affairs',
    desc: 'Flagship mission to provide pucca houses with basic amenities to all eligible urban and rural poor families.',
    benefit: 'Financial assistance and interest subsidy up to ₹2.67 Lakhs on home loans for Economically Weaker Section (EWS) and Low-Income Group (LIG).',
    eligibility: 'Beneficiary family must not own a pucca house in their name anywhere in India, and household annual income must meet category slabs.',
    documents: ['Aadhaar Card', 'Income Certificate', 'Bank Account Statement', 'Affidavit of Non-Ownership of Pucca House']
  },
  'skill-india': {
    title: 'Skill India Mission (PMKVY)',
    ministry: 'Ministry of Skill Development and Entrepreneurship',
    desc: 'Flagship outcome-based skill training scheme for youth to enable them to take up industry-relevant training for better livelihoods.',
    benefit: 'Free NSQF-aligned vocational skill certification, training rewards, job placement assistance, and entrepreneurship toolkits.',
    eligibility: 'Indian youth aged 15-45 who are school/college dropouts or looking to acquire industry-ready technical skills.',
    documents: ['Aadhaar Card', 'Educational Marksheets', 'Bank Account Details', 'Passport Size Photograph']
  },
  'beti-bachao': {
    title: 'Beti Bachao Beti Padhao',
    ministry: 'Ministry of Women and Child Development',
    desc: 'National campaign to generate awareness and improve the efficiency of welfare services intended for girl children across India.',
    benefit: 'Financial empowerment through high-interest tax-free Sukanya Samriddhi Accounts, education support grants, and prevention of gender-biased sex selection.',
    eligibility: 'Girl children who are citizens of India from birth until 10 years of age for account opening.',
    documents: ['Birth Certificate of Girl Child', 'Identity & Residence Proof of Parents/Guardians', 'Bank Account Details']
  }
};

function initSchemeDetailsModal() {
  const modal = document.getElementById('schemeDetailsModal');
  if (!modal) return;

  const closeBtns = modal.querySelectorAll('.modal-close-trigger');
  const titleElem = document.getElementById('schemeDetailTitle');
  const ministryElem = document.getElementById('schemeDetailMinistry');
  const descElem = document.getElementById('schemeDetailDesc');
  const benefitElem = document.getElementById('schemeDetailBenefit');
  const eligibilityElem = document.getElementById('schemeDetailEligibility');
  const docsListElem = document.getElementById('schemeDetailDocs');
  const applySchemeBtn = document.getElementById('schemeApplyDirectBtn');

  let currentSchemeKey = '';

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-scheme-key]');
    if (!trigger) return;

    e.preventDefault();
    const schemeKey = trigger.getAttribute('data-scheme-key');
    const data = SCHEME_DETAILS_DATA[schemeKey];

    if (data) {
      currentSchemeKey = schemeKey;
      if (titleElem) titleElem.textContent = data.title;
      if (ministryElem) ministryElem.textContent = data.ministry;
      if (descElem) descElem.textContent = data.desc;
      if (benefitElem) benefitElem.textContent = data.benefit;
      if (eligibilityElem) eligibilityElem.textContent = data.eligibility;

      if (docsListElem) {
        docsListElem.innerHTML = data.documents
          .map((doc) => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#046A38" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> ${doc}</li>`)
          .join('');
      }

      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  });

  function closeSchemeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtns.forEach((btn) => btn.addEventListener('click', closeSchemeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSchemeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeSchemeModal();
    }
  });

  // Direct Apply button from Scheme modal
  if (applySchemeBtn) {
    applySchemeBtn.addEventListener('click', () => {
      const data = SCHEME_DETAILS_DATA[currentSchemeKey];
      closeSchemeModal();
      setTimeout(() => {
        const applyBtn = document.querySelector(`[data-apply-service="${data ? data.title : ''}"]`);
        if (applyBtn) {
          applyBtn.click();
        } else {
          // Trigger generic apply
          const anyApplyBtn = document.querySelector('[data-apply-service]');
          if (anyApplyBtn) anyApplyBtn.click();
        }
      }, 200);
    });
  }
}

/* ==========================================================================
   7. LOGIN / REGISTER MODAL WITH TAB SWITCHING
   ========================================================================== */
function initLoginRegisterModal() {
  const modal = document.getElementById('loginModal');
  if (!modal) return;

  const openTriggers = document.querySelectorAll('.open-login-modal');
  const closeBtns = modal.querySelectorAll('.modal-close-trigger');
  const tabs = modal.querySelectorAll('.modal-tab-btn');
  const tabPanes = modal.querySelectorAll('.auth-tab-pane');

  const citizenForm = document.getElementById('citizenLoginForm');
  const officialForm = document.getElementById('officialLoginForm');
  const registerForm = document.getElementById('registerForm');

  openTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLoginModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtns.forEach((btn) => btn.addEventListener('click', closeLoginModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLoginModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeLoginModal();
    }
  });

  // Tab switching
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      tabs.forEach((t) => t.classList.remove('active'));
      tabPanes.forEach((p) => (p.style.display = 'none'));

      tab.classList.add('active');
      const activePane = document.getElementById(targetId);
      if (activePane) activePane.style.display = 'block';
    });
  });

  // Password Visibility Toggles
  const togglePassBtns = modal.querySelectorAll('.toggle-password-btn');
  togglePassBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetInputId = btn.getAttribute('data-target');
      const input = document.getElementById(targetInputId);
      if (input) {
        const isPass = input.type === 'password';
        input.type = isPass ? 'text' : 'password';
        btn.innerHTML = isPass
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      }
    });
  });

  // Citizen Login Form Submission
  if (citizenForm) {
    citizenForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mobile = document.getElementById('citizenLoginPhone');
      if (validatePhone(mobile)) {
        closeLoginModal();
        showToast('Login Successful', `Welcome back! Citizen session authenticated for +91 ${mobile.value}.`, 'success');
        citizenForm.reset();
      } else {
        showToast('Authentication Error', 'Please enter a valid 10-digit registered mobile number.', 'error');
      }
    });
  }

  // Official Login Form Submission
  if (officialForm) {
    officialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const govEmail = document.getElementById('govOfficialEmail');
      const govPass = document.getElementById('govOfficialPassword');
      if (validateEmail(govEmail) && govPass.value.trim().length >= 6) {
        closeLoginModal();
        showToast('Officer Authenticated', 'Official NIC Government portal session authorized.', 'success');
        officialForm.reset();
      } else {
        showToast('Error', 'Please enter valid department credentials.', 'error');
      }
    });
  }

  // Register Form Submission
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const regName = document.getElementById('regFullName');
      const regEmail = document.getElementById('regEmail');
      const regPhone = document.getElementById('regPhone');

      if (validateFullName(regName) && validateEmail(regEmail) && validatePhone(regPhone)) {
        closeLoginModal();
        showToast('Registration Successful', `SevaSetu Citizen ID created for ${regName.value}. You may now log in.`, 'success');
        registerForm.reset();
      } else {
        showToast('Registration Failed', 'Please complete all required fields accurately.', 'error');
      }
    });
  }
}

/* ==========================================================================
   8. CONTACT FORM VALIDATION
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactHelpForm');
  if (!contactForm) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');

  if (nameInput) nameInput.addEventListener('input', () => validateFullName(nameInput));
  if (emailInput) emailInput.addEventListener('input', () => validateEmail(emailInput));
  if (phoneInput) phoneInput.addEventListener('input', () => validatePhone(phoneInput));
  if (subjectInput) subjectInput.addEventListener('input', () => validateNotEmpty(subjectInput, 'Please specify a subject.'));
  if (messageInput) messageInput.addEventListener('input', () => validateMinLength(messageInput, 10, 'Message must be at least 10 characters.'));

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateFullName(nameInput);
    const isEmailValid = validateEmail(emailInput);
    const isPhoneValid = validatePhone(phoneInput);
    const isSubjectValid = validateNotEmpty(subjectInput, 'Please enter a ticket subject.');
    const isMsgValid = validateMinLength(messageInput, 10, 'Please describe your query in at least 10 characters.');

    if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMsgValid) {
      const ticketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
      showToast(
        'Grievance / Ticket Registered',
        `Thank you, ${nameInput.value}. Your ticket #${ticketId} has been logged. Helpdesk will contact you within 24 hours.`,
        'success'
      );
      contactForm.reset();
      clearAllFormErrors(contactForm);
    } else {
      showToast('Form Error', 'Please correct the highlighted errors in the grievance form.', 'error');
    }
  });
}

/* ==========================================================================
   9. GLOBAL FORM VALIDATION HELPER FUNCTIONS
   ========================================================================== */
function setFieldError(inputElement, errorMessage) {
  if (!inputElement) return false;
  inputElement.classList.add('is-invalid');
  inputElement.classList.remove('is-valid');

  const container = inputElement.closest('.form-group') || inputElement.parentElement;
  let feedback = container.querySelector('.form-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.className = 'form-feedback error';
    container.appendChild(feedback);
  }
  feedback.className = 'form-feedback error';
  feedback.textContent = errorMessage;
  return false;
}

function setFieldValid(inputElement) {
  if (!inputElement) return true;
  inputElement.classList.remove('is-invalid');
  inputElement.classList.add('is-valid');

  const container = inputElement.closest('.form-group') || inputElement.parentElement;
  const feedback = container.querySelector('.form-feedback');
  if (feedback) {
    feedback.className = 'form-feedback valid';
    feedback.textContent = '';
  }
  return true;
}

function clearAllFormErrors(form) {
  if (!form) return;
  const inputs = form.querySelectorAll('.form-control');
  inputs.forEach((input) => {
    input.classList.remove('is-invalid', 'is-valid');
  });
  const feedbacks = form.querySelectorAll('.form-feedback');
  feedbacks.forEach((fb) => (fb.textContent = ''));
}

function validateFullName(input) {
  if (!input) return false;
  const val = input.value.trim();
  if (val.length < 3) {
    return setFieldError(input, 'Full name must contain at least 3 characters.');
  }
  if (!/^[a-zA-Z\s.'-]+$/.test(val)) {
    return setFieldError(input, 'Name can only contain letters, spaces and dots.');
  }
  return setFieldValid(input);
}

function validateEmail(input) {
  if (!input) return false;
  const val = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!val) {
    return setFieldError(input, 'Email address is required.');
  }
  if (!emailRegex.test(val)) {
    return setFieldError(input, 'Please provide a valid email address (e.g. citizen@nic.in).');
  }
  return setFieldValid(input);
}

function validatePhone(input) {
  if (!input) return false;
  const val = input.value.trim().replace(/\D/g, ''); // strip non-digits
  if (!val) {
    return setFieldError(input, '10-digit mobile number is required.');
  }
  // Exactly 10 digits starting with 6, 7, 8, or 9
  if (!/^[6-9]\d{9}$/.test(val)) {
    return setFieldError(input, 'Must be an exact 10-digit Indian mobile number (starts with 6-9).');
  }
  return setFieldValid(input);
}

function validateServiceSelect(select) {
  if (!select) return false;
  if (!select.value || select.value === '') {
    return setFieldError(select, 'Please select a government service from the list.');
  }
  return setFieldValid(select);
}

function validateNotEmpty(input, errorMsg = 'This field is required.') {
  if (!input) return false;
  if (input.value.trim().length === 0) {
    return setFieldError(input, errorMsg);
  }
  return setFieldValid(input);
}

function validateMinLength(input, minLen, errorMsg) {
  if (!input) return false;
  if (input.value.trim().length < minLen) {
    return setFieldError(input, errorMsg || `Must be at least ${minLen} characters.`);
  }
  return setFieldValid(input);
}

function validateCheckbox(checkbox, errorMsg) {
  if (!checkbox) return true;
  if (!checkbox.checked) {
    showToast('Declaration Required', errorMsg, 'error');
    return false;
  }
  return true;
}

/* ==========================================================================
   10. TOAST NOTIFICATION ENGINE
   ========================================================================== */
function showToast(title, message, type = 'success', duration = 4500) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconSvg =
    type === 'success'
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : type === 'error'
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close-btn" aria-label="Close notification">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 20);

  // Close button
  const closeBtn = toast.querySelector('.toast-close-btn');
  closeBtn.addEventListener('click', () => removeToast(toast));

  // Auto dismiss
  const timer = setTimeout(() => removeToast(toast), duration);

  function removeToast(elem) {
    clearTimeout(timer);
    elem.classList.remove('show');
    setTimeout(() => {
      if (elem.parentNode) elem.parentNode.removeChild(elem);
    }, 350);
  }
}

/* ==========================================================================
   11. BACK-TO-TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   12. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach((other) => other.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   13. STATISTIC COUNTERS ANIMATION
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('[data-target-stat]');
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target-stat'), 10) || 0;
          const suffix = el.getAttribute('data-stat-suffix') || '';
          animateNumber(el, 0, target, suffix, 1400);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((num) => observer.observe(num));

  function animateNumber(element, start, end, suffix, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad formula
      const current = Math.floor(start + (end - start) * (1 - Math.pow(1 - progress, 3)));
      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = end + suffix;
      }
    }

    requestAnimationFrame(update);
  }
}

/* ==========================================================================
   14. HEADER SCROLL SHADOW EFFECT
   ========================================================================== */
function initHeaderScrollEffect() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}
