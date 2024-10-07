"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { getStories } from "../lib/stories";
import { Story } from "../lib/stories";

dayjs.extend(relativeTime);

interface storyProps {
  stories?: Story[];
  ids: number[];
}

export default function Stories({ stories, ids }: storyProps) {
  const [currentStories, setCurrentStories] = useState(stories);
  const [pageNumber, setPageNumber] = useState(0);

  const loadMore = () => {
    console.log(pageNumber);
    setPageNumber((c) => c + 1);
    console.log(pageNumber);
  };

  const fetchStories = async () => {
    const newStories = await getStories(ids, pageNumber);
    setCurrentStories(newStories);
  };

  useEffect(() => {
    fetchStories();
  }, [pageNumber]);

  return (
    <div>
      <ul className="flex flex-col flex-grow space-y-2 m-2 mt-4 font-verdana text-sm">
        {currentStories.map(
          ({ url, title, by, descendants, score, id, time }, key) => (
            <li key={id} className="flex items-start space-x-2 text-sm">
              <span className="text-gray-500">
                {(pageNumber ?? 0) * 30 + key}.
              </span>
              <div className="flex-grow">
                <div className="flex items-end">
                  <FontAwesomeIcon
                    className="w-auto h-4 mr-1"
                    icon={faCaretUp}
                  />
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {title}
                  </a>
                  <span
                    className="text-gray-500 ml-1 cursor-pointer"
                    // onClick={() => handleFilteration(new URL(url).hostname)}
                  >
                    {url ? new URL(url).hostname : "N/A"}
                  </span>
                </div>
                <p className="text-gray-500">
                  {score} points by {by} | {dayjs(time * 1000).fromNow()} |{" "}
                  {descendants} comments
                </p>
              </div>
            </li>
          )
        )}
      </ul>
      <button onClick={loadMore}>More</button>
    </div>
  );
}
