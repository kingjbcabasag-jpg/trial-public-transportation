// Mock Database for Route Information System
const mockRoutes = [
    {
        id: 1,
        name: "Express Line A",
        duration: "25 min",
        transfers: 0,
        fare: "$2.50",
        modes: ["bus"],
        steps: [
            { title: "Board Bus 101 at Origin", desc: "Departs every 10 mins" },
            { title: "Ride 5 stops", desc: "Approx. 20 minutes travel time" },
            { title: "Arrive at Destination", desc: "Walk 2 minutes to final destination" }
        ]
    },
    {
        id: 2,
        name: "Metro Rapid Transit (Blue Line)",
        duration: "18 min",
        transfers: 0,
        fare: "$3.00",
        modes: ["metro"],
        steps: [
            { title: "Walk to Metro Station", desc: "Entrance 200m away" },
            { title: "Take Blue Line Metro", desc: "3 stops to destination" },
            { title: "Exit Station", desc: "Arrive at Destination" }
        ]
    },
    {
        id: 3,
        name: "Combined Rail & Bus Transfer",
        duration: "32 min",
        transfers: 1,
        fare: "$4.00",
        modes: ["train", "bus"],
        steps: [
            { title: "Board Commuter Train 4B", desc: "Ride to Central Junction" },
            { title: "Transfer to Shuttle Bus 12", desc: "5 minute transfer time" },
            { title: "Arrive at Destination", desc: "Final Stop" }
        ]
    }
];

// DOM Elements
const routeForm = document.getElementById('route-form');
const originInput = document.getElementById('origin');
const destinationInput = document.getElementById('destination');
const modeSelect = document.getElementById('mode');
const resultsList = document.getElementById('route-results-list');
const routeDetails = document.getElementById('route-details');
const detailTitle = document.getElementById('detail-title');
const detailContent = document.getElementById('detail-content');
const closeDetailsBtn = document.getElementById('close-details-btn');
const mapStatus = document.getElementById('map-status');

// Handle Form Submission
routeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const origin = originInput.value.trim();
    const destination = destinationInput.value.trim();
    const selectedMode = modeSelect.value;

    if (!origin || !destination) return;

    searchRoutes(origin, destination, selectedMode);
});

// Search and Display Routes
function searchRoutes(origin, destination, modeFilter) {
    resultsList.innerHTML = '<p class="placeholder-text">Searching for optimal routes...</p>';
    
    setTimeout(() => {
        let filtered = mockRoutes;
        if (modeFilter !== 'all') {
            filtered = mockRoutes.filter(r => r.modes.includes(modeFilter));
        }

        if (filtered.length === 0) {
            resultsList.innerHTML = '<p class="placeholder-text">No routes found matching your criteria.</p>';
            return;
        }

        resultsList.innerHTML = '';
        filtered.forEach(route => {
            const card = document.createElement('div');
            card.className = 'route-card';
            card.innerHTML = `
                <div class="route-card-header">
                    <span class="route-name">${route.name}</span>
                    <span class="route-duration">${route.duration}</span>
                </div>
                <div class="route-meta">
                    <span><i class="fa-solid fa-arrows-split-up-and-left"></i> ${route.transfers} transfers</span>
                    <span><i class="fa-solid fa-ticket"></i> ${route.fare}</span>
                </div>
                <div class="route-tags">
                    ${route.modes.map(m => `<span class="badge badge-${m}">${m.toUpperCase()}</span>`).join('')}
                </div>
            `;

            card.addEventListener('click', () => selectRoute(route, card));
            resultsList.appendChild(card);
        });

        mapStatus.textContent = `Showing routes from ${origin} to ${destination}`;
    }, 400);
}

// Select a Route and Show Details
function selectRoute(route, cardElement) {
    document.querySelectorAll('.route-card').forEach(c => c.classList.remove('active'));
    cardElement.classList.add('active');

    detailTitle.textContent = route.name;
    detailContent.innerHTML = route.steps.map(step => `
        <div class="step-item">
            <div class="step-icon"><i class="fa-solid fa-location-dot"></i></div>
            <div class="step-text">
                <h4>${step.title}</h4>
                <p>${step.desc}</p>
            </div>
        </div>
    `).join('');

    routeDetails.classList.remove('hidden');
}

// Close Route Details
closeDetailsBtn.addEventListener('click', () => {
    routeDetails.classList.add('hidden');
    document.querySelectorAll('.route-card').forEach(c => c.classList.remove('active'));
});
