import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message: string;  //makes settable from outside
  @Output() close = new EventEmitter<void>();

  onClose(){
    this.close.emit();
  }
  

  constructor() { }

  ngOnInit(): void {
  }

}
