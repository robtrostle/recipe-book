"use strict";(self.webpackChunkrecipe_book=self.webpackChunkrecipe_book||[]).push([[296],{3296:(I,d,p)=>{p.r(d),p.d(d,{ShoppingListModule:()=>_});var a=p(2537),r=p(4182),t=p(2096),l=p(2457);class g{constructor(i,e){this.name=i,this.amount=e}}var u=p(9808);const h=["f"];function f(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",13),t.NdJ("click",function(){return t.CHM(e),t.oxw().onDelete()}),t._uU(1,"Delete"),t.qZA()}}let b=(()=>{class n{constructor(e){this.slService=e,this.editMode=!1}ngOnInit(){this.subscription=this.slService.startedEditing.subscribe(e=>{this.editedItemIndex=e,this.editMode=!0,this.editedItem=this.slService.getIngredient(e),this.slForm.setValue({name:this.editedItem.name,amount:this.editedItem.amount})})}onSubmit(e){const o=e.value,s=new g(o.name,o.amount);this.editMode?this.slService.updateIngredient(this.editedItemIndex,s):this.slService.addIngredient(s),this.editMode=!1,e.reset()}onClear(){this.slForm.reset(),this.editMode=!1}onDelete(){this.slService.deleteIngredient(this.editedItemIndex),this.onClear()}ngOnDestroy(){this.subscription.unsubscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(l._))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-shopping-edit"]],viewQuery:function(e,o){if(1&e&&t.Gf(h,5),2&e){let s;t.iGM(s=t.CRH())&&(o.slForm=s.first)}},decls:20,vars:3,consts:[[1,"row"],[1,"col-xs-12"],[3,"ngSubmit"],["f","ngForm"],[1,"col-sm-5","form-group"],["for","name"],["type","text","id","name","name","name","ngModel","","required","","pattern","^[1-9]+[0-9]*$",1,"form-control"],[1,"col-sm-2","form-group"],["for","amount"],["type","number","id","amount","name","amount","ngModel","","required","",1,"form-control"],["type","submit",1,"btn","btn-success",3,"disabled"],["class","btn btn-danger","type","button",3,"click",4,"ngIf"],["type","button",1,"btn","btn-primary",3,"click"],["type","button",1,"btn","btn-danger",3,"click"]],template:function(e,o){if(1&e){const s=t.EpF();t.TgZ(0,"div",0)(1,"div",1)(2,"form",2,3),t.NdJ("ngSubmit",function(){t.CHM(s);const m=t.MAs(3);return o.onSubmit(m)}),t.TgZ(4,"div",0)(5,"div",4)(6,"label",5),t._uU(7,"Name"),t.qZA(),t._UZ(8,"input",6),t.qZA(),t.TgZ(9,"div",7)(10,"label",8),t._uU(11,"Amount"),t.qZA(),t._UZ(12,"input",9),t.qZA()(),t.TgZ(13,"div",0)(14,"div",1)(15,"button",10),t._uU(16),t.qZA(),t.YNc(17,f,2,0,"button",11),t.TgZ(18,"button",12),t.NdJ("click",function(){return o.onClear()}),t._uU(19,"Clear"),t.qZA()()()()()()}if(2&e){const s=t.MAs(3);t.xp6(15),t.Q6J("disabled",!s.valid),t.xp6(1),t.Oqu(o.editMode?"Update":"Add"),t.xp6(1),t.Q6J("ngIf",o.editMode)}},directives:[r._Y,r.JL,r.F,r.Fj,r.JJ,r.On,r.Q7,r.c5,r.wV,u.O5],styles:[""]}),n})();function S(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"a",4),t.NdJ("click",function(){const c=t.CHM(e).index;return t.oxw().onEditItem(c)}),t._uU(1),t.qZA()}if(2&n){const e=i.$implicit;t.xp6(1),t.AsE(" ",e.name," (",e.amount,") ")}}let v=(()=>{class n{constructor(e){this.slService=e}ngOnInit(){this.ingredients=this.slService.getIngredients(),this.igChangeSub=this.slService.ingredientsChanged.subscribe(e=>{this.ingredients=e})}onEditItem(e){this.slService.startedEditing.next(e)}ngOnDestroy(){this.igChangeSub.unsubscribe()}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(l._))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-shopping-list"]],decls:6,vars:1,consts:[[1,"row"],[1,"col-xs-10"],[1,"list-group"],["class","list-group-item","style","cursor: pointer",3,"click",4,"ngFor","ngForOf"],[1,"list-group-item",2,"cursor","pointer",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"app-shopping-edit")(3,"hr"),t.TgZ(4,"ul",2),t.YNc(5,S,2,2,"a",3),t.qZA()()()),2&e&&(t.xp6(5),t.Q6J("ngForOf",o.ingredients))},directives:[b,u.sg],styles:[""]}),n})();var C=p(4466);let _=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[r.u5,a.Bz.forChild([{path:"",component:v}]),C.m]]}),n})()}}]);