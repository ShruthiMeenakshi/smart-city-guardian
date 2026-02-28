import { AIChatbot } from '@/components/AIChatbot';

const ChatbotPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
        <p className="text-sm text-muted-foreground">Ask about waste management, ward scores, and system insights</p>
      </div>
      <div className="max-w-2xl">
        <AIChatbot />
      </div>
    </div>
  );
};

export default ChatbotPage;
