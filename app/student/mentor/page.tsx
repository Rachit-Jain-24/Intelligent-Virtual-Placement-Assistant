"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Send, Bot, User as UserIcon } from "lucide-react";
import { useState } from "react";

interface Message {
    id: number;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}

const initialMessages: Message[] = [
    {
        id: 1,
        role: "assistant",
        content: "Hello! I'm your AI Career Mentor. I can help you with career advice, interview preparation, resume tips, and more. How can I assist you today?",
        timestamp: new Date().toLocaleTimeString(),
    },
];

export default function MentorPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            role: "user",
            content: input,
            timestamp: new Date().toLocaleTimeString(),
        };

        setMessages([...messages, userMessage]);
        setInput("");

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: messages.length + 2,
                role: "assistant",
                content: "Thank you for your question! Based on your profile and current readiness score, I recommend focusing on improving your system design skills and practicing more technical interviews. Would you like specific resources for either of these areas?",
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages((prev) => [...prev, aiMessage]);
        }, 1000);
    };

    return (
        <DashboardLayout role="student" userName="Rachit Jain">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">AI Career Mentor</h1>
                    <p className="text-muted-foreground">Get personalized career guidance powered by AI</p>
                </div>

                <Card className="flex h-[600px] flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bot className="h-5 w-5" />
                            Chat with your AI Mentor
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                        {/* Messages */}
                        <div className="mb-4 flex-1 space-y-4 overflow-y-auto">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {message.role === "assistant" && (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                            <Bot className="h-4 w-4" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[70%] rounded-lg p-3 ${message.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-secondary"
                                            }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <p className="mt-1 text-xs opacity-70">
                                            {message.timestamp}
                                        </p>
                                    </div>
                                    {message.role === "user" && (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                                            <UserIcon className="h-4 w-4" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Ask me anything about your career..."
                                className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                            <Button onClick={handleSend}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Suggested Questions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Suggested Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-2 md:grid-cols-2">
                            <Button
                                variant="outline"
                                className="justify-start text-left"
                                onClick={() => setInput("How can I improve my resume?")}
                            >
                                How can I improve my resume?
                            </Button>
                            <Button
                                variant="outline"
                                className="justify-start text-left"
                                onClick={() => setInput("What skills should I focus on?")}
                            >
                                What skills should I focus on?
                            </Button>
                            <Button
                                variant="outline"
                                className="justify-start text-left"
                                onClick={() => setInput("How do I prepare for technical interviews?")}
                            >
                                How do I prepare for technical interviews?
                            </Button>
                            <Button
                                variant="outline"
                                className="justify-start text-left"
                                onClick={() => setInput("What companies should I apply to?")}
                            >
                                What companies should I apply to?
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
