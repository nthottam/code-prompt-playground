import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // SEO
    document.title = isLogin ? "Log in | AI LeetCode" : "Sign up | AI LeetCode";
    const meta = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', window.location.href);
    if (!canonical.parentNode) document.head.appendChild(canonical);
    if (meta) {
      meta.setAttribute('content', 'Sign in or sign up to save your coding history and AI analyses.');
    } else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = 'Sign in or sign up to save your coding history and AI analyses.';
      document.head.appendChild(m);
    }
  }, [isLogin]);

  useEffect(() => {
    // Listen for auth changes first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        navigate('/');
      }
    });

    // Then get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) navigate('/');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl }
      });
      if (error) throw error;
      toast({ title: 'Check your email', description: 'Confirm your address to complete signup.' });
    } catch (e: any) {
      toast({ title: 'Sign up failed', description: e.message ?? 'Unknown error', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: 'Welcome back', description: 'You are now signed in.' });
      navigate('/');
    } catch (e: any) {
      toast({ title: 'Login failed', description: e.message ?? 'Unknown error', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold">{isLogin ? 'Log in to AI LeetCode' : 'Create your AI LeetCode account'}</h1>
          <p className="text-sm text-muted-foreground mt-2">Save submissions, history, and AI analyses.</p>
        </header>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Button className="w-full" onClick={isLogin ? handleSignIn : handleSignUp} disabled={loading}>
            {loading ? 'Please wait…' : isLogin ? 'Log in' : 'Sign up'}
          </Button>

          <Button variant="ghost" className="w-full" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </Button>

          <Button variant="secondary" className="w-full" onClick={() => (window.location.href = '/')}>Back to Home</Button>
        </div>
      </Card>
    </main>
  );
};

export default Auth;
