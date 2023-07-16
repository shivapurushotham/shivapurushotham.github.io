/**
* Template Name: iPortfolio
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
	"use strict";
	document.getElementById('mainbody').hidden = true;
	const bindData = ({ info, about, contact, address, social, profile }) => {
		
		const bindClassPropsEntries = [
			...Object.entries(info),
			...Object.entries(social),
			...Object.entries(address),
			...Object.entries(contact)
		];

		bindClassPropsEntries.forEach(([key, value]) => {
			if (!document.getElementsByClassName(key)) {
				return;
			}

			if (key == 'linkedin' || key == 'twitter' || key == "facebook") {
				document.querySelectorAll(`.${key}`).forEach(ele => ele.setAttribute('href', value));
				return;
			}

			document.querySelectorAll(`.${key}`).forEach(ele => ele.innerHTML = value);
		});
		
		const bindIdPropsEntries = [
			...Object.entries(about),
			...Object.entries(profile),
			...Object.entries(social)
		];

		bindIdPropsEntries.forEach(([key, value]) => {
			if (!document.getElementById(key)) {
				return;
			}

			switch (key) {
				case 'profileLink': {
					document.getElementById(key).setAttribute('href', value);
					document.getElementById(key).innerHTML = profile.profileLinkName;
					break;
				}
				case 'techstack': {
					document.getElementById('techintro').innerHTML = value.intro;
					let template = '';
					value.list.forEach(stack => {
						template += `<div class="ts-item col-lg-2 col-md-2 d-md-flex align-items-md-stretch" data-aos="fade-up">
										<div class="count-box">
										<img class='techLogo' alt='javascript' src='assets/img/tech_stack/${stack.logo}' />
										<br>
										<p class='techstackname'><strong>${stack.name}</strong></p>
										<!-- <p>consequuntur quae</p> -->
										</div>
									</div>`;
					});
					document.getElementById(key).innerHTML = template;
					break;
				}
				case 'skills': {
					document.getElementById('skillset').setAttribute('data-typed-items', value.join(','));					
					let template = '';
					value.forEach(skill => template += `<li><span class=''>${skill}</span></li>`);
					document.getElementById(key).innerHTML = template;
					break;
				}
				case 'education': {
					let template = '';
					value.forEach(education => {
						template += `<div class="resume-item"> 
										<h4>${education.course}</h4>
										<h5>${education.startDate} - ${education.endDate}</h5> 
										<p><b>Institute:</b> ${education.institute}</p> 
										<p><b>University:</b> ${education.university}</p>
										<p><b>Percentage:</b> ${education.grade}</p>
										<p></p> 
									</div>`;
					});
					document.getElementById(key).innerHTML = template;
					break;
				}
				case 'experience': {
					let template = '';
					value.forEach(experience => {
						let summaryString = '';
						experience.summary.forEach(summaryItem => summaryString += `<li>${summaryItem}</li>`);
						template += `<div class="resume-item">
										<h4>${experience.position}</h4>
										<h5>${experience.startDate} - ${experience.endDate}</h5>
										<p><em>${experience.org}, ${experience.location}</em></p>
										<ul class=''>
										${summaryString}
										</ul>
									</div>`;
					});
					document.getElementById(key).innerHTML = template;
					break;
				}
				default: {
					document.getElementById(key).innerHTML = value;
					break;
				}
			}
		});
		
		initTypeAnimation();
		document.getElementById('mainbody').hidden = false;
	}

	// fetch('https://shivapurushotham.github.io/content.json')
	fetch('https://shivapurushotham.github.io/content.json')
		.then(response => response.json()).then(data => bindData(data)).catch(error => console.error('Failed to load content data: ', error));

	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
		el = el.trim()
		if (all) {
			return [...document.querySelectorAll(el)]
		} else {
			return document.querySelector(el)
		}
	}

	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all)
		if (selectEl) {
			if (all) {
				selectEl.forEach(e => e.addEventListener(type, listener))
			} else {
				selectEl.addEventListener(type, listener)
			}
		}
	}

	/**
	 * Easy on scroll event listener 
	 */
	const onscroll = (el, listener) => {
		el.addEventListener('scroll', listener)
	}

	/**
	 * Navbar links active state on scroll
	 */
	let navbarlinks = select('#navbar .scrollto', true)
	const navbarlinksActive = () => {
		let position = window.scrollY + 200
		navbarlinks.forEach(navbarlink => {
			if (!navbarlink.hash) return
			let section = select(navbarlink.hash)
			if (!section) return
			if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
				navbarlink.classList.add('active')
			} else {
				navbarlink.classList.remove('active')
			}
		})
	}
	window.addEventListener('load', navbarlinksActive)
	onscroll(document, navbarlinksActive)

	/**
	 * Scrolls to an element with header offset
	 */
	const scrollto = (el) => {
		let elementPos = select(el).offsetTop
		window.scrollTo({
			top: elementPos,
			behavior: 'smooth'
		})
	}

	/**
	 * Back to top button
	 */
	let backtotop = select('.back-to-top')
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add('active')
			} else {
				backtotop.classList.remove('active')
			}
		}
		window.addEventListener('load', toggleBacktotop)
		onscroll(document, toggleBacktotop)
	}

	/**
	 * Mobile nav toggle
	 */
	on('click', '.mobile-nav-toggle', function (e) {
		select('body').classList.toggle('mobile-nav-active')
		this.classList.toggle('bi-list')
		this.classList.toggle('bi-x')
	})

	/**
	 * Scrool with ofset on links with a class name .scrollto
	 */
	on('click', '.scrollto', function (e) {
		if (select(this.hash)) {
			e.preventDefault()

			let body = select('body')
			if (body.classList.contains('mobile-nav-active')) {
				body.classList.remove('mobile-nav-active')
				let navbarToggle = select('.mobile-nav-toggle')
				navbarToggle.classList.toggle('bi-list')
				navbarToggle.classList.toggle('bi-x')
			}
			scrollto(this.hash)
		}
	}, true)

	/**
	 * Scroll with ofset on page load with hash links in the url
	 */
	window.addEventListener('load', () => {
		if (window.location.hash) {
			if (select(window.location.hash)) {
				scrollto(window.location.hash)
			}
		}
	});

	/**
	 * Hero type effect
	 */
	const initTypeAnimation = () => {
		const typed = select('.typed')
		if (typed) {
			let typed_strings = typed.getAttribute('data-typed-items')
			typed_strings = typed_strings.split(',')
			new Typed('.typed', {
				strings: typed_strings,
				loop: true,
				typeSpeed: 100,
				backSpeed: 50,
				backDelay: 2000
			});
		}
	}

	/**
	 * Skills animation
	 */
	let skilsContent = select('.skills-content');
	if (skilsContent) {
		new Waypoint({
			element: skilsContent,
			offset: '80%',
			handler: function (direction) {
				let progress = select('.progress .progress-bar', true);
				progress.forEach((el) => {
					el.style.width = el.getAttribute('aria-valuenow') + '%'
				});
			}
		})
	}

	/**
	 * Porfolio isotope and filter
	 */
	window.addEventListener('load', () => {
		let portfolioContainer = select('.portfolio-container');
		if (portfolioContainer) {
			let portfolioIsotope = new Isotope(portfolioContainer, {
				itemSelector: '.portfolio-item'
			});

			let portfolioFilters = select('#portfolio-flters li', true);

			on('click', '#portfolio-flters li', function (e) {
				e.preventDefault();
				portfolioFilters.forEach(function (el) {
					el.classList.remove('filter-active');
				});
				this.classList.add('filter-active');

				portfolioIsotope.arrange({
					filter: this.getAttribute('data-filter')
				});
				portfolioIsotope.on('arrangeComplete', function () {
					AOS.refresh()
				});
			}, true);
		}

	});

	/**
	 * Initiate portfolio lightbox 
	 */
	const portfolioLightbox = GLightbox({
		selector: '.portfolio-lightbox'
	});

	/**
	 * Portfolio details slider
	 */
	new Swiper('.portfolio-details-slider', {
		speed: 400,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	});

	/**
	 * Testimonials slider
	 */
	new Swiper('.testimonials-slider', {
		speed: 600,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20
			},

			1200: {
				slidesPerView: 3,
				spaceBetween: 20
			}
		}
	});

	/**
	 * Animation on scroll
	 */
	window.addEventListener('load', () => {
		AOS.init({
			duration: 1000,
			easing: 'ease-in-out',
			once: true,
			mirror: false
		})
	});

	/**
	 * Initiate Pure Counter 
	 */
	new PureCounter();

})()