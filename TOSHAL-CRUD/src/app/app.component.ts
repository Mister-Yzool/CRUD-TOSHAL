import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  pipe = new DatePipe('en-US');
  title = 'toshal-crud';
  products: any = [];
  desc: any;
  stime: any;
  etime: any;
  maxDate: Date;
  currentdate: any;
  datas: any;
  finaldata: any;
  timeForm!: FormGroup;
  addbutton: boolean = true;
  editbutton!: boolean;
  ids: any;
  Days: any;


  constructor(
    private api: ApiService,
    private fb: FormBuilder,
  ) { 
    this.maxDate = new Date();
  }
  ngOnInit(): void {
    this.formValidation();
    this.getTodaydatewisedata();
  }
  getTodaydatewisedata(){
    var date = this.pipe.transform(this.maxDate, 'yyyy-MM-dd');
    var today = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
      this.api.getData(date).subscribe(res => {
        this.datas = res.map((e:any)=>{return {id:e.id,Date:e.Date,StartTime:e.StartTime,EndTime:e.EndTime,TaskDesc:e.TaskDesc,minutes: (new Date(today + " " + e.EndTime).getTime() -  new Date(today + " " + e.StartTime).getTime()) / 60000 + " Minutes"}})
      })
  }
  formValidation(){
    this.timeForm = this.fb.group({
      StartTime: ["", Validators.required],
      EndTime: ["", Validators.required],
      TaskDesc: ["", Validators.required],
    })
  }

  adddata(){
    var date = this.pipe.transform(this.maxDate, 'yyyy-MM-dd');
      var data = {
        "StartTime": this.timeForm.value.StartTime,
        "EndTime": this.timeForm.value.EndTime,
        "Date": date,
        "TaskDesc": this.timeForm.value.TaskDesc,
      }
      this.api.postData(data).subscribe(res => {
        alert("Successfully Submited");
        this.getTodaydatewisedata()
      })
      this.timeForm.reset();
    }
    getdatewise(){
    var date = this.pipe.transform(this.currentdate, 'yyyy-MM-dd');
    var today = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
      this.api.getData(date).subscribe(res => {
        this.datas = res.map((e:any)=>{return {id:e.id,Date:e.Date,StartTime:e.StartTime,EndTime:e.EndTime,TaskDesc:e.TaskDesc,minutes: (new Date(today + " " + e.EndTime).getTime() -  new Date(today + " " + e.StartTime).getTime()) / 60000 + " Minutes"}})
      })
    }
    editdata(e:any){
      this.addbutton = false
      this.editbutton = true
      this.ids= e.id
      this.Days= e.Date
      console.log(e, 'jjjjjjjjjj');
      this.timeForm.patchValue(e)
    }
    update(){
      var data = {
        "id":this.ids,
        "Date":this.Days,
        "StartTime": this.timeForm.value.StartTime,
        "EndTime": this.timeForm.value.EndTime,
        "TaskDesc": this.timeForm.value.TaskDesc,
      }
      console.log(data);
    
      this.api.getupateData(this.ids,data).subscribe(res=>{
        alert("Successfully Updated")
       this.getdatewise();
        this.addbutton = true
        this.editbutton = false;
        this.timeForm.reset();
      })
    }
    deletedata(e:any){
      console.log(e,"lllllllllll");
      var ids = e.id;
      this.api.deleteData(ids).subscribe(res=>{
        alert("Successfully Deleted")
        this.getdatewise();
      })
    }
}

