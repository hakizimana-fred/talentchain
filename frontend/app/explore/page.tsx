import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContentGrid from "@/components/content-grid"

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Vote For Your Favorites</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-4 md:grid-cols-5 h-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="photography">Photography</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="art">Art</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ContentGrid category="all" />
        </TabsContent>
        <TabsContent value="music">
          <ContentGrid category="music" />
        </TabsContent>
        <TabsContent value="photography">
          <ContentGrid category="photography" />
        </TabsContent>
        <TabsContent value="video">
          <ContentGrid category="video" />
        </TabsContent>
        <TabsContent value="art">
          <ContentGrid category="art" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
