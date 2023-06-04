// User registration
const register = async (name, email, phone, password) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    await user.updateProfile({ displayName: name });
    await database.ref("users/" + user.uid).set({
      name: name,
      email: email,
      phone: phone
    });
    console.log("Registration successful.", user);
    // Add any additional logic you need after successful registration
  } catch (error) {
    console.error("Registration failed.", error);
  }
};

// User login
const login = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    console.log("Login successful.", userCredential.user);
    // Add any additional logic you need after successful login
  } catch (error) {
    console.error("Login failed.", error);
  }
};
