document.addEventListener('DOMContentLoaded', () => {
    console.log('Sitio cargado correctamente');

    // Referencias a los elementos del DOM
    const eventDetailsModal = document.getElementById('eventDetailsModal');
    const thankYouModal = document.getElementById('thankYouModal');
    const closeButtons = document.querySelectorAll('.close-button'); // Botón X en el modal de detalles
    const closeThankYouModalBtn = document.getElementById('closeThankYouModalBtn');
    const eventsGrid = document.getElementById('eventsGrid');
    const donationAmountBtns = document.querySelectorAll('.donation-amount-btn');
    const otherAmountInput = document.getElementById('otherAmount');
    const donateNowBtn = document.getElementById('donateNowBtn');
    const thankYouMessage = thankYouModal.querySelector('.thank-you-message');

    let selectedDonationAmount = 0; // Para almacenar el monto de la donación seleccionada

    // Datos de ejemplo para los eventos (usando rutas de imágenes locales)
const eventsData = [
    {
        id: 1,
        category: 'music', // Corregido
        date: '14 jul 2025',
        title: 'Festival de Jazz de Verano',
        organizer: 'Fondo de Educación Musical',
        image: 'img/mi-evento-jazz.jpg',
        time: '7:00 PM - 11:00 PM',
        location: 'Escenario Principal',
        description: 'Tu donación ayuda a proporcionar instrumentos y clases de música a niños que de otra manera no podrían pagarlos.'
    },
    {
        id: 2,
        category: 'comedy', // Corregido
        date: '21 jul 2025',
        title: 'Noche de Comedia Stand-Up',
        organizer: 'Concienciación sobre Salud Mental',
        image: 'img/mi-evento-comedia.jpg',
        time: '8:00 PM - 10:00 PM',
        location: 'Teatro Municipal',
        description: 'Un evento para reír y apoyar una causa importante.'
    },
    {
        id: 3,
        category: 'theater', // Corregido
        date: '26 jul 2025',
        title: 'Romeo y Julieta: Versión Moderna',
        organizer: 'Programa de Artes Juveniles',
        image: 'img/mi-evento-teatro.jpg',
        time: '6:30 PM - 9:00 PM',
        location: 'Auditorio Central',
        description: 'Una adaptación contemporánea de la clásica historia de amor.'
    },
    {
        id: 4,
        category: 'music', // Corregido
        date: '05 ago 2025',
        title: 'Concierto de Orquesta Filarmónica',
        organizer: 'Academia Musical Perú',
        image: 'img/mi-evento-musica.jpg',
        time: '7:00 PM - 9:30 PM',
        location: 'Gran Teatro Nacional',
        description: 'Disfruta de una noche de música clásica con la aclamada orquesta.'
    },
    {
        id: 5,
        category: 'art-exhibition', // Corregido
        date: '10 ago 2025',
        title: 'Exposición de Arte Contemporáneo',
        organizer: 'Galería de Arte Moderno',
        image: 'img/mi-evento-arte.jpg',
        time: '10:00 AM - 6:00 PM',
        location: 'Centro Cultural',
        description: 'Una muestra de las últimas tendencias en arte contemporáneo.'
    }
];

    // Función para cargar los detalles del evento en el modal
    function loadEventDetails(eventData) {
        eventDetailsModal.querySelector('.modal-event-image').src = eventData.image;
        eventDetailsModal.querySelector('.modal-event-category-date').textContent = `${eventData.category} ${eventData.date}`; // Combinar categoría y fecha
        eventDetailsModal.querySelector('.modal-event-title').textContent = eventData.title;
        eventDetailsModal.querySelector('.modal-event-time').textContent = `Hora: ${eventData.time}`;
        eventDetailsModal.querySelector('.modal-event-location').textContent = `Ubicación: ${eventData.location}`;
        eventDetailsModal.querySelector('.modal-event-organizer').textContent = eventData.organizer;
        eventDetailsModal.querySelector('.donation-description').textContent = eventData.description;

        // Resetear la selección de donación
        selectedDonationAmount = 0;
        donationAmountBtns.forEach(btn => btn.classList.remove('selected'));
        otherAmountInput.value = '';
    }

    // Eventos para cerrar los modales
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            eventDetailsModal.classList.remove('show'); // Oculta modal de detalles
            thankYouModal.classList.remove('show');     // Oculta modal de agradecimiento
        });
    });

    closeThankYouModalBtn.addEventListener('click', () => {
        thankYouModal.classList.remove('show'); // Oculta modal de agradecimiento
    });

    // Cierra modal al hacer clic fuera de su contenido
    window.addEventListener('click', (event) => {
        if (event.target == eventDetailsModal) {
            eventDetailsModal.classList.remove('show');
        }
        if (event.target == thankYouModal) {
            thankYouModal.classList.remove('show');
        }
    });

    // Lógica para seleccionar el monto de donación
    donationAmountBtns.forEach(button => {
        button.addEventListener('click', () => {
            donationAmountBtns.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedDonationAmount = parseInt(button.dataset.amount);
            otherAmountInput.value = ''; // Limpiar el campo "Otro" si se selecciona un botón
        });
    });

    otherAmountInput.addEventListener('input', () => {
        donationAmountBtns.forEach(btn => btn.classList.remove('selected'));
        selectedDonationAmount = parseInt(otherAmountInput.value) || 0;
    });

    // Lógica para el botón "Donar Ahora"
    donateNowBtn.addEventListener('click', () => {
        let finalAmount = selectedDonationAmount;
        if (otherAmountInput.value && !isNaN(parseInt(otherAmountInput.value))) {
            finalAmount = parseInt(otherAmountInput.value);
        }

        if (finalAmount > 0) {
            console.log(`Donación de S/. ${finalAmount} procesada.`);

            eventDetailsModal.classList.remove('show'); // Cerrar el modal de detalles
            thankYouMessage.textContent = `Tu contribución de S/. ${finalAmount} ayudará a que este evento sea un éxito.`;
            thankYouModal.classList.add('show'); // Mostrar el modal de agradecimiento
        } else {
            alert('Por favor, selecciona o ingresa un monto de donación válido.');
        }
    });

    // Lógica para el botón "Añadir al Calendario" (funcionalidad a implementar)
    document.getElementById('addToCalendarBtn').addEventListener('click', () => {
        alert('Funcionalidad "Añadir al Calendario" en desarrollo.');
        // Aquí iría la lógica para generar un archivo .ics o similar
    });

    // Función para renderizar los eventos en la cuadrícula
    function renderEvents(events) {
        eventsGrid.innerHTML = ''; // Limpiar la cuadrícula existente
        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.dataset.eventId = event.id; // Asignar un ID para identificar el evento
            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.title}">
                <div class="event-info">
                    <span class="event-category">${event.category}</span>
                    <span class="event-date">${event.date}</span>
                    <h3>${event.title}</h3>
                    <p class="event-organizer">${event.organizer}</p>
                    <button class="btn btn-details" data-event-id="${event.id}">Ver Detalles</button>
                </div>
            `;
            eventsGrid.appendChild(eventCard);
        });

        // Re-asignar eventos de click a los botones "Ver Detalles" recién creados
        document.querySelectorAll('.btn-details').forEach(button => {
            button.addEventListener('click', (e) => {
                const eventId = parseInt(e.target.dataset.eventId);
                const selectedEvent = eventsData.find(event => event.id === eventId);
                if (selectedEvent) {
                    loadEventDetails(selectedEvent);
                    eventDetailsModal.classList.add('show'); // Muestra el modal de detalles
                }
            });
        });
    }

    // Cargar todos los eventos al inicio
    renderEvents(eventsData);

    // Filtrar eventos por categoría
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.dataset.category;
            const filteredEvents = category === 'all' ? eventsData : eventsData.filter(event => event.category === category);
            renderEvents(filteredEvents);
        });
    });

    // Búsqueda de eventos
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredEvents = eventsData.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.organizer.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
        );
        renderEvents(filteredEvents);
    });

});