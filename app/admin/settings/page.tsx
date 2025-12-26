export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-terminal-bright">Settings</h1>
      <div className="border border-terminal-green/20 rounded-md p-6 bg-terminal-black/50">
        <p className="text-terminal-green/80 mb-4">
          Configuration options for the portfolio will appear here.
        </p>
        <p className="text-sm text-terminal-green/60">
            Current Environment: <span className="text-terminal-bright font-mono">Production</span>
        </p>
      </div>
    </div>
  )
}
