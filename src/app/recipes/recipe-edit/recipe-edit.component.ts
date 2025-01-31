import { Component, OnInit } from '@angular/core';
import { Form, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: UntypedFormGroup;


  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
    private router: Router, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    }); 
  }

  onSubmit(){
    // const newRecipe = new Recipe(this.recipeForm.value.['name'],
    // this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['indredients']);
    if (this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.dataStorageService.storeRecipes();
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(
      new UntypedFormGroup({
        'name': new UntypedFormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number){
    (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm(){
    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new UntypedFormArray([]);

    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new UntypedFormGroup({
              'name': new UntypedFormControl(ingredient.name, Validators.required)
            })
          )
        }
      }
    }
    this.recipeForm = new UntypedFormGroup({
      'name': new UntypedFormControl(recipeName, Validators.required),
      'imagePath': new UntypedFormControl(recipeImagePath, Validators.required),
      'description': new UntypedFormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<UntypedFormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSaveRecipe(){
    this.onSubmit();
  }

}
