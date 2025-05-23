# Portfolio Website with JSON Content Management

This portfolio website is designed to be easily customizable through a JSON data file. This allows you to update your content without having to modify the codebase directly.

## How to Update Content

All content is stored in the `data/portfolio-data.json` file. You can edit this file to update the information displayed on your portfolio website.

### Structure of the JSON File

The JSON file is organized into several sections:

1. **Meta**: Contains metadata about the website, such as the title and description.
2. **Personal**: Contains personal information like name, title, location, contact details, and social media links.
3. **About**: Contains information about yourself, including bio, professional focus, languages, and interests.
4. **Navigation**: Contains the navigation menu items.
5. **Experience**: Contains your work experience details.
6. **Credentials**: Contains your certifications, education, and skills.
7. **Technical Skills**: Contains your technical skills categorized by type.

### Updating Specific Sections

#### Personal Information

\`\`\`json
"personal": {
  "name": "Your Name",
  "title": "Your Title",
  "location": "Your Location",
  "avatar": "/path/to/your/avatar.png",
  "email": "your.email@example.com",
  "phone": "Your Phone Number",
  "workingHours": "Your Working Hours",
  "availableForWork": true,
  "badges": ["Badge 1", "Badge 2", "Badge 3"],
  "social": [
    {
      "platform": "GitHub",
      "url": "https://github.com/yourusername",
      "icon": "Github"
    },
    // Add more social links as needed
  ]
}
\`\`\`

#### About Information

\`\`\`json
"about": {
  "bio": "Your bio text here...",
  "focus": [
    "Focus point 1",
    "Focus point 2",
    "Focus point 3"
  ],
  "languages": [
    {
      "name": "Language Name",
      "proficiency": "Proficiency Level",
      "level": 100,
      "flag": "🏳️"
    },
    // Add more languages as needed
  ],
  "interests": [
    "Interest 1",
    "Interest 2",
    // Add more interests as needed
  ]
}
\`\`\`

#### Experience

\`\`\`json
"experience": [
  {
    "title": "Job Title",
    "company": "Company Name",
    "period": "Employment Period",
    "description": "Job description...",
    "achievements": [
      "Achievement 1",
      "Achievement 2",
      // Add more achievements as needed
    ],
    "technologies": ["Technology 1", "Technology 2"]
  },
  // Add more experiences as needed
]
\`\`\`

#### Credentials

\`\`\`json
"credentials": {
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuer Name",
      "date": "Issue Date",
      "logo": "/path/to/logo.png"
    },
    // Add more certifications as needed
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "Institution Name",
      "year": "Year Range",
      "logo": "/path/to/logo.png"
    },
    // Add more education entries as needed
  ],
  "skills": [
    "Skill 1",
    "Skill 2",
    // Add more skills as needed
  ]
}
\`\`\`

#### Technical Skills

\`\`\`json
"technicalSkills": {
  "design": [
    "Design Skill 1",
    "Design Skill 2",
    // Add more design skills as needed
  ],
  "development": [
    "Development Skill 1",
    "Development Skill 2",
    // Add more development skills as needed
  ],
  "uxMethods": [
    "UX Method 1",
    "UX Method 2",
    // Add more UX methods as needed
  ],
  "softSkills": [
    "Soft Skill 1",
    "Soft Skill 2",
    // Add more soft skills as needed
  ]
}
\`\`\`

## Adding Images

To add or update images:

1. Place your image files in the `public` directory.
2. Update the paths in the JSON file to point to your new images.

## Projects

Projects are managed separately in the `lib/projects.ts` file. You can update this file to add, remove, or modify projects.

## Development

To run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
\`\`\`

This refactoring allows users to update all content through the JSON file without modifying the codebase. The components now dynamically read from this data source, making content updates easier and more manageable.
\`\`\`



```ts file="lib/projects.ts"
[v0-no-op-code-block-prefix]export interface ProjectGalleryImage {
  url: string
  caption?: string
}

export interface RelatedProject {
  slug: string
  title: string
  category: string
  image: string
}

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  shortDescription: string
  description: string[]
  features: string[]
  technologies: string[]
  coverImage: string
  thumbnailImage: string
  gallery?: ProjectGalleryImage[]
  client?: string
  timeline: string
  role: string
  liveUrl?: string
  githubUrl?: string
  relatedProjects?: RelatedProject[]
}

const projects: Project[] = [
  {
    id: 1,
    slug: "job-finder-app",
    title: "Job Finder App",
    category: "Mobile App",
    shortDescription: "A modern job search application designed to connect job seekers with employers efficiently.",
    description: [
      "The Job Finder App is a comprehensive mobile application designed to streamline the job search process. It provides an intuitive interface for job seekers to discover opportunities that match their skills and preferences.",
      "The app features a smart matching algorithm that analyzes user profiles and job requirements to suggest the most relevant positions. Users can easily filter jobs by location, industry, experience level, and salary range.",
      "For employers, the platform offers tools to post job listings, review applications, and communicate with potential candidates directly through the app.",
    ],
    features: [
      "Personalized job recommendations based on user skills and preferences",
      "Real-time notifications for new job postings and application updates",
      "In-app messaging system for direct communication between employers and candidates",
      "Resume builder with templates and formatting tools",
      "Interview scheduling and calendar integration",
      "Detailed analytics for job seekers to track their application progress",
    ],
    technologies: ["React Native", "TypeScript", "Node.js", "Express", "MongoDB", "AWS", "Firebase"],
    coverImage: "/job-finder-cover.png",
    thumbnailImage: "/modern-finance-app.png",
    gallery: [
      { url: "/job-finder-screen1.png", caption: "Home Screen with Job Recommendations" },
      { url: "/job-finder-screen2.png", caption: "Job Detail View" },
      { url: "/job-finder-screen3.png", caption: "User Profile and Skills" },
      { url: "/job-finder-screen4.png", caption: "Application Tracking Dashboard" },
    ],
    timeline: "3 months (Q2 2023)",
    role: "Lead Product Designer",
    liveUrl: "https://example.com/job-finder",
    githubUrl: "https://github.com/example/job-finder",
    relatedProjects: [
      {
        slug: "finance-dashboard",
        title: "Finance Dashboard",
        category: "Web Application",
        image: "/modern-finance-overview.png",
      },
      {
        slug: "ecommerce-redesign",
        title: "E-Commerce Redesign",
        category: "UX Case Study",
        image: "/modern-apparel-storefront.png",
      },
    ],
  },
  {
    id: 2,
    slug: "finance-dashboard",
    title: "Finance Dashboard",
    category: "Web Application",
    shortDescription:
      "A comprehensive financial management dashboard for tracking investments, expenses, and financial goals.",
    description: [
      "The Finance Dashboard is a powerful web application designed to help users manage their personal finances in one centralized location. It provides real-time insights into spending patterns, investment performance, and progress toward financial goals.",
      "The dashboard features interactive charts and visualizations that make complex financial data easy to understand at a glance. Users can connect multiple accounts, categorize transactions automatically, and receive personalized recommendations to improve their financial health.",
      "The application was designed with a focus on security, using bank-level encryption and authentication protocols to protect sensitive financial information.",
    ],
    features: [
      "Account aggregation from multiple financial institutions",
      "Automated transaction categorization and tagging",
      "Budget creation and expense tracking",
      "Investment portfolio analysis and performance metrics",
      "Goal setting with progress tracking",
      "Customizable reports and data exports",
      "Financial insights and recommendations",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "Plaid API", "PostgreSQL", "Vercel"],
    coverImage: "/finance-dashboard-cover.png",
    thumbnailImage: "/modern-finance-overview.png",
    gallery: [
      { url: "/finance-dashboard-screen1.png", caption: "Main Dashboard Overview" },
      { url: "/finance-dashboard-screen2.png", caption: "Expense Analysis" },
      { url: "/finance-dashboard-screen3.png", caption: "Investment Portfolio" },
      { url: "/finance-dashboard-screen4.png", caption: "Financial Goals Tracker" },
    ],
    timeline: "4 months (Q3-Q4 2022)",
    role: "UX/UI Designer & Frontend Developer",
    liveUrl: "https://example.com/finance-dashboard",
    githubUrl: "https://github.com/example/finance-dashboard",
    relatedProjects: [
      {
        slug: "job-finder-app",
        title: "Job Finder App",
        category: "Mobile App",
        image: "/modern-finance-app.png",
      },
      {
        slug: "ecommerce-redesign",
        title: "E-Commerce Redesign",
        category: "UX Case Study",
        image: "/modern-apparel-storefront.png",
      },
    ],
  },
  {
    id: 3,
    slug: "ecommerce-redesign",
    title: "E-Commerce Redesign",
    category: "UX Case Study",
    shortDescription:
      "A complete redesign of an e-commerce platform focused on improving user experience and conversion rates.",
    description: [
      "This project involved a comprehensive redesign of an established e-commerce platform that was struggling with user engagement and conversion rates. The goal was to create a more intuitive, visually appealing shopping experience that would drive sales and customer satisfaction.",
      "The redesign process began with extensive user research, including interviews, surveys, and usability testing of the existing platform. This research revealed key pain points in the customer journey, such as a complicated checkout process and difficulty finding products.",
      "Based on these insights, I developed a new information architecture and user flow that simplified navigation and streamlined the purchase process. The visual design was updated with a clean, modern aesthetic that highlighted product imagery and created a consistent brand experience across all touchpoints.",
    ],
    features: [
      "Simplified product navigation and filtering system",
      "Redesigned product detail pages with enhanced imagery and information",
      "Streamlined checkout process reducing steps by 40%",
      "Personalized product recommendations based on browsing history",
      "Mobile-first responsive design",
      "Improved search functionality with predictive suggestions",
      "Enhanced wishlist and saved items functionality",
    ],
    technologies: ["Figma", "Adobe XD", "HTML/CSS", "JavaScript", "Shopify", "Hotjar", "Google Analytics"],
    coverImage: "/ecommerce-redesign-cover.png",
    thumbnailImage: "/modern-apparel-storefront.png",
    gallery: [
      { url: "/ecommerce-redesign-screen1.png", caption: "Homepage Design" },
      { url: "/ecommerce-redesign-screen2.png", caption: "Product Category Page" },
      { url: "/ecommerce-redesign-screen3.png", caption: "Product Detail Page" },
      { url: "/ecommerce-redesign-screen4.png", caption: "Checkout Process" },
    ],
    client: "Fashion Retailer Inc.",
    timeline: "6 months (Q1-Q2 2022)",
    role: "Lead UX Designer",
    liveUrl: "https://example.com/fashion-retailer",
    relatedProjects: [
      {
        slug: "job-finder-app",
        title: "Job Finder App",
        category: "Mobile App",
        image: "/modern-finance-app.png",
      },
      {
        slug: "finance-dashboard",
        title: "Finance Dashboard",
        category: "Web Application",
        image: "/modern-finance-overview.png",
      },
    ],
  },
]

export { projects }
