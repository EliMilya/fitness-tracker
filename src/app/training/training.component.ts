import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TrainingService} from "./training.service";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false
  exerciseSub: Subscription

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.exerciseSub = this.trainingService.exerciseChanged.subscribe(res => {
      if (res) {
        this.ongoingTraining = true
      } else {
        this.ongoingTraining = false
      }
    })
  }

  ngOnDestroy(): void {
    this.exerciseSub.unsubscribe()
  }

}
