import { Observable, Subject } from 'rxjs';
import { ItemService } from './../../services/item.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from 'src/app/types/item';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { startWith, switchMap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  refresh$: Subject<void>;
  items$: Observable<Item[]>;

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.refresh$ = new Subject();
    this.items$ = this.refresh$.pipe(
      startWith(undefined),
      switchMap(() => this.items$ = this.itemService.getItems()),
      shareReplay(1)
    );
  }

  refresh(control: boolean):void {
    this.refresh$.next();
  }

  onChange(item: Item):void{
    this.itemService.updateItem(item).pipe(
      untilDestroyed(this)
    ).subscribe(res => {
    });
  }

  onSwipeRight(event, item: Item):void {
    this.itemService.deleteItem(item._id).pipe(
      untilDestroyed(this)
    ).subscribe(res => {
      this.refresh$.next();
    });
  }

  trackById(index: number, item: Item):string {
    return item._id;
  }

  ngOnDestroy() {

  }

}
