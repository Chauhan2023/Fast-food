import { useEffect, useState } from "react";
import Card from "../component/Card";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

function Home() {
  const [search,setsearch]=useState("")
  const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:80/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setfoodCat(response[1]);
    setfoodItem(response[0]);
    
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="carousel">
        
    
    <div className="caroulsemain" data-bs-theme="dark" style={{objectFit:"contain !important"}}>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner mt-2 rounded-1" id="carousel">
          <div className="carousel-caption" style={{zIndex:"10"}}>
          <div className="d-flex justify-content-center">
            <input
              className="form-control me-2 "
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e)=>{setsearch(e.target.value)}}
            />
            {/* <button className="btn btn-outline-success bg-success text-white" type="submit">
              Search
            </button> */}
          </div>
          </div>
          <div className="carousel-item active">
            <img    
              src="https://source.unsplash.com/random/900x700/?burger"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?pizza"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700/?momos"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>








      </div>
      <div className="m-3">
        {
          foodCat.length !== 0 ?
          foodCat.map((data) => (
            <div className="row mb-3 m-auto" key={data._id}>
              <div className="fs-3 m-3">{data.category}</div>
              <hr />
              {foodItem.length !== 0 ? (
                foodItem
                  .filter((item) => (item.category === data.category) &&(item.name.toLowerCase().includes(search.toLowerCase())))
                  .map((filteritems) => (
                    <div
                      key={filteritems._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card fooditem={filteritems} options={filteritems.options[0]}></Card>

                    </div>
                  ))
              ) : (
                <div>Sorry: No such data Available</div>
              )}
            </div>
          )):""}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
