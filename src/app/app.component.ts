import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppServiceService} from './app-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'formcreation';
  FrmRegistration: FormGroup;
  submitted = false;
  date: any;
  constructor(private  fb: FormBuilder,
              private router: Router,
              private appServiceService: AppServiceService) { }

  ngOnInit() {
    this.FrmRegistration = this.fb.group({
      txtFirstName:  '',
      dteDateOfBirth: '',
      drpGender: '',
      txtMobileNumber: '',
      txtNationalId: '',
      txtGmailId: '',
    });
  }
  send( value: any) {
    this.submitted = true;
    if (this.FrmRegistration.valid) {
      const saveUser = {
        txtFirstName: value.txtFirstName,
        dteDateOfBirth: value.dteDateOfBirth,
        drpGender: value.drpGender,
        txtMobileNumber: value.txtMobileNumber,
        txtNationalId: value.txtNationalId,
        txtGmailId: value.txtGmailId,
      };
      this.appServiceService.save_user(saveUser).subscribe((res => {
        console.log(res);
        if (res.Status === 'Success') {
          Swal.fire(
            'Success',
            'Patient Id: ' + res.PatientId,
            'success'
          );
        }
      }));
    }
  }
  cancel() {
    window.location.reload();
  }
}
