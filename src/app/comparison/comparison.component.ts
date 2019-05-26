import {Component, OnInit} from '@angular/core';
import {ComparisonService} from './comparison.service';
import {Comparison} from '../models/comparison';
import {Vote} from '../models/vote';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  private unixTimeStamp: string;
  private comparisons: Comparison[];
  private vote: Vote;

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
        comparison.votes.forEach(comparisonVote => {
          if (comparisonVote.choice.id === choiceId) {
            amountOfVotes++;
          }
        });
      }
    });
    return String(amountOfVotes);
  }

  voteOnComparison(comparisonId, choiceId) {
    this.comparisonService.vote(comparisonId, choiceId).subscribe(data => {
      if (data !== null) {
        this.comparisons.forEach(comparison => {
          if (comparison.id === comparisonId) {
            let voteToRemoveIndex = -1;
            comparison.votes.forEach((comparisonVote, index) => {
              // @ts-ignore
              this.vote = data;
              if (this.vote.user.id === comparisonVote.user.id) {
                voteToRemoveIndex = index;
              }
            });
            if (voteToRemoveIndex !== -1) {
              comparison.votes.splice(voteToRemoveIndex, 1);
            }
            comparison.votes.push(this.vote);
          }
        });
      }
    });
  }
}
