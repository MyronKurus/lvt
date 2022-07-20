import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {SelectedIndexes} from "../../models/selected-indexes.model";
import {Observable, Subscription} from "rxjs";
import {IndexCollection, IndexRecord} from "../../models/index.model";
import {chartColors} from "../../../core/helpers/chart-colors";

@Component({
  selector: 'app-index-selection',
  templateUrl: './index-selection.component.html',
  styleUrls: ['./index-selection.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IndexSelectionComponent implements OnInit, OnDestroy {

  @Input()
  public indexCollection: IndexCollection[] | undefined;
  @Input()
  public collapsed: boolean = true;
  @Input()
  public cancel$: Observable<void> | undefined;
  @Output()
  public selectedIndexes: EventEmitter<IndexRecord[]> = new EventEmitter<IndexRecord[]>();
  @Output()
  public collapse: EventEmitter<void> = new EventEmitter<void>();
  public get colors() {
    return chartColors;
  }
  public indexes: IndexRecord[] = [];
  public form = this.formBuilder.group({
    indexOne: null,
    indexTwo: null,
    indexThree: null,
  });
  private subscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.subscription = this.cancel$?.subscribe(() => {
      this.cleanFormValues();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onCheckValue(value: IndexRecord, property: string, checked: boolean, color: string): void {
    if (checked && this.form.controls[property].value !== value.indexName) {
      this.form.controls[property].setValue(value.indexName);
      this.indexes.push({...value, color});
    } else {
      const removedIndex = this.indexes.findIndex(item => item.indexName === value.indexName);
      this.indexes.splice(removedIndex, 1);
      this.form.controls[property].setValue(null);
    }
    this.selectedIndexes.emit(this.indexes);
  }

  private cleanFormValues(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setValue(null);
    });

    this.indexes = [];
    this.selectedIndexes.emit(this.indexes);
  }

  private cleanData(form = this.form): SelectedIndexes {
    return JSON.parse(
      JSON.stringify(form.getRawValue()), (k, v) => (v === null || v === undefined || v === '') ? undefined : v
    );
  }

  public save(): void {
    this.collapsed = true;
  }

  public close(): void {
    this.collapsed = true;
    this.cleanFormValues();
    this.collapse.emit();
  }

}
