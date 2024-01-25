import { atom } from 'recoil';

// 게시글 목록을 나타내는 atom
export const postListState = atom({
  key: 'postListState',
  default: [], // 기본값은 빈 배열
});

// 각 게시글의 좋아요 상태를 나타내는 atom
// 이 atom은 게시글의 id를 key로 사용하는 객체
export const likeState = atom({
  key: 'likeState',
  default: {}, // 기본값은 빈 객체
});
