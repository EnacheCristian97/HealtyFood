import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./guards/auth.guard";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipes/recipe.resolver";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes:Routes = [
    { path: '', redirectTo:'/recipes', pathMatch: 'full'},
    { path: 'recipes' ,component: RecipesComponent,canActivate:[AuthGuard], children: [
       { path: 'new', component: RecipeEditComponent}, 
       { path: ':id', component: RecipeDetailComponent, resolve:[RecipeResolver]},
       { path: ':id/edit', component: RecipeEditComponent, resolve:[RecipeResolver]} 
    ] },
    { path: 'shopping-list', component:ShoppingListComponent},
    { path: 'login', component: AuthComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}