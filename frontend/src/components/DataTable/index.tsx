import axios from "axios";
import Pagination from "components/Pagination";
import React, { useEffect, useState } from "react";
import { SalePage } from "types/sale";
import { formatLocalDate } from "utils/formats";
import { BASE_URL } from "utils/request";

function DataTable() {

  const [activePage, setActivePage] = useState(0);
  
  const [page,setPage] = useState<SalePage>({ 
    last:true,
    totalPages:0,
    number:0,
    first:true,
    totalElements:0
  })

  useEffect(() => {
    axios.get(`${BASE_URL}/sales?page=${activePage}&size=20&sort=date,desc`)
    .then(response => {
      setPage(response.data)  
    });
  }, [activePage])

  const changePage =(index:number) =>{
    setActivePage(index);
  }
  return (
    <>
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        <thead>
          <tr> 
            <th>Data</th>
            <th>Vendedor</th>
            <th>Clientes visitados</th>
            <th>Negócios fechados</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {page.content?.map(item => (
            <tr key={item.id}>
            <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
            <td>{item.seller.name}</td>
            <td>{item.visited}</td>
            <td>{item.deals}</td>
            <td>{item.amount.toFixed(2)}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination page={page} onPageChange={changePage}/>
    </>
  );
}

export default DataTable;
