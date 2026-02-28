import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const sampleResponses: Record<string, string> = {
  'default': "I'm the MadurAI assistant. I can help you understand ward scores, waste management practices, recycling methods, and system insights. What would you like to know?",
  'ward 12': "Ward 12 (Anna Nagar) currently ranks low with a governance score of 45/100. Key issues:\n• High recurrence rate: 35% of reports are repeat issues\n• Slow resolution: Average 7.3 hours vs city target of 3 hours\n• Low citizen participation: Only 32% engagement\n• 89 total reports with only 40 resolved\n\nRecommendation: Deploy additional collection crews and launch a citizen awareness campaign.",
  'recycling': "Madurai's circular economy potential is significant:\n• Plastic recycling: ₹18/kg revenue, 72% environmental impact reduction\n• Organic composting: ₹8/kg, creates 120 local jobs\n• E-Waste recovery: ₹250/kg, highest value stream\n• Paper pulping: ₹12/kg, 65% impact reduction\n\nTotal estimated monthly revenue: ₹4.2 lakhs across all waste streams.",
  'route': "Today's optimized routes prioritize 3 critical hotspots:\n1. Periyar Bus Stand (Severity 5, E-Waste) — 2hr overflow\n2. Thiruparankundram Main Rd (Severity 5, Hazardous) — 4hr overflow\n3. Pasumalai Hill Base (Severity 4, Mixed) — Active dump\n\nOptimized routing saves approximately 23% fuel compared to sequential collection.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('ward 12') || lower.includes('anna nagar') || lower.includes('ranked low')) return sampleResponses['ward 12'];
  if (lower.includes('recycl') || lower.includes('circular') || lower.includes('revenue')) return sampleResponses['recycling'];
  if (lower.includes('route') || lower.includes('optimi') || lower.includes('truck')) return sampleResponses['route'];
  return sampleResponses['default'];
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: '0', role: 'assistant', content: "Welcome to MadurAI Intelligence. I can answer questions about ward governance, waste management, recycling methods, and route optimization. Try asking: \"Why is Ward 12 ranked low?\"" },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(input);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="rounded-lg bg-card border border-border flex flex-col h-[500px] card-glow">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <div className="p-1.5 rounded-md bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">MadurAI Assistant</h3>
          <p className="text-[10px] text-muted-foreground">Powered by Gemini Pro</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                  <Bot className="h-3 w-3 text-primary" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}>
                <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-muted flex items-center justify-center mt-1">
                  <User className="h-3 w-3 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-3 w-3 text-primary" />
            </div>
            <div className="flex gap-1 p-3 bg-muted rounded-lg">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-3 border-t border-border flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about waste management..."
          className="flex-1 bg-input text-foreground text-sm rounded-md px-3 py-2 border border-border outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
        />
        <Button onClick={send} size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
