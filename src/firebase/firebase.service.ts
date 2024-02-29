import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from './config/firebase-config.json';

@Injectable()
export class FirebaseService {
  private readonly storage: admin.storage.Storage;
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'gs://ccs-storage.appspot.com',
    });
    this.storage = admin.storage();
  }
  getStorageinstance(): admin.storage.Storage {
    return this.storage;
  }
}
