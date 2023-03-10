import { Component, Input } from '@angular/core';
import { faClock, faHeart, faPlateWheat, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
 @Input() recipe: Recipe;
 @Input() index: number;

 faHeart = faHeart;
 faThumbsUp = faThumbsUp;
 faPlate = faPlateWheat;
 faTimer = faClock;

}
