"use strict";

// function formFieldsInit(
//   options = {
//     viewPass: false,
//     autoHeight: false,
//   }
// ) {
//   document.body.addEventListener("focusin", function (e) {
//     const targetElement = e.target;
//     if (
//       targetElement.tagName === "INPUT" ||
//       targetElement.tagName === "TEXTAREA"
//     ) {
//       if (!targetElement.hasAttribute("data-no-focus-classes")) {
//         targetElement.classList.add("_form-focus");
//         targetElement.parentElement.classList.add("_form-focus");
//       }
//       formValidate.removeError(targetElement);
//       targetElement.hasAttribute("data-validate")
//         ? formValidate.removeError(targetElement)
//         : null;
//     }
//   });
//   document.body.addEventListener("focusout", function (e) {
//     const targetElement = e.target;
//     if (
//       targetElement.tagName === "INPUT" ||
//       targetElement.tagName === "TEXTAREA"
//     ) {
//       if (!targetElement.hasAttribute("data-no-focus-classes")) {
//         targetElement.classList.remove("_form-focus");
//         targetElement.parentElement.classList.remove("_form-focus");
//       }
//       targetElement.hasAttribute("data-validate")
//         ? formValidate.validateInput(targetElement)
//         : null;
//     }
//   });
//   if (options.viewPass)
//     document.addEventListener("click", function (e) {
//       let targetElement = e.target;
//       if (targetElement.closest('[class*="__viewpass"]')) {
//         let inputType = targetElement.classList.contains("_viewpass-active")
//           ? "password"
//           : "text";
//         targetElement.parentElement
//           .querySelector("input")
//           .setAttribute("type", inputType);
//         targetElement.classList.toggle("_viewpass-active");
//       }
//     });
//   if (options.autoHeight) {
//     const textareas = document.querySelectorAll("textarea[data-autoheight]");
//     if (textareas.length) {
//       textareas.forEach((textarea) => {
//         const startHeight = textarea.hasAttribute("data-autoheight-min")
//           ? Number(textarea.dataset.autoheightMin)
//           : Number(textarea.offsetHeight);
//         const maxHeight = textarea.hasAttribute("data-autoheight-max")
//           ? Number(textarea.dataset.autoheightMax)
//           : 1 / 0;
//         setHeight(textarea, Math.min(startHeight, maxHeight));
//         textarea.addEventListener("input", () => {
//           if (textarea.scrollHeight > startHeight) {
//             textarea.style.height = `auto`;
//             setHeight(
//               textarea,
//               Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight)
//             );
//           }
//         });
//       });
//       function setHeight(textarea, height) {
//         textarea.style.height = `${height}px`;
//       }
//     }
//   }
// }
// let formValidate = {
//   getErrors(form) {
//     let error = 0;
//     let formRequiredItems = form.querySelectorAll("*[data-required]");
//     if (formRequiredItems.length)
//       formRequiredItems.forEach((formRequiredItem) => {
//         if (
//           (formRequiredItem.offsetParent !== null ||
//             formRequiredItem.tagName === "SELECT") &&
//           !formRequiredItem.disabled
//         )
//           error += this.validateInput(formRequiredItem);
//       });
//     return error;
//   },
//   validateInput(formRequiredItem) {
//     let error = 0;
//     if (formRequiredItem.dataset.required === "email") {
//       formRequiredItem.value = formRequiredItem.value.replace(" ", "");
//       if (this.emailTest(formRequiredItem)) {
//         this.addError(formRequiredItem);
//         this.removeSuccess(formRequiredItem);
//         error++;
//       } else {
//         this.removeError(formRequiredItem);
//         this.addSuccess(formRequiredItem);
//       }
//     } else if (
//       formRequiredItem.type === "checkbox" &&
//       !formRequiredItem.checked
//     ) {
//       this.addError(formRequiredItem);
//       this.removeSuccess(formRequiredItem);
//       error++;
//     } else if (!formRequiredItem.value.trim()) {
//       this.addError(formRequiredItem);
//       this.removeSuccess(formRequiredItem);
//       error++;
//     } else {
//       this.removeError(formRequiredItem);
//       this.addSuccess(formRequiredItem);
//     }
//     return error;
//   },
//   addError(formRequiredItem) {
//     formRequiredItem.classList.add("_form-error");
//     formRequiredItem.parentElement.classList.add("_form-error");
//     let inputError =
//       formRequiredItem.parentElement.querySelector(".form__error");
//     if (inputError) formRequiredItem.parentElement.removeChild(inputError);
//     if (formRequiredItem.dataset.error)
//       formRequiredItem.parentElement.insertAdjacentHTML(
//         "beforeend",
//         `<div class="form__error">${formRequiredItem.dataset.error}</div>`
//       );
//   },
//   removeError(formRequiredItem) {
//     formRequiredItem.classList.remove("_form-error");
//     formRequiredItem.parentElement.classList.remove("_form-error");
//     if (formRequiredItem.parentElement.querySelector(".form__error"))
//       formRequiredItem.parentElement.removeChild(
//         formRequiredItem.parentElement.querySelector(".form__error")
//       );
//   },
//   addSuccess(formRequiredItem) {
//     formRequiredItem.classList.add("_form-success");
//     formRequiredItem.parentElement.classList.add("_form-success");
//   },
//   removeSuccess(formRequiredItem) {
//     formRequiredItem.classList.remove("_form-success");
//     formRequiredItem.parentElement.classList.remove("_form-success");
//   },
//   formClean(form) {
//     form.reset();
//     setTimeout(() => {
//       let inputs = form.querySelectorAll("input,textarea");
//       for (let index = 0; index < inputs.length; index++) {
//         const el = inputs[index];
//         el.parentElement.classList.remove("_form-focus");
//         el.classList.remove("_form-focus");
//         formValidate.removeError(el);
//       }
//       let checkboxes = form.querySelectorAll(".checkbox__input");
//       if (checkboxes.length > 0)
//         for (let index = 0; index < checkboxes.length; index++) {
//           const checkbox = checkboxes[index];
//           checkbox.checked = false;
//         }
//       if (modules_flsModules.select) {
//         let selects = form.querySelectorAll("div.select");
//         if (selects.length)
//           for (let index = 0; index < selects.length; index++) {
//             const select = selects[index].querySelector("select");
//             modules_flsModules.select.selectBuild(select);
//           }
//       }
//     }, 0);
//   },
//   emailTest(formRequiredItem) {
//     return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
//       formRequiredItem.value
//     );
//   },
// };
// function formSubmit() {
//   const forms = document.forms;
//   if (forms.length)
//     for (const form of forms) {
//       form.addEventListener("submit", function (e) {
//         const form = e.target;
//         formSubmitAction(form, e);
//       });
//       form.addEventListener("reset", function (e) {
//         const form = e.target;
//         formValidate.formClean(form);
//       });
//     }
//   async function formSubmitAction(form, e) {
//     const error = !form.hasAttribute("data-no-validate")
//       ? formValidate.getErrors(form)
//       : 0;
//     if (error === 0) {
//       const ajax = form.hasAttribute("data-ajax");
//       if (ajax) {
//         e.preventDefault();
//         const formAction = form.getAttribute("action")
//           ? form.getAttribute("action").trim()
//           : "#";
//         const formMethod = form.getAttribute("method")
//           ? form.getAttribute("method").trim()
//           : "GET";
//         const formData = new FormData(form);
//         form.classList.add("_sending");
//         const response = await fetch(formAction, {
//           method: formMethod,
//           body: formData,
//         });
//         if (response.ok) {
//           let responseResult = await response.json();
//           form.classList.remove("_sending");
//           formSent(form, responseResult);
//         } else {
//           alert("Помилка");
//           form.classList.remove("_sending");
//         }
//       } else if (form.hasAttribute("data-dev")) {
//         e.preventDefault();
//         formSent(form);
//       }
//     } else {
//       e.preventDefault();
//       if (
//         form.querySelector("._form-error") &&
//         form.hasAttribute("data-goto-error")
//       ) {
//         const formGoToErrorClass = form.dataset.gotoError
//           ? form.dataset.gotoError
//           : "._form-error";
//         gotoblock_gotoBlock(formGoToErrorClass, true, 1e3);
//       }
//     }
//   }
//   function formSent(form, responseResult = ``) {
//     document.dispatchEvent(
//       new CustomEvent("formSent", {
//         detail: {
//           form,
//         },
//       })
//     );
//     setTimeout(() => {
//       if (modules_flsModules.popup) {
//         const popup = form.dataset.popupMessage;
//         popup ? modules_flsModules.popup.open(popup) : null;
//       }
//     }, 0);
//     formValidate.formClean(form);
//     formLogging(`Форму відправлено!`);
//   }
//   function formLogging(message) {
//     FLS(`[Форми]: ${message}`);
//   }
// }

const popups = document.querySelectorAll("[data-popup]");
if (popups.length > 0)
  popups.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const popupId = trigger.getAttribute("data-popup");
      const popup = document.querySelector(popupId);
      if (popup) {
        if (document.documentElement.classList.contains("menu-open"))
          setTimeout(() => {
            document.documentElement.classList.remove("menu-open");
          }, 500);
        document.documentElement.classList.add("popup-show");
        popup.classList.add("popup_show");
      } else console.error(`Попап с id ${popupId} не найден.`);
    });
  });
const closeButtons = document.querySelectorAll("[data-close]");
if (closeButtons.length > 0)
  closeButtons.forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
      const popup = closeButton.closest(".popup");
      if (popup) {
        document.documentElement.classList.remove("popup-show");
        popup.classList.remove("popup_show");
        bodyUnlock();
      }
    });
  });
const allPopups = document.querySelectorAll(".popup");
if (allPopups.length > 0)
  allPopups.forEach((popup) => {
    popup.addEventListener("click", (event) => {
      if (!event.target.closest(".popup__content")) {
        document.documentElement.classList.remove("popup-show");
        popup.classList.remove("popup_show");
        bodyUnlock();
      }
    });
  });

const input = document.querySelector("#phone");
window.intlTelInput(input, {
  initialCountry: "auto",
  strictMode: true,
  separateDialCode: true,
  geoIpLookup: (callback) => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => callback(data.country_code))
      .catch(() => callback("us"));
  },
  loadUtils: () =>
    import(
      "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js"
    ),
});
