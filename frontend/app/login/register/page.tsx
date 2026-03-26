import RegisterForm from "@/components/users/RegisterForm";
import userService from "@/services/userService";

const getData = async () => {
    try {
        const users = await userService.getAllUsers();
        const userNames = users.map(u => u.username);


        return { data: { userNames }, error: null };
    } catch (error) {
        return { data: null, error: (error as Error).message };
    }
};
const RegisterPage: React.FC = async () => {
    const { data, error } = await getData();

    return (
        <div>
            {
                error && (
                    <div className="text-red-800" role="alert">
                        {error}
                    </div>)
            }
            {
                data && (<>
                    <section className="table-container-style">
                        <RegisterForm usernames={data.userNames} />
                    </section>
                </>)
            }
        </div>)
}


export default RegisterPage;