import { Global, Injectable, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as serviceAccount from '../firebase-config.json';

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
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const storage = this.getStorageinstance();
    const bucket = storage.bucket();
    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise<string>((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });
      stream.on('finish', async () => {
        try {
          resolve(fileName);
        } catch (error) {
          reject(error);
        }
      });

      stream.end(file.buffer);
    });
  }
  async getAuthenticatedFileUrl(fileName: string): Promise<string> {
    const file = this.storage.bucket().file(fileName);
    const url = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 3600 * 1000,
    });
    return url[0];
  }
}

@Global()
@Module({
  imports: [],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
