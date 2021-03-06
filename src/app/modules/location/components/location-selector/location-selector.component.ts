import { OverlayRef } from '@angular/cdk/overlay';
import { AfterViewInit, ElementRef } from '@angular/core';
import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComponentModalRef, ModalRef } from 'src/app/core/model/modal';
import { PopoverRef } from 'src/app/core/model/popover';
import { UserLocation } from 'src/app/core/model/user-location';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { LayoutService } from 'src/app/core/services/layout.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { PopoverService } from 'src/app/core/services/popover.service';
import { LocationPanelComponent } from '../location-panel/location-panel.component';
import { LocationSearchComponent } from '../location-search/location-search.component';

@Component({
  selector: 'location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss']
})
export class LocationSelectorComponent implements OnInit, AfterViewInit {
  @ViewChild('popOrigin', { read: ElementRef }) popOrigin: ElementRef;
  @ViewChild('locationPanel', { read: TemplateRef }) locationPanel: TemplateRef<any>;

  constructor(
    private geoLocationService: GeoLocationService,
    private layoutService: LayoutService,
    private popOverService: PopoverService,
    private modalService: ModalService) { }

  ngAfterViewInit(): void {
    console.log('ngoninit just ran')
  }

  overlayRef: PopoverRef | ModalRef;
  location: UserLocation;

  ngOnInit(): void {
    this.geoLocationService.userLocation().subscribe((location) => {
      console.log('subscription from location, ', location);
      let loc = location;
      this.location = location;
      if (loc.address.locality.length > 22) loc.address.locality = loc.address.locality.slice(0, 22) + '...';
      this.location = location;
    })
  }

  showSelectorModal() {
    this.layoutService.isMobile ?
      this.modalService.openComponentModal(LocationPanelComponent) :
      this.popOverService.openComponentPopover(this.popOrigin, LocationPanelComponent, { xPos: 'start', yPos: 'bottom' });
  }

}
