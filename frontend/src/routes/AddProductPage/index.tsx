import StickerForm from "../../components/StickerForm";

export default function AddProductPage() {
    return (
        <div className="flex flex-col p-6 mb-10 w-full justify-center items-center">
            <h1 className="text-2xl font-medium mb-4 text-primary">Add New Sticker</h1>
            <StickerForm />
        </div>
    );
}