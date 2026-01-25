import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Experience {
  role: string;
  company: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  skills: string[];
  current: boolean;
  logo?: string;
}

interface Education {
  degree: string;
  institution: string;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  issuedDate: string;
  expiryDate?: string;
  expired: boolean;
  credentialId?: string;
  logo?: string;
  skills?: string[];
}

interface Community {
  name: string;
  role: string;
  period: string;
  description: string;
  link?: string;
  highlight?: boolean;
  logo?: string;
}

const experience: Experience[] = [
  {
    role: 'Developer Advocate - APAC',
    company: 'CAST AI',
    period: 'Jul 2025 - Present',
    duration: '7 mos',
    location: 'Bengaluru, Karnataka, India',
    type: 'Remote',
    description: 'Advocating for Kubernetes optimization and cloud cost management solutions across APAC region.',
    highlights: [],
    skills: ['Kubernetes', 'Cloud Cost Optimization', 'Developer Relations', 'FinOps'],
    current: true,
    logo: '/logos/castai.svg',
  },
  {
    role: 'Sr DevOps Engineer',
    company: 'Cyncly',
    period: 'Mar 2024 - Jul 2025',
    duration: '1 yr 5 mos',
    location: 'Bengaluru, Karnataka, India',
    type: 'Hybrid',
    description: 'Enterprise Cloud Architecture (Azure Focus)',
    highlights: [
      'Architected zero-downtime deployment frameworks supporting 30+ microservices across 3 continents, reducing production incidents by 72%',
      'Blue-green deployment implementation for 15 core APIs',
      'Multi-region AKS cluster configuration with auto-failover',
      'Terraform-driven infrastructure provisioning (100% IaC adoption)',
      'Led Entra ID authentication integration for 3 customer-facing applications handling 2M+ MAU, achieving SOC2 compliance',
      'RBAC implementation across 200+ service principals',
      'Conditional access policies reduced unauthorized access attempts by 84%',
      'Secrets management via Azure Key Vault integration',
      'Reduced lead time for changes from 14 days to 4 hours through 30+ CI/CD pipelines',
      'Parallelized testing frameworks cutting build times by 50%',
      'Automated canary analysis with Prometheus/Grafana dashboards',
      'Self-service deployment portals for QA teams',
      'Infrastructure cost optimization: Right-sizing 150+ VMs, Spot instances for batch processing, Cold storage archival reducing Blob costs by 38%',
    ],
    skills: ['Kubernetes', 'Architecture', 'Azure DevOps', 'Terraform', 'Microsoft Azure', 'CI/CD'],
    current: false,
    logo: '/logos/cyncly.svg',
  },
  {
    role: 'DevOps Lead',
    company: 'Tiger Analytics',
    period: 'Jul 2022 - Mar 2024',
    duration: '1 yr 9 mos',
    location: 'Bengaluru, Karnataka, India',
    type: 'Remote',
    description: 'Led DevOps initiatives for data analytics platforms.',
    highlights: [
      'Initiated ETL pipeline automation to speed up deployment cycles, improving efficiency',
      'Introduced CI/CD automation in Europe, halving manual deployment efforts and enhancing productivity',
      'Implemented microservice architecture on Azure, cutting Databricks costs by 35% for a global CPG brand',
      'Developed simplified infrastructure deployment solution using Azure DevOps and Terraform',
      'Upgraded CI/CD processes for Databricks, Data Factory, Synapse Analytics, and Power BI, prioritizing security',
      'Supported junior engineers through mentorship and creation of learning materials',
      'Crafted and shared architecture diagrams to simplify complex solutions',
    ],
    skills: ['Linux System Administration', 'Build Automation', 'Cross-functional Team Leadership', 'HashiCorp Vault', 'Cloud Automation', 'DevSecOps', 'GitOps', 'Shell Scripting', 'CI/CD', 'IaaS'],
    current: false,
    logo: '/logos/tiger-analytics.svg',
  },
  {
    role: 'Cloud Administrator',
    company: 'NSDL e-Governance Infrastructure Limited',
    period: 'Nov 2020 - Jul 2022',
    duration: '1 yr 9 mos',
    location: 'Bengaluru, Karnataka, India',
    type: 'On-site',
    description: 'Managed cloud infrastructure for e-governance platforms.',
    highlights: [],
    skills: ['Shell Scripting', 'CI/CD'],
    current: false,
    logo: '/logos/nsdl.svg',
  },
  {
    role: 'Datacenter Administrator',
    company: 'Wipro Limited',
    period: 'Nov 2019 - Nov 2020',
    duration: '1 yr 1 mo',
    location: 'Bengaluru, Karnataka, India',
    type: 'On-site',
    description: 'Managed datacenter operations and infrastructure.',
    highlights: [],
    skills: ['Shell Scripting', 'Reporting'],
    current: false,
    logo: '/logos/wipro.svg',
  },
  {
    role: 'System Engineer',
    company: 'Precision Infomatic (M) Private Limited',
    period: 'Oct 2017 - Nov 2019',
    duration: '2 yrs 2 mos',
    location: 'Greater Kolkata Area',
    type: 'On-site',
    description: 'Started career in system engineering.',
    highlights: [],
    skills: ['Shell Scripting'],
    current: false,
    logo: '/logos/precision.svg',
  },
];

const education: Education[] = [
  {
    degree: "Master's in Data Science",
    institution: 'University of Liverpool',
    description: 'Advanced studies in data science and ML.',
  },
  {
    degree: 'PG in Data Science',
    institution: 'IIIT Bangalore',
    description: 'Specialized data science program.',
  },
  {
    degree: 'B.Tech in ECE',
    institution: 'MAKAUT, West Bengal',
    description: 'Electronics and Communication Engineering.',
  },
];

const certifications: Certification[] = [
  // Active certifications
  { name: 'APA Heroes', issuer: 'Cast AI', issuedDate: 'Sep 2025', expired: false, credentialId: '1565cfbd-635b-432c-b240-e34218674124', logo: '/castai_apa_hero.png' },
  { name: 'FinOps Certified Engineer', issuer: 'FinOps Foundation', issuedDate: 'Aug 2025', expiryDate: 'Aug 2027', expired: false, credentialId: '6vgh7d7outig', logo: '/finops-certified-engineer.png' },
  { name: 'Microsoft Certified: DevOps Engineer Expert', issuer: 'Microsoft', issuedDate: 'May 2023', expiryDate: 'May 2026', expired: false, logo: '/microsoft-certified-expert-badge.svg' },
  { name: 'Microsoft Certified: Azure Solutions Architect Expert', issuer: 'Microsoft', issuedDate: 'Dec 2024', expiryDate: 'Dec 2026', expired: false, logo: '/microsoft-certified-expert-badge.svg' },
  { name: 'Microsoft Certified: Azure Network Engineer Associate', issuer: 'Microsoft', issuedDate: 'Nov 2023', expiryDate: 'Nov 2026', expired: false, logo: '/microsoft-certified-associate-badge.svg' },
  { name: 'Microsoft Certified: Azure Fundamentals', issuer: 'Microsoft', issuedDate: 'Jun 2021', expired: false, logo: '/microsoft-certified-fundamentals-badge.svg' },
  { name: 'Google IT Automation with Python Specialization', issuer: 'Google', issuedDate: 'Mar 2021', expired: false, credentialId: '3YZM73582DVS', logo: '/google-it-automation.png' },
  { name: 'Cybersecurity', issuer: 'Alien Brains', issuedDate: 'Sep 2020', expired: false, credentialId: 'ISB00120024000014' },
  { name: 'Kusto Detective Agency - Complete', issuer: 'Microsoft', issuedDate: 'Jun 2024', expired: false, logo: '/kusto-complete-badge.png' },
  { name: 'Kusto Detective Agency - Case #1 Badge', issuer: 'Microsoft', issuedDate: 'Jun 2024', expired: false, logo: '/kusto-case1-badge.png' },
  { name: 'Kusto Detective Agency - Case #2 Badge', issuer: 'Microsoft', issuedDate: 'Jun 2024', expired: false, logo: '/kusto_case2_logo.png' },
  { name: 'Kusto Detective Agency - Case #3 Badge', issuer: 'Microsoft', issuedDate: 'Jun 2024', expired: false, logo: '/kusto-case3-badge.png' },
  { name: 'Kusto Detective Agency - Case #4 Badge', issuer: 'Microsoft', issuedDate: 'Jun 2024', expired: false, logo: '/kusto-case4-badge.png' },
  // Expired certifications
  { name: 'HashiCorp Certified: Terraform Associate (003)', issuer: 'HashiCorp', issuedDate: 'Jun 2023', expiryDate: 'Jun 2025', expired: true, skills: ['Terraform'], logo: '/terraform-associate-badge.png' },
  { name: 'Microsoft Certified: Azure Security Engineer Associate', issuer: 'Microsoft', issuedDate: 'Jan 2025', expired: true, logo: '/microsoft-certified-associate-badge.svg', skills: ['Microsoft Azure', 'Security', 'Network Security'] },
  { name: 'Microsoft Certified: Azure Developer Associate', issuer: 'Microsoft', issuedDate: 'Sep 2021', expired: true, logo: '/microsoft-certified-associate-badge.svg' },
  { name: 'Microsoft Certified: Azure Administrator Associate', issuer: 'Microsoft', issuedDate: 'Jul 2021', expired: true, logo: '/microsoft-certified-associate-badge.svg' },
  { name: 'NSE 1 Network Security Associate', issuer: 'Fortinet', issuedDate: 'Oct 2020', expiryDate: 'Oct 2022', expired: true, credentialId: 'TeaQajK883', logo: '/nse1-badge.jpeg' },
  { name: 'NSE 2 Network Security Associate', issuer: 'Fortinet', issuedDate: 'Oct 2020', expiryDate: 'Oct 2022', expired: true, credentialId: 'rhRnRbVmAY', logo: '/nse2-badge.jpeg' },
];

const communities: Community[] = [
  {
    name: 'CLOUDxAI Conference',
    role: 'Conference Organizer',
    period: 'Jan 2026 - Present',
    description: 'Cloud-native + AI conference in Bengaluru',
    link: 'https://cloudxai.dev',
    highlight: true,
    logo: '/logos/cloudxai.svg',
  },
  {
    name: 'HashiCorp User Group Bengaluru',
    role: 'Co-Organizer',
    period: 'Aug 2025 - Present',
    description: 'Terraform, Vault, Consul meetups',
    link: 'https://www.meetup.com/hug-bangalore',
    logo: '/logos/hashicorp.svg',
  },
  {
    name: 'Cloud Computing Circle (C3)',
    role: 'Organizer',
    period: 'Jul 2025 - Present',
    description: 'Cloud-native community in Bengaluru',
    link: 'https://c3meetup.taplink.bio',
    logo: '/logos/c3.svg',
  },
  {
    name: 'Cloud Native Kolkata',
    role: 'Organizer',
    period: 'Jul 2025 - Present',
    description: 'CNCF community chapter',
    link: 'https://community.cncf.io/cloud-native-kolkata/',
    logo: '/logos/cncf.svg',
  },
  {
    name: 'KSUG.AI India',
    role: 'Organizer',
    period: 'Dec 2024 - Jul 2025',
    description: 'Kubernetes + AI/ML workloads',
    link: 'https://ksug.ai',
    logo: '/logos/ksug.svg',
  },
  {
    name: 'Cloud Native Mumbai',
    role: 'Co-Organizer',
    period: '2024 - Present',
    description: 'CNCF community chapter for Mumbai',
    link: 'https://community.cncf.io/cloud-native-mumbai-city/',
    logo: '/logos/cncf.svg',
  },
];

const skills = [
  { name: 'Kubernetes', icon: '☸️', category: 'Containers' },
  { name: 'Docker', icon: '🐳', category: 'Containers' },
  { name: 'AKS', icon: '☁️', category: 'Containers' },
  { name: 'Helm', icon: '⎈', category: 'Containers' },
  { name: 'Azure', icon: '☁️', category: 'Cloud' },
  { name: 'AWS', icon: '🌩️', category: 'Cloud' },
  { name: 'GCP', icon: '🌐', category: 'Cloud' },
  { name: 'Terraform', icon: '🏗️', category: 'IaC' },
  { name: 'Pulumi', icon: '📦', category: 'IaC' },
  { name: 'ARM Templates', icon: '📋', category: 'IaC' },
  { name: 'Azure DevOps', icon: '🔄', category: 'CI/CD' },
  { name: 'GitHub Actions', icon: '⚡', category: 'CI/CD' },
  { name: 'ArgoCD', icon: '🎯', category: 'CI/CD' },
  { name: 'Databricks', icon: '📊', category: 'Data' },
  { name: 'Synapse', icon: '🔗', category: 'Data' },
  { name: 'Data Factory', icon: '🏭', category: 'Data' },
  { name: 'Entra ID', icon: '🔐', category: 'Security' },
  { name: 'Key Vault', icon: '🔑', category: 'Security' },
  { name: 'OPA', icon: '📜', category: 'Security' },
  { name: 'Prometheus', icon: '📈', category: 'Monitoring' },
  { name: 'Grafana', icon: '📉', category: 'Monitoring' },
  { name: 'Python', icon: '🐍', category: 'Languages' },
  { name: 'Go', icon: '🔷', category: 'Languages' },
  { name: 'Bash', icon: '💻', category: 'Languages' },
  { name: 'TypeScript', icon: '📘', category: 'Languages' },
];

interface CollapsibleSectionProps {
  title: string;
  icon: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  count?: number;
}

function CollapsibleSection({ title, icon, defaultOpen = false, children, count }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white text-lg">
            {icon}
          </span>
          <span className="font-bold text-white text-xl">{title}</span>
          {count !== undefined && (
            <span className="px-2 py-0.5 bg-slate-700 text-slate-300 rounded-full text-sm">
              {count}
            </span>
          )}
        </div>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-6 h-6 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Timeline component for work experience
function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Extract year from period string (e.g., "Jul 2025 - Present" -> "2025")
  const getYear = (period: string) => {
    const match = period.match(/(\d{4})/);
    return match ? match[1] : '';
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-violet-500 to-slate-700" />

      <div className="space-y-6">
        {experience.map((exp, index) => {
          const year = getYear(exp.period);
          const prevYear = index > 0 ? getYear(experience[index - 1].period) : null;
          const showYear = year !== prevYear;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-20"
            >
              {/* Year label - only show when year changes */}
              <div className="absolute left-0 top-3 w-8 text-right">
                {showYear && (
                  <span className={`text-sm font-bold ${exp.current ? 'text-teal-400' : 'text-slate-500'}`}>
                    {exp.current ? 'Now' : year}
                  </span>
                )}
              </div>

              {/* Timeline dot */}
              <div className={`absolute left-[38px] top-4 w-3 h-3 rounded-full ${
                exp.current
                  ? 'bg-teal-500 shadow-lg shadow-teal-500/50 ring-4 ring-teal-500/20'
                  : 'bg-slate-600'
              }`} />

              {/* Content card */}
              <div
                className={`rounded-xl border transition-all cursor-pointer ${
                  exp.current
                    ? 'bg-slate-800 border-teal-500/50 shadow-lg shadow-teal-500/10'
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-white text-lg">{exp.role}</h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded text-xs font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-teal-400 font-medium">{exp.company} · Full-time</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-slate-400">
                        <span>{exp.period} · {exp.duration}</span>
                        <span>·</span>
                        <span>{exp.location} · {exp.type}</span>
                      </div>
                    </div>
                    <motion.svg
                      animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                      className="w-5 h-5 text-slate-400 flex-shrink-0 mt-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-slate-700/50 pt-4">
                        {exp.description && (
                          <p className="text-slate-300 mb-4">{exp.description}</p>
                        )}
                        {exp.highlights.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {exp.highlights.map((highlight, i) => (
                              <li key={i} className="text-slate-400 text-sm flex items-start gap-2">
                                <span className="text-teal-400 mt-1">▸</span>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-slate-700 rounded-full text-xs text-slate-300 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Skill cards component
function SkillCards() {
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <div
          key={category}
          className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 transition-colors"
        >
          <h4 className="text-sm font-bold text-teal-400 mb-3">{category}</h4>
          <div className="flex flex-wrap gap-2">
            {skills
              .filter((s) => s.category === category)
              .map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-200"
                >
                  <span>{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Community cards component
function CommunityCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {communities.map((community) => (
        <a
          key={community.name}
          href={community.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`group p-5 rounded-xl border transition-all hover:scale-[1.02] ${
            community.highlight
              ? 'bg-gradient-to-br from-slate-800 to-slate-800/50 border-teal-500/50 shadow-lg shadow-teal-500/10'
              : 'bg-slate-800/50 border-slate-700 hover:border-teal-500/50'
          }`}
        >
          <div className="flex items-start gap-4">
            {/* Logo placeholder */}
            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <span className="text-xl text-slate-400">{community.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white group-hover:text-teal-400 transition-colors truncate">
                  {community.name}
                </h4>
                <svg className="w-4 h-4 text-slate-500 group-hover:text-teal-400 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <p className="text-teal-400 text-sm font-medium">{community.role}</p>
              <p className="text-slate-500 text-xs mt-1">{community.period}</p>
              <p className="text-slate-400 text-sm mt-2">{community.description}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

// Certification cards component
function CertificationCards() {
  const activeCerts = certifications.filter(c => !c.expired);
  const expiredCerts = certifications.filter(c => c.expired);

  return (
    <div className="space-y-8">
      {/* Active Certifications */}
      <div>
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          Active Certifications
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCerts.map((cert) => (
            <div
              key={cert.name}
              className="p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-green-500/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                {/* Logo */}
                <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {cert.logo ? (
                    <img src={cert.logo} alt={cert.issuer} className="w-10 h-10 object-contain" />
                  ) : (
                    <span className="text-lg text-slate-400">{cert.issuer.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-white text-sm leading-tight">{cert.name}</h5>
                  <p className="text-teal-400 text-xs mt-1">{cert.issuer}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    Issued {cert.issuedDate}
                    {cert.expiryDate && ` · Expires ${cert.expiryDate}`}
                  </p>
                  {cert.credentialId && (
                    <p className="text-slate-600 text-xs mt-1 truncate">ID: {cert.credentialId}</p>
                  )}
                </div>
              </div>
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Expired Certifications */}
      <div>
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-500"></span>
          Expired Certifications
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {expiredCerts.map((cert) => (
            <div
              key={cert.name}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 opacity-75"
            >
              <div className="flex items-start gap-3">
                {/* Logo */}
                <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {cert.logo ? (
                    <img src={cert.logo} alt={cert.issuer} className="w-10 h-10 object-contain opacity-60" />
                  ) : (
                    <span className="text-lg text-slate-500">{cert.issuer.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-slate-300 text-sm leading-tight">{cert.name}</h5>
                  <p className="text-slate-400 text-xs mt-1">{cert.issuer}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    Issued {cert.issuedDate}{cert.expiryDate && ` · Expired ${cert.expiryDate}`}
                  </p>
                  {cert.credentialId && (
                    <p className="text-slate-600 text-xs mt-1 truncate">ID: {cert.credentialId}</p>
                  )}
                </div>
              </div>
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-400">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutContent() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Bio - Always visible */}
      <div className="mb-8 p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-xl gradient-bg p-0.5">
              <img
                src="/profile.png"
                alt="Kunal Das"
                className="w-full h-full rounded-xl object-cover bg-slate-800"
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">Kunal Das</h2>
            <p className="text-teal-400 font-semibold text-lg mb-3">Developer Advocate APAC at CAST AI</p>
            <p className="text-slate-400">
              8+ years in DevOps & Cloud. Architected zero-downtime deployments for 30+ microservices across 3 continents.
              Active community builder organizing 5+ tech communities across India.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1.5 bg-slate-700 rounded-lg text-sm text-slate-300">📍 Bengaluru</span>
              <span className="px-3 py-1.5 bg-slate-700 rounded-lg text-sm text-slate-300">🎓 MSc Data Science</span>
              <span className="px-3 py-1.5 bg-slate-700 rounded-lg text-sm text-slate-300">🏆 20+ Certifications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Work Experience - Timeline */}
      <CollapsibleSection title="Work Experience" icon="💼" defaultOpen={true} count={experience.length}>
        <ExperienceTimeline />
      </CollapsibleSection>

      {/* Technical Skills - Cards */}
      <CollapsibleSection title="Technical Skills" icon="🛠️">
        <SkillCards />
      </CollapsibleSection>

      {/* Communities - Cards with logos */}
      <CollapsibleSection title="Communities" icon="🌐" count={communities.length}>
        <CommunityCards />
      </CollapsibleSection>

      {/* Certifications - Cards with logos */}
      <CollapsibleSection title="Certifications" icon="🏆" count={certifications.length}>
        <CertificationCards />
      </CollapsibleSection>

      {/* Education */}
      <CollapsibleSection title="Education" icon="🎓" count={education.length}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {education.map((edu) => (
            <div key={edu.institution} className="p-5 rounded-xl bg-slate-800 border border-slate-700">
              <h4 className="font-bold text-white text-lg">{edu.degree}</h4>
              <p className="text-teal-400 mt-1">{edu.institution}</p>
              <p className="text-slate-400 text-sm mt-2">{edu.description}</p>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
}
