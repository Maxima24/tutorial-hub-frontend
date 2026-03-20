import { Sidebar } from "@/components/sidebar";


// Example layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="lg:ml-64 pt-16 lg:pt-4 px-4 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}

// If your sidebar can collapse to w-20 on desktop, use this instead:
// className="lg:ml-20 xl:ml-64 pt-16 lg:pt-4 px-4"
// Or drive it dynamically from the context:
// const { isCollapsedDesktop } = useSidebar();
// className={`${isCollapsedDesktop ? "lg:ml-20" : "lg:ml-64"} pt-16 lg:pt-4 px-4`}