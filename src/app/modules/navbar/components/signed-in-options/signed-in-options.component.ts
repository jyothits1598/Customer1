import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { PopoverRef } from 'src/app/core/model/popover';
import { AuthService } from 'src/app/core/services/auth.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { PopoverService } from 'src/app/core/services/popover.service';

@Component({
  selector: 'signed-in-options',
  templateUrl: './signed-in-options.component.html',
  styleUrls: ['./signed-in-options.component.scss']
})
export class SignedInOptionsComponent implements OnInit, OnDestroy {
  @ViewChild('lineIcon', { read: ElementRef }) icon: ElementRef;
  unListen: any;
  popoverRef: PopoverRef;
  constructor(private popover: PopoverService,
    private authService: AuthService,
    private layoutService: LayoutService,
    private renderer: Renderer2,
    private window: Window,
    private host: ElementRef) { }

  ngOnDestroy(): void {
    if (this.unListen) this.unListen();
  }

  ngOnInit(): void {
  }

  setupListener() {
    setTimeout(() => {
      this.unListen = this.renderer.listen(window, 'click', (e) => { this.closePopover(); });
    }, 0);
  }

  showPopover(template: TemplateRef<any>) {
    if (this.popoverRef) return;
    this.popoverRef = this.popover.openTemplatePopover(this.icon, template, { xPos: 'end', yPos: 'bottom', hasBackdrop: false });
    this.setupListener();
  }

  closePopover() {
    this.popoverRef.dismiss();
    this.unListen();
    this.popoverRef = null;
  }

  logout() {
    // this.router.navigateByUrl('/');
    this.window.location.reload();
    this.authService.logout();
  }

}
