import { Component, Inject, OnInit } from '@angular/core';
import { DepartmentService } from '../services/department.service';
import { FormArray, FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dept-add-edit',
  templateUrl: './dept-add-edit.component.html',
  styleUrls: ['./dept-add-edit.component.scss']
})
export class DeptAddEditComponent implements OnInit{
  deptForm: FormGroup;



  constructor(
    private _fb: FormBuilder, 
     private _deptService :DepartmentService,  
     private _dialogRef: MatDialogRef<DeptAddEditComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any,
  
    )
    
    {
    this.deptForm = this._fb.group({
      ID : '',
      name : '',
      salary:'',
      gender:'',
      Employee: new FormArray([
        new FormControl (null,Validators.required),
      ]),
      action:'',
    })
  }
  ngOnInit(): void {
    this.deptForm.patchValue(this.data);
  }
  
  
  onFormSubmit(){
    if (this.deptForm.valid) {
      if (this.data) {
        this._deptService.UpdateDepartment(this.data.id, this.deptForm.value).subscribe({
          next: (val:any) => {
            alert('Employee detail updated !');
           this._dialogRef.close(true);
          },
          error: (err:any)=> {
            console.error(err);
          },
        });
     }
     else{
      this._deptService.addDepartment(this.deptForm.value).subscribe({
        next: (val:any) => {
          alert("Employee added Successfully");
          this._dialogRef.close(true);
  },
  error: (err:any)=> {
    console.error(err);
  }
  });
    }
    
  }

}
onAddSkills()
{
  const control = new FormControl(null,Validators.required);
  (<FormArray>this.deptForm.get('Employee')).push(control)
}

  }
  
  
  


