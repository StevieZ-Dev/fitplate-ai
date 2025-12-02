'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  ChefHat, 
  Utensils, 
  ShoppingCart, 
  CheckCircle, 
  Loader2, 
  ExternalLink, 
  Smartphone, 
  Download, 
  X,
  Menu,
  Zap,
  ArrowRight,
  ChevronRight,
  User,
  Calendar,
  Heart,
  Scale,
  Apple
} from 'lucide-react';

// --- MOCK DATA GENERATORS (The "Nutritionist" Brain) ---

const generateMockResults = (query: string) => [
  {
    type: 'BALANCED',
    title: `The 7-Day ${query.split(' ').pop() || 'Clean'} Reset`,
    description: 'Perfect balance of macros. Includes prep-friendly meals like Quinoa Bowls and Grilled Chicken Wraps.',
    cost: '$65 / week',
    ingredients: ['Quinoa', 'Chicken Breast', 'Spinach'],
    calories: '1800 kcal',
  },
  {
    type: 'BUDGET',
    title: `Dollar-Stretcher ${query.split(' ').pop() || 'Meal'} Plan`,
    description: 'High volume, low cost. Focuses on bulk ingredients like lentils, rice, and frozen veggies.',
    cost: '$45 / week',
    ingredients: ['Lentils', 'Brown Rice', 'Eggs'],
    calories: '2000 kcal',
  },
  {
    type: 'LOW_CARB',
    title: `Rapid Fat-Loss ${query.split(' ').pop() || 'Keto'} Protocol`,
    description: 'Metabolic optimization. High healthy fats and protein to keep you full while shredding.',
    cost: '$80 / week',
    ingredients: ['Avocado', 'Salmon', 'Almonds'],
    calories: '1600 kcal',
  },
];

const MOCK_BLOG_POSTS = [
  {
    id: 1,
    title: "How to Meal Prep for $50 a Week (And Actually Enjoy It)",
    excerpt: "Stop eating dry chicken. Here is the chef's guide to making budget food taste expensive.",
    image: "https://placehold.co/800x400/10b981/ffffff?text=Budget+Meal+Prep",
    date: "Nov 20, 2025",
    author: "Chef Mike",
    category: "Budget"
  },
  {
    id: 2,
    title: "The 'Anti-Inflammatory' Shopping List for Busy Moms",
    excerpt: "Reduce bloating and increase energy with these 10 ingredients you can find at any Walmart.",
    image: "https://placehold.co/800x400/065f46/ffffff?text=Anti-Inflammatory",
    date: "Nov 18, 2025",
    author: "Dr. Sarah",
    category: "Health"
  },
  {
    id: 3,
    title: "Why 'Cheat Days' Are Ruining Your Progress",
    excerpt: "The science of metabolic flexibility and why the 80/20 rule works better than starvation.",
    image: "https://placehold.co/800x400/34d399/ffffff?text=Metabolism+Science",
    date: "Nov 15, 2025",
    author: "FitPlate Team",
    category: "Science"
  },
];

// --- AD COMPONENTS (Health & Grocery Ads) ---

const AdUnit = ({ format = "horizontal", label = "Sponsor" }) => {
  const isVertical = format === "vertical";
  const isSticky = format === "sticky";
  
  if (isSticky) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 p-2 flex justify-center animate-in slide-in-from-bottom-full duration-700">
        <div className="w-full max-w-[728px] h-[90px] bg-emerald-50 border border-dashed border-emerald-200 rounded flex flex-col items-center justify-center text-emerald-600 text-xs">
          <span className="font-bold">FRESH FOOD DELIVERY AD (Sticky)</span>
          <span>Google AdSense 728x90</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm font-medium p-2 relative overflow-hidden group ${isVertical ? 'h-[600px] w-full' : 'h-32 w-full my-6'}`}>
      <span className="z-10 font-bold text-gray-500 mb-1">SPONSORED ({label})</span>
      <span className="z-10 text-xs opacity-50">Secure Ad Slot</span>
    </div>
  );
};

// --- LEAD MAGNET MODAL ---

const DownloadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState('capture'); 
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setStep('download'), 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-emerald-900/40 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden"
          >
            <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-900 bg-gray-100 p-2 rounded-full z-20">
              <X size={20} />
            </button>

            <div className="p-0">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-10 text-center text-white relative overflow-hidden">
                <Leaf className="mx-auto mb-4 drop-shadow-xl relative z-10" size={56} />
                <h3 className="text-3xl font-black mb-2 relative z-10">Get the Shopping List 🛒</h3>
                <p className="text-emerald-100 font-medium relative z-10">Unlock the full ingredient list and step-by-step recipes.</p>
              </div>

              <div className="p-8 bg-white text-gray-900">
                {step === 'capture' ? (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Where should we send the list?</label>
                        <input 
                          type="email" 
                          required
                          placeholder="you@healthy.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-4 rounded-xl border-2 border-emerald-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-medium text-lg text-gray-900"
                        />
                      </div>
                      <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 text-lg group">
                        Unlock Recipes <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                    <div className="mt-6 flex justify-center gap-4 text-gray-400">
                        <span className="text-xs font-medium">Join 50,000+ Healthy Eaters</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Sent! 🥗</h3>
                    <p className="text-gray-500 mb-8 text-sm">
                      Check <strong>{email}</strong> for your plan. Download the app for macro tracking:
                    </p>
                    <div className="space-y-3">
                      <button className="w-full bg-black text-white py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors font-bold shadow-lg">
                        <span>Download on the <br/><span className="text-xs font-normal">App Store</span></span>
                      </button>
                      <button className="w-full bg-emerald-50 text-emerald-900 border-2 border-emerald-100 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-emerald-100 transition-colors font-bold shadow-lg">
                        <span>Get it on <br/><span className="text-xs font-normal">Google Play</span></span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- BLOG COMPONENTS ---

const BlogCard = ({ post, onClick }: { post: any; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col h-full"
  >
    <div className="h-48 overflow-hidden relative bg-emerald-50">
      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-700 uppercase tracking-wide shadow-sm">
        {post.category}
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-emerald-600 transition-colors">{post.title}</h3>
      <p className="text-gray-500 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
      <div className="mt-auto flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
        <span className="flex items-center gap-1"><ChefHat size={12}/> {post.author}</span>
        <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
      </div>
    </div>
  </div>
);

const BlogPostView = ({ post, onBack, onOpenDownload }: { post: any; onBack: () => void; onOpenDownload: () => void }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-emerald-600 mb-6">
      <ChevronRight className="rotate-180" size={16} /> Back to Recipes
    </button>

    <div className="flex flex-col lg:flex-row gap-12">
      {/* Main Article Content */}
      <article className="flex-1">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
           <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">FP</div>
              <span>By {post.author}</span>
           </div>
           <span>•</span>
           <span>{post.date}</span>
        </div>

        <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover rounded-3xl mb-10 shadow-lg bg-gray-100" />

        <div className="prose prose-lg text-gray-700 max-w-none">
          <p className="lead text-xl text-gray-900 font-medium mb-6">
            Eating healthy doesn't have to mean boring salads. Our nutritional algorithm has identified the perfect balance of flavor and function for your budget.
          </p>
          
          <AdUnit label="In-Article Top" />

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. The Shopping List Hack</h2>
          <p className="mb-6">
            By focusing on "Base Ingredients" like quinoa and sweet potatoes, you can create 5 different meals from just 10 items. This lowers your cost per meal to under $3.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Featured Meal Plans</h2>
          <p className="mb-6">
            Here are the top generated plans for this week:
          </p>

          {/* Embedded Product Cards */}
          <div className="grid gap-6 my-8 not-prose">
             {generateMockResults("Blog Context").map((meal, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                   <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded">{meal.type}</span>
                        <span className="font-bold text-gray-900">{meal.cost}</span>
                      </div>
                      <h4 className="font-bold text-lg mb-1">{meal.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{meal.description}</p>
                      <button className="text-emerald-600 font-bold text-sm flex items-center gap-1 hover:underline">
                        View Full Recipe <ExternalLink size={14}/>
                      </button>
                   </div>
                </div>
             ))}
          </div>

          <AdUnit label="In-Article Middle" />
        </div>

        {/* Article CTA */}
        <div className="bg-emerald-900 text-white rounded-2xl p-8 mt-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
           <div className="w-20 h-20 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0">
              <Apple size={32} />
           </div>
           <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Get the 30-Day Plan?</h3>
              <p className="text-emerald-100 mb-4">Download the app to auto-generate your grocery list.</p>
              <button 
                onClick={onOpenDownload}
                className="bg-white text-emerald-900 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors inline-flex items-center gap-2"
              >
                Download App <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </article>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 space-y-8 shrink-0">
         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-24">
            <h4 className="font-bold text-gray-900 mb-4">Fresh Trends</h4>
            <div className="space-y-4">
               {[1,2,3].map((_, i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer">
                     <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                        <img src={`https://placehold.co/100x100/10b981/ffffff?text=Food+${i+1}`} className="w-full h-full object-cover"/>
                     </div>
                     <div>
                        <h5 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-emerald-600 transition-colors">5 Smoothies for Energy</h5>
                        <span className="text-xs text-gray-400">3 min read</span>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="my-6 border-t border-gray-100 pt-6">
               <AdUnit format="vertical" label="Sidebar Ad" />
            </div>

            <button 
              onClick={onOpenDownload}
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-colors"
            >
              Get FitPlate App
            </button>
         </div>
      </aside>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function Home() {
  const [view, setView] = useState('HOME'); // HOME, SEARCH_RESULTS, BLOG_LIST, BLOG_POST
  const [activePost, setActivePost] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(!query) return;
    setIsLoading(true);
    setView('SEARCH_RESULTS');
    
    setTimeout(() => {
       setResults(generateMockResults(query));
       setIsLoading(false);
    }, 2000);
  };

  const openBlog = () => setView('BLOG_LIST');
  
  const openPost = (post: any) => {
    setActivePost(post);
    setView('BLOG_POST');
    window.scrollTo(0,0);
  };

  const goHome = () => {
    setView('HOME');
    setQuery('');
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] font-sans text-gray-900 overflow-x-hidden pb-24 selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* TOP AD BANNER */}
      <div className="bg-emerald-600 text-white py-2 text-center text-xs font-bold tracking-widest uppercase">
         New: Instacart Integration Live • Save $20 on First Order
      </div>

      {/* NAVIGATION */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={goHome}>
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border-2 border-white bg-emerald-500">
                 {/* Ensure logo.png is in your public folder */}
                 <img src="/logo.png" alt="FitPlate" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter leading-none text-emerald-900">Fit<span className="text-emerald-600">Plate</span></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">AI Nutritionist</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={openBlog} className={`text-sm font-bold transition-colors ${view.includes('BLOG') ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-600'}`}>
                Recipes & Guides
              </button>
              <button className="text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors">Success Stories</button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Smartphone size={16} /> Get App
              </button>
            </div>

            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
           <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4">
              <button onClick={() => {openBlog(); setIsMenuOpen(false)}} className="block w-full text-left font-bold text-gray-600 hover:text-emerald-600">Recipes</button>
              <button onClick={() => setIsModalOpen(true)} className="block w-full bg-emerald-600 text-white py-3 rounded-lg font-bold">Get App</button>
           </div>
        )}
      </nav>

      {/* MAIN CONTENT SWITCHER */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* VIEW: HOME */}
        {view === 'HOME' && (
           <div className="flex flex-col items-center animate-in fade-in duration-700">
              <div className="max-w-5xl w-full text-center py-16 md:py-24 relative">
                 
                 <div className="inline-flex items-center gap-2 bg-white border border-emerald-100 shadow-sm rounded-full px-4 py-1.5 mb-8">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-emerald-800 tracking-wide uppercase">AI Engine v3.0 • Macro-Perfect</span>
                 </div>
                 
                 <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-8 leading-[1.1]">
                   Your Diet Plan. <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Your Rules.</span>
                 </h1>
                 
                 <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                    Stop forcing it. Tell us what you eat, what you hate, and what you can spend. We build the <span className="text-emerald-700 font-bold">Perfect Plate.</span>
                 </p>
                 
                 {/* Search Box */}
                 <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group z-10">
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative flex items-center bg-white rounded-full p-2 shadow-xl border border-gray-100">
                       <div className="pl-4 text-emerald-500">
                          <Leaf />
                       </div>
                       <input 
                         type="text" 
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                         placeholder="e.g. Keto, hate broccoli, $60 budget..." 
                         className="w-full px-4 py-4 text-lg font-medium outline-none bg-transparent text-gray-900 placeholder:text-gray-400"
                       />
                       <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-md">
                          Plan It
                       </button>
                    </div>
                 </form>

                 {/* Hero Image */}
                 <div className="mt-20 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative group">
                    {/* Ensure hero.png is in your public folder */}
                    <img src="/hero.png" alt="Kitchen" className="w-full object-cover hover:scale-105 transition-transform duration-1000" />
                    
                    {/* Floating HUD Elements */}
                    <div className="absolute bottom-8 left-8 hidden md:block animate-in slide-in-from-left duration-1000">
                        <div className="bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg flex items-center gap-4">
                            <div className="text-emerald-600 bg-emerald-100 p-3 rounded-full"><Scale size={24}/></div>
                            <div>
                                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Daily Target</div>
                                <div className="text-xl font-black text-gray-900">1,850 kcal</div>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>
              
              <AdUnit label="Home Hero Banner" />

              {/* Latest Blog Posts Section */}
              <div className="w-full mt-24">
                 <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2"><Utensils className="text-emerald-500"/> Fresh Guides</h2>
                    <button onClick={openBlog} className="text-emerald-600 font-bold hover:underline flex items-center gap-1">
                       View All <ArrowRight size={16} />
                    </button>
                 </div>
                 <div className="grid md:grid-cols-3 gap-8">
                    {MOCK_BLOG_POSTS.map(post => (
                       <BlogCard key={post.id} post={post} onClick={() => openPost(post)} />
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* VIEW: SEARCH RESULTS */}
        {view === 'SEARCH_RESULTS' && (
           <div className="min-h-[60vh]">
              {isLoading ? (
                 <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full border-4 border-gray-100 border-t-emerald-500 animate-spin"></div>
                        <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mt-6 text-gray-900 animate-pulse">Calculating Macros...</h3>
                    <p className="text-gray-500 text-sm">Scanning 250,000+ Ingredients</p>
                 </div>
              ) : (
                 <div className="animate-in fade-in slide-in-from-bottom-8">
                    <div className="flex items-center justify-between mb-8">
                       <h2 className="text-2xl font-black text-gray-900">Plan for: "{query}"</h2>
                       <button onClick={goHome} className="text-gray-500 font-bold hover:text-emerald-600">New Plan</button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                       {results.map((meal, i) => (
                          <div key={i} className="bg-white rounded-3xl p-1 border border-emerald-100 hover:shadow-xl transition-shadow group h-full flex flex-col">
                             <div className="bg-white rounded-[20px] p-6 h-full flex flex-col relative overflow-hidden">
                                 <div className="flex items-center justify-between mb-6">
                                     <div className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide ${
                                         meal.type === 'BALANCED' ? 'bg-blue-100 text-blue-600' : 
                                         meal.type === 'BUDGET' ? 'bg-green-100 text-green-600' : 
                                         'bg-orange-100 text-orange-600'
                                     }`}>
                                         {meal.type.replace('_', ' ')}
                                     </div>
                                     <div className="flex items-center gap-1 text-gray-400 font-bold text-sm"><Heart size={14} className="fill-red-500 text-red-500"/> 98% Match</div>
                                 </div>

                                 <h3 className="font-bold text-xl text-gray-900 mb-2 leading-tight">{meal.title}</h3>
                                 <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">{meal.description}</p>
                                 
                                 <div className="bg-gray-50 rounded-xl p-4 mb-6 flex justify-between items-center">
                                     <div>
                                         <div className="text-[10px] font-bold text-gray-400 uppercase">Cost</div>
                                         <div className="text-lg font-black text-gray-900">{meal.cost}</div>
                                     </div>
                                     <div className="text-right">
                                         <div className="text-[10px] font-bold text-gray-400 uppercase">Calories</div>
                                         <div className="text-lg font-black text-gray-900">{meal.calories}</div>
                                     </div>
                                 </div>

                                 <div className="flex flex-wrap gap-2 mb-6">
                                     {meal.ingredients.map((t:string) => (
                                         <span key={t} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md border border-emerald-100">{t}</span>
                                     ))}
                                 </div>

                                 <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                                     See Meal Plan
                                 </button>
                             </div>
                          </div>
                       ))}
                    </div>
                    <AdUnit label="Search Results Bottom" />
                 </div>
              )}
           </div>
        )}

        {/* VIEW: BLOG LIST */}
        {view === 'BLOG_LIST' && (
           <div className="animate-in fade-in">
              <div className="text-center py-16">
                 <h1 className="text-4xl font-black text-gray-900 mb-4">The Clean Kitchen</h1>
                 <p className="text-xl text-gray-500 max-w-2xl mx-auto">Science-backed guides to eating better, feeling stronger, and spending less.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                 {[...MOCK_BLOG_POSTS, ...MOCK_BLOG_POSTS].map((post, i) => (
                    <BlogCard key={i} post={post} onClick={() => openPost(post)} />
                 ))}
              </div>
              <div className="mt-16 text-center">
                 <button className="bg-white border-2 border-gray-200 text-gray-900 px-8 py-3 rounded-full font-bold hover:border-emerald-600 hover:text-emerald-600 transition-colors">
                    Load More Articles
                 </button>
              </div>
           </div>
        )}

        {/* VIEW: BLOG POST */}
        {view === 'BLOG_POST' && activePost && (
           <BlogPostView 
             post={activePost} 
             onBack={openBlog} 
             onOpenDownload={() => setIsModalOpen(true)} 
           />
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-emerald-100 pt-16 pb-32 mt-20">
         <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 rounded bg-emerald-500"></div>
               <span className="font-black text-xl text-emerald-900">FitPlate</span>
            </div>
            <div className="flex gap-8 mb-8 text-sm font-bold text-gray-500">
               <button onClick={openBlog} className="hover:text-emerald-600">Recipes</button>
               <button className="hover:text-emerald-600">Science</button>
               <button onClick={() => setIsModalOpen(true)} className="hover:text-emerald-600">App</button>
            </div>
            <p className="text-gray-400 text-sm">© 2025 FitPlate AI. Science-Backed Nutrition Engine.</p>
         </div>
      </footer>

      {/* STICKY FOOTER AD */}
      <AdUnit format="sticky" />

      {/* LEAD MAGNET MODAL */}
      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}