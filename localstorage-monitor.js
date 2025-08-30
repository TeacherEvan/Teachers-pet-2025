// localStorage monitoring script - Add this to pages to track changes
(function() {
    const originalSetItem = localStorage.setItem;
    const originalRemoveItem = localStorage.removeItem;
    const originalClear = localStorage.clear;

    localStorage.setItem = function(key, value) {
        console.log(`📝 localStorage.setItem: ${key}`, value);
        if (key === 'studentData') {
            const data = JSON.parse(value);
            console.log(`👤 Student name being saved: "${data.studentName}"`);
        }
        return originalSetItem.apply(this, arguments);
    };

    localStorage.removeItem = function(key) {
        console.log(`🗑️ localStorage.removeItem: ${key}`);
        return originalRemoveItem.apply(this, arguments);
    };

    localStorage.clear = function() {
        console.log(`🧹 localStorage.clear called`);
        return originalClear.apply(this, arguments);
    };

    // Check current localStorage state when script loads
    console.log('🔍 Current localStorage state:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`  ${key}:`, value);
    }
    
    const studentData = localStorage.getItem('studentData');
    if (studentData) {
        const parsed = JSON.parse(studentData);
        console.log(`👤 Current student name: "${parsed.studentName}"`);
    } else {
        console.log('❌ No student data found in localStorage');
    }
})();
