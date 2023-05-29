import { Component,OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';
import { DeptAddEditComponent } from './dept-add-edit/dept-add-edit.component';
import { DepartmentService } from './services/department.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit  {
  title ="crud app";
  displayedColumns: string[] = ['ID', 'name', 'department', 'salary', 'email','gender','DOB','action'] ;

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
   

  displayedColumns1: string[] = ['ID',  'name', 'salary', 'gender','action'] ;

  dataSource1!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator1!: MatPaginator;
  @ViewChild(MatSort) sort1!: MatSort;
 
  constructor(
    private _dialog: MatDialog ,
    private _empService: EmployeeService,
    private _deptService: DepartmentService,
    private _coreService: CoreService,

    )
    {}

    ngOnInit(): void {
      this.getEmployeeList();
      this.getDepartmentList();

    }
  openAddEditDeptForm() {
    const dialogRef= this._dialog.open(DeptAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if (val){
          this.getDepartmentList();
        }
      }
    });
  }
  
  openAddEditEmpForm() {
  const dialogRef= this._dialog.open(EmpAddEditComponent);
  dialogRef.afterClosed().subscribe({
    next: (val) =>{
      if (val){
        this.getEmployeeList();
      }
    }
  });
}
getEmployeeList(){
  this._empService.getEmployeeList().subscribe({
    next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator= this.paginator;
    },
    error: console.log,
  })
}
getDepartmentList(){
  this._deptService.getDepartmentList().subscribe({
    next:(res)=>{
      debugger
      console.log(res);
      
      this.dataSource1 = new MatTableDataSource(res);
      this.dataSource1.sort = this.sort1;
      this.dataSource1.paginator= this.paginator1;     
    },
    error: console.log,
    
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
applyFilter1(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource1.filter = filterValue.trim ().toLowerCase();

  if (this.dataSource1.paginator) {
    this.dataSource1.paginator.firstPage();
  }
}

deleteEmployee(id: number){
  this._empService.deleteEmployee(id).subscribe({

    next: (res) => {
      this._coreService.openSnackBar ('Employee deleted!','done');
      this.getEmployeeList();

    },
    error:console.log,
 }) 

}
deleteDepartment(id: number){
  this._deptService.deleteDepartment(id).subscribe({

    next: (res) => {
     alert("Employee Deleted");
     this.getDepartmentList();

    },
    error:console.log,
 }) 

}


openEditForm(data : any) {
  const dialogRef = this._dialog.open(EmpAddEditComponent,{
    data
  });
  dialogRef.afterClosed().subscribe({
    next: (val) =>{
      if (val){
        this.getEmployeeList();
      }
    }
   });
   
}
openEditForm1(data : any) {
  const dialogRef = this._dialog.open(DeptAddEditComponent,{
    data
  });
  dialogRef.afterClosed().subscribe({
    next: (val) =>{
      if (val){
        this.getDepartmentList();
      }
    }
   });
   
}
  
}