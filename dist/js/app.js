/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/*---------------------------------------------------------------------------
Main timer
---------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
   const timerElement = document.querySelector(".timer__value");
   let timeLeft = 12 * 60 * 60;

   function updateTimer() {
      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = timeLeft % 60;

      timerElement.textContent =
         `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

      if (timeLeft > 0) {
         timeLeft--;
      } else {
         clearInterval(timerInterval);
         timerElement.textContent = "00:00:00";
      }
   }

   updateTimer();
   const timerInterval = setInterval(updateTimer, 1000);
});

/*---------------------------------------------------------------------------
Slider
---------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const sliders = document.querySelectorAll('.app__preview-slider');

   sliders.forEach(slider => {
      new Splide(slider, {
         type: 'loop',
         perPage: 1,
         autoplay: true,
         interval: 3000,
         pauseOnHover: false,
         pauseOnFocus: false,
         arrows: true,
         pagination: true
      }).mount();
   });
});


/*---------------------------------------------------------------------------
Descr
---------------------------------------------------------------------------*/
const descrButton = document.querySelector('.product__description-button');
const descrText = document.querySelector('.product__description-text');

if (descrButton && descrText) {
   descrButton.addEventListener('click', () => {
      descrButton.classList.toggle('active');
      descrText.classList.toggle('show');
   })
}

/*---------------------------------------------------------------------------
Main
---------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
   const sections = document.querySelectorAll('section[id^="step-"]');
   let currentStep = 1;

   function showSection(step) {
      const delay = (step === 1) ? 0 : 500;

      sections.forEach(section => {
         section.style.opacity = '0';
         section.style.transition = 'opacity 0.5s ease';
      });

      setTimeout(() => {
         sections.forEach((section, index) => {
            const isCurrent = (index + 1 === step);
            section.style.display = isCurrent ? 'block' : 'none';
            if (isCurrent) {
               setTimeout(() => {
                  section.style.opacity = '1';
               }, 100);
            }
         });

         if (step === 2) fadeInTestsWrapper();
      }, delay);
   }

   showSection(currentStep);

   // -------------------------------
   // STEP 1 → STEP 2 
   // -------------------------------
   document.querySelector('.start-button')?.addEventListener('click', () => {
      currentStep = 2;
      showSection(currentStep);
   });

   // -------------------------------
   // STEP 2 
   // -------------------------------
   const surveyTitle = document.querySelector('.survey__title span');
   const testsWrapper = document.querySelector('.survey__tests');
   const tests = document.querySelectorAll('.survey__test');
   let testIndex = 0;

   function showTest(index) {
      tests.forEach((test, i) => {
         test.classList.toggle('hide', i !== index);
         test.classList.toggle('show', i === index);
      });
      surveyTitle.textContent = index + 1;
   }

   tests.forEach((test, index) => {
      const buttons = test.querySelectorAll('.button');
      buttons.forEach(button => {
         button.addEventListener('click', () => {
            if (index < tests.length - 1) {
               testIndex++;
               showTest(testIndex);
            } else {
               currentStep = 3;
               showSection(currentStep);
               startValidationAnimation();
            }
         });
      });
   });

   function fadeInTestsWrapper() {
      testsWrapper.style.opacity = '0';
      testsWrapper.style.transition = 'opacity 1s ease 0.5s';
      testsWrapper.style.display = 'block';

      requestAnimationFrame(() => {
         testsWrapper.style.opacity = '1';
      });
   }

   showTest(testIndex);


   // -------------------------------
   // STEP 3
   // -------------------------------
   const validBody = document.querySelectorAll('.validation__body');
   const validSubtitles = document.querySelectorAll('.validation__subtitle');
   const validIcon = document.querySelector('.validation__icon');
   let validIndex = 0;
   let intervalId;

   function showSubtitle(index) {
      validSubtitles.forEach(sub => {
         sub.classList.remove('show');
         sub.classList.add('hide');
      });

      setTimeout(() => {
         validSubtitles[index].classList.remove('hide');
         validSubtitles[index].classList.add('show');
      }, 50);

      setTimeout(() => {
         validBody.forEach(body => body.classList.add('anim'));

         setTimeout(() => {
            validIcon.classList.add('anim');
         }, 500);

         if (index < validSubtitles.length - 1) {
            setTimeout(() => {
               validIcon.classList.remove('anim');
               validBody.forEach(body => body.classList.remove('anim'));
            }, 1200);
         } else {
            setTimeout(() => {
               currentStep = 4;
               showSection(currentStep);
            }, 800);
         }
      }, 2000);
   }

   function startValidationAnimation() {
      validIndex = 0;

      setTimeout(() => {
         showSubtitle(validIndex);

         intervalId = setInterval(() => {
            validIndex++;

            if (validIndex < validSubtitles.length) {
               showSubtitle(validIndex);
            } else {
               clearInterval(intervalId);
            }
         }, 3500);
      }, 300);
   }


   // -------------------------------
   // STEP 4
   // -------------------------------
   document.querySelector('.thanks__button .button')?.addEventListener('click', () => {
      currentStep = 5;
      showSection(currentStep);
   });

   // -------------------------------
   // STEP 5 → STEP 6
   // -------------------------------
   document.querySelector('.product__button .button')?.addEventListener('click', () => {
      currentStep = 6;
      showSection(currentStep);
   });
});

/******/ })()
;