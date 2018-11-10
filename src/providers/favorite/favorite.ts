import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../dish/dish';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';


/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;

  constructor(public http: Http, private dishservice: DishProvider,private storage: Storage, private localNotifications: LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');
    storage.get('favourites').then(favourites => {
      if (favourites) {
        console.log(favourites);
        this.favorites = favourites;
      }
      else{
        this.favorites =[];
        console.log('favourites not defined');
      }
        
    });
     
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id))
    this.favorites.push(id);
  console.log('favorites', this.favorites);
   //update the storage with the letest favourites data
  this.storage.set('favourites',this.favorites)
  // Schedule a single notification
  this.localNotifications.schedule({
    id: id,
    text: 'Dish ' + id + ' added as a favorite successfully'
  });
  return true;
  }
  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  isFavorite(id: number): boolean {
        return this.favorites.some(el => el === id);
  }
  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index,1);
      //update the storage with the letest favourites data
      this.storage.set('favourites',this.favorites)
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);
    }
  }
}
