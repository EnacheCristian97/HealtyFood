import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService {
  recipeChange = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Burger',
    //       'A delicious burger!',
    //       'https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium',
    //       [
    //         new Ingredient('Meat',1),
    //         new Ingredient('Fries',40)
    //       ]
    //       ),
    //     new Recipe(
    //         'Schnitzel', 
    //         'A tasty schnitzel with chickens on drugs', 
    //         'https://www.allrecipes.com/thmb/mmP7TwfbUf4LjFtEjNpPBNaC928=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/78117-wienerschnitzel-ddmfs-3X4-0200-ec06b882b575486ab7398957709413d2.jpg',
    //         [
    //           new Ingredient('Chicken',1),
    //           new Ingredient('Bread crumbs',100),
    //           new Ingredient('Sos',1),
    //           new Ingredient('Salad',40)
    //         ])
    //   ];
      private recipes: Recipe[] = [];
      constructor(private slService: ShoppingListService) {}

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
}