/**
 * Missing JavaScript Functions for Teachers Pet Application
 * This file contains all the functions that are called in HTML but not defined
 */

console.log('Loading missing-functions.js...');

// Global variables
let selectedCommentId = null;
let selectedSubjects = [];
let selectedSubjectTitles = [];

// ===== INDEX.HTML FUNCTIONS =====

function refreshPage() {
    window.location.reload();
}

function startOver() {
    // Clear all stored data
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear visible form data and comments on current page
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
    
    // Clear any checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    
    // Hide generated comments section
    const commentsSection = document.getElementById('generatedComments');
    if (commentsSection) {
        commentsSection.style.display = 'none';
        commentsSection.classList.add('display-none');
    }
    
    // Clear comment text areas
    const commentElements = ['commentText1', 'commentText2'];
    commentElements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = 'Comments will appear here after generation...';
        }
    });
    
    // Reset selection count if it exists
    const selectionCount = document.getElementById('selectionCount');
    if (selectionCount) {
        selectionCount.textContent = '0';
    }
    
    // Detect current page and redirect accordingly
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html') {
        // If on index page, just refresh
        alert('All data cleared. Click "Start New Report" to begin.');
        if (typeof calendar !== 'undefined' && calendar) {
            calendar.refetchEvents();
        }
        setTimeout(() => location.reload(), 500);
    } else {
        // If on any other page, redirect to index
        alert('All data cleared. Redirecting to start new report...');
        
        // Refresh calendar if it exists
        if (typeof calendar !== 'undefined' && calendar) {
            calendar.refetchEvents();
        }
        
        // Redirect to the beginning immediately
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
    }
    const form = document.getElementById('bookingForm');
    if (form) {
        form.reset();
    }
}

// ===== STUDENT-INFORMATION.HTML FUNCTIONS =====

function addToStrengths(text) {
    const textarea = document.getElementById('strengths');
    if (!textarea) return;
    
    const currentValue = textarea.value.trim();
    if (currentValue.includes(text)) return;
    
    textarea.value = currentValue === '' ? text : currentValue + ', ' + text;
    
    // Trigger validation and auto-save if functions exist
    if (typeof validateField === 'function') {
        validateField(textarea);
    }
    if (typeof autoSaveFormData === 'function') {
        autoSaveFormData();
    }
}

function addToAreas(text) {
    const textarea = document.getElementById('weaknesses');
    if (!textarea) return;
    
    const currentValue = textarea.value.trim();
    if (currentValue.includes(text)) return;
    
    textarea.value = currentValue === '' ? text : currentValue + ', ' + text;
    
    // Trigger validation and auto-save if functions exist
    if (typeof validateField === 'function') {
        validateField(textarea);
    }
    if (typeof autoSaveFormData === 'function') {
        autoSaveFormData();
    }
}

function goToSubjects() {
    // Save form data if function exists
    if (typeof saveFormData === 'function') {
        saveFormData();
    }
    window.location.href = 'Subjects.html';
}

// ===== SUBJECTS.HTML FUNCTIONS =====

function refreshReport() {
    window.location.reload();
}

function selectAll() {
    // Select all topic checkboxes
    const checkboxes = document.querySelectorAll('.topic-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    
    // Select all subject checkboxes
    const subjectCheckboxes = document.querySelectorAll('.subject-checkbox');
    subjectCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
    });
    
    updateSelectionCount();
    saveSelections();
}

function clearAll() {
    // Clear all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Close all subject sections
    const contents = document.querySelectorAll('.subject-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Reset arrows
    const arrows = document.querySelectorAll('.dropdown-arrow');
    arrows.forEach(arrow => {
        arrow.classList.remove('rotated');
    });
    
    updateSelectionCount();
    saveSelections();
}

function toggleSubject(subjectId) {
    const content = document.getElementById(`content_${subjectId}`);
    const arrow = document.getElementById(`arrow_${subjectId}`);
    
    if (content && arrow) {
        content.classList.toggle('active');
        arrow.classList.toggle('rotated');
    }
}

function handleSubjectCheck(subjectId) {
    const subjectCheckbox = document.getElementById(`subject_${subjectId}`);
    const topicCheckboxes = document.querySelectorAll(`#content_${subjectId} .topic-checkbox`);
    
    if (subjectCheckbox && topicCheckboxes) {
        // If subject is checked, check all its topics
        if (subjectCheckbox.checked) {
            topicCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
        } else {
            // If subject is unchecked, uncheck all its topics
            topicCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        }
    }
    
    updateSelectionCount();
    saveSelections();
}

function updateSelectionCount() {
    const checkedTopics = document.querySelectorAll('.topic-checkbox:checked');
    const countElement = document.getElementById('selectionCount');
    if (countElement) {
        countElement.textContent = checkedTopics.length;
    }
}

function saveSelections() {
    // Save selected topics
    const checkedTopics = document.querySelectorAll('.topic-checkbox:checked');
    const selectedTopics = Array.from(checkedTopics).map(checkbox => checkbox.value);
    localStorage.setItem('selectedSubjects', JSON.stringify(selectedTopics));
    
    // Save selected subject titles
    const checkedSubjects = document.querySelectorAll('.subject-checkbox:checked');
    const selectedSubjectTitles = Array.from(checkedSubjects).map(checkbox => checkbox.value);
    localStorage.setItem('selectedSubjectTitles', JSON.stringify(selectedSubjectTitles));
}

function ensureCommentGeneration() {
    try {
        // Save current selections
        saveSelections();
        
        // Try to use the optimized comment generator first
        if (typeof generateOptimizedComments === 'function') {
            generateOptimizedComments();
        } else if (typeof window.generateOptimizedComments === 'function') {
            window.generateOptimizedComments();
        } else {
            // Fallback to basic comment generation
            generateBasicComments();
        }
    } catch (error) {
        console.error('Error generating comments:', error);
        alert('Error generating comments. Please try again.');
    }
}

function generateBasicComments() {
    // Basic fallback comment generation
    const studentData = JSON.parse(localStorage.getItem('studentData') || '{}');
    // CRITICAL FIX: Correct variable assignments to match localStorage
    const specificTopics = JSON.parse(localStorage.getItem('selectedSubjects') || '[]'); // These are the actual sub-topics like "recognizing letters A-E"
    const mainSubjects = JSON.parse(localStorage.getItem('selectedSubjectTitles') || '[]'); // These are main subjects like "English", "Phonics"
    
    console.log('Generating basic comments with data:', {
        studentData,
        specificTopics,
        mainSubjects
    });
    
    // Debug student name specifically
    console.log("Student name from localStorage:", studentData.studentName);
    console.log("Student name type:", typeof studentData.studentName);
    console.log("Student name length:", studentData.studentName ? studentData.studentName.length : 'undefined');
    
    const name = studentData.studentName && studentData.studentName.trim() ? studentData.studentName.trim() : "This student";
    
    // Warn user if student name is missing
    if (!studentData.studentName || !studentData.studentName.trim()) {
        console.warn('⚠️ Student name is missing! Please check the student information form.');
        // Show alert only once per session
        if (!window.studentNameWarningShown) {
            alert('⚠️ Warning: Student name is missing!\n\nPlease go back to the student information page and enter the student name to get personalized comments.');
            window.studentNameWarningShown = true;
        }
    }
    const gender = studentData.gender || 'they';
    const pronoun = gender === 'he' ? 'He' : gender === 'she' ? 'She' : 'They';
    const possessive = gender === 'he' ? 'his' : gender === 'she' ? 'her' : 'their';
    const object = gender === 'he' ? 'him' : gender === 'she' ? 'her' : 'them';
    
    // Get all user input data
    const strengths = studentData.strengths || '';
    const weaknesses = studentData.weaknesses || '';
    
    // CRITICAL FIX: Build comprehensive comments including SPECIFIC TOPICS user selected
    let baseComment1 = `${name} has demonstrated excellent progress this term across multiple learning areas.`;
    
    // PRIORITIZE specific topics over general subjects - THIS IS THE KEY FIX!
    if (specificTopics.length > 0) {
        const topicText = specificTopics.slice(0, 3).join(', ');
        baseComment1 += ` ${pronoun} shows strong understanding in specific areas including ${topicText}.`;
    } else if (mainSubjects.length > 0) {
        // Only use general subjects if no specific topics were selected
        baseComment1 += ` ${pronoun} shows strong understanding in ${mainSubjects.slice(0, 3).join(', ')}.`;
    }
    
    // Add strengths information
    if (strengths.trim()) {
        const strengthList = strengths.split(',').map(s => s.trim()).filter(Boolean);
        if (strengthList.length > 0) {
            baseComment1 += ` ${possessive.charAt(0).toUpperCase() + possessive.slice(1)} particular strengths include ${strengthList.slice(0, 3).join(', ')}.`;
        }
    }
    
    // Add more specific topic details if available
    if (specificTopics.length > 3) {
        const additionalTopics = specificTopics.slice(3, 5).join(' and ');
        baseComment1 += ` Additionally, ${name} has made notable progress in ${additionalTopics}.`;
    }
    
    // Add weaknesses/improvement areas
    if (weaknesses.trim()) {
        const weaknessList = weaknesses.split(',').map(w => w.trim()).filter(Boolean);
        if (weaknessList.length > 0) {
            baseComment1 += ` With continued support in ${weaknessList.slice(0, 2).join(' and ')}, ${name} will continue to develop these skills.`;
        }
    }
    
    baseComment1 += ` ${name} demonstrates positive classroom behavior and shows excellent potential for continued learning success.`;
    
    // Second comment with different wording but same SPECIFIC information
    let baseComment2 = `It has been a pleasure watching ${name} grow this term.`;
    
    // PRIORITIZE specific topics in second comment too
    if (specificTopics.length > 0) {
        const topicText = specificTopics.slice(0, 3).join(', ');
        baseComment2 += ` ${pronoun} has approached learning with enthusiasm, particularly in ${topicText}.`;
    } else if (mainSubjects.length > 0) {
        baseComment2 += ` ${pronoun} has approached learning with enthusiasm, particularly in ${mainSubjects.slice(0, 3).join(', ')}.`;
    }
    
    if (strengths.trim()) {
        const strengthList = strengths.split(',').map(s => s.trim()).filter(Boolean);
        if (strengthList.length > 0) {
            baseComment2 += ` ${name} excels in ${strengthList.slice(0, 3).join(', ')}, showing natural talent and dedication.`;
        }
    }
    
    // Add specific achievements based on selected topics
    if (specificTopics.length > 0) {
        const specificAchievements = specificTopics.slice(0, 3).join(', ');
        baseComment2 += ` Specific achievements in ${specificAchievements} highlight ${possessive} developing abilities.`;
    }
    
    if (weaknesses.trim()) {
        const weaknessList = weaknesses.split(',').map(w => w.trim()).filter(Boolean);
        if (weaknessList.length > 0) {
            baseComment2 += ` Through ongoing practice in ${weaknessList.slice(0, 2).join(' and ')}, ${name} will build even stronger foundations.`;
        }
    }
    
    baseComment2 += ` ${possessive.charAt(0).toUpperCase() + possessive.slice(1)} positive attitude contributes to our classroom community and creates a supportive learning environment.`;
    
    // Ensure comprehensive content with additional details if needed
    function ensureComprehensiveComment(comment) {
        // Add supplementary sentences for richer content if needed
        const additionalSentences = [
            `${name} shows readiness for continued academic challenges and demonstrates foundational skills for future success.`,
            `${possessive.charAt(0).toUpperCase() + possessive.slice(1)} learning journey has been marked by steady progress and positive engagement with educational activities.`,
            `The classroom environment has been enriched by ${name}'s contributions and positive energy throughout this academic period.`,
            `Regular practice and reinforcement will continue to support ${possessive} ongoing academic development and skill building.`,
            `${name} is well-prepared for the challenges and opportunities that lie ahead in future educational endeavors.`,
            `${pronoun} demonstrates excellent social skills and works cooperatively with classmates in all activities.`,
            `${possessive.charAt(0).toUpperCase() + possessive.slice(1)} creativity and problem-solving abilities continue to develop impressively.`
        ];
        
        // Add additional content for comprehensiveness
        const randomSentences = additionalSentences.sort(() => 0.5 - Math.random()).slice(0, 2);
        return comment + ' ' + randomSentences.join(' ');
    }
    
    const comment1 = ensureComprehensiveComment(baseComment1);
    const comment2 = ensureComprehensiveComment(baseComment2);
    
    // Apply text formatting without word limits
    const formattedComment1 = window.enforceWordLimit ? window.enforceWordLimit(comment1) : comment1;
    const formattedComment2 = window.enforceWordLimit ? window.enforceWordLimit(comment2) : comment2;
    
    // Update DOM
    const comment1Element = document.getElementById('commentText1');
    const comment2Element = document.getElementById('commentText2');
    const wordCount1Element = document.getElementById('wordCount1');
    const wordCount2Element = document.getElementById('wordCount2');
    
    if (comment1Element) comment1Element.textContent = formattedComment1;
    if (comment2Element) comment2Element.textContent = formattedComment2;
    
    if (wordCount1Element) wordCount1Element.textContent = `(${formattedComment1.split(' ').length} words)`;
    if (wordCount2Element) wordCount2Element.textContent = `(${formattedComment2.split(' ').length} words)`;
    
    // Show results
    const resultsElement = document.getElementById('generatedComments');
    if (resultsElement) {
        resultsElement.style.display = 'block';
        resultsElement.classList.remove('display-none');
        resultsElement.scrollIntoView({ behavior: 'smooth' });
    }
}

function selectComment(commentId) {
    // Remove previous selection
    document.querySelectorAll('.comment-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked comment
    const selectedComment = document.getElementById(`comment${commentId}`);
    if (selectedComment) {
        selectedComment.classList.add('selected');
        selectedCommentId = commentId;
    }
}

function copySelectedComment() {
    if (!selectedCommentId) {
        alert('Please select a comment to copy');
        return;
    }
    
    const commentElement = document.getElementById(`commentText${selectedCommentId}`);
    if (!commentElement) {
        alert('Comment not found');
        return;
    }
    
    const textToCopy = commentElement.textContent || commentElement.innerText;
    
    // Try to copy to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('Comment copied to clipboard!');
            })
            .catch(err => {
                console.error('Error copying text: ', err);
                fallbackCopyText(textToCopy);
            });
    } else {
        fallbackCopyText(textToCopy);
    }
}

function fallbackCopyText(text) {
    // Fallback method for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        alert('Comment copied to clipboard!');
    } catch (err) {
        console.error('Fallback copy failed:', err);
        alert('Failed to copy comment. Please select and copy manually.');
    }
    
    document.body.removeChild(textArea);
}

function exportReport() {
    if (!selectedCommentId) {
        alert('Please select a comment to export');
        return;
    }
    
    const studentData = JSON.parse(localStorage.getItem('studentData') || '{}');
    const commentElement = document.getElementById(`commentText${selectedCommentId}`);
    const comment = commentElement ? (commentElement.textContent || commentElement.innerText) : '';
    
    const reportContent = `
KINDERGARTEN REPORT

Student Name: ${studentData.studentName || 'N/A'}
Gender: ${studentData.gender || 'N/A'}
Overall Rating: ${studentData.overallAttributes || 'N/A'}/10

Strengths: ${studentData.strengths || 'N/A'}
Areas for Improvement: ${studentData.weaknesses || 'N/A'}

TEACHER COMMENT:
${comment}

Generated on: ${new Date().toLocaleDateString()}
    `.trim();
    
    // Create and download file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${studentData.studentName || 'Student'}_Report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function goBack() {
    window.location.href = 'student-information.html';
}

// ===== INITIALIZATION AND EVENT LISTENERS =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize selection count if on subjects page
    if (document.getElementById('selectionCount')) {
        updateSelectionCount();
        
        // Add event listeners to checkboxes
        document.querySelectorAll('.topic-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateSelectionCount();
                saveSelections();
            });
        });
        
        document.querySelectorAll('.subject-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                updateSelectionCount();
                saveSelections();
            });
        });
    }
    
    // Load saved selections if they exist
    try {
        const savedTopics = JSON.parse(localStorage.getItem('selectedSubjects') || '[]');
        const savedSubjects = JSON.parse(localStorage.getItem('selectedSubjectTitles') || '[]');
        
        // Restore topic selections
        savedTopics.forEach(topicValue => {
            const checkbox = document.querySelector(`.topic-checkbox[value="${topicValue}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
        
        // Restore subject selections
        savedSubjects.forEach(subjectValue => {
            const checkbox = document.querySelector(`.subject-checkbox[value="${subjectValue}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
        
        updateSelectionCount();
    } catch (error) {
        console.error('Error loading saved selections:', error);
    }
});

// Export functions for global access
window.refreshPage = refreshPage;
window.startOver = startOver;
window.closeBookingModal = closeBookingModal;
window.addToStrengths = addToStrengths;
window.addToAreas = addToAreas;
window.goToSubjects = goToSubjects;
window.refreshReport = refreshReport;
window.selectAll = selectAll;
window.clearAll = clearAll;
window.toggleSubject = toggleSubject;
window.handleSubjectCheck = handleSubjectCheck;
window.ensureCommentGeneration = ensureCommentGeneration;
window.selectComment = selectComment;
window.copySelectedComment = copySelectedComment;
window.exportReport = exportReport;
window.goBack = goBack;

console.log('All missing functions loaded and exported to window object');