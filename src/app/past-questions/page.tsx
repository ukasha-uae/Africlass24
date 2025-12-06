import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BrainCircuit } from "lucide-react";
import Link from "next/link";

export default function PastQuestionsPage() {
    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold font-headline">Past Questions & Quizzes</h1>
                <p className="text-muted-foreground mt-2">
                    Test your knowledge with BECE past questions and adaptive quizzes.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <BrainCircuit className="mr-2 h-6 w-6 text-primary" />
                            Adaptive AI Quiz
                        </CardTitle>
                        <CardDescription>
                            Generate a personalized quiz based on your strengths and weaknesses in any subject and topic.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href="/quiz">
                                Create a Quiz
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle>Coming Soon: BECE Past Questions</CardTitle>
                        <CardDescription>
                            Practice with a comprehensive library of past questions from the Basic Education Certificate Examination.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button disabled className="w-full">
                            Browse Past Questions
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
