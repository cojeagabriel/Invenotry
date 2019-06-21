import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/types/item';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss']
})
export class AddItemModalComponent implements OnInit {

  onAdd = new EventEmitter();

  item: Item = {
    name: '',
    available: false
  }

  constructor(
    public dialogRef: MatDialogRef<AddItemModalComponent>,
    private itemServie: ItemService
  ) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  addItem(): void{
    if(this.item.name){
      this.itemServie.addItem(this.item)
        .subscribe(res => {
          this.onAdd.emit(undefined);
        })
    }
    
    this.dialogRef.close();
  }

  ngOnDestroy() {

  }

}
