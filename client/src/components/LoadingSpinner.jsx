const ShimmerCard = () => (
  <div className="col">
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex align-items-center mb-3">
          <div
            className="rounded-circle bg-light shimmer me-3"
            style={{ width: "60px", height: "60px" }}
          ></div>
          <div className="flex-grow-1">
            <div
              className="shimmer mb-2"
              style={{ height: "20px", width: "70%" }}
            ></div>
            <div
              className="shimmer"
              style={{ height: "16px", width: "40%" }}
            ></div>
          </div>
        </div>
        <div
          className="shimmer mb-3"
          style={{ height: "16px", width: "60%" }}
        ></div>
        <div className="mt-auto">
          <div
            className="shimmer"
            style={{ height: "38px", width: "100%" }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

const LoadingSpinner = () => (
  <div className="container my-5">
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
      {[...Array(6)].map((_, index) => (
        <ShimmerCard key={index} />
      ))}
    </div>
  </div>
);

export default LoadingSpinner;
