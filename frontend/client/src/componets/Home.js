import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { addToCart } from "../feautres/cartSlice";
import { useNavigate } from "react-router";
import AnimatePage from "../animation/AnimatePage";
import SideBar from "./SideBar";
import axios from "axios";
import { productDetail } from "../feautres/cartSlice";

export default function Home() {
  const serverRootUrl = "http://localhost:8082";
  const defaultImageUrl = "https://media.istockphoto.com/id/1271880340/vector/lost-items-line-vector-icon-unidentified-items-outline-isolated-icon.jpg?s=612x612&w=0&k=20&c=d2kHGEmowThp_UrqIPfhxibstH6Sq5yDZJ41NetzVaA=";

  const [items, setItems] = useState([]);
  const [productFilter, setProductsFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const response = await axios.post(
          `${serverRootUrl}/client/item/search`,
          "", // Send an empty string as the body
          {
            headers: { "Content-Type": "application/json" },
            transformRequest: [(data) => data],
          }
        );
  
        console.log("Full API response:", response);
        console.log("Response data:", response.data.data);

  
        const updatedItems = response.data.data.map((item) => ({
          ...item,
          imageUrl: defaultImageUrl,
        }));
  
        console.log("Updated items length:", updatedItems.length);
  
        setItems(updatedItems);
        setProductsFilter(updatedItems);
      } catch (error) {
        console.error("Failed to fetch items:", error.response?.data || error.message);
      }
    };
  
    fetchAllItems();
  }, [serverRootUrl]);


  const showProductCard = (item) => {
    dispatch(productDetail(item)); // Dispatch to update product details and cart
    navigate("/productDetails"); // Navigate to the product details page
  };
  

  return (
    <>
      <AnimatePage>
        <section className="bg-white py-10 text-gray-700 sm:py-16 lg:py-8 font-['Cairo'] ">
          <div className="mx-auto max-w-screen-xl">
            <div className="mt-6 grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {productFilter.length === 0 ? (
                <p>No products to display</p>
              ) : (
                productFilter.map((item) => (
                  <article
                    key={item.itemId}
                    className="bg-slate-100 p-4 rounded-md w-full h-full shadow"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        onClick={() => showProductCard(item)}
                        className="object-contain h-40 w-full transition-all duration-300 cursor-pointer"
                        src={item.imageUrl}
                        alt={item.name || "Product Image"}
                      />
                    </div>
                    <div className="mt-4 text-left">
                      <h3 className="cursor-pointer hover:text-blue-500 text-[18px] font-semibold">
                        {item.name || "Unnamed Product"}
                      </h3>
                      <p className="text-gray-700">{t("Price")}: {item.price || 0} MAD</p>
                      <p className="text-gray-500">{t("Quantity")}: {item.quantity || 0}</p>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => dispatch(addToCart(item))}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        {t("Add to Cart")}
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </AnimatePage>
    </>
  );
}
