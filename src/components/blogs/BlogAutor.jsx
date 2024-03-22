import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "../../api/fb.user";
import { BlogsCtrl } from "../../api/fb.blogs";
import { ComentCtrl } from "../../api/comentarios/fb.comentarios";
import { Heart, MessagesSquare, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserCtrl = new User();
const BlogCtrl = new BlogsCtrl();
const ComentsCtrl = new ComentCtrl();
export const BlogAutor = ({ id, blog }) => {
  const client = useQueryClient();
  const [IsLiked, setIsLiked] = useState(false);
  const { User } = useAuth();
  const { data: Autor } = useQuery(`Autor ${id}`, () => UserCtrl.getMe(id));
  const {data:Coments} = useQuery(`Coments ${blog.id}`,()=>ComentsCtrl.getComent(blog.id))

  const mutationLike = useMutation(BlogCtrl.darLikeBlogs);
  const mutationDislike = useMutation(BlogCtrl.darDislikeBlogs);

  const navigate = useNavigate();

  useEffect(() => {
    const UserId = User?.uid;
    if (blog?.likes?.includes(UserId)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [blog]);

  const handleLike = () => {
    const blogId = blog?.id;
    const UserId = User?.uid;
    if (!User) {
      navigate("/login", { replace: true });
    } else {
      mutationLike.mutate({blogId,UserId},{
        onSuccess:()=>{
          client.invalidateQueries(['Blogs']);
        }
      })
    }
  };

  const handleDislike = () => {
    const blogId = blog?.id;
    const UserId = User?.uid;
    mutationDislike.mutate({blogId,UserId},{
      onSuccess:()=>{
        client.invalidateQueries(['Blogs']);
      }
    })
  }

  return (
    <div className="w-full mt-2 flex">
      <div className="w-1/2 flex items-center gap-x-3">
        {/* AVATAR */}
        <Avatar>
          <Avatar>
            <AvatarImage src={Autor?.Img_url} alt="Autor Foto" />
            <AvatarFallback className="w-10 h-10 flex justify-center items-center bg-gray-600 rounded-full">
              <User2 className="text-white" />
            </AvatarFallback>
          </Avatar>
        </Avatar>
        <p className="text-gray-500 font-semibold">{Autor?.Username}</p>
      </div>
      <div className="w-1/2 flex items-center justify-end">
        <div className="w-1/2 flex justify-end">
          {IsLiked ? (
            <Heart onClick={handleDislike} className="w-5 mr-2 cursor-pointer fill-red-500 text-red-500" />
          ) : (
            <Heart onClick={handleLike} className="w-5 mr-2 cursor-pointer text-gray-600" />
          )}
          <span className="text-gray-600">{blog?.likes?.length}</span>
        </div>
        <div className="w-1/2 flex justify-end">
          <MessagesSquare className="w-5 mr-2 text-gray-600" />
          <span className="text-gray-600">{Coments?.length}</span>
        </div>
      </div>
    </div>
  );
};
