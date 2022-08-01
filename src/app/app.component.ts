import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(DialogExampleComponent, {data: {name: 'Jeff'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openSnackBar(message, action) {
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('The snack-bar action was triggered');
    });
  }


  title = 'material-practice';
  notifications = 0;
  showSpinner = false;
  opened = false;
  selectedValue : string;
  options: string[] = ['Angular', 'React', 'Vue'];
  objectOptions = [
    { name: 'Angular'},
    { name: 'Angular Material'},
    { name: 'React'},
    { name: 'Vue'}
  ];

  minDate = new Date();
  maxDate = new Date(2022, 8, 6);

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 5000);
  }

  log(state: string) {
    console.log(state);
  }

  logChange(index){
    console.log(index);
  }

  dateFilter = date => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }



}
