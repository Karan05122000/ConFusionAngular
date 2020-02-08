import { LEADERS } from './../shared/leaders';
import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getServices(): Leader[] {
    return LEADERS;
  }
  getPromotion(id: string): Leader {
    return LEADERS.filter((leader) => (leader.id === id))[0];
  }
  getFeaturedPromotion(): Leader {
    return LEADERS.filter((leader) => leader.featured)[0];
  }
}
