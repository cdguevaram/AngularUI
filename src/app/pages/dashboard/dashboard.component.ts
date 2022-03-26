
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { Routes, RouterModule } from '@angular/router';
import { authorsBooksServices } from 'src/app/service/authorsBooks/authorsBooks.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  time: any;
  authors: any[] =new  Array();
  books: any[] =new  Array();
  fechaHoy = new Date();
  formFilter: FormGroup = new FormGroup({
    author: new FormControl(0),
    fechaI: new FormControl(this.now),
    fechaF: new FormControl(this.now)
  });

  dtOptions: DataTables.Settings = {};
  constructor( private builder: FormBuilder, private services: authorsBooksServices ) {


   }
get now(){
  const hoy =new Date();
  return hoy.getFullYear() + '-' + hoy.getMonth() +'-' + hoy.getDay();
}
  ngOnInit(): void {
    this.loadData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  loadData(){
    this.services.getAllUthors().subscribe({next:(data:any)=>{
      this.authors = data;
    },error:(erroData:any)=>{
      swal.fire('error','Error al recupear autores','error');
    }
  })
  }

  find(): void {
    const params = this.formFilter.getRawValue();
    this.books =new Array();
    this.services.getBookFiltered(params).subscribe({
      next:(data:any)=>{
        this.books =data;
      },
      error:(error:any)=>{
        swal.fire('Error','Error al recuperar datos','error');
      }
    });
  }


  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.books); // Sale Data
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Books");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then((FileSaver: any) => {
      debugger
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.default.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
  SynchBooks(): void {

  }
  SynchAuthors(): void {

  }

}
