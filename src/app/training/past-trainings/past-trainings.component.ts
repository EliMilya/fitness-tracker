import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Exercise} from "../exercise.model";
import {TrainingService} from "../training.service";
import {MatSort, MatTableDataSource} from "@angular/material";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
  dataSource = new MatTableDataSource<Exercise>()
  private exChangedSub: Subscription

  @ViewChild(MatSort, {static: false}) sort: MatSort
  @ViewChild('paginator', {static: false}) paginatorRef: MatPaginator

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.exChangedSub = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises
    })
    this.trainingService.fetchCompletedOrCancelledExercises()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginatorRef
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase()
  }

  ngOnDestroy(): void {
    if (this.exChangedSub) {
      this.exChangedSub.unsubscribe()
    }
  }
}
