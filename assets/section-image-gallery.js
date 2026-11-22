if (!customElements.get('image-gallery')) {
  class ImageGallery extends HTMLElement {
    constructor() {
      super();
      this.triggers = [];
      this.currentIndex = 0;
      this.lastFocusedElement = null;
      this.dialog = null;
      this.lightboxImg = null;
      this.lightboxCaption = null;
      this.lightboxStatus = null;
      this.onKeyDown = this.onKeyDown.bind(this);
    }

    connectedCallback() {
      if (this.dataset.lightbox !== 'true') return;

      this.dialog = this.querySelector('[data-gallery-dialog]');
      if (!this.dialog) return;

      this.lightboxImg = this.dialog.querySelector('[data-gallery-lightbox-img]');
      this.lightboxCaption = this.dialog.querySelector('[data-gallery-lightbox-caption]');
      this.lightboxStatus = this.dialog.querySelector('[data-gallery-status]');
      this.triggers = Array.from(this.querySelectorAll('[data-gallery-trigger]'));

      this.triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => this.open(index));
      });

      this.dialog.querySelector('[data-gallery-close]')?.addEventListener('click', () => this.close());
      this.dialog.querySelector('[data-gallery-prev]')?.addEventListener('click', () => this.step(-1));
      this.dialog.querySelector('[data-gallery-next]')?.addEventListener('click', () => this.step(1));

      this.dialog.addEventListener('click', (event) => {
        if (event.target === this.dialog) {
          this.close();
        }
      });

      this.dialog.addEventListener('close', () => {
        document.removeEventListener('keydown', this.onKeyDown);
        if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
          this.lastFocusedElement.focus();
        }
        this.lastFocusedElement = null;
      });
    }

    open(index) {
      if (!this.dialog || !this.triggers.length) return;
      this.lastFocusedElement = document.activeElement;
      this.currentIndex = index;
      this.render();
      this.dialog.showModal();
      document.addEventListener('keydown', this.onKeyDown);
    }

    close() {
      if (this.dialog?.open) {
        this.dialog.close();
      }
    }

    step(delta) {
      if (!this.triggers.length) return;
      this.currentIndex = (this.currentIndex + delta + this.triggers.length) % this.triggers.length;
      this.render();
    }

    render() {
      const trigger = this.triggers[this.currentIndex];
      if (!trigger || !this.lightboxImg) return;

      this.lightboxImg.src = trigger.dataset.fullSrc || '';
      this.lightboxImg.alt = trigger.dataset.alt || '';

      if (this.lightboxCaption) {
        const caption = trigger.dataset.caption || '';
        this.lightboxCaption.textContent = caption;
        this.lightboxCaption.hidden = caption.length === 0;
      }

      if (this.lightboxStatus) {
        const label = trigger.dataset.caption || trigger.dataset.alt || '';
        this.lightboxStatus.textContent = `Image ${this.currentIndex + 1} of ${this.triggers.length}${label ? `: ${label}` : ''}`;
      }

      const showNav = this.triggers.length > 1;
      this.dialog.querySelectorAll('[data-gallery-prev], [data-gallery-next]').forEach((btn) => {
        btn.hidden = !showNav;
      });
    }

    onKeyDown(event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.step(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.step(1);
      }
    }
  }

  customElements.define('image-gallery', ImageGallery);
}
