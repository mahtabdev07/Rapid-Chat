import React from "react";
import { MessageCircle, Users, Send, Heart, Smile, Star } from "lucide-react";

const NoChatSelected = () => {
  // Animation for floating icons
  const floatingIcons = [
    { Icon: MessageCircle, delay: "0s", x: "10%", y: "20%" },
    { Icon: Users, delay: "0.5s", x: "80%", y: "15%" },
    { Icon: Send, delay: "1s", x: "15%", y: "70%" },
    { Icon: Heart, delay: "1.5s", x: "75%", y: "65%" },
    { Icon: Smile, delay: "2s", x: "25%", y: "45%" },
    { Icon: Star, delay: "2.5s", x: "70%", y: "40%" },
    { Icon: MessageCircle, delay: "3s", x: "45%", y: "25%" },
    { Icon: Users, delay: "3.5s", x: "55%", y: "75%" },
  ];

  return (
    <div className="flex-1 flex items-center justify-center relative overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {floatingIcons.map((item, index) => (
          <div
            key={index}
            className="absolute animate-bounce"
            style={{
              left: item.x,
              top: item.y,
              animationDelay: item.delay,
              animationDuration: "3s",
            }}
          >
            <item.Icon size={24} className="text-blue-400" />
          </div>
        ))}
      </div>

      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-700/20 rounded-full blur-2xl"></div>

      {/* Main Content */}
      <div className="text-center z-10 max-w-md mx-auto px-8">
        {/* Main Icon */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <MessageCircle size={48} className="text-white" />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
          Welcome to <span className="text-blue-400">Rapid Chat</span>
        </h1>

        {/* Call to Action */}
        <div className="text-slate-500 text-sm">
          Click on any contact to begin your conversation
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center space-x-4">
          <div
            className="w-3 h-3 bg-blue-400/30 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-3 h-3 bg-indigo-400/30 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-purple-400/30 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  );
};

export default NoChatSelected;
