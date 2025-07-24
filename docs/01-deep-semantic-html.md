# Module 1: Deep Semantic HTML and Document Structure

## Learning Objectives

By the end of this module, you will:
- Master HTML5 semantic elements beyond basic usage
- Understand document outline algorithms and sectioning
- Implement proper heading hierarchies and content flow
- Create accessible and meaningful document structures
- Use semantic elements to enhance SEO and screen reader experience

## 1.1 Advanced Semantic Elements

### Beyond `<div>` and `<span>`: Meaningful Structure

While `<div>` and `<span>` are useful for styling hooks, semantic elements provide meaning to both browsers and assistive technologies.

#### Document Sectioning Elements

**`<main>` - The Primary Content**
```html
<main>
  <!-- The main content of the document -->
  <article>
    <header>
      <h1>Understanding Semantic HTML</h1>
      <p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>
    </header>
    <!-- Article content -->
  </article>
</main>
```

> 📖 **MDN Reference**: [The Main element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main)

**Key Points**:
- Only one `<main>` per document
- Should not be nested within `<article>`, `<aside>`, `<footer>`, `<header>`, or `<nav>`
- Directly relates to the document's central topic

**`<section>` vs `<article>` vs `<div>`**

```html
<!-- ✅ Good: Article with multiple sections -->
<article>
  <header>
    <h1>Complete Guide to Web Performance</h1>
  </header>
  
  <section>
    <h2>Loading Performance</h2>
    <p>How to optimize initial page load...</p>
  </section>
  
  <section>
    <h2>Runtime Performance</h2>
    <p>Optimizing user interactions...</p>
  </section>
  
  <footer>
    <p>Last updated: <time datetime="2024-01-15">January 15, 2024</time></p>
  </footer>
</article>

<!-- ❌ Poor: Unnecessary sectioning -->
<div>
  <section>
    <div>Just some text that doesn't need sectioning</div>
  </section>
</div>
```

> 📖 **MDN References**: 
> - [The Section element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section)
> - [The Article element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article)

#### Content Grouping Elements

**`<figure>` and `<figcaption>` - Self-contained Content**

```html
<figure>
  <img src="performance-chart.png" alt="Website loading times comparison">
  <figcaption>
    Loading times decreased by 40% after optimization.
    <cite>Source: Web Performance Report 2024</cite>
  </figcaption>
</figure>

<!-- Code examples are also figures -->
<figure>
  <pre><code>
// Optimized image loading
const img = new Image();
img.loading = 'lazy';
img.src = 'large-image.jpg';
  </code></pre>
  <figcaption>Example of lazy loading implementation</figcaption>
</figure>
```

> 📖 **MDN Reference**: [The Figure element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)

**`<details>` and `<summary>` - Interactive Disclosure**

```html
<details>
  <summary>Advanced CSS Techniques</summary>
  <p>This section covers advanced CSS concepts including:</p>
  <ul>
    <li>CSS Grid advanced patterns</li>
    <li>Custom properties and calc()</li>
    <li>Container queries</li>
  </ul>
</details>

<!-- Nested details for complex hierarchies -->
<details>
  <summary>Frontend Technologies</summary>
  <details>
    <summary>HTML5 Features</summary>
    <p>Semantic elements, APIs, and modern practices...</p>
  </details>
  <details>
    <summary>CSS3 Features</summary>
    <p>Flexbox, Grid, animations, and more...</p>
  </details>
</details>
```

> 📖 **MDN Reference**: [The Details element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)

## 1.2 Document Outline and Heading Hierarchy

### Understanding the Document Outline Algorithm

The HTML5 document outline algorithm creates a hierarchical structure based on sectioning elements and headings.

#### Proper Heading Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Advanced Web Development Blog</title>
</head>
<body>
  <header>
    <h1>Advanced Web Development Blog</h1> <!-- Document title -->
    <nav>
      <h2>Navigation</h2> <!-- Screen reader heading -->
      <ul>
        <li><a href="#articles">Articles</a></li>
        <li><a href="#tutorials">Tutorials</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="articles">
      <h2>Latest Articles</h2> <!-- Section heading -->
      
      <article>
        <header>
          <h3>Mastering CSS Grid Layout</h3> <!-- Article title -->
          <p>By <span class="author">Jane Developer</span></p>
        </header>
        
        <section>
          <h4>Grid Container Properties</h4> <!-- Subsection -->
          <p>Understanding display: grid...</p>
          
          <section>
            <h5>Grid Template Areas</h5> <!-- Sub-subsection -->
            <p>Named grid areas provide...</p>
          </section>
        </section>
      </article>
    </section>
  </main>
</body>
</html>
```

> 📖 **MDN Reference**: [Heading elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)

#### Sectioning and Heading Relationships

```html
<!-- Each section creates a new outline level -->
<body>
  <h1>Site Title</h1> <!-- Level 1 -->
  
  <section>
    <h1>Main Content</h1> <!-- Level 2 (within section) -->
    
    <article>
      <h1>Article Title</h1> <!-- Level 3 (within article) -->
      
      <section>
        <h1>Article Section</h1> <!-- Level 4 (nested section) -->
      </section>
    </article>
  </section>
  
  <aside>
    <h1>Sidebar</h1> <!-- Level 2 (within aside) -->
  </aside>
</body>
```

**Best Practice**: Use explicit heading levels (`h1`, `h2`, `h3`, etc.) rather than relying solely on the outline algorithm, as screen reader support varies.

## 1.3 Advanced Text-Level Semantics

### Precise Meaning with Inline Elements

**`<time>` - Temporal Information**

```html
<!-- Basic date -->
<p>Published on <time datetime="2024-01-15">January 15, 2024</time></p>

<!-- Date with time -->
<p>Event starts at <time datetime="2024-01-15T14:30:00">2:30 PM on January 15th</time></p>

<!-- Duration -->
<p>The meeting lasted <time datetime="PT2H30M">2 hours and 30 minutes</time></p>

<!-- Relative time -->
<p>Posted <time datetime="2024-01-10" title="January 10, 2024">5 days ago</time></p>
```

> 📖 **MDN Reference**: [The Time element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time)

**`<abbr>` and `<dfn>` - Definitions and Abbreviations**

```html
<!-- Abbreviations with explanations -->
<p>
  The <abbr title="Application Programming Interface">API</abbr> 
  returns data in <abbr title="JavaScript Object Notation">JSON</abbr> format.
</p>

<!-- Defining terms -->
<p>
  <dfn id="responsive-design">Responsive design</dfn> is an approach to web design 
  that makes web pages render well on a variety of devices and window sizes.
</p>

<!-- Referencing defined terms -->
<p>
  When implementing <a href="#responsive-design">responsive design</a>, 
  consider mobile-first approaches.
</p>
```

> 📖 **MDN References**: 
> - [The Abbreviation element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr)
> - [The Definition element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn)

**`<mark>` - Highlighted Relevance**

```html
<!-- Search result highlighting -->
<p>
  The <mark>CSS Grid</mark> layout system is powerful for creating 
  complex <mark>CSS Grid</mark> layouts with minimal code.
</p>

<!-- Contextual highlighting -->
<blockquote>
  <p>The future of web development lies in <mark>semantic HTML</mark> 
  and progressive enhancement.</p>
  <cite>— Web Standards Expert</cite>
</blockquote>
```

> 📖 **MDN Reference**: [The Mark element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark)

## 1.4 Navigation and Landmark Elements

### Creating Accessible Navigation Structures

**`<nav>` - Navigation Sections**

```html
<!-- Main site navigation -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/articles">Articles</a></li>
    <li><a href="/tutorials">Tutorials</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/tutorials">Tutorials</a></li>
    <li><a href="/tutorials/html">HTML</a></li>
    <li aria-current="page">Semantic Elements</li>
  </ol>
</nav>

<!-- Table of contents -->
<nav aria-label="Table of contents">
  <h2>Contents</h2>
  <ul>
    <li><a href="#semantic-elements">Semantic Elements</a></li>
    <li><a href="#document-outline">Document Outline</a></li>
    <li><a href="#text-semantics">Text Semantics</a></li>
  </ul>
</nav>
```

> 📖 **MDN Reference**: [The Nav element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)

### Skip Links for Accessibility

```html
<body>
  <!-- Skip link for keyboard users -->
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <header>
    <nav><!-- Site navigation --></nav>
  </header>
  
  <main id="main-content">
    <!-- Main content starts here -->
  </main>
</body>

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
</style>
```

## 1.5 Content Relationships and Citations

### Proper Attribution and References

**`<cite>` and `<q>` - Citations and Quotations**

```html
<!-- Book citation -->
<p>
  According to <cite>Don't Make Me Think</cite> by Steve Krug, 
  web usability should be intuitive and effortless.
</p>

<!-- Inline quotations -->
<p>
  The HTML specification states that <q cite="https://html.spec.whatwg.org/">
  authors should use elements according to their semantic meaning
  </q>, not their default styling.
</p>

<!-- Block quotations with proper attribution -->
<blockquote cite="https://www.w3.org/WAI/WCAG21/Understanding/">
  <p>
    The intent of this Success Criterion is to ensure that content does not 
    interfere with the user's ability to read and use the content.
  </p>
  <footer>
    — <cite>WCAG 2.1 Understanding Document</cite>
  </footer>
</blockquote>
```

> 📖 **MDN References**: 
> - [The Cite element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite)
> - [The Inline Quotation element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q)

## 1.6 Practical Implementation Patterns

### Real-World Semantic Structure Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced Frontend Development Blog</title>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <header>
    <h1>Advanced Frontend Development</h1>
    <p>Mastering modern web technologies</p>
    
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/articles">Articles</a></li>
        <li><a href="/tutorials">Tutorials</a></li>
        <li><a href="/resources">Resources</a></li>
      </ul>
    </nav>
  </header>

  <main id="main-content">
    <article>
      <header>
        <h1>Mastering CSS Grid: Advanced Techniques</h1>
        <p>
          By <span class="author">Sarah Johnson</span> • 
          Published <time datetime="2024-01-15">January 15, 2024</time> • 
          <span class="reading-time">8 min read</span>
        </p>
      </header>

      <nav aria-label="Article contents">
        <h2>Contents</h2>
        <ol>
          <li><a href="#grid-fundamentals">Grid Fundamentals</a></li>
          <li><a href="#advanced-patterns">Advanced Patterns</a></li>
          <li><a href="#responsive-grids">Responsive Grids</a></li>
        </ol>
      </nav>

      <section id="grid-fundamentals">
        <h2>Grid Fundamentals</h2>
        <p>
          <dfn id="css-grid">CSS Grid</dfn> is a two-dimensional layout system 
          that allows you to create complex layouts with ease.
        </p>
        
        <figure>
          <pre><code>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
          </code></pre>
          <figcaption>Basic grid container setup</figcaption>
        </figure>
      </section>

      <section id="advanced-patterns">
        <h2>Advanced Patterns</h2>
        
        <section>
          <h3>Named Grid Lines</h3>
          <p>You can name grid lines for more semantic layouts...</p>
        </section>
        
        <section>
          <h3>Grid Template Areas</h3>
          <p>Template areas provide a visual way to define layouts...</p>
          
          <details>
            <summary>Complex Layout Example</summary>
            <figure>
              <pre><code>
.layout {
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}
              </code></pre>
              <figcaption>Named areas for complex layouts</figcaption>
            </figure>
          </details>
        </section>
      </section>

      <footer>
        <p>
          <small>
            Last updated: <time datetime="2024-01-16">January 16, 2024</time>
          </small>
        </p>
        
        <nav aria-label="Article navigation">
          <ul>
            <li><a href="/articles/flexbox-vs-grid" rel="prev">← Flexbox vs Grid</a></li>
            <li><a href="/articles/css-subgrid" rel="next">CSS Subgrid →</a></li>
          </ul>
        </nav>
      </footer>
    </article>
  </main>

  <aside>
    <section>
      <h2>Related Articles</h2>
      <ul>
        <li><a href="/articles/responsive-design">Responsive Design Principles</a></li>
        <li><a href="/articles/css-architecture">CSS Architecture</a></li>
      </ul>
    </section>
  </aside>

  <footer>
    <p>
      <small>
        © 2024 Advanced Frontend Development. 
        Content licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
      </small>
    </p>
  </footer>
</body>
</html>
```

## 1.7 Common Pitfalls and Best Practices

### Avoid These Semantic Mistakes

❌ **Overusing Sectioning Elements**
```html
<!-- Don't wrap everything in sections unnecessarily -->
<section>
  <div>Just a simple paragraph that doesn't need sectioning</div>
</section>
```

❌ **Incorrect Heading Hierarchy**
```html
<h1>Main Title</h1>
<h3>Skipping h2 level</h3> <!-- Missing h2 -->
```

❌ **Meaningless Generic Text**
```html
<a href="/more">Click here</a> <!-- Not descriptive -->
<a href="/more">Read more</a> <!-- Better, but still generic -->
```

✅ **Semantic Best Practices**
```html
<!-- Descriptive link text -->
<a href="/articles/css-grid-guide">Read our complete CSS Grid guide</a>

<!-- Proper heading progression -->
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

<!-- Meaningful structure -->
<article>
  <header>
    <h1>Article Title</h1>
    <p class="meta">Article metadata</p>
  </header>
  <div class="content">
    <!-- Article content without unnecessary sectioning -->
  </div>
</article>
```

## Mastery Checkpoints

### Self-Assessment Questions

1. **Semantic Understanding**: Can you explain the difference between `<section>`, `<article>`, and `<div>` and when to use each?

2. **Document Outline**: Given a complex webpage, can you create a proper heading hierarchy that makes sense to screen readers?

3. **Navigation Patterns**: How would you implement multiple navigation types (main nav, breadcrumbs, table of contents) accessibly?

4. **Content Relationships**: When would you use `<figure>`, `<cite>`, `<time>`, and `<dfn>` elements?

### Practical Exercises

1. **Semantic Audit**: Take an existing webpage and refactor it to use proper semantic elements
2. **Document Structure**: Create a complex blog post with proper sectioning, headings, and metadata
3. **Navigation Implementation**: Build a multi-level navigation system with proper ARIA labels

### Project Ideas

- **Technical Blog**: Create a semantically perfect blog post about a technical topic
- **Documentation Site**: Build a documentation page with proper sectioning and navigation
- **News Article**: Structure a news article with all semantic elements (time, author, sections, etc.)

## Next Steps

Ready to make your semantic HTML accessible to everyone? Continue to [Module 02: Accessibility and ARIA Best Practices](02-accessibility-aria.md) to learn how to enhance your semantic foundation with comprehensive accessibility features.

---

### Additional Resources

- [MDN: HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [MDN: Document and website structure](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
- [HTML5 Outliner Tool](https://gsnedders.html5.org/outliner/) - Test your document structure 