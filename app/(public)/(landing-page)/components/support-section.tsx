"use client"

import { useState, useEffect } from "react"
import { Heart, Check } from "lucide-react"

const chatMessages = [
  {
    id: 0,
    name: "Sarah",
    color: "#E91E63",
    message: "Just had my 6-week weigh-in and I've lost a stone! So happy with my progress 🎉",
    time: "10:39 pm",
    isUser: false
  },
  {
    id: 1,
    name: "Mark",
    color: "#FF9500", 
    message: "That's amazing! Well done! I'm in week 3 and down 7lbs so far 👏",
    time: "10:39 pm",
    isUser: false
  },
  {
    id: 2,
    name: "Sarah",
    color: "#E91E63",
    message: "Thanks! The appetite suppression has been a game-changer for me.",
    time: "10:39 pm",
    isUser: false
  },
  {
    id: 3,
    name: "",
    color: "",
    message: "Hi everyone! Just started my first week on 2.5mg. Anyone have tips for a beginner?",
    time: "10:39 pm",
    isUser: true
  },
  {
    id: 4,
    name: "Rebecca",
    color: "#128C7E",
    message: "Welcome! So glad you joined us! Make sure you drink LOTS of water and take it slow with meals!",
    time: "10:39 pm",
    isUser: false
  },
  {
    id: 5,
    name: "Lisa",
    color: "#AF52DE",
    message: "That's brilliant x Welcome to the group x You'll find loads of support here x",
    time: "10:39 pm",
    isUser: false
  },
  {
    id: 6,
    name: "Emma",
    color: "#E91E63",
    message: "I'm finding I get full after just a few bites now! Anyone else?",
    time: "10:39 pm",
    isUser: false
  },
  {
    id: 7,
    name: "Tom",
    color: "#FF9500",
    message: "Same here! I'm actually having to remind myself to eat sometimes 😊",
    time: "10:39 pm",
    isUser: false
  },
  {
    id: 8,
    name: "",
    color: "",
    message: "Does anyone have suggestions for dealing with first-week side effects? I'm feeling a bit nauseous today.",
    time: "10:39 pm",
    isUser: true
  },
  {
    id: 9,
    name: "Jeff (Medicspot Team)",
    color: "#5061f0",
    message: "Hi! Try smaller, more frequent meals and stay hydrated. Ginger tea can help too. If it persists, send me a message and our clinical team can support you 👍",
    time: "10:39 pm",
    isUser: false,
    isTeam: true
  },
  {
    id: 10,
    name: "claire",
    color: "#FF3B30",
    message: "ginger biscuits helped me loads with the nausea and drinking water little and often",
    time: "10:39 pm",
    isUser: false
  },
  {
    id: 11,
    name: "",
    color: "",
    message: "Thanks for the tips! I'll try the ginger. Is it normal to feel so full so quickly?",
    time: "10:39 pm",
    isUser: true
  },
  {
    id: 12,
    name: "Lisa",
    color: "#AF52DE",
    message: "Totally normal x It takes some getting used to x Try eating slower and smaller portions x",
    time: "10:39 pm",
    isUser: false
  },
  {
    id: 13,
    name: "Hayley",
    color: "#AF52DE",
    message: "The support in this group has made such a difference to my journey. Down 34lbs in 10 weeks and feeling great!",
    time: "10:39 pm",
    isUser: false
  },
  {
    id: 14,
    name: "Mark",
    color: "#FF9500",
    message: "That's incredible! This group keeps me motivated when things get tough.",
    time: "10:39 pm",
    isUser: false
  },
  {
    id: 15,
    name: "",
    color: "",
    message: "Wow, that's amazing progress! Hope I can get results like that! 😊",
    time: "10:39 pm",
    isUser: true
  }
]

export default function SupportSection() {
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (visibleMessages < chatMessages.length) {
        setVisibleMessages(prev => prev + 1)
        setIsScrolling(true)
        setTimeout(() => setIsScrolling(false), 500)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [visibleMessages])

  useEffect(() => {
    // Reset animation after all messages are shown
    if (visibleMessages >= chatMessages.length) {
      const resetTimeout = setTimeout(() => {
        setVisibleMessages(0)
      }, 5000)
      return () => clearTimeout(resetTimeout)
    }
  }, [visibleMessages])

  return (
    <div className="flex w-full max-w-7xl flex-col items-center gap-34 px-3 sm:px-6">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-16 px-6 py-6 xl:max-w-6xl xl:flex-row xl:px-8">
        
        {/* Chat Interface */}
        <div className="relative h-full w-full">
          <div className="ring-primary-950/10 aspect-[16/11] max-h-[350px] w-full cursor-default rounded-3xl bg-gray-400 bg-[url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=700&h=400&fit=crop&crop=center&auto=format&q=75)] bg-cover px-6 shadow-2xl ring-1 inset-ring-1 inset-ring-white/40 transition select-none">
            <div className="relative flex h-full flex-col">
              <div className="relative flex-1 overflow-y-auto px-3 py-8 [scrollbar-width:none]" style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
              }}>
                {chatMessages.slice(0, visibleMessages).map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`mt-2 flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-slide-in-from-bottom`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      opacity: index < visibleMessages ? 1 : 0
                    }}
                  >
                    <div
                      className={`relative max-w-[75%] rounded-2xl px-2.5 py-2 shadow ring ring-black/5 backdrop-blur-sm ${
                        msg.isUser 
                          ? 'bg-[#DCF8C6]/90' 
                          : 'bg-white/90'
                      }`}
                    >
                      {!msg.isUser && (
                        <div className="flex items-center gap-1 text-sm font-medium" style={{ color: msg.color }}>
                          {msg.name}
                          {msg.isTeam && (
                            <Check className="w-4 h-4 text-blue-500 bg-blue-500 rounded-full text-white p-0.5" />
                          )}
                        </div>
                      )}
                      <div className="relative pr-10 text-[15px]">
                        {msg.message}
                        <span className="absolute right-0 bottom-0 pb-[2px] pl-2 text-[11px] text-gray-500">
                          {msg.time}
                        </span>
                      </div>
                      <div className="absolute top-0 left-0 h-full w-full rounded-2xl inset-ring inset-ring-white/70"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex max-w-lg flex-col gap-6">
          <div className="flex items-center gap-2 text-3xl font-semibold text-balance sm:text-4xl">
            We're all here to support you
            <Heart className="text-primary-400 size-8 fill-current" />
          </div>
          
          <div className="flex flex-col gap-4 text-gray-600 lg:text-lg">
            <p>
              You will be invited to join our active WhatsApp community filled with people on the same journey as you.
            </p>
            <p>
              Share your wins, get advice when you're stuck, and find motivation when you need it.
            </p>
            <p>
              Our health coaches jump in with expert guidance, but often it's hearing from someone who's been there that makes all the difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}