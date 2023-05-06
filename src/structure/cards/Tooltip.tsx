import { useState } from "react";
import { useFloating, autoUpdate, offset, flip, shift, useHover, useFocus, useDismiss, useRole, useInteractions, FloatingPortal } from "@floating-ui/react";
import classNames from "../../helpers/classNames";

interface TooltipProps {
  children: React.ReactNode;
  tooltipText: string | React.ReactNode;
  styles?: string;
}

export default function Tooltip({ children, tooltipText, styles }: TooltipProps) {
  const [open, setOpen] = useState(false);

  const { x, y, refs, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "top",
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
        crossAxis: false,
      }),
      shift(),
    ],
  });

  // Event listeners to change the open state
  const hover = useHover(context, {
    delay: {
      open: 400,
      close: 50,
    },
    move: false,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {open && (
          <div
            className={classNames(
              "Tooltip max-w-[200px]  justify-center rounded-md border bg-white px-2 py-1 text-center text-xs text-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 ",
              styles ?? ""
            )}
            ref={refs.setFloating}
            style={{
              // Positioning styles
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            {tooltipText}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
