import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Loader2, ChefHat, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

const loginSchema = z.object({
  email: z.string().min(1, 'Email or username is required').refine(
    (val) => {
      // Allow email format or "admin" username
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val) || val.toLowerCase() === 'admin';
    },
    {
      message: 'Please enter a valid email address or username',
    }
  ),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    const result = await login(values.email, values.password);
    
    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setError(result.error || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 px-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      {/* Theme toggle in top right */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left side - Decorative/Info */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 px-8">
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <ChefHat className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Recipe App
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover amazing recipes from around the world. Cook, share, and enjoy delicious meals with our recipe collection.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>1000+ Recipes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Expert Curated</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Easy to Follow</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full flex justify-center lg:justify-end">
          <Card className="w-full max-w-md border-2 shadow-2xl backdrop-blur-sm bg-card/95">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex items-center justify-center mb-2">
                <div className="p-3 rounded-full bg-primary/10">
                  <ChefHat className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-center text-base">
                Sign in to continue your culinary journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email or Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="admin or your.email@example.com"
                            className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            className="h-11 transition-all focus:ring-2 focus:ring-primary/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {error && (
                    <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                      <p className="text-sm font-medium text-destructive text-center">
                        {error}
                      </p>
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account?{' '}
                      <Link 
                        to="/signup" 
                        className="text-primary hover:text-primary/80 font-semibold hover:underline transition-colors inline-flex items-center gap-1"
                      >
                        Sign up
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;

