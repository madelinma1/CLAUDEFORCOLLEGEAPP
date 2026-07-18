import AppShell from "@/components/AppShell";

/**
 * The whole product renders inside a single client shell that holds the routed
 * screen state — faithful to the prototype's single-page architecture. Each
 * screen is a component under components/screens.
 */
export default function Page() {
  return <AppShell />;
}
