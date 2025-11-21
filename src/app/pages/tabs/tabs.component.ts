import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonRouterOutlet,
    CommonModule,
    RouterModule,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
  ],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent { }
