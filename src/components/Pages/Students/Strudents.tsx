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
        id: (row:any) => row["fullName"],
        numeric: false,
        disablePadding: false,
        label: "Custom Code",
      },
      {
        id: (row:any) => row["gender"],
        numeric: false,
        disablePadding: false,
        label: "Geneder",
      },
      {
        id: (row:any) => row["dob"],
        numeric: false,
        disablePadding: false,
        label: "DOB",
      },
      {
        id: (row:any) => row["phone"],
        numeric: false,
        disablePadding: false,
        label: "Phone",
      },

      {
        id: (row:any) => row["status"],
        numeric: false,
        disablePadding: false,
        label: "Status",
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
