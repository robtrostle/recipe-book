import { Component,  OnDestroy,  OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name
        })
      }
    );
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name);
    if (this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slService.clearIngredients(this.editedItemIndex);
    this.slForm.reset();
    this.dataStorageService.storeShoppingList();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.dataStorageService.storeShoppingList();
    // this.onClear();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  

}
