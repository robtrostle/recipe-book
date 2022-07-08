import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;
    collapsed = true;
    constructor(private dataStorageService: DataStorageService, private authService: AuthService){}

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
    onSaveData(){
        this.dataStorageService.storeRecipes();
        this.dataStorageService.storeShoppingList();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
        this.dataStorageService.fetchShoppingList().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }
}