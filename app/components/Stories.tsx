import { Links, Story } from "../lib/definitions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface StoriesProps {
  stories: Story[];
  index?: number;
}

function Stories({ stories, index }: StoriesProps) {
  //   const navigate = useNavigate();

  const handleFilteration = (url: string) => {
    // navigate(`/filtered?domain=${url}`);
  };

  return (
    <ul className="flex flex-col flex-grow space-y-2 m-2 mt-4 font-verdana text-sm">
      {stories.map(({ url, title, by, descendants, score, id, time }, key) => (
        <li key={id} className="flex items-start space-x-2 text-sm">
          <span className="text-gray-500">{(index ?? 0) * 30 + key}.</span>
          <div className="flex-grow">
            <div className="flex items-end">
              <FontAwesomeIcon className="w-auto h-4 mr-1" icon={faCaretUp} />
              <a href={url} target="_blank" rel="noopener noreferrer">
                {title}
              </a>
              <span
                className="text-gray-500 ml-1 cursor-pointer"
                onClick={() => handleFilteration(new URL(url).hostname)}
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
      ))}
    </ul>
  );
}

export default Stories;
