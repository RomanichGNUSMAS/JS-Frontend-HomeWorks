"use client";
import { useActionState, startTransition, useOptimistic } from "react";
import { User } from "../(types)/types";
import { removeUser, updateUser } from "../(helpers)/fileWorker";

export const TBody: React.FC<{ users: User[] }> = ({ users }) => {
  const [, removeDispatch] = useActionState(removeUser, "");
  const [, updateDispatch] = useActionState(updateUser, "");

  const [OptUsers, optimisticDispatch] = useOptimistic(users,
    function (currentState: User[], action: { type: string, payload: { updateData?: Omit<User, 'id'>, id: number } }) {
      switch (action.type) {
        case "UPDATE": {
          for (let i = 0; i < currentState.length; ++i) {
            if (currentState[i].id == action.payload.id) {
              currentState[i] = {
                ...currentState[i], ...action.payload!.updateData, id: currentState[i].id
              }
              return currentState;
            }
          }
        }
        case "DELETE": {
          return currentState.filter(user => user.id != action.payload.id);
        }
        default: return currentState;
      }
    }
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>, id: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const row = e.currentTarget;

      const nameEl = row.querySelector('[data-field="name"]') as HTMLElement | null;
      const surnameEl = row.querySelector('[data-field="surname"]') as HTMLElement | null;
      const salaryEl = row.querySelector('[data-field="salary"]') as HTMLElement | null;

      const nameText = nameEl?.textContent?.trim() || "";
      const surnameText = surnameEl?.textContent?.trim() || "";
      const salaryText = salaryEl?.textContent?.trim() || "";
      const salaryNum = Number(salaryText);

      if (!nameText || !surnameText || !salaryText || isNaN(salaryNum) || salaryNum < 0) {
        return;
      }

      const data = new FormData();
      data.append('id', id.toString());
      data.append('name', nameText);
      data.append('surname', surnameText);
      data.append('salary', salaryText);

      startTransition(() => {
        optimisticDispatch({ type: "UPDATE", payload: { id, updateData: { name: nameText, surname: surnameText, salary: salaryNum } } });
        updateDispatch(data);
      });
    }
  };

  return (
    <tbody className="divide-y divide-slate-800 bg-slate-900 text-sm text-slate-200">
      {OptUsers.map(user => (
        <tr
          key={user.id}
          onKeyDown={e => handleKeyDown(e, user.id)}
          className="transition hover:bg-slate-800/70"
        >
          <td className="px-4 py-4">
            <p
              data-field="name"
              className="font-medium text-slate-100 outline-none"
              contentEditable
              suppressContentEditableWarning
            >
              {user.name}
            </p>
          </td>
          <td
            data-field="surname"
            className="px-4 py-4 text-slate-300 outline-none"
            contentEditable
            suppressContentEditableWarning
          >
            {user.surname}
          </td>
          <td
            className="px-4 py-4 text-slate-300 outline-none items-baseline"

          >
            <div className="flex items-center gap-1">
              <p data-field="salary" className="outline-none" contentEditable suppressContentEditableWarning>{user.salary}</p>
              <span>USD</span>
            </div>

          </td>
          <td className="px-4 py-4">
            <button
              type="button"
              className="inline-flex rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
              onClick={() => {
                startTransition(async () => {
                  optimisticDispatch({ type: "DELETE", payload: { id: user.id } });
                  await removeDispatch(user.id);
                });
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
