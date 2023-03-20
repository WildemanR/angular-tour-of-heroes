import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice', power: 'Really Smart' },
      { id: 12, name: 'Narco', power: 'Really Smart' },
      { id: 13, name: 'Bombasto', power: 'Really Smart' },
      { id: 14, name: 'Celeritas', power: 'Really Smart' },
      { id: 15, name: 'Magneta', power: 'Really Smart' },
      { id: 16, name: 'RubberMan', power: 'Really Smart' },
      { id: 17, name: 'Dynama', power: 'Really Smart' },
      { id: 18, name: 'Dr IQ', power: 'Really Smart' },
      { id: 19, name: 'Magma', power: 'Really Smart' },
      { id: 20, name: 'Tornado', power: 'Really Smart' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
