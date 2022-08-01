import {
  Component,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {IndexCollection, IndexRecord} from "../../models/index.model";
import {chartColors} from "../../../core/helpers/chart-colors";

@Component({
  selector: 'app-index-selection',
  templateUrl: './index-selection.component.html',
  styleUrls: ['./index-selection.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IndexSelectionComponent implements OnInit, OnDestroy, OnChanges {

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
  public indexes: any = {};
  public collection: IndexRecord [] = [];

  public form = new FormGroup({
    indexOne: new FormGroup({}),
    indexTwo: new FormGroup({}),
    indexThree: new FormGroup({})
  });
  private subscription: Subscription | undefined;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['indexCollection']?.currentValue) {
      this.collection = [];
    }
  }

  ngOnInit(): void {
    this.indexCollection?.[0].indices.forEach(item => {
      (this.form.controls['indexOne'] as FormGroup).addControl(item.indexName, new FormControl(false));
    });

    this.indexCollection?.[1].indices.forEach(item => {
      (this.form.controls['indexTwo'] as FormGroup).addControl(item.indexName, new FormControl(false));
    });

    this.indexCollection?.[1].indices.forEach(item => {
      (this.form.controls['indexThree'] as FormGroup).addControl(item.indexName, new FormControl(false));
    });

    this.subscription = this.cancel$?.subscribe(() => {
      this.cleanFormValues();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onCheckValue(value: IndexRecord, checked: boolean, color: string, row: number, col: number): void {
    if(checked) {
      this.collection?.push({...value, color, row, col});
    } else {
      const id = this.collection.findIndex(val => {
        return val.indexName === value.indexName;
      });
      this.collection.splice(id, 1);
    }
    this.selectedIndexes.emit(this.collection);

  }

  private cleanFormValues(): void {
    this.collection = [];
    this.selectedIndexes.emit(this.collection);
  }

  public save(): void {
    this.collapsed = true;
  }

  public close(): void {
    this.collapsed = true;
    this.cleanFormValues();
    this.collapse.emit();
  }

  public isChecked(name: string): boolean {
    if (!this.collection.length) {
      return false;
    }

    return this.collection.some(id => {
      return id.indexName === name;
    });
  }

}
