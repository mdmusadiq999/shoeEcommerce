import { createContext, useContext, useState,useEffect } from "react";


const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
      const [wishlist, setWishlist] = useState(() => {
      const storedWishlist = localStorage.getItem('wishlist');
      return storedWishlist ? JSON.parse(storedWishlist) : [];
    });
  
    useEffect(() => {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);
  
    const addToWishlist = (product) => {
      const updatedWishlist = [...wishlist, { product, count: 1 }]; 
      setWishlist(updatedWishlist);
    };
  
    const removeFromWishlist = (productId) => {
      const indexToRemove = wishlist.findIndex((item) => item.product.pid === productId);
  
      if (indexToRemove !== -1) {
        const updatedWishlist = [...wishlist];
        updatedWishlist.splice(indexToRemove, 1);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      }
    };
  
    const clearWishlist = () => {
      setWishlist([]);
    };
    
    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.product.pid === productId);
    };

    const value = {
      wishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist
    };
    return(
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist=()=>{
    return useContext(WishlistContext)
}