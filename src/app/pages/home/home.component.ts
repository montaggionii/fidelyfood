import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonProgressBar,
  IonList, IonItem, IonLabel,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  ToastController, ModalController
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { scan } from 'ionicons/icons';

import { UserService, UserData } from '../../services/user.service';
import { Auth, User } from '@angular/fire/auth';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { HttpClient } from '@angular/common/http';

// IMPORTANTE: tu modal aquí
import { ScanModalComponent } from '../../components/scan-modal/scan-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,

    // Ionic components
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonProgressBar,
    IonList, IonItem, IonLabel,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,

    // Nuestro nuevo componente modal
    ScanModalComponent
  ]
})
export class HomeComponent implements OnInit {

  userName = 'Invitado';
  uid = '';

  totalPoints = 0;
  totalPointsMax = 500;
  totalPointsProgress = 0;

  favorites: any[] = [];
  tips: string[] = [];

  scanning = false;
  recentScans: string[] = [];

  constructor(
    private userService: UserService,
    private auth: Auth,
    private http: HttpClient,
    private toastController: ToastController,
    private modalController: ModalController
  ) {
    addIcons({ scan });
  }

  ngOnInit() {
    this.auth.onAuthStateChanged((user: User | null) => {
      if (!user) return;

      this.uid = user.uid;
      this.userName = user.displayName || user.email?.split('@')[0] || 'Usuario';
      this.loadUserData();
    });
  }

  loadUserData() {
    this.userService.getUserData().subscribe((data: UserData | null) => {
      if (!data) return;

      this.totalPoints = data.points || 0;
      this.totalPointsProgress = this.totalPoints / this.totalPointsMax;

      this.favorites = data.favorites || [];
      this.tips = data.tips || [];
    });
  }

  async checkPermission() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted) return true;
    this.presentToast('Permiso de cámara denegado');
    return false;
  }

  async scanTicket() {
    if (!(await this.checkPermission())) return;

    try {
      this.scanning = true;
      await BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();

      this.scanning = false;
      await BarcodeScanner.showBackground();

      if (result.hasContent) {
        await this.handleQr(result.content);
      } else {
        this.presentToast('Escaneo cancelado');
      }

    } catch (err) {
      this.scanning = false;
      await BarcodeScanner.showBackground();
      console.error('Error escaneando QR', err);
      this.presentToast('Error al escanear QR');
    }
  }

  async handleQr(qrContent: string) {
    console.log('QR Escaneado:', qrContent);

    if (!qrContent.startsWith('FIDELYAPP-')) {
      this.presentToast('QR inválido');
      return;
    }

    if (this.recentScans.includes(qrContent)) {
      this.presentToast('Ya has escaneado este QR');
      return;
    }

    try {
      const response: any = await this.http.post('http://192.168.1.27:3000/api/points/add', {
        userId: this.uid,
        points: 10
      }).toPromise();

      this.totalPoints = response.totalPoints || (this.totalPoints + 10);
      this.totalPointsProgress = this.totalPoints / this.totalPointsMax;

      this.recentScans.unshift(qrContent);
      if (this.recentScans.length > 5) this.recentScans.pop();

      this.showScanModal(qrContent, 10);

    } catch (err) {
      console.error('Error al añadir puntos', err);
      this.presentToast('Error al añadir puntos');
    } finally {
      await BarcodeScanner.stopScan();
      this.scanning = false;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async showScanModal(qrContent: string, points: number) {
    const modal = await this.modalController.create({
      component: ScanModalComponent,
      componentProps: { qrContent, points }
    });
    await modal.present();
  }
}