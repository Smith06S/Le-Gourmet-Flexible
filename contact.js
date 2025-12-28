// Handle reservation form submission
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('reservationForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        guests: document.getElementById('guests').value,
        location: document.getElementById('location').value,
        serviceType: document.getElementById('serviceType').value,
        requests: document.getElementById('requests').value
      };
      
      // Display confirmation message
      alert(`Merci pour votre réservation, ${formData.name}!\n\nNous avons reçu votre demande pour ${formData.guests} personne(s) le ${formData.date} à ${formData.time}.\n\nVous recevrez une confirmation à ${formData.email}`);
      
      // Reset form
      form.reset();
    });
  }
});
