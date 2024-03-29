import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute,private recipeService: RecipeService, private router: Router, private dsService: DataStorageService) {}
  
  ngOnInit(): void {
      this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      )
  }

  onSubmit(){
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['preparationDetail'],
      this.recipeForm.value['time'],
      this.recipeForm.value['servings'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'],
      this.recipeForm.value['likes'] = []);
    if(this.editMode) {
      const editedRecipe = new Recipe(
        this.recipeForm.value['name'],
        this.recipeForm.value['description'],
        this.recipeForm.value['preparationDetail'],
        this.recipeForm.value['time'],
        this.recipeForm.value['servings'],
        this.recipeForm.value['imagePath'],
        this.recipeForm.value['ingredients'],
        this.recipeForm.value['likes']
      )
      const edit = this.dsService.editRecipe(this.id, editedRecipe);
      this.recipeService.updateRecipe(this.id, editedRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
      this.dsService.storeRecipes();
      console.log(newRecipe);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  private initForm() {
    let recipeName ='';
    let recipeDescription = '';
    let preparationDetail ='';
    let time ='';
    let servings ='';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([])

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      preparationDetail = recipe.preparationDetail;
      time = recipe.time;
      servings = recipe.servings;
      recipeImagePath = recipe.imgPath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
            );
          }
        }
      // if(recipe['likes']){
      //   for (const like of recipe.likes) {
      //     recipeLikes.push(
      //       new FormGroup({
      //         'name': new FormControl(like.displayName),
      //         'email': new FormControl(like.email),
      //         'id': new FormControl(like.id)
      //       })
      //     )
      //   }
      // }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'preparationDetail': new FormControl(preparationDetail, Validators.required),
      'time': new FormControl(time, Validators.required),
      'servings': new FormControl(servings, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': recipeIngredients
    });
  }



  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
