const BreadCrumbs = ({ title }) => {
  return (
    <div className="graybg">
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>{title}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
