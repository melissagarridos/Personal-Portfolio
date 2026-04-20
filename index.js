const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.name.value;
        const email = this.email.value;
        const phone = this.phone.value;
        const message = this.message.value;

        // Validación básica
        if (!name || !email) {
            alert("Please fill required fields");
            return;
        }

        // Contenido del archivo TXT
        const content = 
`----- NEW CONTACT -----
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
Date: ${new Date().toLocaleString()}

`;

        // Crear archivo
        const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        // Descargar archivo
        const a = document.createElement("a");
        a.href = url;
        a.download = `contact_${Date.now()}.txt`;
        a.click();

        URL.revokeObjectURL(url);

        // UI feedback
        const btn = this.querySelector('button[type="submit"]');
        btn.textContent = "Saved ✓";
        btn.disabled = true;

        document.getElementById('successMsg').style.display = 'block';

        this.reset();
    });
}