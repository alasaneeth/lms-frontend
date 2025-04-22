import React from "react";
import Table from "../../ViewComponents/Table"
// import Title from "../Card/title";
// import Table from "../MUI_components/Table/table";
// import AddCustomer from "./addCustomer";
 import Service from "../../../services/StudentService/Student.service";
// import ViewCustomer from "./viewCustomer";

const Customer = () => {
  // customer Table details
  const customerTableHeadCells = [
     
      {
        id: (row:any) => row["customCode"],
        numeric: false,
        disablePadding: false,
        label: "Custom Code",
      },
   
  ];

  return (
    <>
      {/* <Title>Customers</Title> */}
      <Table
        title="Customer"
        headCells={customerTableHeadCells}
        service={Service}
        editable
        searchable
      />
    </>
  );
};

export default Customer;
