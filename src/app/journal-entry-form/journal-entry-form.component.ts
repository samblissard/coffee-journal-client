import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JournalEntryService } from '../services/journal-entry.service';
import { JournalEntry } from '../models/journal-entry';
import { CoffeeService } from '../services/coffee.service';
import { Coffee } from '../models/coffee';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-journal-entry-form',
  templateUrl: './journal-entry-form.component.html',
  styleUrls: ['./journal-entry-form.component.css'],
})
export class JournalEntryFormComponent implements OnInit {
  coffeeType: string;
  coffeeForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    roaster: new FormControl('', Validators.required),
    roast: new FormControl('', Validators.required),
    tastingNote: new FormControl(''),
  });
  tastingNoteList: String[];
  coffeeList: Coffee[];

  recipeForm = new FormGroup({
    method: new FormControl(''),
    coffeeWeight: new FormControl(),
    waterWeight: new FormControl(),
    grindSetting: new FormControl(),
  });

  constructor(
    private journalEntryService: JournalEntryService,
    private coffeeService: CoffeeService
  ) {
    this.tastingNoteList = [];
  }

  ngOnInit(): void {
    this.coffeeService
      .getAll()
      .subscribe((coffeeList) => (this.coffeeList = coffeeList));
  }

  onCoffeeListSelect(): void {
    this.coffeeForm.controls['name'].clearValidators();
    this.coffeeForm.controls['name'].updateValueAndValidity();
    this.coffeeForm.controls['roaster'].clearValidators();
    this.coffeeForm.controls['roaster'].updateValueAndValidity();
    this.coffeeForm.controls['roast'].clearValidators();
    this.coffeeForm.controls['roast'].updateValueAndValidity();
  }

  addTastingNote(): void {
    this.tastingNoteList.push(this.coffeeForm.controls['tastingNote'].value);
    this.coffeeForm.controls['tastingNote'].reset();
  }

  removeTastingNote(indexToRemove: number): boolean {
    if (indexToRemove < 0 || indexToRemove > this.tastingNoteList.length) {
      return false;
    }
    this.tastingNoteList.splice(indexToRemove, 1);
    return true;
  }

  calculateRatio(): string {
    const coffeeWeight = this.recipeForm.controls['coffeeWeight'].value;
    const waterWeight = this.recipeForm.controls['waterWeight'].value;
    if (coffeeWeight <= 0 || waterWeight <= 0) {
      return '';
    }

    return (waterWeight / coffeeWeight).toString();
  }

  async submitForm(): Promise<void> {
    const journalEntry: JournalEntry = {
      coffee: { ...this.coffeeForm.value, tastingNotes: this.tastingNoteList },
    };
    this.journalEntryService
      .create(journalEntry)
      .subscribe((entry) => alert('entry created!'));
  }
}
