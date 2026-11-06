/**
 * BE FIT RAIPUR - Luxury Fitness Club
 * Interactive Web Experience Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBMICalculator();
  initScheduleTabs();
  initGalleryFilter();
  initFAQAccordion();
  initVIPPassModal();
  initStatsCounter();
});

// 1. Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// 2. Interactive BMI & Calorie Calculator
function initBMICalculator() {
  const heightInput = document.getElementById('bmi-height');
  const weightInput = document.getElementById('bmi-weight');
  const ageInput = document.getElementById('bmi-age');
  const genderInputs = document.querySelectorAll('input[name="bmi-gender"]');
  const heightValText = document.getElementById('bmi-height-val');
  const weightValText = document.getElementById('bmi-weight-val');

  const bmiScore = document.getElementById('bmi-score');
  const bmiBadge = document.getElementById('bmi-badge');
  const bmiSummary = document.getElementById('bmi-summary');
  const bmiCalories = document.getElementById('bmi-calories');
  const bmiProgramRec = document.getElementById('bmi-program-rec');

  function calculateBMI() {
    if (!heightInput || !weightInput) return;

    const heightCm = parseFloat(heightInput.value);
    const weightKg = parseFloat(weightInput.value);
    const age = parseInt(ageInput ? ageInput.value : 25) || 25;

    if (heightValText) heightValText.innerText = `${heightCm} cm`;
    if (weightValText) weightValText.innerText = `${weightKg} kg`;

    const heightM = heightCm / 100;
    const bmi = (weightKg / (heightM * heightM)).toFixed(1);

    if (bmiScore) bmiScore.innerText = bmi;

    let category = '';
    let badgeClass = '';
    let recommendation = '';
    let recommendedProgram = '';
    let targetCalories = 0;

    // Standard BMR rough estimation for fitness gym guidance
    const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    const maintenanceCalories = Math.round(bmr * 1.4);

    if (bmi < 18.5) {
      category = 'Underweight (Hypertrophy Target)';
      badgeClass = 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      recommendation = 'Focus on high-protein caloric surplus & heavy progressive strength training.';
      recommendedProgram = 'Be Fit Muscle Hypertrophy Program';
      targetCalories = maintenanceCalories + 400;
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      category = 'Optimal Fitness / Athletic';
      badgeClass = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      recommendation = 'Great baseline! Perfect for lean body recomposition & athletic conditioning.';
      recommendedProgram = 'Be Fit CrossFit & Athletic Conditioning';
      targetCalories = maintenanceCalories;
    } else if (bmi >= 25 && bmi <= 29.9) {
      category = 'Overweight / Cutting Target';
      badgeClass = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      recommendation = 'Moderate caloric deficit with high-intensity interval training & heavy resistance.';
      recommendedProgram = 'Be Fit 90-Day Fat Loss & HIIT Camp';
      targetCalories = maintenanceCalories - 450;
    } else {
      category = 'High Fat Mass Target';
      badgeClass = 'bg-red-500/20 text-red-400 border-red-500/30';
      recommendation = 'Structured cardiovascular endurance, guided mobility, and certified coach monitoring.';
      recommendedProgram = 'Be Fit 1-on-1 Personal Transformation';
      targetCalories = maintenanceCalories - 600;
    }

    if (bmiBadge) {
      bmiBadge.innerText = category;
      bmiBadge.className = `inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeClass}`;
    }
    if (bmiSummary) {
      bmiSummary.innerText = recommendation;
    }
    if (bmiCalories) {
      bmiCalories.innerText = `${targetCalories} kcal / day`;
    }
    if (bmiProgramRec) {
      bmiProgramRec.innerText = recommendedProgram;
    }
  }

  if (heightInput && weightInput) {
    heightInput.addEventListener('input', calculateBMI);
    weightInput.addEventListener('input', calculateBMI);
    if (ageInput) ageInput.addEventListener('input', calculateBMI);
    genderInputs.forEach(radio => radio.addEventListener('change', calculateBMI));
    calculateBMI();
  }
}

// 3. Weekly Schedule Tabs
function initScheduleTabs() {
  const scheduleTabs = document.querySelectorAll('.schedule-tab');
  const scheduleLists = document.querySelectorAll('.schedule-day-content');

  scheduleTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetDay = tab.getAttribute('data-day');

      scheduleTabs.forEach(t => {
        t.classList.remove('bg-amber-400', 'text-black', 'font-bold');
        t.classList.add('bg-zinc-900', 'text-zinc-300', 'hover:bg-zinc-800');
      });

      tab.classList.remove('bg-zinc-900', 'text-zinc-300', 'hover:bg-zinc-800');
      tab.classList.add('bg-amber-400', 'text-black', 'font-bold');

      scheduleLists.forEach(content => {
        if (content.id === `schedule-${targetDay}`) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });
}

// 4. Interactive Gallery Filter
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-400', 'text-black');
        b.classList.add('bg-zinc-900', 'text-zinc-300', 'hover:bg-zinc-800');
      });

      btn.classList.remove('bg-zinc-900', 'text-zinc-300', 'hover:bg-zinc-800');
      btn.classList.add('bg-amber-400', 'text-black');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

// 5. FAQ Accordion
function initFAQAccordion() {
  const faqButtons = document.querySelectorAll('.faq-toggle');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const icon = button.querySelector('.faq-icon');
      const isExpanded = !answer.classList.contains('hidden');

      // Close other opened FAQs
      document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(ic => ic.classList.remove('rotate-180'));

      if (!isExpanded) {
        answer.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

// 6. VIP Free Pass Modal Generator with WhatsApp Action
function initVIPPassModal() {
  const openButtons = document.querySelectorAll('.open-pass-modal');
  const closeButton = document.getElementById('close-pass-modal');
  const modal = document.getElementById('pass-modal');
  const passForm = document.getElementById('vip-pass-form');
  const passCardPreview = document.getElementById('pass-card-preview');

  const cardMemberName = document.getElementById('card-member-name');
  const cardPassId = document.getElementById('card-pass-id');
  const cardGoal = document.getElementById('card-goal');
  const cardSlot = document.getElementById('card-slot');
  const cardDate = document.getElementById('card-date');
  const whatsappConfirmBtn = document.getElementById('whatsapp-confirm-pass');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });

  if (passForm) {
    passForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('pass-name').value.trim() || 'Valued Member';
      const phone = document.getElementById('pass-phone').value.trim() || 'Not Provided';
      const slot = document.getElementById('pass-slot').value;
      const goal = document.getElementById('pass-goal').value;

      // Generate Unique Pass Number
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const passId = `BFR-VIP-${randomCode}`;
      const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

      // Update Card Visual
      if (cardMemberName) cardMemberName.innerText = name;
      if (cardPassId) cardPassId.innerText = passId;
      if (cardGoal) cardGoal.innerText = goal;
      if (cardSlot) cardSlot.innerText = slot;
      if (cardDate) cardDate.innerText = today;

      // Show Card
      if (passCardPreview) {
        passCardPreview.classList.remove('hidden');
      }

      // Hide the initial form fields
      passForm.classList.add('hidden');

      // WhatsApp Button configuration
      const gymWhatsAppNumber = '917828888438'; // Be Fit Raipur Official Phone
      const textMessage = encodeURIComponent(
        `Hello Be Fit Raipur!\n\n` +
        `I have just generated my complimentary 1-Day VIP Pass on your website.\n\n` +
        `🎟️ Pass ID: ${passId}\n` +
        `👤 Name: ${name}\n` +
        `📱 Phone: ${phone}\n` +
        `🎯 Fitness Goal: ${goal}\n` +
        `⏰ Preferred Time Slot: ${slot}\n` +
        `📍 Location: KRC Tower, Mahadev Ghat Road, Raipur\n\n` +
        `Please confirm my slot so I can visit today!`
      );

      if (whatsappConfirmBtn) {
        whatsappConfirmBtn.href = `https://wa.me/${gymWhatsAppNumber}?text=${textMessage}`;
      }
    });
  }
}

// 7. Dynamic Stats Counter on Scroll
function initStatsCounter() {
  const statsElements = document.querySelectorAll('.stat-counter');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statsElements.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target')) || 0;
          const suffix = stat.getAttribute('data-suffix') || '';
          let count = 0;
          const stepTime = 2000 / target;

          const interval = setInterval(() => {
            count += Math.ceil(target / 40);
            if (count >= target) {
              stat.innerText = target + suffix;
              clearInterval(interval);
            } else {
              stat.innerText = count + suffix;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.3 });

  const statSection = document.getElementById('stats-section');
  if (statSection) {
    observer.observe(statSection);
  }
}

