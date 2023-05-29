import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef}from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent  implements OnInit{
  empForm: FormGroup;
 

constructor (
  private _fb:FormBuilder, 
  private _empService:EmployeeService,
  private _dialogRef: MatDialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any,
  private _coreService:CoreService
){
  this.empForm =this._fb.group (
     {
      ID:['',(Validators.required)],
      name:['',(Validators.required)],
      department:['',(Validators.required)],
      salary:['',(Validators.required)],
      email:['',(Validators.required)],
      DOB:['',(Validators.required)],
      gender:['',(Validators.required)],
      action:['',(Validators.required)]
    }
  )}    
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
 onFormSubmit(){
  console.log('empForm',this.empForm.value)
  if (this.empForm.valid) {
    if (this.data) {
      this._empService.UpdateEmployee(this.data.id, this.empForm.value).subscribe({
        next: (val:any) => {
          this._coreService.openSnackBar ('Employee detail updated !');
         this._dialogRef.close(true);
        },
        error: (err:any)=> {
          console.error(err);
        },
      });
   }
   else{
      this._empService.addEmployee(this.empForm.value).subscribe({
    next: (val:any) => {
      this._coreService.openSnackBar ('Employee added successfully');
      this._dialogRef.close(true);
    },
    error: (err:any)=> {
      console.error(err);
    },
  });
  }
   
  }
 }
}
