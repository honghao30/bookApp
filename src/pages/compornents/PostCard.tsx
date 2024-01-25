
export const PostCard: React.FC<{post: PostType}>  = ({post}) => {
   return (
    <li>
        <div className="post-item__wrap">
            <div className="profile-wrap">
                <div className="poster-people">
                    <span className="profile">
                        <img src={post.profile} alt={post.wriName} />
                    </span>
                    <span className="name">
                        <strong>{post.wriName}</strong>
                    </span>
                    <button type="button" className="btn btn-icon-only">
                        <i className="icon-follow"></i>
                        <span className="ir-text">팔로우</span>
                    </button>
                </div>
                <button type="button" className="btn btn-icon-only">
                    <i className="icon-more"></i>
                    <span className="ir-text">더보기</span>
                </button>   
            </div>
            <div className="poster-wrap">
                <img src={post.imgLink} alt="" />
            </div>
            <div className="post-action">
                <div className="icon-left">
                    <button type="button" className="btn btn-icon-only">
                        <i className="icon-like"></i>
                        <span className="ir-text">좋아요</span>
                    </button>
                    <button type="button" className="btn btn-icon-only">
                        <i className="icon-msg"></i>
                        <span className="ir-text">댓글</span>
                    </button>  
                    <button type="button" className="btn btn-icon-only">
                        <i className="icon-share"></i>
                        <span className="ir-text">공유</span>
                    </button>                                                                                                               
                </div>
                <div className="icon-right">
                    <button type="button" className="btn btn-icon-only">
                        <i className="icon-favorite"></i>
                        <span className="ir-text">즐겨찾기</span>
                    </button>                     
                </div>
            </div>
            <div className="post-info">
                <p className="profile-area">
                    <span className="like-count">좋아요 { post.like }</span></p>
                <p  className="post-description">{post.description}</p>
                <p className="commandCount">댓글 { post.command} 개 / { post.greatAt}</p>
            </div>                          
        </div>
    </li>
   ) 
}

export default PostCard