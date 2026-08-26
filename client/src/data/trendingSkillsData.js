export const SKILLS = [
  {
    id: 1,
    name: "Data Structures & Algorithms",
    category: "Core CS",
    demand: 98,
    trend: "up",
    companies: ["Google", "Amazon", "Microsoft", "Flipkart", "Adobe"],
    avgPackage: "18–44 LPA",
    difficulty: "Hard",
    timeToLearn: "3–6 months",
    resources: [
      {
        name: "Striver's A2Z DSA Sheet",
        url: "https://takeuforward.org/strivers-a2z-dsa-course",
      },
      { name: "LeetCode", url: "https://leetcode.com" },
      { name: "GeeksForGeeks", url: "https://geeksforgeeks.org" },
    ],
    description:
      "The #1 skill for cracking top product companies. Master arrays, trees, graphs, DP and recursion.",
    tags: ["Must Have", "Interview Critical"],
  },
  {
    id: 2,
    name: "React.js",
    category: "Frontend",
    demand: 91,
    trend: "up",
    companies: ["Flipkart", "Swiggy", "Razorpay", "Adobe", "Freshworks"],
    avgPackage: "10–32 LPA",
    difficulty: "Medium",
    timeToLearn: "1–2 months",
    resources: [
      { name: "React Docs (Official)", url: "https://react.dev" },
      { name: "Namaste React by Akshay Saini", url: "https://namastedev.com" },
    ],
    description:
      "Most in-demand frontend framework. Used in almost every startup and product company.",
    tags: ["Trending", "High Demand"],
  },
  {
    id: 3,
    name: "System Design",
    category: "Core CS",
    demand: 88,
    trend: "up",
    companies: ["Amazon", "Microsoft", "Uber", "LinkedIn", "PayPal"],
    avgPackage: "20–50 LPA",
    difficulty: "Hard",
    timeToLearn: "2–4 months",
    resources: [
      { name: "Grokking System Design", url: "https://designgurus.io" },
      {
        name: "System Design Primer (GitHub)",
        url: "https://github.com/donnemartin/system-design-primer",
      },
    ],
    description:
      "Critical for SDE-2+ and dream company rounds. Learn scalability, databases, caching, load balancing.",
    tags: ["Senior Roles", "Dream Companies"],
  },
  {
    id: 4,
    name: "SQL & Databases",
    category: "Backend",
    demand: 85,
    trend: "stable",
    companies: [
      "TCS",
      "Infosys",
      "Wipro",
      "Accenture",
      "Cognizant",
      "Deloitte",
    ],
    avgPackage: "6–18 LPA",
    difficulty: "Medium",
    timeToLearn: "3–4 weeks",
    resources: [
      { name: "SQLZoo", url: "https://sqlzoo.net" },
      { name: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial" },
    ],
    description:
      "Asked in almost every service-based company interview. Strong SQL skills set you apart.",
    tags: ["Must Have", "Mass Hiring"],
  },
  {
    id: 5,
    name: "Python",
    category: "Programming",
    demand: 83,
    trend: "up",
    companies: ["Google", "Amazon", "Deloitte", "EY", "Goldman Sachs"],
    avgPackage: "8–30 LPA",
    difficulty: "Easy",
    timeToLearn: "3–4 weeks",
    resources: [
      { name: "CS50P (Harvard Free)", url: "https://cs50.harvard.edu/python" },
      { name: "Python.org Docs", url: "https://docs.python.org/3/tutorial" },
    ],
    description:
      "Versatile language for scripting, automation, data science and backend. Easy to learn and powerful.",
    tags: ["Beginner Friendly", "Versatile"],
  },
  {
    id: 6,
    name: "Node.js & Express",
    category: "Backend",
    demand: 80,
    trend: "up",
    companies: ["Swiggy", "Razorpay", "Freshworks", "Postman", "Atlassian"],
    avgPackage: "10–28 LPA",
    difficulty: "Medium",
    timeToLearn: "1–2 months",
    resources: [
      { name: "Node.js Official Docs", url: "https://nodejs.org/docs" },
      { name: "The Odin Project", url: "https://theodinproject.com" },
    ],
    description:
      "Build REST APIs and server-side apps. Pairs perfectly with React for full-stack roles.",
    tags: ["Full Stack", "Startups"],
  },
  {
    id: 7,
    name: "Git & GitHub",
    category: "Tools",
    demand: 95,
    trend: "stable",
    companies: ["Every Company"],
    avgPackage: "Prerequisite",
    difficulty: "Easy",
    timeToLearn: "1–2 weeks",
    resources: [
      { name: "Pro Git Book (Free)", url: "https://git-scm.com/book/en/v2" },
      { name: "GitHub Skills", url: "https://skills.github.com" },
    ],
    description:
      "Non-negotiable for any developer role. Every interviewer checks your GitHub. Build projects and push them.",
    tags: ["Must Have", "Beginner Friendly"],
  },
  {
    id: 8,
    name: "Operating Systems",
    category: "Core CS",
    demand: 76,
    trend: "stable",
    companies: ["Microsoft", "Google", "Qualcomm", "Samsung", "Intel"],
    avgPackage: "15–40 LPA",
    difficulty: "Hard",
    timeToLearn: "1–2 months",
    resources: [
      { name: "GATE Overflow (OS Notes)", url: "https://gateoverflow.in" },
      { name: "Galvin Book PDF", url: "https://www.os-book.com" },
    ],
    description:
      "Core subject for interviews. Processes, threads, scheduling, memory management — all asked frequently.",
    tags: ["Core Subject", "Interview Critical"],
  },
  {
    id: 9,
    name: "Computer Networks",
    category: "Core CS",
    demand: 72,
    trend: "stable",
    companies: ["Cisco", "Infosys", "Wipro", "TCS", "HCL"],
    avgPackage: "6–15 LPA",
    difficulty: "Medium",
    timeToLearn: "3–4 weeks",
    resources: [
      {
        name: "Kurose & Ross Book",
        url: "https://gaia.cs.umass.edu/kurose_ross",
      },
      {
        name: "GeeksForGeeks CN",
        url: "https://geeksforgeeks.org/computer-network-tutorials",
      },
    ],
    description:
      "TCP/IP, OSI model, HTTP, DNS — essential for service-based and network-focused companies.",
    tags: ["Core Subject", "Service Based"],
  },
  {
    id: 10,
    name: "Machine Learning Basics",
    category: "AI/ML",
    demand: 70,
    trend: "up",
    companies: ["Google", "Amazon", "Fractal", "Tiger Analytics", "Mu Sigma"],
    avgPackage: "12–35 LPA",
    difficulty: "Hard",
    timeToLearn: "3–5 months",
    resources: [
      {
        name: "Andrew Ng ML Course (Coursera)",
        url: "https://coursera.org/specializations/machine-learning-introduction",
      },
      { name: "fast.ai", url: "https://fast.ai" },
    ],
    description:
      "Growing demand in product companies. Learn regression, classification, and model evaluation basics.",
    tags: ["High Growth", "Future Skill"],
  },
  {
    id: 11,
    name: "Docker & Basics of DevOps",
    category: "DevOps",
    demand: 65,
    trend: "up",
    companies: ["Amazon", "Atlassian", "Razorpay", "PhonePe", "Zomato"],
    avgPackage: "14–30 LPA",
    difficulty: "Medium",
    timeToLearn: "3–5 weeks",
    resources: [
      {
        name: "Docker Official Docs",
        url: "https://docs.docker.com/get-started",
      },
      {
        name: "TechWorld with Nana (YouTube)",
        url: "https://youtube.com/@TechWorldwithNana",
      },
    ],
    description:
      "Containerization is now expected even for dev roles. Learn Docker and basic CI/CD pipelines.",
    tags: ["Growing", "Mid-Level Roles"],
  },
  {
    id: 12,
    name: "Aptitude & Reasoning",
    category: "Soft Skills",
    demand: 92,
    trend: "stable",
    companies: ["TCS", "Infosys", "Wipro", "Accenture", "Cognizant", "HCL"],
    avgPackage: "6–12 LPA",
    difficulty: "Easy",
    timeToLearn: "2–4 weeks",
    resources: [
      { name: "IndiaBix", url: "https://indiabix.com" },
      { name: "RS Aggarwal Book", url: "https://amazon.in" },
    ],
    description:
      "First filter in mass hiring drives. You must clear aptitude to get to the tech round.",
    tags: ["Must Have", "Mass Hiring"],
  },
];

export const CATEGORIES = [
  "All",
  "Core CS",
  "Frontend",
  "Backend",
  "Programming",
  "Tools",
  "AI/ML",
  "DevOps",
  "Soft Skills",
];

export const DIFFICULTY_COLORS = {
  Easy: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800",
  Medium:
    "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800",
  Hard: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800",
};

export const TAG_COLORS = [
  "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
  "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800",
  "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
];

export const TOP_SKILLS_BANNER = [
  {
    rank: "🥇",
    skill: "DSA",
    note: "Asked at every product company",
    color:
      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
  },
  {
    rank: "🥈",
    skill: "Git & GitHub",
    note: "Non-negotiable prerequisite",
    color: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
  },
  {
    rank: "🥉",
    skill: "Aptitude",
    note: "First filter in mass drives",
    color:
      "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
  },
];
