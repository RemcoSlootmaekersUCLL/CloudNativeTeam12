import Header from "@/components/header";
import DeleteUser from "@/components/users/deleteUser";

type Props = {
    params: Promise<{
       userId: string;
    }>;
};

const DeleteUserPage: React.FC<Props> = async ({ params }: Props) => {
    const { userId } = await params;

    return (
        <div>
            <Header />
            <main>
                <h1 className="text-center font-bold p-4">Delete user {userId}.</h1>
                <section className="table-container-style">
                    <DeleteUser userId={userId} />
                </section>
            </main>
        </div>
    );
};

export default DeleteUserPage;