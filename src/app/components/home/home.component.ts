import { Observable, Subject } from 'rxjs';
import { ItemService } from './../../services/item.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from 'src/app/types/item';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { startWith, switchMap, shareReplay } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  refresh$: Subject<void>;
  items$: Observable<Item[]>;

  items: Item[];

  swiped: boolean = false;

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.refresh$ = new Subject();
    // this.items$ = this.refresh$.pipe(
    //   startWith(undefined),
    //   switchMap(() => this.itemService.getItems()),
    //   shareReplay(1)
    // );
    // this.items$.pipe(
    //   untilDestroyed(this)
    // ).subscribe(items => this.items = items);
    this.items$ = this.refresh$.pipe(
      startWith(undefined),
      switchMap(() => this.itemService.getItems()),
      shareReplay(1)
    );
    this.items$.pipe(
      untilDestroyed(this)
    ).subscribe(items => this.items = items.sort((item1, item2) => item1.position < item2.position ? -1 : item1.position > item2.position ? 1 : 0));
    // ).subscribe(items => this.items = items);
  }

  refresh():void {
    this.refresh$.next();
    this.items$.pipe(
      untilDestroyed(this)
    ).subscribe(items => this.items = items.sort((item1, item2) => item1.position < item2.position ? -1 : item1.position > item2.position ? 1 : 0));
  }

  onChange(item: Item):void{
    this.itemService.updateItem(item).pipe(
      untilDestroyed(this)
    ).subscribe(res => {
    });
  }

  onSwipeRight(event, item: Item):void {
    this.swiped = true;
    this.itemService.deleteItem(item._id).pipe(
      untilDestroyed(this)
    ).subscribe(res => {
      // this.refresh$.next();
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    // console.log(this.items, event);
    // this.refresh();
    console.log(event, this.swiped);

    if (event.previousIndex == event.currentIndex && this.swiped){
      this.refresh();
      this.swiped = false;
    }

    if(event.previousIndex > event.currentIndex){
      if(event.currentIndex > 0){
        // console.log(this.items[event.currentIndex - 1].position, this.items[event.currentIndex].position)
        this.items[event.previousIndex].position = (this.items[event.currentIndex - 1].position + this.items[event.currentIndex].position) / 2;
      }
      else{
        // console.log(0, this.items[event.currentIndex].position)
        this.items[event.previousIndex].position = this.items[event.currentIndex].position / 2;
      }
    }
    else if (event.previousIndex < event.currentIndex){
      if(event.currentIndex < this.items.length - 1){
        // console.log(this.items[event.currentIndex + 1].position, this.items[event.currentIndex].position)
        this.items[event.previousIndex].position = (this.items[event.currentIndex + 1].position + this.items[event.currentIndex].position) / 2;
      }
      else{
        // console.log(this.items[event.currentIndex].position, this.items[event.currentIndex].position)
        this.items[event.previousIndex].position = this.items[event.currentIndex].position + 0.5;
      }
    }
    this.itemService.updateItem(this.items[event.previousIndex]).pipe(
      untilDestroyed(this)
    ).subscribe(res => {
    });

    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy() {

  }

}
