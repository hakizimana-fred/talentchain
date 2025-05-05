import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LeaderboardTable from "@/components/leader-board-table"

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 h-auto">
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="alltime">All Time</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly">
          <LeaderboardTable period="weekly" />
        </TabsContent>
        <TabsContent value="monthly">
          <LeaderboardTable period="monthly" />
        </TabsContent>
        <TabsContent value="alltime">
          <LeaderboardTable period="alltime" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
