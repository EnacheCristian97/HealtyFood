import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";

import { RecipeService } from "./recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://healtyfoodapplication-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://healtyfoodapplication-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {   
                            ...recipe, ingredients : recipe.ingredients ? recipe.ingredients : []   
                        };
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )
    }

    editRecipe(index: number, recipe:Recipe) {
        const recipeSelected = this.recipeService.getRecipe(index);
        this.http.put(('https://healtyfoodapplication-default-rtdb.firebaseio.com/recipes/'+ index + '.json'), recipe).subscribe(
            () => {
               recipeSelected.name = recipe.name,
               recipeSelected.description = recipe.description,
               recipeSelected.imgPath = recipe.imgPath,
               recipeSelected.ingredients = recipe.ingredients
            }
        )
    }
}
