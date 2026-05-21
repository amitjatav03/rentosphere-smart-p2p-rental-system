import React from 'react'

const featuredCategoriesData = [
    { title: "Electronics", imgsrc: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Furniture", imgsrc: "https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Sports", imgsrc: "https://plus.unsplash.com/premium_photo-1684820878202-52781d8e0ea9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Books", imgsrc: "https://plus.unsplash.com/premium_photo-1677187301535-b46cec7b2cc8?q=80&w=1223&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Tools", imgsrc: "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Vehicles", imgsrc: "https://images.unsplash.com/photo-1754272846895-7186103b7c87?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Clothes", imgsrc: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { title: "Shoes", imgsrc: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
]


const FeaturedCategory = () => {
  return (
    <div className='w-[90vw] mx-auto px-5'>
        <h1 className='text-4xl font-bold font-[gilroy-bold] my-10'>Featured Categories</h1>
        {/* <div className='flex flex-wrap gap-5 justify-start'> */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {
                featuredCategoriesData.map((featureCat, idx) => {
                    return <div key={idx} className='min-w-[150px] max-w-[300px]'>
                        <img className='rounded-2xl w-full h-54 object-cover' src={featureCat.imgsrc} alt="" />
                        <h2 className='pl-2 pb-2 pt-1 font-medium text-zinc-700'>{featureCat.title}</h2>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default FeaturedCategory