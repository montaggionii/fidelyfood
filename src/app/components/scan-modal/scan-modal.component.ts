import { Component, Input, AfterViewInit } from '@angular/core';
import { IonicModule, ModalController, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scan-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './scan-modal.component.html',
  styleUrls: ['./scan-modal.component.scss']
})
export class ScanModalComponent implements AfterViewInit {

  @Input() qrContent: string = '';
  @Input() points: number = 0;

  constructor(private modalController: ModalController, private platform: Platform) {}

  close() {
    this.modalController.dismiss();
  }

  async ngAfterViewInit() {
    this.playConfetti();
    this.playSound();
    this.vibrateDevice();
  }

  // 🎉 Confeti simple con divs animados
  playConfetti() {
    const container = document.createElement('div');
    container.classList.add('confetti-container');
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      container.appendChild(confetti);
    }
    document.body.appendChild(container);

    setTimeout(() => {
      container.remove();
    }, 2500); // Dura 2.5s
  }

  // 🔊 Sonido simple
  playSound() {
    const audio = new Audio('/assets/sounds/point.mp3'); // debes añadir el mp3 en assets/sounds
    audio.play().catch(err => console.warn('No se pudo reproducir el sonido', err));
  }

  // 📳 Vibración
  vibrateDevice() {
    if (this.platform.is('hybrid') || navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  }
}