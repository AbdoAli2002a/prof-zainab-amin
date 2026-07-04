import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { chatWithCV } from "../chatFn";

type Message = {
  role: "user" | "model";
  text: string;
  isTyping?: boolean;
};

function TypingEffect({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText(""); // Reset text if prop changes
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, 20);

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <>{displayedText}</>;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<Message[]>([
    { role: "model", text: "أهلاً بك! أنا المساعد الذكي الخاص بموقع أ.د. زينب محمد أمين. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن الأبحاث، المؤلفات، أو المسيرة العلمية." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isLoading]);

  const handleSend = async (suggestedMessage?: string) => {
    const textToSend = suggestedMessage || message;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    if (!suggestedMessage) {
      setMessage("");
    }
    
    setHistory((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithCV({ 
        data: { 
          message: userMsg, 
          history: history.slice(1).map(h => ({ role: h.role, text: h.text })) // exclude the initial greeting and extra props
        } 
      });

      if (response.success && response.text) {
        setHistory((prev) => [...prev, { role: "model", text: response.text, isTyping: true }]);
      } else {
        setHistory((prev) => [...prev, { role: "model", text: response.text || "حدث خطأ ما.", isTyping: true }]);
      }
    } catch (error) {
      setHistory((prev) => [...prev, { role: "model", text: "عذراً، حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.", isTyping: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypingComplete = (index: number) => {
    setHistory((prev) =>
      prev.map((msg, i) =>
        i === index ? { ...msg, isTyping: false } : msg
      )
    );
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-elegant z-50 bg-navy hover:bg-navy-deep text-gold"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 left-6 w-80 sm:w-96 shadow-elegant z-50 border-gold/20 flex flex-col h-[500px] max-h-[80vh]">
          <CardHeader className="bg-navy text-white rounded-t-xl py-3 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg font-display text-gold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              المساعد الذكي
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gold hover:bg-white/10 -me-2"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-full p-4" dir="rtl">
              <div className="flex flex-col gap-4">
                {history.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-navy text-white rounded-tl-none"
                          : "bg-muted text-foreground rounded-tr-none border border-border"
                      }`}
                    >
                      {msg.isTyping ? (
                        <TypingEffect
                          text={msg.text}
                          onComplete={() => handleTypingComplete(index)}
                        />
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-lg p-3 text-sm bg-muted text-foreground rounded-tr-none border border-border flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-navy" />
                      جاري الكتابة...
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-3 flex-col items-start gap-3 bg-muted/50 rounded-b-xl border-t">
            {history.length === 1 && !isLoading && (
              <div className="flex w-full gap-2 overflow-x-auto pb-1" dir="rtl" style={{ scrollbarWidth: "none" }}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="shrink-0 text-xs rounded-full bg-white text-navy hover:bg-gold/10 hover:text-navy border-navy/20 h-8" 
                  onClick={() => handleSend("ما هي أهم الأبحاث المنشورة؟")}
                >
                  ما هي أهم الأبحاث؟
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="shrink-0 text-xs rounded-full bg-white text-navy hover:bg-gold/10 hover:text-navy border-navy/20 h-8" 
                  onClick={() => handleSend("ما هي المؤلفات والكتب؟")}
                >
                  المؤلفات والكتب
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="shrink-0 text-xs rounded-full bg-white text-navy hover:bg-gold/10 hover:text-navy border-navy/20 h-8" 
                  onClick={() => handleSend("ما هي المؤهلات العلمية؟")}
                >
                  المؤهلات العلمية
                </Button>
              </div>
            )}
            <form
              className="flex w-full items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <Input
                placeholder="اكتب سؤالك هنا..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 text-sm bg-white"
                dir="rtl"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!message.trim() || isLoading}
                className="bg-navy hover:bg-navy-deep text-gold shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
