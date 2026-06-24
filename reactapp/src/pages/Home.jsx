// import { useNavigate } from 'react-router-dom';
// import { Container, Button, Navbar, Nav, Row, Col, Accordion } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { motion } from 'framer-motion'; 
// import brg from './photosvideos/snacks11.jpg';
// import logo from './photosvideos/icon.png';
// import aboutImg from './photosvideos/snacks1.jpg';
// import whyChooseImg from './photosvideos/snacks5.jpg';
// import featuresImg from './photosvideos/snacks7.jpg';
// import faqImg from './photosvideos/snacks4.jpg';
// import contactImg from './photosvideos/snacks2.jpg';

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div style={{ fontFamily: 'Arial, sans-serif' }}>
//       {/* Navbar */}
//       <Navbar expand="lg" style={{ backgroundColor: '#333446' }} variant="dark" sticky="top">
//         <Container>
//           <Navbar.Brand href="/" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
//             <img
//               src={logo}
//               alt="VeganVibe Logo"
//               style={{
//                 width: '50px',
//                 height: '50px',
//                 marginRight: '10px',
//                 borderRadius: '50%',
//                 border: '2px solid white',
//               }}
//             />
//             VeganVibe
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="navbar-nav" />
//           <Navbar.Collapse id="navbar-nav">
//             <Nav className="ms-auto align-items-center">
//               <Nav.Link href="#about">About Us</Nav.Link>
//               <Nav.Link href="#why-choose">Why Choose Us</Nav.Link>
//               <Nav.Link href="#features">Features</Nav.Link>
//               <Nav.Link href="#faq">FAQ</Nav.Link>
//               <Nav.Link href="#contact">Contact</Nav.Link>
//               <div className="d-flex flex-wrap mt-2 mt-lg-0">
//                 <Button
//                   className="ms-2 mb-2"
//                   style={{ backgroundColor: '#7F8CAA', border: 'none', color: '#fff' }}
//                   onClick={() => navigate('/login')}
//                 >
//                   Login
//                 </Button>
//                 <Button
//                   className="ms-2 mb-2"
//                   style={{ backgroundColor: '#B8CFCE', border: 'none', color: '#000' }}
//                   onClick={() => navigate('/signup')}
//                 >
//                   Signup
//                 </Button>
//                 <Button
//                   className="ms-2 mb-2"
//                   style={{ backgroundColor: '#7F8CAA', border: 'none', color: '#000' }}
//                   onClick={() => navigate('/admin-login')}
//                 >
//                   Admin
//                 </Button>
//               </div>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       <section
//   style={{
//     backgroundImage: `url(${brg})`, // ✅ Replace with actual image path
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     height: '100vh',
//     position: 'relative',
//   }}
// >
//   <div
//     style={{
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)', // ✅ Dark overlay for readability
//       zIndex: 2,
//     }}
//   ></div>

//   <Container
//     className="d-flex flex-column justify-content-center align-items-center text-center"
//     style={{
//       height: '100%',
//       position: 'relative',
//       zIndex: 3,
//       color: '#fff',
//     }}
//   >
//     <motion.h1
//       className="mb-4"
//       initial={{ opacity: 0, y: -30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 1 }}
//       style={{
//         fontSize: 'clamp(2rem, 5vw, 3.5rem)',
//         fontWeight: 'bold',
//       }}
//     >
//       Welcome to VeganVibe
//     </motion.h1>

//     <motion.p
//       className="mb-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ delay: 0.5, duration: 1 }}
//       style={{
//         fontSize: 'clamp(1rem, 3vw, 1.5rem)',
//         maxWidth: '700px',
//       }}
//     >
//       Your one-stop destination for healthy, cruelty-free vegan snacks.
//     </motion.p>
//   </Container>
// </section>


//       {/* About Us */}
//       <section
//         id="about"
//         style={{
//           backgroundImage: `url(${aboutImg})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           padding: '100px 0',
//           color: 'black',
//         }}
//       >
//         <Container>
//           <Row>
//             <Col>
//               <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 <h2 className="mb-4">About Us</h2>
//                 <p style={{ fontSize: '1.1rem', maxWidth: '700px' }}>
//                   At VeganVibe, we believe in promoting a healthy lifestyle through plant-based
//                   eating. Our snacks are crafted with love, using natural ingredients without
//                   compromising taste.
//                 </p>
//               </motion.div>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* Why Choose Us */}
//       <section id="why-choose" style={{ backgroundColor: '#EAEFEF', padding: '100px 0' }}>
//         <Container>
//           <h2 className="text-center mb-5">Why Choose Our Website?</h2>
//           <Row className="align-items-center">
//             <Col md={6} className="mb-4 mb-md-0 text-center">
//               <motion.img
//                 src={whyChooseImg}
//                 alt="Why Choose"
//                 className="img-fluid rounded"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 1 }}
//               />
//             </Col>
//             <Col md={6}>
//               <Row className="text-center">
//                 <Col xs={12} className="mb-3">
//                   <h5>🌱 100% Vegan</h5>
//                   <p>All products are cruelty-free and plant-based.</p>
//                 </Col>
//                 <Col xs={12} className="mb-3">
//                   <h5>🚚 Fast Delivery</h5>
//                   <p>Get your snacks delivered fresh and on time.</p>
//                 </Col>
//                 <Col xs={12}>
//                   <h5>💚 Healthy & Tasty</h5>
//                   <p>Enjoy the perfect blend of health and taste.</p>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* Features */}
//       <section
//         id="features"
//         style={{
//           backgroundImage: `url(${featuresImg})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           padding: '100px 0',
//           color: 'black',
//           textShadow: '1px 1px 5px rgba(0,0,0,0.6)',
//         }}
//       >
//         <Container>
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             <h2 className="mb-5">Our Features</h2>
//             <ul style={{ fontSize: '1.1rem' }}>
//               <li>Wide Product Range</li>
//               <li>Customer Reviews</li>
//               <li>Easy Returns</li>
//               <li>Secure Payments</li>
//             </ul>
//           </motion.div>
//         </Container>
//       </section>

//       {/* FAQ */}
//       <section id="faq" style={{ backgroundColor: '#B8CFCE', padding: '100px 0' }}>
//         <Container>
//           <Row className="align-items-center">
//             <Col md={6} className="mb-4 mb-md-0">
//               <h2 className="mb-5">Frequently Asked Questions</h2>
//               <Accordion>
//                 <Accordion.Item eventKey="0">
//                   <Accordion.Header>Are all products vegan?</Accordion.Header>
//                   <Accordion.Body>
//                     Yes, every product on VeganVibe is 100% vegan and cruelty-free.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="1">
//                   <Accordion.Header>Do you offer nationwide delivery?</Accordion.Header>
//                   <Accordion.Body>
//                     Yes, we deliver across the country with fast and safe shipping.
//                   </Accordion.Body>
//                 </Accordion.Item>
//                 <Accordion.Item eventKey="2">
//                   <Accordion.Header>What is your return policy?</Accordion.Header>
//                   <Accordion.Body>
//                     You can return unused items within 7 days for a full refund.
//                   </Accordion.Body>
//                 </Accordion.Item>
//               </Accordion>
//             </Col>
//             <Col md={6} className="text-center">
//               <motion.img
//                 src={faqImg}
//                 alt="FAQ"
//                 className="img-fluid rounded"
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ duration: 1 }}
//               />
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* Contact */}
//       <section
//         id="contact"
//         style={{
//           backgroundImage: `url(${contactImg})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           padding: '100px 0',
//           color: 'black',
//           textShadow: '1px 1px 5px rgba(0,0,0,0.6)',
//         }}
//       >
//         <Container>
//           <Row>
//             <Col>
//               <motion.div
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 <h2 className="mb-4">Contact Us</h2>
//                 <p>📍 123 Vegan Street, Green City</p>
//                 <p>📞 +91 98765 43210</p>
//                 <p>📧 support@veganvibe.com</p>
//               </motion.div>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </div>
//   );
// }
import { useNavigate } from 'react-router-dom';
import { Container, Button, Navbar, Nav, Row, Col, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion'; 
import brg from './photosvideos/snacks11.jpg';
import logo from './photosvideos/icon.png';
import aboutImg from './photosvideos/snacks1.jpg';
import whyChooseImg from './photosvideos/snacks5.jpg';
import featuresImg from './photosvideos/snacks7.jpg';
import faqImg from './photosvideos/snacks4.jpg';
import contactImg from './photosvideos/snacks2.jpg';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Navbar */}
      <Navbar expand="lg" style={{ backgroundColor: '#333446' }} variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
            <img
              src={logo}
              alt="VeganVibe Logo"
              style={{
                width: '50px',
                height: '50px',
                marginRight: '10px',
                borderRadius: '50%',
                border: '2px solid white',
              }}
            />
            VeganVibe
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link href="#about">About Us</Nav.Link>
              <Nav.Link href="#why-choose">Why Choose Us</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#faq">FAQ</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
              <div className="d-flex flex-wrap mt-2 mt-lg-0">
                <Button
                  className="ms-2 mb-2"
                  style={{ backgroundColor: '#7F8CAA', border: 'none', color: '#fff' }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  className="ms-2 mb-2"
                  style={{ backgroundColor: '#B8CFCE', border: 'none', color: '#000' }}
                  onClick={() => navigate('/signup')}
                >
                  Signup
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section
  style={{
    backgroundImage: `url(${brg})`, // ✅ Replace with actual image path
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    position: 'relative',
  }}
>
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // ✅ Dark overlay for readability
      zIndex: 2,
    }}
  ></div>

  <Container
    className="d-flex flex-column justify-content-center align-items-center text-center"
    style={{
      height: '100%',
      position: 'relative',
      zIndex: 3,
      color: '#fff',
    }}
  >
    <motion.h1
      className="mb-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 'bold',
      }}
    >
      Welcome to VeganVibe
    </motion.h1>

    <motion.p
      className="mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
      style={{
        fontSize: 'clamp(1rem, 3vw, 1.5rem)',
        maxWidth: '700px',
      }}
    >
      Your one-stop destination for healthy, cruelty-free vegan snacks.
    </motion.p>
  </Container>
</section>


      {/* About Us */}
      <section
        id="about"
        style={{
          backgroundImage: `url(${aboutImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 0',
          color: 'black',
        }}
      >
        <Container>
          <Row>
            <Col>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className="mb-4">About Us</h2>
                <p style={{ fontSize: '1.1rem', maxWidth: '700px' }}>
                  At VeganVibe, we believe in promoting a healthy lifestyle through plant-based
                  eating. Our snacks are crafted with love, using natural ingredients without
                  compromising taste.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose" style={{ backgroundColor: '#EAEFEF', padding: '100px 0' }}>
        <Container>
          <h2 className="text-center mb-5">Why Choose Our Website?</h2>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0 text-center">
              <motion.img
                src={whyChooseImg}
                alt="Why Choose"
                className="img-fluid rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              />
            </Col>
            <Col md={6}>
              <Row className="text-center">
                <Col xs={12} className="mb-3">
                  <h5>🌱 100% Vegan</h5>
                  <p>All products are cruelty-free and plant-based.</p>
                </Col>
                <Col xs={12} className="mb-3">
                  <h5>🚚 Fast Delivery</h5>
                  <p>Get your snacks delivered fresh and on time.</p>
                </Col>
                <Col xs={12}>
                  <h5>💚 Healthy & Tasty</h5>
                  <p>Enjoy the perfect blend of health and taste.</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features */}
      <section
        id="features"
        style={{
          backgroundImage: `url(${featuresImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 0',
          color: 'black',
          textShadow: '1px 1px 5px rgba(0,0,0,0.6)',
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="mb-5">Our Features</h2>
            <ul style={{ fontSize: '1.1rem' }}>
              <li>Wide Product Range</li>
              <li>Customer Reviews</li>
              <li>Easy Returns</li>
              <li>Secure Payments</li>
            </ul>
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ backgroundColor: '#B8CFCE', padding: '100px 0' }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <h2 className="mb-5">Frequently Asked Questions</h2>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Are all products vegan?</Accordion.Header>
                  <Accordion.Body>
                    Yes, every product on VeganVibe is 100% vegan and cruelty-free.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Do you offer nationwide delivery?</Accordion.Header>
                  <Accordion.Body>
                    Yes, we deliver across the country with fast and safe shipping.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>What is your return policy?</Accordion.Header>
                  <Accordion.Body>
                    You can return unused items within 7 days for a full refund.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <Col md={6} className="text-center">
              <motion.img
                src={faqImg}
                alt="FAQ"
                className="img-fluid rounded"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact */}
      <section
        id="contact"
        style={{
          backgroundImage: `url(${contactImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 0',
          color: 'black',
          textShadow: '1px 1px 5px rgba(0,0,0,0.6)',
        }}
      >
        <Container>
          <Row>
            <Col>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className="mb-4">Contact Us</h2>
                <p>📍 123 Vegan Street, Green City</p>
                <p>📞 +91 98765 43210</p>
                <p>📧 support@veganvibe.com</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
