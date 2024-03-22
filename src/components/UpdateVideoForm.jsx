import React, { useState } from "react";
import { Input } from "./ui/Input";
import { CursosCtrl } from "../api/fb.cursos";
import { useQuery } from "react-query";
import { UpdateVideo } from "./Update.Video.Form";

const cursoCtrl = new CursosCtrl();
export const UpdateVideoForm = ({ cursoSelected, setcursoSelected }) => {
  const [videoSelected, setvideoSelected] = useState(null);
  const { data: videos } = useQuery(cursoSelected.id, () =>
    cursoCtrl.getVideosCurso(cursoSelected.id)
  );

  return (
    <div>
      <div className="w-full space-y-3">
        <h2 className="text-2xl text-white font-bold">
          Curso: {cursoSelected.Titulo}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full md:space-x-3">
          {videos?.length >= 0 ? (
            videos.map((video) => (
              <div
                onClick={() => {
                  setvideoSelected(video);
                }}
                className="aspect-square  cursor-pointer shadow-md rounded-md  "
              >
                {/* imagen video */}

                <img
                  className="w-full h-[20vh] rounded-t-md bg-black"
                  src={video.modulo_img}
                  alt="video_img"
                />
                <h3 className="text-white font-semibold p-0 md:p-2">
                  {video.Titulo}
                </h3>
              </div>
            ))
          ) : (
            <div className="w-full col-span-3">
              <h2>Este Curso no tiene videos agregados aun</h2>
            </div>
          )}
        </div>
        {videoSelected && (
          <UpdateVideo
            videoSelected={videoSelected}
            setvideoSelected={setvideoSelected}
            setcursoSelected={setcursoSelected}
          />
        )}
      </div>
    </div>
  );
};
