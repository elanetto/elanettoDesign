export function ErrorMessage({message}: { message: string }) {
    return (
        <div className="flex justify-center items-center h-screen">
            <h2 className="text-2xl font-bold text-red-500">Error: {message}</h2>
        </div>
    );
}