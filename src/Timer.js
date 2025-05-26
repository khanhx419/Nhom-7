import React from "react";

// React.memo tránh re-render khi props không đổi
function ProductList({ products, total }) {
  console.log("🔄 Render ProductList");

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Total: {total}</h3>
      <ul>
        {products.map((prod, index) => (
          <li key={index}>
            {prod.name} - {prod.price.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(ProductList);
