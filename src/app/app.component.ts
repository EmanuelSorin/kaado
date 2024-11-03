import { Component } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Japo';
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtcPrgwyuMEG7KE1ZOCvuGOyAhLggxh-o",
  authDomain: "kaado-f0e50.firebaseapp.com",
  projectId: "kaado-f0e50",
  storageBucket: "kaado-f0e50.firebasestorage.app",
  messagingSenderId: "822862642234",
  appId: "1:822862642234:web:8ee81c34a8205e1e474903"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);