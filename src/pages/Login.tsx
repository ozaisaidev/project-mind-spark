
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#231733] to-zinc-900">
      <Card className="w-[370px] shadow-lg bg-[#1A1F2C] border-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white">
            <LogIn size={28} />
            Sign in
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label className="block text-zinc-300 text-sm font-mono mb-1" htmlFor="email">
                Email
              </label>
              <div className="flex items-center bg-[#222235] rounded-md px-2">
                <User className="w-4 h-4 text-zinc-400" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-white border-none focus-visible:ring-0 focus-visible:border-[#9b87f5] ml-2"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-zinc-300 text-sm font-mono mb-1" htmlFor="password">
                Password
              </label>
              <div className="flex items-center bg-[#222235] rounded-md px-2">
                <Lock className="w-4 h-4 text-zinc-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent text-white border-none focus-visible:ring-0 focus-visible:border-[#9b87f5] ml-2"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-2 bg-[#9b87f5] hover:bg-[#7E69AB] text-white text-base rounded-md"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </form>
          <div className="text-center mt-6 text-xs text-zinc-400 font-mono">
            <span>Demo only. Connect authentication for real login.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
