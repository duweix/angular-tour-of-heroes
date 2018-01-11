import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { HeroService } from "./hero.service";

import { Hero } from "./hero";

@Component({
    selector: 'my-heroes',
    //templateUrl: './app.component.html',
    templateUrl: "./heroes.component.html",
    //styleUrls: ['./app.component.css']
    styleUrls: [
        "./heroes.component.css"
    ]
})
export class HeroesComponent implements OnInit {
    constructor(
        private heroService: HeroService,
        private router: Router
    ){}

    hero = {
        id: 1,
        name: "Windstorm"
    };
    heroes: Hero[];
    selectedHero: Hero;

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    gotoDetail(): void {
        this.router.navigate(["/detail", this.selectedHero.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
                        .then(hero => {
                            console.log(hero);
                            this.heroes.push(hero);
                            this.selectedHero = null;
                        });
    }

    delete(hero: Hero): void {
        this.heroService.delete(hero.id)
                        .then(() => {
                            this.heroes = this.heroes.filter(h => h !== hero);
                            if (this.selectedHero === hero) {
                                this.selectedHero = null;
                            }
                        });
    }
}
