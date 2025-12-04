# Module 2: Accessibility and ARIA Best Practices

## Learning Objectives

By the end of this module, you will:
- Understand WCAG guidelines and their practical implementation
- Master ARIA attributes for enhanced accessibility
- Create accessible forms, navigation, and interactive elements
- Implement screen reader-friendly content structures
- Test and validate accessibility features effectively

## 2.1 Web Accessibility Fundamentals

### Understanding WCAG 2.1 Principles

Web Content Accessibility Guidelines (WCAG) are built on four foundational principles:

1. **Perceivable** - Information must be presentable in ways users can perceive
2. **Operable** - Interface components must be operable by all users
3. **Understandable** - Information and UI operation must be understandable
4. **Robust** - Content must be robust enough for various assistive technologies

> 📖 **MDN Reference**: [Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Semantic HTML as Accessibility Foundation

```html
<!-- ✅ Semantic HTML provides built-in accessibility -->
<button onclick="submitForm()">Submit Application</button>

<!-- ❌ Non-semantic elements require additional work -->
<div onclick="submitForm()" tabindex="0" role="button" 
     onkeydown="handleKeyPress(event)">Submit Application</div>
```

**Why Semantic HTML Matters**:
- Automatic keyboard navigation
- Built-in screen reader support
- Clear element roles and purposes
- Consistent behavior across browsers

## 2.2 ARIA Roles, Properties, and States

### Understanding ARIA

ARIA (Accessible Rich Internet Applications) provides semantic information about elements to assistive technologies when HTML semantics aren't sufficient.

> 📖 **MDN Reference**: [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

#### ARIA Roles

**Landmark Roles**
```html
<!-- Document structure landmarks -->
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/products">Products</a></li>
    </ul>
  </nav>
</header>

<main role="main">
  <article role="article">
    <h1>Product Review</h1>
    <!-- Article content -->
  </article>
</main>

<aside role="complementary">
  <h2>Related Products</h2>
  <!-- Sidebar content -->
</aside>

<footer role="contentinfo">
  <p>© 2024 Company Name</p>
</footer>
```

**Widget Roles**
```html
<!-- Custom dropdown menu -->
<div class="dropdown">
  <button aria-haspopup="true" aria-expanded="false" aria-controls="menu-list">
    Options
  </button>
  <ul role="menu" id="menu-list" hidden>
    <li role="menuitem"><a href="/profile">Profile</a></li>
    <li role="menuitem"><a href="/settings">Settings</a></li>
    <li role="separator"></li>
    <li role="menuitem"><a href="/logout">Logout</a></li>
  </ul>
</div>

<!-- Tab interface -->
<div class="tabs">
  <div role="tablist" aria-label="Content sections">
    <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">
      Overview
    </button>
    <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">
      Details
    </button>
  </div>
  
  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
    <h2>Overview Content</h2>
    <p>General information about the product...</p>
  </div>
  
  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
    <h2>Detailed Information</h2>
    <p>Comprehensive product specifications...</p>
  </div>
</div>
```

> 📖 **MDN Reference**: [ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)

#### ARIA Properties and States

**Labeling and Describing**
```html
<!-- aria-label for concise labels -->
<button aria-label="Close dialog">×</button>

<!-- aria-labelledby for referencing existing text -->
<h2 id="billing-title">Billing Information</h2>
<fieldset aria-labelledby="billing-title">
  <input type="text" placeholder="Card number">
  <input type="text" placeholder="Expiry date">
</fieldset>

<!-- aria-describedby for additional context -->
<input type="password" aria-describedby="pwd-help">
<div id="pwd-help">
  Password must be at least 8 characters with uppercase, lowercase, and numbers.
</div>

<!-- Complex form with multiple descriptions -->
<label for="username">Username</label>
<input type="text" id="username" 
       aria-describedby="username-help username-error"
       aria-invalid="true">
<div id="username-help">Choose a unique username (3-20 characters)</div>
<div id="username-error" role="alert">Username already taken</div>
```

**State Management**
```html
<!-- Expandable content -->
<button aria-expanded="false" aria-controls="details">
  Show Details
</button>
<div id="details" hidden>
  <p>Additional information...</p>
</div>

<!-- Loading states -->
<button aria-busy="true" aria-describedby="loading-msg">
  Save Changes
</button>
<div id="loading-msg" aria-live="polite">Saving...</div>

<!-- Selection states -->
<ul role="listbox" aria-multiselectable="true">
  <li role="option" aria-selected="true">Option 1</li>
  <li role="option" aria-selected="false">Option 2</li>
  <li role="option" aria-selected="true">Option 3</li>
</ul>
```

> 📖 **MDN References**: 
> - [ARIA states and properties](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes)
> - [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)

## 2.3 Accessible Forms

### Form Labels and Associations

```html
<!-- Explicit labeling -->
<label for="email">Email Address</label>
<input type="email" id="email" required aria-describedby="email-help">
<div id="email-help">We'll never share your email address</div>

<!-- Implicit labeling -->
<label>
  Phone Number
  <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
         placeholder="123-456-7890">
</label>

<!-- Fieldset grouping -->
<fieldset>
  <legend>Preferred Contact Method</legend>
  <label>
    <input type="radio" name="contact" value="email"> Email
  </label>
  <label>
    <input type="radio" name="contact" value="phone"> Phone
  </label>
  <label>
    <input type="radio" name="contact" value="mail"> Mail
  </label>
</fieldset>
```

### Form Validation and Error Handling

```html
<form novalidate>
  <div class="field">
    <label for="username">Username *</label>
    <input type="text" id="username" required 
           aria-describedby="username-help username-error"
           aria-invalid="false">
    <div id="username-help">3-20 characters, letters and numbers only</div>
    <div id="username-error" role="alert" hidden></div>
  </div>

  <div class="field">
    <label for="password">Password *</label>
    <input type="password" id="password" required
           aria-describedby="password-requirements password-error"
           aria-invalid="false">
    <div id="password-requirements">
      <p>Password must contain:</p>
      <ul>
        <li id="length" aria-live="polite">At least 8 characters</li>
        <li id="uppercase" aria-live="polite">One uppercase letter</li>
        <li id="lowercase" aria-live="polite">One lowercase letter</li>
        <li id="number" aria-live="polite">One number</li>
      </ul>
    </div>
    <div id="password-error" role="alert" hidden></div>
  </div>

  <button type="submit">Create Account</button>
</form>

<script>
// Real-time validation feedback
function validatePassword(input) {
  const password = input.value;
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password)
  };

  Object.keys(requirements).forEach(req => {
    const element = document.getElementById(req);
    const met = requirements[req];
    element.setAttribute('aria-live', 'polite');
    element.textContent = met ? '✓ ' + element.textContent.replace('✓ ', '') 
                              : element.textContent.replace('✓ ', '');
  });
}
</script>
```

> 📖 **MDN Reference**: [HTML forms accessibility](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types)

### Custom Form Controls

```html
<!-- Custom checkbox with ARIA -->
<div class="custom-checkbox">
  <div role="checkbox" aria-checked="false" tabindex="0" 
       aria-labelledby="terms-label" id="terms-checkbox">
    <span class="checkmark" aria-hidden="true"></span>
  </div>
  <label id="terms-label" for="terms-checkbox">
    I agree to the <a href="/terms">Terms of Service</a>
  </label>
</div>

<!-- Custom select dropdown -->
<div class="custom-select">
  <label id="country-label">Country</label>
  <button aria-haspopup="listbox" aria-expanded="false" 
          aria-labelledby="country-label" id="country-button">
    Select a country
  </button>
  <ul role="listbox" aria-labelledby="country-label" hidden>
    <li role="option" aria-selected="false">United States</li>
    <li role="option" aria-selected="false">Canada</li>
    <li role="option" aria-selected="false">United Kingdom</li>
  </ul>
</div>
```

## 2.4 Dynamic Content and Live Regions

### ARIA Live Regions

```html
<!-- Status updates -->
<div aria-live="polite" id="status-message"></div>

<!-- Urgent alerts -->
<div aria-live="assertive" id="error-message" role="alert"></div>

<!-- Atomic updates -->
<div aria-live="polite" aria-atomic="true" id="progress-status">
  <p>Step 2 of 5: Uploading files...</p>
  <div role="progressbar" aria-valuenow="40" aria-valuemin="0" 
       aria-valuemax="100" aria-label="Upload progress">
    <div class="progress-bar" style="width: 40%"></div>
  </div>
</div>

<!-- Relevant updates only -->
<div aria-live="polite" aria-relevant="additions text">
  <ul id="notification-list">
    <!-- New notifications will be announced -->
  </ul>
</div>
```

### Dynamic Content Patterns

```html
<!-- Modal dialog -->
<button id="open-modal">Open Settings</button>

<div role="dialog" aria-labelledby="modal-title" aria-modal="true" 
     class="modal" hidden>
  <div class="modal-content">
    <header>
      <h2 id="modal-title">Settings</h2>
      <button aria-label="Close settings dialog" class="close-btn">×</button>
    </header>
    
    <main>
      <form>
        <label for="theme">Theme</label>
        <select id="theme">
          <option>Light</option>
          <option>Dark</option>
        </select>
      </form>
    </main>
    
    <footer>
      <button type="button">Cancel</button>
      <button type="submit">Save</button>
    </footer>
  </div>
</div>

<script>
function openModal() {
  const modal = document.querySelector('.modal');
  const firstFocusable = modal.querySelector('button, input, select, textarea');
  
  modal.hidden = false;
  firstFocusable.focus();
  
  // Trap focus within modal
  modal.addEventListener('keydown', trapFocus);
}

function trapFocus(e) {
  if (e.key === 'Tab') {
    const focusableElements = modal.querySelectorAll(
      'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }
}
</script>
```

> 📖 **MDN Reference**: [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

## 2.5 Keyboard Navigation

### Focus Management

```html
<!-- Skip links for keyboard users -->
<nav class="skip-links">
  <a href="#main-content">Skip to main content</a>
  <a href="#main-nav">Skip to navigation</a>
  <a href="#search">Skip to search</a>
</nav>

<!-- Logical tab order -->
<form>
  <fieldset>
    <legend>Personal Information</legend>
    <label for="first-name">First Name</label>
    <input type="text" id="first-name" tabindex="1">
    
    <label for="last-name">Last Name</label>
    <input type="text" id="last-name" tabindex="2">
  </fieldset>
  
  <fieldset>
    <legend>Contact Information</legend>
    <label for="email">Email</label>
    <input type="email" id="email" tabindex="3">
    
    <label for="phone">Phone</label>
    <input type="tel" id="phone" tabindex="4">
  </fieldset>
  
  <button type="submit" tabindex="5">Submit</button>
</form>

<!-- Custom interactive elements -->
<div class="carousel" role="region" aria-label="Featured products">
  <button class="carousel-btn prev" aria-label="Previous product">‹</button>
  
  <div class="carousel-content" tabindex="0" 
       aria-live="polite" aria-atomic="true">
    <img src="product1.jpg" alt="Wireless headphones">
    <h3>Premium Wireless Headphones</h3>
    <p>High-quality audio with noise cancellation</p>
  </div>
  
  <button class="carousel-btn next" aria-label="Next product">›</button>
  
  <div class="carousel-indicators" role="tablist">
    <button role="tab" aria-selected="true" aria-label="Product 1"></button>
    <button role="tab" aria-selected="false" aria-label="Product 2"></button>
    <button role="tab" aria-selected="false" aria-label="Product 3"></button>
  </div>
</div>
```

### Keyboard Event Handling

```html
<div class="menu-bar" role="menubar">
  <button role="menuitem" aria-haspopup="true" aria-expanded="false">
    File
  </button>
  <button role="menuitem" aria-haspopup="true" aria-expanded="false">
    Edit
  </button>
  <button role="menuitem" aria-haspopup="true" aria-expanded="false">
    View
  </button>
</div>

<script>
class AccessibleMenuBar {
  constructor(element) {
    this.menubar = element;
    this.menuItems = element.querySelectorAll('[role="menuitem"]');
    this.currentIndex = 0;
    
    this.bindEvents();
  }
  
  bindEvents() {
    this.menubar.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowRight':
          this.moveToNext();
          e.preventDefault();
          break;
        case 'ArrowLeft':
          this.moveToPrevious();
          e.preventDefault();
          break;
        case 'Home':
          this.moveToFirst();
          e.preventDefault();
          break;
        case 'End':
          this.moveToLast();
          e.preventDefault();
          break;
        case 'Enter':
        case ' ':
          this.activateItem();
          e.preventDefault();
          break;
      }
    });
  }
  
  moveToNext() {
    this.currentIndex = (this.currentIndex + 1) % this.menuItems.length;
    this.focusCurrentItem();
  }
  
  moveToPrevious() {
    this.currentIndex = this.currentIndex === 0 
      ? this.menuItems.length - 1 
      : this.currentIndex - 1;
    this.focusCurrentItem();
  }
  
  focusCurrentItem() {
    this.menuItems[this.currentIndex].focus();
  }
}
</script>
```

> 📖 **MDN Reference**: [Keyboard-navigable JavaScript widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets)

## 2.6 Screen Reader Optimization

### Content Structure for Screen Readers

```html
<!-- Descriptive headings create navigation landmarks -->
<main>
  <h1>Product Comparison Guide</h1>
  
  <nav aria-label="Page contents">
    <h2>Contents</h2>
    <ul>
      <li><a href="#overview">Overview</a></li>
      <li><a href="#features">Feature Comparison</a></li>
      <li><a href="#pricing">Pricing</a></li>
    </ul>
  </nav>
  
  <section id="overview">
    <h2>Overview</h2>
    <p>This guide compares three leading products...</p>
  </section>
  
  <section id="features">
    <h2>Feature Comparison</h2>
    
    <!-- Accessible data table -->
    <table>
      <caption>Comparison of key features across products</caption>
      <thead>
        <tr>
          <th scope="col">Feature</th>
          <th scope="col">Product A</th>
          <th scope="col">Product B</th>
          <th scope="col">Product C</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Battery Life</th>
          <td>24 hours</td>
          <td>18 hours</td>
          <td>30 hours</td>
        </tr>
        <tr>
          <th scope="row">Weight</th>
          <td>200g</td>
          <td>180g</td>
          <td>220g</td>
        </tr>
      </tbody>
    </table>
  </section>
</main>
```

### Hidden Content for Screen Readers

```html
<!-- Screen reader only text -->
<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

<!-- Additional context for screen readers -->
<button>
  <span aria-hidden="true">👍</span>
  <span class="sr-only">Like this post</span>
</button>

<a href="/article/advanced-css">
  Advanced CSS Techniques
  <span class="sr-only">(opens in new tab)</span>
</a>

<!-- Data tables with additional context -->
<table>
  <caption>Sales data for Q4 2024</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales <span class="sr-only">in thousands of dollars</span></th>
      <th scope="col">Growth <span class="sr-only">percentage compared to previous month</span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">October</th>
      <td>$245k</td>
      <td>+12%</td>
    </tr>
  </tbody>
</table>
```

## 2.7 Testing and Validation

### Automated Testing Tools

```html
<!-- Add landmarks for testing -->
<div id="accessibility-test-results" aria-live="polite" aria-atomic="true">
  <!-- Results will be populated by testing tools -->
</div>

<script>
// Basic accessibility checks
function runAccessibilityChecks() {
  const issues = [];
  
  // Check for missing alt text
  document.querySelectorAll('img:not([alt])').forEach(img => {
    issues.push(`Image missing alt text: ${img.src}`);
  });
  
  // Check for empty links
  document.querySelectorAll('a').forEach(link => {
    if (!link.textContent.trim() && !link.getAttribute('aria-label')) {
      issues.push(`Link missing accessible text: ${link.href}`);
    }
  });
  
  // Check for proper heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  headings.forEach(heading => {
    const currentLevel = parseInt(heading.tagName.charAt(1));
    if (currentLevel > previousLevel + 1) {
      issues.push(`Heading hierarchy skip: ${heading.textContent}`);
    }
    previousLevel = currentLevel;
  });
  
  return issues;
}

// Focus management testing
function testFocusManagement() {
  const focusableElements = document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach((el, index) => {
    if (getComputedStyle(el).display === 'none' && el.tabIndex >= 0) {
      console.warn(`Hidden element in tab order: ${el.tagName}`);
    }
  });
}
</script>
```

### Manual Testing Checklist

```html
<!-- Testing landmarks and structure -->
<nav aria-label="Testing checklist">
  <h2>Accessibility Testing Checklist</h2>
  <ul>
    <li>
      <input type="checkbox" id="keyboard-nav">
      <label for="keyboard-nav">All interactive elements keyboard accessible</label>
    </li>
    <li>
      <input type="checkbox" id="screen-reader">
      <label for="screen-reader">Content makes sense with screen reader</label>
    </li>
    <li>
      <input type="checkbox" id="focus-visible">
      <label for="focus-visible">Focus indicators clearly visible</label>
    </li>
    <li>
      <input type="checkbox" id="color-contrast">
      <label for="color-contrast">Color contrast meets WCAG AA standards</label>
    </li>
    <li>
      <input type="checkbox" id="alt-text">
      <label for="alt-text">All images have appropriate alt text</label>
    </li>
    <li>
      <input type="checkbox" id="form-labels">
      <label for="form-labels">All form inputs properly labeled</label>
    </li>
  </ul>
</nav>
```

> 📖 **MDN Reference**: [Accessibility testing](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Accessibility)

## 2.8 Real-World Implementation Example

### Complete Accessible Component

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Task Manager</title>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <header role="banner">
    <h1>Task Manager</h1>
    <nav role="navigation" aria-label="Main navigation">
      <ul>
        <li><a href="#tasks" aria-current="page">Tasks</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </nav>
  </header>

  <main id="main-content" role="main">
    <section aria-labelledby="add-task-heading">
      <h2 id="add-task-heading">Add New Task</h2>
      
      <form id="task-form" novalidate>
        <div class="form-group">
          <label for="task-title">Task Title *</label>
          <input type="text" id="task-title" required
                 aria-describedby="title-help title-error"
                 aria-invalid="false">
          <div id="title-help">Enter a brief description of the task</div>
          <div id="title-error" role="alert" hidden></div>
        </div>

        <div class="form-group">
          <label for="task-priority">Priority</label>
          <select id="task-priority" aria-describedby="priority-help">
            <option value="low">Low</option>
            <option value="medium" selected>Medium</option>
            <option value="high">High</option>
          </select>
          <div id="priority-help">Select task priority level</div>
        </div>

        <div class="form-group">
          <fieldset>
            <legend>Task Category</legend>
            <label>
              <input type="radio" name="category" value="work" checked>
              Work
            </label>
            <label>
              <input type="radio" name="category" value="personal">
              Personal
            </label>
            <label>
              <input type="radio" name="category" value="project">
              Project
            </label>
          </fieldset>
        </div>

        <button type="submit">Add Task</button>
      </form>
    </section>

    <section aria-labelledby="task-list-heading">
      <h2 id="task-list-heading">Current Tasks</h2>
      
      <div class="filter-controls" role="group" aria-label="Filter tasks">
        <button aria-pressed="true" data-filter="all">All Tasks</button>
        <button aria-pressed="false" data-filter="pending">Pending</button>
        <button aria-pressed="false" data-filter="completed">Completed</button>
      </div>

      <div aria-live="polite" id="task-count">
        Showing 5 of 8 tasks
      </div>

      <ul class="task-list" role="list">
        <li class="task-item" role="listitem">
          <div class="task-content">
            <h3>Review project proposal</h3>
            <p>Priority: <span class="priority high">High</span></p>
            <p>Category: Work</p>
          </div>
          <div class="task-actions">
            <button aria-label="Mark 'Review project proposal' as complete">
              Complete
            </button>
            <button aria-label="Edit 'Review project proposal'">
              Edit
            </button>
            <button aria-label="Delete 'Review project proposal'">
              Delete
            </button>
          </div>
        </li>
        
        <li class="task-item completed" role="listitem">
          <div class="task-content">
            <h3>
              <span class="sr-only">Completed: </span>
              Update website content
            </h3>
            <p>Priority: <span class="priority medium">Medium</span></p>
            <p>Category: Work</p>
          </div>
          <div class="task-actions">
            <button aria-label="Mark 'Update website content' as incomplete">
              Undo
            </button>
            <button aria-label="Delete 'Update website content'">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </section>
  </main>

  <div id="notifications" aria-live="assertive" aria-atomic="true"></div>

  <style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
  }
  
  .skip-link:focus {
    top: 6px;
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  .priority.high {
    color: #d73502;
    font-weight: bold;
  }
  
  .task-item.completed {
    opacity: 0.6;
  }
  
  button[aria-pressed="true"] {
    background: #0066cc;
    color: white;
  }
  </style>
</body>
</html>
```

## Mastery Checkpoints

### Self-Assessment Questions

1. **ARIA Understanding**: When would you use `aria-label` vs `aria-labelledby` vs `aria-describedby`?

2. **Form Accessibility**: How do you make custom form controls accessible to screen readers?

3. **Dynamic Content**: What's the difference between `aria-live="polite"` and `aria-live="assertive"`?

4. **Keyboard Navigation**: How do you implement proper focus management in a modal dialog?

### Practical Exercises

1. **Accessibility Audit**: Take a complex web application and identify all accessibility issues
2. **Custom Component**: Build an accessible dropdown menu with full keyboard support
3. **Form Enhancement**: Create a multi-step form with comprehensive accessibility features

### Testing Scenarios

- Navigate your entire application using only the keyboard
- Use a screen reader to complete all primary user tasks
- Test with users who have different accessibility needs
- Validate with automated tools like axe-core or WAVE

## Next Steps

Ready to create sophisticated, accessible forms? Continue to [Module 03: Advanced Forms and Constraint Validation](03-advanced-forms.md) to learn how to build forms that are both powerful and accessible.

---

### Additional Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility Learning Path](https://developer.mozilla.org/en-US/docs/Learn/Accessibility)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/) 