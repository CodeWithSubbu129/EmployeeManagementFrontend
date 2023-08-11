import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/Employee.model';
import { UserDetails } from 'src/app/models/UserDetails.model';
import { DataService } from 'src/app/services/data.service';
import { JwtclientService } from 'src/app/services/jwtclient.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  gender: string[] = ['Male', 'Female'];
  paymentModes: string[] = ['Hourly', 'Weekly', 'Monthly', 'Yearly'];
  vocals: string[] = ['Carnatic Vocal', 'Western Vocal', 'Hindustani Vocal'];
  instruments: string[] = ['Violin', 'Flute', 'Piano', 'Keyboard', 'Veena'];
  firtNameRegex = '[A-Za-z]*';

  alertClass!: string;
  alertMessage!: string;

  public registerForm!: FormGroup;
  authRequest: any = { userName: 'Admin', password: 'Admin' };

  employee = new Employee();
  employee1 = new Employee();

  public employeeIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private jwtClientService: JwtclientService,
    private userDetails: UserDetails
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      vocals: [''],
      instruments: [''],
      paymentMode: [null, [Validators.required]],
      dateOfJoining: [null, [Validators.required]],
      address: [null, [Validators.required]],
      mobileNr: [null, [Validators.required, Validators.minLength(10)]],
    });

    this.activateRoute.params.subscribe((val) => {
      this.employeeIdToUpdate = val['id'];
      if (this.employeeIdToUpdate != undefined) {
        this.dataService
          .getTrainerDetailsById(this.employeeIdToUpdate)
          .subscribe((response) => {
            this.isUpdateActive = true;
            this.fillDataForm(response);
          });
      }
    });
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get vocals1() {
    return this.registerForm.get('vocals');
  }

  onUpdate() {
    this.dataService
      .updateTrainerById(this.employeeIdToUpdate, this.registerForm.value)
      .subscribe(
        (response) => {
          this.toastr.success('Updated Successfully');
          this.router.navigateByUrl('list');
        },
        (error) => {
          this.toastr.error('Update Failed');
        }
      );
  }
  onSubmit() {
    this.dataService.saveTrainerDetails(this.registerForm.value).subscribe(
      (response) => {
        this.toastr.success('Registered successfully');
      },
      (error) => {
        this.toastr.error(error.message);
      }
    );
  }

  fillDataForm(employee: Employee) {
    this.registerForm.setValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      gender: employee.gender,
      dateOfBirth: employee.dateOfBirth,
      vocals: employee.vocals,
      instruments: employee.instruments,
      paymentMode: employee.paymentMode,
      dateOfJoining: employee.dateOfJoining,
      address: employee.address,
      mobileNr: employee.mobileNr,
    });
  }
}
