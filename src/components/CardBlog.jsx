import { Bookmark } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlogAutor } from "./blogs/BlogAutor";
import { formatDateToCustomString } from "../utils/funcs";
import { useAuth } from "../hooks/useAuth";
import { useMutation, useQueryClient } from "react-query";
import { BlogsCtrl } from "../api/fb.blogs";

const BlogCtrl = new BlogsCtrl();
export const BlogCard = ({ blog }) => {
  const client = useQueryClient();
  const [IsFav, setIsFav] = useState(false);
  const { User } = useAuth();
  const Fecha = formatDateToCustomString(blog?.fecha);

  const mutationDarFav = useMutation(BlogCtrl.darFavoritosBlogs);
  const mutationDarUnFav = useMutation(BlogCtrl.darUnFavoritosBlogs);

  const navigate = useNavigate();

  useEffect(() => {
    const UserId = User?.uid;
    if (blog?.favs?.includes(UserId)) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, [blog]);

  const handleFav = () => {
    const blogId = blog?.id;
    const UserId = User?.uid;
    if (!User) {
      navigate("/login", { replace: true });
    } else {
      mutationDarFav.mutate(
        { blogId, UserId },
        {
          onSuccess: () => {
            client.invalidateQueries(["Blogs"]);
            client.invalidateQueries(["FavBlogs"]);
          },
        }
      );
    }
  };

  const handleUnFav = () => {
    const blogId = blog?.id;
    const UserId = User?.uid;

    mutationDarUnFav.mutate(
      { blogId, UserId },
      {
        onSuccess: () => {
          client.invalidateQueries(["Blogs"]);
          client.invalidateQueries(["FavBlogs"]);
        },
      }
    );
  };

  return (
    <div className="w-1/3 min-w-[320px] mr-4  flex flex-col items-center h-fit bg-white rounded-xl shadow-md">
      {/* Imagen Blog */}
      <div to={`/blog/${blog.Slug}`} className="w-full h-fit relative">
        <img
          src={blog?.blog_img}
          className="h-[200px] w-full shadow-lg rounded-xl"
          alt=""
        />
        <div className="absolute z-50 right-[5%] shadow-md -bottom-[10%] bg-white rounded-full flex justify-center p-2 items-center">
          {IsFav ? (
            <Bookmark
              onClick={handleUnFav}
              className="text-LogoBlue fill-LogoBlue cursor-pointer"
            />
          ) : (
            <Bookmark
              onClick={handleFav}
              className="text-LogoBlue cursor-pointer"
            />
          )}
        </div>
      </div>

      <Link to={`/blog/${blog.Slug}`} className="w-full h-fit px-[5%]">
        <p className="mt-3 text-[14px] font-semibold text-gray-400">{Fecha}</p>

        <h3 className="mt-2 font-bold">{blog?.Titulo}</h3>

        <h4 className="mt-2 line-clamp-2">{blog?.Descripcion}</h4>

        <div className="w-1/2 mx-auto mt-5">
          <button className="w-full py-1 bg-gradient-to-r shadow-lg shadow-LogoBlue text-white rounded-md from-LogoBlue  to-LogoBlueDark">
            Leer más
          </button>
        </div>
      </Link>

      <div className="px-[5%] w-full h-fit py-2">
        <BlogAutor id={blog?.Autor} blog={blog} />
      </div>
    </div>
  );
};
