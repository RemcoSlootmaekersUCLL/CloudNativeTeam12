export type Exercises = {
    id: number,
    name: string,
    type: string
}

export type Workouts = {
    id: number,
    userId: number,
    date: number,
    exercises: Exercises[]
}