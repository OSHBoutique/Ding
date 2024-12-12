const menuButton = document.querySelector(".header__icon-menu");
const menuCross = document.querySelector(".header__cross");
const mobileMenu = document.querySelector(".header__mobile-menu");
const header = document.querySelector(".header");

menuButton.addEventListener("click", function () {
  mobileMenu.classList.add("active");
  document.body.classList.add("show-burger");
  document.body.style.overflow = "hidden"; 
});

menuCross.addEventListener("click", function () {
  mobileMenu.classList.remove("active");
  document.body.classList.remove("show-burger");
  document.body.style.overflow = ""; 
});

document.addEventListener("click", function (e) {
  if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
    mobileMenu.classList.remove("active");
    document.body.classList.remove("show-burger");
    document.body.style.overflow = ""; 
  }
});

function handleHeaderScroll() {
  if (window.scrollY > 0) {
    header.classList.add("header__white");
  } else {
    header.classList.remove("header__white");
  }
}

document.addEventListener("DOMContentLoaded", handleHeaderScroll);

window.addEventListener("scroll", handleHeaderScroll);
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
};

let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none') display = 'block';
	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
};

let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
};

let spollers = document.querySelectorAll('._spoller');
let spollersGo = true;

if (spollers.length > 0) {
	function spollerCLick(e) {
		const spoller = e.target.classList.contains('_spoller') ? e.target : e.target.closest('._spoller');
		if (spollersGo) {
			spollersGo = false;
	
			const spollerItem = spoller.closest('.spollers-block__item');
	
			if (spoller.classList.contains('_default-open')) {
				spoller.classList.remove('_default-open');
			}
	
			if (spoller.closest('._spollers').classList.contains('_one')) {
				let currentSpollers = spoller.closest('._spollers').querySelectorAll('.spollers-block__item');
				currentSpollers.forEach((item) => {
					if (item !== spollerItem) {
						item.classList.remove('_active');
						item.querySelector('._spoller').classList.remove('_active');
						_slideUp(item.querySelector('._spoller').nextElementSibling);
					}
				});
			}
	
			if (spoller.classList.contains('_active')) {
				spoller.classList.remove('_active');
				spollerItem.classList.remove('_active'); 
				_slideUp(spoller.nextElementSibling);
			} else {
				spoller.classList.add('_active');
				spollerItem.classList.add('_active'); 
				_slideDown(spoller.nextElementSibling);
			}
	
			console.log('Active spoller item:', spollerItem);
	
			setTimeout(() => {
				spollersGo = true;
			}, 500);
		}
	}
	
	

	function spollersInit() {
		spollers.forEach((spoller) => {
			let spollerMax = spoller.getAttribute('data-max');
			if (spollerMax && window.innerWidth > spollerMax) {
				if (spoller.classList.contains('_init')) {
					spoller.classList.remove('_active');
					spoller.classList.remove('_init');
					spoller.nextElementSibling.style.cssText = '';
					spoller.removeEventListener('click', spollerCLick);
				}
			} else if (!spoller.classList.contains('_init')) {
				spoller.classList.add('_init');
				spoller.addEventListener('click', spollerCLick);

				// Открываем спойлер с _default-open
				if (spoller.classList.contains('_default-open')) {
					spoller.classList.add('_active');
					_slideDown(spoller.nextElementSibling, 0);
				}
			}
		});
	}

	function spollersShowActive() {
		spollers.forEach((spoller) => {
			if (spoller.classList.contains('_active')) {
				_slideToggle(spoller.nextElementSibling);
			}
		});
	}

	window.addEventListener('resize', spollersInit);

	setTimeout(() => {
		spollersShowActive();
		spollersInit();
	}, 0);
}

let scr_body = document.querySelector('body');

//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('.anchor');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		let goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			let target_block_class = goto_link.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
			// iconMenu.classList.remove("active");
			// menuBody.classList.remove("active");
			// scr_body.classList.remove("_lock");
		});
	}
}
function _goto(target_block, speed, offset = 0) {
	let header = 'header';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}

/*! smooth-scroll v16.1.2 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;0<=--t&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),(function(){if("function"==typeof window.CustomEvent)return;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e})(),(function(){for(var r=0,e=["ms","moz","webkit","o"],t=0;t<e.length&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[e[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[t]+"CancelAnimationFrame"]||window[e[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,t){var n=(new Date).getTime(),o=Math.max(0,16-(n-r)),a=window.setTimeout((function(){e(n+o)}),o);return r=n+o,a}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})})(),(function(e,t){"function"==typeof define&&define.amd?define([],(function(){return t(e)})):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)})("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,(function(q){"use strict";var I={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,speedAsDuration:!1,durationMax:null,durationMin:null,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},F=function(){var n={};return Array.prototype.forEach.call(arguments,(function(e){for(var t in e){if(!e.hasOwnProperty(t))return;n[t]=e[t]}})),n},r=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,a=-1,r="",i=n.charCodeAt(0);++a<o;){if(0===(t=n.charCodeAt(a)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");1<=t&&t<=31||127==t||0===a&&48<=t&&t<=57||1===a&&48<=t&&t<=57&&45===i?r+="\\"+t.toString(16)+" ":r+=128<=t||45===t||95===t||48<=t&&t<=57||65<=t&&t<=90||97<=t&&t<=122?n.charAt(a):"\\"+n.charAt(a)}return"#"+r},L=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},x=function(e){return e?(t=e,parseInt(q.getComputedStyle(t).height,10)+e.offsetTop):0;var t},H=function(e,t,n,o){if(t.emitEvents&&"function"==typeof q.CustomEvent){var a=new CustomEvent(e,{bubbles:!0,detail:{anchor:n,toggle:o}});document.dispatchEvent(a)}};return function(o,e){var A,a,O,C,M={};M.cancelScroll=function(e){cancelAnimationFrame(C),C=null,e||H("scrollCancel",A)},M.animateScroll=function(i,c,e){M.cancelScroll();var s=F(A||I,e||{}),u="[object Number]"===Object.prototype.toString.call(i),t=u||!i.tagName?null:i;if(u||t){var l=q.pageYOffset;s.header&&!O&&(O=document.querySelector(s.header));var n,o,a,m,r,d,f,h,p=x(O),g=u?i:(function(e,t,n,o){var a=0;if(e.offsetParent)for(;a+=e.offsetTop,e=e.offsetParent;);return a=Math.max(a-t-n,0),o&&(a=Math.min(a,L()-q.innerHeight)),a})(t,p,parseInt("function"==typeof s.offset?s.offset(i,c):s.offset,10),s.clip),y=g-l,v=L(),w=0,S=(n=y,a=(o=s).speedAsDuration?o.speed:Math.abs(n/1e3*o.speed),o.durationMax&&a>o.durationMax?o.durationMax:o.durationMin&&a<o.durationMin?o.durationMin:parseInt(a,10)),E=function(e,t){var n,o,a,r=q.pageYOffset;if(e==t||r==t||(l<t&&q.innerHeight+r)>=v)return M.cancelScroll(!0),o=t,a=u,0===(n=i)&&document.body.focus(),a||(n.focus(),document.activeElement!==n&&(n.setAttribute("tabindex","-1"),n.focus(),n.style.outline="none"),q.scrollTo(0,o)),H("scrollStop",s,i,c),!(C=m=null)},b=function(e){var t,n,o;m||(m=e),w+=e-m,d=l+y*(n=r=1<(r=0===S?0:w/S)?1:r,"easeInQuad"===(t=s).easing&&(o=n*n),"easeOutQuad"===t.easing&&(o=n*(2-n)),"easeInOutQuad"===t.easing&&(o=n<.5?2*n*n:(4-2*n)*n-1),"easeInCubic"===t.easing&&(o=n*n*n),"easeOutCubic"===t.easing&&(o=--n*n*n+1),"easeInOutCubic"===t.easing&&(o=n<.5?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1),"easeInQuart"===t.easing&&(o=n*n*n*n),"easeOutQuart"===t.easing&&(o=1- --n*n*n*n),"easeInOutQuart"===t.easing&&(o=n<.5?8*n*n*n*n:1-8*--n*n*n*n),"easeInQuint"===t.easing&&(o=n*n*n*n*n),"easeOutQuint"===t.easing&&(o=1+--n*n*n*n*n),"easeInOutQuint"===t.easing&&(o=n<.5?16*n*n*n*n*n:1+16*--n*n*n*n*n),t.customEasing&&(o=t.customEasing(n)),o||n),q.scrollTo(0,Math.floor(d)),E(d,g)||(C=q.requestAnimationFrame(b),m=e)};0===q.pageYOffset&&q.scrollTo(0,0),f=i,h=s,u||history.pushState&&h.updateURL&&history.pushState({smoothScroll:JSON.stringify(h),anchor:f.id},document.title,f===document.documentElement?"#top":"#"+f.id),"matchMedia"in q&&q.matchMedia("(prefers-reduced-motion)").matches?q.scrollTo(0,Math.floor(g)):(H("scrollStart",s,i,c),M.cancelScroll(!0),q.requestAnimationFrame(b))}};var t=function(e){if(!e.defaultPrevented&&!(0!==e.button||e.metaKey||e.ctrlKey||e.shiftKey)&&"closest"in e.target&&(a=e.target.closest(o))&&"a"===a.tagName.toLowerCase()&&!e.target.closest(A.ignore)&&a.hostname===q.location.hostname&&a.pathname===q.location.pathname&&/#/.test(a.href)){var t,n;try{t=r(decodeURIComponent(a.hash))}catch(e){t=r(a.hash)}if("#"===t){if(!A.topOnEmptyHash)return;n=document.documentElement}else n=document.querySelector(t);(n=n||"#top"!==t?n:document.documentElement)&&(e.preventDefault(),(function(e){if(history.replaceState&&e.updateURL&&!history.state){var t=q.location.hash;t=t||"",history.replaceState({smoothScroll:JSON.stringify(e),anchor:t||q.pageYOffset},document.title,t||q.location.href)}})(A),M.animateScroll(n,a))}},n=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(A)){var t=history.state.anchor;"string"==typeof t&&t&&!(t=document.querySelector(r(history.state.anchor)))||M.animateScroll(t,null,{updateURL:!1})}};M.destroy=function(){A&&(document.removeEventListener("click",t,!1),q.removeEventListener("popstate",n,!1),M.cancelScroll(),C=O=a=A=null)};return (function(){if(!("querySelector"in document&&"addEventListener"in q&&"requestAnimationFrame"in q&&"closest"in q.Element.prototype))throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";M.destroy(),A=F(I,e||{}),O=A.header?document.querySelector(A.header):null,document.addEventListener("click",t,!1),A.updateURL&&A.popstate&&q.addEventListener("popstate",n,!1)})(),M}}));
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.querySelector(".checkout__address-checkbox input");
  const deliveryAddress = document.querySelector(".checkout__delivery-address");
  const mainAddressInputs = document.querySelectorAll(
    ".checkout__main-address input"
  );
  const deliveryAddressInputs = document.querySelectorAll(
    ".checkout__delivery-address input"
  );
  const mainAddressSelects = document.querySelectorAll(
    ".checkout__main-address select"
  );
  const deliveryAddressSelects = document.querySelectorAll(
    ".checkout__delivery-address select"
  );
  const saveButton = document.querySelector(".checkout__address-save");
  const cartNextButton = document.querySelector(".checkout__cart-next");
  const cartSpoilerTitle = document.querySelector(
    ".checkout__cart-spoiler .spollers-block__title"
  );
  const addressSpoilerTitle = document.querySelector(
    ".checkout__address-spoiler .spollers-block__title"
  );
  const paySpoilerTitle = document.querySelector(
    ".checkout__pay .spollers-block__title"
  );

  let lastSavedData = {
    billingAddress: null,
    deliveryAddress: null,
  };

  function checkInputs(inputs, selects) {
    const areInputsFilled = Array.from(inputs).every((input) => {
      if (input.name === "additionalLine" || input.name === "fullNane") {
        return true;
      }
      return input.value.trim() !== "";
    });
  
    const areSelectsFilled = Array.from(selects).every(
      (select) => select.value.trim() !== ""
    );
  
    return areInputsFilled && areSelectsFilled;
  }
  

  function updateSaveButtonState() {
    const isMainAddressFilled = checkInputs(mainAddressInputs, mainAddressSelects);
    const isDeliveryAddressFilled =
      checkbox.checked || checkInputs(deliveryAddressInputs, deliveryAddressSelects);
    const paySpoiler = document.querySelector(".checkout__pay");

    if (isMainAddressFilled && isDeliveryAddressFilled) {
      saveButton.disabled = false;
      paySpoiler.classList.remove("disabled");
    } else {
      saveButton.disabled = true;
      paySpoiler.classList.add("disabled");
    }
  }

  function toggleDeliveryAddress() {
    deliveryAddress.style.display = checkbox.checked ? "none" : "block";
    updateSaveButtonState();
  }

  function collectFormData(inputs, selects) {
    const data = {};
    inputs.forEach((input) => {
      const key = input.placeholder || input.name || `input-${input.type}`;
      const value = input.value.trim();
      if (key) data[key] = value;
    });

    selects.forEach((select) => {
      const key = select.name || `select-${select.type}`;
      const value = select.value.trim();
      if (key) data[key] = value;
    });

    return data;
  }

  function closeCurrentAndOpenNext(currentSpoilerTitle, nextSpoilerTitle) {
    const currentSpoilerContainer = currentSpoilerTitle.closest(".spollers-block__item");
    const nextSpoilerContainer = nextSpoilerTitle.closest(".spollers-block__item");

    const currentBody = currentSpoilerTitle.nextElementSibling;
    const nextBody = nextSpoilerTitle.nextElementSibling;

    currentSpoilerTitle.classList.remove("_active");
    currentSpoilerContainer.classList.remove("_active");
    _slideUp(currentBody);

    nextSpoilerTitle.classList.add("_active");
    nextSpoilerContainer.classList.add("_active");
    _slideDown(nextBody);
  }

  function handleSave() {
    if (saveButton.disabled) return;

    const billingAddress = collectFormData(mainAddressInputs, mainAddressSelects);
    const deliveryAddressData = checkbox.checked
      ? billingAddress
      : collectFormData(deliveryAddressInputs, deliveryAddressSelects);

    if (
      JSON.stringify(lastSavedData.billingAddress) !==
        JSON.stringify(billingAddress) ||
      JSON.stringify(lastSavedData.deliveryAddress) !==
        JSON.stringify(deliveryAddressData)
    ) {
      lastSavedData.billingAddress = billingAddress;
      lastSavedData.deliveryAddress = deliveryAddressData;

      updatePaymentAddresses(billingAddress, deliveryAddressData);
    }

    closeCurrentAndOpenNext(addressSpoilerTitle, paySpoilerTitle);
  }

  function handleCartNext() {
    closeCurrentAndOpenNext(cartSpoilerTitle, addressSpoilerTitle);
  }

  function updatePaymentAddresses(billingAddress, deliveryAddress) {
    const deliveryAddressContainer = document.querySelector(
      ".checkout__payment-delivery"
    );
    const invoiceAddressContainer = document.querySelector(
      ".checkout__payment-invoice"
    );

    deliveryAddressContainer.innerHTML = `
      <h3>Delivery Address</h3>
      <p>${formatAddress(deliveryAddress)}</p>
    `;

    invoiceAddressContainer.innerHTML = `
      <h3>Invoice Address</h3>
      <p>${formatAddress(billingAddress)}</p>
    `;
  }

  function formatAddress(address) {
    return Object.values(address)
      .filter((value) => value.trim() !== "")
      .join(", ");
  }

  toggleDeliveryAddress();
  updateSaveButtonState();

  checkbox.addEventListener("change", () => {
    toggleDeliveryAddress();
  });

  [...mainAddressInputs, ...deliveryAddressInputs].forEach((input) => {
    input.addEventListener("input", () => {
      updateSaveButtonState();
    });
  });

  [...mainAddressSelects, ...deliveryAddressSelects].forEach((select) => {
    select.addEventListener("change", () => {
      updateSaveButtonState();
    });
  });

  saveButton.addEventListener("click", handleSave);
  cartNextButton.addEventListener("click", handleCartNext);
});

document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(
    ".checkout__add, .slider__slide-button"
  );
  const lineItemsContainer = document.querySelector(".checkout__line-items");
  const emptyCartMessage = document.querySelector(".checkout__empty");
  const subtotalElement = document.querySelector(".checkout__subtotal");
  const vatElement = document.querySelector(".checkout__vat");
  const totalElement = document.querySelector(".checkout__total");

  const subtotalElementPayment = document.querySelector(
    ".checkout__subtotal-payment"
  );
  const vatElementPayment = document.querySelector(".checkout__vat-payment");
  const totalElementPayment = document.querySelector(
    ".checkout__total-payment"
  );
  const checkoutButton = document.querySelector(".checkout__payment-button");
  let cart = [];

  function formatCurrency(amount) {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  function updateCartDisplay() {
    lineItemsContainer.innerHTML = "";
    const nextStepButton = document.querySelector(".checkout__cart-next");
    const addressSpoiler = document.querySelector(".checkout__address-spoiler");
    const addressSaveButton = document.querySelector(".checkout__address-save");
    const paymentProductsContainer = document.querySelector(
      ".checkout__payment-products"
    );
    paymentProductsContainer.innerHTML = "";

    if (cart.length === 0) {
      nextStepButton.disabled = true;
      addressSpoiler.classList.add("disabled");
      paymentProductsContainer.style.display = "none";
      emptyCartMessage.style.display = "block";
      lineItemsContainer.style.display = "none";
      checkoutButton.style.display = "none";
    } else {
      paymentProductsContainer.style.display = "block";
      nextStepButton.disabled = false;
      addressSpoiler.classList.remove("disabled");
      emptyCartMessage.style.display = "none";
      lineItemsContainer.style.display = "block";
      checkoutButton.style.display = "block";

      cart.forEach((item) => {
        const lineItemHTML = `
          <div class="checkout__line-item" data-id="${item.id}">
            <div class="checkout__line-item-image">
              <img loading="lazy" src="${item.image}" alt="${item.title}" >
              <h4>${item.title}</h4>
            </div>
            <div class="checkout__line-item-quantity">
              <button class="remove-item ${item.quantity > 1 ? "hidden" : ""}">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 1.6C4 1.17565 4.16857 0.768687 4.46863 0.468629C4.76869 0.168571 5.17565 0 5.6 0H10.4C10.8243 0 11.2313 0.168571 11.5314 0.468629C11.8314 0.768687 12 1.17565 12 1.6V3.2H15.2C15.4122 3.2 15.6157 3.28429 15.7657 3.43431C15.9157 3.58434 16 3.78783 16 4C16 4.21217 15.9157 4.41566 15.7657 4.56569C15.6157 4.71571 15.4122 4.8 15.2 4.8H14.3448L13.6512 14.5136C13.6225 14.9173 13.4418 15.2951 13.1457 15.5709C12.8495 15.8467 12.4599 16 12.0552 16H3.944C3.53931 16 3.14965 15.8467 2.85351 15.5709C2.55736 15.2951 2.37673 14.9173 2.348 14.5136L1.656 4.8H0.8C0.587827 4.8 0.384344 4.71571 0.234315 4.56569C0.0842854 4.41566 0 4.21217 0 4C0 3.78783 0.0842854 3.58434 0.234315 3.43431C0.384344 3.28429 0.587827 3.2 0.8 3.2H4V1.6ZM5.6 3.2H10.4V1.6H5.6V3.2ZM3.2592 4.8L3.9448 14.4H12.056L12.7416 4.8H3.2592ZM6.4 6.4C6.61217 6.4 6.81566 6.48429 6.96569 6.63432C7.11571 6.78434 7.2 6.98783 7.2 7.2V12C7.2 12.2122 7.11571 12.4157 6.96569 12.5657C6.81566 12.7157 6.61217 12.8 6.4 12.8C6.18783 12.8 5.98434 12.7157 5.83431 12.5657C5.68429 12.4157 5.6 12.2122 5.6 12V7.2C5.6 6.98783 5.68429 6.78434 5.83431 6.63432C5.98434 6.48429 6.18783 6.4 6.4 6.4ZM9.6 6.4C9.81217 6.4 10.0157 6.48429 10.1657 6.63432C10.3157 6.78434 10.4 6.98783 10.4 7.2V12C10.4 12.2122 10.3157 12.4157 10.1657 12.5657C10.0157 12.7157 9.81217 12.8 9.6 12.8C9.38783 12.8 9.18434 12.7157 9.03432 12.5657C8.88429 12.4157 8.8 12.2122 8.8 12V7.2C8.8 6.98783 8.88429 6.78434 9.03432 6.63432C9.18434 6.48429 9.38783 6.4 9.6 6.4Z" fill="#E89725">
                </svg>
              </button>
              <button class="quantity-decrease ${
                item.quantity > 1 ? "" : "hidden"
              }">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.66667 7.23333C2.46333 7.23333 2.26833 7.31411 2.12455 7.45789C1.98077 7.60166 1.9 7.79667 1.9 8C1.9 8.20333 1.98077 8.39834 2.12455 8.54212C2.26833 8.68589 2.46333 8.76667 2.66667 8.76667H13.3333C13.5367 8.76667 13.7317 8.68589 13.8754 8.54212C14.0192 8.39834 14.1 8.20333 14.1 8C14.1 7.79667 14.0192 7.60166 13.8755 7.45789C13.7317 7.31411 13.5367 7.23333 13.3333 7.23333H2.66667Z" fill="#E89725" stroke="#E89725" stroke-width="0.2">
                </svg>
              </button>
              <span>${item.quantity}</span>
              <button class="quantity-increase">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.23333 13.3333C7.23333 13.5367 7.31411 13.7317 7.45789 13.8754C7.60166 14.0192 7.79667 14.1 8 14.1C8.20333 14.1 8.39834 14.0192 8.54212 13.8755C8.68589 13.7317 8.76667 13.5367 8.76667 13.3333V8.76667H13.3333C13.5367 8.76667 13.7317 8.68589 13.8754 8.54212C14.0192 8.39834 14.1 8.20333 14.1 8C14.1 7.79667 14.0192 7.60166 13.8755 7.45789C13.7317 7.31411 13.5367 7.23333 13.3333 7.23333H8.76667V2.66667C8.76667 2.46333 8.68589 2.26833 8.54212 2.12455C8.39834 1.98077 8.20333 1.9 8 1.9C7.79667 1.9 7.60166 1.98077 7.45789 2.12455C7.31411 2.26833 7.23333 2.46333 7.23333 2.66667V7.23333H2.66667C2.46333 7.23333 2.26833 7.31411 2.12455 7.45789C1.98077 7.60166 1.9 7.79667 1.9 8C1.9 8.20333 1.98077 8.39834 2.12455 8.54212C2.26833 8.68589 2.46333 8.76667 2.66667 8.76667H7.23333V13.3333Z" fill="#E89725" stroke="#E89725" stroke-width="0.2">
                </svg>
              </button>
            </div>
            <p>${formatCurrency(item.price)}</p>
            <p class="checkout__vat-field">${item.vat * 100}%</p>
            <p>${formatCurrency(item.price * item.quantity)}</p>
          </div>
        `;
        lineItemsContainer.insertAdjacentHTML("beforeend", lineItemHTML);

        const paymentProductHTML = `
          <div class="checkout__payment-product" data-id="${item.id}">
            <div class="checkout__payment-product-image">
              <img loading="lazy" src="${item.image}" alt="${item.title}" >
              <div>
                <h4>${item.title}</h4>
                <p>${item.description.trim().replace(/\n\s*/g, "<br>")}</p>
              </div>
            </div>
              <p class="checkout__payment-product-quantity">${
                item.quantity
              }x</p>
              <div class="checkout__payment-product-text">
                <h4>E-Preis</h4>
                <p>${formatCurrency(item.price)}</p>
              </div>
              <div class="checkout__payment-product-text">
                <h4>Gesamt</h4>
                <p>${formatCurrency(item.price * item.quantity)}</p>
              </div>
          </div>
        `;
        paymentProductsContainer.insertAdjacentHTML(
          "beforeend",
          paymentProductHTML
        );
      });
    }

    updateTotals();
    attachEventHandlers();

    logCartState();
    console.log("PayPal Data:", generatePayPalData());
  }

  function updateTotals() {
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const totalVat = cart.reduce(
      (total, item) => total + item.price * item.vat * item.quantity,
      0
    );
    const total = subtotal + totalVat;

    subtotalElement.textContent = `${formatCurrency(subtotal)}`;
    vatElement.textContent = `${formatCurrency(totalVat)}`;
    totalElement.textContent = `${formatCurrency(total)}`;

    subtotalElementPayment.textContent = `${formatCurrency(subtotal)}`;
    vatElementPayment.textContent = `${formatCurrency(totalVat)}`;
    totalElementPayment.textContent = `${formatCurrency(total)}`;
  }

  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
  }

  function increaseQuantity(productId) {
    const product = cart.find((item) => item.id == productId);
    if (product) {
      product.quantity += 1;
      updateCartDisplay();
    }
  }

  function decreaseQuantity(productId) {
    const product = cart.find((item) => item.id == productId);
    if (product) {
      product.quantity -= 1;
      if (product.quantity === 0) {
        cart = cart.filter((item) => item.id != productId);
      }
      updateCartDisplay();
    }
  }

  function removeItem(productId) {
    cart = cart.filter((item) => item.id != productId);
    updateCartDisplay();
  }

  function attachEventHandlers() {
    const increaseButtons = document.querySelectorAll(".quantity-increase");
    const decreaseButtons = document.querySelectorAll(".quantity-decrease");
    const removeButtons = document.querySelectorAll(".remove-item");

    increaseButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.closest(".checkout__line-item").dataset
          .id;
        increaseQuantity(productId);
      });
    });

    decreaseButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.closest(".checkout__line-item").dataset
          .id;
        decreaseQuantity(productId);
      });
    });

    removeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.target.closest(".checkout__line-item").dataset
          .id;
        removeItem(productId);
      });
    });
  }

  function logCartState() {
    const totalPrice = cart.reduce((total, item) => {
      return total + (item.price + item.price * item.vat) * item.quantity;
    }, 0);

    // console.clear();
    // console.log("Cart Items:", cart);
    // console.log(`Total Price: ${totalPrice.toFixed(2)} €`);
  }

  function generatePayPalData() {
    const items = cart.map((item) => ({
      name: item.title,
      unit_amount: {
        currency_code: "EUR",
        value: (item.price + item.price * item.vat).toFixed(2),
      },
      quantity: item.quantity.toString(),
    }));

    const total = items.reduce((sum, item) => {
      return (
        sum + parseFloat(item.unit_amount.value) * parseInt(item.quantity, 10)
      );
    }, 0);

    return {
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "EUR",
                value: total.toFixed(2),
              },
            },
          },
          items: items,
        },
      ],
    };
  }

  const errorPopup = document.querySelector(".error-popup");
  const approvePopup = document.querySelector(".approve-popup");
  const errorPopupClose = document.querySelector(".error-popup__close");
  const approvePopupClose = document.querySelector(".approve-popup__close");

  errorPopupClose.addEventListener("click", function (e) {
    errorPopup.classList.remove("active");
  });

  approvePopupClose.addEventListener("click", function (e) {
    approvePopup.classList.remove("active");
  });

  paypal
    .Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "rect",
        height: 38,
      },

      fundingSource: paypal.FUNDING.PAYPAL,

      createOrder: (data, actions) => {
        const paypalData = generatePayPalData();

        return actions.order.create({
          purchase_units: paypalData.purchase_units.map((unit) => ({
            amount: unit.amount,
            items: unit.items.map((item) => ({
              name: item.name,
              description: item.description,
              unit_amount: item.unit_amount,
              quantity: item.quantity,
            })),
          })),
        });
      },

      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          console.log(
            "Transaction completed by:",
            details.payer.name.given_name
          );
          approvePopup.classList.add("active");
        });
      },

      onError: (err) => {
        console.error("PayPal Error:", err);
        errorPopup.classList.add("active");
      },
    })
    .render("#paypal-button-container");

  addToCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      let product;

      if (button.classList.contains("checkout__add")) {
        const productElement = button.closest(".checkout__product");
        product = {
          id: `product-${index}`,
          title: productElement.querySelector(".checkout__product-title h4")
            .textContent,
          description: productElement.querySelector(".checkout__product-body")
            .textContent,
          price: parseFloat(
            productElement
              .querySelector(".checkout__product-price h4")
              .textContent.replace(",", ".")
          ),
          vat: 0.19,
          image: productElement.querySelector("img").src,
        };
      }

      if (button.classList.contains("slider__slide-button")) {
        const slideElement = button.closest(".slider__slide");
        product = {
          id: `slider-${index}`,
          title: slideElement.querySelector("h3").textContent,
          description: Array.from(
            slideElement.querySelectorAll(".slider__slide-list li")
          )
            .map((li) => li.textContent.trim())
            .join(", "),
          price: parseFloat(
            slideElement
              .querySelector("h4")
              .textContent.replace("€", "")
              .replace(",", ".")
          ),
          vat: 0.19,
          image: slideElement.querySelector("img").src,
        };
      }

      addToCart(product);
    });
  });

  updateCartDisplay();
});

document.addEventListener("DOMContentLoaded", () => {
  const productSlider = () => {
    new Swiper(".slider__swiper", {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 20,
      breakpoints: {
        1200: {
          slidesPerView: 4,
        },
        999: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 2.5,
        },
        520: {
          slidesPerView: 2,
        },
        420: {
          slidesPerView: 1.5,
        },
      },
      navigation: {
        nextEl: ".slider__prev",
        prevEl: ".slider__next",
      },
      pagination: {
        el: ".slider__pagination",
        type: "bullets",
        clickable: "true",
      },
    });
  };

  productSlider();
});

document.addEventListener("DOMContentLoaded", () => {
  const productDetails = document.querySelectorAll(".product-details__product");

  productDetails.forEach((productDetail) => {
    const thumbsSlider = new Swiper(
      productDetail.querySelector(".thumbs-slider"),
      {
        spaceBetween: 10,
        slidesPerView: 4,
        watchSlidesProgress: true,
      }
    );

    const mainSlider = new Swiper(productDetail.querySelector(".main-slider"), {
      spaceBetween: 10,
      thumbs: {
        swiper: thumbsSlider,
      },
    });
  });
});

const productsDetails = document.querySelectorAll(".product-details");
const detailsButtons = document.querySelectorAll(
  ".checkout__product-details-button"
);
const detailsCloseButtons = document.querySelectorAll(
  ".product-details__close"
);

detailsButtons.forEach((button, index) => {
  button.addEventListener("click", function () {
    productsDetails[index].classList.add("active");
  });
});

detailsCloseButtons.forEach((button, index) => {
  button.addEventListener("click", function () {
    productsDetails[index].classList.remove("active");
  });
});


const termsOpen = document.querySelector('.terms-open');
const termsPopup = document.querySelector('.terms-popup');
const termsClose = document.querySelector('.terms-popup__close');

termsClose.addEventListener('click', function(e){
  termsPopup.classList.remove('active');
});

termsOpen.addEventListener('click', function(e){
  termsPopup.classList.add('active');
});