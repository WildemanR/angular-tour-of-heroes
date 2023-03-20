import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;
  submitted = false;
  bNewHero: boolean;
  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
  heroes: Hero[] = [];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
    this.bNewHero = false;
  }

  get diagnostic() { return JSON.stringify(this.hero); }

  onSubmit(name: string) {
    this.submitted = true;

    if(this.bNewHero == true){
      name = name.trim();
      if (!name) { return; }
      this.heroService.addHero({ name } as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
        });

      this.bNewHero = false;
    }
    else {
      this.heroService.updateHero(this.hero)
      .subscribe();
      //this.save();
    }
  }

  newHero() {
    this.heroService.getHeroes()
    .subscribe(heroes => {
      this.heroes = heroes;
      let iId = this.genId(this.heroes);
      this.hero = new Hero(iId, '', '');
      //this.bNewHero = true;
    });
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }

/*  showFormControls(form: any) {
    return form && form.controls.name &&
    form.controls.name.value; // Dr. IQ
  }*/

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
