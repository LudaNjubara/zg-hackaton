import { RecentlyViewed } from "@/features/recently-viewed";
import { Search } from "@/features/search";
import EventScrollFeed from "@/features/tiktokFeed/Feed";


export function HomePage() {
  

 //<>
  return (
    <div>
      <div className="flex gap-10">
        <Search className="bg-primary" />
      </div>
      <EventScrollFeed />
    </div>
  );
}
