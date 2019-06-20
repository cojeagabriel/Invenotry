import { Observable } from 'rxjs';
import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  $items: Observable<Item[]>;

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.$items = this.itemService.getItems().pipe();
  }

  refresh(control: boolean):void {
    this.$items = this.itemService.getItems().pipe();
  }

  onChange(newValue, item: Item):void{
    // console.log(newValue, item);
    this.itemService.updateItem(item).subscribe(res=>{
      console.log(res);
    });
  }

}
