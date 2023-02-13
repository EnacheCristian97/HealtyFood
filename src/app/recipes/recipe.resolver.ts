import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../services/data-storage.service";
import { RecipeService } from "../services/recipe.service";

import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe[]> {
    constructor(private dsService: DataStorageService, private recipeService :RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if (recipes.length === 0) {
            return this.dsService.fetchRecipes();
        } else {
            return recipes;
        }
    }
}