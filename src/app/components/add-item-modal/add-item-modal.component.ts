import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/types/item';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.component.html',
  styleUrls: ['./add-item-modal.component.scss']
})
export class AddItemModalComponent implements OnInit {

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
    this.itemServie.addItem(this.item)
      .subscribe(res=>{
        console.log(res);
      })
    this.dialogRef.close();
  }

}
