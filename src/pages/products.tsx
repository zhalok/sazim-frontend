import { useQuery } from "@tanstack/react-query";

const AllProducts = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const limit = parseInt(urlParams.get('limit') || '10', 10);
    const page = parseInt(urlParams.get('page') || '1', 10);
    
    const {} = useQuery({
        queryKey: ['products',limit,page],
    

    })
   return <></>
};

export default AllProducts