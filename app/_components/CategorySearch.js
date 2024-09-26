'use client'

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import GlobalAPI from '../_utils/GlobalAPI.js'

function CategorySearch() {

    const [categoryList, setCategoryList] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchCategories = async () => {
            try {
                const result = await GlobalAPI.getCategory();
                setCategoryList(result.data);
            } catch (err) {
                console.error("Error in component:", err);
                setError("Failed to fetch categories. Please try again later.");
            }
        };

        fetchCategories();
    },[])

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='mb-10 items-center flex flex-col gap-4'>
            <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-primary'>Doctors</span></h2>
        <h2 className='text-gray-600'>Search for a doctor and book an appointment with just one click.</h2>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="text" placeholder="Search..." />
          <Button type="submit"><Search className='w-5 h-5 mr-2'/> Search </Button>
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        
        {/* Category List */}
        {categoryList.map((item, index)=>(
            <div>
                <Image src={item.attributes.icon.data.attributes?.url} 
                alt="icon"
                width={40}
                height={40}/>
                </div>
        ))}
        </div>
    )
}

export default CategorySearch