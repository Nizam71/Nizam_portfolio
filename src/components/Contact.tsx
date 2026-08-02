import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Lock, X, Send, Database, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CollabMessage {
  id?: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function Contact() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCollabOpen, setIsCollabOpen] = useState(false);
  
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  const [collabForm, setCollabForm] = useState({ name: '', email: '', message: '' });
  const [messages, setMessages] = useState<CollabMessage[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchMessages();
    }
  }, [isAdminLoggedIn]);

  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    const { data, error } = await supabase
      .from('collaborations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching messages:', error);
    } else if (data) {
      setMessages(data);
    }
    setIsLoadingMessages(false);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === 'shaikmahammadnizam@gmail.com' && adminPassword === 'nizam123@123') {
      setIsAdminLoggedIn(true);
      setAdminError('');
    } else {
      setAdminError('Invalid email or password');
    }
  };
  
  const handleCollabSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newMsg = {
      name: collabForm.name,
      email: collabForm.email,
      message: collabForm.message
    };
    
    const { error } = await supabase
      .from('collaborations')
      .insert([newMsg]);
      
    setIsSubmitting(false);

    if (error) {
      alert('Error saving message: ' + error.message + '\n\nPlease ensure you have created the "collaborations" table in Supabase with columns: id, name, email, message, created_at');
    } else {
      alert('Thank you for your message! I will get back to you soon.');
      setIsCollabOpen(false);
      setCollabForm({ name: '', email: '', message: '' });
      if (isAdminLoggedIn) {
        fetchMessages();
      }
    }
  };

  return (
    <>
      {/* Top Right Collaborate Button */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => setIsCollabOpen(true)}
          className="bg-[#d91b23] hover:bg-[#b0141b] text-white text-[10px] font-bold tracking-widest uppercase px-6 py-3 rounded-full transition-colors shadow-lg flex items-center gap-2"
        >
          <Send size={12} />
          Collaborate
        </button>
      </div>

      <section className="w-full bg-[#050505] pt-32 pb-40 md:pb-32 border-t border-white/5 relative overflow-hidden" id="contact">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-radial-gradient from-[#d91b23]/10 to-transparent blur-3xl"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-8xl font-['Bebas_Neue'] text-white mb-6 tracking-wider">
              LET'S WORK <span className="text-[#d91b23]">TOGETHER</span>
            </h2>
            <p className="text-neutral-400 mb-12 max-w-xl mx-auto text-[13px] leading-relaxed">
              Currently available for freelance projects and open to full-time opportunities. Feel free to reach out.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
              <a href="tel:7075082841" className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 rounded-full border border-neutral-800 bg-[#0a0a0a] flex items-center justify-center group-hover:border-[#d91b23] transition-colors shadow-lg">
                  <Phone size={24} className="text-[#d91b23] group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-500 text-[10px] tracking-widest uppercase mb-1">Call Me</span>
                  <span className="text-white text-[15px] tracking-wider font-medium">7075082841</span>
                </div>
              </a>
              
              <a href="mailto:shaikmahammadnizam@gmail.com" className="flex flex-col items-center gap-4 group">
                <div className="w-16 h-16 rounded-full border border-neutral-800 bg-[#0a0a0a] flex items-center justify-center group-hover:border-[#d91b23] transition-colors shadow-lg">
                  <Mail size={24} className="text-[#d91b23] group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col">
                  <span className="text-neutral-500 text-[10px] tracking-widest uppercase mb-1">Email Me</span>
                  <span className="text-white text-[15px] tracking-wider font-medium">shaikmahammadnizam@gmail.com</span>
                </div>
              </a>
            </div>
          </div>

          {/* Inline Collab Form in the middle */}
          <div className="max-w-md mx-auto bg-[#0a0a0a] p-8 rounded-2xl border border-white/5 shadow-2xl relative">
            <div className="flex flex-col items-center mb-6">
              <h3 className="text-xl font-bold tracking-widest text-white uppercase">Start a Project</h3>
              <p className="text-neutral-500 text-[10px] tracking-widest uppercase mt-2 text-center">Fill the details to collaborate</p>
            </div>
            <form onSubmit={handleCollabSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] text-neutral-400 tracking-widest uppercase mb-1 block">Name</label>
                <input 
                  type="text" 
                  value={collabForm.name}
                  onChange={(e) => setCollabForm({...collabForm, name: e.target.value})}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d91b23] transition-colors text-sm"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] text-neutral-400 tracking-widest uppercase mb-1 block">Email</label>
                <input 
                  type="email" 
                  value={collabForm.email}
                  onChange={(e) => setCollabForm({...collabForm, email: e.target.value})}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d91b23] transition-colors text-sm"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] text-neutral-400 tracking-widest uppercase mb-1 block">Message</label>
                <textarea 
                  value={collabForm.message}
                  onChange={(e) => setCollabForm({...collabForm, message: e.target.value})}
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d91b23] transition-colors text-sm min-h-[100px] resize-none"
                  placeholder="How can we work together?"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-neutral-200 text-black font-bold tracking-widest uppercase py-3 rounded-lg mt-2 transition-colors text-[11px] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-6 border-t border-white/5 bg-[#050505] z-40">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-neutral-600 text-[10px] tracking-widest uppercase">
              &copy; {new Date().getFullYear()} Shaik Mahammad Nizam. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsAdminOpen(true)}
                className={`text-[10px] font-bold tracking-widest uppercase px-6 py-3 rounded-full transition-colors flex items-center gap-2 ${isAdminLoggedIn ? 'bg-[#d91b23] text-white' : 'text-neutral-500 hover:text-white border border-white/10 hover:border-white/30'}`}
              >
                <Lock size={12} />
                {isAdminLoggedIn ? 'Admin Dashboard' : 'Admin'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsAdminOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0a0a0a] border border-white/10 p-8 w-full max-w-2xl rounded-2xl shadow-2xl max-h-[80vh] flex flex-col"
            >
              <button 
                onClick={() => setIsAdminOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              {isAdminLoggedIn ? (
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="flex items-center gap-3 mb-6">
                    <Database size={24} className="text-[#d91b23]" />
                    <h3 className="text-2xl font-bold tracking-widest text-white uppercase">Submissions</h3>
                  </div>
                  
                  <div className="overflow-y-auto pr-2 space-y-4">
                    {isLoadingMessages ? (
                      <div className="flex items-center gap-2 text-neutral-400 p-4">
                        <Loader2 size={16} className="animate-spin" />
                        <span className="text-sm">Loading messages...</span>
                      </div>
                    ) : messages.length === 0 ? (
                      <p className="text-neutral-500 text-sm italic">No collaboration requests yet.</p>
                    ) : (
                      messages.map((msg, idx) => (
                        <div key={msg.id || idx} className="bg-[#111] p-4 rounded-xl border border-white/5">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="text-white font-bold">{msg.name}</h4>
                              <a href={`mailto:${msg.email}`} className="text-[#d91b23] text-xs hover:underline">{msg.email}</a>
                            </div>
                            <span className="text-neutral-600 text-[10px]">{msg.created_at ? new Date(msg.created_at).toLocaleString() : ''}</span>
                          </div>
                          <p className="text-neutral-300 text-sm mt-3 bg-[#0a0a0a] p-3 rounded-lg">{msg.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      setIsAdminLoggedIn(false);
                      setAdminEmail('');
                      setAdminPassword('');
                    }}
                    className="mt-6 text-[10px] tracking-widest uppercase text-neutral-500 hover:text-white transition-colors self-start"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="max-w-md mx-auto w-full">
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-[#111] border border-white/5 flex items-center justify-center mb-4">
                      <Lock size={24} className="text-[#d91b23]" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-widest text-white uppercase">Admin Access</h3>
                    <p className="text-neutral-500 text-[10px] tracking-widest uppercase mt-2">Restricted Area</p>
                  </div>
                  <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
                    <div>
                      <label className="text-[10px] text-neutral-400 tracking-widest uppercase mb-1 block">Email</label>
                      <input 
                        type="email" 
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d91b23] transition-colors text-sm"
                        placeholder="Enter email"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-neutral-400 tracking-widest uppercase mb-1 block">Password</label>
                      <input 
                        type="password" 
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d91b23] transition-colors text-sm"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                    
                    {adminError && (
                      <p className="text-[#d91b23] text-[11px] text-center font-medium mt-2 tracking-wide">{adminError}</p>
                    )}

                    <button 
                      type="submit"
                      className="w-full bg-[#d91b23] hover:bg-[#b0141b] text-white font-bold tracking-widest uppercase py-3 rounded-lg mt-4 transition-colors text-[11px]"
                    >
                      Login
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {isCollabOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsCollabOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#0a0a0a] border border-white/10 p-8 w-full max-w-md rounded-2xl shadow-2xl"
            >
              <button 
                onClick={() => setIsCollabOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-[#111] border border-white/5 flex items-center justify-center mb-4">
                  <Send size={24} className="text-[#d91b23]" />
                </div>
                <h3 className="text-2xl font-bold tracking-widest text-white uppercase">Collaborate</h3>
                <p className="text-neutral-500 text-[10px] tracking-widest uppercase mt-2 text-center max-w-[200px]">Send me a message to start a project</p>
              </div>

              <form onSubmit={handleCollabSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-[10px] text-neutral-400 tracking-widest uppercase mb-1 block">Name</label>
                  <input 
                    type="text" 
                    value={collabForm.name}
                    onChange={(e) => setCollabForm({...collabForm, name: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d91b23] transition-colors text-sm"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 tracking-widest uppercase mb-1 block">Email</label>
                  <input 
                    type="email" 
                    value={collabForm.email}
                    onChange={(e) => setCollabForm({...collabForm, email: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d91b23] transition-colors text-sm"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 tracking-widest uppercase mb-1 block">Message</label>
                  <textarea 
                    value={collabForm.message}
                    onChange={(e) => setCollabForm({...collabForm, message: e.target.value})}
                    className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d91b23] transition-colors text-sm min-h-[100px] resize-none"
                    placeholder="How can we work together?"
                    required
                  />
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-neutral-200 font-bold tracking-widest uppercase py-3 rounded-lg mt-4 transition-colors text-[11px] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
