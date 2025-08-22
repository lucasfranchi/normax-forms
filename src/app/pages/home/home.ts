import {Component, ElementRef, Inject, PLATFORM_ID, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  @ViewChildren('animText', {read: ElementRef}) animTextElements!: QueryList<ElementRef>;
  @ViewChild('anchorDiv', {static: false}) anchorDiv!: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('chamei')
      setTimeout(() => {
        this.initHeroTextAnimation();
        this.initMobileMenu();
        this.initScrollAnimations();
        this.initCustomScrollTiming();

        if ((window as any).swiffyslider) {
          (window as any).swiffyslider.init();
        }
      }, 0);
    }
  }

  private initHeroTextAnimation(): void {
    this.animTextElements.forEach((elRef) => {
      const el = elRef.nativeElement;

      // Evita duplicar spans se já estiverem presentes
      if (el.querySelector('span')) return;

      const originalText = el.textContent?.trim() || '';
      el.textContent = '';

      const spans: HTMLElement[] = [];

      for (const char of originalText) {
        const span = this.renderer.createElement('span');
        const text = this.renderer.createText(char);
        this.renderer.appendChild(span, text);
        this.renderer.appendChild(el, span);
        spans.push(span);
      }

      let index = 0;
      const timer = setInterval(() => {
        if (spans[index]) {
          this.renderer.addClass(spans[index], 'fade');
        }
        index++;
        if (index >= spans.length) {
          clearInterval(timer);
        }
      }, 30);
    });
  }

  private initMobileMenu(): void {
    const toggleIcon = document.querySelector('.site-toggle i');
    const closeBtn = document.querySelector('.nav-close');
    const navLinks = document.querySelectorAll('.site-nav ul li a');

    toggleIcon?.addEventListener('click', () => {
      this.renderer.addClass(document.body, 'on');
    });

    closeBtn?.addEventListener('click', () => {
      this.renderer.removeClass(document.body, 'on');
    });

    navLinks.forEach((nav) => {
      nav.addEventListener('click', () => {
        this.renderer.removeClass(document.body, 'on');
      });
    });
  }

  private initScrollAnimations(): void {
    const scrollElements = Array.from(document.querySelectorAll('.site-scroll'));

    const elementInView = (el: Element, dividend = 1): boolean => {
      const elementTop = el.getBoundingClientRect().top;
      return elementTop <= window.innerHeight / dividend;
    };

    const elementOutOfView = (el: Element): boolean => {
      const elementTop = el.getBoundingClientRect().top;
      return elementTop > window.innerHeight;
    };

    const displayScrollElement = (element: Element): void => {
      this.renderer.addClass(element, 'scrolled');
    };

    const hideScrollElement = (element: Element): void => {
      this.renderer.removeClass(element, 'scrolled');
    };

    const handleScrollAnimation = (): void => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        } else if (elementOutOfView(el)) {
          hideScrollElement(el);
        }
      });
    };

    window.addEventListener('scroll', handleScrollAnimation);
  }

  private initCustomScrollTiming(): void {
    setTimeout(() => {
      this.renderer.addClass(this.anchorDiv.nativeElement, 'show');
    }, 2000);
  }
}
