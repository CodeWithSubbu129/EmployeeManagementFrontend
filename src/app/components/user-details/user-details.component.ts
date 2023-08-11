import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/Employee.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  employeeIdToView!: number;
  employeeDetails!: Employee;
  constructor(
    private activeRoute: ActivatedRoute,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.activeRoute.params.subscribe((val) => {
      this.employeeIdToView = val['id'];
      if (this.employeeIdToView != undefined) {
        this.dataService
          .getTrainerDetailsById(this.employeeIdToView)
          .subscribe((response) => {
            this.employeeDetails = response;
            console.log(this.employeeDetails);
          });
      }
    });
  }
}
