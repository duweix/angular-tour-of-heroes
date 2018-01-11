import { Component, OnInit } from "@angular/core";

// Entities
import { Hero } from "./hero";

// Services
import { HeroService } from "./hero.service";

@Component({
    selector: "my-bashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: [
        "./dashboard.component.css"
    ]
})
export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    constructor (
        private heroService: HeroService
    ){}

    ngOnInit(): void {
        this.heroService.getHeroes().then(
            heroes => this.heroes = heroes.slice(1, 5)
        );
    }
}