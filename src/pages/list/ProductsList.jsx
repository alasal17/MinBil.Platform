import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ProductTable from "../../components/datatable/ProductTable"

const ProductsList = ({pageTitle}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ProductTable pageTitle={pageTitle} />
      </div>
    </div>
  )
}

export default ProductsList