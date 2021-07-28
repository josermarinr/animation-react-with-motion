import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useState } from "react";

import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { TodoForm } from "./TodoForm";

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
    },
};

export const Todo = ({ todos, completeTodo, removeTodo, updateTodo }: any) => {
    const [edit, setEdit] = useState<{
        id: null | string | number;
        value: string;
        isCompleted: boolean;
    }>({
        id: 0,
        value: "",
        isCompleted: false,
    });

    const [deleteAnimation, setDeleteAnimation] = useState(false);
    const submitUpdate = ({
        id,
        value,
    }: {
        id: string | number;
        value: string;
    }) => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: "",
            isCompleted: false,
        });
    };

    if (edit.id) {
        return <TodoForm task={edit} onSubmit={submitUpdate} />;
    }

    const isDelete = async (id: string | number) => {
        setDeleteAnimation(
            !deleteAnimation
        );
        await removeTodo(id);
    }
    return (
        <AnimateSharedLayout>
            <motion.ul variants={container} initial="hidden" animate="visible">
                {todos.map(
                    (
                        todo: {
                            id: string | number;
                            value: string;
                            isComplete: boolean;
                        },
                        index: number
                    ) => (
                        <AnimatePresence>
                            <motion.div
                                key={index - todos.length}
                                variants={item}
                                initial="hidden"
                                animate="visible"
                                className={
                                    todo.isComplete
                                        ? "todo__row complete"
                                        : "todo__row"
                                }
                            >
                                <div
                                    key={todo.id}
                                    onClick={() => completeTodo(todo.id)}
                                    className="todo__task"
                                >
                                    {todo.value}
                                </div>

                                <div className="icons">
                                    <RiCloseCircleLine
                                        onClick={() => isDelete(todo.id)}
                                        className="delete-icon"
                                    />
                                    <TiEdit
                                        onClick={() =>
                                            setEdit({
                                                id: todo.id,
                                                value: todo.value,
                                                isCompleted: false,
                                            })
                                        }
                                        className="edit-icon"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )
                )}
            </motion.ul>
        </AnimateSharedLayout>
    );
};
