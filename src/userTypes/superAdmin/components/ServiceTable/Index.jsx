import { Button } from "antd";
import "./Index.css";
import $ from "jquery";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const [data, setData] = useState([]);
  const [search,setSearch]=useState("");
  const [searchResults,setSearchResults]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const respOpenMenu = () => {
    const dashboardMenu = $(".dashboard-menu-header");

    dashboardMenu.fadeIn("slow", () => {});
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    axios
      .get("https://localhost:7227/api/Services")
      .then((res) =>{
        setData(res.data)
        setSearchResults(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const seacrhChange=(key)=>{
    setSearch(key)
    const filteredResults=data.filter((item)=>
      item.name.toLowerCase().includes(key.toLowerCase())
    )
    setSearchResults(filteredResults)
    setCurrentPage(1);
  }

   const changePage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  return (
    <section className="all-services-superadmin">
      <div className="container-service-superadmin">
        <div className="top-service-superadmin d-flex justify-content-between align-items-center">
          <div className="left-top-service-superadmin">
            <h1>Service</h1>
            <div className="left-menu-header">
              <i
                onClick={respOpenMenu}
                class="fa-solid fa-bars"
                style={{ color: "#333", marginBottom: "20px" }}
              ></i>
            </div>
          </div>
          <div className="left-right-service-superadmin d-flex gap-3 align-items-center">
            <Link to="/superadmin/service/create" style={{textDecoration:"none", backgroundColor:"#0B58CA", color:"#fff", padding:"5px",fontSize:"13px" ,borderRadius:"5px"}}>Create</Link>
            <div className="search-input">
              <input
                className="form form-control w-100"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e)=>seacrhChange(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="bottom-service-superadmin">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Service Begin</th>
                <th scope="col">Service End</th>
                <th scope="col">Min Price</th>
                <th scope="col">Max Price</th>
                <th scope="col">Is Deleted</th>
                <th scope="col" colSpan={3}>
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
            {searchResults.slice(startIndex, endIndex).map((datas, index) => (
                <tr key={index}>
                  <th scope="row">{datas.id}</th>
                  <td>{datas.name}</td>
                  <td>{datas.description.slice(0, 10)}...</td>
                  <td>{new Date(datas.serviceBeginning).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{new Date(datas.serviceEnding).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                  <td>{datas.minPrice}</td>
                  <td>{datas.maxPrice}</td>
                  <td>{datas.isDeleted ===false ? 'Active' : 'Deleted'}</td>
                  <td>
                    <Link to={`/superadmin/service/update/${datas.id}`} style={{textDecoration:"none", backgroundColor:"#0B58CA", color:"#fff", padding:"5px",fontSize:"13px" ,borderRadius:"5px"}} className="bg-success text-white">Edit</Link>
                  </td>
                  <td>
                    <Button className="bg-warning text-white">Soft</Button>
                  </td>
                  <td>
                    <Button className="bg-danger text-white">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <div className="pag">
            <Button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="pagNum" style={{ fontSize: "15px", marginLeft:"10px",marginRight:"10px"}}>
              {currentPage}
            </span>
            <Button
              onClick={() => changePage(currentPage + 1)}
              disabled={endIndex >= searchResults.length}
            >
              Next
            </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
