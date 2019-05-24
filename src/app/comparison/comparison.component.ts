import {Component, OnInit} from '@angular/core';
import {ComparisonService} from './comparison.service';
import {Comparison} from '../models/comparison';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  private unixTimeStamp: string;
  private comparisons: Comparison[];

  constructor(private comparisonService: ComparisonService) {
  }

  ngOnInit() {
    this.getLatestComparisons();
  }

  getLatestComparisons = () =>
    this.comparisonService.getLatestComparisons(this.unixTimeStamp).subscribe(data => {
      if (this.comparisons === null || typeof this.comparisons === 'undefined') {
        this.comparisons = data;
      } else {
        const that = this.comparisons;
        data.forEach(dataObject => {
          that.push(dataObject);
        });
      }
      if (this.comparisons.length > 0) {
        this.unixTimeStamp = this.comparisons[this.comparisons.length - 1].unixTimeStamp;
      }
    })

  countVotes(comparisonId, choiceId) {
    let amountOfVotes = 0;
    this.comparisons.forEach(comparison => {
      if (comparison.id === comparisonId) {
        comparison.votes.forEach(vote => {
          if (vote.choice.id === choiceId) {
            amountOfVotes++;
          }
        });
      }
    });
    return String(amountOfVotes);
  }
}
