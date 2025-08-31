import { useState } from 'react';
import Bookmark from '@assets/icons/bookmark.svg?react';

type Post = {
  id: number;
  author: string;
  tag: '씨앗' | '새싹' | '꿈나무' | string;
  content: string;
  time: string;
  comments: number;
};

const CommunityContents = () => {
  const posts: Post[] = [
    {
      id: 1,
      author: '해바라기 엄마',
      tag: '씨앗',
      content: '할일 내용내용',
      time: '2분 전',
      comments: 11,
    },
    {
      id: 2,
      author: '해바라기 엄마',
      tag: '새싹',
      content:
        '안녕안녕안녕하세요 이거의 내용은 어떻게 길어지냐면요 좀만 더 힘을 내 이렇게 길어져요 날 따라해 봐요 이렇게',
      time: '2분 전',
      comments: 12,
    },
    {
      id: 3,
      author: '해바라기 엄마',
      tag: '씨앗',
      content: '할일 내용내용',
      time: '2분 전',
      comments: 13,
    },
  ];

  const [added, setAdded] = useState<Record<number, boolean>>({});

  const toggleAdd = (id: number) =>
    setAdded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="mt-7 flex flex-col">
      {posts.map((post) => {
        const isAdded = !!added[post.id];

        return (
          <div
            key={post.id}
            className="flex w-full flex-col border-b border-gray-200 py-5"
          >
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-[9px]">
                <div className="h-[30px] w-[30px] rounded-full bg-gray-200" />
                <span className="text-gray-600 font-B02-M">{post.author}</span>
                <span className="rounded-lg bg-purple-100 p-[6px] text-purple-500 font-C01-R">
                  {' '}
                  {post.tag} 단계
                </span>
              </div>

              {isAdded ? (
                <button
                  onClick={() => toggleAdd(post.id)}
                  className="p-2 text-purple-500 font-B03-SB"
                >
                  추가 취소하기
                </button>
              ) : (
                <button
                  onClick={() => toggleAdd(post.id)}
                  className="flex items-center justify-center rounded-[10px] bg-purple-500 p-2 text-purple-50 font-B03-SB"
                >
                  내 할일에 추가
                </button>
              )}
            </div>

            <div
              className={`mt-[22px] ${isAdded ? 'ml-10 rounded-[14px] bg-purple-100 px-4 py-5' : 'pl-10'}`}
            >
              <span className="break-words text-black font-B01-SB">
                {post.content}
              </span>
              <span className="ml-[10px] whitespace-nowrap text-gray-500 font-C01-R">
                {post.time}
              </span>
            </div>

            <div className="mt-4 flex flex-row items-center pl-10">
              <div className="flex items-center gap-[6px]">
                <Bookmark />
                <div className="text-purple-600 font-B03-SB">
                  {post.comments}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommunityContents;
