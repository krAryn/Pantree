import { useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { useAppContext } from '../contexts/AppContext';
import { useParams, Link } from 'react-router';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {

    const {products, navigate, addToCart} = useAppContext()
    const {id, category} = useParams()

    const [relatedProducts, setRelatedProducts] = useState()

    const prod  = products.find(item => item._id === id);
    console.log(prod)

    console.log("in ", products)
    const [thumbnail, setThumbnail] = useState();

    useEffect(() => {
        const filteredProducts = products.filter((product) => product.category.toLowerCase() === category)
        setRelatedProducts(filteredProducts)
        setThumbnail(prod.image[0])
    }, [id])
    
    const product = {
        _id: prod._id,
        name: prod.name,
        category: prod.category,
        price: prod.price,
        offerPrice: prod.offerPrice,
        rating: 4,
        images: prod.image,
        description: prod.description
    };


    return product && relatedProducts && (
        <div className="mt-16 flex flex-col px-6 md:px-16 lg:px-32">
            {/* mt-16 flex flex-col px-6 md:px-16 lg:px-32 */}
            <p>
                <Link to="/home">Home</Link> /
                <Link to="/allproducts"> All Products </Link> /
                <Link to={`/allproducts/${product.category.toLowerCase()}`}> {product.category} </Link> /
                <span className="text-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.images.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            product.rating > i ? (
                                <img src={assets.star_icon} alt="" className='md:w-4 w-3.5' key={i} />
                            ) : (
                                <img src={assets.star_dull_icon} alt="" className='md:w-4 w-3.5' key={i} />
                            )
                        ))}
                        <p className="text-base ml-2">({product.rating})</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: ₹{product.price}</p>
                        <p className="text-2xl font-medium">MRP: ₹{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" onClick={() => addToCart(product._id)} >
                            Add to Cart
                        </button>
                        <button className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition" onClick={() => {addToCart(product._id); navigate("/myCart")}} >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            {/* ----------------------Related Products------------------------- */}
            <div className='flex flex-col items-center mt-20'>
                <div className='flex flex-col items-center w-max'>
                    <p className='text-3xl font-medium'>Related Products</p>
                    <div className='w-20 h-0.5 bg-primary rounded-full mt-2 '></div>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full'>
                    {relatedProducts.slice(0,5).map(product => {
                        return <ProductCard key={product._id} prod={product} />
                    })}
                </div>
                <button className='mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition' onClick={() => {navigate(`/allproducts/${product.category.toLowerCase()}`); scrollTo(0,0)}}>See more</button>
            </div>
        </div>
    );
};

export default ProductDetails
