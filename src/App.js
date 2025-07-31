import React, { useEffect, useState } from 'react';
import { auth, provider, db } from './firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  collection,
  getDocs
} from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [destinations, setDestinations] = useState([]);

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch destinations from Firestore
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'destinations'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDestinations(data);
      };
      fetchData();
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>🌍 Tourism App</h1>

      {!user ? (
        <button onClick={handleLogin}>Sign in with Google</button>
      ) : (
        <>
          <div>
            <p>Welcome, {user.displayName}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>

          <h2>Top Destinations</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {destinations.map(dest => (
              <div key={dest.id} style={{
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '8px',
                width: '200px'
              }}>
                <img
                  src={dest.image}
                  alt={dest.name}
                  style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                />
                <h4>{dest.name}</h4>
                <p>{dest.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
