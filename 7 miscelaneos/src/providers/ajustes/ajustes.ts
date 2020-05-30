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
        console.log("inicializando storage");
        this.storage.ready().then(() => {
          console.log("storage listo");
          this.storage.get("ajustes").then(ajustes => {
            if(ajustes) {
              this.ajustes = ajustes;
            }
            
            resolve();
          });
        })
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
      this.storage.ready().then(() => {
        this.storage.set("ajustes", this.ajustes);
      });
    } else {
      localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
    }
  }
}
