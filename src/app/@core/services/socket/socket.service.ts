import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'; // remove

@Injectable()
export class SocketGroupService {
 socket: any;

  constructor() {
    this.socket = io.connect('http://localhost:3000/');
  }

  on(eventName: any, callback: any) {
    if (this.socket) {
      this.socket.on(eventName, (data: any ) => {
        callback(data);
      });
    }
  }

  emit(eventName: any, data: any) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  removeListener(eventName: any) {
    if (this.socket) {
      this.socket.removeListener(eventName);
    }
  }



}


