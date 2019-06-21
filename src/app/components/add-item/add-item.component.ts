import { AddItemModalComponent } from './../add-item-modal/add-item-modal.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  @Output() itemAdded = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  openDialog(): void{
    const dialogRef = this.dialog.open(AddItemModalComponent, {
      width: '600px',
    });

    const sub = dialogRef.componentInstance.onAdd.subscribe((data) => {
      console.log("here", data);
      this.itemAdded.emit(data);
    });

    dialogRef.afterClosed().pipe(
      untilDestroyed(this)
    ).subscribe(result => {
      sub.unsubscribe();
    });
  }

  ngOnDestroy() {

  }

}
