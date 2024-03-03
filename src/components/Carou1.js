import Carousel from 'react-bootstrap/Carousel';

function Carou1() {
  return (
    <>
    <Carousel>
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://images.aapkabazar.co/banners/top_banner/web/tajmahal.jpg"
          alt="First slide"
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <img
          className="d-block w-100"
          src="https://images.aapkabazar.co/banners/top_banner/web/vimlemon2ltr-W.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="https://images.aapkabazar.co/banners/top_banner/web/walnut.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>

      
    </Carousel>

    <Carousel>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src="https://images.aapkabazar.co/banners/top_banner/web/mcvities.jpg"
          alt="First slide"
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="https://images.aapkabazar.co/banners/top_banner/web/bournvita.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img
          className="d-block w-100"
          src="https://images.aapkabazar.co/banners/top_banner/web/indiarice1.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>

        </Carousel.Caption>
      </Carousel.Item>

      
    </Carousel> 


    <p class="latest_heading">Latest offers</p>
      <div className="latestoffer">
        <div
          id="carouselExampleSlidesOnly"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <a href = "#"><img
                src="https://images.aapkabazar.co/slider/kajuBadam.jpg"
                alt="..."
              /></a>
              <a href = "#"><img
                src="https://images.aapkabazar.co/slider/gaurip10.jpg"
                alt="..."
              /></a>
              <a href = "#"><img
                src="https://images.aapkabazar.co/slider/ChanaWhite.jpg"
                alt="..."
              /></a>
            </div>
            <div class="carousel-item">
              <a href = "#"><img
                src="https://images.aapkabazar.co/slider/ChanaDal.jpg"
                alt="..."
              /></a>
              <a href = "#"><img
                src="https://images.aapkabazar.co/slider/mamra.jpg"
                alt="..."
              /></a>
              <a href = "#"><img
                src="https://images.aapkabazar.co/Offers/mediumBanner6.jpg"
                alt="..."
              /></a>
            </div>
          </div>
        </div>
      </div>
    

    </>
  );
}

export default Carou1;