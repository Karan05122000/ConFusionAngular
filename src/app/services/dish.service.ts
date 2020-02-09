import { DISHES } from './../shared/dishes';
import { Dish } from './../shared/dish';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
  getDishes(): Promise<Dish[]> {
    return Promise.resolve(DISHES);
  }
  getDish(id: string): Promise<Dish> {
    // tslint:disable-next-line: whitespace
    return Promise.resolve(DISHES.filter((dish) =>(dish.id === id))[0]);
  }
  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
  }
}
