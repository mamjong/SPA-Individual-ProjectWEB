import {Directive, ElementRef, HostBinding, HostListener, Input, Renderer2, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appBtnAvailable]'
})
export class BtnAvailableDirective {
  @Input() appBtnAvailable: boolean;

  @HostListener('mouseenter') onMouseEnter() {
    this.applyColor(this.appBtnAvailable);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.hostElement.nativeElement, 'btn-danger');
    this.renderer.removeClass(this.hostElement.nativeElement, 'btn-success');
  }

  constructor(private renderer: Renderer2,
              private hostElement: ElementRef) {
  }

  private applyColor(available: boolean) {
    if (this.appBtnAvailable) {
      this.renderer.removeClass(this.hostElement.nativeElement, 'btn-danger');
      this.renderer.addClass(this.hostElement.nativeElement, 'btn-success');
    } else {
      this.renderer.removeClass(this.hostElement.nativeElement, 'btn-success');
      this.renderer.addClass(this.hostElement.nativeElement, 'btn-danger');
    }
  }

}
