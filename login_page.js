// login_page.js

// Callback function when user successfully logs in via Google
function handleCredentialResponse(response) {
    try {
        const data = parseJwt(response.credential);
        
        // Show user info on the UI
        document.getElementById("user-name").innerText = data.name;
        document.getElementById("user-info").style.display = "block";

        console.log("✅ Google Login Successful");
        console.log("Name:", data.name);
        console.log("Email:", data.email);
        console.log("Profile Image:", data.picture); // Optional if you want to show image
    } catch (error) {
        console.error("❌ Error parsing Google token:", error);
        alert("Google Sign-In failed. Please try again.");
    }
}

// Function to decode JWT token payload
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join('')
    );
    return JSON.parse(jsonPayload);
}
