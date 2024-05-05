import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import JobCard from "./JobCard";
// import Base from "./Base";

// const App = () => {
//   return (
//     <div>
//       <h1>Weekday</h1>
//       <Base />
//     </div>
//   );
// };

function Base() {
  const [offset, setOffset] = useState(10);
  const [loading, setLoading] = useState(false);

  const [jobs, setJobs] = useState([]);

  const fetchJobs = () => {
    const headers = new Headers();
    const body = JSON.stringify({
      limit: 10,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body,
    };

    try {
      setLoading(true);
      fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setJobs((prevJobs) => [...prevJobs, ...result.jdList]);
          console.log(result.jdList);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  // const handleScroll = () => {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //     fetchJobs();
  //     setOffset((prevOffset) => prevOffset + 10);
  //   }
  // };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchMoreData = () => {
    const headers = new Headers();
    const body = JSON.stringify({
      limit: 10,
      offset: offset,
    });

    const requestOptions = {
      method: "POST",
      headers: headers,
      body,
    };

    try {
      // setLoading(true);
      fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setJobs((prevJobs) => [...prevJobs, ...result.jdList]);
          console.log(result.jdList);
          // setLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
    setOffset((prevOffSet) => prevOffSet + 10);
  };

  // useEffect(() => {
  // window.addEventListener("scroll", handleScroll);
  // return () => window.removeEventListener("scroll", handleScroll);
  // viewport.addEventListener("scroll", handleScroll);
  // return () => window.removeEventListener("scroll", handleScroll);
  // fetchJobs();
  // }, []);

  // console.log(jobs);

  return (
    <>
      <div className="">
        {loading ? (
          "Loading..."
        ) : (
          <div className="scroll-wrapper">
            <InfiniteScroll
              dataLength={jobs.length}
              next={fetchMoreData}
              hasMore={true}
              loader="....loading"
              scrollableTarget="scrollableDiv"
            >
              <div className="job-card-wrapper">
                {jobs.map((job, index) => (
                  <JobCard
                    key={job.jdUid}
                    job={job}
                  />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        )}
      </div>
    </>
  );
}

export default Base;
