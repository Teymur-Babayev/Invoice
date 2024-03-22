import React, { useEffect, useState } from "react";
import { MainLayoutDg } from "../../layouts/MainLayoutDg";
import { useQuery } from "react-query";
import { BlogsCtrl } from "../../api/fb.blogs";
import { User } from "../../api/fb.user";
import { UpdateBlogForm } from "../../components/UpdateBlogForm";
import { FormContainer } from "../../components/ui/FormContainer";

const Blogs = new BlogsCtrl();
const UserCtrl = new User();
export const UpdateBlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [BlogSelected, setBlogSelected] = useState(null);
  const [AutorUsername, setAutorUsername] = useState("");

  const handleFocus = () => {
    setIsFocused(true);
  };

  const { data: blogs } = useQuery("Blogs", Blogs.getBlogs);

  const filteredBlogs =
    blogs?.filter((blog) =>
      blog.Titulo.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    (async () => {
      if (BlogSelected) {
        const Autor = await UserCtrl.getMe(BlogSelected?.Autor);
        setAutorUsername(Autor.Username);
      }
    })();
  }, [BlogSelected]);

  return (
    <MainLayoutDg isblack={true}>
      <FormContainer>
        <div className="w-full min-h-screen h-fit px-[3%]">
          <h2 className="text-2xl text-white font-bold text-center py-5">
            Modificar Blog
          </h2>

          <div className="max-w-2xl rounded-md p-8 shadow-lg mx-auto bg-DgyaDark/30 ">
            {/* buscador de blogs */}
            <div className="relative bg-slate-100 flex items-center rounded-full my-2">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                id="search"
                type="text"
                placeholder="Buscar Blog"
                value={searchTerm}
                onChange={handleSearch}
                onFocus={handleFocus}
                autoComplete="off"
              />
              <ul
                className={`${
                  isFocused ? "absolute" : "hidden"
                } -bottom-[220%] md:-bottom-[240%] rounded-md shadow-md left-[5%] p-4 bg-white h-[90px] overflow-y-auto w-[90%] mt-4`}
              >
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((curso, index) => (
                    // Rest of your code...
                    <li
                      onClick={() => {
                        setBlogSelected(curso);
                        setIsFocused(false);
                      }}
                      key={index}
                    >
                      {curso.Titulo}
                    </li>
                  ))
                ) : (
                  <li>no se encontraron resultados</li>
                )}
              </ul>
            </div>

            {BlogSelected && (
              <UpdateBlogForm
                BlogSelected={BlogSelected}
                setBlogSelected={setBlogSelected}
                AutorUsername={AutorUsername}
              />
            )}
          </div>
        </div>
      </FormContainer>
    </MainLayoutDg>
  );
};
