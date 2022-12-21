import React from "react";
import PlayBadgeIcon from "../../components/icons/playbadge";
import PostAuthorDP from "../../components/icons/postAuthorDP";
import PostStarIcon from "../../components/icons/poststar";
import SmallCommentIcon from "../../components/icons/smallcomment";
import SmallHeartIcon from "../../components/icons/smallheart";
import SmallPlayIcon from "../../components/icons/smallplay";
import { Link } from "react-router-dom";
import * as dayjs from "dayjs";

function FMTtimestamp(timestamp) {
  // i think after 2023 when vlive shuts down,
  // we can just assume all dates will be of the second format and not require the check
  const d = dayjs(timestamp);
  //var curr_year = dayjs().year();
  // this is intentionally == not === bc of type conversion
  // if (curr_year == d.format("YYYY")) return d.format("MMM D");
  // for dates in a different year
  return d.format("MMM D, YYYY");
}
function fmtMSS(s) {
  var seconds = parseInt(s, 10); // don't forget the second param
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;

  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  if (hours === 0) return minutes + ":" + seconds;
  return hours + ":" + minutes + ":" + seconds;
}

function formatNum(n) {
  if (n < 1000) return n;
  if (n < 1000000) return Math.round(n / 1000).toString() + "K";
  return Math.round(n / 1e5) / 10 + "M";
}

function get_thumbnail_ext(url) {
  if (url.endsWith(".jpg")) return ".jpg";
  return ".png";
}

const BoardItem = ({
  post_id,
  title,
  author,
  createdAt,
  officialVideo,
  artist,
}) => {
  const duration = officialVideo.playTime;
  const views = officialVideo.playCount;
  const likes = officialVideo.likeCount;
  const comments = officialVideo.commentCount;
  const thumbnail_ext = get_thumbnail_ext(officialVideo.thumb);
  const thumbnail_url = `https://vlivearchive.com/files/${artist.bucket}/${post_id}/${post_id}-thumb${thumbnail_ext}`;
  return (
    <>
      <li className="post_item--3Brrv -video--1s9IA">
        <div className="profile_area--2YO97">
          <div className="profile_info--13f_P">
            <Link
              className="link_profile--2SQHn"
              to={"/channel/" + artist.channel}
            >
              <div className="profile_thumbnail--1k1fr">
                <div
                  className="thumbnail_wrap--1h0cv -mask--3jxwe"
                  style={{ width: "30px", height: "30px" }}
                >
                  <PostAuthorDP
                    image_url={"/static/img/dp/" + artist.channel + ".png"}
                  />
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    className="mask_border--3sgzz"
                  >
                    <g stroke="#000" stroke-opacity="0.05">
                      <path d="M15,0.5 C19.0040644,0.5 22.6290644,2.12296778 25.2530483,4.74695167 C27.8770322,7.37093556 29.5,10.9959356 29.5,15 C29.5,15.4138637 29.482673,15.8236796 29.4486026,16.2287386 C28.394426,15.7603521 27.227625,15.5 26,15.5 C23.6527898,15.5 21.5277898,16.4513949 19.9895924,17.9895924 C18.4513949,19.5277898 17.5,21.6527898 17.5,24 C17.5,25.8341082 18.0809505,27.5325085 19.0686818,28.9213493 C17.7781764,29.2980794 16.412669,29.5 15,29.5 C10.9959356,29.5 7.37093556,27.8770322 4.74695167,25.2530483 C2.12296778,22.6290644 0.5,19.0040644 0.5,15 C0.5,10.9959356 2.12296778,7.37093556 4.74695167,4.74695167 C7.37093556,2.12296778 10.9959356,0.5 15,0.5 Z"></path>
                    </g>
                  </svg>
                  <span className="icon_post_writer--3Hu_I">
                    <PostStarIcon />
                    <span className="blind">star</span>
                  </span>
                </div>
              </div>
              <div className="profile_info--AI-HG">
                <div className="writer_area--DbEU6">
                  <em className="writer--pwvK2">{author.nickname}</em>
                </div>
                <div className="add_info_area--SkRFe">
                  <div className="add_info--1sRxZ">
                    <span className="upload_time--wtBj9">
                      {FMTtimestamp(createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <Link className="post_area--3dKbo" to={"/post/" + post_id}>
          <div className="post_inner--3DzQ8">
            <div className="content_area--24ZuP">
              <div className="post_title--3sJDT">
                <strong className="title_text--3s_ZV">{title}</strong>
              </div>
              <div className="post_reaction_area--J_jVq">
                <div className="post_reaction_wrap--2u8Kx">
                  <div className="post_reaction_info--1XiJo">
                    <span className="reaction_item--2lEs_">
                      <span className="blind">play</span>
                      <SmallPlayIcon />
                      <span className="text--1T5Dt">{formatNum(views)}</span>
                    </span>
                    <span className="reaction_item--2lEs_">
                      <span className="blind">like</span>
                      <SmallHeartIcon />
                      <span className="text--1T5Dt">{formatNum(likes)}</span>
                    </span>
                    <span className="reaction_item--2lEs_">
                      <span className="blind">comment</span>
                      <SmallCommentIcon />
                      <span className="text--1T5Dt">{formatNum(comments)}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="post_thumbnail--1guv3">
              <div className="thumbnail_wrap--2t6Rv">
                <div className="thumbnail--2pMaa">
                  <div className="lazyload-wrapper">
                    <span
                      className="covered_image--1rVY7 -lazyload--2r3VM thumbnail--2cQXj"
                      style={{
                        backgroundImage: "url('" + thumbnail_url + "')",
                      }}
                    ></span>
                    <span className="badge_area--1JrzS -bottom--13Qfe">
                      <em className="badge--1S36U -text--kJnBn">
                        <span className="blind">playTime</span>
                        {fmtMSS(duration)}
                      </em>
                    </span>
                    <span className="badge_area--1JrzS -bottom_left--1fhiE">
                      <em className="blind">video</em>
                      <PlayBadgeIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="more_button_area--3k5le">
          <div className="more_option_wrap--2qHGk">
            <button
              type="button"
              className="button_more_option--1klaM -post--UhjTL"
            >
              <span className="blind">More</span>
              <svg
                width="3"
                height="13"
                viewBox="0 0 3 13"
                className="icon_button--3uz1s -more--2CaVp"
              >
                <g fill="#959597" opacity="0.5">
                  <circle cx="1.75" cy="1.25" r="1.25"></circle>
                  <circle cx="1.75" cy="6.25" r="1.25"></circle>
                  <circle cx="1.75" cy="11.25" r="1.25"></circle>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </li>
    </>
  );
};
export default BoardItem;
