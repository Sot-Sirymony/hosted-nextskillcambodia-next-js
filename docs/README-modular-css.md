# Modular CSS Structure

This project now uses a modular CSS architecture where each section has its own dedicated CSS file. This approach provides better organization, maintainability, and allows for easier customization of individual sections.

## CSS File Structure

```
docs/css/
├── base.css          # Global styles, variables, and utilities
├── header.css        # Navigation and header styles
├── hero.css          # Hero section styles
├── courses.css       # Course cards and filtering styles
├── testimonials.css  # Testimonials section styles
├── newsletter.css    # Newsletter signup styles
└── footer.css        # Footer styles
```

## File Descriptions

### `base.css`
- **Purpose**: Global styles, CSS variables, and utility classes
- **Contains**:
  - CSS custom properties (variables)
  - Reset and base styles
  - Typography rules
  - Container and layout utilities
  - Utility classes (spacing, colors, display, etc.)
  - Animation keyframes
  - Focus and selection styles
  - Custom scrollbar styles

### `header.css`
- **Purpose**: Navigation bar and header styling
- **Contains**:
  - Navbar background and positioning
  - Brand logo and text styling
  - Navigation links and dropdowns
  - Mobile navigation
  - Navbar animations
  - Responsive breakpoints

### `hero.css`
- **Purpose**: Hero section styling
- **Contains**:
  - Hero background and gradients
  - Title and subtitle styling
  - Search functionality
  - Hero statistics
  - Floating cards
  - Hero animations
  - Responsive design

### `courses.css`
- **Purpose**: Course display and filtering
- **Contains**:
  - Course card styling
  - Filter controls
  - Section headers
  - Course animations
  - Loading and error states
  - Responsive grid layouts

### `testimonials.css`
- **Purpose**: Testimonials section styling
- **Contains**:
  - Testimonial card design
  - Author information styling
  - Rating stars
  - Testimonial animations
  - Grid layouts
  - Navigation controls

### `newsletter.css`
- **Purpose**: Newsletter signup section
- **Contains**:
  - Newsletter form styling
  - Input validation states
  - Success/error messages
  - Newsletter features
  - Form animations
  - Responsive design

### `footer.css`
- **Purpose**: Footer section styling
- **Contains**:
  - Footer layout and background
  - Social media links
  - Footer navigation
  - Contact information
  - Newsletter signup in footer
  - Back to top button
  - Footer animations

## Benefits of Modular CSS

1. **Better Organization**: Each section's styles are contained in their own file
2. **Easier Maintenance**: Changes to one section don't affect others
3. **Improved Performance**: Only load the CSS you need
4. **Team Collaboration**: Multiple developers can work on different sections
5. **Reusability**: Sections can be easily reused in other projects
6. **Debugging**: Easier to locate and fix styling issues

## Usage

### In HTML Files
Include all CSS files in the `<head>` section:

```html
<!-- Modular CSS Files -->
<link rel="stylesheet" href="./css/base.css" />
<link rel="stylesheet" href="./css/header.css" />
<link rel="stylesheet" href="./css/hero.css" />
<link rel="stylesheet" href="./css/courses.css" />
<link rel="stylesheet" href="./css/testimonials.css" />
<link rel="stylesheet" href="./css/newsletter.css" />
<link rel="stylesheet" href="./css/footer.css" />
```

### CSS Variables
All color schemes, spacing, and other design tokens are defined in `base.css` using CSS custom properties:

```css
:root {
  --primary-color: #007bff;
  --accent-color: #0056b3;
  --text-color: #2c3e50;
  --spacing-md: 1rem;
  /* ... more variables */
}
```

### Utility Classes
The `base.css` file includes comprehensive utility classes for:
- Spacing (margin, padding)
- Colors (text, background)
- Display (flex, grid, block)
- Positioning
- Borders and shadows
- Responsive breakpoints

## Customization

### Adding New Sections
1. Create a new CSS file in the `css/` directory
2. Follow the naming convention: `section-name.css`
3. Include the file in your HTML
4. Use CSS variables from `base.css` for consistency

### Modifying Colors
Update the CSS variables in `base.css`:

```css
:root {
  --primary-color: #your-new-color;
  --accent-color: #your-new-accent;
}
```

### Adding New Utilities
Add new utility classes to `base.css` following the existing pattern:

```css
.your-utility {
  /* your styles */
}
```

## Best Practices

1. **Use CSS Variables**: Always use the defined variables for colors, spacing, etc.
2. **Follow Naming Convention**: Use kebab-case for class names
3. **Keep Files Focused**: Each file should only contain styles for its specific section
4. **Use Utility Classes**: Leverage the utility classes in `base.css` when possible
5. **Responsive Design**: Include responsive breakpoints in each section file
6. **Documentation**: Add comments to explain complex CSS rules

## Browser Support

The CSS uses modern features like:
- CSS Custom Properties (CSS Variables)
- CSS Grid and Flexbox
- Modern CSS animations
- Backdrop filters

Ensure your target browsers support these features or provide fallbacks.

## Performance Considerations

- CSS files are loaded in parallel
- Consider minifying CSS for production
- Use CSS purging to remove unused styles
- Optimize images and assets referenced in CSS

## Migration from Single CSS File

If you're migrating from the single `index.css` file:
1. The original `index.css` can be kept as a backup
2. All styles have been reorganized into the modular structure
3. No functionality has been lost in the migration
4. Both `index.html` and `index-modular.html` now use the modular CSS 