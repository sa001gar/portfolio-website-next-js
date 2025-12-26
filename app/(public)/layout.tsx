import { Sidebar } from "@/components/sidebar"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar />
      <main className="flex-1 md:pl-[280px] min-h-screen">
        {children}
        <div className="fixed inset-0 pointer-events-none bg-terminal-glow opacity-20 z-[-1]"></div>
      </main>
    </>
  )
}
