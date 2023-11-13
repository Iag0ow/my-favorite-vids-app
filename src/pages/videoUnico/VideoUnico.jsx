import "./VideoUnico.css";
import React, { useEffect, useState, useContext } from "react";
import { getUniqueVideoById } from "../../utils/config";

import { Link, useParams } from "react-router-dom";
const VideoUnico = () => {
  const [video, setVideo] = useState({});
  const { videoId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setVideo(await getUniqueVideoById(videoId));
    };
    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <div className="d-flex flex-column width-100 word-break align-items-center justify-content-center">
              <h1 class="my-favorite-videos-title">
                <a class="text-style-none" href="/">
                  My Favorite<span> Videos</span>
                </a>
              </h1>
              <p className="p-5 pt-0 word-break">
                Bem-vindo ao My Favorite Videos, o seu destino exclusivo para
                reunir e compartilhar os vídeos mais incríveis das redes
                sociais! <br />
                O My Favorite Videos é a plataforma perfeita para os amantes de
                vídeos curtos e envolventes
                <br />
                Gostou? <Link to="/registrar">Cadastre-se</Link>
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <h2 className="mb-4 text-center mt-lg-5">Video</h2>
            <div className="d-flex justify-content-center mt-5 mb-3">
              <div
                className="col-md-12 col-lg-6 card-video word-break me-0"
                style={{ wordBreak: "break-word", minWidth: "324" }}
              >
                <iframe
                  src={video && video.url}
                  width="100%"
                  height="550"
                  title="YouTube video player"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
                <p className="text-center">{video && video.title}</p>
                <hr />
                <div className="d-flex justify-content-center align-items-center mb-3 flex-column">
                  <button onClick={() => window.open(`/perfil-publico/${video.platform}/${video.user._id}`)} className="btn btn-primary mt-2"> Ver perfil</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUnico;
