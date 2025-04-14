import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from './config/firebase';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const analytics = getAnalytics(app);
const auth = getAuth(app);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
