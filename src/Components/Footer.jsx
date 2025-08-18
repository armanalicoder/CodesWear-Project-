import Image from "next/image";
import Link from "next/link";
function Footer() {
  return (
    <footer className="bg-slate-100 py-5">
      <div className="text-gray-500 flex flex-col md:flex-row text-center justify-between items-center mx-5">
        <div className="flex flex-col justify-center items-center  text-sm">
          <img src={"/logo.png"} alt="logo" width={180} height={50} />
          <p>Wear the &lt;code/&gt;</p>
          <p>Premium coding tshirts, hoodies and apparals</p>
        </div>
        <div className="my-2">
          <h1 className="font-medium text-black">SHOP</h1>
          <ul>
            <li>
              <Link className="hover:text-pink-500" href={"/tshirts"}>T-Shirts</Link>
            </li>
            <li>
              <Link className="hover:text-pink-500" href={"/tshirts"}>SwearShirts</Link>
            </li>
            <li>
              <Link className="hover:text-pink-500" href={"/tshirts"}>Hoodies</Link>
            </li>
            <li>
              <Link className="hover:text-pink-500" href={"/tshirts"}>Zipper Hoodies</Link>
            </li>
            <li>
              <Link className="hover:text-pink-500" href={"/tshirts"}>Mugs</Link>
            </li>
          </ul>
        </div>
        <div className="my-2">
          <h1 className="font-medium text-black">CUSTOMER SERVICE</h1>
          <ul>
            <li>
              <Link className="hover:text-pink-500" scroll={true} href={"/contact"}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-pink-500" href={"/about"}>About Us</Link>
            </li>
            <li>
              <Link className="hover:text-pink-500" href={"/return-policy"}>Return Policy</Link>
            </li>
            <li>
              <Link className="hover:text-pink-500" href={"/shipping-policy"}>Shipping Policy</Link>
            </li>
          </ul>
        </div>
        <div className="my-2">
          <h1 className="font-medium text-black">Policy</h1>
          <ul>
            <li>
              <Link className="hover:text-pink-500" href={"/privacy-policy"}>Privacy Policy</Link>
            </li>
            <li>
              <Link className="hover:text-pink-500" href={"/terms"}>Terms &amp; Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <Image
            className="rounded-2xl"
            src={"/pay.png"}
            alt="pay"
            width={250}
            height={500}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
