import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient, 
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService
    ) {}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://ng-recipe-book-db55d-default-rtdb.firebaseio.com/recipes.json', recipes)
    .subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {//one value from the observable and then unsbscribes
      return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-db55d-default-rtdb.firebaseio.com/recipes.json',
      ).pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
    );
  }

  storeShoppingList(){
    const shoppingList = this.shoppingListService.getIngredients();
    return this.http.put('https://ng-recipe-book-db55d-default-rtdb.firebaseio.com/shoppingList.json', shoppingList)
    .subscribe(response => {
      console.log(response);
    });
  }

  fetchShoppingList() {//one value from the observable and then unsbscribes
      return this.http
      .get<Ingredient[]>(
        'https://ng-recipe-book-db55d-default-rtdb.firebaseio.com/shoppingList.json',
      ).pipe(
        map(ingredients => {
          return ingredients.map(ingredients => {
            return {
              ...ingredients,
              ingredients: ingredients.name ? ingredients.name : []
            };
          });
        }),
        tap(ingredients => {
          this.shoppingListService.setIngredient(ingredients);
        })
    );
  }
}
