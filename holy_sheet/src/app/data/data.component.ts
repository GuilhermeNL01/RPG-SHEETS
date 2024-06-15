import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import FormsModule here
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  data: any[] = [];
  newData: any = { column1: '', column2: '' };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService.getData().subscribe((data) => {
      this.data = data;
    });
  }

  addData(): void {
    this.dataService.addData(this.newData).subscribe((data) => {
      this.data.push(data);
      this.newData = { column1: '', column2: '' };
    });
  }
}


