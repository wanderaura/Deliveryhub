import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // URL of the Excel file (change this to the actual path of your Excel file)
  const excelFileUrl = 'D:\\Vaishnavi_Desktop\\deliveryhub\\my-app\\src\\components\\deliveryhub - store.link.xlsx';

  // Function to fetch and load the Excel file from the URL
  const loadExcelFileFromURL = async () => {
    try {
      // Fetch the file from the URL
      const response = await fetch(excelFileUrl);
      
      // Convert the response to an ArrayBuffer (necessary for XLSX)
      const data = await response.arrayBuffer();
      
      // Parse the ArrayBuffer into a workbook using XLSX
      const workbook = XLSX.read(data, { type: 'array' });
      
      // Get the first sheet from the workbook
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      // Convert the sheet data to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // Set the product data in state
      setProducts(jsonData);
    } catch (error) {
      console.error('Error loading the Excel file:', error);
    }
  };

  // Call the function to load the Excel file when the component mounts
  useEffect(() => {
    loadExcelFileFromURL();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      
      {/* Render the product list as a table */}
      {products.length > 0 ? (
        <table border="1" style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            <tr>
              {/* Assuming products have columns like 'name', 'price', etc. */}
              {Object.keys(products[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                {Object.values(product).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading products...</p>  // Message when products are still loading
      )}
    </div>
  );
};

export default ProductList;
