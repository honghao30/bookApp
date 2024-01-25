import { useEffect, useState } from 'react';
import PostCard from './PostCard'
import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, isLoggedInState } from '../../recoil/authAtom';
import { postListState, likeState } from '../../recoil/posterAtom';

export const PostList: React.FC  = () => {
    // const user = useRecoilValue(userState);    
    const [userInfo, setUserInfo] = useState(null);    
    const setIsLoggedIn = useSetRecoilState(isLoggedInState);
    const [postList, setPostList] = useRecoilState(postListState);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);
          console.log(userInfo);                  
          setUserInfo(userInfo);
          setIsLoggedIn(true);
        }
        const fetchPostList = async () => {
            const response = await axios.get("https://shell-power-umbrella.glitch.me/posts");
            const postList = response.data; // 데이터를 가져옵니다.
            console.log(postList)
            setPostList(postList);
        };
        fetchPostList();

      }, [setIsLoggedIn]);    
    return (
        <div className="post-list__wrap">
            <ul>
            {postList && postList.length > 0 ? (
                postList.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            ) : (
                <div className='nodata'>등록된 내용이 없습니다.</div>
            )}

            </ul>
        </div>
     ) 
    }

export default PostList