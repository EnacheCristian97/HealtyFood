import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faArrowLeft,faCheck,faClock, faPlateWheat, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  faThumbsUp = faThumbsUp;
  faPlate = faPlateWheat;
  faTimer = faClock;
  faBackward = faArrowLeft;
  faCheck = faCheck;

  constructor(private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    )
    
  }

  onClose(){
    this.router.navigate(['/recipes']);
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo:this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
