const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));

    const productSwiper = new Swiper('.productSlide', {
      loop: true,
      slidesPerView: 4,
      spaceBetween: 40,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 4 }
      }
    });
    
    const testimonialSwiper = new Swiper('.testimonialCard', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 40,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });

/* Product Filter */
const filterButtons = document.querySelectorAll('.menu .btn');
const swiperWrapper = document.querySelector('.productSlide .swiper-wrapper');
const swiper = productSwiper;

const nextBtn = document.querySelector('.productSlide .swiper-button-next');
const prevBtn = document.querySelector('.productSlide .swiper-button-prev');
const viewAllBtn = document.querySelector('.productSlide .viewAllBtn');

let unavailableEl = document.querySelector('.unavailable-product');
if (!unavailableEl) {
  unavailableEl = document.createElement('div');
  unavailableEl.className = 'unavailable-product';
  unavailableEl.innerHTML = `
    <h3>No Products Found</h3>
    <p>Sorry, we couldn't find products for the selected category.</p>
    <a href="#" class="view-other-products">View other products</a>
  `;
  unavailableEl.style.marginBottom = '40px';
  document.querySelector('.productSlide').insertAdjacentElement('beforebegin', unavailableEl);
}

const unavailableLink = unavailableEl.querySelector('.view-other-products');

function toggleNav(show) {
  [nextBtn, prevBtn, viewAllBtn].forEach(btn => btn && (btn.style.display = show ? '' : 'none'));
}

function filterProducts(filter) {
  const slides = Array.from(swiperWrapper.querySelectorAll('.swiper-slide'));
  let visible = 0;
  slides.forEach(slide => {
    const category = slide.querySelector('.product-category')?.textContent.toLowerCase().trim() || '';
    const match = filter === 'all' || filter === category;
    slide.style.display = match ? 'flex' : 'none';
    if (match) visible++;
  });
  unavailableEl.classList.toggle('show', visible === 0);
  toggleNav(visible > 0);
  swiper.update();
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProducts(btn.getAttribute('data-filter'));
  });
});

if (unavailableLink) {
  unavailableLink.addEventListener('click', e => {
    e.preventDefault();
    filterButtons.forEach(b => b.classList.remove('active'));
    const allBtn = Array.from(filterButtons).find(b => b.getAttribute('data-filter') === 'all') || filterButtons[0];
    if (allBtn) allBtn.classList.add('active');
    filterProducts('all');
  });
}

filterProducts('all');