export type PostType = {
    id: string;
    name: string;
    posterImg: string;

  };
  
  export const getPostList = (): Promise<PostType[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(PostCard), 500);
    });
  };