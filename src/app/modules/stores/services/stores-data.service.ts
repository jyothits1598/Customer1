import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { URL_AllFavourites, URL_DeleteFavourite, URL_SetFavourite } from 'src/api/store-data';
import { RestApiService } from 'src/app/core/services/rest-api.service';
import { Pagination, StorePagination } from 'src/app/shared/classes/pagination';
import { ReadStore, Store } from '../model/store';
import { StoreFilter } from '../model/StoreFilter';

@Injectable({
  providedIn: 'root'
})
export class StoresDataService {
  constructor(private restApiService: RestApiService) {
  }

  allStores(filter: StoreFilter): Observable<StorePagination> {
    return this.restApiService.get('api/stores/search' + this.filterToQuery(filter));
  }

  setFavourite(storeId: number, isFavourite: boolean) {
    if (isFavourite) return this.restApiService.post(URL_SetFavourite, {
      store_id: storeId,
      is_favourite: 1
    });
    else return this.restApiService.patch(URL_DeleteFavourite, {
      store_id: storeId,
      is_favourite: 0
    })
  }

  allFavourites(filter: StoreFilter): Observable<Array<Store>> {
    return this.restApiService.get(URL_AllFavourites + this.filterToQuery(filter)).pipe(map(resp => {
      let stores: Array<Store> = [];
      resp.data.forEach(s => {
        let store = ReadStore(s);
        store.isFavourite = true;
        stores.push(store)
      });
      return stores;
    }));
  }

  filterToQuery(filter: StoreFilter): string {
    let result = '';
    if (filter) {
      if (filter.name) result += ('name=' + filter.name);
      if (filter.page) {
        if (result) {
          result += '&'
        }
        result += ('page=' + filter.page)
      }
      if (filter.location) {
        if (result) {
          result += '&';
        }
        result += (`lat=${filter.location.lat}&lng=${filter.location.lng}&distance=${filter.distance ? filter.distance : 5}`)
      }
    }
    return result ? ('?' + result) : result;
  }



}
