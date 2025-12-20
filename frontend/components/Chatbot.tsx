"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sendChatbotMessage, ChatMessage } from "@/lib/chatbot-api";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, token } = useAuth();
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          user: "",
          assistant:
            "Hello! I'm IEM Assist, your AI helper for IEM Connect. How can I help you today?",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading || !token) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    // Add user message to conversation
    const newUserMessage: ChatMessage = {
      user: userMessage,
      assistant: "",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newUserMessage]);

    try {
      // Send to backend
      const response = await sendChatbotMessage(userMessage, messages);

      // Add assistant response
      const assistantMessage: ChatMessage = {
        user: userMessage,
        assistant: response.message,
        timestamp: response.timestamp,
      };

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = assistantMessage;
        return updated;
      });
    } catch (error: any) {
      console.error("Chatbot error:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.error ||
          "Failed to get response. Please try again.",
        variant: "destructive",
      });

      // Remove failed message
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!token) return null; // Don't show chatbot if not logged in

  return (
    <>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 z-50 transform transition-all hover:scale-110 animate-pulse"
          size="icon"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col border-2 border-slate-700 bg-slate-900 overflow-hidden">
          {/* Header with Gradient */}
          <CardHeader className="pb-3 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <MessageCircle className="h-5 w-5" />
                </div>
                IEM Assist
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-white/80 mt-1">Your AI-powered assistant</p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 bg-slate-900">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-900 to-slate-950">
              {messages.map((msg, index) => (
                <div key={index} className="space-y-3">
                  {msg.user && (
                    <div className="flex justify-end animate-in slide-in-from-right">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-lg">
                        <p className="text-sm leading-relaxed">{msg.user}</p>
                      </div>
                    </div>
                  )}
                  {msg.assistant && (
                    <div className="flex justify-start items-start gap-2 animate-in slide-in-from-left">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-slate-800 text-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[75%] shadow-lg border border-slate-700">
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {msg.assistant}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start items-start gap-2 animate-in slide-in-from-left">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-slate-800 rounded-2xl px-4 py-3 border border-slate-700">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area with Gradient Border */}
            <div className="border-t border-slate-700 p-4 bg-slate-900">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    disabled={loading}
                    className="flex-1 bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pr-12"
                  />
                </div>
                <Button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg disabled:opacity-50"
                  size="icon"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-3 text-center flex items-center justify-center gap-1">
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Powered by IEM Assist AI
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}

