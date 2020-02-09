import { LEADERS } from './../shared/leaders';
import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }
  getPromotion(id: string): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
  }
  getFeaturedPromotion(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
  }
}
