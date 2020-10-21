import { Component, OnInit } from '@angular/core';
import { ComponentModalRef } from 'src/app/core/model/modal';
import { UserLocation } from 'src/app/core/model/user-location';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';

@Component({
  selector: 'app-location-panel',
  templateUrl: './location-panel.component.html',
  styleUrls: ['./location-panel.component.scss']
})
export class LocationPanelComponent implements OnInit {
  locationHistory: Array<UserLocation>;
  constructor(private modalRef: ComponentModalRef,
    private geoLocation: GeoLocationService) { }

  ngOnInit(): void {
    this.locationHistory = this.geoLocation.locationHistory;
  }

  handleCurrentLocation(location: UserLocation) {
    if (location) {
      this.geoLocation.setLocation(location);
    }
    this.modalRef.dismiss();
  }

  handleSearchedLocation(location: UserLocation) {
    if (location) {
      this.geoLocation.setLocation(location, true);
    }
    this.modalRef.dismiss();
  }

}
