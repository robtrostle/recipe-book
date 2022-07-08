import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
 

  // recipes: Recipe[] = [
  //   new Recipe('Tasty Schnitzel', 
  //   'Delish', 
  //   'https://1r6s7piqcip1uwgh2vlwrt15-wpengine.netdna-ssl.com/wp-content/uploads/2020/06/TNWC-Article-Cover-Image.jpg',
  //   [
  //     new Ingredient('Pork Chop', 1),
  //     new Ingredient('Lettuce', 20)
  //   ]),
  //   new Recipe('Big Fat Burger', 
  //   'So delectible', 
  //   'https://static.onecms.io/wp-content/uploads/sites/9/2018/02/fatburger-impossible-burger-ft-blog0218.jpg',
  //   [
  //     new Ingredient('Meat', 1),
  //     new Ingredient('French Fries', 20)
  //   ])
  // ];
  
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
