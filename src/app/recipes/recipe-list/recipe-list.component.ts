import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSub: Subscription

  constructor(private recipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute,
              private dsService: DataStorageService) {}

  ngOnInit() {
    this.dsService.fetchRecipes().subscribe();
    this.recipeSub = this.recipeService.recipeChange.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo:this.route});
  }

}
