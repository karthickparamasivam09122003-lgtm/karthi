// Sign In form submit aagumbothu intha function run aagum
document.getElementById("registerForm").addEventListener("submit", function(event) {
    
    // 1. Form submit aagi page reload aagama thaduka
    event.preventDefault();

    // 2. Input box-la irukura values-a eduka
    let userId = document.getElementById("new-userid").value;
    let password = document.getElementById("new-password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    // 3. Password rendum same-a irukka nu check panna
    if (password !== confirmPassword) {
        alert("Password and Confirm Password match aagala! Marupadiyum try pannunga.");
        return;
    }

    // 4. Data-va CSV format la maathuka (Excel la open pannalama)
    let csvContent = "User ID,Password\n"; // Header row
    csvContent += userId + "," + password + "\n"; // Data row

    // 5. Oru file (Blob) create panni download panna
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement("a");
    let url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", "users.csv"); // File peru users.csv
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 6. User-ku alert kaatu
    alert("Success! Data saved to users.csv. Ithu unga Downloads folder la irukum. Adha Excel la open pannunga.");

    // 7. Form-a clear panna
    document.getElementById("registerForm").reset();
});