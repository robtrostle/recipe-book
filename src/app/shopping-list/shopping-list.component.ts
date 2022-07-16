import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'backgroundColor': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
      //transition('highlighted <=> normal', animate(800))
  ]),trigger('wildState', [
    state('normal', style({
      'background-color': 'red',
      transform: 'translateX(0) scale(1)'
    })),
    state('highlighted', style({
      'backgroundColor': 'blue',
      transform: 'translateX(100px) scale(1)'
    })),
    state('shrunken', style({
      'backgroundColor': 'green',
      transform: 'translateX(0) scale(0.5)'
    })),
    transition('normal => highlighted', animate(300)),
    transition('highlighted => normal', animate(800)),
    transition('shrunken <=> *', [
      style({
        'backgroundColor': 'orange'
       }),
      animate(1000, style({
       borderRadius: '50px'
       })),
      animate(500)
     //wildard transition from any state
     ])
  ]),
  trigger('list1', [
    state('in', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(-100px)'
      }),
      animate(300)
    ]),//from void (nonexistant) to any state
    transition('* <=> void', [
      animate(300, style({
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ] ),
]),
trigger('list2', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [
    animate(1000, keyframes([
      style({
        transform: 'translateX(-100px)',
        opacity: 0,
        offset: 0
      }),
      style({
        transform: 'translateX(-50px)',
        opacity: 0.5,
        offset: 0.3
      }),
      style({
        transform: 'translateX(-20px)',
        opacity: 1,
        offset: 0.8
      }),
      style({
        transform: 'translateX(0px)',
        opacity: 1,
        offset: 1
      })
    ]))
  ]),
  transition('* <=> void', [
    group([
      animate(300, style({
        color: 'red'
      })),
      animate(800, style({
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ])
  ]),
]),
 ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;
  
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  constructor(private slService: ShoppingListService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.dataStorageService.fetchShoppingList().subscribe();
    // this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
      this.igChangeSub.unsubscribe();
  }

  onAnimate() {
    this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  animationStarted(event) {
    console.log(event);
  }
  
  animationDone(event) {
    console.log(event);
  }

}
