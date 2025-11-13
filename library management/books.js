const BOOKVERSE_DATA = {
  "Computer Science": {
    "CS Fundamentals": [
      { id: "os-1", title: "Operating System", author: "Pooja Gupta", cover: "css/assets/covers/OS.png", href: "css/domains/OPERATING_SYSTEM.pdf", type: "pdf", year: 2016, tags: ["OS","Systems"] },
  { id: "dbms-1", title: "Database System Concepts (DBMS)", author: "Raghu Ramakrishnan", cover: "css/assets/covers/dbms.png", href: "css/domains/DBMS.pdf", type: "pdf", year: 2018, tags: ["DBMS","SQL"] },
  { id: "cn-1", title: "Computer Networks", author: "James F. Kurose", cover: "css/assets/covers/cn.png", href: "css/domains/Computer Networks.pdf", type: "pdf", year: 2018, tags: ["Networks"] }
    ],
    "Programming": [
      {
    id: "cv-C",
    title: "C Programming Language",
    author: "Kernighan and Ritchie",
    cover: "css/assets/covers/C.png",
    href: "css/domains/C lang.pdf",
    type: "pdf",
    year: "2016",
    tags: ["Fundamentals", "Low-level"]
  },
  {
    id: "cv-C++",
    title: "The C++ Programming Language",
    author: "Ulla Kirch-Prinz and Peter Prinz",
    cover: "css/assets/covers/c++.jpg",
    href: "css/domains/C++.pdf",
    type: "pdf",
    year: "2018",
    tags: ["OOP", "Advanced"]
  },
  {
    id: "cv-java",
    title: "Core Java",
    author: "David J.Eck",
    cover: "css/assets/covers/Java.png",
    href: "css/domains/Java.pdf",
    type: "pdf",
    year: "2006",
    tags: ["OOP", "Web"]
  },
  {
    id: "cv-python",
    title: "Learning Python",
    author: "Hans Petter Halvorsen",
    cover: "css/assets/covers/Python.png",
    href: "css/domains/Python Programming.pdf",
    type: "pdf",
    year: "2013",
    tags: ["Beginner-friendly", "Data Science", "Scripting"]
  }
    ],
  "Advanced Topics":[
    {
    id: "cv-AI",
    title: "Artificial Intelligence: A Modern Approach",
    author: "oswald campesato",
    cover: "css/assets/covers/aiml.png",
    href: "css/domains/AIML.pdf",
    type: "pdf",
    year: "2020",
    tags: ["Machine Learning", "Neural Networks", "AI/ML"]
  },
  {
    id: "cv-DS",
    title: "Data Science from Scratch",
    author: "Joel Grus",
    cover: "css/assets/covers/DS.png",
    href: "css/domains/Data Science.pdf",
    type: "pdf",
    year: "2015",
    tags: ["Data Analysis", "Statistics", "Python", "Big Data"]
  }
  ]
  },

  "Engineering": {
    "Civil Engineering": [
      {
    id: "cv-geotech",
    title: "Geotechnical Engineering",
    author: "Braja M. Das",
    cover: "css/assets/covers/geotechnical.png",
    href: "css/domains/Geotechnical Engineering.pdf",
    type: "pdf",
    year: "2016",
    tags: ["Soil Mechanics", "Foundation", "Geology"]
  },
  {
    id: "cv-structures",
    title: "Structural Design",
    author: "Ram. S. Gupta",
    cover: "css/assets/covers/strcutures.png",
    href: "css/domains/Structural Design.pdf",
    type: "pdf",
    year: "2018",
    tags: ["Structures", "Building Design", "Analysis"]
  }
    ],
    "Electrical Engineering": [
      {
      id: "ee-powersys",
      title: "Power System Analysis",
      author: "V.K. Mehta & Rohit Mehta",
      href: "css/domains/Power system.pdf",
      cover: "css/assets/covers/powersystems.png",
      type: "pdf",
      year: "2010",
      tags: ["Power Systems", "Grid Analysis", "Protection"]
    },
    {
      id: "ee-electronics",
      title: "Principles of Electronics",
      author: "V.K. Mehta & Rohit Mehta",
      href: "css/domains/Principles-of-Electronics.pdf",
      cover: "css/assets/covers/electronics.png",
      type: "pdf",
      year: "2014",
      tags: ["Electronics", "Circuits", "Components"]
    }
    ],
    "Mechanical Engineering": [
      {
      id: "mech-fluid",
      title: "Fluid Mechanics",
      author: "L. D. Landau & E. M. Lifshitz",
      href: "css/domains/Fluid Mechanics.pdf",
      cover: "css/assets/covers/fluid.png",
      type: "pdf",
      year: "2017",
      tags:["Fluid Flow", "Dynamics", "Applications"]
    },
    {
      id: "mech-thermo",
      title: "Thermodynamics",
      author: "P. K. Nag",
      href: "css/domains/Thermodynamics by PK Nag.pdf",
      cover: "css/assets/covers/thermo.png",
      type: "pdf",
      year: "2013",
      tags:["Heat Transfer", "Energy", "Cycles"]
    }
    ]
  },

  "Others": {
    "Eco-Social": [
     {
    id: "cv-silent",
    title: "Silent Spring",
    author: "Rachel Carson",
    cover: "css/assets/covers/silent.jpg",
    href: "css/domains/Silent_Spring-Rachel_Carson.pdf",
    type: "pdf",
    year: "2000",
    tags: ["Ecology", "Conservation", "Environmental"]
  },
  {
    id: "cv-changes",
    title: "This Changes Everything",
    author: "Naomi Klein",
    cover: "css/assets/covers/changes.jpg",
    href: "css/domains/Naomi Klein - This Changes Everything.pdf",
    type: "pdf",
    year: "2014",
    tags: ["Climate Action", "Social Justice", "Activism"]
  },
  {
    id: "cv-extinction",
    title: "The Sixth Extinction",
    author: "Elizabeth Kolbert",
    cover: "css/assets/covers/extinction.jpg",
    href: "css/domains/Elizabeth_Kolbert_-_The_Sixth_Extinction.pdf",
    type: "pdf",
    year: "2014",
    tags: ["Biodiversity", "Climate Crisis", "Science"]
  }
    ],
    "Lifestyle & Wellness": [
      {
    id: "cv-nutrition",
    title: "Nutrition and wellness for life",
    author: "Dorothy F. West",
    cover: "css/assets/covers/nutrition.jpg",
    href: "css/domains/Nutrition and wellness for life.pdf",
    type: "pdf",
    year: "2012",
    tags: ["Nutrition", "Healthy Living", "Wellness"]
  },
  {
    id: "cv-art-of-living",
    title: "The art of healthy living with physical impairments",
    author: "Anna-Carin Lagerström & Kerstin Wahman",
    cover: "css/assets/covers/art-of-living.jpg",
    href: "css/domains/The-art-of-healthy-living-with-physical-impairments.pdf",
    type: "pdf",
    year: "2014",
    tags: ["Health", "Accessibility", "Well-being"]
  },
    ],
    "Research Papers": [
      {
    id: "cv-hci",
title: "Human Computer Interaction",
authors: [
  "Linda Hirsch",
  "Siiri Paananen",
  "Denise Lengyel",
  "Jonna Häkkilä",
  "Georgios Toubekis",
  "Reem Talhouk",
  "Luke Hespanhol"
],
cover: "css/assets/covers/hci.png",
href: "css/domains/human computer interaction.pdf",
type: "pdf",
year: "2024",
tags: ["UX/UI", "Technology", "Research"]

  },
  {id: "cv-fake",
title: "Fake news on Social Media: the Impact on Society",
authors: [
"Femi Olan",
"Uchitha Jayawickrama",
"Emmanuel Ogiemwonyi Arakpogun",
"Jana Suklan",
"Shaofeng Liu"
],
cover: "css/assets/covers/fake.png",
href: "css/domains/fake news on social media.pdf",
type: "pdf",
year: "2022",
tags: ["Media", "Social Issues", "Digital"]

  },
  {
    id: "cv-open world",
title: "Open‑world Machine Learning",
authors: [
  "Jitendra Parmar",
  "Satyendra Singh Chouhan",
  "Vaskar Raychoudhury",
  "Santosh Singh Rathore"
],
cover: "css/assets/covers/open world.png",
href: "css/domains/open world machine learning.pdf",
type: "pdf",
year: "2021",
tags:["AI/ML", "Learning Systems", "Research"]
  }
    ]
  },
};
// ensure global access for non-module scripts
window.BOOKVERSE_DATA = BOOKVERSE_DATA;
