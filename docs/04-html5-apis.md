# Module 4: HTML5 APIs for Interactive Web Applications

## Learning Objectives

By the end of this module, you will:
- Master Canvas API for graphics and animations
- Implement client-side storage with Web Storage and IndexedDB
- Use Geolocation and other device APIs
- Handle file operations and drag-and-drop
- Build offline-capable applications with Service Workers
- Integrate multimedia APIs for rich user experiences

## 4.1 Canvas API for Graphics

### 2D Canvas Fundamentals

```html
<canvas id="drawing-canvas" width="800" height="600">
  Your browser does not support the HTML5 Canvas element.
</canvas>

<div class="canvas-controls">
  <button id="clear-canvas">Clear</button>
  <input type="color" id="color-picker" value="#000000">
  <input type="range" id="brush-size" min="1" max="50" value="5">
  <label for="brush-size">Brush Size</label>
</div>

<script>
class DrawingCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.currentColor = '#000000';
    this.currentSize = 5;
    
    this.setupCanvas();
    this.bindEvents();
  }
  
  setupCanvas() {
    // Set up high DPI canvas
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    
    // Set default styles
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }
  
  bindEvents() {
    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
    this.canvas.addEventListener('mousemove', (e) => this.draw(e));
    this.canvas.addEventListener('mouseup', () => this.stopDrawing());
    this.canvas.addEventListener('mouseout', () => this.stopDrawing());
    
    // Touch events for mobile
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      this.canvas.dispatchEvent(mouseEvent);
    });
    
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      this.canvas.dispatchEvent(mouseEvent);
    });
    
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      const mouseEvent = new MouseEvent('mouseup', {});
      this.canvas.dispatchEvent(mouseEvent);
    });
    
    // Control events
    document.getElementById('clear-canvas').addEventListener('click', () => {
      this.clearCanvas();
    });
    
    document.getElementById('color-picker').addEventListener('change', (e) => {
      this.currentColor = e.target.value;
    });
    
    document.getElementById('brush-size').addEventListener('input', (e) => {
      this.currentSize = e.target.value;
    });
  }
  
  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
  
  startDrawing(e) {
    this.isDrawing = true;
    const pos = this.getMousePos(e);
    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  }
  
  draw(e) {
    if (!this.isDrawing) return;
    
    const pos = this.getMousePos(e);
    this.ctx.strokeStyle = this.currentColor;
    this.ctx.lineWidth = this.currentSize;
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }
  
  stopDrawing() {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.ctx.beginPath();
    }
  }
  
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  saveAsImage() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = this.canvas.toDataURL();
    link.click();
  }
}

// Initialize drawing canvas
document.addEventListener('DOMContentLoaded', () => {
  new DrawingCanvas('drawing-canvas');
});
</script>
```

> 📖 **MDN Reference**: [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

### Advanced Canvas Techniques

```html
<canvas id="animation-canvas" width="800" height="400"></canvas>
<div class="animation-controls">
  <button id="start-animation">Start</button>
  <button id="stop-animation">Stop</button>
  <button id="reset-animation">Reset</button>
</div>

<script>
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.isRunning = false;
    
    this.bindEvents();
    this.createParticles();
  }
  
  createParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: Math.random() * 5 + 2,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.005
      });
    }
  }
  
  updateParticles() {
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off walls
      if (particle.x <= particle.radius || particle.x >= this.canvas.width - particle.radius) {
        particle.vx *= -0.8;
      }
      if (particle.y <= particle.radius || particle.y >= this.canvas.height - particle.radius) {
        particle.vy *= -0.8;
      }
      
      // Update life
      particle.life -= particle.decay;
      
      // Remove dead particles
      if (particle.life <= 0) {
        this.particles.splice(index, 1);
        // Add new particle
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          radius: Math.random() * 5 + 2,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
          life: 1.0,
          decay: Math.random() * 0.02 + 0.005
        });
      }
    });
  }
  
  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.globalAlpha = particle.life;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
      this.ctx.restore();
    });
  }
  
  animate() {
    if (!this.isRunning) return;
    
    this.updateParticles();
    this.drawParticles();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }
  
  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
  
  reset() {
    this.stop();
    this.particles = [];
    this.createParticles();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  bindEvents() {
    document.getElementById('start-animation').addEventListener('click', () => this.start());
    document.getElementById('stop-animation').addEventListener('click', () => this.stop());
    document.getElementById('reset-animation').addEventListener('click', () => this.reset());
  }
}

// Initialize particle system
document.addEventListener('DOMContentLoaded', () => {
  new ParticleSystem('animation-canvas');
});
</script>
```

## 4.2 Web Storage APIs

### Local Storage and Session Storage

```html
<div class="storage-demo">
  <h3>Preferences Manager</h3>
  
  <form id="preferences-form">
    <label for="theme">Theme</label>
    <select id="theme" name="theme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="auto">Auto</option>
    </select>
    
    <label for="language">Language</label>
    <select id="language" name="language">
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
    </select>
    
    <label>
      <input type="checkbox" id="notifications" name="notifications">
      Enable notifications
    </label>
    
    <button type="button" id="save-preferences">Save Preferences</button>
    <button type="button" id="clear-preferences">Clear All</button>
  </form>
  
  <div id="storage-info"></div>
</div>

<script>
class PreferencesManager {
  constructor() {
    this.storageKey = 'userPreferences';
    this.loadPreferences();
    this.bindEvents();
    this.updateStorageInfo();
  }
  
  bindEvents() {
    document.getElementById('save-preferences').addEventListener('click', () => {
      this.savePreferences();
    });
    
    document.getElementById('clear-preferences').addEventListener('click', () => {
      this.clearPreferences();
    });
    
    // Auto-save on change
    document.getElementById('preferences-form').addEventListener('change', () => {
      this.savePreferences();
    });
    
    // Listen for storage changes from other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === this.storageKey) {
        this.loadPreferences();
        this.showNotification('Preferences updated from another tab');
      }
    });
  }
  
  savePreferences() {
    const form = document.getElementById('preferences-form');
    const formData = new FormData(form);
    
    const preferences = {
      theme: formData.get('theme'),
      language: formData.get('language'),
      notifications: formData.has('notifications'),
      timestamp: Date.now()
    };
    
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(preferences));
      this.applyPreferences(preferences);
      this.updateStorageInfo();
      this.showNotification('Preferences saved successfully');
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        this.showNotification('Storage quota exceeded', 'error');
      } else {
        this.showNotification('Failed to save preferences', 'error');
      }
    }
  }
  
  loadPreferences() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const preferences = JSON.parse(stored);
        this.populateForm(preferences);
        this.applyPreferences(preferences);
      }
    } catch (e) {
      console.error('Failed to load preferences:', e);
      this.showNotification('Failed to load preferences', 'error');
    }
  }
  
  populateForm(preferences) {
    document.getElementById('theme').value = preferences.theme || 'light';
    document.getElementById('language').value = preferences.language || 'en';
    document.getElementById('notifications').checked = preferences.notifications || false;
  }
  
  applyPreferences(preferences) {
    // Apply theme
    document.body.className = `theme-${preferences.theme}`;
    
    // Apply language (in a real app, you'd load language resources)
    document.documentElement.lang = preferences.language;
    
    // Handle notifications preference
    if (preferences.notifications && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  }
  
  clearPreferences() {
    localStorage.removeItem(this.storageKey);
    
    // Reset form to defaults
    document.getElementById('theme').value = 'light';
    document.getElementById('language').value = 'en';
    document.getElementById('notifications').checked = false;
    
    // Apply defaults
    this.applyPreferences({ theme: 'light', language: 'en', notifications: false });
    this.updateStorageInfo();
    this.showNotification('Preferences cleared');
  }
  
  updateStorageInfo() {
    const info = document.getElementById('storage-info');
    
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then(estimate => {
        const used = estimate.usage || 0;
        const quota = estimate.quota || 0;
        const usedMB = (used / 1024 / 1024).toFixed(2);
        const quotaMB = (quota / 1024 / 1024).toFixed(2);
        
        info.innerHTML = `
          <h4>Storage Information</h4>
          <p>Used: ${usedMB} MB of ${quotaMB} MB</p>
          <p>Local Storage: ${this.getLocalStorageSize()} items</p>
        `;
      });
    } else {
      info.innerHTML = `
        <h4>Storage Information</h4>
        <p>Local Storage: ${this.getLocalStorageSize()} items</p>
      `;
    }
  }
  
  getLocalStorageSize() {
    return Object.keys(localStorage).length;
  }
  
  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }
}

// Initialize preferences manager
document.addEventListener('DOMContentLoaded', () => {
  new PreferencesManager();
});
</script>
```

> 📖 **MDN Reference**: [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)

### IndexedDB for Complex Data

```html
<div class="indexeddb-demo">
  <h3>Task Manager with IndexedDB</h3>
  
  <form id="task-form">
    <input type="text" id="task-title" placeholder="Task title" required>
    <textarea id="task-description" placeholder="Task description"></textarea>
    <select id="task-priority">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <button type="submit">Add Task</button>
  </form>
  
  <div id="task-list"></div>
  
  <button id="export-tasks">Export Tasks</button>
  <input type="file" id="import-tasks" accept=".json" style="display: none;">
  <button onclick="document.getElementById('import-tasks').click()">Import Tasks</button>
</div>

<script>
class TaskManager {
  constructor() {
    this.dbName = 'TaskManagerDB';
    this.dbVersion = 1;
    this.db = null;
    
    this.initDB().then(() => {
      this.bindEvents();
      this.loadTasks();
    });
  }
  
  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create tasks object store
        if (!db.objectStoreNames.contains('tasks')) {
          const taskStore = db.createObjectStore('tasks', { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          
          // Create indexes
          taskStore.createIndex('title', 'title', { unique: false });
          taskStore.createIndex('priority', 'priority', { unique: false });
          taskStore.createIndex('created', 'created', { unique: false });
          taskStore.createIndex('completed', 'completed', { unique: false });
        }
      };
    });
  }
  
  bindEvents() {
    document.getElementById('task-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTask();
    });
    
    document.getElementById('export-tasks').addEventListener('click', () => {
      this.exportTasks();
    });
    
    document.getElementById('import-tasks').addEventListener('change', (e) => {
      this.importTasks(e.target.files[0]);
    });
  }
  
  async addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const priority = document.getElementById('task-priority').value;
    
    const task = {
      title,
      description,
      priority,
      completed: false,
      created: new Date().toISOString(),
      updated: new Date().toISOString()
    };
    
    try {
      await this.saveTask(task);
      this.clearForm();
      this.loadTasks();
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  }
  
  async saveTask(task) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['tasks'], 'readwrite');
      const store = transaction.objectStore('tasks');
      const request = store.add(task);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async getAllTasks() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['tasks'], 'readonly');
      const store = transaction.objectStore('tasks');
      const request = store.getAll();
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  async updateTask(id, updates) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['tasks'], 'readwrite');
      const store = transaction.objectStore('tasks');
      const getRequest = store.get(id);
      
      getRequest.onsuccess = () => {
        const task = getRequest.result;
        Object.assign(task, updates, { updated: new Date().toISOString() });
        
        const updateRequest = store.put(task);
        updateRequest.onsuccess = () => resolve();
        updateRequest.onerror = () => reject(updateRequest.error);
      };
      
      getRequest.onerror = () => reject(getRequest.error);
    });
  }
  
  async deleteTask(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['tasks'], 'readwrite');
      const store = transaction.objectStore('tasks');
      const request = store.delete(id);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  async loadTasks() {
    try {
      const tasks = await this.getAllTasks();
      this.renderTasks(tasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }
  
  renderTasks(tasks) {
    const container = document.getElementById('task-list');
    
    if (tasks.length === 0) {
      container.innerHTML = '<p>No tasks found. Add your first task above!</p>';
      return;
    }
    
    container.innerHTML = tasks.map(task => `
      <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
        <div class="task-content">
          <h4>${task.title}</h4>
          <p>${task.description}</p>
          <span class="task-priority priority-${task.priority}">${task.priority}</span>
          <span class="task-date">${new Date(task.created).toLocaleDateString()}</span>
        </div>
        <div class="task-actions">
          <button onclick="taskManager.toggleComplete(${task.id})" 
                  class="toggle-btn">
            ${task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button onclick="taskManager.deleteTaskById(${task.id})" 
                  class="delete-btn">
            Delete
          </button>
        </div>
      </div>
    `).join('');
  }
  
  async toggleComplete(id) {
    try {
      const transaction = this.db.transaction(['tasks'], 'readonly');
      const store = transaction.objectStore('tasks');
      const request = store.get(id);
      
      request.onsuccess = async () => {
        const task = request.result;
        await this.updateTask(id, { completed: !task.completed });
        this.loadTasks();
      };
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  }
  
  async deleteTaskById(id) {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await this.deleteTask(id);
        this.loadTasks();
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  }
  
  async exportTasks() {
    try {
      const tasks = await this.getAllTasks();
      const dataStr = JSON.stringify(tasks, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
    } catch (error) {
      console.error('Failed to export tasks:', error);
    }
  }
  
  async importTasks(file) {
    if (!file) return;
    
    try {
      const text = await file.text();
      const tasks = JSON.parse(text);
      
      for (const task of tasks) {
        delete task.id; // Let IndexedDB assign new IDs
        await this.saveTask(task);
      }
      
      this.loadTasks();
      alert(`Imported ${tasks.length} tasks successfully!`);
    } catch (error) {
      console.error('Failed to import tasks:', error);
      alert('Failed to import tasks. Please check the file format.');
    }
  }
  
  clearForm() {
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('task-priority').value = 'medium';
  }
}

// Initialize task manager
let taskManager;
document.addEventListener('DOMContentLoaded', () => {
  taskManager = new TaskManager();
});
</script>
```

> 📖 **MDN Reference**: [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

## 4.3 Geolocation and Device APIs

### Geolocation API

```html
<div class="geolocation-demo">
  <h3>Location Services</h3>
  
  <button id="get-location">Get Current Location</button>
  <button id="watch-location">Watch Location</button>
  <button id="stop-watching">Stop Watching</button>
  
  <div id="location-info"></div>
  <div id="map-container"></div>
</div>

<script>
class LocationService {
  constructor() {
    this.watchId = null;
    this.bindEvents();
    this.checkGeolocationSupport();
  }
  
  checkGeolocationSupport() {
    if (!('geolocation' in navigator)) {
      document.getElementById('location-info').innerHTML = 
        '<p class="error">Geolocation is not supported by this browser.</p>';
    }
  }
  
  bindEvents() {
    document.getElementById('get-location').addEventListener('click', () => {
      this.getCurrentLocation();
    });
    
    document.getElementById('watch-location').addEventListener('click', () => {
      this.watchLocation();
    });
    
    document.getElementById('stop-watching').addEventListener('click', () => {
      this.stopWatching();
    });
  }
  
  getCurrentLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // Cache for 1 minute
    };
    
    this.showStatus('Getting your location...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => this.onLocationSuccess(position),
      (error) => this.onLocationError(error),
      options
    );
  }
  
  watchLocation() {
    if (this.watchId !== null) {
      this.stopWatching();
    }
    
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 30000
    };
    
    this.showStatus('Watching your location...');
    
    this.watchId = navigator.geolocation.watchPosition(
      (position) => this.onLocationSuccess(position, true),
      (error) => this.onLocationError(error),
      options
    );
  }
  
  stopWatching() {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
      this.showStatus('Stopped watching location.');
    }
  }
  
  onLocationSuccess(position, isWatching = false) {
    const { latitude, longitude, accuracy, altitude, heading, speed } = position.coords;
    const timestamp = new Date(position.timestamp);
    
    const locationInfo = `
      <div class="location-data">
        <h4>${isWatching ? 'Current Location (Live)' : 'Current Location'}</h4>
        <p><strong>Latitude:</strong> ${latitude.toFixed(6)}</p>
        <p><strong>Longitude:</strong> ${longitude.toFixed(6)}</p>
        <p><strong>Accuracy:</strong> ±${accuracy.toFixed(0)} meters</p>
        ${altitude ? `<p><strong>Altitude:</strong> ${altitude.toFixed(0)} meters</p>` : ''}
        ${heading ? `<p><strong>Heading:</strong> ${heading.toFixed(0)}°</p>` : ''}
        ${speed ? `<p><strong>Speed:</strong> ${speed.toFixed(1)} m/s</p>` : ''}
        <p><strong>Last Updated:</strong> ${timestamp.toLocaleString()}</p>
        
        <div class="location-actions">
          <button onclick="locationService.getAddressFromCoords(${latitude}, ${longitude})">
            Get Address
          </button>
          <button onclick="locationService.openInMaps(${latitude}, ${longitude})">
            Open in Maps
          </button>
        </div>
      </div>
    `;
    
    document.getElementById('location-info').innerHTML = locationInfo;
    
    // Show simple map (you'd typically use a real mapping service)
    this.showSimpleMap(latitude, longitude);
  }
  
  onLocationError(error) {
    let message;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        message = 'Location access denied by user.';
        break;
      case error.POSITION_UNAVAILABLE:
        message = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        message = 'Location request timed out.';
        break;
      default:
        message = 'An unknown error occurred.';
        break;
    }
    
    document.getElementById('location-info').innerHTML = 
      `<p class="error">Error: ${message}</p>`;
  }
  
  async getAddressFromCoords(lat, lon) {
    // In a real application, you'd use a geocoding service
    // This is a simplified example
    try {
      const response = await fetch(
        `https://api.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      
      if (data.display_name) {
        alert(`Address: ${data.display_name}`);
      } else {
        alert('Address not found for this location.');
      }
    } catch (error) {
      alert('Failed to get address information.');
    }
  }
  
  openInMaps(lat, lon) {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    window.open(url, '_blank');
  }
  
  showSimpleMap(lat, lon) {
    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = `
      <div class="simple-map">
        <h4>Location Map</h4>
        <p>📍 You are here: ${lat.toFixed(4)}, ${lon.toFixed(4)}</p>
        <div class="map-placeholder">
          <p>In a real application, this would show an interactive map.</p>
          <p>Consider using services like Google Maps, Mapbox, or OpenStreetMap.</p>
        </div>
      </div>
    `;
  }
  
  showStatus(message) {
    document.getElementById('location-info').innerHTML = 
      `<p class="status">${message}</p>`;
  }
}

// Initialize location service
let locationService;
document.addEventListener('DOMContentLoaded', () => {
  locationService = new LocationService();
});
</script>
```

> 📖 **MDN Reference**: [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

## Mastery Checkpoints

### Self-Assessment Questions

1. **Canvas vs SVG**: When would you use Canvas API vs SVG for graphics?

2. **Storage Strategy**: How do you choose between localStorage, sessionStorage, and IndexedDB?

3. **Performance**: What are the performance considerations when using HTML5 APIs?

4. **Progressive Enhancement**: How do you handle browsers that don't support certain APIs?

### Practical Exercises

1. **Interactive Dashboard**: Build a dashboard using multiple HTML5 APIs
2. **Offline App**: Create an application that works offline using storage APIs
3. **Location-based App**: Build an app that uses geolocation for functionality

### Project Ideas

- **Drawing Application**: Full-featured drawing app with Canvas
- **Personal Task Manager**: Offline-capable task manager with IndexedDB
- **Location Tracker**: GPS tracking app with real-time updates

## Next Steps

Ready to enhance your HTML with custom data management? Continue to [Module 05: Using Custom Data Attributes](05-custom-data-attributes.md) to learn how to effectively use data-* attributes in modern web applications.

---

### Additional Resources

- [MDN: HTML5 APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [Can I Use](https://caniuse.com/) - Browser support tables
- [Web.dev: Capabilities](https://web.dev/capabilities/) - Modern web capabilities 