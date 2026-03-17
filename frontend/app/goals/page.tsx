import Header from "@/components/header";
import goalService from "@/services/goalService";
import GoalOverview from "@/components/goals/goalOverview";
import userService from "@/services/userService";


const getData = async () => {
    try {
        const goals = await goalService.getAllGoals();
        const users = await userService.getAllUsers();
        const userIds = users.map(u => u.id);


        return { data: { goals, userIds }, error: null };
    } catch (error) {
        return { data: null, error: (error as Error).message };
    }
};

export const metadata = {
    title: "Goals - Fitness tracker",
};

const GoalPage: React.FC = async () => {
    const { data, error } = await getData();

    return (
        <div>
            <Header />
            <main>
                <h1 className="text-center font-bold p-4">Overview of all goals.</h1>
                {error && (
                    <div className="text-red-800" role="alert">
                        {error}
                    </div>)}
                {data && (<>
                    <section className="table-container-style">
                        <GoalOverview goals={data.goals} userIds={data.userIds} />
                    </section>
                </>)}
            </main>
        </div>
    );
};

export default GoalPage;