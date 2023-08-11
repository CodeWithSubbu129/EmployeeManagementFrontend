import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Employee } from 'src/app/models/Employee.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss'],
})
export class RegistrationListComponent implements OnInit {
  public isDelete: boolean = false;
  public dataSource!: MatTableDataSource<Employee>;
  public employees!: Employee[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'gender',
    'dateOfBirth',
    'vocals',
    'instruments',
    'paymentMode',
    'dateOfJoining',
    'address',
    'mobileNr',
    'actions',
  ];

  authRequest: any = { userName: 'Admin', password: 'Admin' };
  constructor(
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog // public dialogRef: MatDialogRef<RegistrationListComponent>
  ) {}
  ngOnInit(): void {
    this.getTrainerList();
  }

  getTrainerList() {
    this.dataService.getTrainerDetails().subscribe(
      (response) => {
        this.employees = response;
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {}
    );
  }

  onClickView(id: number) {
    this.router.navigate(['details', id]);
  }

  onClickEdit(id: number) {
    this.router.navigate(['update', id]);
  }

  onClickDelete(id: number) {
    this.dataService.deleteTrainerById(id).subscribe(
      (response) => {
        this.toastr.success('Deleted Successfully');
        this.getTrainerList();
      },
      (error) => {
        this.toastr.error('Error deleting');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
