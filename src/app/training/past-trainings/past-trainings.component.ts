import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Exercise} from "../exercise.model";
import {TrainingService} from "../training.service";
import {MatSort, MatTableDataSource} from "@angular/material";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
  dataSource = new MatTableDataSource<Exercise>()

  @ViewChild(MatSort, {static: false}) sort: MatSort
  @ViewChild('paginator', {static: false}) paginatorRef: MatPaginator

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginatorRef
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase()
  }
}
