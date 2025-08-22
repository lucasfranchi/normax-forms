import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  QueryList,
  Renderer2,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements AfterViewInit {
  protected readonly title = signal('normax-forms');
  @ViewChildren('accordion', { read: ElementRef })
  accordions!: QueryList<ElementRef>;
  @ViewChildren('question', { read: ElementRef })
  questions!: QueryList<ElementRef>;
  @ViewChild('siteHeader', { static: false }) siteHeader!: ElementRef;
  @ViewChild('heroSlider', { static: false }) heroSlider!: ElementRef;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('chamei');
      setTimeout(() => {
        this.initAccordion();
        this.initFaqs();
        this.initMobileMenu();
        this.initScrollAnimations();
        this.initCustomScrollTiming();

        if ((window as any).swiffyslider) {
          (window as any).swiffyslider.init();
        }
      }, 0);
    }
  }

  private initAccordion(): void {
    this.accordions.forEach((accordionRef) => {
      const accordion = accordionRef.nativeElement;
      const intro = accordion.querySelector('.accordion__intro');
      const content = accordion.querySelector(
        '.accordion__content'
      ) as HTMLElement;

      if (intro && content) {
        intro.addEventListener('click', () => {
          const isOpen = content.style.maxHeight;
          this.accordions.forEach((accRef) => {
            const acc = accRef.nativeElement;
            const accContent = acc.querySelector(
              '.accordion__content'
            ) as HTMLElement;
            this.renderer.removeClass(acc, 'accordion__active');
            accContent.style.maxHeight = '';
          });

          if (!isOpen) {
            this.renderer.addClass(accordion, 'accordion__active');
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        });
      }
    });
  }

  private initFaqs(): void {
    this.questions.forEach((qsRef) => {
      const qsitem = qsRef.nativeElement;
      qsitem.addEventListener('click', () => {
        const sibling = qsitem.nextElementSibling as HTMLElement;

        this.questions.forEach((itemRef) => {
          const item = itemRef.nativeElement;
          const answer = item.nextElementSibling as HTMLElement;
          answer.style.height = '0px';
          if (item !== qsitem) {
            this.renderer.removeClass(item.parentElement, 'active');
          }
        });

        const parent = qsitem.parentElement;
        if (parent?.classList.contains('active')) {
          this.renderer.removeClass(parent, 'active');
          sibling.style.height = '0px';
        } else {
          this.renderer.addClass(parent, 'active');
          sibling.style.height = sibling.scrollHeight + 'px';
        }
      });
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
    const scrollElements = Array.from(
      document.querySelectorAll('.site-scroll')
    );

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
      this.renderer.addClass(this.siteHeader.nativeElement, 'show');
    }, 100);
    setTimeout(() => {
      this.renderer.addClass(this.heroSlider.nativeElement, 'show');
    }, 100);
  }
}
