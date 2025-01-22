import { useUserContext } from "./../context/user.context";

const Home = () => {
  const { user } = useUserContext();

  console.log(user);
  return <div>Home</div>;
};

export default Home;
