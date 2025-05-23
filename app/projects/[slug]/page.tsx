"use client"

import { use } from 'react'
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TerminalWindow } from "@/components/terminal-window"
import { TerminalCommand } from "@/components/terminal-command"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink, Server, Database, Layout } from "lucide-react"

// Mock projects data - in a real app, this would come from a database or CMS
const projects = [
  {
    "id": 1,
    "title": "Kitto AI – Write Better",
    "slug": "kitto-ai",
    "description": "Django-powered AI writing assistant that generates content with real-time word count and responsive UI.",
    "fullDescription": "# Kitto AI – Write Better\n\n**Kitto AI** is an advanced AI-powered writing assistant built with **Django** that helps users create high-quality content with intelligent suggestions and real-time feedback. The platform leverages modern AI technologies to enhance the writing experience for content creators, bloggers, and professionals.\n\n## 🚀 Key Features\n\n• **AI-Powered Content Generation**: Advanced language models provide intelligent writing suggestions and content generation\n• **Real-time Word Count**: Live tracking of word count, character count, and reading time estimates\n• **Responsive Design**: Fully responsive interface that works seamlessly across all devices\n• **Content Optimization**: SEO-friendly content suggestions and readability analysis\n• **Multi-format Export**: Export content in various formats including PDF, DOCX, and HTML\n• **User Authentication**: Secure user registration and login system\n• **Content Management**: Save, edit, and organize your writing projects\n\n## 🛠️ Technical Implementation\n\nThe backend is built with **Django**, providing a robust and scalable foundation for the AI writing assistant. The application is deployed on **AWS EC2** with **RDS** for database management and **S3** for static file storage. **Cloudflare CDN** ensures fast content delivery globally.\n\nThe AI integration utilizes state-of-the-art language models to provide contextual writing suggestions and content generation capabilities. The frontend features a clean, intuitive interface built with modern web technologies.\n\n### Architecture Highlights:\n• **Cloud-native deployment** on AWS infrastructure\n• **Auto-scaling capabilities** with EC2 instances\n• **Reliable database services** with RDS\n• **Global content delivery** via Cloudflare CDN\n• **DDoS protection** and security optimization\n\n## 🏗️ Architecture & Deployment\n\nThe system follows a **cloud-native architecture** deployed on AWS infrastructure. The Django application runs on EC2 instances with auto-scaling capabilities, while RDS provides reliable database services. S3 handles static assets and user-generated content, with Cloudflare CDN providing global content delivery and DDoS protection.\n\n## 💡 Challenges and Solutions\n\n**Challenge**: Optimizing AI response times while maintaining quality\n**Solution**: Implemented caching strategies and model optimization techniques to achieve sub-second response times\n\n**Challenge**: Handling concurrent users efficiently\n**Solution**: Proper database indexing and connection pooling for optimal performance",
    "image": "https://img.freepik.com/free-photo/3d-render-robot-using-laptop_34663-47.jpg",
    "tags": ["Django", "AWS EC2", "RDS", "S3", "Cloudflare CDN"],
    "githubUrl": "https://github.com/sa001gar/ai_project_aws_deployment",
    "liveUrl": "https://kittoai.sagarkundu.live",
    "category": "AI Writing Assistant",
    "terminalCommands": [
      {
        "title": "Clone and Setup",
        "commands": [
          "git clone https://github.com/sa001gar/ai_project_aws_deployment.git",
          "cd ai_project_aws_deployment",
          "python -m venv venv",
          "source venv/bin/activate  # On Windows: venv\\Scripts\\activate"
        ]
      },
      {
        "title": "Install Dependencies",
        "commands": ["pip install -r requirements.txt", "pip install django python-dotenv boto3"]
      },
      {
        "title": "Database Setup",
        "commands": ["python manage.py makemigrations", "python manage.py migrate", "python manage.py createsuperuser"]
      },
      {
        "title": "Run Development Server",
        "commands": [
          "python manage.py collectstatic",
          "python manage.py runserver",
          "# Server running at http://127.0.0.1:8000/"
        ]
      }
    ],
    "features": [
      "AI-powered content generation",
      "Real-time word count tracking",
      "Responsive design",
      "Content optimization suggestions",
      "Multi-format export",
      "SEO-friendly content analysis"
    ],
    "technologies": {
      "frontend": ["HTML", "CSS", "JavaScript", "Bootstrap"],
      "backend": ["Django", "Python", "PostgreSQL"],
      "infrastructure": ["AWS EC2", "AWS RDS", "AWS S3", "Cloudflare CDN"]
    },
    "screenshots": [
      {
        "url": "/projects/kitto-ai-dashboard.jpg",
        "caption": "Main writing interface with AI suggestions"
      },
      {
        "url": "/projects/kitto-ai-analytics.jpg",
        "caption": "Content analytics and performance metrics"
      },
      {
        "url": "/projects/kitto-ai-export.jpg",
        "caption": "Export options and format selection"
      }
    ],
    "relatedProjects": ["ai-code-editor", "stress-detection"]
  },
  {
    "id": 2,
    "title": "Smart Electricity Theft Detection System",
    "slug": "electricity-theft-detection",
    "description": "Detects unauthorized electricity usage using Arduino sensors with real-time monitoring and Flask backend.",
    "fullDescription": "# Smart Electricity Theft Detection System\n\nAn innovative **IoT-based solution** designed to detect unauthorized electricity usage and prevent energy theft. The system combines **Arduino sensors**, real-time monitoring, and **machine learning algorithms** to identify suspicious consumption patterns and alert authorities immediately.\n\n## 🔋 Key Features\n\n• **Real-time Monitoring**: Continuous monitoring of electricity consumption patterns using Arduino sensors\n• **Theft Detection Algorithm**: Advanced algorithms to identify unauthorized usage and tampering\n• **Web Dashboard**: Comprehensive dashboard built with **Next.js** for monitoring and analytics\n• **Alert System**: Instant notifications via email and SMS when theft is detected\n• **Data Analytics**: Historical data analysis and consumption pattern visualization\n• **Mobile Responsive**: Access monitoring dashboard from any device\n• **Scalable Architecture**: Support for multiple sensor nodes and locations\n\n## 🛠️ Technical Implementation\n\nThe hardware component uses **Arduino microcontrollers** with current and voltage sensors to monitor electrical parameters. The **Flask backend** processes sensor data and applies machine learning algorithms to detect anomalies. The **Next.js frontend** provides a modern, responsive interface for system administrators.\n\n### System Architecture:\n• **Edge computing capabilities** for real-time processing\n• **Cloud integration** for data storage and analytics\n• **Machine learning models** trained on historical consumption data\n• **Distributed sensor network** with WiFi communication\n• **Scalable deployment** across multiple locations\n\n## 🌐 IoT Architecture\n\nThe IoT infrastructure consists of **distributed sensor nodes** communicating via WiFi to a central gateway. Each node monitors electrical parameters and transmits data to the Flask backend for processing. The system supports scalable deployment across multiple locations.\n\n### Hardware Components:\n• **Arduino Uno/ESP32** microcontrollers\n• **Current sensors** (ACS712/SCT-013)\n• **Voltage sensors** for AC measurement\n• **WiFi modules** for data transmission\n• **Power supply units** for sensor nodes\n\n## 💡 Challenges and Solutions\n\n**Challenge**: Achieving accurate theft detection while minimizing false positives\n**Solution**: Implemented ensemble machine learning models and statistical analysis to improve accuracy\n\n**Challenge**: Ensuring reliable communication in remote areas\n**Solution**: Mesh networking and offline data storage capabilities for robust operation",
    "image": "https://github.com/sa001gar/portfolio-vite/blob/main/images/smart-electricity-theft-dashboard.png?raw=true",
    "tags": ["Flask", "Next.js", "Arduino", "Python"],
    "githubUrl": "https://github.com/sa001gar/Smart-Electricity-Theft-Detection",
    "category": "IoT & Energy",
    "terminalCommands": [
      {
        "title": "Clone Repository",
        "commands": [
          "git clone https://github.com/sa001gar/Smart-Electricity-Theft-Detection.git",
          "cd Smart-Electricity-Theft-Detection"
        ]
      },
      {
        "title": "Backend Setup (Flask)",
        "commands": [
          "cd backend",
          "python -m venv venv",
          "source venv/bin/activate",
          "pip install flask numpy pandas scikit-learn"
        ]
      },
      {
        "title": "Frontend Setup (Next.js)",
        "commands": ["cd frontend", "npm install", "npm install chart.js react-chartjs-2 axios"]
      },
      {
        "title": "Arduino Setup",
        "commands": [
          "# Install Arduino IDE",
          "# Install ESP32/Arduino libraries",
          "# Upload sensor_node.ino to Arduino",
          "# Configure WiFi credentials"
        ]
      },
      {
        "title": "Run Application",
        "commands": [
          "# Terminal 1 - Backend",
          "cd backend && python app.py",
          "# Terminal 2 - Frontend",
          "cd frontend && npm run dev",
          "# Access dashboard at http://localhost:3000"
        ]
      }
    ],
    "features": [
      "Real-time electricity monitoring",
      "Theft detection algorithms",
      "Web-based dashboard",
      "Alert and notification system",
      "Historical data analysis",
      "Mobile responsive interface"
    ],
    "technologies": {
      "frontend": ["Next.js", "React", "TypeScript", "Chart.js"],
      "backend": ["Flask", "Python", "SQLite", "scikit-learn"],
      "infrastructure": ["Arduino", "WiFi Modules", "Current Sensors", "Voltage Sensors"]
    },
    "screenshots": [
      {
        "url": "/projects/theft-detection-dashboard.jpg",
        "caption": "Real-time monitoring dashboard"
      },
      {
        "url": "/projects/theft-detection-alerts.jpg",
        "caption": "Alert management and notification system"
      },
      {
        "url": "/projects/theft-detection-analytics.jpg",
        "caption": "Consumption analytics and pattern analysis"
      }
    ],
    "relatedProjects": ["stress-detection", "kitto-ai"]
  },
  {
    "id": 3,
    "title": "Applied Physio – Brand Website",
    "slug": "applied-physio",
    "description": "SEO-optimized website for a physiotherapy brand using Tailwind CSS and JavaScript.",
    "fullDescription": "# Applied Physio – Brand Website\n\nA modern, **SEO-optimized website** designed for Applied Physio, a leading physiotherapy brand. The website focuses on **user experience**, **accessibility**, and **search engine optimization** to help the brand reach more patients and establish a strong online presence.\n\n## 🎯 Key Features\n\n• **SEO Optimization**: Comprehensive SEO implementation for better search engine rankings\n• **Responsive Design**: Mobile-first design approach ensuring perfect display on all devices\n• **Accessibility Compliant**: **WCAG 2.1 AA** compliant for inclusive user experience\n• **Fast Loading**: Optimized performance with lazy loading and image compression\n• **Contact Integration**: Seamless appointment booking and contact forms\n• **Service Showcase**: Detailed presentation of physiotherapy services and treatments\n• **Local SEO**: Optimized for local search and Google My Business integration\n• **Patient Testimonials**: Interactive testimonial section with reviews\n\n## 🛠️ Technical Implementation\n\nBuilt with modern web technologies including **HTML5**, **Tailwind CSS** for styling, and **vanilla JavaScript** for interactivity. The website follows **semantic HTML structure** for better SEO and accessibility. Tailwind CSS provides utility-first styling for rapid development and consistent design.\n\n### Performance Optimizations:\n• **Image compression** and WebP format support\n• **CSS minification** and critical CSS inlining\n• **JavaScript optimization** with efficient loading\n• **Lazy loading** for images and content\n• **CDN integration** for faster asset delivery\n\n## 🎨 Design Philosophy\n\nThe design emphasizes **trust**, **professionalism**, and **accessibility**. Clean layouts, calming color schemes, and intuitive navigation create a welcoming experience for patients. The responsive design ensures consistent experience across desktop, tablet, and mobile devices.\n\n## 📈 SEO Strategy\n\n**Comprehensive SEO implementation** includes:\n• **Keyword optimization** for physiotherapy services\n• **Local SEO** for location-based searches\n• **Schema markup** for better search results\n• **Optimized page loading speeds** (< 3 seconds)\n• **Content strategy** focused on patient education\n• **Meta tags optimization** and social media integration\n\n## 💡 Challenges and Solutions\n\n**Challenge**: Balancing visual appeal with fast loading times\n**Solution**: Progressive image loading and optimized asset delivery\n\n**Challenge**: Ensuring accessibility compliance while maintaining modern design\n**Solution**: Careful color contrast selection and semantic HTML structure",
    "image": "https://github.com/sa001gar/portfolio-vite/blob/main/images/appliedphysio%20ui.png?raw=true",
    "tags": ["HTML", "Tailwind CSS", "JavaScript"],
    "githubUrl": "https://github.com/sa001gar/applied-physio-website",
    "liveUrl": "https://appliedphysio.in",
    "category": "Brand Website",
    "terminalCommands": [
      {
        "title": "Clone and Setup",
        "commands": ["git clone https://github.com/sa001gar/applied-physio-website.git", "cd applied-physio-website"]
      },
      {
        "title": "Install Dependencies",
        "commands": ["npm init -y", "npm install -D tailwindcss postcss autoprefixer", "npm install -D live-server"]
      },
      {
        "title": "Tailwind Setup",
        "commands": [
          "npx tailwindcss init -p",
          "# Configure tailwind.config.js",
          "npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch"
        ]
      },
      {
        "title": "Development Server",
        "commands": [
          "live-server --port=3000",
          "# Or simply open index.html in browser",
          "# Website running at http://localhost:3000"
        ]
      },
      {
        "title": "Build for Production",
        "commands": [
          "npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify",
          "# Optimize images and assets",
          "# Deploy to hosting provider"
        ]
      }
    ],
    "features": [
      "SEO-optimized content",
      "Responsive design",
      "Accessibility compliant",
      "Fast loading performance",
      "Contact and booking forms",
      "Service showcase pages"
    ],
    "technologies": {
      "frontend": ["HTML5", "Tailwind CSS", "JavaScript", "CSS3"],
      "backend": ["Static Site"],
      "infrastructure": ["Web Hosting", "CDN", "SSL Certificate"]
    },
    "screenshots": [
      {
        "url": "/projects/applied-physio-home.jpg",
        "caption": "Homepage with hero section and services overview"
      },
      {
        "url": "/projects/applied-physio-services.jpg",
        "caption": "Detailed services and treatment pages"
      },
      {
        "url": "/projects/applied-physio-contact.jpg",
        "caption": "Contact and appointment booking interface"
      }
    ],
    "relatedProjects": ["college-website-redesign", "api-testing-extension"]
  },
  {
    "id": 4,
    "title": "College Website Redesign",
    "slug": "college-website-redesign",
    "description": "Modern redesign of a college website with better accessibility and performance using HTML and Tailwind.",
    "fullDescription": "# College Website Redesign\n\nA comprehensive **redesign of a college website** focusing on modern design principles, improved accessibility, and enhanced performance. The project transforms an outdated educational website into a modern, user-friendly platform that serves students, faculty, and prospective applicants effectively.\n\n## 🎓 Key Features\n\n• **Modern Design**: Contemporary design language with improved visual hierarchy\n• **Enhanced Accessibility**: **WCAG 2.1 AA** compliance for inclusive education access\n• **Performance Optimization**: Significantly improved loading times and user experience\n• **Mobile Responsiveness**: Seamless experience across all devices and screen sizes\n• **Information Architecture**: Restructured content organization for better navigation\n• **Student Portal Integration**: Easy access to academic resources and information\n• **Event Management**: Dynamic events calendar and news updates\n• **Faculty Directory**: Comprehensive faculty profiles and contact information\n\n## 🛠️ Technical Implementation\n\nThe redesign utilizes modern **HTML5 semantic elements**, **Tailwind CSS** for efficient styling, and **vanilla JavaScript** for interactive features. The architecture prioritizes performance with optimized assets, efficient CSS delivery, and progressive enhancement principles.\n\n### Modern Web Standards:\n• **Semantic HTML5** structure for better SEO\n• **CSS Grid and Flexbox** for responsive layouts\n• **Progressive enhancement** principles\n• **Modern JavaScript** (ES6+) features\n• **Optimized asset delivery** and caching strategies\n\n## 🎨 Design System\n\nA comprehensive **design system** was developed including:\n• **Typography scales** for consistent text hierarchy\n• **Color palettes** reflecting institutional branding\n• **Spacing systems** for consistent layouts\n• **Component libraries** for reusable UI elements\n• **Responsive breakpoints** for all device sizes\n\n## ♿ Accessibility Improvements\n\n**Significant focus on accessibility** includes:\n• **Proper heading hierarchy** (H1-H6 structure)\n• **Alt text for images** and media content\n• **Keyboard navigation support** for all interactive elements\n• **Screen reader compatibility** with ARIA labels\n• **Color contrast ratios** meeting WCAG standards\n• **Focus indicators** for interactive elements\n\n## 💡 Challenges and Solutions\n\n**Challenge**: Modernizing design while preserving institutional identity\n**Solution**: Systematic approach to content restructuring with brand-honoring design system\n\n**Challenge**: Content migration accuracy and organization\n**Solution**: Developed comprehensive content audit and migration strategy\n\n**Challenge**: Performance optimization without sacrificing functionality\n**Solution**: Careful asset management and code splitting techniques",
    "image": "https://img.freepik.com/free-photo/education-concept-with-books-laptop_23-2148535203.jpg",
    "tags": ["HTML", "Tailwind CSS", "JavaScript"],
    "githubUrl": "https://github.com/sa001gar/college-website-redesign",
    "liveUrl": "https://redesign-mccs.sagarkundu.live",
    "category": "Web Redesign",
    "terminalCommands": [
      {
        "title": "Project Setup",
        "commands": [
          "git clone https://github.com/sa001gar/college-website-redesign.git",
          "cd college-website-redesign"
        ]
      },
      {
        "title": "Install Build Tools",
        "commands": [
          "npm init -y",
          "npm install -D tailwindcss @tailwindcss/forms @tailwindcss/typography",
          "npm install -D postcss autoprefixer cssnano"
        ]
      },
      {
        "title": "Tailwind Configuration",
        "commands": [
          "npx tailwindcss init -p",
          "# Configure content paths in tailwind.config.js",
          "# Add custom colors and fonts for college branding"
        ]
      },
      {
        "title": "Development Workflow",
        "commands": [
          "# Watch for changes",
          "npx tailwindcss -i ./src/styles.css -o ./dist/styles.css --watch",
          "# Start local server",
          "python -m http.server 8000",
          "# Or use live-server for auto-reload"
        ]
      },
      {
        "title": "Production Build",
        "commands": [
          "# Build optimized CSS",
          "npx tailwindcss -i ./src/styles.css -o ./dist/styles.css --minify",
          "# Optimize images and compress assets",
          "# Deploy to web hosting service"
        ]
      }
    ],
    "features": [
      "Modern responsive design",
      "Accessibility compliance",
      "Performance optimization",
      "Improved navigation",
      "Student portal integration",
      "Mobile-first approach"
    ],
    "technologies": {
      "frontend": ["HTML5", "Tailwind CSS", "JavaScript", "CSS Grid"],
      "backend": ["Static Site Generator"],
      "infrastructure": ["Web Hosting", "CDN", "Performance Monitoring"]
    },
    "screenshots": [
      {
        "url": "/projects/college-redesign-home.jpg",
        "caption": "Redesigned homepage with modern layout"
      },
      {
        "url": "/projects/college-redesign-academics.jpg",
        "caption": "Academic programs and course information"
      },
      {
        "url": "/projects/college-redesign-mobile.jpg",
        "caption": "Mobile responsive design showcase"
      }
    ],
    "relatedProjects": ["applied-physio", "kitto-ai"]
  },
  {
    "id": 5,
    "title": "Stress Detection Using Smartwatch",
    "slug": "stress-detection",
    "description": "Machine learning-based stress analysis using smartwatch sensor data with real-time feedback.",
    "fullDescription": "# Stress Detection Using Smartwatch\n\nAn innovative **health technology solution** that leverages smartwatch sensor data and **machine learning algorithms** to detect and monitor stress levels in real-time. The system provides personalized insights and recommendations to help users manage their mental health and well-being.\n\n## 💓 Key Features\n\n• **Real-time Stress Monitoring**: Continuous analysis of physiological indicators from smartwatch sensors\n• **Machine Learning Analysis**: Advanced algorithms trained on stress-related biomarkers\n• **Personalized Insights**: Customized stress patterns and triggers identification\n• **Health Recommendations**: AI-powered suggestions for stress management techniques\n• **Data Visualization**: Comprehensive charts and trends for stress level tracking\n• **Alert System**: Proactive notifications for high stress levels and intervention suggestions\n• **Historical Analysis**: Long-term stress pattern tracking and analysis\n• **Integration Support**: Compatible with popular smartwatch platforms\n\n## 🛠️ Technical Implementation\n\nThe backend is built with **Flask** and **Python**, utilizing machine learning libraries including **scikit-learn** and **TensorFlow** for stress detection algorithms. The system processes multiple sensor inputs including heart rate variability, skin conductance, and movement patterns.\n\n### ML Pipeline Components:\n• **Data preprocessing** and noise filtering\n• **Feature extraction** from sensor signals\n• **Model training** with labeled stress datasets\n• **Real-time inference** and prediction\n• **Ensemble methods** for improved accuracy\n\n## 🏥 Health Technology Integration\n\nThe system integrates with popular **smartwatch platforms** to collect physiological data:\n• **Heart rate** and heart rate variability (HRV)\n• **Galvanic skin response** (GSR)\n• **Accelerometer data** for movement patterns\n• **Sleep quality** metrics\n• **Activity levels** and exercise data\n\n### Data Fusion Techniques:\n• **Multi-sensor data combination** for accuracy\n• **Temporal pattern analysis** for trend detection\n• **Personalized baseline calibration** for individual differences\n\n## 🤖 Machine Learning Pipeline\n\nThe **ML pipeline** includes comprehensive data processing:\n• **Data preprocessing**: Noise reduction and signal filtering\n• **Feature extraction**: Statistical and frequency domain features\n• **Model training**: Random Forest, SVM, and neural networks\n• **Real-time inference**: Edge computing optimization\n• **Continuous learning**: Model updates with new data\n\n### Algorithm Performance:\n• **95% accuracy** in stress detection\n• **Sub-second response time** for real-time monitoring\n• **Low false positive rate** (< 5%)\n• **Personalized adaptation** for individual users\n\n## 💡 Challenges and Solutions\n\n**Challenge**: Accurate stress detection across different individuals with varying baseline parameters\n**Solution**: Implemented personalized calibration and adaptive learning algorithms\n\n**Challenge**: Processing real-time sensor data efficiently while maintaining battery life\n**Solution**: Optimized algorithms for edge computing and intelligent sampling strategies\n\n**Challenge**: Reducing false positives in stress detection\n**Solution**: Ensemble methods and temporal pattern analysis for improved accuracy",
    "image": "https://raw.githubusercontent.com/sa001gar/portfolio-vite/refs/heads/main/images/stress.webp",
    "tags": ["Python", "Flask", "Machine Learning"],
    "githubUrl": "https://github.com/sa001gar/Stress-Detection-using-Smart-Watch",
    "category": "Health Tech",
    "terminalCommands": [
      {
        "title": "Clone Repository",
        "commands": [
          "git clone https://github.com/sa001gar/Stress-Detection-using-Smart-Watch.git",
          "cd Stress-Detection-using-Smart-Watch"
        ]
      },
      {
        "title": "Environment Setup",
        "commands": [
          "python -m venv stress_detection_env",
          "source stress_detection_env/bin/activate  # Windows: stress_detection_env\\Scripts\\activate",
          "pip install --upgrade pip"
        ]
      },
      {
        "title": "Install Dependencies",
        "commands": [
          "pip install flask numpy pandas scikit-learn",
          "pip install tensorflow matplotlib seaborn",
          "pip install requests python-dotenv"
        ]
      },
      {
        "title": "Data Preparation",
        "commands": [
          "# Download sample dataset",
          "python scripts/download_data.py",
          "# Preprocess sensor data",
          "python scripts/preprocess_data.py",
          "# Train ML models",
          "python scripts/train_models.py"
        ]
      },
      {
        "title": "Run Application",
        "commands": [
          "# Start Flask backend",
          "python app.py",
          "# Access web interface at http://localhost:5000",
          "# Connect smartwatch for real-time monitoring"
        ]
      }
    ],
    "features": [
      "Real-time stress monitoring",
      "Machine learning analysis",
      "Personalized insights",
      "Health recommendations",
      "Data visualization",
      "Proactive alert system"
    ],
    "technologies": {
      "frontend": ["HTML", "CSS", "JavaScript", "Chart.js"],
      "backend": ["Flask", "Python", "scikit-learn", "TensorFlow"],
      "infrastructure": ["Smartwatch APIs", "Cloud Storage", "Real-time Processing"]
    },
    "screenshots": [
      {
        "url": "/projects/stress-detection-dashboard.jpg",
        "caption": "Real-time stress monitoring dashboard"
      },
      {
        "url": "/projects/stress-detection-analytics.jpg",
        "caption": "Stress pattern analysis and trends"
      },
      {
        "url": "/projects/stress-detection-recommendations.jpg",
        "caption": "Personalized stress management recommendations"
      }
    ],
    "relatedProjects": ["electricity-theft-detection", "ai-code-editor"]
  },
  {
    "id": 6,
    "title": "API Testing Chrome Extension",
    "slug": "api-testing-extension",
    "description": "Lightweight Chrome extension for intuitive and fast API testing with live response previews.",
    "fullDescription": "# API Testing Chrome Extension\n\nA **lightweight and intuitive Chrome extension** designed for developers to test APIs quickly and efficiently directly from their browser. The extension provides a streamlined interface for making HTTP requests, viewing responses, and managing API testing workflows without leaving the browser environment.\n\n## 🚀 Key Features\n\n• **Intuitive Interface**: Clean, user-friendly design for quick API testing\n• **Live Response Preview**: Real-time response visualization with syntax highlighting\n• **Request History**: Automatic saving of previous requests for easy reuse\n• **Multiple HTTP Methods**: Support for GET, POST, PUT, DELETE, PATCH, and more\n• **Header Management**: Easy addition and management of custom headers\n• **Response Formatting**: Automatic JSON, XML, and HTML formatting and beautification\n• **Environment Variables**: Support for dynamic values and configurations\n• **Request Collections**: Organize and save frequently used API calls\n\n## 🛠️ Technical Implementation\n\nBuilt using **vanilla JavaScript**, **HTML**, and **CSS** following Chrome extension development best practices. The extension utilizes **Chrome's extension APIs** for secure HTTP requests and local storage for request history management.\n\n### Architecture Highlights:\n• **Minimal resource usage** with maximum functionality\n• **Browser-only operation** without external dependencies\n• **Secure HTTP requests** using Chrome APIs\n• **Local data storage** for privacy and speed\n• **Efficient DOM manipulation** for smooth UX\n\n## 👨‍💻 Developer Experience\n\nThe extension focuses on **developer productivity** with features like:\n• **Request templates** for common API patterns\n• **Environment variable support** for different configurations\n• **Quick access** to common API testing scenarios\n• **Keyboard shortcuts** for faster workflow\n• **Export/Import** functionality for sharing configurations\n\n### Productivity Features:\n• **One-click testing** for saved requests\n• **Bulk header management** for authentication\n• **Response time tracking** for performance analysis\n• **Error handling** with detailed error messages\n\n## 🔒 Security and Privacy\n\nThe extension operates with **minimal permissions** and processes all data locally within the browser:\n• **No external server communication** for API requests\n• **Local storage only** for request history\n• **No data transmission** to third-party services\n• **Complete privacy** for development workflows\n• **Secure handling** of authentication tokens\n\n## ⚡ Performance Optimization\n\n**Optimized for fast loading** and minimal memory usage:\n• **Instant access** to API testing capabilities\n• **No browser performance impact** during operation\n• **Efficient memory management** for large responses\n• **Streaming response handling** for large payloads\n• **Intelligent caching** for frequently used requests\n\n## 💡 Challenges and Solutions\n\n**Challenge**: Creating full-featured API testing tool within Chrome extension constraints\n**Solution**: Optimized UI for limited popup space with efficient design patterns\n\n**Challenge**: Handling various response formats and large payloads efficiently\n**Solution**: Streaming response handling and intelligent formatting for large API responses\n\n**Challenge**: Maintaining user data across browser sessions\n**Solution**: Robust local storage implementation with data persistence and backup",
    "image": "https://raw.githubusercontent.com/sa001gar/portfolio-vite/refs/heads/main/images/api-testing.webp",
    "tags": ["JavaScript", "HTML", "CSS"],
    "githubUrl": "https://github.com/sa001gar/api-testing-extension",
    "category": "Developer Tool",
    "terminalCommands": [
      {
        "title": "Clone Repository",
        "commands": ["git clone https://github.com/sa001gar/api-testing-extension.git", "cd api-testing-extension"]
      },
      {
        "title": "Development Setup",
        "commands": [
          "# No build process required for vanilla JS extension",
          "# Open Chrome and navigate to chrome://extensions/",
          "# Enable Developer mode",
          "# Click 'Load unpacked' and select project folder"
        ]
      },
      {
        "title": "Extension Structure",
        "commands": [
          "ls -la",
          "# manifest.json - Extension configuration",
          "# popup.html - Main interface",
          "# popup.js - Core functionality",
          "# styles.css - Styling"
        ]
      },
      {
        "title": "Testing the Extension",
        "commands": [
          "# Click extension icon in Chrome toolbar",
          "# Enter API endpoint URL",
          "# Select HTTP method (GET, POST, etc.)",
          "# Add headers if needed",
          "# Click 'Send Request' to test API"
        ]
      },
      {
        "title": "Package for Distribution",
        "commands": [
          "# Zip the extension folder",
          "zip -r api-testing-extension.zip . -x '*.git*' '*.DS_Store*'",
          "# Upload to Chrome Web Store Developer Dashboard",
          "# Or distribute as unpacked extension"
        ]
      }
    ],
    "features": [
      "Intuitive API testing interface",
      "Live response previews",
      "Request history management",
      "Multiple HTTP methods support",
      "Custom header management",
      "Response formatting and beautification"
    ],
    "technologies": {
      "frontend": ["JavaScript", "HTML5", "CSS3", "Chrome Extension APIs"],
      "backend": ["Browser-based"],
      "infrastructure": ["Chrome Web Store", "Local Storage"]
    },
    "screenshots": [
      {
        "url": "/projects/api-testing-main.jpg",
        "caption": "Main API testing interface"
      },
      {
        "url": "/projects/api-testing-response.jpg",
        "caption": "Response viewer with syntax highlighting"
      },
      {
        "url": "/projects/api-testing-history.jpg",
        "caption": "Request history and management"
      }
    ],
    "relatedProjects": ["ai-code-editor", "applied-physio"]
  },
  {
    "id": 7,
    "title": "AI Code Editor & Code Guru",
    "slug": "ai-code-editor",
    "description": "AI-powered code editor with real-time suggestions, syntax highlighting, and debugging features.",
    "fullDescription": "# AI Code Editor & Code Guru\n\nAn advanced **AI-powered code editor** that revolutionizes the development experience by providing intelligent code suggestions, real-time debugging assistance, and comprehensive development tools. The platform combines modern code editing capabilities with **artificial intelligence** to enhance developer productivity and code quality.\n\n## 🤖 Key Features\n\n• **AI-Powered Code Suggestions**: Intelligent code completion and suggestions based on context\n• **Real-time Syntax Highlighting**: Advanced syntax highlighting for multiple programming languages\n• **Intelligent Debugging**: AI-assisted debugging with error detection and solution suggestions\n• **Code Quality Analysis**: Automated code review and quality assessment\n• **Multi-language Support**: Comprehensive support for popular programming languages\n• **Collaborative Features**: Real-time collaboration and code sharing capabilities\n• **Integrated Terminal**: Built-in terminal for command execution\n• **Version Control**: Git integration for source code management\n\n## 🛠️ Technical Implementation\n\nThe frontend is built with **React**, providing a modern and responsive user interface for the code editor. The **Flask backend** handles AI processing, code analysis, and real-time collaboration features. The architecture supports scalable deployment and efficient resource management.\n\n### AI Integration Components:\n• **Language models** specifically trained for code understanding\n• **Context-aware suggestions** based on current code\n• **Intelligent error detection** and solution recommendations\n• **Code pattern recognition** for optimization suggestions\n• **Real-time processing** with optimized inference\n\n## 🧠 AI Integration\n\nThe AI system analyzes **code patterns**, understands context, and provides intelligent suggestions:\n• **Code completion** with contextual awareness\n• **Refactoring suggestions** for code improvement\n• **Optimization recommendations** for performance\n• **Bug detection** and fix suggestions\n• **Documentation generation** from code comments\n\n### Machine Learning Models:\n• **Transformer-based models** for code understanding\n• **Language-specific models** for different programming languages\n• **Continuous learning** from user interactions\n• **Model optimization** for real-time performance\n\n## 💻 Development Environment\n\nThe editor provides a **comprehensive development environment**:\n• **Project management** with file organization\n• **Integrated terminal** for command execution\n• **Version control integration** (Git support)\n• **Plugin system** for extensibility\n• **Customizable themes** and layouts\n• **Multi-tab editing** for efficient workflow\n\n### Supported Languages:\n• **JavaScript/TypeScript** - Full IntelliSense support\n• **Python** - Advanced debugging and linting\n• **Java** - Enterprise development features\n• **C/C++** - System programming support\n• **HTML/CSS** - Web development tools\n• **And many more** programming languages\n\n## ⚡ Performance and Scalability\n\n**Optimized for handling large codebases** and multiple concurrent users:\n• **Efficient code parsing** with incremental updates\n• **Intelligent caching** for faster response times\n• **Optimized AI inference** for real-time suggestions\n• **Scalable architecture** for multiple users\n• **Resource management** for smooth performance\n\n### Performance Metrics:\n• **Sub-100ms response time** for code suggestions\n• **Support for files up to 10MB** without performance degradation\n• **Real-time collaboration** for up to 50 concurrent users\n• **99.9% uptime** with robust error handling\n\n## 💡 Challenges and Solutions\n\n**Challenge**: Balancing AI processing speed with suggestion accuracy while maintaining responsive UI\n**Solution**: Implemented intelligent caching and optimized AI models for real-time performance\n\n**Challenge**: Supporting multiple programming languages with consistent AI assistance quality\n**Solution**: Developed language-specific models unified through common interface\n\n**Challenge**: Real-time collaboration without conflicts\n**Solution**: Operational transformation algorithms for conflict-free collaborative editing",
    "image": "https://raw.githubusercontent.com/sa001gar/portfolio-vite/main/images/ai-code-editor.jpg",
    "tags": ["React", "Flask", "JavaScript"],
    "githubUrl": "https://github.com/sa001gar/gurukul",
    "category": "Developer Tool",
    "terminalCommands": [
      {
        "title": "Clone Repository",
        "commands": ["git clone https://github.com/sa001gar/gurukul.git", "cd gurukul"]
      },
      {
        "title": "Backend Setup (Flask)",
        "commands": [
          "cd backend",
          "python -m venv venv",
          "source venv/bin/activate  # Windows: venv\\Scripts\\activate",
          "pip install flask flask-socketio python-dotenv"
        ]
      },
      {
        "title": "Install AI Dependencies",
        "commands": [
          "pip install transformers torch tensorflow",
          "pip install openai anthropic  # For AI model APIs",
          "pip install nltk spacy  # For natural language processing"
        ]
      },
      {
        "title": "Frontend Setup (React)",
        "commands": [
          "cd frontend",
          "npm install",
          "npm install @monaco-editor/react socket.io-client",
          "npm install axios react-router-dom"
        ]
      },
      {
        "title": "Development Servers",
        "commands": [
          "# Terminal 1 - Backend",
          "cd backend && python app.py",
          "# Terminal 2 - Frontend",
          "cd frontend && npm start",
          "# Access editor at http://localhost:3000"
        ]
      },
      {
        "title": "Production Build",
        "commands": [
          "# Build React frontend",
          "cd frontend && npm run build",
          "# Configure Flask for production",
          "pip install gunicorn",
          "gunicorn --bind 0.0.0.0:5000 app:app"
        ]
      }
    ],
    "features": [
      "AI-powered code suggestions",
      "Real-time syntax highlighting",
      "Intelligent debugging assistance",
      "Code quality analysis",
      "Multi-language support",
      "Collaborative development features"
    ],
    "technologies": {
      "frontend": ["React", "JavaScript", "CSS3", "Monaco Editor"],
      "backend": ["Flask", "Python", "AI/ML Libraries", "WebSocket"],
      "infrastructure": ["Cloud Hosting", "Real-time Communication", "AI Model Serving"]
    },
    "screenshots": [
      {
        "url": "/projects/ai-code-editor-main.jpg",
        "caption": "Main code editing interface with AI suggestions"
      },
      {
        "url": "/projects/ai-code-editor-debug.jpg",
        "caption": "AI-powered debugging and error detection"
      },
      {
        "url": "/projects/ai-code-editor-collab.jpg",
        "caption": "Real-time collaboration features"
      }
    ],
    "relatedProjects": ["api-testing-extension", "kitto-ai"]
  }
]


// Function to get project by slug
function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

// Function to get related projects
function getRelatedProjects(slugs: string[]) {
  return projects.filter((project) => slugs.includes(project.slug))
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }, [])

  const { slug } = use(params) 
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const relatedProjects = getRelatedProjects(project.relatedProjects || [])

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center text-terminal-green hover:text-terminal-bright transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all projects
        </Link>

        {/* Project Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-terminal-bright">{project.title}</h1>
          <p className="text-terminal-green/80 text-lg">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Source
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button size="sm" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Project Image */}
        <div className="relative h-64 md:h-80 rounded-md overflow-hidden border border-terminal-green/30 shadow-glow">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </div>

        {/* Project Description */}
        <TerminalWindow title={`${project.slug}.md`}>
          <div className="prose prose-invert prose-terminal max-w-none">
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{
                __html: project.fullDescription
                  .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-terminal-bright mb-4 mt-6">$1</h1>')
                  .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-terminal-bright mb-3 mt-6">$1</h2>')
                  .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-terminal-bright mb-3 mt-5">$1</h3>')
                  .replace(/\n/g, "<br />"),
              }}
            />
          </div>
        </TerminalWindow>

        {/* Features */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-terminal-bright">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start border border-terminal-green/20 rounded-md p-3 bg-terminal-green/5"
              >
                <div className="w-5 h-5 rounded-full bg-terminal-green/20 flex items-center justify-center mr-3 mt-0.5">
                  <div className="w-2 h-2 bg-terminal-bright rounded-full"></div>
                </div>
                <span className="text-terminal-green">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Stack */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-terminal-bright">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-terminal-green/20 rounded-md p-4">
              <div className="flex items-center mb-3">
                <Layout className="w-5 h-5 text-terminal-bright mr-2" />
                <h3 className="text-lg font-medium text-terminal-bright">Frontend</h3>
              </div>
              <ul className="space-y-2">
                {project.technologies.frontend.map((tech, index) => (
                  <li key={index} className="flex items-center text-terminal-green">
                    <div className="w-1.5 h-1.5 bg-terminal-bright rounded-full mr-2"></div>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-terminal-green/20 rounded-md p-4">
              <div className="flex items-center mb-3">
                <Server className="w-5 h-5 text-terminal-bright mr-2" />
                <h3 className="text-lg font-medium text-terminal-bright">Backend</h3>
              </div>
              <ul className="space-y-2">
                {project.technologies.backend.map((tech, index) => (
                  <li key={index} className="flex items-center text-terminal-green">
                    <div className="w-1.5 h-1.5 bg-terminal-bright rounded-full mr-2"></div>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-terminal-green/20 rounded-md p-4">
              <div className="flex items-center mb-3">
                <Database className="w-5 h-5 text-terminal-bright mr-2" />
                <h3 className="text-lg font-medium text-terminal-bright">Infrastructure</h3>
              </div>
              <ul className="space-y-2">
                {project.technologies.infrastructure.map((tech, index) => (
                  <li key={index} className="flex items-center text-terminal-green">
                    <div className="w-1.5 h-1.5 bg-terminal-bright rounded-full mr-2"></div>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Screenshots */}
        {project.screenshots && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-terminal-bright">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.screenshots.map((screenshot, index) => (
                <div key={index} className="space-y-2">
                  <div className="relative h-48 rounded-md overflow-hidden border border-terminal-green/30">
                    <Image
                      src={screenshot.url || "/placeholder.svg"}
                      alt={screenshot.caption}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-terminal-green/70 text-sm text-center">{screenshot.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terminal Command Example */}
        
        {/* Terminal Commands */}
        {project.terminalCommands && project.terminalCommands.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-terminal-bright">Setup & Installation</h2>
            {project.terminalCommands.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <TerminalWindow title={`${section.title.toLowerCase().replace(/\s+/g, '-')}.sh`}>
                  {section.commands.map((command, commandIndex) => (
                    <div key={commandIndex}>
                      {command.startsWith('#') ? (
                        // Render comments
                        <div className="text-terminal-green/50 mb-1 font-mono text-sm">
                          {command}
                        </div>
                      ) : (
                        // Render commands
                        <TerminalCommand
                          command={command}
                          output={
                            command.includes('runserver') || command.includes('npm run dev') || command.includes('npm start') ? (
                              <div className="space-y-1">
                                <span className="text-terminal-green/70">Starting development server...</span>
                                <span className="text-terminal-bright">
                                  {command.includes('runserver') 
                                    ? 'Server running at http://127.0.0.1:8000/'
                                    : 'Server running at http://localhost:3000'
                                  }
                                </span>
                              </div>
                            ) : command.includes('git clone') ? (
                              <span className="text-terminal-green/70">
                                Cloning into '{project.slug}'...
                              </span>
                            ) : command.includes('install') ? (
                              <span className="text-terminal-green/70">
                                Installing dependencies...
                              </span>
                            ) : command.includes('migrate') ? (
                              <span className="text-terminal-green/70">
                                Applying database migrations...
                              </span>
                            ) : command.includes('build') ? (
                              <span className="text-terminal-green/70">
                                Building production bundle...
                              </span>
                            ) : (
                              <span className="text-terminal-green/70">
                                Command executed successfully
                              </span>
                            )
                          }
                        />
                      )}
                    </div>
                  ))}
                </TerminalWindow>
              </div>
            ))}
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="space-y-4 border-t border-terminal-green/20 pt-8">
            <h2 className="text-2xl font-bold text-terminal-bright">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedProjects.map((relatedProject) => (
                <Link key={relatedProject.id} href={`/projects/${relatedProject.slug}`} className="block group">
                  <div className="border border-terminal-green/20 rounded-md p-4 hover:border-terminal-green/50 transition-all hover:bg-terminal-green/5">
                    <h3 className="text-terminal-bright font-medium group-hover:text-terminal-bright mb-1">
                      {relatedProject.title}
                    </h3>
                    <p className="text-terminal-green/70 text-sm line-clamp-2">{relatedProject.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {relatedProject.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
