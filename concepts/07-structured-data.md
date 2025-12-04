# Module 7: Microdata and Semantic Metadata (Structured Data)

## Learning Objectives

By the end of this module, you will:
- Master Schema.org vocabulary and implementation
- Use JSON-LD for rich structured data
- Implement microdata markup in HTML
- Create rich snippets for search results
- Understand different structured data formats
- Optimize content for knowledge graphs and AI

## 7.1 Schema.org Fundamentals

### Understanding Schema.org Vocabulary

Schema.org provides a shared vocabulary for structured data that search engines, social networks, and other platforms understand.

```html
<!-- Basic Organization markup -->
<div itemscope itemtype="https://schema.org/Organization">
  <h1 itemprop="name">WebDev Academy</h1>
  <p itemprop="description">
    Leading online platform for advanced web development education
  </p>
  
  <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
    <span itemprop="streetAddress">123 Tech Street</span>
    <span itemprop="addressLocality">San Francisco</span>
    <span itemprop="addressRegion">CA</span>
    <span itemprop="postalCode">94105</span>
    <span itemprop="addressCountry">US</span>
  </div>
  
  <span itemprop="telephone">+1-555-123-4567</span>
  <a itemprop="email" href="mailto:info@webdevacademy.com">Contact Us</a>
  <a itemprop="url" href="https://webdevacademy.com">webdevacademy.com</a>
  
  <div itemprop="sameAs">
    <a href="https://twitter.com/webdevacademy">Twitter</a>
    <a href="https://github.com/webdevacademy">GitHub</a>
    <a href="https://linkedin.com/company/webdevacademy">LinkedIn</a>
  </div>
</div>
```

> 📖 **MDN Reference**: [Microdata](https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata)

### JSON-LD Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Advanced HTML Course | WebDev Academy</title>
  
  <!-- JSON-LD structured data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Advanced HTML Mastery",
    "description": "Comprehensive course covering advanced HTML techniques, semantic elements, accessibility, and modern web standards for elite frontend developers.",
    "url": "https://webdevacademy.com/courses/advanced-html",
    "image": "https://webdevacademy.com/images/advanced-html-course.jpg",
    "provider": {
      "@type": "Organization",
      "name": "WebDev Academy",
      "url": "https://webdevacademy.com",
      "logo": "https://webdevacademy.com/logo.png",
      "sameAs": [
        "https://twitter.com/webdevacademy",
        "https://github.com/webdevacademy"
      ]
    },
    "instructor": {
      "@type": "Person",
      "name": "Jane Developer",
      "url": "https://webdevacademy.com/instructors/jane-developer",
      "image": "https://webdevacademy.com/images/jane-developer.jpg",
      "jobTitle": "Senior Frontend Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "WebDev Academy"
      },
      "sameAs": [
        "https://twitter.com/janedeveloper",
        "https://github.com/janedeveloper"
      ]
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT20H",
      "courseFee": {
        "@type": "MonetaryAmount",
        "value": 99,
        "currency": "USD"
      }
    },
    "coursePrerequisites": [
      "Basic HTML knowledge",
      "Understanding of web browsers",
      "Basic CSS familiarity"
    ],
    "teaches": [
      "Advanced semantic HTML elements",
      "Web accessibility with ARIA",
      "HTML5 APIs and modern features",
      "Form validation and custom controls",
      "SEO optimization techniques"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.8,
      "reviewCount": 127,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Alex Chen"
        },
        "datePublished": "2024-01-10",
        "reviewBody": "Excellent course! The advanced HTML techniques really improved my development skills.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": 5,
          "bestRating": 5
        }
      }
    ],
    "offers": {
      "@type": "Offer",
      "price": "99.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01",
      "category": "Education"
    }
  }
  </script>
</head>
<body>
  <!-- Course content -->
</body>
</html>
```

## 7.2 Rich Content Types

### Article and Blog Post Markup

```html
<!-- JSON-LD for Article -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Mastering HTML5 Semantic Elements: A Complete Guide",
  "alternativeHeadline": "HTML5 Semantic Elements Guide",
  "description": "Learn how to use HTML5 semantic elements effectively to create accessible, SEO-friendly, and maintainable web pages.",
  "image": {
    "@type": "ImageObject",
    "url": "https://webdevacademy.com/images/semantic-html-guide.jpg",
    "width": 1200,
    "height": 630,
    "caption": "HTML5 semantic elements visualization"
  },
  "author": {
    "@type": "Person",
    "name": "Jane Developer",
    "url": "https://webdevacademy.com/authors/jane-developer",
    "image": "https://webdevacademy.com/images/jane-developer.jpg",
    "jobTitle": "Senior Frontend Developer",
    "knowsAbout": ["HTML", "CSS", "JavaScript", "Web Accessibility"],
    "alumniOf": {
      "@type": "Organization",
      "name": "Stanford University"
    }
  },
  "publisher": {
    "@type": "Organization",
    "name": "WebDev Academy",
    "logo": {
      "@type": "ImageObject",
      "url": "https://webdevacademy.com/logo.png",
      "width": 300,
      "height": 100
    }
  },
  "datePublished": "2024-01-15T10:00:00Z",
  "dateModified": "2024-01-20T14:30:00Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://webdevacademy.com/guides/semantic-html"
  },
  "articleSection": "Web Development",
  "keywords": [
    "HTML5",
    "Semantic HTML",
    "Web Development",
    "Frontend",
    "Accessibility",
    "SEO"
  ],
  "wordCount": 3500,
  "timeRequired": "PT15M",
  "about": [
    {
      "@type": "Thing",
      "name": "HTML5 Semantic Elements",
      "description": "Structural elements that provide meaning to web page content"
    },
    {
      "@type": "Thing", 
      "name": "Web Accessibility",
      "description": "Making web content accessible to people with disabilities"
    }
  ],
  "mentions": [
    {
      "@type": "SoftwareApplication",
      "name": "HTML5",
      "url": "https://html.spec.whatwg.org/"
    },
    {
      "@type": "WebSite",
      "name": "MDN Web Docs",
      "url": "https://developer.mozilla.org/"
    }
  ]
}
</script>

<!-- Microdata markup in HTML -->
<article itemscope itemtype="https://schema.org/Article">
  <header>
    <h1 itemprop="headline">Mastering HTML5 Semantic Elements: A Complete Guide</h1>
    
    <div class="article-meta">
      <time itemprop="datePublished" datetime="2024-01-15T10:00:00Z">
        January 15, 2024
      </time>
      <time itemprop="dateModified" datetime="2024-01-20T14:30:00Z">
        Updated: January 20, 2024
      </time>
      
      <div itemprop="author" itemscope itemtype="https://schema.org/Person">
        <img itemprop="image" src="/images/jane-developer.jpg" alt="Jane Developer">
        <span itemprop="name">Jane Developer</span>
        <span itemprop="jobTitle">Senior Frontend Developer</span>
      </div>
      
      <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
        <span itemprop="name">WebDev Academy</span>
        <img itemprop="logo" src="/logo.png" alt="WebDev Academy">
      </div>
    </div>
    
    <img itemprop="image" 
         src="/images/semantic-html-guide.jpg" 
         alt="HTML5 semantic elements visualization"
         width="1200" height="630">
  </header>
  
  <div itemprop="articleBody">
    <p itemprop="description">
      Learn how to use HTML5 semantic elements effectively to create 
      accessible, SEO-friendly, and maintainable web pages.
    </p>
    
    <!-- Article content -->
    <section>
      <h2>Understanding Semantic HTML</h2>
      <p>Semantic HTML elements provide meaning and structure...</p>
    </section>
  </div>
  
  <footer>
    <div class="article-keywords">
      <span>Keywords: </span>
      <span itemprop="keywords">HTML5, Semantic HTML, Web Development, Frontend, Accessibility, SEO</span>
    </div>
  </footer>
</article>
```

### Product and E-commerce Markup

```html
<!-- Product page with comprehensive structured data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Advanced HTML Course Bundle",
  "description": "Complete HTML mastery course including advanced techniques, accessibility, and modern web standards.",
  "image": [
    "https://webdevacademy.com/images/html-course-1.jpg",
    "https://webdevacademy.com/images/html-course-2.jpg",
    "https://webdevacademy.com/images/html-course-3.jpg"
  ],
  "brand": {
    "@type": "Brand",
    "name": "WebDev Academy"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "WebDev Academy"
  },
  "category": "Educational Course",
  "sku": "HTML-ADV-001",
  "gtin": "1234567890123",
  "offers": {
    "@type": "Offer",
    "url": "https://webdevacademy.com/courses/advanced-html",
    "priceCurrency": "USD",
    "price": "99.00",
    "priceValidUntil": "2024-12-31",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "WebDev Academy"
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30
    },
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": 0,
        "currency": "USD"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 0,
          "unitCode": "DAY"
        }
      }
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.8,
    "reviewCount": 127,
    "bestRating": 5,
    "worstRating": 1
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Sarah Johnson"
      },
      "datePublished": "2024-01-12",
      "reviewBody": "This course transformed my understanding of HTML. The advanced techniques are exactly what I needed for my career.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 5,
        "bestRating": 5
      }
    }
  ],
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Course Duration",
      "value": "20 hours"
    },
    {
      "@type": "PropertyValue", 
      "name": "Skill Level",
      "value": "Intermediate to Advanced"
    },
    {
      "@type": "PropertyValue",
      "name": "Certificate",
      "value": "Yes"
    }
  ]
}
</script>

<!-- Microdata product markup -->
<div itemscope itemtype="https://schema.org/Product">
  <h1 itemprop="name">Advanced HTML Course Bundle</h1>
  
  <div itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
    <img itemprop="url" src="/images/html-course-main.jpg" 
         alt="Advanced HTML Course Bundle">
    <meta itemprop="width" content="800">
    <meta itemprop="height" content="600">
  </div>
  
  <p itemprop="description">
    Complete HTML mastery course including advanced techniques, 
    accessibility, and modern web standards.
  </p>
  
  <div itemprop="brand" itemscope itemtype="https://schema.org/Brand">
    <span itemprop="name">WebDev Academy</span>
  </div>
  
  <div itemprop="offers" itemscope itemtype="https://schema.org/Offer">
    <span itemprop="price">99.00</span>
    <span itemprop="priceCurrency">USD</span>
    <link itemprop="availability" href="https://schema.org/InStock">
    <span>In Stock</span>
    
    <div itemprop="seller" itemscope itemtype="https://schema.org/Organization">
      <span itemprop="name">WebDev Academy</span>
    </div>
  </div>
  
  <div itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
    <span itemprop="ratingValue">4.8</span> out of 
    <span itemprop="bestRating">5</span> stars
    (<span itemprop="reviewCount">127</span> reviews)
  </div>
</div>
```

## 7.3 Local Business and Organization Markup

### Local Business Schema

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "WebDev Academy Training Center",
  "description": "Premier web development training center offering hands-on courses in HTML, CSS, JavaScript, and modern web technologies.",
  "url": "https://webdevacademy.com",
  "telephone": "+1-555-123-4567",
  "email": "info@webdevacademy.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Tech Street, Suite 100",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94105",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "16:00"
    }
  ],
  "image": [
    "https://webdevacademy.com/images/training-center-1.jpg",
    "https://webdevacademy.com/images/training-center-2.jpg"
  ],
  "priceRange": "$$",
  "paymentAccepted": ["Cash", "Credit Card", "PayPal"],
  "currenciesAccepted": "USD",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "geoRadius": "50000"
  },
  "serviceArea": {
    "@type": "AdministrativeArea",
    "name": "San Francisco Bay Area"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Development Courses",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "HTML Fundamentals",
        "description": "Learn the basics of HTML"
      },
      {
        "@type": "Course", 
        "name": "Advanced HTML",
        "description": "Master advanced HTML techniques"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.9,
    "reviewCount": 89
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Mike Chen"
      },
      "datePublished": "2024-01-08",
      "reviewBody": "Excellent training center with knowledgeable instructors and modern facilities.",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": 5
      }
    }
  ],
  "sameAs": [
    "https://www.facebook.com/webdevacademy",
    "https://twitter.com/webdevacademy",
    "https://www.linkedin.com/company/webdevacademy",
    "https://www.instagram.com/webdevacademy"
  ]
}
</script>
```

## 7.4 Event and FAQ Markup

### Event Schema Implementation

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Advanced HTML Workshop: Semantic Web Development",
  "description": "Intensive workshop covering advanced HTML techniques, accessibility, and modern web standards. Perfect for developers looking to master semantic HTML.",
  "startDate": "2024-03-15T09:00:00-08:00",
  "endDate": "2024-03-15T17:00:00-08:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "WebDev Academy Training Center",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  },
  "image": [
    "https://webdevacademy.com/images/html-workshop-1.jpg",
    "https://webdevacademy.com/images/html-workshop-2.jpg"
  ],
  "organizer": {
    "@type": "Organization",
    "name": "WebDev Academy",
    "url": "https://webdevacademy.com"
  },
  "performer": {
    "@type": "Person",
    "name": "Jane Developer",
    "jobTitle": "Senior Frontend Developer"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://webdevacademy.com/events/html-workshop",
    "price": "149.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01T00:00:00-08:00",
    "validThrough": "2024-03-14T23:59:59-08:00"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Web Developers",
    "name": "Intermediate to Advanced Web Developers"
  },
  "maximumAttendeeCapacity": 30,
  "remainingAttendeeCapacity": 12
}
</script>

<!-- FAQ Schema for rich snippets -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are HTML5 semantic elements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HTML5 semantic elements are HTML tags that provide meaning and structure to web content. Examples include <article>, <section>, <nav>, <header>, <footer>, <aside>, and <main>. These elements help search engines and assistive technologies understand the content structure and purpose."
      }
    },
    {
      "@type": "Question",
      "name": "How do semantic elements improve SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Semantic elements improve SEO by providing clear content structure that search engines can easily understand and index. They help search engines identify the main content, navigation, sidebars, and other page sections, leading to better search rankings and rich snippets in search results."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between <section> and <div>?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The <section> element represents a thematic grouping of content with semantic meaning, typically with a heading. The <div> element is a generic container with no semantic meaning, used primarily for styling purposes. Use <section> when the content represents a distinct section of a document, and <div> for layout and styling."
      }
    },
    {
      "@type": "Question",
      "name": "How do I make HTML forms accessible?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To make HTML forms accessible: 1) Use proper labels associated with form controls, 2) Provide clear instructions and error messages, 3) Use fieldsets and legends for grouped controls, 4) Implement ARIA attributes where needed, 5) Ensure keyboard navigation works properly, and 6) Use appropriate input types for better mobile experience."
      }
    }
  ]
}
</script>
```

## 7.5 Testing and Validation

### Structured Data Testing Tools

```html
<!-- Testing structured data implementation -->
<script>
// Client-side structured data validation
function validateStructuredData() {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  const validationResults = [];
  
  scripts.forEach((script, index) => {
    try {
      const data = JSON.parse(script.textContent);
      validationResults.push({
        index: index,
        valid: true,
        data: data,
        type: data['@type']
      });
    } catch (error) {
      validationResults.push({
        index: index,
        valid: false,
        error: error.message
      });
    }
  });
  
  return validationResults;
}

// Check microdata attributes
function validateMicrodata() {
  const microdataElements = document.querySelectorAll('[itemscope]');
  const results = [];
  
  microdataElements.forEach(element => {
    const itemtype = element.getAttribute('itemtype');
    const properties = element.querySelectorAll('[itemprop]');
    
    results.push({
      element: element.tagName,
      itemtype: itemtype,
      properties: Array.from(properties).map(prop => ({
        name: prop.getAttribute('itemprop'),
        value: prop.textContent || prop.getAttribute('content') || prop.src
      }))
    });
  });
  
  return results;
}

// Usage
console.log('JSON-LD Validation:', validateStructuredData());
console.log('Microdata Validation:', validateMicrodata());
</script>

<!-- Debug information for development -->
<div id="structured-data-debug" style="display: none;">
  <h3>Structured Data Debug Information</h3>
  <div id="debug-output"></div>
</div>

<script>
// Development helper for structured data debugging
if (window.location.search.includes('debug=structured-data')) {
  document.getElementById('structured-data-debug').style.display = 'block';
  
  const debugOutput = document.getElementById('debug-output');
  const jsonLdData = validateStructuredData();
  const microdataData = validateMicrodata();
  
  debugOutput.innerHTML = `
    <h4>JSON-LD Data:</h4>
    <pre>${JSON.stringify(jsonLdData, null, 2)}</pre>
    
    <h4>Microdata:</h4>
    <pre>${JSON.stringify(microdataData, null, 2)}</pre>
  `;
}
</script>
```

## Mastery Checkpoints

### Self-Assessment Questions

1. **Schema Types**: When would you use Article vs BlogPosting vs NewsArticle schema types?

2. **Implementation**: What are the advantages of JSON-LD over microdata markup?

3. **Validation**: How do you test and validate structured data implementation?

4. **Rich Snippets**: Which schema types are most likely to generate rich snippets in search results?

### Practical Exercises

1. **E-commerce Site**: Implement comprehensive product schema for an online store
2. **Local Business**: Create complete local business markup with reviews and hours
3. **Content Site**: Add article and FAQ schema to a blog or news site

### Project Ideas

- **Recipe Website**: Implement Recipe schema with ratings and nutrition info
- **Event Platform**: Create comprehensive Event markup with ticketing
- **Educational Site**: Build Course and Organization schema for learning platform

## Next Steps

Ready to optimize your HTML for production? Continue to [Module 08: Performance and Maintainability in HTML](08-performance-maintainability.md) to learn optimization techniques and maintainable HTML architecture.

---

### Additional Resources

- [Schema.org](https://schema.org/) - Complete vocabulary reference
- [Google Rich Results Test](https://search.google.com/test/rich-results) - Test structured data
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) - Official implementation guide
- [JSON-LD Playground](https://json-ld.org/playground/) - Test and validate JSON-LD 