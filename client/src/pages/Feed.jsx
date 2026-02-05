import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Feed = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("/api/feed")
      .then((response) => {
        setBlogs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   console.log(blogs.data[0].content);
  console.log(blogs[0]);

  return (
    <div className="text-neutral-50 px-5 mx-150">
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="p-5 bg-gray-800 border-2 border-gray-950 hover:bg-gray-500/55 cursor-pointer"
        >
          <h2 className="font-sans text-2xl font-bold">{blog.title}</h2>
          <i className="text-gray-500" >{blog.createdAt}</i>
          <div className="w-fit flex flex-col justify-between items-baseline gap-5">
            <div>
              <strong className="p-1">
                {blog.fname} {blog.mname} {blog.lname}
              </strong>
              <br />
              <i className="my-10 text-rose-500 rounded-4xl px-2">
                @{blog.usersName}
              </i>
            </div>

            <div className="">
              {blog.tags.map((tag, index) => (
                <p
                  key={index}
                  className="text-gray-500 w-fit inline mx-2 "
                >
                  #{tag}
                </p>
              ))}
            </div>
          </div>
          <p className="bg-gray-900 px-3 py-2 ">{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
