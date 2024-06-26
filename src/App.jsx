import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Base from "./Base";

// const App = () => {
//   return (
//     <div>
//       <h1>Weekday</h1>
//       <Base />
//     </div>
//   );
// };

function App() {
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
        <h1>Week day</h1>
        <div
          id="scrollableDiv"
          className="job-container"
        >
          <Base />
        </div>
      </div>
    </>
  );
}

export default App;
