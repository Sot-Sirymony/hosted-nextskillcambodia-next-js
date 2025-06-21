# Modular Template System

This project now supports a modular template system that allows you to split your HTML into reusable components. This makes the codebase more maintainable and easier to update.

## File Structure

```
docs/
├── templates/
│   ├── header.html          # Navigation and header
│   ├── hero.html            # Hero section with search
│   ├── categories.html      # Categories showcase
│   ├── courses.html         # Courses section with filters
│   ├── testimonials.html    # Student testimonials
│   ├── newsletter.html      # Newsletter signup
│   └── footer.html          # Footer with links and social media
├── template-loader.js       # JavaScript template loading system
├── index-modular.html       # Main page using modular templates
└── index.html              # Original single-file version
```

## How It Works

### 1. Template Files
Each section of the website is now in its own HTML file in the `templates/` directory:
- `header.html` - Contains the navigation bar and header
- `hero.html` - Contains the main hero section with search
- `categories.html` - Contains the categories showcase section
- `courses.html` - Contains the courses section with filtering
- `testimonials.html` - Contains student testimonials
- `newsletter.html` - Contains the newsletter signup form
- `footer.html` - Contains the footer with links and social media

### 2. Template Loader
The `template-loader.js` file provides a JavaScript class that:
- Loads HTML templates from files
- Caches templates for performance
- Injects templates into placeholder elements
- Handles errors gracefully

### 3. Main Page
The `index-modular.html` file:
- Contains only placeholder elements for each section
- Loads all templates when the page loads
- Injects templates into their respective placeholders
- Initializes the main application after templates are loaded

## Usage

### Using the Modular Version
1. Open `index-modular.html` in your browser
2. The page will automatically load all templates and display the complete website

### Editing Templates
To edit a specific section:
1. Open the corresponding template file in `templates/` directory
2. Make your changes
3. Refresh the page to see updates

### Adding New Templates
1. Create a new HTML file in the `templates/` directory
2. Add your HTML content
3. Add a placeholder element in `index-modular.html`:
   ```html
   <div id="new-section-placeholder"></div>
   ```
4. Update the template loading script to include your new template:
   ```javascript
   await loadTemplates([
     'header',
     'hero', 
     'categories',
     'courses',
     'testimonials',
     'newsletter',
     'footer',
     'new-section'  // Add your new template
   ]);
   
   window.templateLoader.injectTemplate('new-section', '#new-section-placeholder');
   ```

## Benefits

1. **Maintainability**: Each section is in its own file, making it easier to find and edit specific parts
2. **Reusability**: Templates can be reused across different pages
3. **Collaboration**: Multiple developers can work on different sections simultaneously
4. **Performance**: Templates are cached after first load
5. **Modularity**: Easy to add, remove, or reorder sections

## Template Loading Process

1. **Page Load**: When `index-modular.html` loads, it starts the template loading process
2. **Parallel Loading**: All templates are loaded simultaneously for better performance
3. **Caching**: Templates are stored in memory for quick access
4. **Injection**: Templates are injected into their placeholder elements
5. **Initialization**: The main application is initialized after all templates are loaded

## Error Handling

The template loader includes error handling:
- If a template fails to load, an error is logged to the console
- The page continues to function even if some templates fail
- Graceful degradation ensures the site remains usable

## Browser Compatibility

The template system works in all modern browsers that support:
- ES6 modules and async/await
- Fetch API
- Template literals

## Server Requirements

The template system requires a web server (not just opening files directly) because it uses the Fetch API to load template files. You can use:
- Python: `python3 -m http.server 8000`
- Node.js: `npx serve`
- Any other local web server

## Switching Between Versions

- **Original Version**: Use `index.html` (single file)
- **Modular Version**: Use `index-modular.html` (template-based)

Both versions use the same CSS and JavaScript files, so all functionality remains the same. 