
import Header from "@/components/Header";
import CareerForm from "@/components/CareerForm";
import FloatingChatbot from "@/components/FloatingChatbot";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8 px-4 sm:px-6">
        <CareerForm />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} CareerCompass AI · AI-Powered Career Recommendations</p>
      </footer>
      <FloatingChatbot />
    </div>
  );
};

export default Index;
