// Multi-Timezone Digital Clock
class DigitalClock {
    constructor() {
        this.timezones = this.getDefaultTimezones();
        this.allTimezones = this.getAllTimezones();
        this.init();
    }

    // Get default timezones
    getDefaultTimezones() {
        return [
            'Asia/Kolkata',
            'America/New_York',
            'Europe/London',
            'Asia/Tokyo',
            'Australia/Sydney',
            'America/Los_Angeles'
        ];
    }

    // Get all available timezones
    getAllTimezones() {
        return [
            // Asia
            'Asia/Kolkata',
            'Asia/Bangkok',
            'Asia/Singapore',
            'Asia/Hong_Kong',
            'Asia/Shanghai',
            'Asia/Tokyo',
            'Asia/Seoul',
            'Asia/Dubai',
            'Asia/Jakarta',
            'Asia/Manila',
            'Asia/Bangkok',
            
            // Europe
            'Europe/London',
            'Europe/Paris',
            'Europe/Berlin',
            'Europe/Rome',
            'Europe/Madrid',
            'Europe/Amsterdam',
            'Europe/Moscow',
            'Europe/Istanbul',
            
            // Americas
            'America/New_York',
            'America/Chicago',
            'America/Denver',
            'America/Los_Angeles',
            'America/Toronto',
            'America/Mexico_City',
            'America/Sao_Paulo',
            'America/Buenos_Aires',
            
            // Oceania
            'Australia/Sydney',
            'Australia/Melbourne',
            'Australia/Brisbane',
            'Pacific/Auckland',
            
            // Africa
            'Africa/Cairo',
            'Africa/Lagos',
            'Africa/Johannesburg',
            'Africa/Nairobi'
        ];
    }

    // Initialize the clock
    init() {
        this.renderClocks();
        this.setupEventListeners();
        this.updateClocks();
        // Update every second
        setInterval(() => this.updateClocks(), 1000);
    }

    // Setup event listeners
    setupEventListeners() {
        document.getElementById('addTimezoneBtn').addEventListener('click', () => this.openModal());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetToDefaults());
        document.querySelector('.close').addEventListener('click', () => this.closeModal());
        document.getElementById('confirmTimezoneBtn').addEventListener('click', () => this.addTimezone());
        document.getElementById('timezoneSearch').addEventListener('input', (e) => this.filterTimezones(e.target.value));

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('timezoneModal');
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    // Open timezone modal
    openModal() {
        const modal = document.getElementById('timezoneModal');
        modal.classList.add('active');
        this.populateTimezoneSelect();
    }

    // Close timezone modal
    closeModal() {
        document.getElementById('timezoneModal').classList.remove('active');
        document.getElementById('timezoneSearch').value = '';
    }

    // Populate timezone select dropdown
    populateTimezoneSelect() {
        const select = document.getElementById('timezoneSelect');
        select.innerHTML = '';
        
        this.allTimezones.forEach(tz => {
            if (!this.timezones.includes(tz)) {
                const option = document.createElement('option');
                option.value = tz;
                option.textContent = tz.replace(/_/g, ' ');
                select.appendChild(option);
            }
        });
    }

    // Filter timezones based on search
    filterTimezones(searchTerm) {
        const select = document.getElementById('timezoneSelect');
        const options = select.querySelectorAll('option');
        
        options.forEach(option => {
            const text = option.textContent.toLowerCase();
            const matches = text.includes(searchTerm.toLowerCase());
            option.style.display = matches ? 'block' : 'none';
        });
    }

    // Add new timezone
    addTimezone() {
        const select = document.getElementById('timezoneSelect');
        const selectedTimezone = select.value;
        
        if (selectedTimezone && !this.timezones.includes(selectedTimezone)) {
            this.timezones.push(selectedTimezone);
            this.saveTimezones();
            this.renderClocks();
            this.closeModal();
        }
    }

    // Remove timezone
    removeTimezone(timezone) {
        this.timezones = this.timezones.filter(tz => tz !== timezone);
        this.saveTimezones();
        this.renderClocks();
    }

    // Reset to default timezones
    resetToDefaults() {
        if (confirm('Reset to default timezones?')) {
            this.timezones = this.getDefaultTimezones();
            this.saveTimezones();
            this.renderClocks();
        }
    }

    // Save timezones to localStorage
    saveTimezones() {
        localStorage.setItem('selectedTimezones', JSON.stringify(this.timezones));
    }

    // Load timezones from localStorage
    loadTimezones() {
        const saved = localStorage.getItem('selectedTimezones');
        if (saved) {
            try {
                this.timezones = JSON.parse(saved);
            } catch (e) {
                this.timezones = this.getDefaultTimezones();
            }
        }
    }

    // Render all clock cards
    renderClocks() {
        const grid = document.getElementById('clocksGrid');
        grid.innerHTML = '';

        if (this.timezones.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1/-1;">
                    <h3>No timezones selected</h3>
                    <p>Click "+ Add Timezone" to get started</p>
                </div>
            `;
            return;
        }

        this.timezones.forEach(timezone => {
            const card = this.createClockCard(timezone);
            grid.appendChild(card);
        });
    }

    // Create individual clock card
    createClockCard(timezone) {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.id = `clock-${timezone}`;

        card.innerHTML = `
            <div class="clock-header">
                <div>
                    <div class="timezone-name">${timezone.replace(/_/g, ' ')}</div>
                    <div class="timezone-offset" id="offset-${timezone}"></div>
                </div>
                <button class="remove-clock" onclick="clock.removeTimezone('${timezone}')">✕</button>
            </div>
            <div class="digital-display">
                <div class="time-display" id="time-${timezone}">00:00:00</div>
                <div class="date-display" id="date-${timezone}"></div>
            </div>
            <div class="clock-info">
                <div class="info-item">
                    <div class="info-label">12-Hour</div>
                    <div class="info-value" id="12hr-${timezone}">-</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Day</div>
                    <div class="info-value" id="day-${timezone}">-</div>
                </div>
            </div>
        `;

        return card;
    }

    // Update all clock displays
    updateClocks() {
        this.timezones.forEach(timezone => {
            this.updateClockDisplay(timezone);
        });
    }

    // Update individual clock display
    updateClockDisplay(timezone) {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            weekday: 'short'
        });

        const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).formatToParts(now);

        // Get 12-hour format
        const parts12 = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(now);

        // Get day name
        const dayFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            weekday: 'short'
        }).format(now);

        // Format time as HH:MM:SS
        let time = '';
        parts.forEach(part => {
            if (part.type === 'hour' || part.type === 'minute' || part.type === 'second') {
                time += (part.type === 'hour' && parts.findIndex(p => p.type === 'hour') === parts.indexOf(part) ? '' : part.value === '0' || part.type === 'hour' ? '' : '') + part.value;
                if (part.type !== 'second') time += ':';
            }
        });

        // Create 24-hour time
        const h = String(now.toLocaleString('en-US', {timeZone: timezone, hour12: false, hour: '2-digit'})).padStart(2, '0');
        const m = String(now.toLocaleString('en-US', {timeZone: timezone, hour12: false, minute: '2-digit'})).padStart(2, '0');
        const s = String(now.toLocaleString('en-US', {timeZone: timezone, hour12: false, second: '2-digit'})).padStart(2, '0');
        const time24 = `${h}:${m}:${s}`;

        // Get full date and time
        const fullDateTime = formatter.format(now);
        const dateMatch = fullDateTime.match(/([A-Za-z]+).*?(\d+)/);

        // Update DOM
        const timeEl = document.getElementById(`time-${timezone}`);
        const dateEl = document.getElementById(`date-${timezone}`);
        const hr12El = document.getElementById(`12hr-${timezone}`);
        const dayEl = document.getElementById(`day-${timezone}`);
        const offsetEl = document.getElementById(`offset-${timezone}`);

        if (timeEl) timeEl.textContent = time24;
        if (dateEl) dateEl.textContent = fullDateTime;
        if (hr12El) hr12El.textContent = parts12;
        if (dayEl) dayEl.textContent = dayFormatter;
        if (offsetEl) offsetEl.textContent = this.getTimezoneOffset(timezone);
    }

    // Get timezone offset
    getTimezoneOffset(timezone) {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            timeZoneName: 'shortOffset'
        });
        const parts = formatter.formatToParts(new Date());
        const offsetPart = parts.find(p => p.type === 'timeZoneName');
        return offsetPart ? offsetPart.value : '';
    }
}

// Initialize clock on page load
let clock;
document.addEventListener('DOMContentLoaded', () => {
    clock = new DigitalClock();
    clock.loadTimezones();
    clock.renderClocks();
    clock.updateClocks();
    setInterval(() => clock.updateClocks(), 1000);
});
