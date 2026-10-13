export function GitHubStatsSkeleton() {
  return (
    <div className="bg-terminal-black border border-terminal-green/20 rounded-md p-6 space-y-6 animate-pulse">
      <div className="flex items-center justify-between pb-4 border-b border-terminal-green/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-md bg-terminal-green/10" />
          <div className="space-y-2">
            <div className="w-32 h-5 bg-terminal-green/20 rounded" />
            <div className="w-20 h-3 bg-terminal-green/10 rounded" />
          </div>
        </div>
        <div className="w-28 h-8 bg-terminal-green/10 rounded" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-md border border-terminal-green/15 bg-terminal-green/5 space-y-3">
            <div className="w-16 h-3 bg-terminal-green/15 rounded" />
            <div className="w-12 h-6 bg-terminal-green/25 rounded" />
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-2">
        <div className="w-28 h-3 bg-terminal-green/15 rounded" />
        <div className="h-2 w-full bg-terminal-green/10 rounded-full" />
      </div>
    </div>
  )
}

export function GitHubRepoCardSkeleton() {
  return (
    <div className="bg-terminal-black border border-terminal-green/20 rounded-md p-5 space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="w-36 h-5 bg-terminal-green/20 rounded" />
        <div className="w-5 h-5 bg-terminal-green/10 rounded" />
      </div>
      <div className="space-y-2">
        <div className="w-full h-3 bg-terminal-green/15 rounded" />
        <div className="w-3/4 h-3 bg-terminal-green/10 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="w-12 h-4 bg-terminal-green/10 rounded-full" />
        <div className="w-12 h-4 bg-terminal-green/10 rounded-full" />
      </div>
      <div className="pt-3 border-t border-terminal-green/10 flex justify-between items-center">
        <div className="w-16 h-3 bg-terminal-green/15 rounded" />
        <div className="w-20 h-3 bg-terminal-green/10 rounded" />
      </div>
    </div>
  )
}
