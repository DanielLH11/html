# Module 5: Using Custom Data Attributes

## Learning Objectives

By the end of this module, you will:
- Master data-* attributes for storing custom data
- Implement data-driven interactions and styling
- Use dataset API for efficient data manipulation
- Create maintainable data architectures in HTML
- Build dynamic components with data attributes

## 5.1 Data Attribute Fundamentals

### Basic Data Attribute Syntax

```html
<!-- Product card with data attributes -->
<div class="product-card" 
     data-product-id="12345"
     data-category="electronics"
     data-price="299.99"
     data-in-stock="true"
     data-rating="4.5">
  <h3>Wireless Headphones</h3>
  <p>Premium quality sound</p>
  <button class="add-to-cart">Add to Cart</button>
</div>

<!-- Configuration data -->
<div id="app-config"
     data-api-url="https://api.example.com"
     data-version="2.1.0"
     data-debug="false"
     data-locale="en-US">
</div>

<!-- User interface state -->
<nav class="sidebar"
     data-collapsed="false"
     data-theme="dark"
     data-animation-speed="300">
  <!-- Navigation items -->
</nav>
```

> 📖 **MDN Reference**: [Using data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)

### Dataset API

```html
<div id="user-profile"
     data-user-id="42"
     data-user-name="John Doe"
     data-user-role="admin"
     data-last-login="2024-01-15T10:30:00Z"
     data-preferences='{"theme":"dark","notifications":true}'>
</div>

<script>
const profile = document.getElementById('user-profile');

// Reading data attributes
console.log(profile.dataset.userId);        // "42"
console.log(profile.dataset.userName);      // "John Doe"
console.log(profile.dataset.userRole);      // "admin"
console.log(profile.dataset.lastLogin);     // "2024-01-15T10:30:00Z"

// Converting data types
const userId = parseInt(profile.dataset.userId);
const lastLogin = new Date(profile.dataset.lastLogin);
const preferences = JSON.parse(profile.dataset.preferences);

// Writing data attributes
profile.dataset.userRole = 'moderator';
profile.dataset.lastSeen = new Date().toISOString();
profile.dataset.sessionCount = '15';

// Removing data attributes
delete profile.dataset.lastLogin;

// Checking if data attribute exists
if ('userId' in profile.dataset) {
  console.log('User ID is available');
}
</script>
```

## 5.2 Data-Driven Component Architecture

### Interactive Component System

```html
<div class="tab-container" 
     data-active-tab="0"
     data-animation="slide"
     data-auto-switch="false">
  
  <div class="tab-nav">
    <button class="tab-button" 
            data-tab-index="0" 
            data-tab-target="overview"
            aria-selected="true">
      Overview
    </button>
    <button class="tab-button" 
            data-tab-index="1" 
            data-tab-target="details">
      Details
    </button>
    <button class="tab-button" 
            data-tab-index="2" 
            data-tab-target="reviews">
      Reviews
    </button>
  </div>
  
  <div class="tab-content">
    <div class="tab-panel" 
         data-tab-id="overview" 
         data-loaded="true"
         aria-hidden="false">
      <h3>Product Overview</h3>
      <p>General product information...</p>
    </div>
    
    <div class="tab-panel" 
         data-tab-id="details" 
         data-loaded="false"
         aria-hidden="true">
      <h3>Product Details</h3>
      <!-- Content loaded dynamically -->
    </div>
    
    <div class="tab-panel" 
         data-tab-id="reviews" 
         data-loaded="false"
         aria-hidden="true">
      <h3>Customer Reviews</h3>
      <!-- Content loaded dynamically -->
    </div>
  </div>
</div>

<script>
class DataDrivenTabs {
  constructor(container) {
    this.container = container;
    this.activeTab = parseInt(container.dataset.activeTab) || 0;
    this.animation = container.dataset.animation || 'none';
    this.autoSwitch = container.dataset.autoSwitch === 'true';
    
    this.bindEvents();
    this.initializeTabs();
  }
  
  bindEvents() {
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-button')) {
        const tabIndex = parseInt(e.target.dataset.tabIndex);
        this.switchTab(tabIndex);
      }
    });
    
    // Keyboard navigation
    this.container.addEventListener('keydown', (e) => {
      if (e.target.classList.contains('tab-button')) {
        this.handleKeyNavigation(e);
      }
    });
  }
  
  switchTab(newIndex) {
    const buttons = this.container.querySelectorAll('.tab-button');
    const panels = this.container.querySelectorAll('.tab-panel');
    
    // Update active tab data
    this.container.dataset.activeTab = newIndex;
    this.activeTab = newIndex;
    
    // Update button states
    buttons.forEach((btn, index) => {
      const isActive = index === newIndex;
      btn.setAttribute('aria-selected', isActive);
      btn.dataset.active = isActive;
    });
    
    // Update panel visibility
    panels.forEach((panel, index) => {
      const isActive = index === newIndex;
      panel.setAttribute('aria-hidden', !isActive);
      panel.dataset.active = isActive;
      
      // Lazy load content if needed
      if (isActive && panel.dataset.loaded === 'false') {
        this.loadPanelContent(panel);
      }
    });
    
    // Apply animation
    this.applyAnimation(newIndex);
  }
  
  async loadPanelContent(panel) {
    const tabId = panel.dataset.tabId;
    panel.innerHTML = '<p>Loading...</p>';
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load content based on tab ID
      const content = await this.fetchTabContent(tabId);
      panel.innerHTML = content;
      panel.dataset.loaded = 'true';
    } catch (error) {
      panel.innerHTML = '<p>Error loading content</p>';
    }
  }
  
  async fetchTabContent(tabId) {
    // In a real app, this would make an API call
    const contentMap = {
      details: `
        <h3>Detailed Specifications</h3>
        <ul>
          <li>Weight: 250g</li>
          <li>Battery: 30 hours</li>
          <li>Connectivity: Bluetooth 5.0</li>
        </ul>
      `,
      reviews: `
        <h3>Customer Reviews</h3>
        <div class="review">
          <p>⭐⭐⭐⭐⭐ "Excellent sound quality!"</p>
        </div>
        <div class="review">
          <p>⭐⭐⭐⭐ "Great value for money."</p>
        </div>
      `
    };
    
    return contentMap[tabId] || '<p>Content not available</p>';
  }
  
  applyAnimation(newIndex) {
    if (this.animation === 'slide') {
      const panels = this.container.querySelectorAll('.tab-panel');
      panels.forEach((panel, index) => {
        panel.style.transform = `translateX(${(index - newIndex) * 100}%)`;
      });
    }
  }
  
  handleKeyNavigation(e) {
    const buttons = Array.from(this.container.querySelectorAll('.tab-button'));
    const currentIndex = buttons.indexOf(e.target);
    
    switch(e.key) {
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % buttons.length;
        buttons[nextIndex].focus();
        this.switchTab(nextIndex);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        buttons[prevIndex].focus();
        this.switchTab(prevIndex);
        break;
    }
  }
  
  initializeTabs() {
    this.switchTab(this.activeTab);
    
    if (this.autoSwitch) {
      this.startAutoSwitch();
    }
  }
  
  startAutoSwitch() {
    setInterval(() => {
      const buttons = this.container.querySelectorAll('.tab-button');
      const nextTab = (this.activeTab + 1) % buttons.length;
      this.switchTab(nextTab);
    }, 5000);
  }
}

// Initialize all tab containers
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab-container').forEach(container => {
    new DataDrivenTabs(container);
  });
});
</script>
```

### CSS Integration with Data Attributes

```css
/* Style based on data attributes */
.product-card[data-in-stock="false"] {
  opacity: 0.6;
  position: relative;
}

.product-card[data-in-stock="false"]::after {
  content: "Out of Stock";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 0, 0, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}

/* Rating stars */
.product-card[data-rating]::before {
  content: attr(data-rating) " ⭐";
  display: block;
  font-weight: bold;
  color: #ffa500;
}

/* Category-based styling */
.product-card[data-category="electronics"] {
  border-left: 4px solid #007bff;
}

.product-card[data-category="clothing"] {
  border-left: 4px solid #28a745;
}

/* Tab animations */
.tab-container[data-animation="slide"] .tab-content {
  overflow: hidden;
  position: relative;
}

.tab-container[data-animation="slide"] .tab-panel {
  transition: transform 0.3s ease;
  position: absolute;
  width: 100%;
}

/* Theme-based styling */
.sidebar[data-theme="dark"] {
  background: #2d3748;
  color: white;
}

.sidebar[data-collapsed="true"] {
  width: 60px;
}

.sidebar[data-collapsed="true"] .nav-text {
  display: none;
}
```

## 5.3 Advanced Data Patterns

### Configuration Management

```html
<div id="data-manager" 
     data-config='{"apiUrl":"https://api.example.com","timeout":5000,"retries":3}'>
  
  <!-- Component with inherited configuration -->
  <div class="api-component" 
       data-endpoint="/users"
       data-method="GET"
       data-cache="true">
    <button class="load-data">Load Users</button>
    <div class="data-display"></div>
  </div>
  
  <div class="api-component" 
       data-endpoint="/products"
       data-method="GET"
       data-cache="false"
       data-auto-refresh="30000">
    <button class="load-data">Load Products</button>
    <div class="data-display"></div>
  </div>
</div>

<script>
class DataManager {
  constructor() {
    this.config = this.loadGlobalConfig();
    this.bindEvents();
    this.initializeComponents();
  }
  
  loadGlobalConfig() {
    const manager = document.getElementById('data-manager');
    return JSON.parse(manager.dataset.config || '{}');
  }
  
  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('load-data')) {
        const component = e.target.closest('.api-component');
        this.loadComponentData(component);
      }
    });
  }
  
  initializeComponents() {
    document.querySelectorAll('.api-component').forEach(component => {
      if (component.dataset.autoRefresh) {
        const interval = parseInt(component.dataset.autoRefresh);
        setInterval(() => this.loadComponentData(component), interval);
      }
    });
  }
  
  async loadComponentData(component) {
    const config = this.getComponentConfig(component);
    const display = component.querySelector('.data-display');
    
    display.innerHTML = 'Loading...';
    
    try {
      const data = await this.fetchData(config);
      this.displayData(display, data, config);
      
      // Update component state
      component.dataset.lastLoaded = new Date().toISOString();
      component.dataset.status = 'loaded';
    } catch (error) {
      display.innerHTML = `Error: ${error.message}`;
      component.dataset.status = 'error';
    }
  }
  
  getComponentConfig(component) {
    return {
      endpoint: component.dataset.endpoint,
      method: component.dataset.method || 'GET',
      cache: component.dataset.cache === 'true',
      apiUrl: this.config.apiUrl,
      timeout: this.config.timeout,
      retries: this.config.retries
    };
  }
  
  async fetchData(config) {
    const url = `${config.apiUrl}${config.endpoint}`;
    
    // Check cache if enabled
    if (config.cache) {
      const cached = this.getCachedData(config.endpoint);
      if (cached) return cached;
    }
    
    const response = await fetch(url, {
      method: config.method,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Cache if enabled
    if (config.cache) {
      this.setCachedData(config.endpoint, data);
    }
    
    return data;
  }
  
  displayData(display, data, config) {
    if (Array.isArray(data)) {
      display.innerHTML = `
        <h4>Data (${data.length} items)</h4>
        <ul>
          ${data.slice(0, 5).map(item => 
            `<li>${JSON.stringify(item, null, 2)}</li>`
          ).join('')}
        </ul>
        ${data.length > 5 ? `<p>... and ${data.length - 5} more items</p>` : ''}
      `;
    } else {
      display.innerHTML = `
        <h4>Data</h4>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `;
    }
  }
  
  getCachedData(endpoint) {
    const key = `api_cache_${endpoint}`;
    const cached = localStorage.getItem(key);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      // Cache expires after 5 minutes
      if (Date.now() - timestamp < 300000) {
        return data;
      }
    }
    return null;
  }
  
  setCachedData(endpoint, data) {
    const key = `api_cache_${endpoint}`;
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  }
}

// Initialize data manager
document.addEventListener('DOMContentLoaded', () => {
  new DataManager();
});
</script>
```

## 5.4 Performance and Best Practices

### Efficient Data Attribute Usage

```html
<!-- ✅ Good: Semantic and purposeful -->
<article class="blog-post" 
         data-post-id="123"
         data-author="jane-doe"
         data-published="2024-01-15"
         data-reading-time="5">
  <!-- Content -->
</article>

<!-- ❌ Avoid: Storing large amounts of data -->
<div data-huge-object='{"very":"large","data":"object","with":"many","properties":"that","should":"be","in":"javascript":"instead"}'>
</div>

<!-- ✅ Better: Reference to data -->
<div data-config-id="user-preferences">
</div>

<script>
// Store complex data in JavaScript
const configurations = {
  'user-preferences': {
    theme: 'dark',
    language: 'en',
    notifications: true,
    // ... more properties
  }
};

// Access via data attribute reference
const element = document.querySelector('[data-config-id]');
const config = configurations[element.dataset.configId];
</script>
```

### Data Validation and Type Safety

```html
<div class="data-validator-demo">
  <div class="form-field" 
       data-field-type="email"
       data-required="true"
       data-min-length="5"
       data-max-length="100"
       data-pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$">
    <label for="email">Email</label>
    <input type="email" id="email">
    <div class="validation-message"></div>
  </div>
  
  <div class="form-field" 
       data-field-type="number"
       data-required="true"
       data-min="18"
       data-max="120">
    <label for="age">Age</label>
    <input type="number" id="age">
    <div class="validation-message"></div>
  </div>
</div>

<script>
class DataAttributeValidator {
  constructor() {
    this.bindEvents();
  }
  
  bindEvents() {
    document.addEventListener('blur', (e) => {
      const field = e.target.closest('.form-field');
      if (field && e.target.matches('input, select, textarea')) {
        this.validateField(field, e.target);
      }
    }, true);
  }
  
  validateField(fieldContainer, input) {
    const rules = this.extractValidationRules(fieldContainer);
    const value = input.value;
    const errors = [];
    
    // Required validation
    if (rules.required && !value.trim()) {
      errors.push('This field is required');
    }
    
    if (value.trim()) {
      // Type validation
      if (rules.fieldType && !this.validateType(value, rules.fieldType)) {
        errors.push(`Please enter a valid ${rules.fieldType}`);
      }
      
      // Length validation
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`Minimum length is ${rules.minLength} characters`);
      }
      
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`Maximum length is ${rules.maxLength} characters`);
      }
      
      // Numeric range validation
      if (rules.fieldType === 'number') {
        const numValue = parseFloat(value);
        if (rules.min && numValue < rules.min) {
          errors.push(`Minimum value is ${rules.min}`);
        }
        if (rules.max && numValue > rules.max) {
          errors.push(`Maximum value is ${rules.max}`);
        }
      }
      
      // Pattern validation
      if (rules.pattern && !new RegExp(rules.pattern).test(value)) {
        errors.push('Please enter a valid format');
      }
    }
    
    this.displayValidationResult(fieldContainer, errors);
  }
  
  extractValidationRules(fieldContainer) {
    const dataset = fieldContainer.dataset;
    
    return {
      fieldType: dataset.fieldType,
      required: dataset.required === 'true',
      minLength: dataset.minLength ? parseInt(dataset.minLength) : null,
      maxLength: dataset.maxLength ? parseInt(dataset.maxLength) : null,
      min: dataset.min ? parseFloat(dataset.min) : null,
      max: dataset.max ? parseFloat(dataset.max) : null,
      pattern: dataset.pattern
    };
  }
  
  validateType(value, type) {
    switch (type) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'number':
        return !isNaN(parseFloat(value)) && isFinite(value);
      case 'url':
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      default:
        return true;
    }
  }
  
  displayValidationResult(fieldContainer, errors) {
    const messageContainer = fieldContainer.querySelector('.validation-message');
    const input = fieldContainer.querySelector('input, select, textarea');
    
    if (errors.length > 0) {
      messageContainer.innerHTML = errors.map(error => 
        `<p class="error">${error}</p>`
      ).join('');
      input.setAttribute('aria-invalid', 'true');
      fieldContainer.dataset.valid = 'false';
    } else {
      messageContainer.innerHTML = '';
      input.setAttribute('aria-invalid', 'false');
      fieldContainer.dataset.valid = 'true';
    }
  }
}

// Initialize validator
document.addEventListener('DOMContentLoaded', () => {
  new DataAttributeValidator();
});
</script>
```

## Mastery Checkpoints

### Self-Assessment Questions

1. **Data Architecture**: When should you use data attributes vs JavaScript objects for storing data?

2. **Performance**: What are the performance implications of storing large amounts of data in attributes?

3. **Accessibility**: How do data attributes interact with screen readers and assistive technologies?

4. **Maintenance**: How do you keep data attribute usage consistent across a large application?

### Practical Exercises

1. **Component System**: Build a reusable component system driven by data attributes
2. **Configuration Manager**: Create a system for managing app configuration via data attributes
3. **Dynamic Validation**: Implement form validation entirely through data attributes

### Project Ideas

- **Widget Framework**: Configurable widgets using data attributes
- **A/B Testing System**: Content variations controlled by data attributes
- **Analytics Tracker**: Event tracking system using data attributes

## Next Steps

Ready to optimize your HTML for search engines? Continue to [Module 06: SEO Optimization with HTML](06-seo-optimization.md) to learn about meta tags, structured markup, and search visibility.

---

### Additional Resources

- [MDN: Using data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)
- [HTML5 data-* attributes specification](https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes) 