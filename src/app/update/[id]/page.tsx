// src/app/update/page.tsx
import EditProfile from "@/components/EditProfile"; // Assurez-vous d'importer correctement le composant

const UpdateProfilePage = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <EditProfile userId={params.id} />
        </div>
    );
};

export default UpdateProfilePage;
