"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, FileDown } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    router.push(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 py-12"
        >
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Draw Together
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            A real-time collaborative drawing board where ideas come to life.
            Join a room and start creating together!
          </p>
        </motion.div>

        {/* About Developer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              About Me
            </h2>
            <p className="text-slate-600 mb-6">
              Hi, I&apos;m Kabeer! A frontend developer passionate about creating
              interactive web experiences. I specialize in React, React Native,
              and Next.js.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/kabeerx9"
                target="_blank"
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <Github className="h-6 w-6 text-slate-700" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/kabeer-joshi-7173061aa/"
                target="_blank"
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <Linkedin className="h-6 w-6 text-slate-700" />
              </Link>
              <Link
                href="https://drive.google.com/file/d/1KiiMp2zh1RDeB-0BDkda1BrIaPUnH6nP/view?usp=drive_link"
                target="_blank"
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <FileDown className="h-6 w-6 text-slate-700" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Join Room Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-center text-slate-900 mb-6">
              Join a Room
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="roomId"
                  className="block text-sm font-medium text-slate-700"
                >
                  Room ID
                </label>
                <input
                  type="text"
                  id="roomId"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full text-black p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter room ID"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-slate-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-black p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                type="submit"
              >
                Join Room
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
