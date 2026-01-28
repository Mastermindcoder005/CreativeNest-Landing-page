// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Throttle function to limit execution frequency
const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

mobileMenuBtn?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between menu and x
    const icon = mobileMenuBtn.querySelector('i, svg');
    if (navLinks.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    window.lucide?.createIcons();
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn?.querySelector('i, svg');
        icon?.setAttribute('data-lucide', 'menu');
        window.lucide?.createIcons();
    });
});

// Header scroll effect with throttling
const header = document.querySelector('.glass-header');
window.addEventListener('scroll', throttle(() => {
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 100));

// Background parallax shapes with throttling
document.addEventListener('mousemove', throttle((e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${x * 360}deg)`;
    });
}, 50));

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Apply animations to all sections except contact (which we want always visible to be safe)
document.querySelectorAll('section:not(#contact), .service-card, .team-card, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Contact Form Handler
const contactForm = document.getElementById('message-form');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;

    // Simulate success
    setTimeout(() => {
        btn.innerHTML = '<span>Message Sent!</span><i data-lucide="check"></i>';
        window.lucide?.createIcons();
        contactForm.reset();

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            window.lucide?.createIcons();
        }, 3000);
    }, 1500);
});

// Global Image Error Handler for Project Icons
window.handleImageError = (img) => {
    img.style.display = 'none';
    const container = img.parentElement;
    container.innerHTML = '<i data-lucide="image" style="width: 50px; height: 50px; color: var(--primary-purple); opacity: 0.3;"></i>';
    window.lucide?.createIcons();
};

// Typewriter Effect
const typewriter = document.getElementById('typewriter');
if (typewriter) {
    const words = ["Social Media Agency", "Your Digital growth partner"];
    let i = 0, j = 0, isDeleting = false;

    function type() {
        const current = words[i] || "";
        typewriter.textContent = isDeleting ?
            current.substring(0, j--) :
            current.substring(0, j++);

        if (!isDeleting && j > current.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && j < 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    type();
}
