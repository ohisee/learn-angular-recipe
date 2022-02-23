import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  @Input() goal?: {title: string, isActiveGoal: boolean};

  constructor() { }

  ngOnInit(): void {
  }

}
