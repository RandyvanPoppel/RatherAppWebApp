import {Component, OnInit} from '@angular/core';
import {ComparisonService} from './comparison.service';
import {Comparison} from '../models/comparison';
import {Vote} from '../models/vote';
import {Choice} from '../models/choice';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  private unixTimeStamp: string;
  private comparisons: Comparison[];
  private vote: Vote;
  private choicesInMemory: Choice[] = [];
  private choiceValue = '';

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

  addChoice() {
    this.choicesInMemory.push(new Choice('', this.choiceValue));
    this.choiceValue = '';
  }

  removeChoice(choiceDescription: string) {
    let choiceToDeleteIndex = -1;
    this.choicesInMemory.forEach((choice, index) => {
      if (choice.description === choiceDescription) {
        choiceToDeleteIndex = index;
      }
    });
    if (choiceToDeleteIndex !== -1) {
      this.choicesInMemory.splice(choiceToDeleteIndex, 1);
    }
  }

  createComparison() {
    this.comparisonService.createComparison(this.choicesInMemory).subscribe(data => {
      this.comparisons.splice(0, 0, data as Comparison);
      this.choiceValue = '';
      this.choicesInMemory = [];
    });
  }
}
