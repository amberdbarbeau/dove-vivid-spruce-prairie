import { createFileRoute } from "@tanstack/react-router";
import { ImpactSheet } from "@/components/impact/sheet";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <ImpactSheet />;
}
