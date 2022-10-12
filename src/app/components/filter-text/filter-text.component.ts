import { Component, Input, OnInit } from '@angular/core';
import { FilterItem, Suggestion } from '@dcupl/common';
import { DcuplList } from '@dcupl/core';

@Component({
  selector: 'app-filter-text',
  templateUrl: './filter-text.component.html',
  styleUrls: ['./filter-text.component.css'],
})
export class FilterTextComponent implements OnInit {
  @Input() list!: DcuplList;
  @Input() filterItem!: FilterItem;

  public suggestions: Suggestion[] = [];

  constructor() {}

  ngOnInit() {
    this.suggestions = this.getSuggestions('');
  }

  public applyTextFilter(input: HTMLInputElement, filterItem: FilterItem) {
    const value = input.value;

    if (value.length) {
      this.list.catalog.applyTextFilter({
        filterKey: filterItem.key,
        text: value,
      });
    } else {
      this.list.catalog.removeFilter({ filterKey: filterItem.key });
    }
  }

  public getSuggestions(value: string) {
    return this.list.catalog.getSuggestions({
      filterKey: this.filterItem.key,
      searchTerm: value,
    });
  }

  public onKeyUp(input: HTMLInputElement) {
    this.suggestions = this.getSuggestions(input.value);
  }
}
