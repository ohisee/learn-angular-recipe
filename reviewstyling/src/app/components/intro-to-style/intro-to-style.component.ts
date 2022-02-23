import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-intro-to-style',
  templateUrl: './intro-to-style.component.html',
  styleUrls: ['./intro-to-style.component.css']
})
export class IntroToStyleComponent implements OnInit {
  couseGoals: Array<{ title: string, isActiveGoal: boolean }> = [
    { title: 'master anguler styling', isActiveGoal: true },
    { title: 'understand angular animations', isActiveGoal: false },
    { title: 'master angular animations', isActiveGoal: false },
  ];

  isFavorite: boolean = false;

  constructor(private readonly renderer: Renderer2) { }

  ngOnInit(): void {
  }

  onShowBoring(boringBlock: HTMLElement) : void {
    // boringBlock.style.display = 'block';
    this.renderer.setStyle(boringBlock, 'display', 'block');
  }

}
