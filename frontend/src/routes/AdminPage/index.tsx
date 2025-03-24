import { Loading } from "../../utilities/loading";
import { ErrorMessage } from "../../utilities/errorMessage";
import { useFetchStickers } from "../../hooks/useFetchStickers";
import ProductCard from "../../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
    const { stickers, loading, error, deleteSticker } = useFetchStickers();
    const navigate = useNavigate();

    if (loading) return <Loading />;
    if (error) return <ErrorMessage message={error} />;

    const handleDelete = async (productId: number) => {
        await deleteSticker(productId);
    };

    const handleEdit = (productId: number) => {
        navigate(`/admin/update/${productId}`);
    };

    return (
        <div className="w-full flex">
            <div className="grid gap-6 p-6 mx-auto mb-20">
                {stickers.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        mode="admin"
                        onEdit={() => handleEdit(product.id)}
                        onDelete={() => handleDelete(product.id)}
                    />
                ))}
            </div>
        </div>
    );
}
