// Add this to your browser console to debug
console.log("🔍 Debugging Admin Access:");
console.log("isAdminAuthenticated:", window.isAdminAuthenticated);
console.log("currentPage:", window.currentPage);
console.log("showAdminLogin:", window.showAdminLogin);
console.log("localStorage adminAuth:", localStorage.getItem('adminAuth'));
console.log("localStorage adminAuthTime:", localStorage.getItem('adminAuthTime'));

// Check if the function exists
console.log("handleAdminAccess exists:", typeof window.handleAdminAccess === 'function');
