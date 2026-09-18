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

    // 4. users.xlsx file-a fetch panni read panna
    fetch('users.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            // 5. Excel file-a workbook-a maathuka
            let workbook = XLSX.read(data, { type: 'array' });
            
            // 6. First sheet-a eduka
            let sheetName = workbook.SheetNames[0];
            let worksheet = workbook.Sheets[sheetName];
            
            // 7. Excel data-va JSON-a maathuka
            let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            // 8. Puthu data-va add panna
            // Header row (User ID, Password) already irundha, adha skip pannum
            if (jsonData.length === 0) {
                // File khaali-ya irundha, header add pannum
                jsonData.push(["User ID", "Password"]);
            }
            
            // Puthu row add pannum
            jsonData.push([userId, password]);
            
            // 9. JSON data-va thirumba worksheet-a maathuka
            let newWorksheet = XLSX.utils.aoa_to_sheet(jsonData);
            
            // 10. Workbook la update pannum
            workbook.Sheets[sheetName] = newWorksheet;
            
            // 11. Puthu Excel file-a write panni download pannum
            XLSX.writeFile(workbook, "users.xlsx");
            
            // 12. User-ku alert kaatu
            alert("Success! Data saved to users.xlsx. Adha Excel la open pannunga.");
            
            // 13. Form-a clear panna
            document.getElementById("registerForm").reset();
        })
        .catch(error => {
            // File illama pona, puthu file create pannum
            console.log("File illa, puthu file create panren...");
            
            // Puthu workbook create pannum
            let workbook = XLSX.utils.book_new();
            let jsonData = [
                ["User ID", "Password"],
                [userId, password]
            ];
            
            let newWorksheet = XLSX.utils.aoa_to_sheet(jsonData);
            XLSX.utils.book_append_sheet(workbook, newWorksheet, "Users");
            
            // Puthu file-a download pannum
            XLSX.writeFile(workbook, "users.xlsx");
            
            alert("Puthu users.xlsx file create panniten! Adha Excel la open pannunga.");
            document.getElementById("registerForm").reset();
        });
});