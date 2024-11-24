import { AuthProvider } from "@/providers";
import { MainLayout } from "./MainLayout";
import { BookmarksProvider } from "@/providers/bookmarks-provider";

export function AppLayout() {
  return (
    <AuthProvider>
      <BookmarksProvider>
        <MainLayout />
      </BookmarksProvider>
    </AuthProvider>
  );
}
