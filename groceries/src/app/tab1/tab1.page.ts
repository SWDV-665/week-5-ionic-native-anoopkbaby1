import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { GroceriesService } from '../providers/groceries.service';
import { InputDialogService } from '../providers/input-dialog.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title = "Grocery";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesService, public inputDialogService: InputDialogService, public socialSharing: SocialSharing) {

  }

  loadItems() {
    return this.dataService.getItems();
  }

  async removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      color: 'warning',
      message: 'Removing Item - ' + index + " ...",
      duration: 2000,
      position: 'bottom'

    });
    await toast.present();

    this.dataService.removeItem(index); 
  }

  async shareItem(item, index) {
    console.log("Sharing Item - ", item, index);
    const toast = await this.toastCtrl.create({
      color: 'dark',
      message: 'Sharing Item - ' + index + " ...",
      duration: 2500
    });

    await toast.present();

    let message = "Grocery Item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via Groceries app";

    this.socialSharing.share(message, subject).then(() => {    
      console.log("Shared successfully!");
    }).catch((error) => {
      console.error("Error while sharing ", error);
    });    

  }

  async editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = await this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
    this.inputDialogService.showPrompt(item, index);
  } 

  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }
}
