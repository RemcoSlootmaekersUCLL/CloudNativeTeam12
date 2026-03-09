import Header from "@/components/header";
import userService from "@/services/userService";
import UserOverview from "@/components/users/userOverview";


const getData = async () => {
    try {
        const users = await userService.getAllUsers();

        return { data: users, error: null };
    } catch (error) {
        return { data: null, error: (error as Error).message };
    }
};

export const metadata = {
    title: "Users - Fitness tracker",
};

const UserPage: React.FC = async () => {
    const { data, error } = await getData();

    return (
        <div>
            <Header />
            <main>
                <h1 className="text-center font-bold p-4">Overview of all users.</h1>
                {error && (
                    <div className="text-red-800" role="alert">
                        {error}
                    </div>)}
                {data && (<>
                    <section className="table-container-style">
                        <UserOverview users={data} />
                    </section>
                </>)}
            </main>
        </div>
    );
};

export default UserPage;