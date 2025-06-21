// Template Loader System
class TemplateLoader {
  constructor() {
    this.templates = {};
    this.loadedTemplates = new Set();
  }

  // Load a template from a file
  async loadTemplate(templateName, targetElement) {
    try {
      const response = await fetch(`./templates/${templateName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load template: ${templateName}`);
      }
      
      const templateContent = await response.text();
      this.templates[templateName] = templateContent;
      this.loadedTemplates.add(templateName);
      
      if (targetElement) {
        this.injectTemplate(templateName, targetElement);
      }
      
      return templateContent;
    } catch (error) {
      console.error(`Error loading template ${templateName}:`, error);
      return null;
    }
  }

  // Inject a template into a target element
  injectTemplate(templateName, targetElement) {
    const template = this.templates[templateName];
    if (!template) {
      console.error(`Template ${templateName} not found`);
      return;
    }

    if (typeof targetElement === 'string') {
      targetElement = document.querySelector(targetElement);
    }

    if (targetElement) {
      targetElement.innerHTML = template;
    } else {
      console.error(`Target element not found for template ${templateName}`);
    }
  }

  // Load multiple templates
  async loadTemplates(templateList) {
    const promises = templateList.map(template => this.loadTemplate(template));
    return Promise.all(promises);
  }

  // Get template content without injecting
  getTemplate(templateName) {
    return this.templates[templateName] || null;
  }

  // Check if template is loaded
  isTemplateLoaded(templateName) {
    return this.loadedTemplates.has(templateName);
  }
}

// Global template loader instance
window.templateLoader = new TemplateLoader();

// Helper function to load and inject a template
async function loadAndInjectTemplate(templateName, targetSelector) {
  await window.templateLoader.loadTemplate(templateName, targetSelector);
}

// Helper function to load multiple templates
async function loadTemplates(templateList) {
  return await window.templateLoader.loadTemplates(templateList);
} 