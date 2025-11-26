const BOOKVERSE_DATA = {
  "Computer Science": {
    "CS Fundamentals": [
      { id: "os-1", title: "Operating System", author: "Pooja Gupta", cover: "css/assets/covers/OS.png", href: "css/domains/OPERATING_SYSTEM.pdf", type: "pdf", year: 2016, tags: ["OS","Systems"] },
  { id: "dbms-1", title: "Database System Concepts (DBMS)", author: "Raghu Ramakrishnan", cover: "css/assets/covers/dbms.png", href: "css/domains/DBMS.pdf", type: "pdf", year: 2018, tags: ["DBMS","SQL"] },
  { id: "cn-1", title: "Computer Networks", author: "James F. Kurose", cover: "css/assets/covers/cn.png", href: "css/domains/Computer Networks.pdf", type: "pdf", year: 2018, tags: ["Networks"] },
  {
      id: "coa-1",
      title: "Computer Architecture",
      author: "Mostafa Abd-El-Barr & Hesham El-Rewini",
      cover: "css/assets/covers/coa.png",
      href: "css/domains/COA.pdf",
      type: "pdf",
      year: 2004,
      tags: ["Architecture","Hardware","CPU"]
    },
    {
      id: "dsa-1",
      title: "Data Structures and Algorithms",
      author: "James F. Kurose",
      cover: "css/assets/covers/dsa.jpg",
      href: "css/domains/Dsa.pdf",
      type: "pdf",
      year: 2008,
      tags: ["Algorithms","Data Structures","Programming"]
    }
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
  },
  ,
  {
    id: "cv-js",
    title: "JavaScript",
    author: "Laurence Lars Svekis , Maaike van Putten & Rob Percival",
    cover: "css/assets/covers/js.jpg",
    href: "css/domains/javascript.pdf",
    type: "pdf",
    year: "2021",
    tags: ["Web Development", "Frontend", "Scripting"]
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
  },
  {
    id: "cv-ml",
    title: "Introduction to Machine Learning with Python",
    author: "Andreas C. Müller & Sarah Guido",
    cover: "css/assets/covers/machine learning.png",
    href: "css/domains/Introduction to Machine Learning with Python.pdf",
    type: "pdf",
    year: "2016",
    tags: ["ML Models", "Python", "Scikit-learn"]
  },
  {
    id: "cv-cs",
    title: "Introduction to Cyber Security",
    author: "Dr. Jeetendra Pande",
    cover: "css/assets/covers/cyber.png",
    href: "css/domains/Introduction-cyber-security.pdf",
    type: "pdf",
    year: "2017",
    tags: ["Security", "Threats", "Protection"]
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
  },
  {
    id: "cv-constructions",
    title: "Construction Materials",
    author: "Dr. S K Panigrahi",
    cover: "css/assets/covers/construction.png",
    href: "css/domains/Construction Materials.pdf",
    type: "pdf",
    year: "2010",
    tags: ["Materials", "Concrete", "Testing"]
  },
  {
    id: "cv-transport",
    title: "Transportation Engineering",
    author: "Tom V. Mathew",
    cover: "css/assets/covers/transport.png",
    href: "css/domains/Transportation Engineering.pdf",
    type: "pdf",
    year: "2006",
    tags: ["Roads", "Traffic", "Planning"]
  },
  {
    id: "cv-environmenteng",
    title: "Environmental Engineering",
    author: "R.C gaur",
    cover: "css/assets/covers/environment.png",
    href: "css/domains/Environmental Engineering by R.C gaur.pdf",
    type: "pdf",
    year: "2008",
    tags: ["Water Treatment", "Waste", "Pollution"]
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
    },
    {
      id: "ee-signals",
      title: "Signals and Systems",
      author: "Alan V. Oppenheim & Alan S. Willsky",
      href: "css/domains/Signals and Systems.pdf",
      cover: "css/assets/covers/signals and systems.png",
      type: "pdf",
      year: "2000",
      tags: ["Signal Processing", "DSP", "Analysis"]
    },
    {
      id: "ee-electromagnetic",
      title: "Electromagnetic Fields and Waves",
      author: "Paul Lorrain , Dale R. Corson & Francois Lorrain",
      href: "css/domains/electromagnetic-fields-and-waves.pdf",
      cover: "css/assets/covers/em waves.png",
      type: "pdf",
      year: "1988",
      tags: ["Electromagnetic Waves", "Field Theory", "Radiation"]
    },
    {
      id: "ee-power",
      title: "Power Electronics And Motor Drives",
      author: "Bimal K. Bose",
      href: "css/domains/Power Electronics And Motor Drives.pdf",
      cover: "css/assets/covers/power drives.png",
      type: "pdf",
      year: "2006",
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
    },
    {
      id: "mech-machine",
      title: "Mechanical Design",
      author: "Robert L. Mott , Edward M. Vavrek & Jyhwen Wang",
      href: "css/domains/Mechanical Design.pdf",
      cover: "css/assets/covers/machine design.png",
      type: "pdf",
      year: "2018",
      tags: ["Design", "Components", "Stress Analysis"]
    },
    {
      id: "mech-manufacture",
      title: "Manufacturing Processes",
      author: "H.N. Gupta , R.C. Gupta & Arun Mittal",
      href: "css/domains/Manufacturing Processes.pdf",
      cover: "css/assets/covers/manufacture process.png",
      type: "pdf",
      year: "2009",
      tags: ["Production", "Machining", "Processes"]
    },
    {
      id: "mech-vibrations",
      title: "Mechanical Vibrations",
      author: "S. GRAHAM KELLY",
      href: "css/domains/Mechanical Vibrations.pdf",
      cover: "css/assets/covers/mechanical vibrations.png",
      type: "pdf",
      year: "2011",
      tags: ["Oscillations", "Damping", "Analysis"]
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
  },
  {
    id: "cv-enviromental",
    title: "Environmental Studies",
    author: "Anindita Basak",
    cover: "css/assets/covers/environmental studies.png",
    href: "css/domains/Environmental Studies.pdf",
    type: "pdf",
    year: "2009",
    tags: ["Ecosystems", "Resources", "Pollution Control"]
  },
  {
    id: "cv-sustainable",
    title: "Environmental Awareness for Sustainable Development",
    author: "Svenja Garrard , Piet Heyns & Gabi Schneider",
    cover: "css/assets/covers/Sustainable dev.png",
    href: "css/domains/Environmental_awareness_for_sustainable_development.pdf",
    type: "pdf",
    year: "2017",
    tags: ["Sustainable Development", "Green Living", "SDGs"]
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
  },,
  {
    id: "cv-healthy-lifestyle",
    title: "6 steps to a healthy lifestyle",
    author: "Michael P. O'Donnell",
    cover: "css/assets/covers/6 steps.png",
    href: "css/domains/six steps to a healthy lifestyle.pdf",
    type: "pdf",
    year: "2014",
    tags: ["Fitness", "Nutrition", "Habits"]
  },
  {
    id: "cv-health-wellbeing",
    title: "Health and Well being",
    author: "Rima Rouf-Choudhury",
    cover: "css/assets/covers/Health and weellbeing.png",
    href: "css/domains/Health and Well being.pdf",
    type: "pdf",
    year: "2020",
    tags: ["Wellness", "Mental Health", "Self-care"]
  }
    ],
    "Research Papers": [
      {
    id: "cv-hci",
title: "Human Computer Interaction",
cover: "css/assets/covers/hci.png",
href: "css/domains/human computer interaction.pdf",
type: "pdf",
year: "2024",
tags: ["UX/UI", "Technology", "Research"]

  },
  {id: "cv-fake",
title: "Fake news on Social Media: the Impact on Society",
cover: "css/assets/covers/fake.png",
href: "css/domains/fake news on social media.pdf",
type: "pdf",
year: "2022",
tags: ["Media", "Social Issues", "Digital"]

  },
  {
    id: "cv-open world",
title: "Open-world Machine Learning",
cover: "css/assets/covers/open world.png",
href: "css/domains/open world machine learning.pdf",
type: "pdf",
year: "2021",
tags:["AI/ML", "Learning Systems", "Research"]
  },
  {
    id: "cv-computer science",
  title: "Computer Science Research Paper",
  cover: "css/assets/covers/cs research.png",
  href: "css/domains/Computer science research.pdf",
  type: "pdf",
  year: "2004",
  tags: ["Theory", "Algorithms", "Research"]
},
{
  id: "cv-AI",
  title: "Artificial Intelligence Research Paper",
  cover: "css/assets/covers/AI research.png",
  href: "css/domains/Artificial Intelligence research paper.pdf",
  type: "pdf",
  year: "2023",
  tags: ["AI/ML", "Deep Learning", "Applications"]
 }
    ]
  },
};
// ensure global access for non-module scripts
window.BOOKVERSE_DATA = BOOKVERSE_DATA;