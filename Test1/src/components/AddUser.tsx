import React from "react";
import { DataContext, type User } from "../types/contextType";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string
    age: number,
    salary: number
}

export const AddUser: React.FC = function () {
    const { onAdd } = React.useContext(DataContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data: User) => {
        onAdd(data);
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    [
                        errors.name?.message && <p key={0}>{errors.name.message}</p>,
                        errors.age?.message && <p key={1}>{errors.age.message}</p>,
                        errors.salary?.message && <p key={2}>{errors.salary.message}</p>
                    ]
                }
                <input
                    type="text"
                    placeholder="name"
                    {...register('name', { required: 'valid name required' })}
                />
                <input
                    type="number"
                    placeholder="age"
                    {...register('age', {
                        valueAsNumber: true,
                        validate: (value) => {
                            if (Number.isNaN(value)) return 'valid age required';
                            if (value < 18 || value > 99) {
                                return 'Age must be between 18 and 99';
                            }
                            return true;
                        },
                    })}
                />
                <input
                    type="number"
                    placeholder="salary"
                    {...register('salary', {
                        valueAsNumber: true,
                        validate: (value) => {
                            if (Number.isNaN(value)) return 'valid salary required';
                            if (value < 5000 || value > 1_000_000) {
                                return 'Salary must be between 5000 and 1000000';
                            }
                            return true;
                        },
                    })}
                />
                <button>Save</button>
            </form>
        </div>
    )
}