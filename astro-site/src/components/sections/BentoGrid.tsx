import { motion } from 'framer-motion';

const skills = [
  { name: 'Kubernetes', icon: '☸️', category: 'DevOps' },
  { name: 'Docker', icon: '🐳', category: 'DevOps' },
  { name: 'Terraform', icon: '🏗️', category: 'IaC' },
  { name: 'Azure', icon: '☁️', category: 'Cloud' },
  { name: 'AWS', icon: '🌩️', category: 'Cloud' },
  { name: 'GCP', icon: '🌐', category: 'Cloud' },
  { name: 'KEDA', icon: '📈', category: 'DevOps' },
  { name: 'Helm', icon: '⎈', category: 'DevOps' },
  { name: 'Python', icon: '🐍', category: 'Code' },
  { name: 'Go', icon: '🔷', category: 'Code' },
  { name: 'OPA', icon: '🔒', category: 'Security' },
  { name: 'FinOps', icon: '💰', category: 'Cloud' },
];

const stats = [
  { label: 'Communities Led', value: '5+', gradient: 'from-emerald-500 to-teal-600' },
  { label: 'Talks Given', value: '25+', gradient: 'from-violet-500 to-purple-600' },
  { label: 'Years Experience', value: '8+', gradient: 'from-orange-500 to-rose-500' },
  { label: 'Certifications', value: '12+', gradient: 'from-blue-500 to-indigo-600' },
];

interface BentoGridProps {
  recentPosts?: Array<{ title: string; slug: string; date: string }>;
  featuredProject?: { title: string; description: string; demo?: string };
}

export default function BentoGrid({ recentPosts = [], featuredProject }: BentoGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]"
      >
        {/* What I Do - Large Card */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 md:col-span-2 row-span-2 rounded-3xl p-8 bg-gradient-to-br from-teal-600 to-indigo-600 text-white relative overflow-hidden group"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_50%)]" />
          </div>
          <div className="relative z-10 h-full flex flex-col">
            <h2 className="text-3xl font-bold mb-4">What I Do</h2>
            <p className="text-lg opacity-90 mb-6">
              I help organizations optimize their cloud-native infrastructure. As Developer Advocate APAC at CAST AI, I focus on Kubernetes optimization, FinOps, and scaling microservices efficiently.
            </p>
            <div className="mt-auto flex gap-4">
              <a
                href="/about"
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-colors backdrop-blur-sm"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
        </motion.div>

        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className={`rounded-3xl p-6 bg-gradient-to-br ${stat.gradient} text-white card-hover flex flex-col justify-center items-center text-center relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/10" />
            <span className="text-4xl font-bold relative z-10">{stat.value}</span>
            <span className="text-white/90 mt-2 relative z-10 font-medium">{stat.label}</span>
          </motion.div>
        ))}

        {/* Skills Card */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 md:col-span-2 rounded-3xl p-6 bg-slate-800 border border-slate-700 card-hover shadow-lg"
        >
          <h3 className="text-xl font-bold mb-4 text-white">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="px-4 py-2 bg-slate-700 text-slate-200 rounded-full text-sm font-medium flex items-center gap-2 hover:scale-105 hover:bg-slate-600 transition-all cursor-default"
              >
                <span>{skill.icon}</span>
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          variants={itemVariants}
          className="col-span-1 lg:col-span-2 row-span-2 rounded-3xl p-6 bg-slate-800 border border-slate-700 card-hover shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Recent Posts</h3>
            <a href="/posts" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              View all →
            </a>
          </div>
          <div className="space-y-4">
            {recentPosts.length > 0 ? (
              recentPosts.slice(0, 3).map((post) => (
                <a
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="block p-4 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-colors group"
                >
                  <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                  <p className="text-sm text-slate-400 mt-1">{post.date}</p>
                </a>
              ))
            ) : (
              <div className="text-slate-400 text-center py-8">
                <p>Posts coming soon!</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Featured Project */}
        {featuredProject && (
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-2 rounded-3xl p-6 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white relative overflow-hidden group"
          >
            <div className="relative z-10">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Featured Project</span>
              <h3 className="text-2xl font-bold mt-4 mb-2">{featuredProject.title}</h3>
              <p className="opacity-90 text-sm line-clamp-2">{featuredProject.description}</p>
              <div className="mt-4">
                <a
                  href="/projects"
                  className="text-sm font-semibold hover:underline"
                >
                  View all projects →
                </a>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
