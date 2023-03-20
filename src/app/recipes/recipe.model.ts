import { User } from "../models/user.model";
import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    public name: string;
    public description: string;
    public preparationDetail: string;
    public time: string;
    public servings: string;
    public imgPath: string;
    public ingredients: Ingredient[];
    public likes?: User[];

    constructor(name:string, desc:string, preparationDetail: string,time: string,servings: string, imagePath:string, ingredients: Ingredient[], likes?: User[]){
        this.name = name;
        this.description = desc;
        this.preparationDetail = preparationDetail;
        this.time = time;
        this.servings = servings
        this.imgPath = imagePath;
        this.ingredients = ingredients;
        this.likes = likes;
    }
}