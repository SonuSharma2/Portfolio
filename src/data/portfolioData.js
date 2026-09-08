export const PORTFOLIO_DATA = {
  personal: {
    name: "SONU SHARMA",
    role: "QA ENGINEER & FULL-STACK TEST AUTOMATION ARCHITECT",
    tagline: "PRECISION TEST AUTOMATION & ROCK-SOLID SOFTWARE QUALITY",
    bio: [
      "I am a Computer Science graduate and Quality Assurance Engineer dedicated to delivering resilient, bug-free, and high-performance software systems.",
      "With hands-on expertise spanning modern web application testing, automation frameworks (Selenium, Playwright, Pytest), and API verification with Postman, I weave comprehensive test nets that catch defects before they ever reach production.",
      "From SaaS AI chatbot platforms like Chatboq to decentralized blockchain architectures, I bridge frontend UI validation with robust backend testing protocols."
    ],
    stats: [
      { label: "B.Sc (Hons) Computer Science", value: "3.46 GPA" },
      { label: "Automated Test Suites", value: "100%" },
      { label: "Bug Catch & Resolution", value: "99.4%" },
      { label: "Years in QA & Web Dev", value: "1+ Yrs" }
    ],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
    availableForHire: true,
    location: "Chabahil, Kathmandu, Nepal",
    email: "sonu.sharma0624@gmail.com",
    phone: "+977-986-047-6428",
    github: "https://github.com/SonuSharma2",
    education: [
      {
        degree: "Bachelor in Computer Science (Hons)",
        institution: "Sunway International Business School, IUKL",
        year: "2022",
        score: "3.46 GPA"
      },
      {
        degree: "+2 NEB Board",
        institution: "St. Lawrence College, Kathmandu",
        year: "2017",
        score: "66.4%"
      },
      {
        degree: "SLC NEB Board",
        institution: "Shubharambha Secondary School",
        year: "2015",
        score: "75%"
      }
    ],
    certifications: [
      "Python (Basic) Certificate — HackerRank",
      "Git & Version Control Workshop",
      "Robotics Workshop on Arduino"
    ],
    languages: ["English", "Nepali", "Hindi"],
    hobbies: ["Cricket", "Travel", "Cycling", "Mobile and PC Games"]
  },
  
  technologies: [
    { name: "Selenium (Python)", category: "automation", icon: "🧪" },
    { name: "Playwright Automation", category: "automation", icon: "🎭" },
    { name: "Pytest & POM Framework", category: "testing", icon: "🐍" },
    { name: "Postman API Testing", category: "api", icon: "🚀" },
    { name: "JMeter Performance", category: "performance", icon: "⚡" },
    { name: "Python / JavaScript", category: "languages", icon: "💻" },
    { name: "HTML & CSS / UI Validation", category: "frontend", icon: "🎨" },
    { name: "MySQL (CRUD Ops)", category: "database", icon: "🗄️" },
    { name: "ClickUp / Jira / Trello", category: "tools", icon: "📋" },
    { name: "Git & CI/CD Pipelines", category: "devops", icon: "🌿" },
    { name: "SDLC & Agile (Scrum)", category: "methodology", icon: "🔄" },
    { name: "Figma & Notion", category: "design", icon: "📐" }
  ],

  projects: [
    {
      id: "saucedemo-automation",
      title: "SAUCEDEMO TEST SUITE",
      subtitle: "End-to-End Test Automation Framework",
      description: "Automated end-to-end login and checkout workflows using Selenium with Python and Pytest. Architected modular Page Object Model (POM) structure for maximum maintainability and continuous test execution.",
      tags: ["Python", "Selenium", "Pytest", "Page Object Model", "Automated QA"],
      metrics: "100% automated critical path coverage",
      year: "2025",
      github: "https://github.com/SonuSharma2/SauceDemo-Automation",
      live: "https://github.com/SonuSharma2/SauceDemo-Automation",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      featured: true
    },
    {
      id: "chatboq-saas-qa",
      title: "CHATBOQ AI SAAS QA",
      subtitle: "AI Chatbot Platform Test System",
      description: "Comprehensive QA testing for a SaaS AI chatbot platform (inbox, ticketing, visitors, client billing, and AI conversational modules) with rigorous regression, UI/UX validation, and defect lifecycle tracking.",
      tags: ["Chatboq SaaS", "ClickUp", "API Testing", "Playwright", "Python", "Agile"],
      metrics: "Zero critical regressions in AI conversational flows",
      year: "2026",
      github: "https://chatboq.com/",
      live: "https://chatboq.com/",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      featured: true
    },
    {
      id: "blockchain-voting",
      title: "ETHEREUM VOTING SYSTEM",
      subtitle: "Decentralized Blockchain Platform",
      description: "A decentralized voting platform engineered on the Ethereum blockchain to eliminate tampering and enhance transparency. Validated through rigorous stress testing with 150 real participants.",
      tags: ["Ethereum", "Smart Contracts", "Security Testing", "Decentralized Systems"],
      metrics: "Successfully stress-tested with 150 active participants",
      year: "2022",
      github: "https://github.com/SonuSharma2",
      live: "https://github.com/SonuSharma2",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
      featured: true
    },
    {
      id: "image-steganography",
      title: "IMAGE STEGANOGRAPHY",
      subtitle: "Secure LSB Image Encryption",
      description: "Python Flask web application utilizing Least Significant Bit (LSB) encoding algorithms and Pillow (PIL) to seamlessly conceal confidential textual messages inside digital images without visual degradation.",
      tags: ["Python", "Flask", "Pillow (PIL)", "LSB Algorithm", "Cybersecurity"],
      metrics: "Zero perceptual image distortion with lossless message extraction",
      year: "2023",
      github: "https://github.com/SonuSharma2/ImageSteganography",
      live: "https://github.com/SonuSharma2/ImageSteganography",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      featured: true
    }
  ],

  experience: [
    {
      period: "DEC 2025 — JUNE 2026",
      role: "QA Trainee",
      company: "BRAHMABYTE LAB // KATHMANDU",
      description: "Executed QA on Chatboq, a SaaS AI chatbot platform. Wrote & executed test cases for inbox, tickets, billing, and AI modules. Reported bugs in ClickUp with reproducible steps, severity, and screenshots. Developed automation test scripts using Python, Playwright, and Selenium with POM frameworks.",
      skills: ["Selenium", "Playwright", "Python", "ClickUp", "API Testing", "POM Framework"]
    },
    {
      period: "NOV 2023 — FEB 2025",
      role: "Web & QA Assistant",
      company: "HEAL HOME CARE // KATHMANDU",
      description: "Tested responsive web platform and mobile application features, identifying and documenting functional & UI issues. Collaborated with developers to verify bug fixes before production release and maintained website usability improvements.",
      skills: ["Functional Testing", "UI/UX Verification", "ClickUp", "Regression Testing"]
    },
    {
      period: "AUG 2022 — SEP 2023",
      role: "Web Designer (WordPress)",
      company: "FREELANCER UNIT PVT. LTD. // KATHMANDU",
      description: "Developed and maintained responsive WordPress websites, conducted functionality checks, reviewed interface designs for feasibility, and refined system requirements directly with clients and developers.",
      skills: ["WordPress", "HTML/CSS", "UI Feasibility", "Client Collaboration"]
    }
  ]
};
