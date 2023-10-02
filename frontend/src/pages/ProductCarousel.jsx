import { Alert, Carousel, Image } from "react-bootstrap";
import Loader from "../components/Loader";
import { useGetTopProductsQuery } from "../store/productsApiSlice";
import { Link } from "react-router-dom";
function ProductCarousel() {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  if (isLoading) return <Loader />;
  if (error) return <Alert variant="danger">{error?.data?.message}</Alert>;
  return (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((prd) => (
        <Carousel.Item key={prd._id}>
          <Link to={`/product/${prd._id}`}>
            <Image src={prd.image} alt={prd.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {prd.name} ({prd.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
