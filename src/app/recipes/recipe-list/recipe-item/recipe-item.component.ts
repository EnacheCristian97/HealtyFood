import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faClock, faHeart, faPlateWheat, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, OnDestroy {
 @Input() recipe: Recipe;
 @Input() index: number;
 userSub: Subscription;
 user:User;

 faHeart = faHeart;
 faThumbsUp = faThumbsUp;
 faPlate = faPlateWheat;
 faTimer = faClock;

 constructor(private recipeService: RecipeService, private authService: AuthService, private dsStorage: DataStorageService){

 }



 ngOnInit(): void {
  this.userSub = this.authService.user.subscribe(user => {
    this.user = user;
    console.log(user);
  })
 }

 onAddLike(){
  this.recipeService.addLike(this.index,this.user);
  // this.dsStorage.storeRecipes();
}

ngOnDestroy(): void {
}

}
