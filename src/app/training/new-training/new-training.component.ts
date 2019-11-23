import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from "../training.service";
import {Exercise} from "../exercise.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import "rxjs-compat/add/operator/map";
import {UiService} from "../../shared/ui.service";

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[]
  private exerciseSub: Subscription
  private loadingSub: Subscription
  private isLoading = false

  constructor(private trainingService: TrainingService,
              private uiService: UiService) {
  }

  ngOnInit() {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    })
    this.exerciseSub = this.trainingService.exercisesChanged.subscribe(exercises => this.exercises = exercises)
    this.fetchExercises()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises()
  }

  ngOnDestroy(): void {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe()
    }
    if (this.exerciseSub) {
      this.exerciseSub.unsubscribe()
    }
  }
}
