"use client";

const CreateWorkout: React.FC = () => {
  const userId = localStorage.getItem("id")!; // next will error: 'localStorage is not defined', it works tho

  return <>{userId}</>;
};

export default CreateWorkout;
