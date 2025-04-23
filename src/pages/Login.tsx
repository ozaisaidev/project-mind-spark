
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn, User, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a frontend-only demo – implement authentication with Supabase or Clerk!
    alert("This demo does not include actual authentication.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2E3137] to-[#222228]">
      <Card className="w-[370px] shadow-lg bg-[#232528] border-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white font-mono">
            <LogIn size={28} className="text-ocean-blue-500" />
            Sign in
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label className="block text-gray-300 text-sm font-mono mb-1" htmlFor="email">
                Email
              </label>
              <div className="flex items-center bg-[#26282E] rounded-md px-2">
                <User className="w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-white border-none focus-visible:ring-0 focus-visible:border-[#0EA5E9] ml-2 font-mono"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-mono mb-1" htmlFor="password">
                Password
              </label>
              <div className="flex items-center bg-[#26282E] rounded-md px-2">
                <Lock className="w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent text-white border-none focus-visible:ring-0 focus-visible:border-[#0EA5E9] ml-2 font-mono"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-2 bg-[#0EA5E9] hover:bg-[#1EAEDB] text-white text-base rounded-md font-mono"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </form>
          <div className="text-center mt-6 text-xs text-gray-400 font-mono">
            <span>Demo only. Connect authentication for real login.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
