import {Loading} from "../../utilities/loading";
import {ErrorMessage} from "../../utilities/errorMessage";
import {useFetchStickers} from "../../hooks/useFetchStickers";
import ProductCard from "../../components/ProductCard";
import {useNavigate} from "react-router-dom";
import {Search} from "../../components/Search.tsx";
import {useEffect, useState} from "react";

export default function AdminPage() {
    const {stickers, loading, error, deleteSticker} = useFetchStickers();
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setSearchResults(stickers);
    }, [stickers]);

    if (loading) return <Loading/>;
    if (error) return <ErrorMessage message={error}/>;

    const handleDelete = async (productId: number) => {
        await deleteSticker(productId);
    };

    const handleEdit = (productId: number) => {
        navigate(`/admin/update/${productId}`);
    };

    return (
        <>
            <div className="flex w-full justify-center m-4">
                <Search setResults={setSearchResults}/>
            </div>
            <div className="w-full flex">
                <div className="grid gap-6 p-6 mx-auto mb-20">
                    {searchResults.length > 0 ? (
                        searchResults.map((sticker) => (
                            <ProductCard
                                key={sticker.id}
                                product={sticker}
                                mode="admin"
                                onEdit={() => handleEdit(sticker.id)}
                                onDelete={() => handleDelete(sticker.id)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">
                            No results found.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
