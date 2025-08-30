/**
 * Optimized Comment Generation System
 * Enhanced data integration, grammar handling, and user input utilization
 */

class OptimizedCommentGenerator {
  constructor() {
    this.performanceMap = {
      10: {
        level: "exceptional",
        achievement: "outstanding mastery of developmental milestones",
        attitude: "exemplary engagement",
        descriptor: "remarkable",
      },
      9: {
        level: "excellent",
        achievement: "impressive command of key learning objectives",
        attitude: "consistently positive approach",
        descriptor: "excellent",
      },
      8: {
        level: "very strong",
        achievement: "solid grasp of essential concepts",
        attitude: "enthusiastic participation",
        descriptor: "strong",
      },
      7: {
        level: "strong",
        achievement: "good understanding of fundamental skills",
        attitude: "positive engagement",
        descriptor: "good",
      },
      6: {
        level: "good",
        achievement: "satisfactory progress in key areas",
        attitude: "cooperative behavior",
        descriptor: "satisfactory",
      },
      5: {
        level: "satisfactory",
        achievement: "appropriate developmental progress",
        attitude: "willing participation",
        descriptor: "adequate",
      },
      4: {
        level: "developing",
        achievement: "emerging understanding of core concepts",
        attitude: "engaged learning",
        descriptor: "developing",
      },
      3: {
        level: "basic",
        achievement: "foundational skill recognition",
        attitude: "participative approach",
        descriptor: "basic",
      },
      2: {
        level: "beginning",
        achievement: "early skill development",
        attitude: "responsiveness to support",
        descriptor: "beginning",
      },
      1: {
        level: "emerging",
        achievement: "initial learning exploration",
        attitude: "benefits from guidance",
        descriptor: "emerging",
      },
    };

    this.grammarRules = {
      pronouns: {
        he: {
          subject: "He",
          subject_lower: "he",
          object: "him",
          possessive: "his",
          possessive_cap: "His",
          verb: "has",
          isAre: "is",
          reflexive: "himself",
        },
        she: {
          subject: "She",
          subject_lower: "she", 
          object: "her",
          possessive: "her",
          possessive_cap: "Her",
          verb: "has",
          isAre: "is",
          reflexive: "herself",
        },
        they: {
          subject: "They",
          subject_lower: "they",
          object: "them",
          possessive: "their",
          possessive_cap: "Their",
          verb: "have",
          isAre: "are",
          reflexive: "themselves",
        },
      },

      subjectCapitalization: {
        english: "English",
        mathematics: "Mathematics",
        phonics: "Phonics",
        science: "Science",
        "social studies": "Social Studies",
        "i.q": "I.Q",
        "physical education": "Physical Education",
      },
    };

    this.sentenceTemplates = {
      male: {
        openings: [
          "{name} demonstrated {level} performance this term, achieving {achievement} across multiple developmental areas with consistent focus and determination.",
          "{name} has maintained {level} academic standards throughout this period, displaying structured progress and methodical engagement with learning objectives.",
          "Throughout this term, {name} established {level} foundational competencies while systematically developing essential educational skills and knowledge.",
          "{name} achieved {level} performance benchmarks this term, demonstrating measurable progress across core developmental milestones.",
          "Academic assessment reveals that {name} has attained {level} proficiency levels, meeting established standards through dedicated effort and application.",
        ],
        strengths: [
          "{name} consistently demonstrates exceptional capabilities in {strengths}, achieving measurable proficiency and maintaining high performance standards.",
          "Notable academic strengths include {pronoun_possessive} demonstrated abilities in {strengths}, which reflect sustained achievement and skill mastery.",
          "{name} excels particularly in {strengths}, displaying quantifiable progress and maintaining consistent performance excellence in these areas.",
          "Assessment data confirms {pronoun_possessive} strong competencies in {strengths}, evidencing systematic skill development and achievement of learning targets.",
          "{pronoun_subject} has established clear proficiency in {strengths}, demonstrating both technical understanding and practical application of these skills.",
        ],
        subjects: [
          "In {subjects}, {name} demonstrates consistent academic progress, meeting curriculum standards and achieving measurable learning outcomes.",
          "{name} has shown structured advancement in {subjects}, maintaining focus on learning objectives and demonstrating competency development.",
          "Performance data in {subjects} reflects {pronoun_possessive} systematic approach to learning and achievement of established academic benchmarks.",
          "{pronoun_subject} demonstrated solid competency growth in {subjects}, meeting grade-level expectations through focused effort and application.",
          "Academic progress in {subjects} indicates {name}'s ability to master essential concepts and achieve required performance standards.",
        ],
        weaknesses: [
          "With continued practice in {weaknesses}, {name} will further strengthen {pronoun_possessive} skills and build greater confidence.",
          "Areas for continued development include {weaknesses}, where additional support and encouragement will foster growth.",
          "Ongoing focus on {weaknesses} will help {name} build stronger foundational skills and achieve greater mastery.",
        ],
        topics: [
          "Specific achievements include {pronoun_possessive} progress in {topics}, highlighting {pronoun_possessive} developing skills and growing confidence.",
          "{pronoun_subject} has shown particular success with {topics}, demonstrating both understanding and practical application of these concepts.",
          "Notable progress in areas such as {topics} reflects {name}'s ability to grasp specific learning objectives and apply skills effectively.",
          "Assessment in {topics} shows {pronoun_possessive} strong grasp of these foundational concepts and readiness for continued development.",
        ],
        behavior: [
          "{pronoun_subject} maintains {attitude} throughout classroom activities, contributing positively to the learning environment.",
          "{name} exhibits {attitude} in all classroom interactions, demonstrating maturity and respect for peers and teachers.",
          "{pronoun_possessive_cap} classroom behavior reflects {attitude}, creating a supportive atmosphere for collaborative learning.",
        ],
        social: [
          "{name} demonstrates excellent social skills, working cooperatively with classmates and showing kindness in daily interactions.",
          "{pronoun_subject} contributes positively to group activities and shows consideration for others in all classroom situations.",
          "{pronoun_possessive_cap} collaborative spirit and friendly nature make {pronoun_object} a valued member of our classroom community.",
        ],
        conclusions: [
          "{name} {pronoun_isAre} well-prepared for continued academic advancement, having established strong foundational skills for future learning success.",
          "With ongoing guidance and support, {name} will continue to thrive academically and socially in future educational endeavors.",
          "{name} shows readiness for new learning challenges and demonstrates excellent potential for continued growth.",
        ],
      },
      female: {
        openings: [
          "{name} has flourished magnificently this term, blossoming into a confident learner and bringing such joy to our classroom community.",
          "It has been an absolute delight watching {name} grow and blossom, celebrating wonderful progress throughout this beautiful learning journey.",
          "{name} has bloomed into an enthusiastic learner, embracing each precious learning moment with such wonderful curiosity and grace.",
          "What a joy it has been to witness {name}'s beautiful growth this term, flourishing in so many wonderful ways across all learning areas.",
          "{name} has truly blossomed this term, radiating enthusiasm and bringing such warmth and joy to every learning experience.",
        ],
        strengths: [
          "{name}'s beautiful gifts in {strengths} truly illuminate our classroom, bringing such wonderful energy and inspiration to everyone around {pronoun_object}.",
          "We celebrate {pronoun_possessive} magnificent talents in {strengths}, which continue to blossom and flourish in the most wonderful ways.",
          "{name} brings such radiant joy to learning through {pronoun_possessive} exceptional abilities in {strengths}, inspiring and uplifting our entire classroom family.",
          "The wonderful way {name} shines in {strengths} fills our hearts with joy and creates such beautiful learning moments for everyone.",
          "{pronoun_possessive_cap} natural gifts in {strengths} bloom beautifully each day, bringing light and wonder to our learning community.",
        ],
        subjects: [
          "{pronoun_subject} has shown wonderful progress in {subjects} with genuine enthusiasm and a love for discovery.",
          "Our studies in {subjects} have been a delightful success for {name}, who approaches each lesson with curiosity.",
          "{name} approaches {subjects} with remarkable curiosity and determination, making meaningful connections with new concepts.",
        ],
        weaknesses: [
          "With gentle encouragement in {weaknesses}, {name} will continue to blossom and develop beautiful confidence in these areas.",
          "Areas where {name} will benefit from nurturing support include {weaknesses}, where we will celebrate each step of progress.",
          "Through patient guidance in {weaknesses}, {name} will discover {pronoun_possessive} own wonderful potential and capabilities.",
        ],
        topics: [
          "{pronoun_subject} has particularly excelled in {topics}, showing both understanding and creative application of these learning objectives.",
          "We celebrate {pronoun_possessive} beautiful achievements in {topics}, which reflect {pronoun_possessive} growing confidence and specific skill development.",
          "{name} has embraced learning opportunities in {topics} with enthusiasm, demonstrating wonderful progress and meaningful engagement.",
          "Assessment results in {topics} show {pronoun_possessive} strong foundation in these essential areas and readiness for new challenges.",
        ],
        behavior: [
          "{name} brings {attitude} to our classroom every day, creating a warm and welcoming environment for all.",
          "{pronoun_subject} creates a positive and nurturing atmosphere for everyone, showing kindness and consideration in all interactions.",
          "{pronoun_possessive_cap} gentle nature and {attitude} make our classroom a more joyful place for learning and growing together.",
        ],
        social: [
          "{name} brings kindness and cooperation to all classroom interactions, naturally supporting and encouraging {pronoun_possessive} classmates.",
          "{pronoun_subject} demonstrates beautiful social skills, creating friendships and showing empathy in all classroom situations.",
          "{pronoun_possessive_cap} caring and inclusive nature makes {pronoun_object} a treasured friend and valued member of our learning community.",
        ],
        conclusions: [
          "{name} {pronoun_isAre} ready for wonderful new adventures in learning, having built a strong foundation for future success.",
          "With nurturing guidance and continued encouragement, {name} will continue to flourish and bloom in all areas of development.",
          "{name} brings joy to our classroom and shows beautiful potential for continued learning success.",
        ],
      },
    };
  }
  /**
   * Enhanced natural language joining with proper grammar
   */
  naturalJoin(arr, conjunction = "and") {
    if (!arr || arr.length === 0) return "";
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return `${arr[0]} ${conjunction} ${arr[1]}`;
    return `${arr.slice(0, -1).join(", ")}, ${conjunction} ${arr.slice(-1)}`;
  }

  /**
   * Capitalize subjects with proper handling of special cases
   */
  capitalizeSubjects(subjectList) {
    return subjectList.map((subject) => {
      const lower = subject.toLowerCase();
      if (this.grammarRules.subjectCapitalization[lower]) {
        return this.grammarRules.subjectCapitalization[lower];
      }
      if (lower.includes("conversation")) {
        return subject.charAt(0).toUpperCase() + subject.slice(1);
      }
      return subject.charAt(0).toUpperCase() + subject.slice(1);
    });
  }

  /**
   * Process and clean input text arrays
   */
  processTextArray(text, maxItems = 3) {
    if (!text || typeof text !== "string") return [];
    return text
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, maxItems);
  }

  /**
   * Replace template placeholders with actual values and ensure proper grammar
   */
  replacePlaceholders(template, data) {
    let result = template.replace(/\{([^}]+)\}/g, (match, key) => {
      return data[key] || match;
    });
    
    // Apply name personalization
    result = this.ensureNameUsage(result, data.name);
    
    // Post-processing for grammar improvements
    result = this.improveGrammar(result);
    
    return result;
  }

  /**
   * Comprehensive grammar improvement with enhanced rules
   */
  improveGrammar(text) {
    // Fix common capitalization issues after sentence endings
    text = text.replace(/([.!?]\s+)([a-z])/g, (match, punctuation, letter) => {
      return punctuation + letter.toUpperCase();
    });
    
    // Ensure proper capitalization at the beginning of the text
    text = text.replace(/^([a-z])/, (match, letter) => {
      return letter.toUpperCase();
    });
    
    // Enhanced pronoun capitalization (comprehensive patterns)
    text = text.replace(/\b(\.|!|\?)\s+(he|she|his|her|him|their|they|them)\b/g, (match, punct, pronoun) => {
      return punct + ' ' + pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
    });
    
    // Fix possessive pronoun capitalization after punctuation
    text = text.replace(/([.!?]\s+)(his|her|their)\s+([a-z])/g, (match, punct, possessive, nextWord) => {
      return punct + possessive.charAt(0).toUpperCase() + possessive.slice(1) + ' ' + nextWord;
    });
    
    // Ensure proper spacing after punctuation
    text = text.replace(/([.!?])([A-Z])/g, '$1 $2');
    
    // Fix double spaces
    text = text.replace(/\s+/g, ' ');
    
    // Ensure proper ending punctuation
    if (!/[.!?]$/.test(text.trim())) {
      text = text.trim().replace(/[,;:]$/, '') + '.';
    }
    
    return text.trim();
  }

  /**
   * Validate input data completeness and quality
   */
  validateInputData(studentData, selectedTopics, selectedSubjects) {
    const validation = {
      isValid: true,
      warnings: [],
      errors: []
    };

    // Check student name
    if (!studentData.studentName || studentData.studentName.trim() === "" || studentData.studentName === "The student") {
      validation.warnings.push("Student name is missing or generic - will use fallback");
    }

    // Check data completeness
    if (!studentData.strengths || studentData.strengths.trim() === "") {
      validation.warnings.push("No strengths provided - will use defaults");
    }

    if (!studentData.weaknesses || studentData.weaknesses.trim() === "") {
      validation.warnings.push("No growth areas provided - will use defaults");
    }

    if (!selectedTopics || selectedTopics.length === 0) {
      validation.warnings.push("No specific topics selected - will use general topics");
    }

    if (!selectedSubjects || selectedSubjects.length === 0) {
      validation.warnings.push("No subjects selected - will use general subjects");
    }

    return validation;
  }

  /**
   * Validate generated comment quality
   */
  validateGeneratedComment(comment, studentData) {
    const validation = {
      isValid: true,
      issues: [],
      score: 0
    };

    let score = 0;

    // Grammar checks
    if (!/[.!?]$/.test(comment.trim())) {
      validation.issues.push("Missing proper ending punctuation");
    } else {
      score += 10;
    }

    if (/[.!?]\s+[a-z]/.test(comment)) {
      validation.issues.push("Capitalization error after punctuation");
    } else {
      score += 10;
    }

    if (/\s{2,}/.test(comment)) {
      validation.issues.push("Multiple consecutive spaces found");
    } else {
      score += 10;
    }

    // Name usage checks
    if (comment.includes('The student') || comment.includes('the student')) {
      validation.issues.push("Generic 'The student' reference found");
    } else {
      score += 15;
    }

    const nameCount = (comment.match(new RegExp(studentData.studentName, 'gi')) || []).length;
    if (nameCount >= 3) {
      score += 15;
    } else if (nameCount >= 1) {
      score += 5;
    } else {
      validation.issues.push("Student name not used enough");
    }

    // Data integration checks
    if (studentData.strengths) {
      const strengthsArray = studentData.strengths.split(',').map(s => s.trim().toLowerCase());
      const hasStrengths = strengthsArray.some(strength => 
        comment.toLowerCase().includes(strength.slice(0, 6))
      );
      if (hasStrengths) {
        score += 10;
      } else {
        validation.issues.push("Student strengths not clearly referenced");
      }
    }

    if (studentData.weaknesses) {
      const weaknessesArray = studentData.weaknesses.split(',').map(s => s.trim().toLowerCase());
      const hasWeaknesses = weaknessesArray.some(weakness => 
        comment.toLowerCase().includes(weakness.slice(0, 6))
      );
      if (hasWeaknesses) {
        score += 10;
      } else {
        validation.issues.push("Growth areas not clearly referenced");
      }
    }

    // Word count check
    const wordCount = comment.split(/\s+/).length;
    if (wordCount >= 80) {
      score += 20;
    } else if (wordCount >= 60) {
      score += 10;
    } else {
      validation.issues.push(`Comment too short: ${wordCount} words (minimum 80 recommended)`);
    }

    validation.score = score;
    validation.isValid = validation.issues.length === 0;

    return validation;
  }

  /**
   * Ensure student name usage instead of generic references
   */
  ensureNameUsage(text, studentName) {
    if (!studentName || studentName === 'The student') return text;
    
    // Replace "The student" with student name
    text = text.replace(/\bThe student\b/g, studentName);
    text = text.replace(/\bthe student\b/g, studentName);
    
    // Replace generic "student" with name when appropriate
    text = text.replace(/\b([Aa])\s+student\b/g, (match, article) => {
      return studentName;
    });
    
    return text;
  }

  /**
   * Select random template from array with weighted preference for variety
   */
  selectTemplate(templates, usedTemplates = new Set()) {
    // Prefer unused templates first
    const unused = templates.filter((_, index) => !usedTemplates.has(index));
    if (unused.length > 0) {
      const selected = unused[Math.floor(Math.random() * unused.length)];
      const index = templates.indexOf(selected);
      usedTemplates.add(index);
      return selected;
    }
    // If all used, pick randomly
    return templates[Math.floor(Math.random() * templates.length)];
  }

  /**
   * Ensure proper punctuation and formatting without word limits
   */
  optimizeWordCount(text, targetWords = 75, maxWords = 80) {
    // Clean up the text and ensure proper punctuation
    let cleanedText = text.trim();
    
    // Ensure proper ending punctuation
    if (!/[.!?]$/.test(cleanedText)) {
      cleanedText = cleanedText.replace(/[,;:]\s*$/, "") + ".";
    }

    return cleanedText.trim();
  }

  /**
   * Generate additional content when comment is too short
   */
  generateAdditionalContent(wordsNeeded, studentName = "The student", pronouns = null) {
    const name = studentName || "The student";
    const p = pronouns || { subject: "They", possessive: "their", object: "them", verb: "have", isAre: "are" };
    
    const additionalSentences = [
      `The learning environment has been enriched by ${name}'s positive contributions.`,
      `Regular practice and reinforcement of key concepts will support ${p.possessive} ongoing development.`,
      `${name} shows readiness for new challenges and learning opportunities.`,
      `Collaborative learning experiences ${p.verb} been particularly beneficial for ${p.possessive} skill development.`,
      `${name}'s natural curiosity and eagerness to learn ${p.isAre} valuable assets.`,
      `Building on current strengths will support ${p.possessive} continued academic progress.`,
      `${name} demonstrates excellent potential for future learning success.`,
      `${p.possessive.charAt(0).toUpperCase() + p.possessive.slice(1)} positive attitude contributes to classroom success.`
    ];

    const result = [];
    let wordsAdded = 0;

    for (const sentence of additionalSentences) {
      if (wordsAdded >= wordsNeeded) break;
      result.push(sentence);
      wordsAdded += sentence.split(/\s+/).length;
    }

    return result;
  }

  /**
   * Enhanced comment generation with mandatory data integration and validation
   */
  generateOptimizedComment(
    studentData,
    selectedTopics,
    selectedSubjects,
    variant = 1
  ) {
    // Pre-generation validation
    const inputValidation = this.validateInputData(studentData, selectedTopics, selectedSubjects);
    if (inputValidation.warnings.length > 0) {
      console.warn('Input validation warnings:', inputValidation.warnings);
    }
    // Data validation and defaults - ensure name is never "The student"
    const name = studentData.studentName && studentData.studentName.trim() && studentData.studentName !== "The student" 
      ? studentData.studentName.trim() 
      : "This student";
      
    // Warn user if student name is missing
    if (!studentData.studentName || !studentData.studentName.trim()) {
      console.warn('⚠️ Student name is missing! Please check the student information form.');
      // Show alert only once per session
      if (!window.studentNameWarningShown) {
        alert('⚠️ Warning: Student name is missing!\n\nPlease go back to the student information page and enter the student name to get personalized comments.');
        window.studentNameWarningShown = true;
      }
    }
    const gender = studentData.gender || "they";
    const overall = Math.max(
      1,
      Math.min(10, parseInt(studentData.overallAttributes || 5))
    );

    // Get performance data
    const perf = this.performanceMap[overall] || this.performanceMap[5];
    const pronouns =
      this.grammarRules.pronouns[gender] || this.grammarRules.pronouns.they;

    // MANDATORY: Process ALL input arrays - never empty
    const strengthsList = this.processTextArray(studentData.strengths, 4) || ["classroom engagement", "positive attitude"];
    const weaknessList = this.processTextArray(studentData.weaknesses, 3) || ["continued skill development"];
    const subjectsList = this.capitalizeSubjects(selectedSubjects || ["general learning"]);
    const topicsList = (selectedTopics || ["foundational skills"]).slice(0, 5); // Show more topics

    // Select template style (male/female teacher perspective)
    const isFemaleStyle = variant === 2;
    const templates = this.sentenceTemplates[isFemaleStyle ? "female" : "male"];

    // Track used templates for variety
    const usedTemplates = new Set();
    const sentences = [];

    // Prepare replacement data
    const replacementData = {
      name: name,
      level: perf.level,
      achievement: perf.achievement,
      attitude: perf.attitude,
      descriptor: perf.descriptor,
      pronoun_subject: pronouns.subject,
      pronoun_subject_lower: pronouns.subject_lower || pronouns.subject.toLowerCase(),
      pronoun_object: pronouns.object,
      pronoun_possessive: pronouns.possessive,
      pronoun_possessive_cap: pronouns.possessive_cap || (pronouns.possessive.charAt(0).toUpperCase() + pronouns.possessive.slice(1)),
      pronoun_verb: pronouns.verb,
      pronoun_isAre: pronouns.isAre,
      pronoun_reflexive: pronouns.reflexive,
    };

    // MANDATORY: Generate opening sentence
    const opening = this.selectTemplate(templates.openings, usedTemplates);
    sentences.push(this.replacePlaceholders(opening, replacementData));

    // MANDATORY: Add strengths (always included)
    const strengthsText = this.naturalJoin(strengthsList.slice(0, 3));
    const strengthTemplate = this.selectTemplate(
      templates.strengths,
      usedTemplates
    );
    sentences.push(
      this.replacePlaceholders(strengthTemplate, {
        ...replacementData,
        strengths: strengthsText,
      })
    );

    // MANDATORY: Add specific topics first (user's actual selections)
    const topicsText = this.naturalJoin(
      topicsList.slice(0, 4).map((t) => typeof t === 'string' ? t.toLowerCase() : String(t).toLowerCase())
    );
    const topicTemplate = this.selectTemplate(
      templates.topics,
      usedTemplates
    );
    sentences.push(
      this.replacePlaceholders(topicTemplate, {
        ...replacementData,
        topics: topicsText,
      })
    );

    // MANDATORY: Add subjects (always included)
    const subjectsText = this.naturalJoin(subjectsList.slice(0, 3));
    const subjectTemplate = this.selectTemplate(
      templates.subjects,
      usedTemplates
    );
    sentences.push(
      this.replacePlaceholders(subjectTemplate, {
        ...replacementData,
        subjects: subjectsText,
      })
    );

    // MANDATORY: Add growth areas (always included)
    const weaknessesText = this.naturalJoin(weaknessList.slice(0, 2));
    const weaknessTemplate = this.selectTemplate(
      templates.weaknesses,
      usedTemplates
    );
    sentences.push(
      this.replacePlaceholders(weaknessTemplate, {
        ...replacementData,
        weaknesses: weaknessesText,
      })
    );

    // MANDATORY: Add behavior/attitude
    const behaviorTemplate = this.selectTemplate(
      templates.behavior,
      usedTemplates
    );
    sentences.push(this.replacePlaceholders(behaviorTemplate, replacementData));

    // MANDATORY: Add social skills
    const socialTemplate = this.selectTemplate(templates.social, usedTemplates);
    sentences.push(this.replacePlaceholders(socialTemplate, replacementData));

    // MANDATORY: Add conclusion
    const conclusionTemplate = this.selectTemplate(
      templates.conclusions,
      usedTemplates
    );
    sentences.push(
      this.replacePlaceholders(conclusionTemplate, replacementData)
    );

    // Combine and format
    const fullComment = sentences.join(" ");
    const optimizedComment = this.optimizeWordCount(fullComment);
    
    // Final name personalization pass
    const finalComment = this.ensureNameUsage(optimizedComment, name);
    
    // Post-generation validation
    const outputValidation = this.validateGeneratedComment(finalComment, studentData);
    if (outputValidation.issues.length > 0) {
      console.warn('Generated comment issues:', outputValidation.issues);
      console.log('Comment quality score:', outputValidation.score + '/100');
    }
    
    return finalComment;
  }

  /**
   * Generate multiple comment variations
   */
  generateCommentVariations(
    studentData,
    selectedTopics,
    selectedSubjects,
    count = 2
  ) {
    const comments = [];
    for (let i = 1; i <= count; i++) {
      comments.push(
        this.generateOptimizedComment(
          studentData,
          selectedTopics,
          selectedSubjects,
          i
        )
      );
    }
    return comments;
  }

  /**
   * Integration function for existing system
   */
  integrateWithExistingSystem() {
    // Universal text formatter function (no word limits)
    window.enforceWordLimit = (text, maxWords = 80) => {
      let cleanedText = text.trim();
      
      // Ensure proper ending punctuation
      if (!/[.!?]$/.test(cleanedText)) {
        cleanedText = cleanedText.replace(/[,;:]\s*$/, "") + ".";
      }
      
      return cleanedText.trim();
    };

    // Override the existing generateComment function
    window.generateOptimizedComments = () => {
      try {
        // Get data from localStorage (same as existing system)
        const studentData = JSON.parse(
          localStorage.getItem("studentData") || "{}"
        );
        // CRITICAL FIX: Correct the variable assignments to match localStorage
        const specificTopics = JSON.parse(
          localStorage.getItem("selectedSubjects") || "[]"
        ); // These are the specific sub-topics like "recognizing letters A-E"
        const mainSubjects = JSON.parse(
          localStorage.getItem("selectedSubjectTitles") || "[]"
        ); // These are the main subjects like "English", "Phonics"

        console.log("Generating comments with data:", {
          studentData,
          specificTopics,
          mainSubjects
        });
        
        // Debug student name specifically
        console.log("Student name from localStorage:", studentData.studentName);
        console.log("Student name type:", typeof studentData.studentName);
        console.log("Student name length:", studentData.studentName ? studentData.studentName.length : 'undefined');

        // Generate optimized comments with correct parameter order
        // selectedTopics should be the specific topics, selectedSubjects should be main subjects
        const comments = this.generateCommentVariations(
          studentData,
          specificTopics, // The actual selected sub-topics (what the user checked)
          mainSubjects,   // The main subject categories
          2
        );

        // Update DOM elements
        const comment1Element = document.getElementById("commentText1");
        const comment2Element = document.getElementById("commentText2");
        const wordCount1Element = document.getElementById("wordCount1");
        const wordCount2Element = document.getElementById("wordCount2");

        if (comment1Element && comment2Element) {
          // Format comments without word limits
          const formattedComment1 = window.enforceWordLimit(comments[0]);
          const formattedComment2 = window.enforceWordLimit(comments[1]);
          
          comment1Element.innerHTML = formattedComment1;
          comment2Element.innerHTML = formattedComment2;

          // Update word counts
          const wordCount1 = formattedComment1.split(/\s+/).length;
          const wordCount2 = formattedComment2.split(/\s+/).length;

          if (wordCount1Element)
            wordCount1Element.textContent = `(${wordCount1} words)`;
          if (wordCount2Element)
            wordCount2Element.textContent = `(${wordCount2} words)`;
        }

        // Show results
        const resultsElement = document.getElementById("generatedComments");
        if (resultsElement) {
          resultsElement.style.display = "block";
          resultsElement.classList.remove('display-none');
          resultsElement.scrollIntoView({ behavior: "smooth" });
        }

        console.log("Optimized comments generated successfully with specific topics:", specificTopics);
        return comments;
      } catch (error) {
        console.error("Error generating optimized comments:", error);
        // Fallback to original system if available
        if (typeof generateComments === "function") {
          generateComments();
        }
      }
    };

    // Also provide direct access to the generator
    window.optimizedCommentGenerator = this;

    console.log("Optimized Comment Generator integrated successfully");
  }
}

// Initialize and integrate the optimized system
document.addEventListener("DOMContentLoaded", () => {
  const generator = new OptimizedCommentGenerator();
  generator.integrateWithExistingSystem();
  
  // Ensure missing functions are available
  console.log("Optimized Comment Generator integrated successfully");
});

// Export for module use if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = OptimizedCommentGenerator;
}
