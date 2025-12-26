import { TerminalLoader } from "@/components/terminal-loader"

export default function Loading() {
  return <TerminalLoader isLoading={true} loadingText="Loading blog posts" />
}
