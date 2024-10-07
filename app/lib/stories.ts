"use server";

export type Story = {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

export type Stories = Story[];

export const getStories = async (
  data: number[],
  page_number: number
): Promise<Stories> => {
  const page_size = 30;
  const start = page_number * page_size;
  const end = start + page_size;

  const fetches = await Promise.all(
    data
      .slice(start, end)
      .map(async (id: number) =>
        fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/item/${id}.json?print=pretty`
        )
      )
  );

  const stories = await Promise.all(fetches.map((f) => f.json()));

  return stories;
};

export const getIDs = async (): Promise<number[]> => {
  console.log(process.env.NEXT_PUBLIC_API_URL);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
  const data = await response.json();
  return data;
};

// export const getAllStories = async (data: number[]): Promise<Stories> => {
//   const fetches = await Promise.all(
//     data.map(async (id: number) =>
//       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/item/${id}.json?print=pretty`)
//     )
//   );

//   const stories = await Promise.all(fetches.map((f) => f.json()));

//   return stories;
// };
