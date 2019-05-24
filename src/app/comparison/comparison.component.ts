import { Component, OnInit } from '@angular/core';
import { ComparisonService } from './comparison.service';
import { Comparison } from '../models/comparison';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  private unixTimeStamp: string;
  private comparisons: Comparison[];

  constructor(private comparisonService: ComparisonService) { }

  ngOnInit() {
    this.getLatestComparisons();
  }

  getLatestComparisons = () => this.comparisonService.getLatestComparisons(this.unixTimeStamp).subscribe(data => {
    this.comparisons = data;
    this.unixTimeStamp = this.comparisons[this.comparisons.length - 1].unixTimeStamp;
  })

}
