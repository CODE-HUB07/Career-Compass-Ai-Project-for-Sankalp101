
import { Button } from "@/components/ui/button";
import { BrainCircuit, MessageCircleQuestion, Users } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const Header = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <header className="w-full py-4 px-4 sm:px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">CareerCompass AI</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="flex items-center gap-2"
        >
          <Link to="/developers">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Our Team</span>
          </Link>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => setChatbotOpen(true)}
        >
          <MessageCircleQuestion className="h-4 w-4" />
          <span className="hidden sm:inline">Need Help?</span>
        </Button>
      </div>
      
      <Dialog open={chatbotOpen} onOpenChange={setChatbotOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>CareerCompass Assistant</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-col gap-4">
              <div className="bg-muted p-3 rounded-lg text-sm">
                Hi there! How can I help you with your career exploration today?
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">How does the recommendation work?</Button>
                <Button variant="outline" className="w-full justify-start">Can I save my results?</Button>
                <Button variant="outline" className="w-full justify-start">How accurate are the recommendations?</Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setChatbotOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
