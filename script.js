// ResumeIQ - Advanced Smart Resume Reviewer
console.log("heool");

class ResumeAnalyzer {
    constructor() {
        this.currentIndustry = null;
        this.currentFile = null;
        this.analysisData = null;
        this.scoreChart = null;
        this.isAnalyzing = false;
        
        this.industryKeywords = {
            tech: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'Git', 'Agile', 'CI/CD', 'API', 'Database', 'Machine Learning', 'AI', 'Cloud Computing', 'DevOps', 'Frontend', 'Backend', 'Full Stack'],
            finance: ['Financial Analysis', 'Risk Management', 'Portfolio Management', 'Excel', 'SQL', 'Bloomberg', 'Financial Modeling', 'Accounting', 'Investment', 'Banking', 'Trading', 'Compliance', 'Audit', 'Budget', 'Forecasting', 'Derivatives', 'Equity', 'Fixed Income'],
            healthcare: ['Patient Care', 'Medical Records', 'HIPAA', 'Clinical Research', 'Healthcare Management', 'EMR', 'Medical Terminology', 'Patient Safety', 'Quality Assurance', 'Pharmacy', 'Nursing', 'Surgery', 'Diagnosis', 'Treatment', 'Healthcare Technology'],
            marketing: ['Digital Marketing', 'SEO', 'SEM', 'Social Media', 'Content Marketing', 'Email Marketing', 'Analytics', 'Brand Management', 'Campaign Management', 'Lead Generation', 'Conversion Optimization', 'Marketing Automation', 'PPC', 'Google Analytics', 'Facebook Ads'],
            education: ['Curriculum Development', 'Lesson Planning', 'Student Assessment', 'Classroom Management', 'Educational Technology', 'Learning Management Systems', 'Special Education', 'Educational Research', 'Teaching', 'Training', 'Mentoring', 'Academic Administration'],
            consulting: ['Strategic Planning', 'Business Analysis', 'Process Improvement', 'Change Management', 'Project Management', 'Client Relations', 'Problem Solving', 'Data Analysis', 'Presentation Skills', 'Stakeholder Management', 'Business Development', 'Consulting'],
            design: ['UX/UI Design', 'Graphic Design', 'Adobe Creative Suite', 'Figma', 'Sketch', 'Prototyping', 'User Research', 'Design Thinking', 'Visual Design', 'Branding', 'Typography', 'Color Theory', 'Wireframing', 'Design Systems'],
            sales: ['Sales Management', 'Lead Generation', 'Customer Relationship Management', 'CRM', 'Salesforce', 'Pipeline Management', 'Account Management', 'Business Development', 'Negotiation', 'Cold Calling', 'Prospecting', 'Closing', 'Revenue Growth']
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.initializeChart();
        this.createFloatingParticles();
        this.setupTabSystem();
        this.startAIInsightsRotation();
    }
    
    setupEventListeners() {
        // File upload handlers
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        
        // Drag and drop
        dropZone.addEventListener('dragover', this.handleDragOver.bind(this));
        dropZone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        dropZone.addEventListener('drop', this.handleFileDrop.bind(this));
        dropZone.addEventListener('click', () => fileInput.click());
        
        // File input
        fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        
        // Industry selection
        document.querySelectorAll('.industry-btn').forEach(btn => {
            btn.addEventListener('click', this.handleIndustrySelect.bind(this));
        });
        
        // Start analysis button
        document.querySelector('.bg-gradient-to-r.from-cyan-500').addEventListener('click', this.startAnalysis.bind(this));
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }
    
    handleDragLeave(e) {
        e.currentTarget.classList.remove('drag-over');
    }
    
    handleFileDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }
    
    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }
    
    processFile(file) {
        if (!this.validateFile(file)) return;
        
        this.currentFile = file;
        this.updateUploadStatus(file);
        this.simulateFileProcessing();
    }
    
    validateFile(file) {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (!validTypes.includes(file.type)) {
            this.showNotification('Please upload a PDF, DOC, or DOCX file.', 'error');
            return false;
        }
        
        if (file.size > maxSize) {
            this.showNotification('File size must be less than 5MB.', 'error');
            return false;
        }
        
        return true;
    }
    
    updateUploadStatus(file) {
        const dropZone = document.getElementById('dropZone');
        dropZone.innerHTML = `
            <div class=\"upload-success mb-4\">
                <i class=\"fas fa-check-circle text-4xl text-green-400 mb-2\"></i>
                <h3 class=\"text-lg font-semibold text-green-400\">File Uploaded Successfully!</h3>
                <p class=\"text-gray-300 text-sm\">${file.name} (${this.formatFileSize(file.size)})</p>
            </div>
            <button class=\"bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-lg font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-300\">
                Upload Different File
            </button>
        `;
        
        dropZone.addEventListener('click', () => {
            this.resetUploadZone();
            document.getElementById('fileInput').click();
        });
    }
    
    resetUploadZone() {
        const dropZone = document.getElementById('dropZone');
        dropZone.innerHTML = `
            <div class=\"upload-icon mb-4\">
                <i class=\"fas fa-cloud-upload-alt text-6xl text-cyan-400/60\"></i>
            </div>
            <h3 class=\"text-xl font-semibold mb-2\">Drag & Drop Your Resume</h3>
            <p class=\"text-gray-400 mb-4\">Support for PDF, DOC, DOCX formats</p>
            <button class=\"bg-gradient-to-r from-cyan-600 to-purple-600 px-6 py-3 rounded-lg font-medium hover:from-cyan-500 hover:to-purple-500 transition-all duration-300\">
                Choose File
            </button>
        `;
    }
    
    simulateFileProcessing() {
        this.showNotification('Processing your resume...', 'info');
        
        // Simulate file reading and text extraction
        setTimeout(() => {
            this.extractResumeContent();
        }, 1500);
    }
    
    extractResumeContent() {
        // Simulate text extraction from different file types
        const mockResumeContent = this.generateMockResumeContent();
        this.analysisData = {
            content: mockResumeContent,
            extractedText: mockResumeContent,
            sections: this.identifySections(mockResumeContent),
            keywords: this.extractKeywords(mockResumeContent)
        };
        
        this.showNotification('Resume processed successfully!', 'success');
        this.enableAnalysisButton();
    }
    
    generateMockResumeContent() {
        return `
        John Smith
        Software Engineer
        
        EXPERIENCE
        Senior Software Engineer at Tech Corp (2020-2023)
        - Developed web applications using React and Node.js
        - Implemented CI/CD pipelines using Docker and Jenkins
        - Led a team of 5 developers on multiple projects
        - Improved application performance by 40%
        
        Software Engineer at StartupXYZ (2018-2020) 
        - Built REST APIs using Python and Flask
        - Worked with databases including PostgreSQL and MongoDB
        - Collaborated with cross-functional teams using Agile methodologies
        
        EDUCATION
        Bachelor of Science in Computer Science
        University of Technology (2014-2018)
        
        SKILLS
        JavaScript, Python, React, Node.js, Docker, AWS, Git, Agile, CI/CD
        
        PROJECTS
        E-commerce Platform - Built a full-stack web application using MERN stack
        Task Management App - Developed a React Native mobile application
        `;
    }
    
    handleIndustrySelect(e) {
        document.querySelectorAll('.industry-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        e.currentTarget.classList.add('selected');
        this.currentIndustry = e.currentTarget.dataset.industry;
        
       this.showNotification(`Selected ${e.currentTarget.textContent.trim()}`, industry, 'success');

        
        if (this.currentFile) {
            this.updateAIInsights();
        }
    }
    
    enableAnalysisButton() {
        const btn = document.querySelector('.bg-gradient-to-r.from-cyan-500');
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
        btn.classList.add('hover:from-cyan-400', 'hover:to-purple-500');
    }
    
    async startAnalysis() {
        if (!this.currentFile) {
            this.showNotification('Please upload a resume first.', 'error');
            return;
        }
        
        if (!this.currentIndustry) {
            this.showNotification('Please select a target industry.', 'error');
            return;
        }
        
        this.isAnalyzing = true;
        this.showAnalysisProgress();
        
        try {
            await this.performAnalysis();
            this.displayResults();
            this.showNotification('Analysis completed successfully!', 'success');
        } catch (error) {
            this.showNotification('Analysis failed. Please try again.', 'error');
            console.error('Analysis error:', error);
        } finally {
            this.isAnalyzing = false;
        }
    }
    
    showAnalysisProgress() {
        const stages = [
            'Extracting resume content...',
            'Analyzing structure and format...',
            'Checking ATS compatibility...',
            'Evaluating keyword relevance...',
            'Generating AI insights...',
            'Calculating final scores...'
        ];
        
        let currentStage = 0;
        
        const progressInterval = setInterval(() => {
            if (currentStage < stages.length) {
                this.showNotification(stages[currentStage], 'info');
                this.updateProgressIndicators(currentStage);
                currentStage++;
            } else {
                clearInterval(progressInterval);
            }
        }, 800);
    }
    
    updateProgressIndicators(stage) {
        const progress = ((stage + 1) / 6) * 100;
        
        // Update score displays with animation
        this.animateScoreUpdate('atsScore', Math.min(progress * 0.8, 85));
        this.animateScoreUpdate('keywordScore', Math.min(progress * 0.9, 78));
        this.animateScoreUpdate('structureScore', Math.min(progress * 1.1, 92));
        this.animateScoreUpdate('impactScore', Math.min(progress * 0.7, 68));
    }
    
    animateScoreUpdate(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const percentageElement = document.getElementById(elementId.replace('Score', 'Percentage'));
        
        if (!element || !percentageElement) return;
        
        const currentWidth = parseFloat(element.style.width) || 0;
        const increment = (targetValue - currentWidth) / 20;
        
        let current = currentWidth;
        const animationInterval = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(animationInterval);
            }
            
            element.style.width = `${current}%`;
            percentageElement.textContent = `${Math.round(current)}%`;

        }, 50);
    }
    
    async performAnalysis() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const analysis = this.generateComprehensiveAnalysis();
                this.analysisData = { ...this.analysisData, ...analysis };
                this.updateOverallScore();
                resolve(analysis);
            }, 5000);
        });
    }
    
    generateComprehensiveAnalysis() {
        const industryKeywords = this.industryKeywords[this.currentIndustry] || [];
        const resumeKeywords = this.analysisData.keywords;
        
        const foundKeywords = industryKeywords.filter(keyword => 
            resumeKeywords.some(resumeKeyword => 
                resumeKeyword.toLowerCase().includes(keyword.toLowerCase())
            )
        );
        
        const missingKeywords = industryKeywords.filter(keyword => 
            !foundKeywords.some(found => found.toLowerCase() === keyword.toLowerCase())
        ).slice(0, 10);
        
        return {
            scores: {
                overall: this.calculateOverallScore(),
                ats: 85,
                keywords: Math.round((foundKeywords.length / industryKeywords.length) * 100),
                structure: 92,
                impact: 68
            },
            foundKeywords,
            missingKeywords,
            strengths: this.generateStrengths(),
            improvements: this.generateImprovements(),
            recommendations: this.generateRecommendations(),
            sectionAnalysis: this.analyzeSections(),
            atsReport: this.generateATSReport()
        };
    }
    
    calculateOverallScore() {
        const scores = {
            ats: 85,
            keywords: 78,
            structure: 92,
            impact: 68
        };
        
        const weights = {
            ats: 0.3,
            keywords: 0.25,
            structure: 0.25,
            impact: 0.2
        };
        
        return Math.round(
            scores.ats * weights.ats +
            scores.keywords * weights.keywords +
            scores.structure * weights.structure +
            scores.impact * weights.impact
        );
    }
    
    updateOverallScore() {
        const score = this.analysisData.scores.overall;
        const scoreElement = document.getElementById('overallScore');
        const labelElement = document.getElementById('scoreLabel');
        
        // Animate score counting
        this.animateCounter(scoreElement, 0, score, 2000);
        
        // Update label based on score
        let label = 'Excellent';
        let color = 'text-green-400';
        
        if (score < 60) {
            label = 'Needs Improvement';
            color = 'text-red-400';
        } else if (score < 75) {
            label = 'Good';
            color = 'text-yellow-400';
        } else if (score < 85) {
            label = 'Very Good';
            color = 'text-blue-400';
        }
        
        labelElement.textContent = label;
        labelElement.className = text-sm `${color}`;
        
        // Update chart
        this.updateScoreChart(score);
    }
    
    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.round(start + (end - start) * this.easeOutCubic(progress));
            element.textContent = current;
            element.classList.add('score-animate');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
    
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    generateStrengths() {
        return [
            'Strong technical skills alignment with industry requirements',
            'Well-structured experience section with quantifiable achievements',
            'Comprehensive skills section covering relevant technologies',
            'Clear progression in career responsibilities',
            'Good use of action verbs and impact metrics'
        ];
    }
    
    generateImprovements() {
        return [
            'Add more industry-specific keywords throughout the resume',
            'Include more quantified achievements and results',
            'Enhance the summary section with value proposition',
            'Add relevant certifications or professional development',
            'Improve ATS compatibility with better formatting'
        ];
    }
    
    generateRecommendations() {
        return [
            {
                type: 'high',
                title: 'Add Missing Keywords',
                description: 'Include 5-7 missing industry keywords naturally throughout your resume to improve ATS compatibility.',
                impact: '+12 points'
            },
            {
                type: 'high',
                title: 'Quantify Achievements',
                description: 'Add specific numbers, percentages, or metrics to at least 3 more bullet points in your experience section.',
                impact: '+8 points'
            },
            {
                type: 'medium',
                title: 'Optimize Summary Section',
                description: 'Craft a compelling professional summary that highlights your unique value proposition.',
                impact: '+6 points'
            },
            {
                type: 'medium',
                title: 'ATS Format Optimization',
                description: 'Simplify formatting, use standard section headers, and avoid graphics or tables.',
                impact: '+5 points'
            },
            {
                type: 'low',
                title: 'Add Relevant Certifications',
                description: 'Include industry-relevant certifications or professional development courses.',
                impact: '+3 points'
            }
        ];
    }
    
    analyzeSections() {
        return [
            {
                name: 'Contact Information',
                score: 95,
                status: 'excellent',
                feedback: 'Complete contact information with professional email and LinkedIn profile.'
            },
            {
                name: 'Professional Summary',
                score: 70,
                status: 'good',
                feedback: 'Present but could be more compelling. Consider adding a value proposition.'
            },
            {
                name: 'Experience',
                score: 88,
                status: 'very-good',
                feedback: 'Strong experience section with good progression. Add more quantified results.'
            },
            {
                name: 'Skills',
                score: 85,
                status: 'very-good',
                feedback: 'Comprehensive skills list. Consider organizing by categories.'
            },
            {
                name: 'Education',
                score: 90,
                status: 'excellent',
                feedback: 'Clear and well-formatted education section.'
            }
        ];
    }
    
    generateATSReport() {
        return [
            {
                category: 'File Format',
                status: 'pass',
                description: 'PDF format is ATS-friendly and maintains formatting.'
            },
            {
                category: 'Font and Formatting',
                status: 'pass',
                description: 'Standard fonts used with consistent formatting.'
            },
            {
                category: 'Section Headers',
                status: 'pass',
                description: 'Clear, standard section headers are used throughout.'
            },
            {
                category: 'Keywords',
                status: 'warning',
                description: 'Good keyword coverage, but missing some important industry terms.'
            },
            {
                category: 'Graphics and Images',
                status: 'pass',
                description: 'No graphics or images that could confuse ATS systems.'
            },
            {
                category: 'Tables and Columns',
                status: 'pass',
                description: 'Simple layout without complex tables or multiple columns.'
            }
        ];
    }
    
    displayResults() {
        const resultsSection = document.getElementById('analysisResults');
        resultsSection.classList.remove('hidden');
        
        // Populate all result sections
        this.populateOverviewTab();
        this.populateKeywordsTab();
        this.populateStructureTab();
        this.populateATSTab();
        this.populateImprovementsTab();
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    populateOverviewTab() {
        const strengthsList = document.getElementById('strengthsList');
        const improvementsList = document.getElementById('improvementsList');
        
        strengthsList.innerHTML = this.analysisData.strengths.map(strength => 
            `<li class=\"flex items-start space-x-2\">
                <i class=\"fas fa-check text-green-400 mt-1 text-sm\"></i>
                <span class=\"text-gray-300\">${strength}</span>
            </li>`
        ).join('');
        
        improvementsList.innerHTML = this.analysisData.improvements.map(improvement => 
            `<li class=\"flex items-start space-x-2\">
                <i class=\"fas fa-arrow-up text-orange-400 mt-1 text-sm\"></i>
                <span class=\"text-gray-300\">${improvement}</span>
            </li>`
        ).join('');
    }
    
    populateKeywordsTab() {
        const foundKeywords = document.getElementById('foundKeywords');
        const missingKeywords = document.getElementById('missingKeywords');
        
        foundKeywords.innerHTML = this.analysisData.foundKeywords.map(keyword => 
            `<span class="keyword-tag keyword-found">${keyword}</span>`

        ).join('');
        
        missingKeywords.innerHTML = this.analysisData.missingKeywords.map(keyword => 
        `<span class="keyword-tag keyword-found">${keyword}</span>`

        ).join('');
    }
    
    populateStructureTab() {
        const sectionAnalysis = document.getElementById('sectionAnalysis');
        
        sectionAnalysis.innerHTML = this.analysisData.sectionAnalysis.map(section => 
            `<div class=\"flex items-center justify-between p-4 bg-slate-700/30 rounded-lg\">
                <div class=\"flex items-center space-x-3\">
                    <div class=\"w-3 h-3 rounded-full ${this.getStatusColor(section.status)}\"></div>
                    <div>
                        <h4 class=\"font-medium\">${section.name}</h4>
                        <p class=\"text-sm text-gray-400\">${section.feedback}</p>
                    </div>
                </div>
                <div class=\"text-right\">
                    <div class=\"text-lg font-bold ${this.getScoreColor(section.score)}\">${section.score}</div>
                    <div class=\"text-xs text-gray-400\">Score</div>
                </div>
            </div>`
        ).join('');
    }
    
    populateATSTab() {
        const atsReport = document.getElementById('atsReport');
        
        atsReport.innerHTML = this.analysisData.atsReport.map(item => 
            `<div class=\"flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg\">
                <div class=\"flex-shrink-0\">
                    <i class=\"fas ${item.status === 'pass' ? 'fa-check-circle text-green-400' : 'fa-exclamation-triangle text-yellow-400'} text-xl\"></i>
                </div>
                <div>
                    <h4 class=\"font-medium\">${item.category}</h4>
                    <p class=\"text-sm text-gray-400\">${item.description}</p>
                </div>
            </div>`
        ).join('');
    }
    
    populateImprovementsTab() {
        const recommendations = document.getElementById('recommendations');
        
        recommendations.innerHTML = this.analysisData.recommendations.map(rec => 
            `<div class=\"recommendation-card priority-${rec.type}\">
                <div class=\"flex items-start justify-between mb-3\">
                    <h4 class=\"font-semibold text-lg\">${rec.title}</h4>
                    <span class=\"px-3 py-1 rounded-full text-xs font-medium ${this.getPriorityClass(rec.type)}\">${rec.type.toUpperCase()}</span>
                </div>
                <p class=\"text-gray-300 mb-3\">${rec.description}</p>
                <div class=\"flex items-center justify-between\">
                    <span class=\"text-cyan-400 font-medium\">Potential Impact: ${rec.impact}</span>
                    <button class=\"text-sm text-purple-400 hover:text-purple-300 transition-colors\">
                        <i class=\"fasfa-arrow-right mr-1\"></i>Apply Fix
                    </button>
                </div>
            </div>`
        ).join('');
    }
    
    getStatusColor(status) {
        const colors = {
            excellent: 'bg-green-400',
            'very-good': 'bg-blue-400',
            good: 'bg-yellow-400',
            poor: 'bg-red-400'
        };
        return colors[status] || 'bg-gray-400';
    }
    
    getScoreColor(score) {
        if (score >= 85) return 'text-green-400';
        if (score >= 70) return 'text-blue-400';
        if (score >= 60) return 'text-yellow-400';
        return 'text-red-400';
    }
    
    getPriorityClass(priority) {
        const classes = {
            high: 'bg-red-900/30 text-red-400 border border-red-400/30',
            medium: 'bg-yellow-900/30 text-yellow-400 border border-yellow-400/30',
            low: 'bg-green-900/30 text-green-400 border border-green-400/30'
        };
        return classes[priority] || '';
    }
    
    initializeChart() {
        const canvas = document.getElementById('scoreChart');
        const ctx = canvas.getContext('2d');
        
        this.scoreChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [0, 100],
                    backgroundColor: [
                        'rgba(6, 182, 212, 0.8)',
                        'rgba(71, 85, 105, 0.3)'
                    ],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        });
    }
    
    updateScoreChart(score) {
        if (this.scoreChart) {
            this.scoreChart.data.datasets[0].data = [score, 100 - score];
            this.scoreChart.update('active');
        }
    }
    
    setupTabSystem() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                
                // Update button states
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update content visibility
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.dataset.tab === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }
    
    createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);
        
        setInterval(() => {
            if (document.querySelectorAll('.particle').length < 20) {
                this.createParticle(particlesContainer);
            }
        }, 3000);
    }
    
    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 20000);
    }
    
    startAIInsightsRotation() {
        const insights = [
            '🧠 AI analyzing resume structure and content quality...',
            '🔍 Scanning for industry-specific keywords and phrases...',
            '📊 Evaluating ATS compatibility and readability scores...',
            '💡 Generating personalized improvement recommendations...',
            '🚀 Ready to boost your resume to the next level!'
        ];
        
        let currentIndex = 0;
        const insightsElement = document.getElementById('aiInsights');
        
        setInterval(() => {
            if (!this.isAnalyzing && !this.analysisData) {
                insightsElement.innerHTML = `
                    <div class=\"text-sm text-gray-300 italic animate-pulse\">
                        ${insights[currentIndex]}
                    </div>
                `;
                currentIndex = (currentIndex + 1) % insights.length;
            }
        }, 3000);
    }
    
    updateAIInsights() {
        if (!this.currentIndustry) return;
        
        const insightsElement = document.getElementById('aiInsights');
        const industryInsights = {
            tech: [
                '💻 Focus on technical skills and programming languages',
                '🔧 Highlight experience with modern development tools',
                '☁ Emphasize cloud computing and DevOps experience'
            ],
            finance: [
                '📈 Showcase analytical and quantitative skills',
                '💰 Highlight experience with financial software',
                '📊 Emphasize risk management and compliance knowledge'
            ],
            healthcare: [
                '🏥 Focus on patient care and clinical experience',
                '📋 Highlight knowledge of medical regulations',
                '💊 Emphasize healthcare technology proficiency'
            ]
        };
        
        const insights = industryInsights[this.currentIndustry] || industryInsights.tech;
        
        insightsElement.innerHTML = insights.map(insight => 
            `<div class="\text-sm text-gray-300 mb-2\">${insight}</div>`
        ).join('');
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full';

        const colors = {
            success: 'bg-green-600 text-white',
            error: 'bg-red-600 text-white',
            info: 'bg-blue-600 text-white',
            warning: 'bg-yellow-600 text-black'
        };
        
        notification.classList.add(...colors[type].split(' '));
        notification.innerHTML = `
            <div class=\"flex items-center space-x-2\">
                <i class=\"fas ${this.getNotificationIcon(type)}\"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };
        return icons[type] || 'fa-info-circle';
    }
    
    identifySections(content) {
        const sections = {};
        const lines = content.split('\n');
        let currentSection = null;
        
        lines.forEach(line => {
            const trimmed = line.trim().toLowerCase();
            if (trimmed.includes('experience') || trimmed.includes('work')) {
                currentSection = 'experience';
                sections[currentSection] = [];
            } else if (trimmed.includes('education')) {
                currentSection = 'education';
                sections[currentSection] = [];
            } else if (trimmed.includes('skills')) {
                currentSection = 'skills';
                sections[currentSection] = [];
            } else if (currentSection && line.trim()) {
                sections[currentSection].push(line.trim());
            }
        });
        
        return sections;
    }
    
    extractKeywords(content) {
        const words = content.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 2);
        
        const frequency = {};
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });
        
        return Object.keys(frequency)
            .sort((a, b) => frequency[b] - frequency[a])
            .slice(0, 50);
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResumeAnalyzer();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe feature cards for animation
    document.querySelectorAll('.feature-card, .recommendation-card').forEach(card => {
        observer.observe(card);
    });
});