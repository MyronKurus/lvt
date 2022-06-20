import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {SelectedIndexes} from "../../models/selected-indexes.model";
import {StockIndex} from "../../models/stock-index.model";

@Component({
  selector: 'app-index-selection',
  templateUrl: './index-selection.component.html',
  styleUrls: ['./index-selection.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IndexSelectionComponent implements OnInit {

  @Input()
  indexCollection: StockIndex[] | undefined;

  @Output()
  selectedIndexes: EventEmitter<SelectedIndexes> = new EventEmitter<SelectedIndexes>();

  form = this.formBuilder.group({
    indexOne: null,
    indexTwo: null,
    indexThree: null,
  });

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onCheckValue(value: string, property: string, checked: boolean): void {
    if (checked && this.form.controls[property].value !== value) {
      this.form.controls[property].setValue(value);
    } else {
      this.form.controls[property].setValue(null);
    }

    const result = this.cleanData();
    this.selectedIndexes.emit(result);
  }

  private cleanData(form = this.form): SelectedIndexes {
    return JSON.parse(JSON.stringify(form.getRawValue()), (k, v) => (v === null || v === undefined || v === '') ? undefined : v);
  }

}
