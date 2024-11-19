const { initializeApp } = require('firebase/app');
const firebaseMock = require('firebase-mock');

const mockApp = new firebaseMock.MockFirebaseSdk();

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => mockApp),
}));


describe('Firebase Initialization Test', () => {
  it('should initialize Firebase app correctly', () => {
    const firebaseConfig = {
      apiKey: "AIzaSyAo3_gDE8fJoE8ceR0N6zZk6ProwcRgrGE",
      authDomain: "finalproj1-d59b4.firebaseapp.com",
      projectId: "finalproj1-d59b4",
      storageBucket: "finalproj1-d59b4.firebasestorage.app",
      messagingSenderId: "454890257473",
      appId: "1:454890257473:web:9529b48a296a26cd00dac0",
      measurementId: "G-Y20E0M05MY"
    };

    initializeApp(firebaseConfig);

    expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
  });
});