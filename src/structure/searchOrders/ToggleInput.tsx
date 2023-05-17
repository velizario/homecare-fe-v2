import { Switch } from "@headlessui/react";
import { MouseEventHandler, useState } from "react";
import { FieldPath, FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import classNames from "../../helpers/classNames";
import { type SelectionOption } from "../../types/types";

interface ToggleInputProps<T extends FieldValues> {
  options: SelectionOption[];
  // activeId: string | Set<string> | undefined;
  styles?: string;
  setValue: UseFormSetValue<T>;
  name: FieldPath<T>;
  visible: boolean;
}

export default function ToggleInput<K extends FieldValues>({
  options,
  styles,
  setValue,
  name,
  visible,
}: ToggleInputProps<K>) {
  const [activeId, setActiveId] = useState<number[]>([]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const selectedId = Number(e.currentTarget.dataset.id);
    if (!selectedId) return;
    setActiveId((current) => {
      current.includes(selectedId) ? current.filter(item => item !== selectedId) : current.push(selectedId);
      setValue(name, current as PathValue<K, Path<K>>);
      return current;
    });
  };

  return (
    <>
      {visible && (
        <>
          <h2 id="step-2" className="mt-10 text-xl text-gray-900">
            Ще имате ли нужда от?
          </h2>
          <div className={classNames("mt-3 flex flex-col gap-6", styles ?? "")}>
            {activeId &&
              options.map((option) => {
                const enabled = activeId.includes(option.id);
                return (
                  <div key={option.id} className="flex gap-2">
                    <Switch.Group>
                      <Switch
                        key={option.id}
                        data-id={option.id}
                        checked={enabled}
                        onClick={handleClick}
                        className={`${
                          enabled ? "bg-indigo-600" : "bg-gray-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                      >
                        <span className="sr-only">Enable notifications</span>
                        <span
                          className={`${
                            enabled ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </Switch>
                      <Switch.Label
                        className={classNames(
                          "cursor-pointer",
                          enabled ? "font-medium text-indigo-700" : "text-gray-500"
                        )}
                      >
                        {option.value}
                      </Switch.Label>
                    </Switch.Group>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
