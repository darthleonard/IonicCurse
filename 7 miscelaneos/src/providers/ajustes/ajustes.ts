import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';


@Injectable()
export class AjustesService {
  ajustes = {
    mostrar_tutorial: true
  }

  constructor(private platform:Platform, private storage: Storage) {
    console.log('Hello AjustesProvider Provider');
  }

  cargarStorage() : Promise<any> {
    let promesa = new Promise((resolve, reject) => {
      if(this.platform.is("cordova")) {
      
      } else {
        if(localStorage.getItem("ajustes")) {
          this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
        }
        resolve();
      }
    });
    return promesa;
  }

  guardarStorage() {
    if(this.platform.is("cordova")) {
      
    } else {
      localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
    }
  }
}
