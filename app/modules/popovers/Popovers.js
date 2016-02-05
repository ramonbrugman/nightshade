import pepjs from 'pepjs';

export const Popovers = {

  collapsedClass: `is-hidden`,

  init({togglerSelector, popoverSelector}) {
    console.log(`Setting up Popovers`);
    this.togglerEls = document.querySelectorAll(togglerSelector);
    this.popopverEls = document.querySelectorAll(popoverSelector);
    this.popoverSelector = popoverSelector;
    this.setupPopovers();
  },

  setupPopovers() {
    [...this.togglerEls].forEach((el) => {
      el.setAttribute(`touch-action`, `none`);
      el.addEventListener(`pointerup`, (e) => {
        e.stopPropagation();
        const popoverEl = el.parentNode.querySelector(this.popoverSelector);
        this.setupExpandingAndCollapsing(popoverEl);
      });
    });
    this.handleClickOffPopovers();
  },

  setupExpandingAndCollapsing(popoverEl) {
    if (popoverEl.classList.contains(this.collapsedClass)) {
      this.expandPopover(popoverEl);
    } else {
      this.collapsePopover(popoverEl);
    }
  },

  expandPopover(el) {
    this.collapseOpenPopovers();
    el.setAttribute(`aria-expanded`, true);
    el.classList.remove(this.collapsedClass);
  },

  collapsePopover(el) {
    el.setAttribute(`aria-expanded`, false);
    el.classList.add(this.collapsedClass);
  },

  collapseOpenPopovers() {
    [...this.popopverEls].forEach((el) => {
      if (!el.classList.contains(this.collapsedClass)) {
        this.collapsePopover(el);
      }
    });
  },

  handleClickOffPopovers() {
    document.addEventListener(`pointerup`, (e) => {
      if (!e.target.classList.contains(`popover`)) {
        this.collapseOpenPopovers();
      }
    });
  },
};
