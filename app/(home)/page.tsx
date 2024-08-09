import { useState } from "react";
import NewPlanForm from "@/components/NewPlanForm";
import { callOpenAIApi } from "@/lib/openai";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [plan, setPlan] = useState(null);
  const { toast } = useToast();

  const handleGeneratePlan = async (formData) => {
    try {
      const response = await callOpenAIApi(formData.prompt, formData.schema, formData.description);
      setPlan(response.data);
      toast({ title: "Plan generated successfully!" });
    } catch (error) {
      toast({ title: "Error generating plan", description: error.message });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Travel Planner</h1>
      <NewPlanForm onSubmit={handleGeneratePlan} />
      {plan && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Generated Plan</h2>
          <pre>{JSON.stringify(plan, null, 2)}</pre>
        </div>
      )}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Join our Email Waitlist</h2>
        <form action="/api/waitlist" method="POST">
          <input type="email" name="email" placeholder="Enter your email" required className="border p-2 rounded" />
          <Button type="submit" className="ml-2">Join Waitlist</Button>
        </form>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Support Us</h2>
        <form action="/api/donate" method="POST">
          <Button type="submit">Donate via Stripe</Button>
        </form>
      </div>
    </div>
  );
}