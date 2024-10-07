"use client";

import { getIDs, getStories } from "./lib/stories";
import Stories from "./components/Stories";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  // First query to get the IDs of the stories
  const {
    data: storyIds,
    isError: isStoryIdsError,
    error: storyIdsError,
    isLoading: isStoryIdsLoading,
  } = useQuery({
    queryKey: ["storyIds"],
    queryFn: async () => {
      const ids = await getIDs();
      console.log("Fetched story IDs: ", ids);
      return ids;
    },
  });

  //ask moosa do not understand

  // const {
  //   data: initialStories,
  //   isError: isStoriesError,
  //   error: storiesError,
  //   isLoading: isStoriesLoading,
  // } = useQuery({
  //   queryKey: storyIds ? ["stories", storyIds] : ["stories"],
  //   queryFn: () => async () => {
  //     const stories = await getStories(storyIds!, 0);

  //     return stories;
  //   },
  //   enabled: !!storyIds,
  // });

  const {
    data: initialStories,
    isError: isStoriesError,
    error: storiesError,
    isLoading: isStoriesLoading,
  } = useQuery({
    queryKey: storyIds ? ["stories", storyIds] : ["stories"],
    queryFn: () => getStories(storyIds!, 0),

    enabled: !!storyIds,
  });

  if (isStoryIdsLoading) {
    return <span>Loading story IDs...</span>;
  }

  if (isStoryIdsError) {
    return <span>Error fetching story IDs: {storyIdsError.message}</span>;
  }

  if (isStoriesLoading) {
    return <span>Loading stories...</span>;
  }

  if (isStoriesError) {
    return <span>Error fetching stories: {storiesError.message}</span>;
  }

  return (
    <div className="w-full md:w-10/12 md:mt-2 mb-2 mx-auto bg-[#f6f6ef] min-h-screen text-sm flex flex-col">
      {storyIds && initialStories && (
        <Stories stories={initialStories} ids={storyIds} />
      )}
    </div>
  );
}
