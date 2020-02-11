import { DishService } from './../services/dish.service';
import { Dish } from '../shared/dish';
import { Component, OnInit, Inject } from '@angular/core';
import {DISHES} from '../shared/dishes';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  dishes: Dish[];
  // selectedDish: Dish ;
  errMess: string;
  constructor(private dishService: DishService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe((dishes) => this.dishes = dishes,
        // tslint:disable-next-line: no-angle-bracket-type-assertion
        errmess => this.errMess = <any> errmess);
  }
  // onSelect(dish: Dish) {
  //   this.selectedDish = dish;
  // }
}
