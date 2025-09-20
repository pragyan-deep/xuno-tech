// This script prevents the flash of wrong theme on page load
// It should be executed as early as possible, ideally in the document head

export const themeInitScript = `
(function() {
  const storageKey = 'xuno-tech-theme';
  const classNames = { light: 'light', dark: 'dark' };
  
  function getSystemPreference() {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }
  
  function resolveTheme(theme) {
    if (theme === 'system') return getSystemPreference();
    return theme && ['light', 'dark'].includes(theme) ? theme : 'light';
  }
  
  try {
    const savedTheme = localStorage.getItem(storageKey) || 'system';
    const resolvedTheme = resolveTheme(savedTheme);
    const root = document.documentElement;
    
    // Remove any existing theme classes
    root.classList.remove(classNames.light, classNames.dark);
    
    // Add the correct theme class
    root.classList.add(classNames[resolvedTheme]);
    
    // Update theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content', 
        resolvedTheme === 'dark' ? '#0a0a0a' : '#ffffff'
      );
    }
    
    // Set CSS custom property for immediate use
    root.style.colorScheme = resolvedTheme;
    
  } catch (error) {
    // Fallback to light theme if anything goes wrong
    document.documentElement.classList.add(classNames.light);
    console.warn('Theme initialization failed, falling back to light theme:', error);
  }
})();
`

// Script is already exported above with the const declaration 