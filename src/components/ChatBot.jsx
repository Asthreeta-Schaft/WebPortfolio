import { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm here to assist you. Ask me anything!" },
  ]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    if (!chatRef.current) return;
    setDragging(true);
    const rect = chatRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!dragging || !chatRef.current) return;
    chatRef.current.style.left = `${e.clientX - dragOffset.current.x}px`;
    chatRef.current.style.top = `${e.clientY - dragOffset.current.y}px`;
  };

  const onMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  const toggleChat = () => setIsOpen((o) => !o);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const lower = input.toLowerCase();
    let response = "I'm not sure how to respond to that.";

    if (/hello|hi|hey|hii/.test(lower)) response = "Hi there! How can I help you today?";
    else if (/how are you/.test(lower)) response = "Doing great, thanks!";
    else if (/thanks|thank you|thankyou/.test(lower)) response = "You're welcome!";
    else if (/project|projects/.test(lower)) response = "Check out my Projects section!";
    else if (/contact|contacts/.test(lower)) response = "Use the Contact form or my email link.";
    else if (/skill|skills/.test(lower)) response = "I work mainly with React, Tailwind CSS, Node.js.";
    else if (/your name|name|what is your name/.test(lower)) response = "I'm your portfolio assistant bot.";

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 500);

    setInput("");
  };

  return (
    <>
      {/* Floating Icon */}
      <button
        className="fixed bottom-6 right-6 z-50 p-2 rounded-full hover:scale-105 transition-transform duration-200 cursor-pointer"
        onClick={toggleChat}
        aria-label="Toggle Chat"
      >
        <img
          src="/images/chatbot-icon.png"
          alt="Chatbot"
          className="w-14 h-14 object-contain"
        />
      </button>

      {/* Chat Panel */}
      <div
      ref={chatRef}
      className={`fixed z-[9999] flex flex-col border border-gray-300 bg-white rounded-2xl shadow-2xl
              w-[90%] max-w-[380px] h-[500px] bottom-24 right-4 sm:right-6 sm:bottom-28 sm:w-[380px]
              transition-all duration-500 ease-in-out transform
              ${isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}`}
        >

  {/* Header */}
  <div
    className="bg-green-500 text-white p-4 font-bold rounded-t-2xl cursor-move"
    onMouseDown={onMouseDown}
  >
    Portfolio Assistant
  </div>

  {/* Chat Messages */}
  <div className="flex-1 p-3 overflow-y-auto text-sm flex flex-col gap-2">
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`px-4 py-2 rounded-xl max-w-[75%] break-words ${
          msg.sender === "bot"
            ? "bg-gray-200 text-gray-800 self-start"
            : "bg-blue-500 text-white self-end"
        }`}
      >
        {msg.text}
      </div>
    ))}
  </div>

  {/* Input */}
  <div className="p-3 border-t flex gap-2 bg-white">
    <input
      type="text"
      className="flex-1 text-sm p-2 border border-gray-400 text-black bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Type... projects / contact / skills"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
    />
    <button
      onClick={handleSend}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-bold cursor-pointer"
    >
      Send
    </button>
  </div>
</div>

    </>
  );
};

export default ChatBot;
