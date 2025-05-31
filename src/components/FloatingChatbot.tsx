
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircleQuestion, X } from "lucide-react";

const ChatbotMessage = ({ message, isUser = false }: { message: string, isUser?: boolean }) => (
  <div className={`${isUser ? 'ml-auto bg-primary text-white' : 'mr-auto bg-muted'} rounded-lg p-3 max-w-[80%] mb-2`}>
    {message}
  </div>
);

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your CareerCompass assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";
      
      if (userMessage.toLowerCase().includes("recommend") || userMessage.toLowerCase().includes("suggestion")) {
        botResponse = "To get personalized career recommendations, complete the questionnaire by answering all the questions about your skills and interests.";
      } else if (userMessage.toLowerCase().includes("save")) {
        botResponse = "Your results are automatically saved in your browser. You can also export them as a PDF using the Export button on the results page.";
      } else if (userMessage.toLowerCase().includes("accurate") || userMessage.toLowerCase().includes("reliable")) {
        botResponse = "Our recommendations are based on your specific profile data. The more information you provide, the more accurate the suggestions will be.";
      } else {
        botResponse = "I'm here to help with your career exploration. Feel free to ask about the questionnaire, recommendations, or saving your results!";
      }
      
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-white shadow-lg ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircleQuestion className="h-6 w-6" />
      </button>

      {/* Chatbot panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-card shadow-xl rounded-lg border overflow-hidden animate-scale-in">
          <div className="p-3 bg-primary text-white flex justify-between items-center">
            <span className="font-medium">CareerCompass Assistant</span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0 text-white hover:text-white hover:bg-primary/80">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-3 h-80 overflow-y-auto flex flex-col">
            {messages.map((message, index) => (
              <ChatbotMessage 
                key={index} 
                message={message.text} 
                isUser={message.isUser} 
              />
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="border-t p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button type="submit" size="sm">Send</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
