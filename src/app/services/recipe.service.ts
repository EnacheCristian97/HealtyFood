import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../models/user.model";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { DataStorageService } from "./data-storage.service";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService {
  recipeChange = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
     
    constructor(private slService: ShoppingListService, private http: HttpClient) {}

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes
         this.recipeChange.next(this.recipes.slice());
      }

      getRecipes() {
        return this.recipes.slice();
      }

      getRecipe(index:number) {
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }
      
      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeChange.next(this.recipes.slice());
      }

      updateRecipe(index:number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChange.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChange.next(this.recipes.slice());
      }

      // addLike(index:number , user:User) {
      //   let recipe = this.getRecipe(index);
       
      //     recipe.likes.push(user);
        

      //   this.recipeChange.next(this.recipes.slice());
      //   console.log(recipe.likes)
      // }

      addLike(index:number, user:User) {
        // let recipe = this.getRecipe(index);
          this.http.put('https://healtyfoodapplication-default-rtdb.firebaseio.com/recipes/' + index + '/likes' + '.json', user).subscribe();
          this.recipeChange.next(this.recipes.slice());
      }
}