'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  Shield,
  FileText,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Twitter,
  Heart,
} from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto p-3 sm:p-4 md:p-6 lg:p-8 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold">SmartJHS</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Ghana's Premier Educational Platform for Junior High Students
          </p>
          <Badge variant="secondary" className="mt-2">Version 1.0.0</Badge>
        </div>

        {/* Mission Statement */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              SmartJHS is dedicated to transforming education in Ghana by providing every Junior High School student 
              with access to quality learning resources, interactive lessons, and collaborative tools that prepare 
              them for the BECE and beyond.
            </p>
            <p>
              We believe that every student deserves the opportunity to excel, regardless of their location or 
              economic background. Through innovative technology and deep understanding of the Ghanaian curriculum, 
              we're making quality education accessible to all.
            </p>
          </CardContent>
        </Card>

        {/* Features Highlight */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What We Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  📚 Comprehensive Curriculum
                </h3>
                <p className="text-sm text-muted-foreground">
                  Complete coverage of all JHS subjects aligned with Ghana Education Service standards
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  🎮 Interactive Learning
                </h3>
                <p className="text-sm text-muted-foreground">
                  Gamified lessons, quizzes, and challenges that make learning fun and engaging
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  ⚔️ Challenge Arena
                </h3>
                <p className="text-sm text-muted-foreground">
                  Compete with classmates and schools across Ghana in real-time quiz battles
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  👥 Social Learning
                </h3>
                <p className="text-sm text-muted-foreground">
                  Study groups, Q&A community, and achievement sharing for collaborative growth
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  📊 Progress Tracking
                </h3>
                <p className="text-sm text-muted-foreground">
                  Detailed analytics for students, parents, and teachers to monitor improvement
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  🏫 School Integration
                </h3>
                <p className="text-sm text-muted-foreground">
                  Connect with your school, track rankings, and participate in inter-school competitions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:support@smartjhs.edu.gh" className="text-sm text-primary hover:underline">
                  support@smartjhs.edu.gh
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Phone</p>
                <a href="tel:+233300000000" className="text-sm text-primary hover:underline">
                  +233 30 000 0000
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-muted-foreground">
                  Accra Digital Centre<br />
                  Accra, Ghana
                </p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex gap-4">
              <Button variant="outline" size="sm" asChild>
                <a href="https://twitter.com/smartjhs" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://github.com/smartjhs" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://smartjhs.edu.gh" target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Legal Links */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Legal & Policies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/privacy-policy">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Privacy Policy
              </Button>
            </Link>
            <Link href="/terms-of-service">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Terms of Service
              </Button>
            </Link>
            <Link href="/code-of-conduct">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Student Code of Conduct
              </Button>
            </Link>
            <Link href="/accessibility">
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Accessibility Statement
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Acknowledgments */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Acknowledgments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              SmartJHS is built in collaboration with educators, curriculum specialists, and students across Ghana 
              to ensure our content meets the highest standards of educational excellence.
            </p>
            <p>
              Special thanks to the Ghana Education Service, WAEC, and participating schools for their guidance 
              and support in developing this platform.
            </p>
            <div className="flex items-center gap-2 text-primary pt-2">
              <Heart className="h-4 w-4 fill-current" />
              <span>Made with love for Ghana's future leaders</span>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 SmartJHS. All rights reserved.</p>
          <p className="mt-2">Empowering Ghana's students, one lesson at a time.</p>
        </div>
      </div>
    </div>
  );
}
